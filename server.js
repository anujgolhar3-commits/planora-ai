const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const querystring = require('querystring');

// ==============================================================================
// ENVIRONMENT CONFIGURATION (.env LOADER)
// ==============================================================================
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (process.env[key] === undefined) {
              process.env[key] = val;
            }
          }
        }
      });
    } catch (e) {
      console.warn('Could not read .env file:', e.message);
    }
  }
}
loadEnv();

const PORT = parseInt(process.env.PORT || '5500', 10);
const PUBLIC_DIR = __dirname;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/auth/google/callback`;
const SESSION_SECRET = process.env.SESSION_SECRET || 'planora_secure_default_secret_2026';

// Required Google OAuth Scopes for Planora AI
const GOOGLE_OAUTH_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly'
].join(' ');

// In-memory session store & OAuth state store
if (!global._planoraSessions) global._planoraSessions = new Map();
if (!global._oauthStates) global._oauthStates = new Map();

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg'
};

// ==============================================================================
// COOKIE & SESSION UTILITIES
// ==============================================================================
function parseCookies(req) {
  const cookies = {};
  const header = req.headers['cookie'];
  if (header) {
    header.split(';').forEach(c => {
      const parts = c.split('=');
      if (parts.length >= 2) {
        const name = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        try {
          cookies[name] = decodeURIComponent(val);
        } catch (_) {
          cookies[name] = val;
        }
      }
    });
  }
  return cookies;
}

function setCookie(res, name, val, options = {}) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;
  cookieStr += `; Path=${options.path || '/'}`;
  if (options.httpOnly !== false) cookieStr += '; HttpOnly';
  if (options.secure) cookieStr += '; Secure';
  cookieStr += `; SameSite=${options.sameSite || 'Lax'}`;
  if (options.maxAge !== undefined) cookieStr += `; Max-Age=${options.maxAge}`;

  const existing = res.getHeader('Set-Cookie');
  if (!existing) {
    res.setHeader('Set-Cookie', cookieStr);
  } else if (Array.isArray(existing)) {
    res.setHeader('Set-Cookie', [...existing, cookieStr]);
  } else {
    res.setHeader('Set-Cookie', [existing, cookieStr]);
  }
}

function clearCookie(res, name, path = '/') {
  setCookie(res, name, '', { path, maxAge: 0 });
}

function createSessionToken(sessionObj) {
  const secret = process.env.SESSION_SECRET || 'planora_secure_random_session_key_production_2026';
  const data = Buffer.from(JSON.stringify(sessionObj)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const secret = process.env.SESSION_SECRET || 'planora_secure_random_session_key_production_2026';
  const expectedSig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - payload.createdAt > maxAgeMs) {
      return null;
    }
    return payload;
  } catch (_) {
    return null;
  }
}

function getSessionFromReq(req) {
  const cookies = parseCookies(req);
  const sessionToken = cookies['planora_session'];
  if (!sessionToken) return null;

  // 1. In-memory session check (local dev and tests)
  if (global._planoraSessions && global._planoraSessions.has(sessionToken)) {
    const sess = global._planoraSessions.get(sessionToken);
    const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - sess.createdAt > maxAgeMs) {
      global._planoraSessions.delete(sessionToken);
      return null;
    }
    return sess;
  }

  // 2. Stateless signed session verification (vital for Vercel serverless multi-instance)
  const verified = verifySessionToken(sessionToken);
  if (verified && verified.user) {
    if (global._planoraSessions) {
      global._planoraSessions.set(sessionToken, verified);
    }
    return verified;
  }

  return null;
}

function isGoogleConfigured() {
  return getGoogleConfig().isConfigured;
}

function getGoogleConfig() {
  loadEnv();
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/auth/google/callback`;
  const isConfigured = Boolean(
    clientId &&
    clientSecret &&
    !clientId.includes('your_google_client_id_here') &&
    !clientSecret.includes('your_google_client_secret_here') &&
    !clientSecret.includes('paste_your_client_secret_here')
  );
  return { clientId, clientSecret, redirectUri, isConfigured };
}

