const http = require('http');
const { EventEmitter } = require('events');
const server = require('./server.js');

// Mock request / response helper for in-process testing
function testRequest(options = {}) {
  return new Promise((resolve) => {
    const req = new EventEmitter();
    req.method = options.method || 'GET';
    req.url = options.url || '/';
    req.headers = options.headers || {};

    const resHeaders = {};
    let statusCode = 200;
    let body = '';

    const res = new EventEmitter();
    res.writeHead = function(code, headers = {}) {
      statusCode = code;
      Object.keys(headers).forEach(k => {
        resHeaders[k.toLowerCase()] = headers[k];
      });
    };
    res.setHeader = function(name, val) {
      resHeaders[name.toLowerCase()] = val;
    };
    res.getHeader = function(name) {
      return resHeaders[name.toLowerCase()];
    };
    res.write = function(chunk) {
      body += chunk;
      return true;
    };
    res.end = function(chunk) {
      if (chunk) body += chunk;
      resolve({ statusCode, headers: resHeaders, body });
    };

    server.emit('request', req, res);

    if (options.body) {
      req.emit('data', Buffer.from(options.body));
    }
    req.emit('end');
  });
}

async function runTests() {
  console.log('=== STARTING PLANORA AI GOOGLE AUTH & CALENDAR TESTS ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, extra = '') {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName} ${extra}`);
      failed++;
    }
  }

  // 1. Mandatory Protection: Direct visit to / without session must redirect to /login.html
  let res = await testRequest({ method: 'GET', url: '/' });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html', 'Direct visit to / redirects (302) to /login.html');

  // 2. Mandatory Protection: Direct visit to /index.html without session must redirect to /login.html
  res = await testRequest({ method: 'GET', url: '/index.html' });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html', 'Direct visit to /index.html redirects (302) to /login.html');

  // 3. Mandatory Protection: Direct visit to /dashboard.html without session must redirect to /login.html
  res = await testRequest({ method: 'GET', url: '/dashboard.html' });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html', 'Direct visit to /dashboard.html redirects (302) to /login.html');

  // 4. Mandatory Protection: Direct visit to /dashboard without session must redirect to /login.html
  res = await testRequest({ method: 'GET', url: '/dashboard' });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html', 'Direct visit to /dashboard redirects (302) to /login.html');

  // 5. Public Access: /login.html must be publicly accessible
  res = await testRequest({ method: 'GET', url: '/login.html' });
  assert(res.statusCode === 200, 'Public visit to /login.html returns 200 OK');
  assert(res.body.includes('Welcome to Planora AI'), 'Login page contains heading "Welcome to Planora AI"');
  assert(res.body.includes('Your schedule, intelligently managed.'), 'Login page contains subtitle');
  assert(res.body.includes('Continue with Google'), 'Login page contains "Continue with Google" button');

  // 6. Public Access: Static assets (/styles.css, /app.js, /notification_chime.wav)
  res = await testRequest({ method: 'GET', url: '/styles.css' });
  assert(res.statusCode === 200, 'Static file /styles.css returns 200 OK');

  res = await testRequest({ method: 'GET', url: '/app.js' });
  assert(res.statusCode === 200, 'Static file /app.js returns 200 OK');

  res = await testRequest({ method: 'GET', url: '/notification_chime.wav' });
  assert(res.statusCode === 200, 'Notification audio /notification_chime.wav returns 200 OK');

  // 7. Auth Status API
  res = await testRequest({ method: 'GET', url: '/api/auth/status' });
  assert(res.statusCode === 200, '/api/auth/status returns 200 OK');
  const statusData = JSON.parse(res.body);
  assert(typeof statusData.configured === 'boolean', '/api/auth/status reports configured boolean');

  // 8. Auth /me API without session
  res = await testRequest({ method: 'GET', url: '/api/auth/me' });
  assert(res.statusCode === 200, '/api/auth/me returns 200 OK');
  const meData = JSON.parse(res.body);
  assert(meData.authenticated === false, 'Unauthenticated /api/auth/me returns authenticated: false');

  // 9. OAuth /auth/google endpoint
  res = await testRequest({ method: 'GET', url: '/auth/google' });
  if (statusData.configured) {
    assert(res.statusCode === 302 && res.headers['location'].startsWith('https://accounts.google.com/o/oauth2/v2/auth'), '/auth/google redirects to official Google OAuth endpoint');
    assert(res.headers['location'].includes('calendar.events'), '/auth/google requests calendar.events scope');
    assert(res.headers['location'].includes('calendar.readonly'), '/auth/google requests calendar.readonly scope');
  } else {
    assert(res.statusCode === 302 && res.headers['location'] === '/login.html?error=config_missing', '/auth/google safely redirects to config_missing when credentials are placeholders');
  }

  // 9b. Test configured Google OAuth URL generation
  process.env.GOOGLE_CLIENT_ID = 'test-client-id-123.apps.googleusercontent.com';
  process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret-xyz';
  res = await testRequest({ method: 'GET', url: '/auth/google' });
  assert(res.statusCode === 302 && res.headers['location'].startsWith('https://accounts.google.com/o/oauth2/v2/auth'), 'Configured /auth/google redirects to accounts.google.com');
  assert(res.headers['location'].includes('client_id=test-client-id-123.apps.googleusercontent.com'), 'Google Auth URL contains correct client_id');
  assert(res.headers['location'].includes('calendar.events'), 'Google Auth URL requests calendar.events scope');
  assert(res.headers['location'].includes('calendar.readonly'), 'Google Auth URL requests calendar.readonly scope');
  assert(res.headers['location'].includes('access_type=offline'), 'Google Auth URL includes access_type=offline');
  assert(res.headers['location'].includes('prompt=consent'), 'Google Auth URL includes prompt=consent');
  assert(res.headers['set-cookie'] && res.headers['set-cookie'].includes('oauth_state='), 'Google Auth sets secure oauth_state cookie');
  delete process.env.GOOGLE_CLIENT_ID;
  delete process.env.GOOGLE_CLIENT_SECRET;

  // 10. OAuth Callback Error Handling: User denies calendar permission
  res = await testRequest({ method: 'GET', url: '/auth/google/callback?error=access_denied' });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html?error=calendar_denied', 'Google access_denied error redirects to calendar_denied');

  // 11. OAuth Callback Error Handling: Invalid CSRF state
  res = await testRequest({ method: 'GET', url: '/auth/google/callback?code=fake_code&state=bad_state' });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html?error=invalid_state', 'Invalid CSRF state redirects to invalid_state');

  // 12. Authenticated Session Simulation:
  const testSessionId = 'test_sess_' + Date.now();
  global._planoraSessions.set(testSessionId, {
    id: testSessionId,
    user: {
      id: 'g_user_123456789',
      name: 'Vilas Golhar',
      email: 'vilasgolhar65@gmail.com',
      picture: 'https://lh3.googleusercontent.com/a/test-avatar',
      avatar: 'VG',
      calendarGranted: true,
      provider: 'google-oauth2'
    },
    tokens: {
      access_token: 'test_access_token',
      expires_at: Date.now() + 3600000,
      scope: 'openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly'
    },
    createdAt: Date.now()
  });

  // Verify authenticated /api/auth/me
  res = await testRequest({
    method: 'GET',
    url: '/api/auth/me',
    headers: { 'cookie': `planora_session=${testSessionId}` }
  });
  assert(res.statusCode === 200, 'Authenticated /api/auth/me returns 200 OK');
  const authMeData = JSON.parse(res.body);
  assert(authMeData.authenticated === true, 'Authenticated /api/auth/me returns authenticated: true');
  assert(authMeData.user.email === 'vilasgolhar65@gmail.com', 'Authenticated user email matches Google account');
  assert(authMeData.user.calendarGranted === true, 'Authenticated user has calendarGranted: true');

  // Verify authenticated dashboard access
  res = await testRequest({
    method: 'GET',
    url: '/index.html',
    headers: { 'cookie': `planora_session=${testSessionId}` }
  });
  assert(res.statusCode === 200, 'Authenticated user can access /index.html (200 OK)');

  // 13. Verify Logout API
  res = await testRequest({
    method: 'POST',
    url: '/api/auth/logout',
    headers: { 'cookie': `planora_session=${testSessionId}` }
  });
  assert(res.statusCode === 200, 'Logout API returns 200 OK');
  assert(!global._planoraSessions.has(testSessionId), 'Session deleted from server session store on logout');

  // After logout, accessing /index.html must redirect to /login.html
  res = await testRequest({
    method: 'GET',
    url: '/index.html',
    headers: { 'cookie': `planora_session=${testSessionId}` }
  });
  assert(res.statusCode === 302 && res.headers['location'] === '/login.html', 'Post-logout visit to /index.html redirects to /login.html');

  console.log(`\n=== TEST SUMMARY: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