// ==============================================================================
// HTTPS REQUEST HELPER (Native Node.js HTTPS client)
// ==============================================================================
function makeHttpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', err => reject(err));
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('HTTPS request timed out (30s)'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Ensures user has an active, valid Google access token. Refreshes if expired.
 */
async function getValidGoogleAccessToken(session) {
  if (!session || !session.tokens) return null;

  const now = Date.now();
  // If token is valid for at least another 60 seconds, use it
  if (session.tokens.access_token && session.tokens.expires_at && session.tokens.expires_at > now + 60000) {
    return session.tokens.access_token;
  }

  // Refresh using refresh_token if available
  const config = getGoogleConfig();
  if (session.tokens.refresh_token && config.isConfigured) {
    try {
      const postBody = querystring.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: session.tokens.refresh_token,
        grant_type: 'refresh_token'
      });

      const resp = await makeHttpsRequest({
        hostname: 'oauth2.googleapis.com',
        port: 443,
        path: '/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postBody)
        }
      }, postBody);

      if (resp.statusCode >= 200 && resp.statusCode < 300) {
        const tokenData = JSON.parse(resp.body);
        session.tokens.access_token = tokenData.access_token;
        session.tokens.expires_at = Date.now() + ((tokenData.expires_in || 3600) * 1000);
        return session.tokens.access_token;
      }
    } catch (err) {
      console.error('Error refreshing Google access token:', err.message);
    }
  }

  return session.tokens.access_token || null;
}

// ==============================================================================
// AI PROVIDER CONFIGURATIONS (Existing LLM Proxy)
// ==============================================================================
const PROVIDER_CONFIGS = {
  openai: {
    host: 'api.openai.com',
    chatPath: '/v1/chat/completions',
    modelsPath: '/v1/models',
    defaultModel: 'gpt-4o-mini',
    authHeader: (key) => ({ 'Authorization': `Bearer ${(key || '').replace(/^Bearer\s+/i, '').trim()}` })
  },
  gemini: {
    host: 'generativelanguage.googleapis.com',
    chatPath: '/v1beta/openai/chat/completions',
    modelsPath: '/v1beta/models',
    defaultModel: 'gemini-1.5-flash',
    authHeader: (key) => ({ 'Authorization': `Bearer ${(key || '').replace(/^Bearer\s+/i, '').trim()}` })
  },
  groq: {
    host: 'api.groq.com',
    chatPath: '/openai/v1/chat/completions',
    modelsPath: '/openai/v1/models',
    defaultModel: 'openai/gpt-oss-120b',
    authHeader: (key) => ({ 'Authorization': `Bearer ${(key || '').replace(/^Bearer\s+/i, '').trim()}` })
  },
  deepseek: {
    host: 'api.deepseek.com',
    chatPath: '/chat/completions',
    modelsPath: '/models',
    defaultModel: 'deepseek-chat',
    authHeader: (key) => ({ 'Authorization': `Bearer ${(key || '').replace(/^Bearer\s+/i, '').trim()}` })
  },
  grok: {
    host: 'api.x.ai',
    chatPath: '/v1/chat/completions',
    modelsPath: '/v1/models',
    defaultModel: 'grok-2-latest',
    authHeader: (key) => ({ 'Authorization': `Bearer ${(key || '').replace(/^Bearer\s+/i, '').trim()}` })
  },
  openrouter: {
    host: 'openrouter.ai',
    chatPath: '/api/v1/chat/completions',
    modelsPath: '/api/v1/models',
    defaultModel: 'meta-llama/llama-3.3-70b-instruct:free',
    authHeader: (key) => {
      const cleanKey = (key || '').replace(/^Bearer\s+/i, '').trim();
      return {
        'Authorization': `Bearer ${cleanKey}`,
        'HTTP-Referer': `http://localhost:${PORT}`,
        'X-Title': 'Planora AI',
        'User-Agent': 'PlanoraAI/2.4 (https://planora.ai)'
      };
    }
  },
  anthropic: {
    host: 'api.anthropic.com',
    chatPath: '/v1/messages',
    defaultModel: 'claude-3-5-sonnet-20241022',
    isAnthropic: true,
    authHeader: (key) => ({
      'x-api-key': (key || '').replace(/^Bearer\s+/i, '').trim(),
      'anthropic-version': '2023-06-01'
    })
  }
};

function forwardLLMRequest(targetHost, targetPath, method, headers, postData) {
  return new Promise((resolve, reject) => {
    const cleanHeaders = {
      'User-Agent': 'PlanoraAI/2.4 (https://planora.ai)',
      ...headers,
      'Host': targetHost
    };
    const options = {
      hostname: targetHost,
      port: 443,
      path: targetPath,
      method: method,
      headers: cleanHeaders
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', err => reject(err));
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error('Request to AI provider timed out (60s)'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try {
        const parsed = raw ? JSON.parse(raw) : {};
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', err => reject(err));
  });
}

function detectProviderFromKey(apiKey) {
  if (!apiKey) return null;
  const k = apiKey.trim();
  if (k.startsWith('AIzaSy')) return 'gemini';
  if (k.startsWith('gsk_')) return 'groq';
  if (k.startsWith('xai-')) return 'grok';
  if (k.startsWith('sk-ant-')) return 'anthropic';
  if (k.startsWith('sk-or-')) return 'openrouter';
  if (k.startsWith('sk-proj-') || k.startsWith('sk-svcacct-')) return 'openai';
  return null;
}

// ==============================================================================
// CORE HTTP SERVER & ROUTING ENGINE
// ==============================================================================
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  // Set global CORS headers
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || `http://localhost:${PORT}`);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ==============================================================================
  // 1. GOOGLE OAUTH 2.0 REDIRECT ENDPOINT (GET /auth/google)
  // ==============================================================================
  if (req.method === 'GET' && pathname === '/auth/google') {
    const config = getGoogleConfig();
    if (!config.isConfigured) {
      // Configuration missing: inform the user to configure credentials in .env
      res.writeHead(302, { 'Location': '/login.html?error=config_missing' });
      res.end();
      return;
    }

    // Generate cryptographic state for CSRF defense
    const state = crypto.randomBytes(24).toString('hex');
    global._oauthStates.set(state, { createdAt: Date.now() });

    // Store state in short-lived HTTP-only cookie
    setCookie(res, 'oauth_state', state, { maxAge: 600 });

    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + querystring.stringify({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: GOOGLE_OAUTH_SCOPES,
      access_type: 'offline',
      prompt: 'consent select_account',
      state: state,
      include_granted_scopes: 'true'
    });

    res.writeHead(302, { 'Location': googleAuthUrl });
    res.end();
    return;
  }

  // ==============================================================================
  // 1b. DEMO / INSTANT ACCESS ENDPOINT (GET /auth/demo)
  // ==============================================================================
  if (req.method === 'GET' && pathname === '/auth/demo') {
    const sessionId = 'pln_sess_demo_' + crypto.randomBytes(16).toString('hex');
    const demoUser = {
      id: 'demo_' + Date.now(),
      name: 'Planora Architect',
      email: 'guest@planora.ai',
      picture: '',
      avatar: 'PA',
      provider: 'demo',
      verified: true,
      calendarGranted: true,
      calendarScopes: ['calendar.events', 'calendar.readonly'],
      authTime: new Date().toISOString(),
      role: 'Workspace Director'
    };

    const sessionObj = {
      id: sessionId,
      user: demoUser,
      tokens: {
        access_token: 'demo_token',
        refresh_token: null,
        expires_at: Date.now() + (30 * 24 * 3600 * 1000),
        scope: 'calendar.events calendar.readonly'
      },
      createdAt: Date.now()
    };

    global._planoraSessions.set(sessionId, sessionObj);
    const sessionToken = createSessionToken(sessionObj);
    global._planoraSessions.set(sessionToken, sessionObj);

    const isHttps = req.headers['x-forwarded-proto'] === 'https' || (req.connection && req.connection.encrypted);
    setCookie(res, 'planora_session', sessionToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: isHttps,
      sameSite: 'Lax'
    });

    res.writeHead(302, { 'Location': '/index.html' });
    res.end();
    return;
  }

  // ==============================================================================
  // 2. GOOGLE OAUTH 2.0 CALLBACK ENDPOINT (GET /auth/google/callback)
  // ==============================================================================
  if (req.method === 'GET' && pathname === '/auth/google/callback') {
    const code = query.code;
    const state = query.state;
    const errorParam = query.error;

    // Handle user denial / OAuth error
    if (errorParam) {
      if (errorParam === 'access_denied') {
        res.writeHead(302, { 'Location': '/login.html?error=calendar_denied' });
      } else {
        res.writeHead(302, { 'Location': `/login.html?error=${encodeURIComponent(errorParam)}` });
      }
      res.end();
      return;
    }

    // CSRF State verification
    const cookies = parseCookies(req);
    const cookieState = cookies['oauth_state'];
    const validState = state && (state === cookieState || global._oauthStates.has(state));

    if (!validState) {
      res.writeHead(302, { 'Location': '/login.html?error=invalid_state' });
      res.end();
      return;
    }
    if (state) global._oauthStates.delete(state);

    if (!code) {
      res.writeHead(302, { 'Location': '/login.html?error=missing_code' });
      res.end();
      return;
    }

    try {
      // Exchange authorization code for tokens
      const config = getGoogleConfig();
      const tokenPayload = querystring.stringify({
        code: code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        grant_type: 'authorization_code'
      });

      const tokenResp = await makeHttpsRequest({
        hostname: 'oauth2.googleapis.com',
        port: 443,
        path: '/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(tokenPayload)
        }
      }, tokenPayload);

      if (tokenResp.statusCode < 200 || tokenResp.statusCode >= 300) {
        console.error('Failed to exchange code for token:', tokenResp.body);
        res.writeHead(302, { 'Location': '/login.html?error=token_exchange_failed' });
        res.end();
        return;
      }

      const tokenData = JSON.parse(tokenResp.body);
      const grantedScopes = tokenData.scope || '';

      // MANDATORY GOOGLE CALENDAR VERIFICATION:
      // Verify user actually granted calendar permissions
      const hasCalendarPermission =
        grantedScopes.includes('calendar.events') ||
        grantedScopes.includes('calendar.readonly') ||
        grantedScopes.includes('https://www.googleapis.com/auth/calendar');

      if (!hasCalendarPermission) {
        // User unchecked Google Calendar in Google consent screen.
        // As per mandatory requirement: DO NOT grant dashboard access!
        res.writeHead(302, { 'Location': '/login.html?error=calendar_denied' });
        res.end();
        return;
      }

      // Fetch verified Google User Profile
      const userInfoResp = await makeHttpsRequest({
        hostname: 'www.googleapis.com',
        port: 443,
        path: '/oauth2/v3/userinfo',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      if (userInfoResp.statusCode < 200 || userInfoResp.statusCode >= 300) {
        res.writeHead(302, { 'Location': '/login.html?error=profile_fetch_failed' });
        res.end();
        return;
      }

      const userInfo = JSON.parse(userInfoResp.body);
      const displayName = userInfo.name || (userInfo.email ? userInfo.email.split('@')[0] : 'Google User');
      const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'GU';

      // Establish secure, persistent session
      const sessionId = 'pln_sess_' + crypto.randomBytes(32).toString('hex');
      const user = {
        id: userInfo.sub,
        name: displayName,
        email: userInfo.email,
        picture: userInfo.picture || '',
        avatar: initials,
        provider: 'google-oauth2',
        verified: Boolean(userInfo.email_verified),
        calendarGranted: true,
        calendarScopes: grantedScopes.split(' '),
        authTime: new Date().toISOString(),
        role: 'Workspace Director'
      };

      const sessionObj = {
        id: sessionId,
        user: user,
        tokens: {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token || null,
          expires_at: Date.now() + ((tokenData.expires_in || 3600) * 1000),
          scope: grantedScopes
        },
        createdAt: Date.now()
      };

      global._planoraSessions.set(sessionId, sessionObj);

      // Create signed session token for stateless serverless environments (Vercel)
      const sessionToken = createSessionToken(sessionObj);
      global._planoraSessions.set(sessionToken, sessionObj);

      const isHttps = req.headers['x-forwarded-proto'] === 'https' || (req.connection && req.connection.encrypted);

      // Set secure HTTP-only session cookie (30 days)
      setCookie(res, 'planora_session', sessionToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: isHttps,
        sameSite: 'Lax'
      });
      clearCookie(res, 'oauth_state');

      // Success: redirect directly to the protected dashboard
      res.writeHead(302, { 'Location': '/index.html' });
      res.end();
      return;
    } catch (err) {
      console.error('OAuth callback execution error:', err);
      res.writeHead(302, { 'Location': '/login.html?error=auth_internal_error' });
      res.end();
      return;
    }
  }

  // ==============================================================================
  // 3. AUTH STATUS & PROFILE APIs
  // ==============================================================================

  // GET /api/auth/status - Returns configuration state
  if (req.method === 'GET' && pathname === '/api/auth/status') {
    const config = getGoogleConfig();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({
      configured: config.isConfigured,
      redirectUri: config.redirectUri,
      clientIdMasked: config.isConfigured ? config.clientId.substring(0, 15) + '...apps.googleusercontent.com' : null
    }));
    return;
  }

  // GET /api/auth/me - Retrieve currently authenticated user profile
  if (req.method === 'GET' && pathname === '/api/auth/me') {
    const session = getSessionFromReq(req);
    if (session && session.user && session.user.calendarGranted) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({
        authenticated: true,
        user: session.user
      }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({
        authenticated: false,
        user: null
      }));
    }
    return;
  }

  // POST /api/auth/logout - Terminate session & clear cookies
  if (req.method === 'POST' && pathname === '/api/auth/logout') {
    const cookies = parseCookies(req);
    const sessionId = cookies['planora_session'];
    if (sessionId) {
      global._planoraSessions.delete(sessionId);
    }
    clearCookie(res, 'planora_session');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully.' }));
    return;
  }

  // ==============================================================================
  // 4. GOOGLE CALENDAR PROXY APIS (Server-Side Authenticated)
  // ==============================================================================

  // GET /api/calendar/events - Fetch events from user's Google Calendar
  if (req.method === 'GET' && pathname === '/api/calendar/events') {
    const session = getSessionFromReq(req);
    if (!session || !session.user || !session.user.calendarGranted) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Unauthorized: Google Calendar session required.' }));
      return;
    }

    const accessToken = await getValidGoogleAccessToken(session);
    if (!accessToken) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Google Calendar session token expired. Please re-authenticate.' }));
      return;
    }

    try {
      const qParams = querystring.stringify({
        timeMin: query.timeMin || new Date(Date.now() - 7 * 86400000).toISOString(),
        timeMax: query.timeMax || new Date(Date.now() + 30 * 86400000).toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
        maxResults: 100
      });

      const calResp = await makeHttpsRequest({
        hostname: 'www.googleapis.com',
        port: 443,
        path: `/calendar/v3/calendars/primary/events?${qParams}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      res.writeHead(calResp.statusCode, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(calResp.body);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Failed to communicate with Google Calendar API: ' + err.message }));
    }
    return;
  }

  // POST /api/calendar/events - Create new event in user's Google Calendar
  if (req.method === 'POST' && pathname === '/api/calendar/events') {
    const session = getSessionFromReq(req);
    if (!session || !session.user || !session.user.calendarGranted) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Unauthorized: Google Calendar session required.' }));
      return;
    }

    const accessToken = await getValidGoogleAccessToken(session);
    if (!accessToken) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Google Calendar session token expired. Please re-authenticate.' }));
      return;
    }

    try {
      const body = await parseJsonBody(req);
      const postBody = JSON.stringify(body);

      const calResp = await makeHttpsRequest({
        hostname: 'www.googleapis.com',
        port: 443,
        path: '/calendar/v3/calendars/primary/events',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postBody)
        }
      }, postBody);

      res.writeHead(calResp.statusCode, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(calResp.body);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Failed to create Google Calendar event: ' + err.message }));
    }
    return;
  }

  // DELETE /api/calendar/events/:id - Delete an event in Google Calendar
  if (req.method === 'DELETE' && pathname.startsWith('/api/calendar/events/')) {
    const session = getSessionFromReq(req);
    if (!session || !session.user || !session.user.calendarGranted) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Unauthorized: Google Calendar session required.' }));
      return;
    }

    const eventId = encodeURIComponent(pathname.replace('/api/calendar/events/', ''));
    const accessToken = await getValidGoogleAccessToken(session);
    if (!accessToken) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Google Calendar session token expired. Please re-authenticate.' }));
      return;
    }

    try {
      const calResp = await makeHttpsRequest({
        hostname: 'www.googleapis.com',
        port: 443,
        path: `/calendar/v3/calendars/primary/events/${eventId}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      res.writeHead(calResp.statusCode, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(calResp.body || JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: 'Failed to delete Google Calendar event: ' + err.message }));
    }
    return;
  }

  // ==============================================================================
  // 5. AI INTELLIGENCE CO-PILOT PROXY APIS
  // ==============================================================================
  if (req.method === 'POST' && pathname === '/api/ai/test') {
    try {
      const data = await parseJsonBody(req);
      let provider = (data.provider || '').toLowerCase();
      const apiKey = (data.apiKey || process.env.GROQ_API_KEY || process.env.PLANORA_AI_KEY || '').trim();
      const customBaseUrl = data.customBaseUrl;

      if (!apiKey) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, error: 'API Key is required.' }));
        return;
      }

      const detected = detectProviderFromKey(apiKey);
      if (detected && (provider === 'auto' || !provider || (detected !== provider && provider !== 'custom'))) {
        provider = detected;
      } else if (!provider || provider === 'auto') {
        provider = 'openai';
      }

      let targetHost = '';
      let targetPath = '';
      let authHeaders = {};
      let testPayload = '';
      let model = data.model;

      if (provider === 'custom' && customBaseUrl) {
        try {
          const parsedCustom = new URL(customBaseUrl);
          targetHost = parsedCustom.hostname;
          targetPath = (parsedCustom.pathname.replace(/\/$/, '') || '') + '/chat/completions';
          authHeaders = { 'Authorization': `Bearer ${apiKey}` };
          model = model || 'default';
          testPayload = JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: 'Ping' }],
            max_tokens: 5
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, error: 'Invalid custom base URL format.' }));
          return;
        }
      } else {
        const config = PROVIDER_CONFIGS[provider];
        if (!config) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, error: `Unsupported provider: ${provider}.` }));
          return;
        }

        targetHost = config.host;
        targetPath = config.chatPath;
        authHeaders = config.authHeader(apiKey);
        if (provider === 'groq') {
          if (!model || model.includes('llama') || model.includes('70b')) {
            model = 'openai/gpt-oss-120b';
          }
        } else {
          model = model || config.defaultModel;
        }

        if (config.isAnthropic) {
          testPayload = JSON.stringify({
            model: model,
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Ping' }]
          });
        } else {
          testPayload = JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: 'You are a test ping.' },
              { role: 'user', content: 'Ping' }
            ],
            max_tokens: 5
          });
        }
      }

      let response = await forwardLLMRequest(
        targetHost,
        targetPath,
        'POST',
        {
          'Content-Type': 'application/json',
          ...authHeaders,
          'Content-Length': Buffer.byteLength(testPayload)
        },
        testPayload
      );

      // Groq auto-fallback if requested model is unavailable
      if (provider === 'groq' && response.statusCode >= 400 && (response.body.includes('does not exist') || response.body.includes('access to it') || response.body.includes('llama'))) {
        try {
          model = 'openai/gpt-oss-120b';
          const fallbackPayload = JSON.stringify({
            ...JSON.parse(testPayload),
            model: model
          });
          const retryResp = await forwardLLMRequest(
            targetHost,
            targetPath,
            'POST',
            {
              'Content-Type': 'application/json',
              ...authHeaders,
              'Content-Length': Buffer.byteLength(fallbackPayload)
            },
            fallbackPayload
          );
          if (retryResp.statusCode >= 200 && retryResp.statusCode < 300) {
            response = retryResp;
          }
        } catch (_) {}
      }

      if (response.statusCode >= 200 && response.statusCode < 300) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          provider: provider,
          model: model,
          message: `Connected to ${provider} successfully.`
        }));
      } else {
        let errorDetail = `Provider returned status ${response.statusCode}`;
        try {
          const parsed = JSON.parse(response.body);
          if (parsed.error) {
            errorDetail = typeof parsed.error === 'string' ? parsed.error : (parsed.error.message || JSON.stringify(parsed.error));
          } else if (parsed.message) {
            errorDetail = parsed.message;
          }
        } catch (_) {
          if (response.body) errorDetail = response.body.slice(0, 300);
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: false,
          statusCode: response.statusCode,
          error: errorDetail
        }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: false, error: err.message || 'Connection test failed.' }));
    }
    return;
  }

  if (req.method === 'POST' && pathname === '/api/ai/chat') {
    try {
      const data = await parseJsonBody(req);
      let provider = (data.provider || '').toLowerCase();
      const apiKey = (data.apiKey || process.env.GROQ_API_KEY || process.env.PLANORA_AI_KEY || '').trim();
      const customBaseUrl = data.customBaseUrl;
      const messages = data.messages || [];
      const temperature = typeof data.temperature === 'number' ? data.temperature : 0.7;
      const max_tokens = typeof data.max_tokens === 'number' ? data.max_tokens : 1024;
      let model = data.model;

      if (!apiKey) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, error: 'API Key is required.' }));
        return;
      }

      const detected = detectProviderFromKey(apiKey);
      if (detected && (provider === 'auto' || !provider || (detected !== provider && provider !== 'custom'))) {
        provider = detected;
      } else if (!provider || provider === 'auto') {
        provider = 'openai';
      }

      let targetHost = '';
      let targetPath = '';
      let authHeaders = {};
      let postBody = '';

      if (provider === 'custom' && customBaseUrl) {
        const parsedCustom = new URL(customBaseUrl);
        targetHost = parsedCustom.hostname;
        targetPath = (parsedCustom.pathname.replace(/\/$/, '') || '') + '/chat/completions';
        authHeaders = { 'Authorization': `Bearer ${apiKey}` };
        postBody = JSON.stringify({
          model: model || 'default',
          messages: messages,
          temperature: temperature,
          max_tokens: max_tokens
        });
      } else {
        const config = PROVIDER_CONFIGS[provider];
        if (!config) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, error: `Unsupported provider: ${provider}.` }));
          return;
        }

        targetHost = config.host;
        targetPath = config.chatPath;
        authHeaders = config.authHeader(apiKey);
        if (provider === 'groq') {
          if (!model || model.includes('llama') || model.includes('70b')) {
            model = 'openai/gpt-oss-120b';
          }
        } else {
          model = model || config.defaultModel;
        }

        if (config.isAnthropic) {
          let systemPrompt = '';
          const anthropicMessages = [];
          messages.forEach(m => {
            if (m.role === 'system') {
              systemPrompt += (systemPrompt ? '\n\n' : '') + m.content;
            } else {
              anthropicMessages.push({
                role: m.role === 'assistant' ? 'assistant' : 'user',
                content: m.content
              });
            }
          });

          postBody = JSON.stringify({
            model: model,
            system: systemPrompt || undefined,
            messages: anthropicMessages.length > 0 ? anthropicMessages : [{ role: 'user', content: 'Hello' }],
            temperature: temperature,
            max_tokens: max_tokens
          });
        } else {
          postBody = JSON.stringify({
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: max_tokens
          });
        }
      }

      let response = await forwardLLMRequest(
        targetHost,
        targetPath,
        'POST',
        {
          'Content-Type': 'application/json',
          ...authHeaders,
          'Content-Length': Buffer.byteLength(postBody)
        },
        postBody
      );

      // Groq auto-fallback if requested model is unavailable
      if (provider === 'groq' && response.statusCode >= 400 && (response.body.includes('does not exist') || response.body.includes('access to it') || response.body.includes('llama'))) {
        try {
          const fallbackBody = JSON.stringify({
            ...JSON.parse(postBody),
            model: 'openai/gpt-oss-120b'
          });
          const retryResp = await forwardLLMRequest(
            targetHost,
            targetPath,
            'POST',
            {
              'Content-Type': 'application/json',
              ...authHeaders,
              'Content-Length': Buffer.byteLength(fallbackBody)
            },
            fallbackBody
          );
          if (retryResp.statusCode >= 200 && retryResp.statusCode < 300) {
            response = retryResp;
          }
        } catch (_) {}
      }

      if (provider === 'anthropic' && response.statusCode >= 200 && response.statusCode < 300) {
        try {
          const anthJson = JSON.parse(response.body);
          const normalized = {
            choices: [{
              message: {
                role: 'assistant',
                content: anthJson.content?.[0]?.text || ''
              }
            }],
            model: anthJson.model || model,
            usage: anthJson.usage
          };
          res.writeHead(response.statusCode, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify(normalized));
          return;
        } catch (_) {}
      }

      res.writeHead(response.statusCode, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(response.body);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: false, error: err.message || 'Failed to communicate with AI API provider' }));
    }
    return;
  }

  // ==============================================================================
  // 6. MANDATORY ROUTE AUTHENTICATION GATEWAY & STATIC FILE SERVING
  // ==============================================================================
  let reqPath = decodeURI(pathname);

  // Normalize path
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Protect all core application routes: ZERO GUEST ACCESS.
  // Direct URL visits to /, /index.html, /dashboard.html, /index, /dashboard
  // MUST have an active authenticated Google session with calendar permissions granted.
  const isProtectedAppRoute = [
    '/index.html',
    '/dashboard.html',
    '/index',
    '/dashboard'
  ].includes(reqPath);

  if (isProtectedAppRoute) {
    const session = getSessionFromReq(req);
    if (!session || !session.user || !session.user.calendarGranted) {
      // User is NOT authenticated or denied calendar permission. Redirect immediately to login page.
      res.writeHead(302, {
        'Location': '/login.html',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private'
      });
      res.end();
      return;
    }
  }

  let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Clean URL resolution (e.g. /login -> /login.html)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`[Planora Server] Port ${PORT} is currently in use by an active server instance.`);
  } else if (err.code === 'EACCES') {
    console.warn(`[Planora Server] Port ${PORT} requires network binding permission.`);
  } else {
    console.error('[Planora Server Error]:', err);
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    const config = getGoogleConfig();
    console.log(`====================================================`);
    console.log(` Planora AI - Schedule Intelligence Server`);
    console.log(` Port:             ${PORT}`);
    console.log(` URL:              http://localhost:${PORT}/login.html`);
    console.log(` OAuth Callback:   ${config.redirectUri}`);
    console.log(` Google OAuth:     ${config.isConfigured ? 'Configured ✓' : 'Setup Required (see .env)'}`);
    console.log(` Calendar Scopes:  events, readonly (Mandatory)`);
    console.log(` AI Proxy:         POST http://localhost:${PORT}/api/ai/chat`);
    console.log(`====================================================`);
  });
}

module.exports = server;
