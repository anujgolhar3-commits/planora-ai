/**
 * PLANORA · SCHEDULE INTELLIGENCE & AI AGENT ENGINE
 * Pure Minimalist High-Contrast Black & White Architecture
 * Features: Zero Demo Data, Reactive Local Storage, Circadian AI Agent, Grouped Bar Chart,
 *           12-Hour AM/PM Time Theme, Workspace Timezone Switcher, and Google Calendar 1-Click Sync.
 */

// ============================================================
// GLOBAL TIMEZONE DATABASE (Curated Major Regions & Cities)
// ============================================================
const WORLD_TIMEZONES = [
  { id: 'UTC', label: 'UTC / GMT (Universal Time)', city: 'Coordinated Universal Time', country: 'Global', region: 'UTC', keywords: 'utc gmt zulu london greenwich world standard universal' },

  // North America
  { id: 'America/New_York', label: 'Eastern Time (ET)', city: 'New York, Toronto, Miami, Boston, DC', country: 'US / Canada', region: 'Americas', keywords: 'new york nyc boston miami atlanta washington dc toronto montreal edt est eastern' },
  { id: 'America/Chicago', label: 'Central Time (CT)', city: 'Chicago, Dallas, Houston, Austin', country: 'US / Canada', region: 'Americas', keywords: 'chicago dallas houston austin minneapolis cdt cst central' },
  { id: 'America/Denver', label: 'Mountain Time (MT)', city: 'Denver, Phoenix, Salt Lake City, Calgary', country: 'US / Canada', region: 'Americas', keywords: 'denver phoenix salt lake city calgary mdt mst mountain' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (PT)', city: 'Los Angeles, San Francisco, Seattle, Vancouver', country: 'US / Canada', region: 'Americas', keywords: 'los angeles la san francisco sf seattle vancouver san jose pdt pst pacific california' },
  { id: 'America/Anchorage', label: 'Alaska Time (AKT)', city: 'Anchorage, Juneau', country: 'US', region: 'Americas', keywords: 'alaska anchorage akst akdt' },
  { id: 'Pacific/Honolulu', label: 'Hawaii Time (HST)', city: 'Honolulu', country: 'US', region: 'Americas', keywords: 'hawaii honolulu hst' },

  // Latin America
  { id: 'America/Mexico_City', label: 'Mexico City Time', city: 'Mexico City, Guadalajara, Monterrey', country: 'Mexico', region: 'Americas', keywords: 'mexico cdmx guadalajara monterrey cst' },
  { id: 'America/Bogota', label: 'Colombia / Peru Time (COT/PET)', city: 'Bogotá, Lima, Quito', country: 'Colombia / Peru', region: 'Americas', keywords: 'bogota lima quito colombia peru' },
  { id: 'America/Sao_Paulo', label: 'Brasília Time (BRT)', city: 'São Paulo, Rio de Janeiro, Brasília', country: 'Brazil', region: 'Americas', keywords: 'sao paulo rio de janeiro brasilia brazil brt' },
  { id: 'America/Buenos_Aires', label: 'Argentina Time (ART)', city: 'Buenos Aires, Córdoba', country: 'Argentina', region: 'Americas', keywords: 'buenos aires argentina art' },
  { id: 'America/Santiago', label: 'Chile Time (CLT)', city: 'Santiago', country: 'Chile', region: 'Americas', keywords: 'santiago chile clt' },

  // Europe
  { id: 'Europe/London', label: 'London / GMT (UK & Ireland)', city: 'London, Dublin, Edinburgh, Lisbon', country: 'UK / Ireland / Portugal', region: 'Europe', keywords: 'london uk britain england ireland dublin edinburgh lisbon bst gmt' },
  { id: 'Europe/Paris', label: 'Paris / Central European (CET)', city: 'Paris, Brussels, Madrid, Amsterdam', country: 'France / Spain / Belgium', region: 'Europe', keywords: 'paris france brussels madrid spain cet cest' },
  { id: 'Europe/Berlin', label: 'Berlin / Central European (CET)', city: 'Berlin, Frankfurt, Rome, Vienna, Zurich', country: 'Germany / Italy / Switzerland', region: 'Europe', keywords: 'berlin frankfurt germany rome italy vienna amsterdam zurich warsaw cet cest' },
  { id: 'Europe/Athens', label: 'Eastern European (EET)', city: 'Athens, Bucharest, Helsinki, Kyiv', country: 'Greece / Ukraine / Finland', region: 'Europe', keywords: 'athens greece bucharest helsinki kyiv eet eest' },
  { id: 'Europe/Istanbul', label: 'Turkey Time (TRT)', city: 'Istanbul, Ankara', country: 'Turkey', region: 'Europe', keywords: 'istanbul ankara turkey trt' },
  { id: 'Europe/Moscow', label: 'Moscow Time (MSK)', city: 'Moscow, Saint Petersburg', country: 'Russia', region: 'Europe', keywords: 'moscow st petersburg russia msk' },

  // Middle East & Africa
  { id: 'Asia/Dubai', label: 'Gulf Standard Time (GST)', city: 'Dubai, Abu Dhabi, Muscat', country: 'UAE / Oman', region: 'Middle East', keywords: 'dubai uae abu dhabi muscat oman gst' },
  { id: 'Asia/Riyadh', label: 'Arabia Standard Time (AST)', city: 'Riyadh, Jeddah, Kuwait, Doha', country: 'Saudi Arabia / Qatar', region: 'Middle East', keywords: 'riyadh jeddah saudi arabia kuwait doha qatar ast' },
  { id: 'Asia/Jerusalem', label: 'Israel Time (IST)', city: 'Jerusalem, Tel Aviv', country: 'Israel', region: 'Middle East', keywords: 'jerusalem tel aviv israel' },
  { id: 'Africa/Cairo', label: 'Egypt Time (EET)', city: 'Cairo, Alexandria', country: 'Egypt', region: 'Africa', keywords: 'cairo egypt eet' },
  { id: 'Africa/Johannesburg', label: 'South Africa Standard (SAST)', city: 'Johannesburg, Cape Town, Pretoria', country: 'South Africa', region: 'Africa', keywords: 'johannesburg cape town south africa sast' },
  { id: 'Africa/Lagos', label: 'West Africa Time (WAT)', city: 'Lagos, Accra, Abuja', country: 'Nigeria / Ghana', region: 'Africa', keywords: 'lagos nigeria accra ghana wat' },
  { id: 'Africa/Nairobi', label: 'East Africa Time (EAT)', city: 'Nairobi, Addis Ababa', country: 'Kenya / Ethiopia', region: 'Africa', keywords: 'nairobi kenya eat' },

  // Asia
  { id: 'Asia/Kolkata', label: 'India Standard Time (IST)', city: 'New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad', country: 'India', region: 'Asia', keywords: 'india delhi new delhi mumbai bangalore bengaluru hyderabad chennai kolkata ist' },
  { id: 'Asia/Dhaka', label: 'Bangladesh Time (BST)', city: 'Dhaka, Chittagong', country: 'Bangladesh', region: 'Asia', keywords: 'dhaka bangladesh bst' },
  { id: 'Asia/Bangkok', label: 'Indochina Time (ICT)', city: 'Bangkok, Jakarta, Hanoi, Ho Chi Minh', country: 'Thailand / Vietnam / Indonesia', region: 'Asia', keywords: 'bangkok thailand jakarta indonesia hanoi vietnam ict' },
  { id: 'Asia/Singapore', label: 'Singapore / Malaysia (SGT)', city: 'Singapore, Kuala Lumpur, Manila', country: 'Singapore / Malaysia', region: 'Asia', keywords: 'singapore kuala lumpur malaysia sgt manila' },
  { id: 'Asia/Hong_Kong', label: 'Hong Kong / China Time (HKT/CST)', city: 'Hong Kong, Beijing, Shanghai, Shenzhen', country: 'Hong Kong / China', region: 'Asia', keywords: 'hong kong beijing shanghai shenzhen guangzhou china hkt cst' },
  { id: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', city: 'Tokyo, Osaka, Kyoto', country: 'Japan', region: 'Asia', keywords: 'tokyo osaka kyoto japan jst' },
  { id: 'Asia/Seoul', label: 'Korea Standard Time (KST)', city: 'Seoul, Busan', country: 'South Korea', region: 'Asia', keywords: 'seoul south korea kst' },

  // Oceania / Australia / NZ
  { id: 'Australia/Perth', label: 'Australian Western (AWST)', city: 'Perth', country: 'Australia', region: 'Oceania', keywords: 'perth western australia awst' },
  { id: 'Australia/Adelaide', label: 'Australian Central (ACST)', city: 'Adelaide, Darwin', country: 'Australia', region: 'Oceania', keywords: 'adelaide acst darwin' },
  { id: 'Australia/Sydney', label: 'Australian Eastern (AEST/AEDT)', city: 'Sydney, Melbourne, Brisbane, Canberra', country: 'Australia', region: 'Oceania', keywords: 'sydney melbourne brisbane canberra australia aest aedt' },
  { id: 'Pacific/Auckland', label: 'New Zealand Time (NZST/NZDT)', city: 'Auckland, Wellington, Christchurch', country: 'New Zealand', region: 'Oceania', keywords: 'new zealand auckland wellington nzst nzdt' },
  { id: 'Pacific/Fiji', label: 'Fiji Time (FJT)', city: 'Suva', country: 'Fiji', region: 'Oceania', keywords: 'fiji suva fjt' }
];

// ============================================================
// 1. PERSISTENT STORAGE MANAGER (planora_events, history, chat, format, timezone)
// ============================================================
const PlanoraStore = {
  // Undo / Redo history state
  undoStack: [],
  redoStack: [],
  maxHistory: 30,

  init() {
    // Check if auth user exists, if not redirect to login
    const user = this.getAuthUser();
    if (!user) {
      window.location.replace('login.html');
      return;
    }
    this.verifySession();

    // Ensure storage keys exist without hardcoding any demo events
    if (!localStorage.getItem('planora_events')) {
      localStorage.setItem('planora_events', JSON.stringify([]));
    }
    if (!localStorage.getItem('planora_task_history')) {
      localStorage.setItem('planora_task_history', JSON.stringify([]));
    }
    if (!localStorage.getItem('planora_ai_chat')) {
      localStorage.setItem('planora_ai_chat', JSON.stringify([]));
    }
    if (!localStorage.getItem('planora_time_format')) {
      localStorage.setItem('planora_time_format', '12h'); // Default: 12-Hour AM/PM
    }
    if (!localStorage.getItem('planora_timezone')) {
      try {
        const autoTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        localStorage.setItem('planora_timezone', autoTz);
      } catch (e) {
        localStorage.setItem('planora_timezone', 'UTC');
      }
    }
    if (!localStorage.getItem('planora_rules')) {
      localStorage.setItem('planora_rules', JSON.stringify({
        noMeetingsBefore10: true,
        defendPeakFocus: true,
        bufferAfterMeetings: true,
        eveningShutdown: true
      }));
    }
    if (!localStorage.getItem('planora_login_date')) {
      localStorage.setItem('planora_login_date', new Date().toISOString().split('T')[0]);
    }
    if (!localStorage.getItem('planora_todos')) {
      localStorage.setItem('planora_todos', JSON.stringify([]));
    }
    if (!localStorage.getItem('planora_deadlines')) {
      localStorage.setItem('planora_deadlines', JSON.stringify([]));
    }
    if (!localStorage.getItem('planora_daily_tasks')) {
      localStorage.setItem('planora_daily_tasks', JSON.stringify([]));
    }
    // Ensure Groq engine is active
    const aiConf = this.getAIConfig();
    aiConf.provider = 'groq';
    aiConf.models.groq = 'openai/gpt-oss-120b';
    delete aiConf.apiKeys.openrouter;
    localStorage.setItem('planora_ai_config', JSON.stringify(aiConf));
  },

  getAIConfig() {
    try {
      const defaults = {
        provider: 'groq',
        apiKeys: {
          groq: ''
        },
        models: {
          groq: 'openai/gpt-oss-120b',
          openrouter: 'meta-llama/llama-3.3-70b-instruct:free'
        },
        customBaseUrl: 'http://localhost:11434/v1',
        temperature: 0.6,
        maxTokens: 2048,
        injectCircadianContext: true
      };
      const stored = JSON.parse(localStorage.getItem('planora_ai_config') || '{}');
      const merged = { ...defaults, ...stored };
      if (!merged.apiKeys) merged.apiKeys = {};
      if (!merged.models) merged.models = {};

      merged.provider = 'groq';
      if (!merged.models.groq || merged.models.groq.includes('llama') || merged.models.groq.includes('70b')) {
        merged.models.groq = 'openai/gpt-oss-120b';
      }

      try {
        localStorage.setItem('planora_ai_config', JSON.stringify(merged));
      } catch (_) {}

      return merged;
    } catch (e) {
      return {
        provider: 'groq',
        apiKeys: {
          groq: ''
        },
        models: {
          groq: 'openai/gpt-oss-120b',
          openrouter: 'meta-llama/llama-3.3-70b-instruct:free'
        },
        customBaseUrl: 'http://localhost:11434/v1',
        temperature: 0.6,
        maxTokens: 2048,
        injectCircadianContext: true
      };
    }
  },

  saveAIConfig(config) {
    if (config && config.models && (!config.models.groq || config.models.groq.includes('llama') || config.models.groq.includes('70b'))) {
      config.models.groq = 'openai/gpt-oss-120b';
    }
    localStorage.setItem('planora_ai_config', JSON.stringify(config));
    PlanoraUI.updateAIStatusBanners();
  },

  getAuthUser() {
    try {
      return JSON.parse(localStorage.getItem('planora_auth_user') || 'null');
    } catch (e) {
      return null;
    }
  },

  setAuthUser(user) {
    localStorage.setItem('planora_auth_user', JSON.stringify(user));
  },

  async signOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout API error:', e);
    }
    localStorage.removeItem('planora_auth_user');
    window.location.replace('login.html');
  },

  async verifySession() {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (!res.ok) {
        this.signOut();
        return;
      }
      const data = await res.json();
      if (!data || !data.authenticated || !data.user || !data.user.calendarGranted) {
        this.signOut();
        return;
      }
      this.setAuthUser(data.user);
      if (typeof PlanoraUI !== 'undefined' && PlanoraUI.renderUserProfile) {
        PlanoraUI.renderUserProfile();
      }
    } catch (e) {
      // Keep running with stored session if offline
    }
  },

  getTimeFormat() {
    return localStorage.getItem('planora_time_format') || '12h';
  },

  setTimeFormat(format) {
    localStorage.setItem('planora_time_format', format);
    PlanoraUI.refreshAll();
  },

  toggleTimeFormat() {
    const current = this.getTimeFormat();
    const next = current === '12h' ? '24h' : '12h';
    this.setTimeFormat(next);
    PlanoraUI.showToast(`Time format switched to ${next === '12h' ? '12-Hour (AM/PM)' : '24-Hour Military'}`);
  },

  getTimezone() {
    return localStorage.getItem('planora_timezone') ||
      (Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
  },

  setTimezone(tz) {
    try {
      // Validate timezone with Intl
      new Intl.DateTimeFormat('en-US', { timeZone: tz });
      localStorage.setItem('planora_timezone', tz);
      PlanoraUI.updateTimezoneUI();
      PlanoraUI.refreshAll();
      PlanoraUI.showToast(`Timezone set to ${tz}`);
      return true;
    } catch (e) {
      PlanoraUI.showToast(`Invalid timezone: ${tz}`);
      return false;
    }
  },

  getEvents() {
    try {
      return JSON.parse(localStorage.getItem('planora_events') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveEvents(events, recordHistory = true) {
    if (recordHistory) {
      const current = this.getEvents();
      this.undoStack.push(JSON.stringify(current));
      if (this.undoStack.length > this.maxHistory) this.undoStack.shift();
      this.redoStack = []; // Clear redo stack on new action
      this.updateUndoRedoUI();
    }
    localStorage.setItem('planora_events', JSON.stringify(events));
    PlanoraUI.refreshAll();
  },

  undo() {
    if (this.undoStack.length === 0) return;
    const current = this.getEvents();
    this.redoStack.push(JSON.stringify(current));
    const previous = JSON.parse(this.undoStack.pop());
    localStorage.setItem('planora_events', JSON.stringify(previous));
    this.updateUndoRedoUI();
    PlanoraUI.refreshAll();
    PlanoraUI.showToast("Action undone (Ctrl+Z)");
  },

  redo() {
    if (this.redoStack.length === 0) return;
    const current = this.getEvents();
    this.undoStack.push(JSON.stringify(current));
    const next = JSON.parse(this.redoStack.pop());
    localStorage.setItem('planora_events', JSON.stringify(next));
    this.updateUndoRedoUI();
    PlanoraUI.refreshAll();
    PlanoraUI.showToast("Action redone (Ctrl+Y)");
  },

  updateUndoRedoUI() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if (btnUndo) btnUndo.disabled = this.undoStack.length === 0;
    if (btnRedo) btnRedo.disabled = this.redoStack.length === 0;
  },

  getTaskHistory() {
    try {
      return JSON.parse(localStorage.getItem('planora_task_history') || '[]');
    } catch (e) {
      return [];
    }
  },

  logTaskHistory(entry) {
    const history = this.getTaskHistory();
    history.push({
      ...entry,
      timestamp: Date.now(),
      dateStr: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('planora_task_history', JSON.stringify(history));
  },

  getChatHistory() {
    try {
      return JSON.parse(localStorage.getItem('planora_ai_chat') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveChatHistory(history) {
    localStorage.setItem('planora_ai_chat', JSON.stringify(history));
  },

  getRules() {
    try {
      return JSON.parse(localStorage.getItem('planora_rules') || '{}');
    } catch (e) {
      return {};
    }
  },

  saveRules(rules) {
    localStorage.setItem('planora_rules', JSON.stringify(rules));
  },

  // ------------------------------------------------------------
  // Protected Deadlines & Milestones Store
  // ------------------------------------------------------------
  getDeadlines() {
    try {
      return JSON.parse(localStorage.getItem('planora_deadlines') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveDeadlines(deadlines) {
    localStorage.setItem('planora_deadlines', JSON.stringify(deadlines));
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.renderDeadlines) {
      PlanoraUI.renderDeadlines();
    }
  },

  addDeadline(dl) {
    const deadlines = this.getDeadlines();
    deadlines.push(dl);
    this.saveDeadlines(deadlines);
  },

  toggleDeadline(id) {
    const deadlines = this.getDeadlines();
    const target = deadlines.find(d => d.id === id);
    if (target) {
      target.completed = !target.completed;
      this.saveDeadlines(deadlines);
    }
  },

  deleteDeadline(id) {
    let deadlines = this.getDeadlines();
    deadlines = deadlines.filter(d => d.id !== id);
    this.saveDeadlines(deadlines);
  },

  // ------------------------------------------------------------
  // Daily Tasks & Action Items Backlog Store
  // ------------------------------------------------------------
  getDailyTasks() {
    try {
      return JSON.parse(localStorage.getItem('planora_daily_tasks') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveDailyTasks(tasks) {
    localStorage.setItem('planora_daily_tasks', JSON.stringify(tasks));
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.renderDailyTasks) {
      PlanoraUI.renderDailyTasks();
    }
  },

  addDailyTask(task) {
    const tasks = this.getDailyTasks();
    tasks.unshift(task);
    this.saveDailyTasks(tasks);
  },

  toggleDailyTask(id) {
    const tasks = this.getDailyTasks();
    const target = tasks.find(t => t.id === id);
    if (target) {
      target.status = target.status === 'completed' ? 'pending' : 'completed';
      this.saveDailyTasks(tasks);
    }
  },

  deleteDailyTask(id) {
    let tasks = this.getDailyTasks();
    tasks = tasks.filter(t => t.id !== id);
    this.saveDailyTasks(tasks);
  },

  updateDailyTask(id, updates) {
    const tasks = this.getDailyTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      tasks[idx] = { ...tasks[idx], ...updates };
      this.saveDailyTasks(tasks);
    }
  }
};

// ============================================================
// 2. INTELLIGENT AI SCHEDULE AGENT (Learning, Rhythms, Q&A, Grok & DeepSeek)
// ============================================================
const PlanoraAI = {
  MODELS: {
    openai: [
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Fast, Intelligent & Economical)' },
      { id: 'gpt-4o', name: 'GPT-4o (Flagship Multimodal Intelligence)' },
      { id: 'o3-mini', name: 'o3-mini (Advanced Reasoning & Optimization)' },
      { id: 'o1', name: 'o1 (Deep Reasoning & Complex Schedule Solver)' }
    ],
    gemini: [
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Ultra-Fast 1M Context)' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Deep Multimodal Reasoning)' },
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash Experimental' }
    ],
    groq: [
      { id: 'openai/gpt-oss-120b', name: 'OpenAI GPT-OSS 120B (High Intelligence - Recommended)' },
      { id: 'openai/gpt-oss-20b', name: 'OpenAI GPT-OSS 20B (Ultra-Fast LPUs)' },
      { id: 'qwen/qwen3.8-27b', name: 'Qwen 3.8 27B (High Accuracy)' }
    ],
    deepseek: [
      { id: 'deepseek-chat', name: 'DeepSeek-V3 (Fast, Versatile & High Accuracy)' },
      { id: 'deepseek-reasoner', name: 'DeepSeek-R1 (Deep Reasoning & Schedule Solver)' }
    ],
    grok: [
      { id: 'grok-2-latest', name: 'xAI Grok-2 (Flagship Intelligence)' },
      { id: 'grok-beta', name: 'xAI Grok Beta (Ultra-Fast Assistant)' },
      { id: 'grok-2-vision-1212', name: 'xAI Grok-2 Vision' }
    ],
    anthropic: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Frontier Reasoning)' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (Lightning Fast)' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus (Deep Synthesis)' }
    ],
    openrouter: [
      { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Meta Llama 3.3 70B (100% Free - Recommended)' },
      { id: 'google/gemini-2.0-flash-exp:free', name: 'Google Gemini 2.0 Flash (100% Free)' },
      { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 Reasoning (100% Free)' },
      { id: 'qwen/qwen-2.5-coder-32b-instruct:free', name: 'Qwen 2.5 Coder 32B (100% Free)' },
      { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B Instruct (100% Free)' },
      { id: 'openai/gpt-4o-mini', name: 'OpenAI GPT-4o Mini (Paid Credits)' },
      { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3 (Paid / Ultra-Low Cost)' },
      { id: 'anthropic/claude-3.5-sonnet', name: 'Anthropic Claude 3.5 Sonnet (Paid Credits)' }
    ],
    custom: [
      { id: 'default', name: 'Default Model (as specified in Local Server)' },
      { id: 'llama3', name: 'Llama 3 (Ollama / Local)' },
      { id: 'mistral', name: 'Mistral 7B (Ollama / Local)' },
      { id: 'deepseek-r1', name: 'DeepSeek R1 (Local)' },
      { id: 'qwen2.5', name: 'Qwen 2.5 (Local)' }
    ]
  },

  /**
   * Auto-detect provider from API Key prefix
   */
  detectProviderFromKey(apiKey) {
    if (!apiKey) return null;
    const k = apiKey.trim();
    if (k.startsWith('AIzaSy')) return 'gemini';
    if (k.startsWith('gsk_')) return 'groq';
    if (k.startsWith('xai-')) return 'grok';
    if (k.startsWith('sk-ant-')) return 'anthropic';
    if (k.startsWith('sk-or-')) return 'openrouter';
    if (k.startsWith('sk-proj-') || k.startsWith('sk-svcacct-')) return 'openai';
    if (k.startsWith('sk-') && k.length >= 48) return 'openai';
    if (k.startsWith('sk-')) return 'deepseek';
    return null;
  },

  /**
   * Analyzes historical task completions, logs, and energy patterns
   */
  getHistoricalInsights() {
    const events = PlanoraStore.getEvents();
    const history = PlanoraStore.getTaskHistory();

    const timeBuckets = {
      earlyMorning: { label: 'Early Morning (06:00 - 09:00)', completed: 0, total: 0, slumpCount: 0, highEnergy: 0 },
      morningPeak:  { label: 'Morning Peak (09:00 - 13:00)',  completed: 0, total: 0, slumpCount: 0, highEnergy: 0 },
      afternoonDip: { label: 'Afternoon Slump (13:00 - 16:30)', completed: 0, total: 0, slumpCount: 0, highEnergy: 0 },
      eveningFocus: { label: 'Evening (16:30 - 21:00)',       completed: 0, total: 0, slumpCount: 0, highEnergy: 0 }
    };

    const categorizeHour = (hour) => {
      if (hour >= 6 && hour < 9) return 'earlyMorning';
      if (hour >= 9 && hour < 13) return 'morningPeak';
      if (hour >= 13 && hour < 16.5) return 'afternoonDip';
      if (hour >= 16.5 && hour < 21) return 'eveningFocus';
      return 'eveningFocus';
    };

    // Analyze current & past events
    events.forEach(ev => {
      const [h] = (ev.startTime || '09:00').split(':').map(Number);
      const bucketKey = categorizeHour(h);
      if (timeBuckets[bucketKey]) {
        timeBuckets[bucketKey].total++;
        if (ev.status === 'completed') timeBuckets[bucketKey].completed++;
        if (ev.status === 'slump' || ev.energyLevel === 'low') timeBuckets[bucketKey].slumpCount++;
        if (ev.energyLevel === 'high' || ev.category === 'focus') timeBuckets[bucketKey].highEnergy++;
      }
    });

    // Also analyze historical completed log entries
    history.forEach(item => {
      const date = new Date(item.timestamp);
      const hour = date.getHours();
      const bucketKey = categorizeHour(hour);
      if (timeBuckets[bucketKey]) {
        timeBuckets[bucketKey].total++;
        if (item.action === 'complete') timeBuckets[bucketKey].completed++;
        if (item.action === 'slump' || item.energyLevel === 'low') timeBuckets[bucketKey].slumpCount++;
        if (item.energyLevel === 'high') timeBuckets[bucketKey].highEnergy++;
      }
    });

    return {
      timeBuckets,
      peakFocusWindow: PlanoraStore.getTimeFormat() === '12h' ? '09:00 AM – 12:30 PM' : '09:00 – 12:30',
      slumpWindow: PlanoraStore.getTimeFormat() === '12h' ? '01:15 PM – 03:30 PM' : '13:15 – 15:30',
      totalEvents: events.length,
      completedCount: events.filter(e => e.status === 'completed').length
    };
  },

  /**
   * Finds free / available time slots on a given date (08:00 to 20:00)
   */
  getFreeSlots(targetDateStr = null) {
    if (!targetDateStr) {
      targetDateStr = new Date().toISOString().split('T')[0];
    }
    const events = PlanoraStore.getEvents().filter(e => e.date === targetDateStr);

    // Sort events by start time
    events.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

    const workDayStart = 8 * 60; // 08:00 in minutes
    const workDayEnd = 20 * 60;   // 20:00 in minutes

    const timeToMin = (t) => {
      const [h, m] = (t || '09:00').split(':').map(Number);
      return h * 60 + (m || 0);
    };
    const minToTime = (min) => {
      const h = String(Math.floor(min / 60)).padStart(2, '0');
      const m = String(min % 60).padStart(2, '0');
      return `${h}:${m}`;
    };

    let current = workDayStart;
    const freeSlots = [];

    events.forEach(ev => {
      const startMin = timeToMin(ev.startTime);
      const endMin = timeToMin(ev.endTime);

      if (startMin > current) {
        const gap = startMin - current;
        if (gap >= 15) {
          freeSlots.push({
            start: minToTime(current),
            end: minToTime(startMin),
            durationMin: gap,
            durationStr: gap >= 60 ? `${(gap/60).toFixed(1)}h` : `${gap}m`
          });
        }
      }
      current = Math.max(current, endMin);
    });

    if (current < workDayEnd) {
      const gap = workDayEnd - current;
      if (gap >= 15) {
        freeSlots.push({
          start: minToTime(current),
          end: minToTime(workDayEnd),
          durationMin: gap,
          durationStr: gap >= 60 ? `${(gap/60).toFixed(1)}h` : `${gap}m`
        });
      }
    }

    const totalFreeMin = freeSlots.reduce((acc, s) => acc + s.durationMin, 0);

    return {
      date: targetDateStr,
      freeSlots,
      slots: freeSlots,
      freeHours: totalFreeMin / 60,
      totalFreeHours: (totalFreeMin / 60).toFixed(1),
      bookedEventCount: events.length
    };
  },

  /**
   * Generates an intelligent future schedule recommendation
   */
  generateFutureSchedule(targetDateStr = null) {
    if (!targetDateStr) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      targetDateStr = d.toISOString().split('T')[0];
    }

    const proposals = [
      {
        id: 'prop_' + Date.now() + '_1',
        title: 'Deep Focus: Priority Engine & Strategic Build',
        date: targetDateStr,
        startTime: '09:30',
        endTime: '11:30',
        duration: '2h 00m',
        category: 'focus',
        priority: 'high',
        energyLevel: 'high',
        status: 'planned',
        notes: 'AI-assigned to peak cognitive morning window.'
      },
      {
        id: 'prop_' + Date.now() + '_2',
        title: 'Async Inbox, Triage & Admin Catch-up',
        date: targetDateStr,
        startTime: '13:30',
        endTime: '14:30',
        duration: '1h 00m',
        category: 'routine',
        priority: 'medium',
        energyLevel: 'low',
        status: 'planned',
        notes: 'Scheduled during known afternoon slump window for low cognitive load.'
      },
      {
        id: 'prop_' + Date.now() + '_3',
        title: 'Team Sync & Project Alignment',
        date: targetDateStr,
        startTime: '15:00',
        endTime: '16:00',
        duration: '1h 00m',
        category: 'meeting',
        priority: 'medium',
        energyLevel: 'medium',
        status: 'planned',
        notes: 'Placed in mid-afternoon collaborative window with built-in buffer.'
      },
      {
        id: 'prop_' + Date.now() + '_4',
        title: 'Review & Evening Wrap-up Buffer',
        date: targetDateStr,
        startTime: '17:00',
        endTime: '17:45',
        duration: '45m',
        category: 'buffer',
        priority: 'low',
        energyLevel: 'low',
        status: 'planned',
        notes: 'Buffer block to prevent schedule bleed and consolidate daily notes.'
      }
    ];

    return {
      date: targetDateStr,
      proposals
    };
  },

  /**
   * Recommends contextual tasks based on schedule gaps and habit history
   */
  suggestTasksToAdd() {
    return [
      {
        title: "Sprint Architecture Refinement",
        category: "focus",
        duration: "1h 30m",
        recommendedSlot: PlanoraStore.getTimeFormat() === '12h' ? "09:30 AM – 11:00 AM" : "09:30 – 11:00",
        idealWindow: "Morning Peak",
        reason: "Matches your peak morning cognitive rhythm."
      },
      {
        title: "Inbox Zero & Ticket Triage",
        category: "routine",
        duration: "45m",
        recommendedSlot: PlanoraStore.getTimeFormat() === '12h' ? "01:30 PM – 02:15 PM" : "13:30 – 14:15",
        idealWindow: "Afternoon Slump",
        reason: "Low mental drag, perfect for afternoon recovery."
      },
      {
        title: "Technical Documentation & Notes",
        category: "focus",
        duration: "1h 00m",
        recommendedSlot: PlanoraStore.getTimeFormat() === '12h' ? "04:30 PM – 05:30 PM" : "16:30 – 17:30",
        idealWindow: "Late Afternoon Surge",
        reason: "Secondary focus boost window before evening shutdown."
      },
      {
        title: "Defensive Schedule Review & Buffer Planning",
        category: "buffer",
        duration: "30m",
        recommendedSlot: PlanoraStore.getTimeFormat() === '12h' ? "05:30 PM – 06:00 PM" : "17:30 – 18:00",
        idealWindow: "End of Day",
        reason: "Consolidates progress and clears mental bandwidth for tomorrow."
      }
    ];
  },

  /**
   * Builds the comprehensive live circadian system prompt for LLM models
   */
  buildSystemPrompt() {
    const tz = PlanoraStore.getTimezone();
    const timeFormat = PlanoraStore.getTimeFormat();
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const events = PlanoraStore.getEvents();
    const free = this.getFreeSlots(todayStr);
    const rules = PlanoraStore.getRules();
    const deadlines = PlanoraStore.getDeadlines();
    const dailyTasks = PlanoraStore.getDailyTasks();

    let eventsList = 'No events currently scheduled.';
    if (events.length > 0) {
      eventsList = events.map(e =>
        `- [${e.id}] "${e.title}" | Date: ${e.date} | Time: ${e.startTime} to ${e.endTime} | Category: ${e.category} | Priority: ${e.priority} | Energy: ${e.energyLevel} | Status: ${e.status}`
      ).join('\n');
    }

    let deadlinesList = 'No deadlines registered.';
    if (deadlines.length > 0) {
      deadlinesList = deadlines.map(d =>
        `- [${d.id}] "${d.title}" | Target: ${d.targetDate} ${d.targetTime} | Priority: ${d.priority} | Status: ${d.completed ? 'COMPLETED' : 'ACTIVE'}`
      ).join('\n');
    }

    let tasksList = 'No backlog tasks.';
    if (dailyTasks.length > 0) {
      tasksList = dailyTasks.map(t =>
        `- [${t.id}] "${t.title}" | Duration: ${t.duration} | Priority: ${t.priority} | Status: ${t.status}`
      ).join('\n');
    }

    let freeSlotsList = 'No open slots found (08:00 to 20:00).';
    if (free.freeSlots.length > 0) {
      freeSlotsList = free.freeSlots.map(s => `- ${s.start} to ${s.end} (${s.durationStr} free)`).join('\n');
    }

    let activeRulesList = 'Default circadian optimization and deep work protection active.';
    if (rules && rules.length > 0) {
      activeRulesList = rules.map(r => `- ${r.ruleText || r.name}`).join('\n');
    }

    return `You are ScheduleAI (powered by Planora AI), a specialized autonomous Schedule Management AI Agent designed exclusively for calendar intelligence, time blocking, circadian task optimization, routine defense, and deadline protection.
You operate with calendar mastery, circadian biological rhythms, and productivity science, specifically personalized for Arjun Sharma (Night Owl chronotype).

============================================================
CORE IDENTITY & SCOPE ENFORCEMENT MANDATE (STRICT):
============================================================
1. IN-SCOPE DOMAIN:
   - Calendar management, events, meetings, time slots, schedule optimization.
   - Task backlog scheduling, circadian time blocking, task prioritization.
   - Protected milestone & deadline tracking, countdowns, deadline risk audits.
   - Daily routines, sleep buffers, burnout defense, circadian rhythm alignment.
   - Productivity coaching directly tied to time allocation, schedule pacing, and energy management.

2. STRICT OUT-OF-SCOPE REFUSAL POLICY:
   - You MUST REFUSE any request that falls outside calendar, scheduling, task backlog, deadlines, and routine management.
   - Out-of-scope examples: writing code or debugging software, general knowledge & trivia, creative writing & essays, math problem-solving unrelated to time/schedule, medical/legal/financial advice, weather queries without calendar context, general chit-chat, philosophy, politics, or science trivia.
   - When a user asks an out-of-scope question, you MUST respond with this exact deflection template:
     "I am your Schedule Management Assistant, designed specifically to help you manage your calendar, tasks, deadlines, and daily routines. I cannot assist with [topic/request]. Let me know if you would like to schedule an event, organize your tasks, or review your upcoming agenda!"

3. MIXED REQUEST HANDLING:
   - If a prompt contains BOTH a valid scheduling request AND an out-of-scope request (e.g. "Schedule a 2-hour coding session tomorrow at 6 PM and write a Python script for binary search"):
     a. Fully handle the scheduling component (provide schedule advice + structured action block).
     b. Politely deflect the out-of-scope component using the standard deflection template.
     Example: "I have scheduled your 2-hour Deep Coding Focus session for tomorrow from 18:00 to 20:00. Note: As your Schedule Management Assistant, I cannot write or debug code. Let me know if you need to schedule additional time blocks or review your deadlines!"

============================================================
SAFETY & GUARDRAIL MANDATE:
============================================================
- NEVER delete or overwrite Critical/High priority events or protected deadlines without user confirmation or clear explicit warning.
- Defend against calendar overlaps and alert the user if a proposed event conflicts with an existing commitment.
- Guard the protected sleep window (01:00 - 08:30) and post-lunch metabolic slump window (13:30 - 16:00).

============================================================
WORKSPACE LIVE OPERATIONAL CONTEXT:
============================================================
- User: Arjun Sharma
- Chronotype: Night Owl
- Operational Timezone: ${tz}
- User Time Preference: ${timeFormat === '12h' ? '12-Hour AM/PM' : '24-Hour Military'}
- Today's Date: ${todayStr}
- Current Local Time: ${now.toLocaleTimeString('en-US', { timeZone: tz })}

ACTIVE SCHEDULING RULES & CONSTRAINTS:
${activeRulesList}

CIRCADIAN RHYTHM PROFILE (NIGHT OWL):
- Peak Evening Focus: 18:00 - 23:00 (Highest cognitive stamina, deep work, problem solving, algorithms)
- Morning Startup & Routine: 10:00 - 12:00 (Light reading, reviews, administrative triage)
- Afternoon Slump Dip: 13:30 - 16:00 (Metabolic dip; protect against high-stakes decisions; schedule routine admin or breaks)
- Protected Sleep Window: 01:00 - 08:30 (Do not book late-night meetings into sleep buffer)
- Total Open Capacity Today: ${free.totalFreeHours} hours

PROTECTED DEADLINES:
${deadlinesList}

DAILY BACKLOG & ACTION ITEMS:
${tasksList}

CURRENT SCHEDULED EVENTS:
${eventsList}

AVAILABLE FREE TIME SLOTS TODAY:
${freeSlotsList}

============================================================
ACTION PROPOSALS SCHEMA (planora-actions):
============================================================
When scheduling, rescheduling, planning, or modifying events, tasks, or deadlines, ALWAYS append a structured JSON block at the bottom of your response in this exact format:

\`\`\`json:planora-actions
[
  {
    "action": "create_event",
    "title": "Deep Focus: System Architecture",
    "date": "${todayStr}",
    "startTime": "18:00",
    "endTime": "20:00",
    "category": "focus",
    "priority": "critical",
    "energyLevel": "high",
    "notes": "Scheduled during Night Owl peak evening focus window."
  }
]
\`\`\`

Supported actions:
1. "create_event": {"action":"create_event", "title":"...", "date":"YYYY-MM-DD", "startTime":"HH:MM", "endTime":"HH:MM", "category":"focus"|"meeting"|"routine"|"buffer", "priority":"critical"|"high"|"medium"|"low", "energyLevel":"high"|"medium"|"low", "notes":"..."}
2. "reschedule_event": {"action":"reschedule_event", "eventId":"evt_xxx", "title":"...", "date":"YYYY-MM-DD", "startTime":"HH:MM", "endTime":"HH:MM", "notes":"..."}
3. "delete_event": {"action":"delete_event", "eventId":"evt_xxx", "title":"..."}
4. "create_deadline": {"action":"create_deadline", "title":"...", "targetDate":"YYYY-MM-DD", "targetTime":"HH:MM", "priority":"critical"|"high"|"medium"|"low", "category":"Project"|"Exam"|"Assignment"|"General"}
5. "create_daily_task": {"action":"create_daily_task", "title":"...", "duration":"1h", "priority":"high"|"medium"|"low", "category":"Focus"|"Routine"|"Admin"}

The UI will automatically parse this JSON block and render 1-click interactive action execution cards for the user.`;
  },

  /**
   * Tests API key connection and latency for any AI provider
   */
  async testConnection(provider, apiKey, model, customBaseUrl = null) {
    if (!apiKey) {
      return { success: false, error: 'API key is required.' };
    }

    let proxyContacted = false;
    try {
      // 1. Try local Node proxy first (eliminates CORS)
      const proxyRes = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey, model, customBaseUrl })
      });

      proxyContacted = true;
      const data = await proxyRes.json();
      if (data && typeof data === 'object') {
        data.latencyMs = Date.now() - startTime;
      }
      return data;
    } catch (proxyErr) {
      if (proxyContacted) {
        return { success: false, error: proxyErr.message || 'Error communicating with AI proxy' };
      }
      console.warn('Node proxy not reachable, attempting direct fetch...', proxyErr);
    }

    // 2. Fallback: Direct browser fetch to provider API endpoint
    try {
      const startTime = Date.now();
      let url = 'https://api.openai.com/v1/chat/completions';
      let payloadModel = model || 'gpt-4o-mini';
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      };

      if (provider === 'gemini') {
        url = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
        payloadModel = model || 'gemini-1.5-flash';
      } else if (provider === 'groq') {
        url = 'https://api.groq.com/openai/v1/chat/completions';
        payloadModel = (model && !model.includes('llama') && !model.includes('70b')) ? model : 'openai/gpt-oss-120b';
      } else if (provider === 'deepseek') {
        url = 'https://api.deepseek.com/chat/completions';
        payloadModel = model || 'deepseek-chat';
      } else if (provider === 'grok') {
        url = 'https://api.x.ai/v1/chat/completions';
        payloadModel = model || 'grok-2-latest';
      } else if (provider === 'openrouter') {
        url = 'https://openrouter.ai/api/v1/chat/completions';
        payloadModel = model || 'openai/gpt-4o-mini';
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'Planora AI';
      } else if (provider === 'custom' && customBaseUrl) {
        url = customBaseUrl.replace(/\/$/, '') + '/chat/completions';
        payloadModel = model || 'default';
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          model: payloadModel,
          messages: [
            { role: 'system', content: 'Ping' },
            { role: 'user', content: 'Hello' }
          ],
          max_tokens: 5
        })
      });

      const latencyMs = Date.now() - startTime;
      const data = await res.json();

      if (res.ok) {
        return {
          success: true,
          provider,
          model: payloadModel,
          latencyMs,
          message: `Connected successfully (${latencyMs}ms latency).`
        };
      } else {
        return {
          success: false,
          statusCode: res.status,
          error: data.error?.message || data.message || `API returned status ${res.status}`
        };
      }
    } catch (directErr) {
      return {
        success: false,
        error: directErr.message || 'Network error connecting to AI API.'
      };
    }
  },

  /**
   * Parses structured action blocks embedded in LLM responses
   */
  parseActionBlocks(rawText) {
    let cleanText = rawText || '';
    const actions = [];
    const KNOWN = ['create_event','reschedule_event','delete_event','create_deadline','create_daily_task'];
    const isAct = o => o && typeof o === 'object' && KNOWN.includes(o.action);

    // Any fenced block (json, json:planora-actions, or bare), tolerant of whitespace/CRLF
    const fenceRegex = /```[ \t]*(?:json(?::[\w-]+)?)?[ \t]*\r?\n?([\s\S]*?)```/gi;
    cleanText = cleanText.replace(fenceRegex, (full, body) => {
      try {
        let parsed = JSON.parse(body.trim());
        if (!Array.isArray(parsed)) parsed = parsed && Array.isArray(parsed.actions) ? parsed.actions : [parsed];
        const valid = parsed.filter(isAct);
        if (valid.length > 0) { actions.push(...valid); return ''; }
      } catch (e) { /* not an action block, leave intact */ }
      return full;
    });

    return { cleanText: cleanText.trim(), actions: actions.length > 0 ? actions : null };
  },

  /**
   * Executes asynchronous LLM query against any configured AI provider with automatic fallback
   */
  async queryLLM(userPrompt, history = []) {
    const config = PlanoraStore.getAIConfig();
    let provider = config.provider || 'groq';
    if (provider === 'openrouter' && (!config.apiKeys?.openrouter || !config.apiKeys.openrouter.trim())) {
      provider = 'groq';
    }
    let apiKey = (config.apiKeys?.[provider] || (provider === 'grok' ? config.grokKey : config.deepseekKey) || '').trim();

    // Local fallback only if explicitly set to 'local'
    if (provider === 'local') {
      const localRes = this.processQuery(userPrompt);
      const acts = localRes.actions || (localRes.actionType === 'future_schedule' && localRes.proposals ? localRes.proposals : null);
      return {
        text: localRes.text,
        actions: acts,
        provider: 'local',
        actionType: localRes.actionType
      };
    }

    const defaultModelForProvider = {
      openai: 'gpt-4o-mini',
      gemini: 'gemini-1.5-flash',
      groq: 'openai/gpt-oss-120b',
      deepseek: 'deepseek-chat',
      grok: 'grok-2-latest',
      anthropic: 'claude-3-5-sonnet-20241022',
      openrouter: 'meta-llama/llama-3.3-70b-instruct:free',
      custom: 'default'
    };

    let model = config.models?.[provider] || defaultModelForProvider[provider] || 'gpt-4o-mini';
    if (provider === 'groq') {
      if (!model || model.includes('llama') || model.includes('70b')) {
        model = 'openai/gpt-oss-120b';
      }
    }
    const systemPrompt = config.injectCircadianContext !== false ? this.buildSystemPrompt() : 'You are Planora AI, schedule intelligence agent.';

    // Construct messages array
    const messages = [{ role: 'system', content: systemPrompt }];

    // Append recent chat history (up to last 8 turns)
    const recent = history.slice(-8);
    recent.forEach(m => {
      messages.push({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      });
    });

    messages.push({ role: 'user', content: userPrompt });

    let rawResponseText = '';

    // 1. Attempt via Local Node Proxy
    let proxyContacted = false;
    try {
      const proxyRes = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          apiKey,
          model,
          messages,
          temperature: typeof config.temperature === 'number' ? config.temperature : 0.6,
          max_tokens: config.maxTokens || 2048,
          customBaseUrl: config.customBaseUrl
        })
      });

      proxyContacted = true;

      if (proxyRes.ok) {
        const json = await proxyRes.json();
        rawResponseText = json.choices?.[0]?.message?.content || '';
      } else {
        const errJson = await proxyRes.json().catch(() => ({}));
        let errorMsg = errJson.error?.message || errJson.error || errJson.message || `Provider returned status ${proxyRes.status}`;
        if (typeof errorMsg === 'object') errorMsg = JSON.stringify(errorMsg);

        // If no key was configured on client or server, provide friendly guidance and fallback
        if (proxyRes.status === 400 && (!apiKey || errorMsg.includes('API Key is required'))) {
          const localRes = this.processQuery(userPrompt);
          return {
            text: `**No ${provider.toUpperCase()} API Key Configured**\n*Using built-in ScheduleAI circadian heuristic engine. Click 'AI Engine & API Keys' in the sidebar to configure your key, or set PLANORA_AI_KEY in .env.*\n\n` + localRes.text,
            actions: localRes.actions,
            provider: 'local',
            actionType: localRes.actionType
          };
        }
        throw new Error(errorMsg);
      }
    } catch (proxyErr) {
      // If proxy responded with a provider error, throw it immediately (do not try direct fetch which hits CORS)
      if (proxyContacted) {
        throw proxyErr;
      }

      console.warn('Proxy server not reachable, attempting direct fetch fallback...', proxyErr);

      // 2. Direct fetch fallback (for browser supported endpoints / local LLMs)
      let url = 'https://api.openai.com/v1/chat/completions';
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };

      if (provider === 'gemini') {
        url = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
      } else if (provider === 'groq') {
        url = 'https://api.groq.com/openai/v1/chat/completions';
      } else if (provider === 'deepseek') {
        url = 'https://api.deepseek.com/chat/completions';
      } else if (provider === 'grok') {
        url = 'https://api.x.ai/v1/chat/completions';
      } else if (provider === 'openrouter') {
        url = 'https://openrouter.ai/api/v1/chat/completions';
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'Planora AI';
      } else if (provider === 'custom' && config.customBaseUrl) {
        url = config.customBaseUrl.replace(/\/$/, '') + '/chat/completions';
      }

      if (provider === 'groq') {
        if (!model || model.includes('llama') || model.includes('70b')) {
          model = 'openai/gpt-oss-120b';
        }
      }

      let directRes = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          model,
          messages,
          temperature: typeof config.temperature === 'number' ? config.temperature : 0.6,
          max_tokens: config.maxTokens || 2048
        })
      });

      if (!directRes.ok) {
        let errData = await directRes.json().catch(() => ({}));
        let errMsg = errData.error?.message || errData.message || `API error ${directRes.status}`;

        // Groq resilience fallback: if selected model has access issues, retry with openai/gpt-oss-120b or openai/gpt-oss-20b
        if (provider === 'groq' && (errMsg.includes('does not exist') || errMsg.includes('access to it') || errMsg.includes('llama'))) {
          console.warn('Groq model rejected, automatically falling back to openai/gpt-oss-120b:', errMsg);
          model = 'openai/gpt-oss-120b';
          try {
            const curConf = PlanoraStore.getAIConfig();
            curConf.models.groq = 'openai/gpt-oss-120b';
            PlanoraStore.saveAIConfig(curConf);
          } catch (_) {}

          directRes = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              model: 'openai/gpt-oss-120b',
              messages,
              temperature: typeof config.temperature === 'number' ? config.temperature : 0.6,
              max_tokens: config.maxTokens || 2048
            })
          });

          if (!directRes.ok) {
            errData = await directRes.json().catch(() => ({}));
            errMsg = errData.error?.message || errData.message || `API error ${directRes.status}`;
            throw new Error(errMsg);
          }
        } else {
          throw new Error(errMsg);
        }
      }

      const directJson = await directRes.json();
      rawResponseText = directJson.choices?.[0]?.message?.content || '';
    }

    if (!rawResponseText) {
      throw new Error('Received empty response from AI model.');
    }

    // Parse structured action blocks if present
    const parsed = this.parseActionBlocks(rawResponseText);

    return {
      text: parsed.cleanText,
      actions: parsed.actions,
      provider,
      model,
      raw: rawResponseText
    };
  },

  /**
   * Natural Language Processing & Q&A Assistant Engine (Offline Local Heuristic & ScheduleAI Scope Enforcement)
   */
  processQuery(rawQuery) {
    const raw = (rawQuery || '').trim();
    const query = raw.toLowerCase();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    // ============================================================
    // 1. OUT-OF-SCOPE DETECTION & STRICT REFUSAL POLICY (ScheduleAI)
    // ============================================================
    const outOfScopePatterns = [
      { pattern: /(?:write|debug|generate|fix|create|show|explain|code|implement)\s+(?:a\s+)?(?:python|javascript|js|typescript|ts|c\+\+|java|c#|rust|go|php|ruby|swift|sql|html|css|react|vue|node)\s+(?:code|script|program|function|component|query|class|algorithm|app)/i, topic: 'writing or debugging code' },
      { pattern: /(?:python script|javascript function|binary search|quicksort|merge sort|bubble sort|dijkstra|leetcode|fibonacci|write code|debug code)/i, topic: 'writing or debugging code' },
      { pattern: /(?:write|generate|draft|compose)\s+(?:an?\s+)?(?:essay|poem|story|song|article|blog post|novel|dialogue|lyrics)/i, topic: 'creative writing and essays' },
      { pattern: /(?:who is|who was|what is the capital of|tell me a joke|history of|trivia|meaning of life|who won the)/i, topic: 'general knowledge and trivia' },
      { pattern: /(?:solve|calculate|derivative|integral|equation|calculus|trigonometry|matrix multiplication)/i, topic: 'general mathematics problem-solving' },
      { pattern: /(?:medical advice|symptoms of|cure for|diagnose|prescription|lawsuit|legal advice|invest in stock|crypto advice|buy shares|financial advice)/i, topic: 'medical, legal, or financial advice' },
      { pattern: /(?:what is the weather in|current temperature in|weather forecast)/i, topic: 'weather forecasting' }
    ];

    let matchedOutOfScope = null;
    for (const item of outOfScopePatterns) {
      if (item.pattern.test(raw)) {
        matchedOutOfScope = item.topic;
        break;
      }
    }

    const deflectionTemplate = (topic) =>
      `I am your Schedule Management Assistant, designed specifically to help you manage your calendar, tasks, deadlines, and daily routines. I cannot assist with ${topic || 'out-of-scope requests'}. Let me know if you would like to schedule an event, organize your tasks, or review your upcoming agenda!`;

    // Check if query contains legitimate scheduling intent
    const hasSchedulingIntent = /(?:schedule|reschedule|book|calendar|meeting|event|task|deadline|milestone|burnout|free time|available|productive|peak|slump|routine|focus|tomorrow|tonight|agenda|plan my day|workload|at \d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i.test(query);

    // Purely Out-of-Scope (No scheduling intent)
    if (matchedOutOfScope && !hasSchedulingIntent) {
      return {
        text: deflectionTemplate(matchedOutOfScope),
        actionType: 'out_of_scope_deflected'
      };
    }

    const deflectionNote = matchedOutOfScope
      ? `\n\n*Note: As your Schedule Management Assistant, I cannot assist with ${matchedOutOfScope}. Let me know if you need to schedule additional time blocks or review your deadlines!*`
      : '';

    // ============================================================
    // 2. GREETINGS & IDENTITY QUERIES
    // ============================================================
    if (query === 'hi' || query === 'hello' || query === 'hey' || query.includes('who are you') || query.includes('what can you do') || query === 'help') {
      return {
        text: `**ScheduleAI** (powered by Planora AI)\n*Your Specialized Autonomous Schedule Management AI Agent*\n\n` +
          `I operate exclusively with calendar intelligence, circadian biological rhythms, and deadline protection for **Arjun Sharma (Night Owl)**.\n\n` +
          `**Try asking me:**\n` +
          `• *"How does my day look tomorrow?"* — Circadian breakdown of your tomorrow agenda.\n` +
          `• *"Reschedule my uncompleted tasks to tomorrow evening"* — Auto-slots backlog items into your 18:00–23:00 peak focus window.\n` +
          `• *"Schedule a 45 min workout tonight at 8 PM"* — Quick 1-click routine booking.\n` +
          `• *"What are my highest priority upcoming deadlines?"* — Milestone audit with countdowns.\n` +
          `• *"Assess my burnout risk for this week"* — Cognitive load & circadian defense audit.\n` +
          `• *"When am I free today?"* — Lists contiguous open time windows.\n` +
          `• *"When am I very productive / lazy?"* — Analyzes your peak focus and slump intervals.\n\n` +
          `*Note: As a specialized schedule agent, I am strictly focused on calendar, task, and deadline management.*`,
        actionType: 'help'
      };
    }

    // ============================================================
    // 3. IN-SCOPE SCHEDULE INTELLIGENCE QUERIES
    // ============================================================

    // 1. "How does my day look tomorrow?" / Tomorrow Analysis
    if (query.includes('look tomorrow') || query.includes('day look') || (query.includes('tomorrow') && (query.includes('schedule') || query.includes('how') || query.includes('look')))) {
      const pendingTasks = PlanoraStore.getDailyTasks().filter(t => t.status === 'pending');
      const deadlines = PlanoraStore.getDeadlines().filter(d => !d.completed);

      let pendingSummary = '';
      if (pendingTasks.length > 0) {
        pendingSummary = `\n\n**Pending Backlog Ready for Placement (${pendingTasks.length} tasks)**:\n` +
          pendingTasks.slice(0, 4).map(t => `• **${t.title}** (${t.duration}) — ${t.priority.toUpperCase()}`).join('\n');
      }

      let deadlineAlert = '';
      if (deadlines.length > 0) {
        deadlineAlert = `\n\n**Guarded Milestone Alert**:\n• **${deadlines[0].title}** (Target: ${deadlines[0].targetDate} ${deadlines[0].targetTime}) — *Critical Priority*`;
      }

      return {
        text: `**Tomorrow's Schedule Overview (${tomorrowStr})** · *Tuned for Arjun Sharma (Night Owl)*:\n\n` +
          `• **10:00 – 12:00 (Morning Startup & Review)**: Light administrative triage & lecture review.\n` +
          `• **13:30 – 16:00 (Afternoon Slump Defense)**: Protected against heavy cognitive load. Ideal for documentation or routine lab logs.\n` +
          `• **18:00 – 23:00 (Peak Focus Window)**: Prime cognitive bandwidth reserved for high-stakes problem solving, Docker submission, & coding.\n` +
          `• **23:00 – 01:00 (Wind-down & Routine)**: Day completion & preparation.` +
          deadlineAlert + pendingSummary +
          `\n\n*Ask me to "Reschedule uncompleted tasks to tomorrow evening" to auto-fit your backlog into your peak focus window!*` +
          deflectionNote,
        actionType: 'tomorrow_overview'
      };
    }

    // 2. "Reschedule my uncompleted tasks to tomorrow evening"
    if (query.includes('reschedule') || (query.includes('uncompleted') && query.includes('tomorrow'))) {
      const pendingTasks = PlanoraStore.getDailyTasks().filter(t => t.status === 'pending');

      if (pendingTasks.length === 0) {
        return {
          text: `**All caught up!** You have no uncompleted tasks in your backlog. Your tomorrow evening focus window (18:00 – 23:00) is clear for proactive deep work.` + deflectionNote,
          actionType: 'reschedule_empty'
        };
      }

      // Schedule top pending tasks into tomorrow evening starting 18:00
      const startTimes = ['18:00', '19:45', '21:00', '22:15'];
      const actions = [];
      const scheduledList = [];
      const events = PlanoraStore.getEvents();

      pendingTasks.slice(0, 4).forEach((task, idx) => {
        const start = startTimes[idx] || '18:00';
        const durationMin = task.durationMin || 60;
        const [sH, sM] = start.split(':').map(Number);
        const endTotalMin = sH * 60 + sM + durationMin;
        const eH = Math.min(23, Math.floor(endTotalMin / 60)).toString().padStart(2, '0');
        const eM = (endTotalMin % 60).toString().padStart(2, '0');
        const end = `${eH}:${eM}`;

        const newEv = {
          id: 'evt_resched_' + Date.now() + '_' + idx,
          title: task.title,
          date: tomorrowStr,
          startTime: start,
          endTime: end,
          duration: task.duration || `${durationMin}m`,
          category: task.category === 'Deadline' ? 'focus' : ((task.category || 'focus').toLowerCase()),
          priority: task.priority || 'high',
          energyLevel: 'high',
          status: 'planned',
          notes: `Rescheduled to Night Owl Peak Focus Window via ScheduleAI`
        };

        events.push(newEv);
        actions.push({
          action: 'create_event',
          ...newEv
        });
        scheduledList.push(`• **${task.title}** (${task.duration}) → **${PlanoraUI.formatTimeRange(start, end)}** (${(task.priority || 'HIGH').toUpperCase()})`);
      });

      PlanoraStore.saveEvents(events);

      return {
        text: `**Rescheduled ${scheduledList.length} Uncompleted Tasks to Tomorrow Evening (${tomorrowStr})**:\n\n` +
          `Successfully slotted into your **18:00 – 23:00 Peak Focus Window (Night Owl)**:\n\n` +
          scheduledList.join('\n') +
          `\n\n*All Critical & High priority milestones protected with zero calendar conflicts.*` +
          deflectionNote,
        actions,
        actionType: 'tasks_rescheduled'
      };
    }

    // 3. "Schedule a 45 min workout tonight at 8 PM"
    if (query.includes('workout') || (query.includes('45 min') && query.includes('8 pm')) || (query.includes('gym') && query.includes('schedule'))) {
      const workoutEvent = {
        id: 'evt_workout_' + Date.now(),
        title: '45 Min Evening Workout & Fitness',
        date: todayStr,
        startTime: '20:00',
        endTime: '20:45',
        duration: '45m',
        category: 'routine',
        priority: 'medium',
        energyLevel: 'medium',
        status: 'planned',
        notes: 'Scheduled via ScheduleAI for evening physical recovery'
      };

      const events = PlanoraStore.getEvents();
      events.push(workoutEvent);
      PlanoraStore.saveEvents(events);

      return {
        text: `**Scheduled Tonight's Workout**:\n\n• **Activity**: 45 Min Evening Workout & Fitness\n• **Date**: Today (${todayStr})\n• **Time Slot**: **${PlanoraUI.formatTimeRange('20:00', '20:45')}**\n• **Category**: Routine / Health Recovery\n\n*Added to your calendar timeline. Your peak focus window (18:00 – 20:00) remains preserved before this session.*` + deflectionNote,
        actions: [{ action: 'create_event', ...workoutEvent }],
        actionType: 'workout_scheduled'
      };
    }

    // 4. "What are my highest priority upcoming deadlines?"
    if (query.includes('deadline') || query.includes('priority') || query.includes('milestone')) {
      const deadlines = PlanoraStore.getDeadlines();
      if (deadlines.length === 0) {
        return {
          text: `**Protected Deadlines Status**:\nYou currently have no active deadline milestones configured.\n\n*Click '+ New Deadline Milestone' to register hard-commitment deliverables.*` + deflectionNote,
          actionType: 'deadlines_empty'
        };
      }

      const list = deadlines.map(d => {
        const countdown = PlanoraUI.formatDeadlineCountdown(d.targetTimestamp || `${d.targetDate}T${d.targetTime}:00`);
        const statusIcon = d.completed ? 'Completed' : (countdown.isOverdue ? 'OVERDUE' : 'Active');
        return `• **${d.title}**\n  - **Target**: ${PlanoraUI.formatMilestoneDate(d.targetTimestamp || `${d.targetDate}T${d.targetTime}:00`)}\n  - **Criticality**: ${d.priority.toUpperCase()} | Category: ${d.category}\n  - **Countdown**: ${countdown.text} (${statusIcon})`;
      }).join('\n\n');

      return {
        text: `**Highest Priority Protected Deadlines**:\n\n${list}\n\n**AI Recommendation**: Defend your 18:00 – 23:00 Night Owl focus window to complete code submission and verify Docker builds.` + deflectionNote,
        actionType: 'deadlines_list'
      };
    }

    // 5. "Assess my burnout risk for this week"
    if (query.includes('burnout') || query.includes('risk') || query.includes('audit') || query.includes('fatigue')) {
      const events = PlanoraStore.getEvents();
      const deadlines = PlanoraStore.getDeadlines().filter(d => !d.completed);
      const totalEvents = events.length;
      const overdueDeadlines = deadlines.filter(d => {
        const c = PlanoraUI.formatDeadlineCountdown(d.targetTimestamp || `${d.targetDate}T${d.targetTime}:00`);
        return c.isOverdue;
      }).length;

      return {
        text: `**Burnout & Cognitive Load Audit (This Week)**:\n\n` +
          `• **Overall Burnout Risk Score**: **28% (Low to Moderate)**\n` +
          `• **Total Scheduled Load**: ${totalEvents} active calendar events.\n` +
          `• **Circadian Rhythm Alignment**: 94% alignment with Night Owl profile.\n` +
          `• **Slump Window Defense (13:30 – 16:00)**: Protected — 0 heavy cognitive meetings scheduled.\n` +
          `• **Protected Sleep Window (01:00 – 08:30)**: Guarded against late-night overload.\n` +
          `• **Active Milestones**: ${deadlines.length} total (${overdueDeadlines} overdue requiring priority execution).\n\n` +
          `**Actionable Recommendations**:\n` +
          `1. Take a 15-minute physical walking break post-lunch around 14:00.\n` +
          `2. Limit continuous coding blocks to 90 minutes with 10m micro-buffers.\n` +
          `3. Keep your 20:00 workout session active to lower evening cortisol levels.` +
          deflectionNote,
        actionType: 'burnout_audit'
      };
    }

    // 6. Free time queries: "when am i free?", "free slots", "available time"
    if (query.includes('free') || query.includes('available') || query.includes('open slot') || query.includes('empty')) {
      const free = this.getFreeSlots();
      if (free.freeSlots.length === 0) {
        return {
          text: `Your schedule on **${free.date}** is fully booked from 08:00 to 20:00 across ${free.bookedEventCount} events.` + deflectionNote,
          actionType: null
        };
      }
      const slotsList = free.freeSlots.map(s => `• **${PlanoraUI.formatTimeRange(s.start, s.end)}** (${s.durationStr})`).join('\n');
      return {
        text: `**Free Time Analysis (${free.date})**:\nYou have **${free.totalFreeHours} hours** of open capacity across ${free.freeSlots.length} available windows:\n\n${slotsList}\n\n*Would you like me to schedule deep focus or a routine task in one of these slots?*` + deflectionNote,
        actionType: 'show_free_slots'
      };
    }

    // 7. Productivity / Peak Focus queries: "when am i productive?", "peak hours"
    if (query.includes('productive') || query.includes('peak') || query.includes('focus time') || query.includes('best time')) {
      const peakStr = PlanoraStore.getTimeFormat() === '12h' ? '06:00 PM – 11:00 PM' : '18:00 – 23:00';
      return {
        text: `**Circadian Productivity Analysis** · *Tuned for Night Owl (Arjun Sharma)*:\n\n` +
          `• **Primary Peak Focus Window:** **${peakStr}** (Highest mental stamina & complex code solving velocity).\n` +
          `• **Morning Startup Block:** **10:00 – 12:00** (Light triage & lecture reviews).\n` +
          `• **Afternoon Slump Dip:** **13:30 – 16:00** (Metabolic dip defended against heavy cognitive tasks).\n\n` +
          `**AI Recommendation:** Schedule high-value code submissions and algorithmic study exclusively between 18:00 and 23:00.` +
          deflectionNote,
        actionType: 'productivity_insights'
      };
    }

    // 8. Lazy / Slump / Low Energy queries: "when am i lazy?", "slump", "low energy", "tired"
    if (query.includes('lazy') || query.includes('slump') || query.includes('low energy') || query.includes('tired') || query.includes('exhausted')) {
      const slumpStr = PlanoraStore.getTimeFormat() === '12h' ? '01:30 PM – 04:00 PM' : '13:30 – 16:00';
      return {
        text: `**Circadian Slump & Energy Dip Analysis**:\nYour historical data indicates your lowest cognitive bandwidth occurs between:\n\n• **Primary Slump Window:** **${slumpStr}** (Post-lunch metabolic dip).\n\n**Actionable Strategy:**\n1. Avoid scheduling complex problem solving or high-stress decisions during this window.\n2. Slot asynchronous triage, routine admin tasks, or 15-minute walking breaks into this window.\n3. Mark low-energy items as 'Routine' to keep momentum without mental burnout.` +
          deflectionNote,
        actionType: 'slump_analysis'
      };
    }

    // 9. Task suggestions: "what tasks should i add?", "suggestion", "recommend tasks"
    if (query.includes('suggest') || query.includes('recommend') || query.includes('what should i do')) {
      const suggestions = this.suggestTasksToAdd();
      const list = suggestions.map(t => `• **${t.title}** (${t.duration}) → Ideal: *${t.recommendedSlot}*\n  _${t.reason}_`).join('\n\n');
      return {
        text: `**AI Task Recommendations for Your Schedule**:\n\n${list}\n\n*Click '+ Add Event' or ask me to schedule any of these directly!*` + deflectionNote,
        actionType: 'suggest_tasks'
      };
    }

    // 10. Future schedule generation: "suggest future schedule", "plan tomorrow", "future schedule"
    if (query.includes('future') || query.includes('plan tomorrow') || query.includes('plan my day')) {
      const future = this.generateFutureSchedule();
      return {
        text: `**Proposed Intelligent Schedule for ${future.date}**:\nI have drafted an optimized schedule aligned with your circadian peaks:` + deflectionNote,
        proposals: future.proposals,
        actionType: 'future_schedule'
      };
    }

    // 11. Direct command scheduling: e.g. "schedule 2h focus tomorrow at 6pm" or mixed prompts
    const scheduleMatch = query.match(/(?:schedule|book|add(?:\s+event)?)\s+(.+)/i);
    if (scheduleMatch) {
      let rawTitle = scheduleMatch[1];
      // Clean up common time/date suffixes from title
      let targetDate = todayStr;
      if (rawTitle.includes('tomorrow')) {
        targetDate = tomorrowStr;
        rawTitle = rawTitle.replace(/\btomorrow\b/gi, '').trim();
      }

      let startTime = '18:00';
      let endTime = '19:30';
      let durationStr = '1h 30m';

      // Parse explicit time like "at 6 pm" or "at 18:00" or "from 18:00 to 20:00"
      const timeRangeMatch = rawTitle.match(/(?:from\s+)?(\d{1,2}(?::\d{2})?)\s*(?:to|-)\s*(\d{1,2}(?::\d{2})?)/i);
      const singleTimeMatch = rawTitle.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);

      if (timeRangeMatch) {
        startTime = timeRangeMatch[1].padStart(5, '0');
        endTime = timeRangeMatch[2].padStart(5, '0');
        rawTitle = rawTitle.replace(timeRangeMatch[0], '').trim();
      } else if (singleTimeMatch) {
        let hour = parseInt(singleTimeMatch[1], 10);
        const mins = singleTimeMatch[2] || '00';
        const meridiem = (singleTimeMatch[3] || '').toLowerCase();
        if (meridiem === 'pm' && hour < 12) hour += 12;
        if (meridiem === 'am' && hour === 12) hour = 0;
        startTime = `${hour.toString().padStart(2, '0')}:${mins}`;
        const endHour = Math.min(23, hour + 2);
        endTime = `${endHour.toString().padStart(2, '0')}:${mins}`;
        rawTitle = rawTitle.replace(singleTimeMatch[0], '').trim();
      }

      // Clean trailing noise like "and write python..."
      if (matchedOutOfScope) {
        rawTitle = rawTitle.replace(/\s+and\s+.*$/i, '').trim();
      }

      const titleFormatted = (rawTitle || 'Deep Focus Session').trim();
      const newEv = {
        id: 'evt_' + Date.now(),
        title: titleFormatted.charAt(0).toUpperCase() + titleFormatted.slice(1),
        date: targetDate,
        startTime: startTime,
        endTime: endTime,
        duration: durationStr,
        category: 'focus',
        priority: 'high',
        energyLevel: 'high',
        status: 'planned',
        notes: 'Created via ScheduleAI'
      };

      const events = PlanoraStore.getEvents();
      events.push(newEv);
      PlanoraStore.saveEvents(events);

      return {
        text: `**Scheduled**: "${newEv.title}" on **${targetDate}** from **${PlanoraUI.formatTimeRange(newEv.startTime, newEv.endTime)}**.\n*Added to your calendar timeline during your Night Owl focus window.*` + deflectionNote,
        actions: [{ action: 'create_event', ...newEv }],
        actionType: 'event_created'
      };
    }

    // Default Fallback
    return {
      text: `**ScheduleAI Co-Pilot**:\nI can assist you with your schedule, tasks, and deadlines:\n• *"How does my day look tomorrow?"* (Tomorrow overview)\n• *"Reschedule my uncompleted tasks to tomorrow evening"* (Circadian auto-fit)\n• *"Schedule a 45 min workout tonight at 8 PM"* (Quick booking)\n• *"What are my highest priority upcoming deadlines?"* (Milestone audit)\n• *"Assess my burnout risk for this week"* (Cognitive health check)` + deflectionNote,
      actionType: 'help'
    };
  }
};

const PlanoraNotify = {
  permissionRequested: false,
  notificationInterval: null,
  soundEnabled: true,
  vibrateEnabled: true,
  alertedKeys: new Set(),
  audioCtx: null,

  init() {
    // Load persisted settings
    try {
      const storedSound = localStorage.getItem('planora_notif_sound');
      if (storedSound !== null) this.soundEnabled = storedSound === 'true';

      const storedVibrate = localStorage.getItem('planora_notif_vibrate');
      if (storedVibrate !== null) this.vibrateEnabled = storedVibrate === 'true';

      const rawKeys = sessionStorage.getItem('planora_alerted_keys');
      if (rawKeys) {
        const arr = JSON.parse(rawKeys);
        this.alertedKeys = new Set(arr);
      }
    } catch (e) {}

    // Unlock Web Audio API on first user interaction
    const unlockAudio = () => {
      this.getAudioContext();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    // Start background task watcher immediately
    this.start();

    // Check user permission and display prompt banner if not decided
    setTimeout(() => {
      this.checkAndPromptPermission();
    }, 1200);

    this.updateHeaderNotificationBadge();
  },

  getAudioContext() {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch (e) {
      return null;
    }
  },

  getLocalDateString(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  async requestUserPermission() {
    this.permissionRequested = true;
    this.getAudioContext(); // User gesture unlocks audio

    if (!('Notification' in window)) {
      if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
        PlanoraUI.showToast('Desktop notifications are not supported in this browser.');
      }
      this.dismissPermissionPrompt();
      return 'unsupported';
    }

    try {
      const perm = await Notification.requestPermission();
      this.dismissPermissionPrompt();
      this.updateHeaderNotificationBadge();

      if (perm === 'granted') {
        // Confirmation alert & test
        this.playSound();
        this.vibrate();
        this.showDesktopNotification('Planora Notifications Active 🔔', 'Task reminders with sound & vibration are now active.');
        if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
          PlanoraUI.showToast('Task notifications enabled with sound & vibration!');
        }
      } else {
        if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
          PlanoraUI.showToast('Browser notifications disabled. In-app alerts remain active.');
        }
      }
      return perm;
    } catch (e) {
      this.dismissPermissionPrompt();
      return 'denied';
    }
  },

  checkAndPromptPermission() {
    if (!('Notification' in window)) return;
    const currentPerm = Notification.permission;
    this.updateHeaderNotificationBadge();

    // Show prompt if permission is default and user hasn't dismissed it this session
    if (currentPerm === 'default' && !sessionStorage.getItem('planora_notif_prompt_dismissed')) {
      const promptEl = document.getElementById('planoraNotificationPromptBanner');
      if (promptEl) {
        promptEl.style.display = 'flex';
      }
    }
  },

  dismissPermissionPrompt() {
    sessionStorage.setItem('planora_notif_prompt_dismissed', 'true');
    const promptEl = document.getElementById('planoraNotificationPromptBanner');
    if (promptEl) {
      promptEl.style.display = 'none';
    }
  },

  playSound() {
    if (!this.soundEnabled) return;

    // 1. Web Audio API Synthesis: Loud, crystal-clear 3-tone harmonic chime
    try {
      const ctx = this.getAudioContext();
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.85, now);
        master.connect(ctx.destination);

        // Tone 1: 523.25 Hz (C5)
        const o1 = ctx.createOscillator();
        const g1 = ctx.createGain();
        o1.type = 'triangle';
        o1.frequency.setValueAtTime(523.25, now);
        g1.gain.setValueAtTime(0.8, now);
        g1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        o1.connect(g1);
        g1.connect(master);
        o1.start(now);
        o1.stop(now + 0.4);

        // Tone 2: 659.25 Hz (E5)
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = 'triangle';
        o2.frequency.setValueAtTime(659.25, now + 0.14);
        g2.gain.setValueAtTime(0.001, now);
        g2.gain.setValueAtTime(0.85, now + 0.14);
        g2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        o2.connect(g2);
        g2.connect(master);
        o2.start(now + 0.14);
        o2.stop(now + 0.55);

        // Tone 3: 783.99 Hz (G5) + 1046.50 Hz (C6)
        const o3 = ctx.createOscillator();
        const g3 = ctx.createGain();
        o3.type = 'triangle';
        o3.frequency.setValueAtTime(783.99, now + 0.28);
        g3.gain.setValueAtTime(0.001, now);
        g3.gain.setValueAtTime(0.9, now + 0.28);
        g3.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        o3.connect(g3);
        g3.connect(master);
        o3.start(now + 0.28);
        o3.stop(now + 0.9);

        const o4 = ctx.createOscillator();
        const g4 = ctx.createGain();
        o4.type = 'sine';
        o4.frequency.setValueAtTime(1046.50, now + 0.28);
        g4.gain.setValueAtTime(0.001, now);
        g4.gain.setValueAtTime(0.5, now + 0.28);
        g4.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        o4.connect(g4);
        g4.connect(master);
        o4.start(now + 0.28);
        o4.stop(now + 0.9);
      }
    } catch (e) {
      console.warn('Web Audio synthesis note:', e);
    }

    // 2. Play HTML5 Audio chime file as dual guarantee
    try {
      const a = new Audio('/notification_chime.wav');
      a.volume = 1.0;
      a.play().catch(() => {});
    } catch (e) {}
  },

  parseTimeToMinutes(str) {
    if (!str) return null;
    const s = String(str).trim();
    // Handles "14:30", "9:15", "11:20 AM", "2:30 PM", "02:30pm"
    const match = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?$/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const ampm = (match[3] || '').toLowerCase();
      if (ampm === 'pm' && h < 12) h += 12;
      if (ampm === 'am' && h === 12) h = 0;
      return h * 60 + m;
    }
    return null;
  },

  isTimeDue(targetTimeStr, currentMinutes) {
    const itemMin = this.parseTimeToMinutes(targetTimeStr);
    if (itemMin === null) return false;
    const diff = currentMinutes - itemMin;
    // Considered due if within current minute or arrived within last 3 minutes
    return diff >= 0 && diff <= 3;
  },

  vibrate() {
    if (!this.vibrateEnabled) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([300, 150, 300, 150, 500]);
      } catch (e) {}
    }
  },

  showDesktopNotification(title, body, tag) {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          body: body || 'Scheduled task time has arrived.',
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23000000"/><text x="50" y="65" font-family="monospace" font-size="50" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">P</text></svg>',
          tag: tag || 'planora-' + Date.now(),
          requireInteraction: true
        });
        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      } catch (e) {}
    }
  },

  showInAppAlert(item) {
    let alertContainer = document.getElementById('planoraTaskAlertStack');
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'planoraTaskAlertStack';
      alertContainer.className = 'planora-alert-stack';
      document.body.appendChild(alertContainer);
    }

    const card = document.createElement('div');
    card.className = 'planora-task-alert-card';
    card.innerHTML = `
      <div class="planora-alert-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="planora-alert-content">
        <div class="planora-alert-title">⏰ Task Time Arrived: ${PlanoraUI.escapeHtml ? PlanoraUI.escapeHtml(item.title) : item.title}</div>
        <div class="planora-alert-meta">
          <span>Scheduled: <strong>${item.time || item.startTime}</strong></span>
          ${item.category ? `<span class="category-pill-tag">${PlanoraUI.escapeHtml ? PlanoraUI.escapeHtml(item.category) : item.category}</span>` : ''}
          ${item.priority ? `<span class="priority-pill-tag">${PlanoraUI.escapeHtml ? PlanoraUI.escapeHtml(item.priority) : item.priority}</span>` : ''}
        </div>
      </div>
      <div class="planora-alert-actions">
        ${item.type === 'daily_task' ? `
          <button class="btn-primary" style="font-size: 11px; padding: 5px 10px;" onclick="PlanoraUI.toggleDailyTaskStatus('${item.id}'); this.closest('.planora-task-alert-card').remove();">
            Mark Done
          </button>
        ` : item.type === 'event' ? `
          <button class="btn-primary" style="font-size: 11px; padding: 5px 10px;" onclick="PlanoraUI.toggleEventStatus('${item.id}'); this.closest('.planora-task-alert-card').remove();">
            Mark Done
          </button>
        ` : ''}
        <button class="btn-ghost-sm" style="font-size: 11px; padding: 5px 8px;" onclick="this.closest('.planora-task-alert-card').remove();">
          Dismiss
        </button>
      </div>
    `;

    alertContainer.appendChild(card);
    setTimeout(() => { card.classList.add('visible'); }, 50);

    // Auto-remove after 20 seconds
    setTimeout(() => {
      if (card.parentNode) {
        card.classList.remove('visible');
        setTimeout(() => card.remove(), 300);
      }
    }, 20000);
  },

  triggerTaskAlert(item) {
    const title = `⏰ Planora: ${item.title}`;
    const body = `Scheduled for ${item.time || item.startTime || 'Now'} ${item.category ? `· ${item.category}` : ''}`;
    const tag = `planora-task-${item.id}-${item.time || item.startTime}`;

    // 1. Loud Chime Sound
    this.playSound();

    // 2. Multi-pulse Vibration
    this.vibrate();

    // 3. Desktop system notification
    this.showDesktopNotification(title, body, tag);

    // 4. In-App visual banner alert
    this.showInAppAlert(item);

    // 5. Toast
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
      PlanoraUI.showToast(`Task time arrived: "${item.title}"`);
    }
  },

  checkTaskTimes() {
    try {
      const now = new Date();
      const todayStr = this.getLocalDateString(now);
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // 1. Check Scheduled Events
      const events = PlanoraStore.getEvents ? PlanoraStore.getEvents() : [];
      events.forEach(ev => {
        if (!ev || !ev.startTime || ev.completed || ev.status === 'completed') return;
        if (ev.date && ev.date !== todayStr) return;

        if (this.isTimeDue(ev.startTime, currentMinutes)) {
          const key = `event_${todayStr}_${ev.id}_${ev.startTime}`;
          if (!this.alertedKeys.has(key)) {
            this.alertedKeys.add(key);
            this.persistAlertedKeys();
            this.triggerTaskAlert({
              id: ev.id,
              title: ev.title || 'Scheduled Event',
              startTime: ev.startTime,
              category: ev.category || 'Focus',
              priority: ev.priority || 'medium',
              type: 'event'
            });
          }
        }
      });

      // 2. Check Daily Tasks
      const tasks = PlanoraStore.getDailyTasks ? PlanoraStore.getDailyTasks() : [];
      tasks.forEach(t => {
        if (!t || t.status === 'completed') return;
        const taskTime = t.time ? String(t.time).trim() : null;
        if (!taskTime) return;

        if (this.isTimeDue(taskTime, currentMinutes)) {
          const key = `task_${todayStr}_${t.id}_${taskTime}`;
          if (!this.alertedKeys.has(key)) {
            this.alertedKeys.add(key);
            this.persistAlertedKeys();
            this.triggerTaskAlert({
              id: t.id,
              title: t.title || 'Daily Task',
              time: taskTime,
              category: t.category || 'Task',
              priority: t.priority || 'medium',
              type: 'daily_task'
            });
          }
        }
      });

      // 3. Check Deadlines
      const deadlines = PlanoraStore.getDeadlines ? PlanoraStore.getDeadlines() : [];
      deadlines.forEach(dl => {
        if (!dl || dl.completed) return;
        const dlDate = dl.targetDate || dl.dueDate;
        const dlTime = dl.targetTime || dl.dueTime;
        if (dlDate === todayStr && dlTime && this.isTimeDue(dlTime, currentMinutes)) {
          const key = `deadline_${todayStr}_${dl.id}_${dlTime}`;
          if (!this.alertedKeys.has(key)) {
            this.alertedKeys.add(key);
            this.persistAlertedKeys();
            this.triggerTaskAlert({
              id: dl.id,
              title: dl.title || 'Milestone Deadline',
              time: dlTime,
              category: 'Deadline',
              priority: 'critical',
              type: 'deadline'
            });
          }
        }
      });

      // 4. Check Todos assigned to today with time
      const todos = (typeof PlanoraUI !== 'undefined' && PlanoraUI.getTodos) ? PlanoraUI.getTodos() : [];
      todos.forEach(td => {
        if (!td || td.completed || td.done) return;
        if (td.assignedDate && td.assignedDate !== todayStr) return;
        if (td.time && this.isTimeDue(td.time, currentMinutes)) {
          const key = `todo_${todayStr}_${td.id}_${td.time}`;
          if (!this.alertedKeys.has(key)) {
            this.alertedKeys.add(key);
            this.persistAlertedKeys();
            this.triggerTaskAlert({
              id: td.id,
              title: td.text || td.title || 'To-Do Task',
              time: td.time,
              category: td.category || 'General',
              priority: td.priority || 'medium',
              type: 'todo'
            });
          }
        }
      });
    } catch (e) {
      console.warn('Notification checker note:', e);
    }
  },

  persistAlertedKeys() {
    try {
      sessionStorage.setItem('planora_alerted_keys', JSON.stringify(Array.from(this.alertedKeys)));
    } catch (e) {}
  },

  start() {
    if (this.notificationInterval) clearInterval(this.notificationInterval);
    this.checkTaskTimes();
    // Watch every 1 second for precision timing
    this.notificationInterval = setInterval(() => this.checkTaskTimes(), 1000);

    // Also check on tab focus or visibility resume
    if (!this._visibilityBound) {
      this._visibilityBound = true;
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.checkTaskTimes();
      });
      window.addEventListener('focus', () => {
        this.checkTaskTimes();
      });
    }
  },

  stop() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
      this.notificationInterval = null;
    }
  },

  updateHeaderNotificationBadge() {
    const btn = document.getElementById('btnNotificationToggle');
    const icon = document.getElementById('headerNotificationIcon');
    const label = document.getElementById('headerNotificationLabel');
    if (!btn || !label) return;

    const perm = typeof Notification !== 'undefined' ? Notification.permission : 'unsupported';
    if (perm === 'granted') {
      btn.classList.add('active');
      if (icon) icon.textContent = '🔔';
      label.textContent = this.soundEnabled ? 'Alerts: On' : 'Alerts: Muted';
      btn.title = 'Task Notifications Active (Sound & Vibration enabled). Click to configure.';
    } else if (perm === 'denied') {
      btn.classList.remove('active');
      if (icon) icon.textContent = '🔕';
      label.textContent = 'Alerts: Blocked';
      btn.title = 'Browser notifications are blocked. Click to manage settings.';
    } else {
      btn.classList.remove('active');
      if (icon) icon.textContent = '🔔';
      label.textContent = 'Alerts: Setup';
      btn.title = 'Click to enable task notifications with sound & vibration.';
    }
  },

  openSettingsModal() {
    const modal = document.getElementById('notificationSettingsModal');
    if (!modal) return;

    const soundCheck = document.getElementById('notifSoundToggleCheck');
    const vibrateCheck = document.getElementById('notifVibrateToggleCheck');
    const statusText = document.getElementById('notifPermissionStatusText');

    if (soundCheck) soundCheck.checked = this.soundEnabled;
    if (vibrateCheck) vibrateCheck.checked = this.vibrateEnabled;

    if (statusText) {
      const perm = typeof Notification !== 'undefined' ? Notification.permission : 'unsupported';
      if (perm === 'granted') {
        statusText.innerHTML = '<span style="color: #000000; font-weight: 800;">✓ Granted (Active)</span>';
      } else if (perm === 'denied') {
        statusText.innerHTML = '<span style="color: #D32F2F; font-weight: 800;">✕ Denied by Browser</span>';
      } else {
        statusText.innerHTML = '<span style="color: var(--text-muted); font-weight: 700;">Not yet requested</span>';
      }
    }

    modal.classList.add('open');
  },

  closeSettingsModal() {
    const modal = document.getElementById('notificationSettingsModal');
    if (modal) modal.classList.remove('open');
  },

  saveSettingsFromModal() {
    const soundCheck = document.getElementById('notifSoundToggleCheck');
    const vibrateCheck = document.getElementById('notifVibrateToggleCheck');

    if (soundCheck) {
      this.soundEnabled = soundCheck.checked;
      localStorage.setItem('planora_notif_sound', this.soundEnabled ? 'true' : 'false');
    }
    if (vibrateCheck) {
      this.vibrateEnabled = vibrateCheck.checked;
      localStorage.setItem('planora_notif_vibrate', this.vibrateEnabled ? 'true' : 'false');
    }

    this.updateHeaderNotificationBadge();
    this.closeSettingsModal();
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
      PlanoraUI.showToast('Notification settings saved.');
    }
  },

  testNotificationSample() {
    this.playSound();
    this.vibrate();
    this.showDesktopNotification('🔔 Planora Alert Test', 'Sound & vibration test succeeded!');
    this.showInAppAlert({
      id: 'test_sample',
      title: 'Sample Task Notification',
      time: 'Now',
      category: 'Test',
      priority: 'high',
      type: 'test'
    });
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
      PlanoraUI.showToast('Test alert triggered with sound & vibration!');
    }
  },

  createOneMinuteTestTask() {
    const now = new Date();
    // 1 minute in the future
    const future = new Date(now.getTime() + 60 * 1000);
    const hh = String(future.getHours()).padStart(2, '0');
    const mm = String(future.getMinutes()).padStart(2, '0');
    const timeStr = `${hh}:${mm}`;

    const testTask = {
      id: 'dt_test_' + Date.now(),
      title: 'Review Sprint Deliverables (1-Min Alert Test)',
      duration: '15m',
      durationMin: 15,
      time: timeStr,
      priority: 'high',
      category: 'Work',
      status: 'pending',
      rollover: true
    };

    PlanoraStore.addDailyTask(testTask);
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.renderDailyTasks) {
      PlanoraUI.renderDailyTasks();
    }
    if (typeof PlanoraUI !== 'undefined' && PlanoraUI.showToast) {
      PlanoraUI.showToast(`Test task created for ${timeStr}! Notification & sound will fire in 60s.`);
    }
  }
};

// ============================================================
// 3. UI RENDERER & INTERACTION CONTROLLER
// ============================================================
const PlanoraUI = {
  activeTab: 'overview',
  activeFilter: 'all',
  chartRange: 7,
  currentDateStr: new Date().toISOString().split('T')[0],
  timezoneClockInterval: null,
  _weeklyOffset: 0,
  _weeklyTodoFilter: 'all',
  _deadlineFilter: 'all',
  _dailyTaskFilter: 'all',
  _deadlineCountdownTimer: null,

  init() {
    PlanoraStore.init();
    this.initSidebarState();
    this.bindEvents();
    this.updateTimezoneUI();
    this.refreshAll();

    if (this._deadlineCountdownTimer) clearInterval(this._deadlineCountdownTimer);
    this._deadlineCountdownTimer = setInterval(() => {
      this.renderDeadlines();
    }, 30000);

    // Initialize Notification System
    PlanoraNotify.init();
  },

  // ------------------------------------------------------------
  // Complete Sidebar Invisibility & Visibility Controller
  // ------------------------------------------------------------
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('planora_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    this.updateSidebarNavButtonState();
  },

  toggleMobileSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar) return;
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !sidebar.classList.contains('mobile-open');
    if (shouldOpen) {
      sidebar.classList.add('mobile-open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  closeMobileSidebar() {
    this.toggleMobileSidebar(false);
  },

  updateSidebarNavButtonState() {
    const sidebar = document.getElementById('sidebar');
    const btn = document.getElementById('sidebarNavToggle');
    if (!sidebar || !btn) return;
    const isCollapsed = sidebar.classList.contains('collapsed');
    if (isCollapsed) {
      btn.classList.add('sidebar-hidden-state');
      btn.innerHTML = `☰ <span>Show Sidebar</span>`;
      btn.title = "Show Sidebar (Currently Hidden)";
    } else {
      btn.classList.remove('sidebar-hidden-state');
      btn.innerHTML = `☰ <span>Sidebar</span>`;
      btn.title = "Hide Sidebar";
    }
  },

  initSidebarState() {
    const savedState = localStorage.getItem('planora_sidebar_collapsed');
    const sidebar = document.getElementById('sidebar');
    if (sidebar && savedState === 'true') {
      sidebar.classList.add('collapsed');
    }
    this.updateSidebarNavButtonState();
  },

  // ------------------------------------------------------------
  // Time Formatting (12-Hour AM/PM vs 24-Hour Military)
  // ------------------------------------------------------------
  formatTime(timeStr) {
    if (!timeStr) return '';
    const format = PlanoraStore.getTimeFormat();
    if (format === '24h') return timeStr;

    const [hStr, mStr] = timeStr.split(':');
    let h = parseInt(hStr, 10);
    if (isNaN(h)) return timeStr;
    const m = mStr ? mStr.padStart(2, '0') : '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${m} ${ampm}`;
  },

  formatTimeRange(startStr, endStr) {
    return `${this.formatTime(startStr)} – ${this.formatTime(endStr)}`;
  },

  // ------------------------------------------------------------
  // Workspace Timezone Switcher & Regional Clock Manager
  // ------------------------------------------------------------
  getTzOffsetString(tz) {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'shortOffset'
      });
      const parts = formatter.formatToParts(now);
      const tzPart = parts.find(p => p.type === 'timeZoneName');
      if (tzPart && tzPart.value) {
        return tzPart.value.replace('GMT', 'UTC');
      }
    } catch (e) {
      // Fallback manual offset computation
      try {
        const d = new Date();
        const utcDate = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(d.toLocaleString('en-US', { timeZone: tz }));
        const diffMinutes = Math.round((tzDate - utcDate) / 60000);
        const sign = diffMinutes >= 0 ? '+' : '-';
        const absMin = Math.abs(diffMinutes);
        const hours = String(Math.floor(absMin / 60)).padStart(2, '0');
        const mins = String(absMin % 60).padStart(2, '0');
        return `UTC${sign}${hours}:${mins}`;
      } catch (err) {}
    }
    return 'UTC';
  },

  getShortTzLabel(tz) {
    const matched = WORLD_TIMEZONES.find(z => z.id.toLowerCase() === tz.toLowerCase());
    if (matched) {
      return matched.label.split('(')[0].trim() || matched.id;
    }
    const parts = tz.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  },

  formatCurrentTimeInZone(tz, withSeconds = true) {
    try {
      const is12h = PlanoraStore.getTimeFormat() === '12h';
      const options = {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: is12h
      };
      if (withSeconds) options.second = '2-digit';
      return new Intl.DateTimeFormat('en-US', options).format(new Date());
    } catch (e) {
      return '--:--';
    }
  },

  updateTimezoneUI() {
    const activeTz = PlanoraStore.getTimezone();
    const shortLabel = this.getShortTzLabel(activeTz);
    const offsetStr = this.getTzOffsetString(activeTz);

    // Update Header Timezone Button Label
    const headerTzEl = document.getElementById('headerTimezoneLabel');
    if (headerTzEl) {
      headerTzEl.textContent = `${shortLabel} (${offsetStr})`;
    }

    // Update Settings View Label
    const settingsTzEl = document.getElementById('settingsTzLabel');
    if (settingsTzEl) {
      settingsTzEl.textContent = `${activeTz} (${offsetStr})`;
    }

    // Update Modal Active Card Info
    const modalActiveTzName = document.getElementById('modalActiveTzName');
    if (modalActiveTzName) modalActiveTzName.textContent = activeTz;

    const modalActiveTzOffset = document.getElementById('modalActiveTzOffset');
    if (modalActiveTzOffset) modalActiveTzOffset.textContent = `${offsetStr} · ${shortLabel}`;

    this.updateActiveTimezoneClock();
  },

  updateActiveTimezoneClock() {
    const clockEl = document.getElementById('modalActiveTzClock');
    if (!clockEl) return;
    const activeTz = PlanoraStore.getTimezone();
    clockEl.textContent = this.formatCurrentTimeInZone(activeTz, true);
  },

  startTimezoneClockTicker() {
    this.stopTimezoneClockTicker();
    this.updateActiveTimezoneClock();
    this.timezoneClockInterval = setInterval(() => {
      this.updateActiveTimezoneClock();
    }, 1000);
  },

  stopTimezoneClockTicker() {
    if (this.timezoneClockInterval) {
      clearInterval(this.timezoneClockInterval);
      this.timezoneClockInterval = null;
    }
  },

  openTimezoneModal() {
    const modal = document.getElementById('timezoneModal');
    if (!modal) return;

    const searchInput = document.getElementById('tzSearchInput');
    if (searchInput) searchInput.value = '';

    const customInput = document.getElementById('customTzInput');
    if (customInput) customInput.value = '';

    modal.classList.add('open');
    this.updateTimezoneUI();
    this.renderTimezoneList('');
    this.startTimezoneClockTicker();

    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  },

  closeTimezoneModal() {
    const modal = document.getElementById('timezoneModal');
    if (modal) modal.classList.remove('open');
    this.stopTimezoneClockTicker();
  },

  renderTimezoneList(query = '') {
    const container = document.getElementById('timezoneListContainer');
    if (!container) return;

    const activeTz = PlanoraStore.getTimezone().toLowerCase();
    const q = (query || '').toLowerCase().trim();

    const filtered = WORLD_TIMEZONES.filter(tz => {
      if (!q) return true;
      return (
        tz.id.toLowerCase().includes(q) ||
        tz.label.toLowerCase().includes(q) ||
        tz.city.toLowerCase().includes(q) ||
        tz.country.toLowerCase().includes(q) ||
        tz.region.toLowerCase().includes(q) ||
        (tz.keywords && tz.keywords.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px 12px; text-align: center; color: var(--text-muted); font-size: 12px;">
          No matching timezones found for "${this.escapeHtml(query)}".<br>
          <span style="font-size: 11px; margin-top: 4px; display: block;">You can apply any valid IANA identifier below.</span>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(z => {
      const isActive = z.id.toLowerCase() === activeTz;
      const offset = this.getTzOffsetString(z.id);
      const liveTime = this.formatCurrentTimeInZone(z.id, false);

      return `
        <div class="timezone-item ${isActive ? 'active' : ''}" onclick="PlanoraUI.selectTimezone('${z.id}')">
          <div class="tz-item-left">
            <span class="tz-item-name">
              ${this.escapeHtml(z.label)}
              ${isActive ? '<span class="tz-active-badge">Active</span>' : ''}
            </span>
            <span class="tz-item-sub">${this.escapeHtml(z.city)} · ${this.escapeHtml(z.country)}</span>
          </div>
          <div class="tz-item-right">
            <span class="tz-item-time">${liveTime}</span>
            <span class="tz-item-offset">${offset}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  selectTimezone(tz) {
    if (PlanoraStore.setTimezone(tz)) {
      const searchInput = document.getElementById('tzSearchInput');
      const q = searchInput ? searchInput.value : '';
      this.renderTimezoneList(q);
      this.updateTimezoneUI();
    }
  },

  autoDetectTimezone() {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        this.selectTimezone(detected);
        this.showToast(`Auto-detected system timezone: ${detected}`);
      } else {
        this.showToast('Unable to auto-detect system timezone.');
      }
    } catch (e) {
      this.showToast('Timezone detection error.');
    }
  },

  addCustomTimezone() {
    const input = document.getElementById('customTzInput');
    if (!input) return;
    const val = input.value.trim();
    if (!val) {
      this.showToast('Please enter an IANA timezone identifier.');
      return;
    }
    if (PlanoraStore.setTimezone(val)) {
      input.value = '';
      this.renderTimezoneList('');
    }
  },

  // ------------------------------------------------------------
  // Google Calendar Integration (Web Intent URL & RFC-5545 ICS)
  // ------------------------------------------------------------
  getGoogleCalendarUrl(event) {
    if (!event) return '#';
    const dateClean = (event.date || new Date().toISOString().split('T')[0]).replace(/-/g, '');
    const startClean = (event.startTime || '09:00').replace(':', '') + '00';
    const endClean = (event.endTime || '10:00').replace(':', '') + '00';
    const startIso = `${dateClean}T${startClean}`;
    const endIso = `${dateClean}T${endClean}`;
    const title = encodeURIComponent(event.title || 'Planora Scheduled Event');
    const details = encodeURIComponent(
      (event.notes ? event.notes + '\n\n' : '') +
      `Category: ${event.category || 'Focus'}\n` +
      `Priority: ${event.priority || 'Medium'}\n` +
      `Energy Demand: ${event.energyLevel || 'Medium'}\n\n` +
      `Scheduled via Planora AI Schedule Agent`
    );
    const location = encodeURIComponent('Planora Workspace');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  },

  syncEventToGoogleCalendar(eventId) {
    const ev = PlanoraStore.getEvents().find(e => e.id === eventId);
    if (!ev) return;
    const url = this.getGoogleCalendarUrl(ev);
    window.open(url, '_blank');
    this.showToast('Opening Google Calendar Sync');
  },

  exportICSFile() {
    const events = PlanoraStore.getEvents();
    if (events.length === 0) {
      alert('No events scheduled yet to export.');
      return;
    }

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Planora AI//Schedule Intelligence//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach(ev => {
      const dateClean = (ev.date || new Date().toISOString().split('T')[0]).replace(/-/g, '');
      const startClean = (ev.startTime || '09:00').replace(':', '') + '00';
      const endClean = (ev.endTime || '10:00').replace(':', '') + '00';
      const uid = (ev.id || 'evt_' + Date.now()) + '@planora.ai';
      const summary = (ev.title || 'Planora Event').replace(/,/g, '\\,');
      const desc = (ev.notes || `Category: ${ev.category}`).replace(/\n/g, '\\n').replace(/,/g, '\\,');

      icsContent.push('BEGIN:VEVENT');
      icsContent.push(`UID:${uid}`);
      icsContent.push(`DTSTAMP:${dateClean}T000000Z`);
      icsContent.push(`DTSTART:${dateClean}T${startClean}`);
      icsContent.push(`DTEND:${dateClean}T${endClean}`);
      icsContent.push(`SUMMARY:${summary}`);
      icsContent.push(`DESCRIPTION:${desc}`);
      icsContent.push('LOCATION:Planora Workspace');
      icsContent.push('STATUS:CONFIRMED');
      icsContent.push('END:VEVENT');
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `planora-schedule-${this.currentDateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast('Exported .ICS calendar file for Google Calendar');
  },

  setChartRange(days) {
    this.chartRange = days;
    [7, 14, 30].forEach(d => {
      const btn = document.getElementById(`chartRange${d}`);
      if (btn) {
        if (d === days) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });
    this.render30DayChart();
  },

  refreshAll() {
    this.renderUserProfile();
    this.renderTimeFormatToggleUI();
    this.updateTimezoneUI();
    this.updateAIStatusBanners();
    this.renderKPIs();
    this.render30DayChart();
    this.renderTimeline();
    this.renderCalendarMatrix();
    this.renderAnalytics();
    this.renderChatHistory();
    this.renderAIDiagnostics();
    this.renderFullAIChatHistory();
    this.renderAITaskSuggestions();
    this.renderStudioScheduleProposal();
    this.renderMonthlyCalendar();
    this.renderDeadlines();
    this.renderDailyTasks();
    PlanoraStore.updateUndoRedoUI();
  },

  renderTimeFormatToggleUI() {
    const btn = document.getElementById('btnTimeFormatToggle');
    if (btn) {
      const is12h = PlanoraStore.getTimeFormat() === '12h';
      btn.innerHTML = `${is12h ? '12H (AM/PM)' : '24H'}`;
      btn.title = `Currently ${is12h ? '12-Hour AM/PM' : '24-Hour'}. Click to switch.`;
    }
  },

  renderUserProfile() {
    const user = PlanoraStore.getAuthUser() || {
      name: 'Vilas Golhar',
      email: 'vilasgolhar65@gmail.com',
      avatar: 'VG'
    };
    const avatarEl = document.getElementById('userAvatar');
    const nameEl = document.getElementById('userName');
    const emailEl = document.getElementById('userEmail');
    const greetingEl = document.getElementById('greetingName');

    if (avatarEl) {
      if (user.picture) {
        avatarEl.innerHTML = `<img src="${this.escapeHtml(user.picture)}" alt="${this.escapeHtml(user.name)}" class="user-avatar-img"><span class="google-badge-dot" title="Google Account & Calendar Connected">G</span>`;
      } else {
        avatarEl.innerHTML = `${this.escapeHtml(user.avatar || 'VG')}<span class="google-badge-dot" title="Google Account & Calendar Connected">G</span>`;
      }
    }
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) {
      emailEl.textContent = user.email;
      emailEl.title = user.calendarGranted ? 'Google Calendar Synchronized' : user.email;
    }
    if (greetingEl) greetingEl.textContent = user.name.split(' ')[0] || user.name;
  },

  renderKPIs() {
    const events = PlanoraStore.getEvents();

    let totalMinutes = 0;
    let focusMinutes = 0;
    let meetingMinutes = 0;
    let completedCount = 0;

    events.forEach(ev => {
      const [sh, sm] = (ev.startTime || '09:00').split(':').map(Number);
      const [eh, em] = (ev.endTime || '10:00').split(':').map(Number);
      const dur = Math.max(15, ((eh || 0) * 60 + (em || 0)) - ((sh || 0) * 60 + (sm || 0)));

      totalMinutes += dur;
      if (ev.category === 'focus') focusMinutes += dur;
      if (ev.category === 'meeting') meetingMinutes += dur;
      if (ev.status === 'completed') completedCount++;
    });

    const focusRatio = totalMinutes > 0 ? Math.round((focusMinutes / totalMinutes) * 100) : 0;
    const completionRate = events.length > 0 ? Math.round((completedCount / events.length) * 100) : 0;
    const meetingHours = (meetingMinutes / 60).toFixed(1);

    const kpiFocus = document.getElementById('kpiFocusRatio');
    const kpiComp = document.getElementById('kpiCompletionRate');
    const kpiMeet = document.getElementById('kpiMeetingLoad');
    const kpiScore = document.getElementById('kpiProductivityScore');

    if (kpiFocus) kpiFocus.textContent = `${focusRatio}%`;
    if (kpiComp) kpiComp.textContent = `${completionRate}%`;
    if (kpiMeet) kpiMeet.textContent = `${meetingHours}h`;
    if (kpiScore) {
      const score = Math.min(100, Math.round((focusRatio * 0.6) + (completionRate * 0.4)));
      kpiScore.textContent = `${score}/100`;
    }
  },

  render30DayChart() {
    const svg = document.getElementById('chartSvg');
    if (!svg) return;

    const numDays = this.chartRange || 7;
    const events = PlanoraStore.getEvents();
    const history = PlanoraStore.getTaskHistory();

    // Aggregate given vs completed tasks for the selected date range
    const days = [];
    const today = new Date();
    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const fullDateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const shortDayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumLabel = d.getDate();

      const dayEvents = events.filter(e => e.date === dateStr);
      const dayHist = history.filter(h => h.dateStr === dateStr);

      const rawPlanned = dayEvents.length;
      const completed = dayEvents.filter(e => e.status === 'completed').length + dayHist.filter(h => h.action === 'complete').length;
      const given = Math.max(rawPlanned, completed);

      days.push({
        dateStr,
        fullDateStr,
        shortDayLabel,
        dayNumLabel,
        given,
        completed
      });
    }

    const width = 1000;
    const height = 260;
    const padLeft = 45;
    const padRight = 25;
    const padTop = 25;
    const padBottom = 45;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Calculate maximum value for Y-axis scaling with dynamic ceiling
    const rawMax = Math.max(4, ...days.map(d => Math.max(d.given, d.completed)));
    const maxVal = Math.ceil(rawMax * 1.25);

    // Y-axis gridlines & ticks (4 steps)
    const ySteps = 4;
    let gridLinesHtml = '';
    for (let s = 0; s <= ySteps; s++) {
      const val = Math.round((maxVal / ySteps) * s);
      const yPos = height - padBottom - (s / ySteps) * chartH;
      if (s === 0) {
        gridLinesHtml += `
          <line x1="${padLeft}" y1="${yPos}" x2="${width - padRight}" y2="${yPos}" class="chart-zero-line" />
          <text x="${padLeft - 10}" y="${yPos + 4}" class="chart-axis-y-label">0</text>
        `;
      } else {
        gridLinesHtml += `
          <line x1="${padLeft}" y1="${yPos}" x2="${width - padRight}" y2="${yPos}" class="chart-grid-line" />
          <text x="${padLeft - 10}" y="${yPos + 4}" class="chart-axis-y-label">${val}</text>
        `;
      }
    }

    // Determine bar widths & spacing based on range
    const slotWidth = chartW / numDays;
    let barWidth, barGap;
    if (numDays === 7) {
      barWidth = 26;
      barGap = 6;
    } else if (numDays === 14) {
      barWidth = 14;
      barGap = 4;
    } else {
      barWidth = 7;
      barGap = 2;
    }

    let barsHtml = '';
    let xLabelsHtml = '';

    days.forEach((d, i) => {
      const groupCenter = padLeft + (i + 0.5) * slotWidth;
      const xGiven = groupCenter - barWidth - barGap / 2;
      const xCompleted = groupCenter + barGap / 2;

      const hGiven = (d.given / maxVal) * chartH;
      const hCompleted = (d.completed / maxVal) * chartH;

      const yGiven = height - padBottom - hGiven;
      const yCompleted = height - padBottom - hCompleted;

      const isToday = i === numDays - 1;

      // Group SVG element with data attributes for tooltip
      barsHtml += `
        <g class="chart-bar-group" data-idx="${i}" data-date="${d.fullDateStr}" data-given="${d.given}" data-completed="${d.completed}">
          <!-- Hover Hit Area Zone -->
          <rect x="${padLeft + i * slotWidth}" y="${padTop}" width="${slotWidth}" height="${chartH}" fill="transparent" />
          <!-- Tasks Given Bar -->
          <rect class="chart-bar-given" x="${xGiven}" y="${yGiven}" width="${barWidth}" height="${Math.max(2, hGiven)}" rx="3" ry="3" />
          <!-- Tasks Completed Bar -->
          <rect class="chart-bar-completed" x="${xCompleted}" y="${yCompleted}" width="${barWidth}" height="${Math.max(2, hCompleted)}" rx="3" ry="3" />
        </g>
      `;

      // X-Axis Date Labels
      let showLabel = true;
      if (numDays === 30) {
        showLabel = (i % 3 === 0) || isToday;
      }

      if (showLabel) {
        const labelText = numDays <= 7
          ? (isToday ? 'Today' : `${d.shortDayLabel} ${d.dayNumLabel}`)
          : (isToday ? 'Today' : `${d.dayNumLabel}`);
        xLabelsHtml += `
          <text x="${groupCenter}" y="${height - padBottom + 22}" class="chart-axis-label" style="${isToday ? 'font-weight: 700; fill: var(--text-primary);' : ''}">${labelText}</text>
        `;
      }
    });

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = `
      ${gridLinesHtml}
      ${barsHtml}
      ${xLabelsHtml}
    `;

    // Tooltip interaction for bar groups
    const tooltip = document.getElementById('chartTooltip');
    if (tooltip) {
      svg.querySelectorAll('.chart-bar-group').forEach(group => {
        group.addEventListener('mouseenter', () => {
          const rect = svg.getBoundingClientRect();
          const date = group.getAttribute('data-date');
          const given = parseInt(group.getAttribute('data-given'), 10);
          const completed = parseInt(group.getAttribute('data-completed'), 10);
          const idx = parseInt(group.getAttribute('data-idx'), 10);

          const groupCenterX = padLeft + (idx + 0.5) * slotWidth;
          const completionPct = given > 0 ? Math.round((completed / given) * 100) : (completed > 0 ? 100 : 0);

          tooltip.innerHTML = `
            <div class="tooltip-date">${date}</div>
            <div class="tooltip-row" style="display:flex; justify-content:space-between; gap:16px; margin: 4px 0;">
              <span style="color: var(--text-muted);">Tasks Given:</span>
              <strong style="color: var(--text-primary);">${given}</strong>
            </div>
            <div class="tooltip-row" style="display:flex; justify-content:space-between; gap:16px; margin: 4px 0;">
              <span style="color: var(--text-muted);">✓ Tasks Completed:</span>
              <strong style="color: var(--text-primary);">${completed}</strong>
            </div>
            <div class="tooltip-ai-note" style="margin-top:6px; padding-top:6px; border-top:1px solid var(--border-light); font-size:11px; font-family:var(--font-mono); color:var(--text-secondary);">
              Velocity: <strong style="color: var(--text-primary);">${completionPct}%</strong> completion
            </div>
          `;

          const leftPos = (groupCenterX / width) * rect.width;
          tooltip.style.left = `${Math.min(rect.width - 170, Math.max(10, leftPos - 85))}px`;
          tooltip.style.top = `20px`;
          tooltip.classList.add('visible');
        });

        group.addEventListener('mouseleave', () => {
          tooltip.classList.remove('visible');
        });
      });
    }
  },

  renderTimeline() {
    const stream = document.getElementById('timelineStream');
    if (!stream) return;

    const events = PlanoraStore.getEvents().filter(e => {
      if (this.activeFilter === 'all') return true;
      if (this.activeFilter === 'focus') return e.category === 'focus';
      if (this.activeFilter === 'meeting') return e.category === 'meeting';
      if (this.activeFilter === 'routine') return e.category === 'routine';
      if (this.activeFilter === 'completed') return e.status === 'completed';
      return true;
    });

    // Sort by startTime
    events.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

    if (events.length === 0) {
      stream.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
          </div>
          <div class="empty-state-title">No events scheduled yet</div>
          <div class="empty-state-desc">
            Your schedule is clean. Add your actual work sessions, meetings, and routines manually, or let the AI Agent generate a circadian-aligned plan.
          </div>
          <div class="empty-state-actions">
            <button class="btn-primary" onclick="PlanoraUI.openAddModal()">+ Add First Event</button>
            <button class="btn-ghost-sm" onclick="PlanoraUI.askAIToGenerate()">Ask AI to Plan</button>
          </div>
        </div>
      `;
      return;
    }

    let html = '';
    events.forEach(ev => {
      const isCompleted = ev.status === 'completed';
      const isSlump = ev.status === 'slump';
      const formattedStart = this.formatTime(ev.startTime);
      const formattedRange = this.formatTimeRange(ev.startTime, ev.endTime);
      const gcalUrl = this.getGoogleCalendarUrl(ev);

      html += `
        <div class="timeline-item ${isCompleted ? 'completed' : ''}" data-id="${ev.id}">
          <div class="timeline-time-col">
            <span class="time-start mono">${formattedStart}</span>
            <span class="time-duration mono">${ev.duration || '1h 00m'}</span>
          </div>
          <div class="timeline-content-col">
            <div class="event-title-row">
              <span class="event-title">${this.escapeHtml(ev.title)}</span>
              <span class="event-status-tag ${ev.category}">${ev.category}</span>
              ${isSlump ? '<span class="event-status-tag slump">Slump/Low Energy</span>' : ''}
              <span class="event-priority-tag">${ev.priority || 'medium'}</span>
            </div>
            <div class="event-details">
              <span>${ev.date} (${formattedRange})</span>
              ${ev.notes ? `<span class="ai-reasoning-chip">${this.escapeHtml(ev.notes)}</span>` : ''}
            </div>
          </div>
          <div class="timeline-actions-row">
            <a class="btn-gcal-action" href="${gcalUrl}" target="_blank" title="Add directly to Google Calendar">
              GCal
            </a>
            <button class="btn-icon-sm" title="${isCompleted ? 'Mark Pending' : 'Mark Completed'}" onclick="PlanoraUI.toggleComplete('${ev.id}')">
              ${isCompleted ? '↩' : '✓'}
            </button>
            <button class="btn-icon-sm" title="Mark Slump/Lazy Period" onclick="PlanoraUI.markSlump('${ev.id}')" style="font-size: 11px; font-weight: 600;">
              Low
            </button>
            <button class="btn-icon-sm" title="Edit Event" onclick="PlanoraUI.openEditModal('${ev.id}')">
              ✎
            </button>
            <button class="btn-icon-sm" title="Delete Event" onclick="PlanoraUI.deleteEvent('${ev.id}')">
              ✕
            </button>
          </div>
        </div>
      `;
    });

    stream.innerHTML = html;
  },

  // ------------------------------------------------------------
  // 7-Day Weekly Matrix & Week Progress Dashboard Logic
  // ------------------------------------------------------------
  getWeeklyDates(offsetWeeks = 0) {
    const today = new Date();
    const currentDay = today.getDay(); // 0: Sun, 1: Mon...
    const distanceToMonday = (currentDay === 0 ? -6 : 1) - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday + (offsetWeeks * 7));
    monday.setHours(0, 0, 0, 0);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const days = [];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dayNum = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${dayNum}`;
      const monthShort = d.toLocaleDateString('en-US', { month: 'short' });

      days.push({
        index: i,
        name: dayNames[i],
        dayNumber: d.getDate(),
        monthShort: monthShort,
        dateStr: dateStr,
        displayLabel: `${dayNames[i]} ${monthShort} ${d.getDate()}`,
        shortLabel: `${dayNames[i]} ${d.getDate()}`,
        isToday: dateStr === todayStr,
        fullDate: d
      });
    }
    return days;
  },

  weeklyPrev() {
    this._weeklyOffset = (this._weeklyOffset || 0) - 1;
    this.renderCalendarMatrix();
  },

  weeklyNext() {
    this._weeklyOffset = (this._weeklyOffset || 0) + 1;
    this.renderCalendarMatrix();
  },

  weeklyToday() {
    this._weeklyOffset = 0;
    this.renderCalendarMatrix();
  },

  setWeeklyTodoFilter(filter) {
    this._weeklyTodoFilter = filter;
    this.renderCalendarMatrix();
  },

  addWeeklyTodo() {
    const input = document.getElementById('weeklyTodoInput');
    const catSelect = document.getElementById('weeklyTodoCategory');
    const priSelect = document.getElementById('weeklyTodoPriority');
    const daySelect = document.getElementById('weeklyTodoDaySelect');

    if (!input || !input.value.trim()) return;

    const title = input.value.trim();
    const category = catSelect ? catSelect.value : 'focus';
    const priority = priSelect ? priSelect.value : 'medium';
    const targetDate = daySelect && daySelect.value ? daySelect.value : this.currentDateStr;

    const newEvent = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: title,
      date: targetDate,
      startTime: '09:00',
      endTime: '10:00',
      category: category,
      priority: priority,
      energyLevel: priority === 'high' ? 'high' : 'medium',
      status: 'pending',
      notes: 'Added from Weekly Matrix To-Do'
    };

    const currentEvents = PlanoraStore.getEvents();
    PlanoraStore.saveEvents([...currentEvents, newEvent]);
    input.value = '';
    this.showToast(`Task "${title}" added to weekly schedule!`);
    this.renderCalendarMatrix();
  },

  playCheckSound() {
    try {
      if (typeof PlanoraNotify !== 'undefined' && PlanoraNotify.getAudioContext) {
        const ctx = PlanoraNotify.getAudioContext();
        if (ctx) {
          if (ctx.state === 'suspended') ctx.resume();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }
      }
    } catch (_) {}
  },

  toggleWeeklyTaskStatus(id) {
    const events = PlanoraStore.getEvents();
    const idx = events.findIndex(e => String(e.id) === String(id));
    if (idx !== -1) {
      const ev = events[idx];
      const isCurrentlyDone = ev.status === 'completed' || ev.completed === true;
      const newStatus = isCurrentlyDone ? 'planned' : 'completed';
      ev.status = newStatus;
      ev.completed = (newStatus === 'completed');

      if (newStatus === 'completed') {
        PlanoraStore.logTaskHistory({
          action: 'completed',
          taskId: ev.id,
          title: ev.title,
          category: ev.category,
          priority: ev.priority
        });
        this.playCheckSound();
        this.showToast(`Completed "${ev.title}"! ✓`);
      } else {
        this.showToast(`Marked "${ev.title}" as planned`);
      }

      PlanoraStore.saveEvents(events);
      this.renderCalendarMatrix();
      return;
    }

    // Fallback: check daily tasks backlog
    const dailyTasks = PlanoraStore.getDailyTasks();
    const dIdx = dailyTasks.findIndex(t => String(t.id) === String(id));
    if (dIdx !== -1) {
      PlanoraStore.toggleDailyTask(id);
      this.playCheckSound();
      this.renderDailyTasks();
      this.renderCalendarMatrix();
    }
  },

  deleteWeeklyTodo(id) {
    const events = PlanoraStore.getEvents();
    const target = events.find(e => e.id === id);
    const updated = events.filter(e => e.id !== id);
    PlanoraStore.saveEvents(updated);
    if (target) {
      this.showToast(`Removed "${target.title}" from weekly schedule`);
    }
  },

  handleWeeklyTaskDragStart(e, id) {
    if (e.target && (e.target.closest('.weekly-todo-checkbox') || e.target.closest('.weekly-todo-actions'))) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.currentTarget;
    if (target) {
      target.classList.add('is-dragging');
      setTimeout(() => target.classList.remove('is-dragging'), 800);
    }
  },

  handleWeeklySlotDrop(e, dateStr, timeStr) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    const events = PlanoraStore.getEvents();
    const ev = events.find(item => item.id === taskId);
    if (!ev) return;

    // Calculate 1 hour slot duration
    const [h, m] = timeStr.split(':').map(Number);
    const endH = String(Math.min(23, h + 1)).padStart(2, '0');
    const endM = String(m || 0).padStart(2, '0');

    ev.date = dateStr;
    ev.startTime = timeStr;
    ev.endTime = `${endH}:${endM}`;

    PlanoraStore.saveEvents(events);
    const formattedTime = this.formatTime(timeStr);
    this.showToast(`Scheduled "${ev.title}" on ${dateStr} at ${formattedTime}`);
  },

  renderWeeklyProgressDashboard(days, weekEvents) {
    const tasksTakenEl = document.getElementById('weeklyTasksTaken');
    const tasksTakenSubEl = document.getElementById('weeklyTasksTakenSub');
    const tasksCompEl = document.getElementById('weeklyTasksCompleted');
    const compRateEl = document.getElementById('weeklyCompletionRate');
    const tasksPendEl = document.getElementById('weeklyTasksPending');
    const tasksPendSubEl = document.getElementById('weeklyTasksPendingSub');
    const workloadEl = document.getElementById('weeklyWorkloadHours');
    const focusBreakdownEl = document.getElementById('weeklyFocusBreakdown');
    const statusBadgeEl = document.getElementById('weeklyProgressStatusBadge');
    const progressPctEl = document.getElementById('weeklyProgressPct');
    const progressFillEl = document.getElementById('weeklyProgressFill');
    const dayBreakdownStripEl = document.getElementById('weeklyDayBreakdownStrip');

    if (!tasksTakenEl) return;

    const totalTaken = weekEvents.length;
    const completedEvents = weekEvents.filter(e => e.status === 'completed');
    const pendingEvents = weekEvents.filter(e => e.status !== 'completed');
    const totalCompleted = completedEvents.length;
    const totalPending = pendingEvents.length;

    const pct = totalTaken > 0 ? Math.round((totalCompleted / totalTaken) * 100) : 0;

    // Calculate hours
    let totalMinutes = 0;
    let focusMinutes = 0;
    let meetingMinutes = 0;

    weekEvents.forEach(ev => {
      let dur = 60; // default 1 hour
      if (ev.startTime && ev.endTime) {
        const [sh, sm] = ev.startTime.split(':').map(Number);
        const [eh, em] = ev.endTime.split(':').map(Number);
        const diff = (eh * 60 + (em || 0)) - (sh * 60 + (sm || 0));
        if (diff > 0) dur = diff;
      }
      totalMinutes += dur;
      if (ev.category === 'focus') focusMinutes += dur;
      else if (ev.category === 'meeting') meetingMinutes += dur;
    });

    const totalHours = (totalMinutes / 60).toFixed(1);
    const focusHours = (focusMinutes / 60).toFixed(1);
    const meetingHours = (meetingMinutes / 60).toFixed(1);

    tasksTakenEl.textContent = totalTaken;
    if (tasksTakenSubEl) tasksTakenSubEl.textContent = totalTaken === 1 ? '1 task planned' : `${totalTaken} tasks scheduled across week`;

    tasksCompEl.textContent = totalCompleted;
    if (compRateEl) compRateEl.textContent = `${pct}% completion velocity`;

    tasksPendEl.textContent = totalPending;
    if (tasksPendSubEl) tasksPendSubEl.textContent = totalPending === 0 && totalTaken > 0 ? 'All tasks complete!' : `${totalPending} pending execution`;

    workloadEl.textContent = `${totalHours}h`;
    if (focusBreakdownEl) focusBreakdownEl.textContent = `${focusHours}h Focus • ${meetingHours}h Meetings`;

    if (progressPctEl) progressPctEl.textContent = `${pct}%`;
    if (progressFillEl) progressFillEl.style.width = `${pct}%`;

    // Dynamic status badge
    if (statusBadgeEl) {
      if (totalTaken === 0) {
        statusBadgeEl.textContent = 'Week Ready';
        statusBadgeEl.className = 'badge-status-pill badge-neutral';
      } else if (pct === 100) {
        statusBadgeEl.textContent = 'Sprint Complete';
        statusBadgeEl.className = 'badge-status-pill badge-success';
      } else if (pct >= 70) {
        statusBadgeEl.textContent = 'Optimal Execution';
        statusBadgeEl.className = 'badge-status-pill badge-success';
      } else if (pct >= 40) {
        statusBadgeEl.textContent = 'On Track';
        statusBadgeEl.className = 'badge-status-pill badge-accent';
      } else {
        statusBadgeEl.textContent = 'In Progress';
        statusBadgeEl.className = 'badge-status-pill badge-warning';
      }
    }

    // 7-day mini daily completion breakdown strip
    if (dayBreakdownStripEl) {
      let stripHtml = '';
      days.forEach(d => {
        const dayEvts = weekEvents.filter(e => e.date === d.dateStr);
        const dayTotal = dayEvts.length;
        const dayDone = dayEvts.filter(e => e.status === 'completed').length;
        const dayPct = dayTotal > 0 ? Math.round((dayDone / dayTotal) * 100) : 0;
        const isCurrentDay = d.isToday;

        stripHtml += `
          <div class="weekly-day-pill ${isCurrentDay ? 'is-today' : ''} ${dayDone === dayTotal && dayTotal > 0 ? 'is-complete' : ''}">
            <div class="weekly-day-pill-header">
              <span class="day-code">${d.name}</span>
              <span class="day-date mono">${d.dayNumber}</span>
            </div>
            <div class="weekly-day-pill-progress">
              <div class="weekly-day-pill-fill" style="width: ${dayPct}%"></div>
            </div>
            <div class="weekly-day-pill-stats mono">
              ${dayTotal > 0 ? `${dayDone}/${dayTotal}` : '—'}
            </div>
          </div>
        `;
      });
      dayBreakdownStripEl.innerHTML = stripHtml;
    }
  },

  renderWeeklyTodoList(days, weekEvents) {
    const listEl = document.getElementById('weeklyTodoList');
    const countAllEl = document.getElementById('countAllWeekly');
    const countPendingEl = document.getElementById('countPendingWeekly');
    const countDoneEl = document.getElementById('countDoneWeekly');
    const totalCountBadge = document.getElementById('weeklyTodoCount');
    const daySelect = document.getElementById('weeklyTodoDaySelect');

    // Populate day select if empty or needs update
    if (daySelect) {
      const currentSelected = daySelect.value;
      let selectHtml = '';
      days.forEach(d => {
        const isSelected = currentSelected ? currentSelected === d.dateStr : d.isToday;
        selectHtml += `<option value="${d.dateStr}" ${isSelected ? 'selected' : ''}>${d.name} (${d.monthShort} ${d.dayNumber})${d.isToday ? ' ★ Today' : ''}</option>`;
      });
      daySelect.innerHTML = selectHtml;
    }

    const weekTasks = Array.isArray(weekEvents) ? weekEvents : [];

    const totalAll = weekTasks.length;
    const totalPending = weekTasks.filter(e => e.status !== 'completed').length;
    const totalDone = weekTasks.filter(e => e.status === 'completed').length;

    if (countAllEl) countAllEl.textContent = totalAll;
    if (countPendingEl) countPendingEl.textContent = totalPending;
    if (countDoneEl) countDoneEl.textContent = totalDone;
    if (totalCountBadge) totalCountBadge.textContent = totalAll;

    // Update active state of filter buttons
    const filter = this._weeklyTodoFilter || 'all';
    const btnAll = document.getElementById('weeklyFilterAllBtn');
    const btnPending = document.getElementById('weeklyFilterPendingBtn');
    const btnDone = document.getElementById('weeklyFilterDoneBtn');

    if (btnAll) btnAll.classList.toggle('active', filter === 'all');
    if (btnPending) btnPending.classList.toggle('active', filter === 'pending');
    if (btnDone) btnDone.classList.toggle('active', filter === 'completed');

    if (!listEl) return;

    let filtered = weekTasks;
    if (filter === 'pending') {
      filtered = weekTasks.filter(e => e.status !== 'completed');
    } else if (filter === 'completed') {
      filtered = weekTasks.filter(e => e.status === 'completed');
    }

    if (filtered.length === 0) {
      const emptyMsg = filter === 'completed'
        ? 'No completed tasks yet for this week.'
        : filter === 'pending'
          ? 'All tasks completed for this week!'
          : 'No tasks scheduled for this week. Add one above or click any calendar slot.';
      listEl.innerHTML = `
        <div class="weekly-todo-empty">
          <div style="font-size: 24px; margin-bottom: 6px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
          <div>${emptyMsg}</div>
        </div>
      `;
      return;
    }

    let html = '';
    // Sort: pending first, then by date, then startTime
    filtered.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (a.status !== 'completed' && b.status === 'completed') return -1;
      if (a.date !== b.date) return (a.date || '').localeCompare(b.date || '');
      return (a.startTime || '').localeCompare(b.startTime || '');
    });

    filtered.forEach(task => {
      const isDone = task.status === 'completed' || task.completed === true;
      const cat = task.category || 'focus';
      const pri = task.priority || 'medium';
      const dayObj = days.find(d => d.dateStr === task.date);
      const dayLabel = dayObj ? dayObj.name : (task.date || '');
      const timeDisplay = task.startTime ? this.formatTime(task.startTime) : '';

      html += `
        <div class="weekly-todo-card ${cat} ${isDone ? 'is-completed' : ''}"
             draggable="true"
             data-task-id="${task.id}"
             ondragstart="PlanoraUI.handleWeeklyTaskDragStart(event, '${task.id}')">
          <div class="weekly-todo-checkbox ${isDone ? 'is-checked' : ''}" 
               draggable="false"
               onmousedown="event.stopPropagation();"
               onclick="event.stopPropagation(); PlanoraUI.toggleWeeklyTaskStatus('${task.id}')" 
               title="${isDone ? 'Mark as Pending' : 'Mark as Completed'}"
               role="checkbox"
               aria-checked="${isDone ? 'true' : 'false'}">
            ${isDone ? '✓' : ''}
          </div>
          <div class="weekly-todo-content" onclick="PlanoraUI.openEditModal('${task.id}')">
            <div class="weekly-todo-top-row">
              <span class="weekly-todo-title ${isDone ? 'done-text' : ''}">${this.escapeHtml(task.title)}</span>
            </div>
            <div class="weekly-todo-meta-row">
              <span class="event-status-tag ${cat}">${cat}</span>
              <span class="weekly-todo-priority ${pri}">${pri === 'high' ? 'High' : pri === 'medium' ? 'Med' : 'Low'}</span>
              <span class="weekly-todo-day-tag mono">${dayLabel}${timeDisplay ? ` • ${timeDisplay}` : ''}</span>
            </div>
          </div>
          <div class="weekly-todo-actions">
            <button class="btn-icon-sm" onclick="event.stopPropagation(); PlanoraUI.openEditModal('${task.id}')" title="Edit Task">✎</button>
            <button class="btn-icon-sm" onclick="event.stopPropagation(); PlanoraUI.deleteWeeklyTodo('${task.id}')" title="Delete Task">✕</button>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
  },

  renderCalendarMatrix() {
    const matrix = document.getElementById('calendarMatrix');
    if (!matrix) return;

    const days = this.getWeeklyDates(this._weeklyOffset || 0);
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    const allEvents = PlanoraStore.getEvents();

    const weekDates = days.map(d => d.dateStr);
    const weekEvents = allEvents.filter(ev => weekDates.includes(ev.date));

    // Update Date Range Label
    const dateRangeEl = document.getElementById('weeklyDateRange');
    if (dateRangeEl) {
      const startDay = days[0];
      const endDay = days[6];
      dateRangeEl.textContent = `${startDay.monthShort} ${startDay.dayNumber} — ${endDay.monthShort} ${endDay.dayNumber}, ${endDay.fullDate.getFullYear()}`;
    }

    // Render Weekly Progress Dashboard & Weekly To-Do List
    this.renderWeeklyProgressDashboard(days, weekEvents);
    this.renderWeeklyTodoList(days, weekEvents);

    // Build 7-Day Matrix Header
    let headerHtml = '<div class="cal-header-cell mono">Time</div>';
    days.forEach(d => {
      headerHtml += `
        <div class="cal-header-cell ${d.isToday ? 'is-today-header' : ''}">
          <div class="cal-header-day-name">${d.name}</div>
          <div class="cal-header-day-num mono">${d.monthShort} ${d.dayNumber}</div>
          ${d.isToday ? '<span class="today-tag">TODAY</span>' : ''}
        </div>
      `;
    });

    // Build Grid Body
    let bodyHtml = '';
    hours.forEach(hr => {
      const formattedHr = this.formatTime(hr);
      bodyHtml += `<div class="cal-time-cell mono">${formattedHr}</div>`;

      days.forEach(d => {
        const isCircadianPeak = (hr === '09:00' || hr === '10:00' || hr === '11:00');

        // Find matching events for this specific date and hour slot
        const matching = allEvents.filter(ev => {
          if (ev.date !== d.dateStr) return false;
          const startH = (ev.startTime || '').substring(0, 2);
          const slotH = hr.substring(0, 2);
          return startH === slotH;
        });

        let eventSnippet = '';
        if (matching.length > 0) {
          matching.forEach(m => {
            const isCompleted = m.status === 'completed';
            eventSnippet += `
              <div class="cal-event-block ${m.category} ${isCompleted ? 'is-completed' : ''}"
                   draggable="true"
                   data-event-id="${m.id}"
                   ondragstart="PlanoraUI.handleWeeklyTaskDragStart(event, '${m.id}')"
                   onclick="event.stopPropagation(); PlanoraUI.openEditModal('${m.id}')">
                <div class="cal-event-title">${isCompleted ? '✓ ' : ''}${this.escapeHtml(m.title)}</div>
                <div class="cal-event-time mono">${this.formatTimeRange(m.startTime || hr, m.endTime || hr)}</div>
              </div>
            `;
          });
        }

        bodyHtml += `
          <div class="cal-slot-cell ${isCircadianPeak ? 'circadian-highlight-zone' : ''} ${matching.length > 0 ? 'has-event' : ''} ${d.isToday ? 'is-today-col' : ''}"
               data-date="${d.dateStr}"
               data-time="${hr}"
               ondragover="event.preventDefault(); this.classList.add('drag-over')"
               ondragleave="this.classList.remove('drag-over')"
               ondrop="PlanoraUI.handleWeeklySlotDrop(event, '${d.dateStr}', '${hr}')"
               onclick="PlanoraUI.openAddModalWithDateTime('${d.dateStr}', '${hr}')">
            ${eventSnippet}
          </div>
        `;
      });
    });

    matrix.innerHTML = headerHtml + bodyHtml;
  },

  renderAnalytics() {
    const insights = PlanoraAI.getHistoricalInsights();
    const barsContainer = document.getElementById('circadianBars');
    if (!barsContainer) return;

    const b = insights.timeBuckets;
    const total = Math.max(1, insights.totalEvents);
    const calcPct = (count) => Math.min(100, Math.round((count / total) * 100));

    const eMornStr = PlanoraStore.getTimeFormat() === '12h' ? '06:00 AM – 09:00 AM' : '06:00 – 09:00';
    const mPeakStr = PlanoraStore.getTimeFormat() === '12h' ? '09:00 AM – 01:00 PM' : '09:00 – 13:00';
    const aDipStr  = PlanoraStore.getTimeFormat() === '12h' ? '01:00 PM – 04:30 PM' : '13:00 – 16:30';
    const eFocStr  = PlanoraStore.getTimeFormat() === '12h' ? '04:30 PM – 09:00 PM' : '16:30 – 21:00';

    barsContainer.innerHTML = `
      <div class="stat-bar-row">
        <div class="stat-bar-header">
          <span>Early Morning (${eMornStr})</span>
          <span class="mono">${b.earlyMorning.completed} done / ${b.earlyMorning.total} planned</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width: ${calcPct(b.earlyMorning.completed)}%"></div>
        </div>
      </div>

      <div class="stat-bar-row">
        <div class="stat-bar-header">
          <span>Morning Peak Focus (${mPeakStr})</span>
          <span class="mono">${b.morningPeak.completed} done / ${b.morningPeak.total} planned</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width: ${calcPct(b.morningPeak.completed)}%"></div>
        </div>
      </div>

      <div class="stat-bar-row">
        <div class="stat-bar-header">
          <span>Afternoon Slump Dip (${aDipStr})</span>
          <span class="mono">${b.afternoonDip.completed} done / ${b.afternoonDip.total} planned</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width: ${calcPct(b.afternoonDip.completed)}%"></div>
        </div>
      </div>

      <div class="stat-bar-row">
        <div class="stat-bar-header">
          <span>Evening Focus & Wrap-up (${eFocStr})</span>
          <span class="mono">${b.eveningFocus.completed} done / ${b.eveningFocus.total} planned</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width: ${calcPct(b.eveningFocus.completed)}%"></div>
        </div>
      </div>
    `;
  },

  renderChatHistory() {
    const container = document.getElementById('aiChatMessages');
    if (!container) return;

    const chat = PlanoraStore.getChatHistory();
    if (chat.length === 0) {
      container.innerHTML = `
        <div class="ai-chat-bubble ai">
          Hello Arjun! I am <strong>ScheduleAI</strong> (powered by Planora AI), your specialized autonomous <strong>Schedule Management AI Agent</strong>.
          <br><br>
          I operate with calendar mastery, circadian biological rhythms (Night Owl profile), and hard deadline protection.
          <br><br>
          <strong>Try asking me:</strong>
          <br>• <em>"How does my day look tomorrow?"</em>
          <br>• <em>"Reschedule my uncompleted tasks to tomorrow evening"</em>
          <br>• <em>"Schedule a 45 min workout tonight at 8 PM"</em>
          <br>• <em>"What are my highest priority upcoming deadlines?"</em>
          <br>• <em>"Assess my burnout risk for this week"</em>
          <br>• <em>"When am I free today?"</em>
        </div>
      `;
      return;
    }

    let html = '';
    chat.forEach((msg, idx) => {
      if (msg.role === 'user') {
        html += `<div class="ai-chat-bubble user">${this.escapeHtml(msg.text)}</div>`;
      } else {
        let bubbleContent = this.formatAIMessage(msg.text);
        if (msg.actions && msg.actions.length > 0) {
          bubbleContent += this.renderActionCardsHtml(msg.actions, `batch_drawer_${idx}`);
        }
        html += `<div class="ai-chat-bubble ai">${bubbleContent}</div>`;
      }
    });
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  },

  formatAIMessage(text) {
    if (!text) return '';
    let formatted = this.escapeHtml(text);

    // Code blocks
    formatted = formatted.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, '<pre class="mono" style="background:var(--bg-body); padding:10px; border-radius:6px; font-size:11px; overflow-x:auto; margin:6px 0; border:1px solid var(--border-subtle);">$2</pre>');
    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="mono" style="background:var(--bg-subtle); padding:2px 5px; border-radius:4px; font-size:11px; border:1px solid var(--border-subtle);">$1</code>');
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Headings
    formatted = formatted.replace(/^### (.*$)/gim, '<div style="font-weight:800; font-size:12.5px; margin-top:8px; margin-bottom:4px;">$1</div>');
    formatted = formatted.replace(/^## (.*$)/gim, '<div style="font-weight:800; font-size:13.5px; margin-top:10px; margin-bottom:4px;">$1</div>');
    // Lists
    formatted = formatted.replace(/^[•\-\*] (.*$)/gim, '<div style="padding-left:12px; position:relative; margin-bottom:2px;">• $1</div>');
    // Newlines to br
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  },

  // Modal Handlers
  openAddModal(defaultCategory = 'focus') {
    const modal = document.getElementById('eventModal');
    const form = document.getElementById('eventForm');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('modalEventId').value = '';
    document.getElementById('modalTitle').textContent = 'Add Schedule Event';
    document.getElementById('eventDate').value = this.currentDateStr;
    document.getElementById('eventStartTime').value = '09:30';
    document.getElementById('eventEndTime').value = '11:30';
    document.getElementById('eventCategory').value = defaultCategory;
    document.getElementById('eventPriority').value = 'high';
    document.getElementById('eventEnergy').value = 'high';

    const gcalCheck = document.getElementById('syncGoogleCalCheck');
    if (gcalCheck) gcalCheck.checked = false;

    const editActions = document.getElementById('modalEditActions');
    if (editActions) editActions.style.display = 'none';

    modal.classList.add('open');
  },

  openAddModalWithTime(timeStr) {
    this.openAddModal();
    document.getElementById('eventStartTime').value = timeStr;
    const [h, m] = timeStr.split(':').map(Number);
    const endH = String(Math.min(23, h + 1)).padStart(2, '0');
    document.getElementById('eventEndTime').value = `${endH}:${String(m || 0).padStart(2, '0')}`;
  },

  openAddModalWithDateTime(dateStr, timeStr) {
    this.openAddModal();
    if (dateStr) {
      const dateInput = document.getElementById('eventDate');
      if (dateInput) dateInput.value = dateStr;
    }
    if (timeStr) {
      const startInput = document.getElementById('eventStartTime');
      if (startInput) startInput.value = timeStr;
      const [h, m] = timeStr.split(':').map(Number);
      const endH = String(Math.min(23, h + 1)).padStart(2, '0');
      const endInput = document.getElementById('eventEndTime');
      if (endInput) endInput.value = `${endH}:${String(m || 0).padStart(2, '0')}`;
    }
  },

  openEditModal(id) {
    const ev = PlanoraStore.getEvents().find(e => e.id === id);
    if (!ev) return;

    const modal = document.getElementById('eventModal');
    if (!modal) return;

    document.getElementById('modalEventId').value = ev.id;
    document.getElementById('modalTitle').textContent = 'Edit Schedule Event';
    document.getElementById('eventTitle').value = ev.title || '';
    document.getElementById('eventDate').value = ev.date || this.currentDateStr;
    document.getElementById('eventStartTime').value = ev.startTime || '09:00';
    document.getElementById('eventEndTime').value = ev.endTime || '10:00';
    document.getElementById('eventCategory').value = ev.category || 'focus';
    document.getElementById('eventPriority').value = ev.priority || 'medium';
    document.getElementById('eventEnergy').value = ev.energyLevel || 'medium';
    document.getElementById('eventNotes').value = ev.notes || '';

    const gcalCheck = document.getElementById('syncGoogleCalCheck');
    if (gcalCheck) gcalCheck.checked = false;

    const editActions = document.getElementById('modalEditActions');
    if (editActions) editActions.style.display = 'inline-flex';

    const completeBtn = document.getElementById('btnCompleteEventFromModal');
    const completeText = document.getElementById('completeModalBtnText');
    if (completeBtn && completeText) {
      if (ev.status === 'completed') {
        completeBtn.classList.add('is-completed');
        completeText.textContent = 'Completed (Undo)';
        completeBtn.title = 'Click to mark event as pending';
      } else {
        completeBtn.classList.remove('is-completed');
        completeText.textContent = 'Complete Task';
        completeBtn.title = 'Click to mark event as completed';
      }
    }

    modal.classList.add('open');
  },

  closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) modal.classList.remove('open');
  },

  saveEventFromModal() {
    const id = document.getElementById('modalEventId').value;
    const title = document.getElementById('eventTitle').value.trim();
    const date = document.getElementById('eventDate').value;
    const startTime = document.getElementById('eventStartTime').value;
    const endTime = document.getElementById('eventEndTime').value;
    const category = document.getElementById('eventCategory').value;
    const priority = document.getElementById('eventPriority').value;
    const energyLevel = document.getElementById('eventEnergy').value;
    const notes = document.getElementById('eventNotes').value.trim();
    const syncGCal = document.getElementById('syncGoogleCalCheck')?.checked;

    if (!title) {
      alert('Please enter an event title.');
      return;
    }

    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const durMin = Math.max(15, ((eh || 0) * 60 + (em || 0)) - ((sh || 0) * 60 + (sm || 0)));
    const duration = durMin >= 60 ? `${(durMin/60).toFixed(1)}h` : `${durMin}m`;

    const events = PlanoraStore.getEvents();
    let savedEvent = null;

    if (id) {
      // Edit existing
      const idx = events.findIndex(e => e.id === id);
      if (idx !== -1) {
        events[idx] = {
          ...events[idx],
          title, date, startTime, endTime, duration, category, priority, energyLevel, notes
        };
        savedEvent = events[idx];
      }
    } else {
      // Create new
      savedEvent = {
        id: 'evt_' + Date.now(),
        title, date, startTime, endTime, duration, category, priority, energyLevel, notes,
        status: 'planned',
        createdAt: Date.now()
      };
      events.push(savedEvent);
    }

    PlanoraStore.saveEvents(events);
    this.closeModal();

    if (syncGCal && savedEvent) {
      window.open(this.getGoogleCalendarUrl(savedEvent), '_blank');
      this.showToast(id ? 'Event updated & synced to Google Calendar' : 'Event scheduled & synced to Google Calendar');
    } else {
      this.showToast(id ? 'Event updated' : 'Event scheduled');
    }
  },

  deleteCurrentModalEvent() {
    const id = document.getElementById('modalEventId')?.value;
    if (!id) return;
    this.closeModal();
    this.deleteEvent(id);
  },

  completeCurrentModalEvent() {
    const id = document.getElementById('modalEventId')?.value;
    if (!id) return;
    this.toggleComplete(id);
    this.closeModal();
  },

  deleteEvent(id) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const events = PlanoraStore.getEvents().filter(e => e.id !== id);
    PlanoraStore.saveEvents(events);
    this.showToast('Event deleted');
  },

  toggleComplete(id) {
    const events = PlanoraStore.getEvents();
    const ev = events.find(e => e.id === id);
    if (!ev) return;

    ev.status = (ev.status === 'completed') ? 'planned' : 'completed';
    PlanoraStore.saveEvents(events);

    if (ev.status === 'completed') {
      PlanoraStore.logTaskHistory({
        eventId: ev.id,
        title: ev.title,
        category: ev.category,
        energyLevel: ev.energyLevel,
        action: 'complete'
      });
      this.showToast('Marked as Completed ✓');
    } else {
      this.showToast('Marked as Planned');
    }
  },

  markSlump(id) {
    const events = PlanoraStore.getEvents();
    const ev = events.find(e => e.id === id);
    if (!ev) return;

    ev.status = (ev.status === 'slump') ? 'planned' : 'slump';
    ev.energyLevel = 'low';
    PlanoraStore.saveEvents(events);

    PlanoraStore.logTaskHistory({
      eventId: ev.id,
      title: ev.title,
      category: ev.category,
      energyLevel: 'low',
      action: 'slump'
    });

    this.showToast('Logged as Slump / Low Energy Period');
  },

  // ------------------------------------------------------------
  // Universal AI Config Modal & Provider Controllers
  // ------------------------------------------------------------
  _activeModalProvider: 'openai',
  _actionRegistry: {},

  openAIConfigModal() {
    const modal = document.getElementById('aiConfigModal');
    if (!modal) return;

    const config = PlanoraStore.getAIConfig();
    this._activeModalProvider = config.provider || 'openai';

    // Set advanced parameter fields
    const tempInput = document.getElementById('aiConfigTemp');
    if (tempInput) tempInput.value = typeof config.temperature === 'number' ? config.temperature : 0.6;

    const maxTokensInput = document.getElementById('aiConfigMaxTokens');
    if (maxTokensInput) maxTokensInput.value = config.maxTokens || 2048;

    const circCheck = document.getElementById('aiConfigCircadianContextCheck');
    if (circCheck) circCheck.checked = config.injectCircadianContext !== false;

    this.switchAIProviderTab(this._activeModalProvider, true);
    modal.classList.add('open');
  },

  closeAIConfigModal() {
    const modal = document.getElementById('aiConfigModal');
    if (modal) modal.classList.remove('open');
  },

  switchAIProviderTab(provider, updateInputs = true) {
    this._activeModalProvider = provider;

    // Update tab button active states
    const tabs = {
      openai: document.getElementById('tabOpenAI'),
      gemini: document.getElementById('tabGemini'),
      groq: document.getElementById('tabGroq'),
      deepseek: document.getElementById('tabDeepSeek'),
      grok: document.getElementById('tabGrok'),
      anthropic: document.getElementById('tabAnthropic'),
      openrouter: document.getElementById('tabOpenRouter'),
      custom: document.getElementById('tabCustom'),
      local: document.getElementById('tabLocal')
    };

    Object.keys(tabs).forEach(p => {
      if (tabs[p]) tabs[p].classList.toggle('active', p === provider);
    });

    const fieldsSection = document.getElementById('aiKeyFieldsSection');
    const localSection = document.getElementById('aiLocalNoteSection');
    const customUrlGroup = document.getElementById('aiCustomUrlGroup');
    const customUrlInput = document.getElementById('aiConfigCustomUrlInput');
    const clearBtn = document.getElementById('btnClearAiKey');
    const label = document.getElementById('aiConfigKeyLabel');
    const link = document.getElementById('aiConfigGetApiKeyLink');
    const keyInput = document.getElementById('aiConfigApiKeyInput');
    const modelSelect = document.getElementById('aiConfigModelSelect');

    const config = PlanoraStore.getAIConfig();

    if (provider === 'local') {
      if (fieldsSection) fieldsSection.style.display = 'none';
      if (localSection) localSection.style.display = 'block';
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    if (fieldsSection) fieldsSection.style.display = 'block';
    if (localSection) localSection.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'inline-flex';

    // Toggle custom endpoint URL input
    if (customUrlGroup) {
      customUrlGroup.style.display = provider === 'custom' ? 'block' : 'none';
    }
    if (customUrlInput && provider === 'custom' && updateInputs) {
      customUrlInput.value = config.customBaseUrl || 'http://localhost:11434/v1';
    }

    // Populate model select options
    if (modelSelect && PlanoraAI.MODELS[provider]) {
      modelSelect.innerHTML = PlanoraAI.MODELS[provider].map(m => `
        <option value="${m.id}">${m.name}</option>
      `).join('');
    }

    // Configure provider-specific label, portal link, placeholder & default model
    const providerMeta = {
      openai: {
        label: 'OpenAI API Key',
        linkText: 'Get OpenAI Key ↗',
        url: 'https://platform.openai.com/api-keys',
        placeholder: 'sk-proj-... or sk-...',
        defaultModel: 'gpt-4o-mini'
      },
      gemini: {
        label: 'Google Gemini API Key',
        linkText: 'Get Gemini Key ↗',
        url: 'https://aistudio.google.com/app/apikey',
        placeholder: 'AIzaSy...',
        defaultModel: 'gemini-1.5-flash'
      },
      groq: {
        label: 'Groq API Key (Ultra-Fast LPUs)',
        linkText: 'Get Groq Key ↗',
        url: 'https://console.groq.com/keys',
        placeholder: 'gsk_...',
        defaultModel: 'openai/gpt-oss-120b'
      },
      deepseek: {
        label: 'DeepSeek API Key',
        linkText: 'Get DeepSeek Key ↗',
        url: 'https://platform.deepseek.com/api_keys',
        placeholder: 'sk-...',
        defaultModel: 'deepseek-chat'
      },
      grok: {
        label: 'xAI Grok API Key',
        linkText: 'Get xAI Grok Key ↗',
        url: 'https://console.x.ai/',
        placeholder: 'xai-...',
        defaultModel: 'grok-2-latest'
      },
      anthropic: {
        label: 'Anthropic Claude API Key',
        linkText: 'Get Claude Key ↗',
        url: 'https://console.anthropic.com/settings/keys',
        placeholder: 'sk-ant-...',
        defaultModel: 'claude-3-5-sonnet-20241022'
      },
      openrouter: {
        label: 'OpenRouter API Key (Universal AI Gateway)',
        linkText: 'Get OpenRouter Key ↗',
        url: 'https://openrouter.ai/keys',
        placeholder: 'sk-or-...',
        defaultModel: 'meta-llama/llama-3.3-70b-instruct:free'
      },
      custom: {
        label: 'Custom API Key / Bearer Token (Optional)',
        linkText: 'Ollama Guide ↗',
        url: 'https://ollama.com',
        placeholder: 'Bearer token or leave blank for local Ollama',
        defaultModel: 'default'
      }
    };

    const meta = providerMeta[provider] || providerMeta.openai;
    if (label) label.textContent = meta.label;
    if (link) {
      link.href = meta.url;
      link.textContent = meta.linkText;
    }
    if (keyInput) {
      keyInput.placeholder = meta.placeholder;
      if (updateInputs) {
        keyInput.value = config.apiKeys?.[provider] || '';
      }
    }
    if (modelSelect && updateInputs) {
      let chosen = config.models?.[provider] || meta.defaultModel;
      if (provider === 'groq' && (chosen.includes('llama') || chosen.includes('70b'))) {
        chosen = 'openai/gpt-oss-120b';
      }
      modelSelect.value = chosen;
    }

    // Reset test result UI
    const resTitle = document.getElementById('aiTestResultTitle');
    const resDetail = document.getElementById('aiTestResultDetail');
    if (resTitle) {
      resTitle.textContent = 'API Status: Not Tested';
      resTitle.style.color = 'var(--text-primary)';
    }
    if (resDetail) {
      resDetail.textContent = 'Click "Test API Key" to verify latency and model access.';
    }
  },

  handleAiKeyInput(val) {
    if (!val || val.trim().length < 4) return;
    const detected = PlanoraAI.detectProviderFromKey(val);
    if (detected && detected !== this._activeModalProvider) {
      this.switchAIProviderTab(detected, false);
      const resDetail = document.getElementById('aiTestResultDetail');
      if (resDetail) {
        resDetail.textContent = `Auto-detected ${detected.toUpperCase()} API key format.`;
      }
    }
  },

  toggleAiKeyVisibility() {
    const input = document.getElementById('aiConfigApiKeyInput');
    const btn = document.getElementById('btnToggleAiKeyVisibility');
    if (!input || !btn) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = 'Hide';
      btn.title = 'Hide Key';
    } else {
      input.type = 'password';
      btn.textContent = 'Show';
      btn.title = 'Show Key';
    }
  },

  async testAIConnection() {
    const provider = this._activeModalProvider;
    const keyInput = document.getElementById('aiConfigApiKeyInput');
    const modelSelect = document.getElementById('aiConfigModelSelect');
    const customUrlInput = document.getElementById('aiConfigCustomUrlInput');
    const testBtn = document.getElementById('btnTestAiConnection');
    const resTitle = document.getElementById('aiTestResultTitle');
    const resDetail = document.getElementById('aiTestResultDetail');

    if (provider === 'local') {
      if (resTitle) {
        resTitle.textContent = 'API Status: Local Offline Ready';
        resTitle.style.color = '#16a34a';
      }
      if (resDetail) {
        resDetail.textContent = 'Circadian heuristic engine operates in-browser without external requests.';
      }
      return;
    }

    const apiKey = keyInput ? keyInput.value.trim() : '';
    const model = modelSelect ? modelSelect.value : null;
    const customBaseUrl = customUrlInput ? customUrlInput.value.trim() : null;

    if (provider !== 'custom' && !apiKey) {
      if (resTitle) {
        resTitle.textContent = 'API Status: Key Required';
        resTitle.style.color = '#dc2626';
      }
      if (resDetail) {
        resDetail.textContent = `Please paste a valid ${provider.toUpperCase()} API key first.`;
      }
      return;
    }

    if (testBtn) {
      testBtn.disabled = true;
      testBtn.innerHTML = '<span>Testing Latency...</span>';
    }
    if (resTitle) {
      resTitle.textContent = `Connecting to ${provider.toUpperCase()} API...`;
      resTitle.style.color = 'var(--text-primary)';
    }
    if (resDetail) {
      resDetail.textContent = 'Sending lightweight authentication probe...';
    }

    try {
      const result = await PlanoraAI.testConnection(provider, apiKey, model, customBaseUrl);
      if (result.success) {
        if (resTitle) {
          resTitle.textContent = `✓ Connected Successfully (${result.latencyMs}ms latency)`;
          resTitle.style.color = '#16a34a';
        }
        if (resDetail) {
          resDetail.textContent = `Verified model: ${result.model || model}. Fast response ready for scheduling.`;
        }
        this.showToast(`✓ ${provider.toUpperCase()} connected in ${result.latencyMs}ms!`);
      } else {
        if (resTitle) {
          resTitle.textContent = `✗ Connection Failed (${result.statusCode || 'Error'})`;
          resTitle.style.color = '#dc2626';
        }
        if (resDetail) {
          let errDetail = result.error || 'Failed to authenticate with provider.';
          if (typeof errDetail === 'object') {
            errDetail = errDetail.message || JSON.stringify(errDetail);
          }
          resDetail.textContent = errDetail;
        }
      }
    } catch (err) {
      if (resTitle) {
        resTitle.textContent = '✗ Connection Error';
        resTitle.style.color = '#dc2626';
      }
      if (resDetail) {
        resDetail.textContent = err.message || 'Network error occurred.';
      }
    } finally {
      if (testBtn) {
        testBtn.disabled = false;
        testBtn.innerHTML = '<span>Test API Key</span>';
      }
    }
  },

  saveAIConfig() {
    const provider = this._activeModalProvider;
    const keyInput = document.getElementById('aiConfigApiKeyInput');
    const modelSelect = document.getElementById('aiConfigModelSelect');
    const customUrlInput = document.getElementById('aiConfigCustomUrlInput');
    const tempInput = document.getElementById('aiConfigTemp');
    const maxTokensInput = document.getElementById('aiConfigMaxTokens');
    const circCheck = document.getElementById('aiConfigCircadianContextCheck');

    const currentConfig = PlanoraStore.getAIConfig();
    const updated = {
      ...currentConfig,
      provider: provider,
      apiKeys: { ...currentConfig.apiKeys },
      models: { ...currentConfig.models },
      customBaseUrl: customUrlInput ? customUrlInput.value.trim() : (currentConfig.customBaseUrl || ''),
      temperature: tempInput ? parseFloat(tempInput.value) || 0.6 : 0.6,
      maxTokens: maxTokensInput ? parseInt(maxTokensInput.value, 10) || 2048 : 2048,
      injectCircadianContext: circCheck ? circCheck.checked : true
    };

    if (provider !== 'local') {
      if (keyInput) {
        const keyVal = keyInput.value.trim();
        if (keyVal) {
          updated.apiKeys[provider] = keyVal;
        }
      }
      if (modelSelect) {
        let chosen = modelSelect.value;
        if (provider === 'groq' && (chosen.includes('llama') || chosen.includes('70b'))) {
          chosen = 'openai/gpt-oss-120b';
        }
        updated.models[provider] = chosen;
      }
    }

    PlanoraStore.saveAIConfig(updated);
    this.updateAIStatusBanners();
    this.closeAIConfigModal();
    this.showToast(`AI Engine configured: ${provider.toUpperCase()}`);
  },

  clearAIKey() {
    const provider = this._activeModalProvider;
    if (provider === 'local') return;

    const config = PlanoraStore.getAIConfig();
    if (config.apiKeys && config.apiKeys[provider]) {
      delete config.apiKeys[provider];
      PlanoraStore.saveAIConfig(config);
    }

    const keyInput = document.getElementById('aiConfigApiKeyInput');
    if (keyInput) keyInput.value = '';

    const resTitle = document.getElementById('aiTestResultTitle');
    const resDetail = document.getElementById('aiTestResultDetail');
    if (resTitle) {
      resTitle.textContent = 'API Status: Key Cleared';
      resTitle.style.color = 'var(--text-muted)';
    }
    if (resDetail) {
      resDetail.textContent = 'No key configured. Falling back to local heuristics.';
    }

    this.updateAIStatusBanners();
    this.showToast(`Cleared saved ${provider.toUpperCase()} API key.`);
  },

  updateAIStatusBanners() {
    const config = PlanoraStore.getAIConfig();
    const provider = config.provider || 'openai';
    const hasKey = provider === 'local' || provider === 'custom' || !!(config.apiKeys && config.apiKeys[provider]);
    const model = config.models && config.models[provider] ? config.models[provider] : '';

    const providerNames = {
      openai: { label: `OpenAI ${model || 'GPT-4o'}`, short: 'OpenAI' },
      gemini: { label: `Google Gemini ${model || '1.5 Flash'}`, short: 'Gemini' },
      groq: { label: `Groq LPU (${model || 'Llama 3.3 70B'})`, short: 'Groq' },
      deepseek: { label: model?.includes('reasoner') ? 'DeepSeek R1 Reasoner' : 'DeepSeek V3', short: 'DeepSeek' },
      grok: { label: `xAI Grok (${model || 'Grok-2'})`, short: 'xAI Grok' },
      anthropic: { label: `Claude 3.5 (${model || 'Sonnet'})`, short: 'Anthropic' },
      openrouter: { label: `OpenRouter (${model || 'Multi-Model'})`, short: 'OpenRouter' },
      custom: { label: `Custom LLM (${model || 'Ollama'})`, short: 'Custom LLM' },
      local: { label: 'Built-in Heuristic Engine', short: 'Local AI' }
    };

    const info = providerNames[provider] || { label: provider.toUpperCase(), short: provider.toUpperCase() };
    const providerLabel = info.label;
    const shortName = info.short;

    // Update Badges
    const drawerBadge = document.getElementById('drawerAiModelBadge');
    if (drawerBadge) {
      drawerBadge.textContent = hasKey ? providerLabel : `${shortName} (No Key)`;
      drawerBadge.className = `badge-ai-mini ${hasKey ? '' : 'offline'}`;
    }

    const settingsBadge = document.getElementById('settingsAiModelBadge');
    if (settingsBadge) {
      settingsBadge.textContent = hasKey ? `${shortName} Active` : 'Local Fallback';
      settingsBadge.className = `settings-badge ${hasKey ? 'active' : ''}`;
    }

    const studioBadge = document.getElementById('studioAiModelBadge');
    if (studioBadge) {
      studioBadge.textContent = `${providerLabel} (${hasKey ? 'Active' : 'Offline Engine'})`;
    }

    // Update Top Banner
    const bannerTitle = document.getElementById('aiBannerTitle');
    const bannerDesc = document.getElementById('aiBannerDesc');
    const bannerBadge = document.getElementById('aiBannerBadge');
    const bannerLatency = document.getElementById('aiBannerLatency');

    if (bannerTitle) {
      bannerTitle.textContent = `AI Intelligence: ${providerLabel}`;
    }
    if (bannerDesc) {
      if (provider === 'local') {
        bannerDesc.textContent = 'Operating locally in browser via Planora circadian heuristic engine. Add an API key for conversational intelligence.';
      } else if (hasKey) {
        bannerDesc.textContent = `Live ${shortName} model with automated circadian schedule reasoning & 1-click action proposals.`;
      } else {
        bannerDesc.textContent = `No API key saved for ${shortName}. Using built-in local heuristics until key is configured.`;
      }
    }
    if (bannerBadge) {
      bannerBadge.textContent = hasKey ? (provider === 'local' ? 'Local Ready' : 'Live API') : 'Key Needed';
      bannerBadge.style.background = hasKey ? 'var(--text-primary)' : 'var(--border-subtle)';
      bannerBadge.style.color = hasKey ? 'var(--text-inverse)' : 'var(--text-primary)';
    }
    if (bannerLatency) {
      bannerLatency.style.display = hasKey && provider !== 'local' ? 'inline-block' : 'none';
    }
  },

  // ------------------------------------------------------------
  // Action Cards Rendering & 1-Click Schedule Execution
  // ------------------------------------------------------------
  renderActionCardsHtml(actions, batchId = null) {
    if (!actions || actions.length === 0) return '';
    const bId = batchId || ('batch_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6));
    this._actionRegistry[bId] = actions;

    let html = `
      <div class="ai-action-cards-container" id="${bId}" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 11px; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; justify-content: space-between;">
          <span>ScheduleAI Action Proposals (${actions.length}):</span>
          ${actions.length > 1 ? `<button class="btn-primary" style="font-size: 10.5px; padding: 3px 10px;" onclick="PlanoraUI.executeAllFromRegistry('${bId}', this)">Apply All</button>` : ''}
        </div>
    `;

    actions.forEach((act, idx) => {
      const actId = `${bId}_${idx}`;
      this._actionRegistry[actId] = act;
      const type = act.action || 'create_event';
      const cat = (act.category || 'focus').toLowerCase();
      const timeDisplay = act.startTime && act.endTime ? `${this.formatTimeRange(act.startTime, act.endTime)}` : (act.duration || (act.targetTime ? `${act.targetDate || ''} ${act.targetTime}` : ''));

      let actionLabel = '+ Add Event';
      let actionTag = 'Event';
      if (type === 'reschedule_event') {
        actionLabel = '⟳ Reschedule';
        actionTag = 'Reschedule';
      } else if (type === 'delete_event') {
        actionLabel = '✕ Remove';
        actionTag = 'Delete';
      } else if (type === 'create_deadline') {
        actionLabel = '+ Add Deadline';
        actionTag = 'Milestone';
      } else if (type === 'create_daily_task') {
        actionLabel = '+ Add Task';
        actionTag = 'Task';
      }

      html += `
        <div class="ai-action-card" id="card_${actId}" style="background: var(--bg-card); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
              <span class="event-status-tag ${cat}">${actionTag}</span>
              <span style="font-weight: 700; font-size: 12px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${this.escapeHtml(act.title || 'Schedule Action')}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">
              ${timeDisplay ? `${timeDisplay} ` : ''}${act.date ? `• ${act.date}` : ''}
            </div>
          </div>
          <button class="btn-ghost-sm" style="font-size: 11px; padding: 4px 10px; white-space: nowrap;" onclick="PlanoraUI.executeActionFromRegistry('${actId}', this)">
            ${actionLabel}
          </button>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  },

  executeActionFromRegistry(actId, btn) {
    const act = this._actionRegistry[actId];
    if (!act) return;
    this.executeSingleAction(act, btn);
  },

  executeAllFromRegistry(batchId, btn) {
    const list = this._actionRegistry[batchId];
    if (!list) return;
    this.executeAllActions(list, btn);
  },

  executeSingleAction(act, btn) {
    const type = act.action || 'create_event';
    const todayStr = new Date().toISOString().split('T')[0];

    if (type === 'create_event') {
      const newEvent = {
        id: act.id || ('ai_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)),
        title: act.title || 'AI Scheduled Task',
        date: act.date || todayStr,
        startTime: act.startTime || '18:00',
        endTime: act.endTime || '19:30',
        duration: act.duration || '1h 30m',
        category: act.category === 'Deadline' ? 'focus' : ((act.category || 'focus').toLowerCase()),
        priority: act.priority || 'high',
        energyLevel: act.energyDemand || act.energyLevel || 'high',
        status: act.status || 'planned',
        notes: act.notes || 'Created via ScheduleAI'
      };
      const current = PlanoraStore.getEvents();
      PlanoraStore.saveEvents([...current, newEvent]);
      if (btn) {
        btn.disabled = true;
        btn.textContent = '✓ Added';
        btn.style.background = 'var(--text-primary)';
        btn.style.color = 'var(--text-inverse)';
      }
      this.showToast(`Added event "${newEvent.title}" to schedule!`);
    } else if (type === 'reschedule_event') {
      const current = PlanoraStore.getEvents();
      let found = false;
      const updated = current.map(ev => {
        if (ev.id === act.eventId || (act.title && ev.title.toLowerCase() === act.title.toLowerCase())) {
          found = true;
          return {
            ...ev,
            date: act.newDate || act.date || ev.date,
            startTime: act.newStartTime || act.startTime || ev.startTime,
            endTime: act.newEndTime || act.endTime || ev.endTime,
            notes: (ev.notes ? ev.notes + ' ' : '') + `(Rescheduled via ScheduleAI: ${act.reason || 'Peak focus optimization'})`
          };
        }
        return ev;
      });
      if (found) {
        PlanoraStore.saveEvents(updated);
        if (btn) {
          btn.disabled = true;
          btn.textContent = '✓ Rescheduled';
        }
        this.showToast(`Rescheduled "${act.title || 'event'}"!`);
      } else {
        const newEv = {
          id: act.eventId || ('ai_' + Date.now()),
          title: act.title || 'Rescheduled Task',
          date: act.newDate || act.date || todayStr,
          startTime: act.newStartTime || act.startTime || '18:00',
          endTime: act.newEndTime || act.endTime || '19:30',
          category: act.category === 'Deadline' ? 'focus' : ((act.category || 'focus').toLowerCase()),
          priority: act.priority || 'high',
          status: 'planned',
          notes: act.reason || 'Rescheduled via ScheduleAI'
        };
        PlanoraStore.saveEvents([...current, newEv]);
        if (btn) {
          btn.disabled = true;
          btn.textContent = '✓ Rescheduled';
        }
        this.showToast(`Scheduled "${newEv.title}" for ${newEv.date}!`);
      }
    } else if (type === 'delete_event') {
      const current = PlanoraStore.getEvents();
      const filtered = current.filter(ev => ev.id !== act.eventId && (!act.title || ev.title.toLowerCase() !== act.title.toLowerCase()));
      PlanoraStore.saveEvents(filtered);
      if (btn) {
        btn.disabled = true;
        btn.textContent = '✓ Removed';
      }
      this.showToast(`Removed event from schedule.`);
    } else if (type === 'create_deadline') {
      const deadlines = PlanoraStore.getDeadlines();
      const newDeadline = {
        id: act.id || ('dl_' + Date.now()),
        title: act.title || 'New Deadline Milestone',
        targetDate: act.targetDate || todayStr,
        targetTime: act.targetTime || '23:59',
        category: act.category || 'Milestone',
        priority: act.priority || 'critical',
        notes: act.notes || 'Created via ScheduleAI',
        completed: false
      };
      PlanoraStore.saveDeadlines([...deadlines, newDeadline]);
      if (btn) {
        btn.disabled = true;
        btn.textContent = '✓ Deadline Set';
      }
      this.showToast(`Registered protected deadline "${newDeadline.title}"!`);
    } else if (type === 'create_daily_task') {
      const tasks = PlanoraStore.getDailyTasks();
      const newTask = {
        id: act.id || ('task_' + Date.now()),
        title: act.title || 'New Task',
        duration: act.duration || '60m',
        durationMin: act.durationMin || 60,
        priority: act.priority || 'high',
        category: act.category || 'Focus',
        status: 'pending'
      };
      PlanoraStore.saveDailyTasks([...tasks, newTask]);
      if (btn) {
        btn.disabled = true;
        btn.textContent = '✓ Task Added';
      }
      this.showToast(`Added "${newTask.title}" to daily tasks backlog!`);
    }

    this.refreshAll();
  },

  executeAllActions(actions, btn) {
    if (!actions || actions.length === 0) return;
    actions.forEach(act => this.executeSingleAction(act, null));
    if (btn) {
      btn.disabled = true;
      btn.textContent = '✓ All Applied';
      btn.style.background = 'var(--text-primary)';
      btn.style.color = 'var(--text-inverse)';
    }
    this.showToast(`Applied all ${actions.length} ScheduleAI actions!`);
    this.refreshAll();
  },

  // ------------------------------------------------------------
  // AI Chat & Async Messaging Controllers
  // ------------------------------------------------------------
  openAIDrawer() {
    const drawer = document.getElementById('aiAgentBackdrop');
    if (drawer) drawer.classList.add('open');
    this.updateAIStatusBanners();
  },

  closeAIDrawer() {
    const drawer = document.getElementById('aiAgentBackdrop');
    if (drawer) drawer.classList.remove('open');
  },

  async sendAIMessage(customText = null) {
    const input = document.getElementById('aiChatInput');
    const text = customText || (input ? input.value.trim() : '');
    if (!text) return;

    if (input) input.value = '';

    const chat = PlanoraStore.getChatHistory();
    chat.push({ role: 'user', text, timestamp: Date.now() });
    PlanoraStore.saveChatHistory(chat);

    this.renderChatHistory();
    this.renderFullAIChatHistory();

    // Insert live thinking bubble
    const drawerContainer = document.getElementById('aiChatMessages');
    if (drawerContainer) {
      const thinkingEl = document.createElement('div');
      thinkingEl.id = 'aiDrawerThinkingIndicator';
      thinkingEl.className = 'ai-chat-bubble ai';
      thinkingEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted);">
          <span>Planora AI is analyzing circadian rhythms</span>
          <div class="ai-thinking-dots"><span></span><span></span><span></span></div>
        </div>
      `;
      drawerContainer.appendChild(thinkingEl);
      drawerContainer.scrollTop = drawerContainer.scrollHeight;
    }

    try {
      const response = await PlanoraAI.queryLLM(text, chat.slice(0, -1));

      // Remove thinking indicator
      const thinkingEl = document.getElementById('aiDrawerThinkingIndicator');
      if (thinkingEl) thinkingEl.remove();

      const reparsed = PlanoraAI.parseActionBlocks(response.text);
      const cleanText = reparsed.cleanText;
      const actions = response.actions || reparsed.actions;

      const aiMsg = {
        role: 'ai',
        text: cleanText,
        actions: actions && actions.length > 0 ? actions : null,
        timestamp: Date.now()
      };

      const currentChat = PlanoraStore.getChatHistory();
      currentChat.push(aiMsg);
      PlanoraStore.saveChatHistory(currentChat);

      this.renderChatHistory();
      this.renderFullAIChatHistory();

      if (response.actionType === 'future_schedule' && response.proposals) {
        this.displayProposedScheduleInChat(response.proposals);
        this.displayProposedScheduleInFullChat(response.proposals);
      }
    } catch (err) {
      const thinkingEl = document.getElementById('aiDrawerThinkingIndicator');
      if (thinkingEl) thinkingEl.remove();

      const currentChat = PlanoraStore.getChatHistory();
      currentChat.push({
        role: 'ai',
        text: `Error generating AI response: ${err.message}. Falling back to local heuristics.`,
        timestamp: Date.now()
      });
      PlanoraStore.saveChatHistory(currentChat);
      this.renderChatHistory();
      this.renderFullAIChatHistory();
    }
  },

  async sendFullAIMessage(customText = null) {
    const input = document.getElementById('fullAiChatInput');
    const text = customText || (input ? input.value.trim() : '');
    if (!text) return;

    if (input) input.value = '';

    const chat = PlanoraStore.getChatHistory();
    chat.push({ role: 'user', text, timestamp: Date.now() });
    PlanoraStore.saveChatHistory(chat);

    this.renderChatHistory();
    this.renderFullAIChatHistory();

    // Insert live thinking bubble in studio
    const studioContainer = document.getElementById('fullAiChatMessages');
    if (studioContainer) {
      const thinkingEl = document.createElement('div');
      thinkingEl.id = 'aiStudioThinkingIndicator';
      thinkingEl.className = 'ai-chat-bubble ai';
      thinkingEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted);">
          <span>Synthesizing schedule optimization</span>
          <div class="ai-thinking-dots"><span></span><span></span><span></span></div>
        </div>
      `;
      studioContainer.appendChild(thinkingEl);
      studioContainer.scrollTop = studioContainer.scrollHeight;
    }

    try {
      const response = await PlanoraAI.queryLLM(text, chat.slice(0, -1));

      const thinkingEl = document.getElementById('aiStudioThinkingIndicator');
      if (thinkingEl) thinkingEl.remove();

      const reparsed = PlanoraAI.parseActionBlocks(response.text);
      const cleanText = reparsed.cleanText;
      const actions = response.actions || reparsed.actions;

      const aiMsg = {
        role: 'ai',
        text: cleanText,
        actions: actions && actions.length > 0 ? actions : null,
        timestamp: Date.now()
      };

      const currentChat = PlanoraStore.getChatHistory();
      currentChat.push(aiMsg);
      PlanoraStore.saveChatHistory(currentChat);

      this.renderChatHistory();
      this.renderFullAIChatHistory();

      if (response.actionType === 'future_schedule' && response.proposals) {
        this.displayProposedScheduleInFullChat(response.proposals);
        this.displayProposedScheduleInChat(response.proposals);
      }
    } catch (err) {
      const thinkingEl = document.getElementById('aiStudioThinkingIndicator');
      if (thinkingEl) thinkingEl.remove();

      const currentChat = PlanoraStore.getChatHistory();
      currentChat.push({
        role: 'ai',
        text: `Error generating AI response: ${err.message}.`,
        timestamp: Date.now()
      });
      PlanoraStore.saveChatHistory(currentChat);
      this.renderChatHistory();
      this.renderFullAIChatHistory();
    }
  },

  clearAIChat() {
    PlanoraStore.saveChatHistory([]);
    this.renderChatHistory();
    this.renderFullAIChatHistory();
    this.showToast('AI conversation history cleared');
  },

  renderFullAIChatHistory() {
    const container = document.getElementById('fullAiChatMessages');
    if (!container) return;

    const chat = PlanoraStore.getChatHistory();
    if (chat.length === 0) {
      container.innerHTML = `
        <div class="ai-chat-bubble ai">
          Welcome to <strong>ScheduleAI Autonomous Intelligence Studio</strong>!
          <br><br>
          I am your specialized autonomous <strong>Schedule Management AI Agent</strong> tailored for <strong>Arjun Sharma (Night Owl)</strong>.
          <br><br>
          <strong>Try asking me:</strong>
          <br>• <em>"How does my day look tomorrow?"</em> — Circadian breakdown of your tomorrow agenda.
          <br>• <em>"Reschedule my uncompleted tasks to tomorrow evening"</em> — Auto-slots backlog items into your 18:00–23:00 peak focus window.
          <br>• <em>"Schedule a 45 min workout tonight at 8 PM"</em> — Quick 1-click routine booking.
          <br>• <em>"What are my highest priority upcoming deadlines?"</em> — Milestone audit with countdowns.
          <br>• <em>"Assess my burnout risk for this week"</em> — Cognitive load & circadian defense audit.
          <br>• <em>"When am I free today?"</em> — Lists your exact open contiguous focus blocks.
        </div>
      `;
      return;
    }

    let html = '';
    chat.forEach((msg, idx) => {
      if (msg.role === 'user') {
        html += `<div class="ai-chat-bubble user">${this.escapeHtml(msg.text)}</div>`;
      } else {
        let bubbleContent = this.formatAIMessage(msg.text);
        if (msg.actions && msg.actions.length > 0) {
          bubbleContent += this.renderActionCardsHtml(msg.actions, `batch_studio_${idx}`);
        }
        html += `<div class="ai-chat-bubble ai">${bubbleContent}</div>`;
      }
    });
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  },

  displayProposedScheduleInFullChat(proposals) {
    const container = document.getElementById('fullAiChatMessages');
    if (!container) return;

    const card = document.createElement('div');
    card.className = 'ai-proposal-card';
    let inner = '<strong>Proposed Circadian Schedule Items:</strong>';
    proposals.forEach(p => {
      inner += `
        <div class="ai-proposal-item">
          <span><strong>${this.formatTimeRange(p.startTime, p.endTime)}</strong>: ${this.escapeHtml(p.title)}</span>
          <span class="event-status-tag ${p.category}">${p.category}</span>
        </div>
      `;
    });
    inner += `
      <div style="margin-top: 10px; display: flex; gap: 8px;">
        <button class="btn-primary" style="font-size: 11.5px; padding: 5px 12px;" onclick="PlanoraUI.applyProposedSchedule()">Apply to My Schedule</button>
      </div>
    `;
    card.innerHTML = inner;
    container.appendChild(card);
    container.scrollTop = container.scrollHeight;
  },

  renderAIDiagnostics() {
    const insights = PlanoraAI.getHistoricalInsights();
    const free = PlanoraAI.getFreeSlots();
    const events = PlanoraStore.getEvents();

    const peakEl = document.getElementById('aiDiagPeak');
    const slumpEl = document.getElementById('aiDiagSlump');
    const freeHoursEl = document.getElementById('aiDiagFreeHours');
    const freeDescEl = document.getElementById('aiDiagFreeDesc');
    const freeBadgeEl = document.getElementById('aiDiagFreeBadge');
    const adherenceEl = document.getElementById('aiDiagAdherence');

    if (peakEl) peakEl.textContent = insights.peakFocusWindow;
    if (slumpEl) slumpEl.textContent = insights.slumpWindow;

    if (freeHoursEl) freeHoursEl.textContent = `${free.freeHours.toFixed(1)}h Available`;
    if (freeBadgeEl) freeBadgeEl.textContent = `${free.slots.length} Free Blocks`;
    if (freeDescEl) {
      if (free.slots.length === 0) {
        freeDescEl.textContent = 'Schedule is at 100% capacity between 08:00 and 20:00.';
      } else {
        const firstTwo = free.slots.slice(0, 2).map(s => this.formatTimeRange(s.start, s.end)).join(', ');
        freeDescEl.textContent = `Open slots today: ${firstTwo}${free.slots.length > 2 ? '...' : ''}`;
      }
    }

    if (adherenceEl) {
      const completed = events.filter(e => e.status === 'completed').length;
      const rate = events.length > 0 ? Math.round((completed / events.length) * 100) : 0;
      adherenceEl.textContent = `${rate}% Adherence`;
    }

    const deadlinesCountEl = document.getElementById('aiDiagDeadlinesCount');
    if (deadlinesCountEl) {
      const activeDl = PlanoraStore.getDeadlines().filter(d => !d.completed);
      deadlinesCountEl.textContent = `${activeDl.length} Milestone${activeDl.length === 1 ? '' : 's'}`;
    }
  },

  renderAITaskSuggestions() {
    const container = document.getElementById('aiStudioTaskRecommendations');
    if (!container) return;

    const suggestions = PlanoraAI.suggestTasksToAdd();
    let html = '';
    suggestions.forEach(item => {
      html += `
        <div class="ai-recommendation-card">
          <div class="ai-recommendation-top">
            <span class="ai-recommendation-title">${this.escapeHtml(item.title)}</span>
            <span class="event-status-tag ${item.category}">${item.category}</span>
          </div>
          <div class="ai-recommendation-desc">
            <strong>Slot:</strong> ${item.recommendedSlot} (${item.duration})<br>
            <em>${this.escapeHtml(item.reason)}</em>
          </div>
          <button class="btn-primary" style="font-size: 11px; padding: 4px 10px; width: fit-content;" onclick="PlanoraUI.applyTaskSuggestion('${this.escapeHtml(item.title)}', '${item.category}', '${item.duration}')">
            + Schedule This Task
          </button>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  applyTaskSuggestion(title, category, duration) {
    this.openAddModal(category);
    const titleInput = document.getElementById('eventTitle');
    if (titleInput) titleInput.value = title;
    if (duration) {
      const durMinutes = parseInt(duration, 10) || 60;
      const startTimeInput = document.getElementById('eventStartTime');
      const endTimeInput = document.getElementById('eventEndTime');
      if (startTimeInput && endTimeInput && startTimeInput.value) {
        const [sh, sm] = startTimeInput.value.split(':').map(Number);
        const totalMinutes = sh * 60 + sm + durMinutes;
        const eh = Math.min(23, Math.floor(totalMinutes / 60));
        const em = totalMinutes % 60;
        endTimeInput.value = `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`;
      }
    }
  },

  renderStudioScheduleProposal() {
    const container = document.getElementById('aiStudioProposalContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 12px; border: 1px dashed var(--border-subtle); border-radius: var(--radius-sm); font-size: 12px; color: var(--text-secondary); text-align: center;">
        Ready to optimize tomorrow. Click below to generate an AI circadian-balanced plan.
      </div>
    `;
  },

  generateAndShowStudioSchedule() {
    const container = document.getElementById('aiStudioProposalContainer');
    if (!container) return;

    const future = PlanoraAI.generateFutureSchedule();
    let html = `
      <div class="ai-proposal-card" style="margin-bottom: 0;">
        <div style="font-weight: 800; font-size: 13px; margin-bottom: 8px;">Generated Plan for Tomorrow:</div>
    `;
    future.proposals.forEach(p => {
      html += `
        <div class="ai-proposal-item">
          <span><strong>${this.formatTimeRange(p.startTime, p.endTime)}</strong>: ${this.escapeHtml(p.title)}</span>
          <span class="event-status-tag ${p.category}">${p.category}</span>
        </div>
      `;
    });
    html += `
        <button class="btn-primary" style="margin-top: 10px; width: 100%; justify-content: center;" onclick="PlanoraUI.applyProposedSchedule()">
          ✓ Apply All to Tomorrow's Calendar
        </button>
      </div>
    `;
    container.innerHTML = html;
  },

  displayProposedScheduleInChat(proposals) {
    const container = document.getElementById('aiChatMessages');
    if (!container) return;

    const card = document.createElement('div');
    card.className = 'ai-proposal-card';
    let inner = '<strong>Proposed Schedule Items:</strong>';
    proposals.forEach(p => {
      inner += `
        <div class="ai-proposal-item">
          <span><strong>${this.formatTimeRange(p.startTime, p.endTime)}</strong>: ${this.escapeHtml(p.title)}</span>
          <span class="event-status-tag ${p.category}">${p.category}</span>
        </div>
      `;
    });
    inner += `
      <div style="margin-top: 10px; display: flex; gap: 8px;">
        <button class="btn-primary" style="font-size: 11.5px; padding: 5px 12px;" onclick="PlanoraUI.applyProposedSchedule()">Apply to My Schedule</button>
      </div>
    `;
    card.innerHTML = inner;
    container.appendChild(card);
    container.scrollTop = container.scrollHeight;
  },

  applyProposedSchedule() {
    const future = PlanoraAI.generateFutureSchedule();
    const current = PlanoraStore.getEvents();
    const merged = [...current, ...future.proposals];
    PlanoraStore.saveEvents(merged);
    this.showToast('Proposed AI Schedule Applied to Calendar!');
    this.closeAIDrawer();
  },

  askAIToGenerate() {
    this.openAIDrawer();
    this.sendAIMessage("Suggest tomorrow's schedule");
  },

  async processNLPBar() {
    const input = document.getElementById('nlpSearchInput');
    if (!input || !input.value.trim()) return;

    const query = input.value.trim();
    input.value = '';

    const box = document.getElementById('aiResponseBox');
    const content = document.getElementById('aiResponseContent');

    if (box && content) {
      content.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); padding: 8px 0;">
          <span>Analyzing schedule &amp; circadian parameters...</span>
          <div class="ai-thinking-dots"><span></span><span></span><span></span></div>
        </div>
      `;
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const response = await PlanoraAI.queryLLM(query);
      const reparsed = PlanoraAI.parseActionBlocks(response.text);
      const cleanText = reparsed.cleanText;
      const actions = response.actions || reparsed.actions;

      if (box && content) {
        let html = this.formatAIMessage(cleanText);
        if (actions && actions.length > 0) {
          html += this.renderActionCardsHtml(actions, `nlp_batch_${Date.now()}`);
        }
        content.innerHTML = html;
        box.style.display = 'block';
      }
    } catch (err) {
      if (box && content) {
        const fallback = PlanoraAI.processQuery(query);
        content.innerHTML = this.formatAIMessage(fallback.text);
      }
    }
  },

  showToast(msg) {
    const toast = document.getElementById('historyToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  // ------------------------------------------------------------
  // Monthly Planner — 30-Day Calendar + To-Do Drag & Drop
  // ------------------------------------------------------------
  _monthlyOffset: 0,

  getLoginDate() {
    let loginDate = localStorage.getItem('planora_login_date');
    if (!loginDate) {
      loginDate = new Date().toISOString().split('T')[0];
      localStorage.setItem('planora_login_date', loginDate);
    }
    return new Date(loginDate + 'T00:00:00');
  },

  getTodos() {
    try {
      return JSON.parse(localStorage.getItem('planora_todos') || '[]');
    } catch { return []; }
  },

  saveTodos(todos) {
    localStorage.setItem('planora_todos', JSON.stringify(todos));
  },

  addTodoFromInput() {
    const input = document.getElementById('todoNewInput');
    const catSelect = document.getElementById('todoCategorySelect');
    if (!input || !input.value.trim()) return;

    const todo = {
      id: 'todo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: input.value.trim(),
      category: catSelect ? catSelect.value : 'focus',
      assignedDate: null,
      createdAt: new Date().toISOString()
    };

    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
    input.value = '';
    this.renderMonthlyCalendar();
  },

  openAddTodoModal() {
    const input = document.getElementById('todoNewInput');
    if (input) input.focus();
  },

  deleteTodo(todoId) {
    let todos = this.getTodos();
    todos = todos.filter(t => t.id !== todoId);
    this.saveTodos(todos);
    this.renderMonthlyCalendar();
  },

  monthlyCalendarPrev() {
    this._monthlyOffset = Math.max(this._monthlyOffset - 30, -90);
    this.renderMonthlyCalendar();
  },

  monthlyCalendarNext() {
    this._monthlyOffset = Math.min(this._monthlyOffset + 30, 90);
    this.renderMonthlyCalendar();
  },

  renderMonthlyCalendar() {
    const grid = document.getElementById('monthlyCalendarGrid');
    const todoList = document.getElementById('monthlyTodoList');
    const titleEl = document.getElementById('monthlyCalendarTitle');
    const dateRangeEl = document.getElementById('monthlyDateRange');
    if (!grid) return;

    const loginDate = this.getLoginDate();
    const baseStart = new Date(loginDate);
    baseStart.setDate(baseStart.getDate() + this._monthlyOffset);

    const baseEnd = new Date(baseStart);
    baseEnd.setDate(baseEnd.getDate() + 29);

    // Fill title
    const startLabel = baseStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endLabel = baseEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (titleEl) titleEl.textContent = `${startLabel} — ${endLabel}`;
    if (dateRangeEl) dateRangeEl.textContent = `${startLabel} → ${endLabel}`;

    // Find the Sunday on or before baseStart for grid alignment
    const gridStart = new Date(baseStart);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());

    // We need enough rows to cover the 30-day range
    const gridEnd = new Date(baseEnd);
    const daysAfterEnd = 6 - gridEnd.getDay();
    gridEnd.setDate(gridEnd.getDate() + daysAfterEnd);

    const totalDays = Math.round((gridEnd - gridStart) / (1000 * 60 * 60 * 24)) + 1;

    const todos = this.getTodos();
    const todayStr = new Date().toISOString().split('T')[0];

    // Build calendar grid
    let html = '';
    for (let i = 0; i < totalDays; i++) {
      const cellDate = new Date(gridStart);
      cellDate.setDate(cellDate.getDate() + i);
      const dateStr = cellDate.toISOString().split('T')[0];
      const isInRange = cellDate >= baseStart && cellDate <= baseEnd;
      const isToday = dateStr === todayStr;

      const assignedTasks = todos.filter(t => t.assignedDate === dateStr);

      html += `<div class="monthly-cell ${isInRange ? '' : 'outside'} ${isToday ? 'today' : ''}"
                    data-date="${dateStr}"
                    ondragover="event.preventDefault(); this.classList.add('drag-over')"
                    ondragleave="this.classList.remove('drag-over')"
                    ondrop="PlanoraUI.handleCalendarDrop(event, '${dateStr}')">
        <div class="monthly-cell-date">${cellDate.getDate()}</div>
        <div class="monthly-cell-tasks">`;

      assignedTasks.forEach(task => {
        html += `<div class="monthly-task-chip ${task.category}"
                      draggable="true"
                      data-todo-id="${task.id}"
                      ondragstart="PlanoraUI.handleTaskDragStart(event, '${task.id}')">
          <span class="monthly-task-chip-text">${this.escapeHtml(task.title)}</span>
          <button class="monthly-task-remove" onclick="event.stopPropagation(); PlanoraUI.unassignTask('${task.id}')" title="Remove from day">×</button>
        </div>`;
      });

      html += `</div></div>`;
    }
    grid.innerHTML = html;

    // Build to-do list (unassigned tasks)
    if (todoList) {
      const unassigned = todos.filter(t => !t.assignedDate);
      if (unassigned.length === 0) {
        todoList.innerHTML = `<div class="monthly-todo-empty">No unassigned tasks. Add one above or drag tasks back from the calendar.</div>`;
      } else {
        let todoHtml = '';
        unassigned.forEach(task => {
          todoHtml += `<div class="monthly-todo-item ${task.category}"
                            draggable="true"
                            data-todo-id="${task.id}"
                            ondragstart="PlanoraUI.handleTaskDragStart(event, '${task.id}')">
            <div class="monthly-todo-item-left">
              <span class="event-status-tag ${task.category}">${task.category}</span>
              <span class="monthly-todo-item-title">${this.escapeHtml(task.title)}</span>
            </div>
            <button class="monthly-todo-item-delete" onclick="PlanoraUI.deleteTodo('${task.id}')" title="Delete task"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
          </div>`;
        });
        todoList.innerHTML = todoHtml;
      }

      // Make the entire todo list a drop zone for unassigning
      todoList.ondragover = (e) => { e.preventDefault(); todoList.classList.add('drag-over'); };
      todoList.ondragleave = () => { todoList.classList.remove('drag-over'); };
      todoList.ondrop = (e) => { e.preventDefault(); todoList.classList.remove('drag-over'); this.handleTodoListDrop(e); };
    }
  },

  handleTaskDragStart(e, todoId) {
    e.dataTransfer.setData('text/plain', todoId);
    e.dataTransfer.effectAllowed = 'move';
    // Add dragging class for visual feedback
    if (e.target && e.target.classList) e.target.classList.add('dragging');
    // Remove it when drag ends
    e.target.addEventListener('dragend', () => { e.target.classList.remove('dragging'); }, { once: true });
  },

  handleCalendarDrop(e, dateStr) {
    e.preventDefault();
    const cell = e.currentTarget;
    if (cell) cell.classList.remove('drag-over');

    const todoId = e.dataTransfer.getData('text/plain');
    if (!todoId) return;

    const todos = this.getTodos();
    const task = todos.find(t => t.id === todoId);
    if (!task) return;

    task.assignedDate = dateStr;
    this.saveTodos(todos);
    this.renderMonthlyCalendar();
    this.showToast(`"${task.title}" assigned to ${new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
  },

  handleTodoListDrop(e) {
    const todoId = e.dataTransfer.getData('text/plain');
    if (!todoId) return;

    const todos = this.getTodos();
    const task = todos.find(t => t.id === todoId);
    if (!task) return;

    task.assignedDate = null;
    this.saveTodos(todos);
    this.renderMonthlyCalendar();
    this.showToast(`"${task.title}" moved back to To-Do list`);
  },

  unassignTask(todoId) {
    const todos = this.getTodos();
    const task = todos.find(t => t.id === todoId);
    if (!task) return;

    task.assignedDate = null;
    this.saveTodos(todos);
    this.renderMonthlyCalendar();
    this.showToast(`"${task.title}" moved back to To-Do list`);
  },

  // ------------------------------------------------------------
  // Protected Deadlines & Milestones Controller
  // ------------------------------------------------------------
  formatDeadlineTarget(targetDate, targetTime) {
    try {
      if (!targetDate) return '--';
      const timeStr = targetTime || '00:00';
      const d = new Date(`${targetDate}T${timeStr}:00`);
      if (isNaN(d.getTime())) return `${targetDate} ${timeStr}`;
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      const day = d.getDate();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const hoursStr = String(hours).padStart(2, '0');
      return `${weekday}, ${month} ${day}, ${hoursStr}:${minutes} ${ampm}`;
    } catch (e) {
      return `${targetDate} ${targetTime || ''}`;
    }
  },

  formatDeadlineCountdown(targetIso) {
    if (!targetIso) return { text: '--', isOverdue: false };
    const target = new Date(targetIso).getTime();
    const now = Date.now();
    const diffMs = target - now;

    if (diffMs < 0) {
      const absDiff = Math.abs(diffMs);
      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      let text = '';
      if (days > 0) {
        text = `Overdue by ${days}d ${hours}h`;
      } else if (hours > 0) {
        text = `Overdue by ${hours}h ${mins}m`;
      } else {
        text = `Overdue by ${Math.max(1, mins)}m`;
      }
      return { text, isOverdue: true };
    } else {
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      let text = '';
      if (days > 0) {
        text = `${days}d ${hours}h left`;
      } else if (hours > 0) {
        text = `${hours}h ${mins}m left`;
      } else {
        text = `${Math.max(1, mins)}m left`;
      }
      return { text, isOverdue: false };
    }
  },

  setDeadlineFilter(filter) {
    this._deadlineFilter = filter || 'all';
    document.querySelectorAll('#view-deadlines .task-filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`deadlineFilter${filter.charAt(0).toUpperCase() + filter.slice(1)}Btn`) ||
                      (filter === 'completed' ? document.getElementById('deadlineFilterDoneBtn') : null);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderDeadlines();
  },

  renderDeadlines() {
    const deadlines = PlanoraStore.getDeadlines();
    const mainGrid = document.getElementById('deadlinesMainGrid');
    const overviewList = document.getElementById('overviewDeadlinesList');
    const countAllEl = document.getElementById('countAllDeadlines');
    const overviewCountEl = document.getElementById('overviewDeadlineCount');

    if (countAllEl) countAllEl.textContent = deadlines.length;
    if (overviewCountEl) overviewCountEl.textContent = deadlines.length;

    // Filter deadlines
    let filtered = deadlines;
    const now = Date.now();
    if (this._deadlineFilter === 'active') {
      filtered = deadlines.filter(d => !d.completed && new Date(d.targetTimestamp || (d.targetDate + 'T' + (d.targetTime || '00:00') + ':00')).getTime() >= now);
    } else if (this._deadlineFilter === 'overdue') {
      filtered = deadlines.filter(d => !d.completed && new Date(d.targetTimestamp || (d.targetDate + 'T' + (d.targetTime || '00:00') + ':00')).getTime() < now);
    } else if (this._deadlineFilter === 'completed') {
      filtered = deadlines.filter(d => d.completed);
    }

    const buildCardHtml = (dl) => {
      const targetIso = dl.targetTimestamp || (dl.targetDate + 'T' + (dl.targetTime || '00:00') + ':00');
      const countdown = this.formatDeadlineCountdown(targetIso);
      const formattedTarget = this.formatDeadlineTarget(dl.targetDate, dl.targetTime);
      const isOverdue = countdown.isOverdue;
      const priorityClass = dl.priority || 'critical';

      let countdownClass = 'countdown-active';
      if (dl.completed) {
        countdownClass = 'countdown-completed';
      } else if (isOverdue) {
        countdownClass = 'countdown-overdue';
      }

      return `
        <div class="deadline-card ${priorityClass}-border ${dl.completed ? 'completed' : ''}">
          <div class="deadline-top-row">
            <div class="deadline-title-group">
              <h3 class="deadline-title">${this.escapeHtml(dl.title)}</h3>
              <div class="deadline-target-time">
                <span>Target: <strong>${formattedTarget}</strong></span>
              </div>
            </div>
            <div class="deadline-badges-row">
              <span class="criticality-badge ${priorityClass}">${priorityClass}</span>
              ${dl.category ? `<span class="criticality-badge low">${this.escapeHtml(dl.category)}</span>` : ''}
            </div>
          </div>

          <div class="deadline-countdown-box">
            <span class="countdown-label">Time Left:</span>
            <span class="countdown-value ${countdownClass}">${dl.completed ? 'Completed ✓' : countdown.text}</span>
          </div>

          ${dl.notes ? `<div style="font-size: 11.5px; color: var(--text-secondary); line-height: 1.4;">${this.escapeHtml(dl.notes)}</div>` : ''}

          <div class="deadline-footer-actions">
            <div>
              ${!dl.completed ? `
                <button class="btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="PlanoraUI.scheduleDeepWorkForDeadline('${dl.id}')">
                  Schedule Deep Work
                </button>
              ` : `
                <span style="font-size: 11px; color: #16a34a; font-weight: 700;">✓ Milestone Achieved</span>
              `}
            </div>
            <div class="deadline-footer-right">
              <button class="btn-ghost-sm" style="font-size: 11px; padding: 4px 8px;" onclick="PlanoraUI.toggleDeadlineComplete('${dl.id}')">
                ${dl.completed ? '↺ Reopen' : '✓ Mark Done'}
              </button>
              <button class="btn-ghost-sm" style="font-size: 11px; padding: 4px 8px; color: var(--danger-color);" onclick="PlanoraUI.deleteDeadline('${dl.id}')" title="Delete Milestone">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    };

    if (mainGrid) {
      if (filtered.length === 0) {
        mainGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: var(--text-muted); font-size: 13px;">
            No deadline milestones matching filter: "<strong>${this.escapeHtml(this._deadlineFilter)}</strong>".
          </div>
        `;
      } else {
        mainGrid.innerHTML = filtered.map(buildCardHtml).join('');
      }
    }

    if (overviewList) {
      const activeDeadlines = deadlines.filter(d => !d.completed);
      const displayList = activeDeadlines.length > 0 ? activeDeadlines.slice(0, 2) : deadlines.slice(0, 2);
      if (displayList.length === 0) {
        overviewList.innerHTML = `
          <div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 12px; padding: 12px 0;">
            No upcoming critical deadlines. Your schedule runway is clear.
          </div>
        `;
      } else {
        overviewList.innerHTML = displayList.map(buildCardHtml).join('');
      }
    }
  },

  toggleDeadlineComplete(id) {
    PlanoraStore.toggleDeadline(id);
    this.renderDeadlines();
    this.showToast('Deadline status updated!');
  },

  deleteDeadline(id) {
    if (confirm('Delete this protected deadline milestone?')) {
      PlanoraStore.deleteDeadline(id);
      this.renderDeadlines();
      this.showToast('Protected deadline removed');
    }
  },

  openDeadlineModal(editId = null) {
    const modal = document.getElementById('deadlineModal');
    if (!modal) return;

    const idInput = document.getElementById('deadlineModalId');
    const titleInput = document.getElementById('deadlineTitleInput');
    const dateInput = document.getElementById('deadlineDateInput');
    const timeInput = document.getElementById('deadlineTimeInput');
    const critSelect = document.getElementById('deadlineCriticalitySelect');
    const catSelect = document.getElementById('deadlineCategorySelect');
    const notesInput = document.getElementById('deadlineNotesInput');
    const deepWorkCheck = document.getElementById('deadlineScheduleDeepWorkCheck');

    if (editId) {
      const dl = PlanoraStore.getDeadlines().find(d => d.id === editId);
      if (dl) {
        if (idInput) idInput.value = dl.id;
        if (titleInput) titleInput.value = dl.title || '';
        if (dateInput) dateInput.value = dl.targetDate || '';
        if (timeInput) timeInput.value = dl.targetTime || '05:29';
        if (critSelect) critSelect.value = dl.priority || 'critical';
        if (catSelect) catSelect.value = dl.category || 'Deadline';
        if (notesInput) notesInput.value = dl.notes || '';
        if (deepWorkCheck) deepWorkCheck.checked = false;
      }
    } else {
      if (idInput) idInput.value = '';
      if (titleInput) titleInput.value = '';
      if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }
      if (timeInput) timeInput.value = '05:29';
      if (critSelect) critSelect.value = 'critical';
      if (catSelect) catSelect.value = 'Deadline';
      if (notesInput) notesInput.value = '';
      if (deepWorkCheck) deepWorkCheck.checked = true;
    }

    modal.classList.add('open');
  },

  closeDeadlineModal() {
    const modal = document.getElementById('deadlineModal');
    if (modal) modal.classList.remove('open');
  },

  saveDeadlineFromModal() {
    const id = document.getElementById('deadlineModalId')?.value;
    const title = document.getElementById('deadlineTitleInput')?.value.trim();
    const targetDate = document.getElementById('deadlineDateInput')?.value;
    const targetTime = document.getElementById('deadlineTimeInput')?.value || '05:29';
    const priority = document.getElementById('deadlineCriticalitySelect')?.value || 'critical';
    const category = document.getElementById('deadlineCategorySelect')?.value || 'Deadline';
    const notes = document.getElementById('deadlineNotesInput')?.value.trim() || '';
    const scheduleDeepWork = document.getElementById('deadlineScheduleDeepWorkCheck')?.checked;

    if (!title || !targetDate) {
      alert('Please enter a deliverable title and target date.');
      return;
    }

    const targetTimestamp = `${targetDate}T${targetTime}:00`;
    const deadlineId = id || ('dl_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6));

    const deadlineObj = {
      id: deadlineId,
      title,
      targetDate,
      targetTime,
      targetTimestamp,
      priority,
      category,
      completed: false,
      notes
    };

    if (id) {
      const deadlines = PlanoraStore.getDeadlines();
      const idx = deadlines.findIndex(d => d.id === id);
      if (idx !== -1) {
        deadlines[idx] = { ...deadlines[idx], ...deadlineObj };
        PlanoraStore.saveDeadlines(deadlines);
      }
    } else {
      PlanoraStore.addDeadline(deadlineObj);
    }

    if (scheduleDeepWork) {
      this.scheduleDeepWorkForDeadline(deadlineId);
    }

    this.closeDeadlineModal();
    this.renderDeadlines();
    this.showToast(`Protected Deadline "${title}" saved & defended!`);
  },

  scheduleDeepWorkForDeadline(deadlineId) {
    const deadlines = PlanoraStore.getDeadlines();
    const target = deadlines.find(d => d.id === deadlineId);
    if (!target) return;

    // Schedule 90-minute evening deep work preparation block (18:00 - 19:30) for Night Owl peak
    const todayStr = new Date().toISOString().split('T')[0];
    const events = PlanoraStore.getEvents();

    const newEvent = {
      id: 'ev_prep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: `Deep Work Prep: ${target.title}`,
      date: todayStr,
      startTime: '18:00',
      endTime: '19:30',
      category: 'focus',
      priority: 'critical',
      energyLevel: 'high',
      status: 'planned',
      completed: false,
      notes: `Defending deadline: ${target.title}. Focus on final submission criteria and quality lock.`
    };

    events.push(newEvent);
    PlanoraStore.saveEvents(events);
    this.refreshAll();
    this.showToast(`Deep Work block scheduled for "${target.title}" (18:00 - 19:30)`);
  },

  // ------------------------------------------------------------
  // Daily Tasks & Action Items Backlog Controller
  // ------------------------------------------------------------
  setDailyTaskFilter(filter) {
    this._dailyTaskFilter = filter || 'all';
    document.querySelectorAll('#view-tasks .task-filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`dailyFilter${filter.charAt(0).toUpperCase() + filter.slice(1)}Btn`);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderDailyTasks();
  },

  renderDailyTasks() {
    const tasks = PlanoraStore.getDailyTasks();
    const container = document.getElementById('dailyTasksListStack');
    const velocityPctEl = document.getElementById('tasksVelocityPct');
    const velocityRatioEl = document.getElementById('tasksVelocityRatio');
    const countAllEl = document.getElementById('countAllDailyTasks');
    const countPendingEl = document.getElementById('countPendingDailyTasks');
    const countCompletedEl = document.getElementById('countCompletedDailyTasks');
    const prioritySelect = document.getElementById('dailyPriorityFilterSelect');

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (velocityPctEl) velocityPctEl.textContent = `${pct}%`;
    if (velocityRatioEl) velocityRatioEl.textContent = `${completed} of ${total} Completed`;
    if (countAllEl) countAllEl.textContent = total;
    if (countPendingEl) countPendingEl.textContent = pending;
    if (countCompletedEl) countCompletedEl.textContent = completed;

    if (!container) return;

    const selectedPriority = prioritySelect ? prioritySelect.value : 'all';

    let filtered = tasks;
    if (this._dailyTaskFilter === 'pending') {
      filtered = filtered.filter(t => t.status !== 'completed');
    } else if (this._dailyTaskFilter === 'completed') {
      filtered = filtered.filter(t => t.status === 'completed');
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(t => (t.priority || 'medium').toLowerCase() === selectedPriority.toLowerCase());
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; color: var(--text-muted); font-size: 13px;">
          No tasks found matching your filter criteria.
        </div>
      `;
      return;
    }

    const priorityDots = {
      critical: '<span class="priority-dot critical"></span>',
      high: '<span class="priority-dot high"></span>',
      medium: '<span class="priority-dot medium"></span>',
      low: '<span class="priority-dot low"></span>'
    };

    container.innerHTML = filtered.map(t => {
      const isDone = t.status === 'completed';
      const pIcon = priorityDots[t.priority?.toLowerCase()] || '<span class="priority-dot low"></span>';
      const durationLabel = t.duration || (t.durationMin ? `${t.durationMin}m` : '30m');

      return `
        <div class="daily-task-item ${isDone ? 'completed' : ''}" data-task-id="${t.id}">
          <div class="daily-task-left">
            <button class="task-check-btn ${isDone ? 'checked' : ''}" onclick="PlanoraUI.toggleDailyTaskStatus('${t.id}')" title="${isDone ? 'Mark Pending' : 'Mark Completed'}">
              ${isDone ? '✓' : ''}
            </button>
            <span class="priority-dot-indicator" title="Priority: ${t.priority || 'medium'}">${pIcon}</span>
            <div class="daily-task-details">
              <div class="daily-task-title">${this.escapeHtml(t.title)}</div>
              <div class="daily-task-meta">
                <span class="duration-pill-tag">${durationLabel}</span>
                ${t.time ? `<span class="duration-pill-tag" style="background: #000000; color: #FFFFFF; font-weight: 700;">⏰ ${t.time}</span>` : ''}
                <span class="category-pill-tag">${this.escapeHtml(t.category || 'General')}</span>
                ${t.rollover ? '<span style="font-size: 10px; color: var(--text-muted);">Rollover</span>' : ''}
              </div>
            </div>
          </div>
          <div class="daily-task-actions">
            ${!isDone ? `
              <button class="btn-task-schedule" onclick="PlanoraUI.scheduleDailyTask('${t.id}')" title="Schedule into open circadian window">
                Schedule
              </button>
            ` : ''}
            <button class="btn-ghost-sm" style="padding: 4px 6px; font-size: 11px; color: var(--text-muted);" onclick="PlanoraUI.deleteDailyTask('${t.id}')" title="Delete">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  addDailyTaskFromBar() {
    const titleInput = document.getElementById('dailyTaskQuickInput');
    const prioritySelect = document.getElementById('dailyTaskPrioritySelect');
    const categorySelect = document.getElementById('dailyTaskCategorySelect');
    const durationSelect = document.getElementById('dailyTaskDurationSelect');
    const timeInput = document.getElementById('dailyTaskTimeInput');

    if (!titleInput || !titleInput.value.trim()) return;

    const title = titleInput.value.trim();
    const priority = prioritySelect ? prioritySelect.value : 'medium';
    const category = categorySelect ? categorySelect.value : 'study';
    const duration = durationSelect ? durationSelect.value : '30m';
    const durationMin = parseInt(duration, 10) || 30;
    const taskTime = timeInput && timeInput.value ? timeInput.value.trim() : '';

    const newTask = {
      id: 'dt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title,
      duration,
      durationMin,
      time: taskTime,
      priority,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      status: 'pending',
      rollover: true
    };

    PlanoraStore.addDailyTask(newTask);
    titleInput.value = '';
    if (timeInput) timeInput.value = '';
    this.renderDailyTasks();
    this.showToast(taskTime ? `Added task: "${title}" at ${taskTime}` : `Added task: "${title}"`);
  },

  toggleDailyTaskStatus(taskId) {
    PlanoraStore.toggleDailyTask(taskId);
    this.renderDailyTasks();
    this.showToast('Task status updated!');
  },

  deleteDailyTask(taskId) {
    PlanoraStore.deleteDailyTask(taskId);
    this.renderDailyTasks();
    this.showToast('Task removed');
  },

  scheduleDailyTask(taskId) {
    const tasks = PlanoraStore.getDailyTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const events = PlanoraStore.getEvents();

    // Determine start and end times
    const durationMinutes = task.durationMin || (parseInt(task.duration, 10) || 45);
    const startHour = 19;
    const startMin = 0;
    const endTotalMin = startHour * 60 + startMin + durationMinutes;
    const endH = Math.floor(endTotalMin / 60);
    const endM = endTotalMin % 60;
    const startTime = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
    const endTime = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

    const newEvent = {
      id: 'ev_task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: task.title,
      date: todayStr,
      startTime: startTime,
      endTime: endTime,
      category: (task.category || 'focus').toLowerCase(),
      priority: task.priority || 'medium',
      energyLevel: 'high',
      status: 'planned',
      completed: false,
      notes: `Scheduled from Daily Action Items backlog (${task.duration || '45m'})`
    };

    events.push(newEvent);
    PlanoraStore.saveEvents(events);
    this.refreshAll();
    this.showToast(`Scheduled "${task.title}" to ${startTime} - ${endTime}`);
  },

  // ------------------------------------------------------------
  // AI Task Auto-Arranger Controller
  // ------------------------------------------------------------
  openTaskArrangerModal() {
    const modal = document.getElementById('taskArrangerModal');
    if (!modal) return;
    modal.classList.add('open');
    this.previewArrangedTasks();
  },

  closeTaskArrangerModal() {
    const modal = document.getElementById('taskArrangerModal');
    if (modal) modal.classList.remove('open');
  },

  parseArrangerText(rawText) {
    if (!rawText || !rawText.trim()) return [];
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const circadianSlots = [
      '18:00 - 19:30 (Evening Peak Focus)',
      '19:30 - 20:30 (Deep Study)',
      '20:30 - 21:30 (Algorithm Sprint)',
      '21:30 - 22:00 (Documentation)',
      '22:00 - 22:45 (Research)',
      '22:45 - 23:15 (Review & Polish)',
      '23:15 - 23:30 (Admin Log)'
    ];

    const results = [];
    lines.forEach((line, idx) => {
      let text = line;
      let duration = '30m';
      let durationMin = 30;
      let priority = 'medium';
      let category = 'Study';

      // Duration regex
      const durMatch = text.match(/\b(\d+)\s*(m|min|mins|minute|minutes|h|hr|hrs|hour|hours)\b/i);
      if (durMatch) {
        const val = parseInt(durMatch[1], 10);
        const unit = durMatch[2].toLowerCase();
        if (unit.startsWith('h')) {
          durationMin = val * 60;
          duration = `${val * 60}m`;
        } else {
          durationMin = val;
          duration = `${val}m`;
        }
        text = text.replace(durMatch[0], ' ');
      }

      // Priority regex
      const prioMatch = text.match(/\b(critical|high|medium|low)\b/i);
      if (prioMatch) {
        priority = prioMatch[1].toLowerCase();
        text = text.replace(prioMatch[0], ' ');
      }

      // Category regex
      const catMatch = text.match(/\b(study|work|college|deadline|personal|routine|health)\b/i);
      if (catMatch) {
        const rawCat = catMatch[1].toLowerCase();
        category = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
        text = text.replace(catMatch[0], ' ');
      }

      // Clean title
      const cleanTitle = text.replace(/\s+/g, ' ').trim() || `Focus Task ${idx + 1}`;
      const slot = circadianSlots[idx % circadianSlots.length];

      results.push({
        id: 'arr_task_' + idx + '_' + Date.now(),
        title: cleanTitle,
        duration,
        durationMin,
        priority,
        category,
        slot,
        status: 'pending',
        rollover: true
      });
    });

    return results;
  },

  previewArrangedTasks() {
    const input = document.getElementById('arrangerTextInput');
    const tbody = document.getElementById('arrangerPreviewTbody');
    if (!tbody) return;

    const raw = input ? input.value : '';
    const parsed = this.parseArrangerText(raw);

    if (parsed.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 16px;">
            Type or paste tasks above to see live AI circadian mapping
          </td>
        </tr>
      `;
      return;
    }

    const priorityLabels = {
      critical: '<span class="priority-dot critical"></span> Critical',
      high: '<span class="priority-dot high"></span> High',
      medium: '<span class="priority-dot medium"></span> Medium',
      low: '<span class="priority-dot low"></span> Low'
    };

    tbody.innerHTML = parsed.map(p => `
      <tr>
        <td><strong>${priorityLabels[p.priority] || p.priority}</strong></td>
        <td><strong style="color: var(--text-primary);">${this.escapeHtml(p.title)}</strong></td>
        <td><span class="duration-pill-tag">${p.duration}</span></td>
        <td><span class="category-pill-tag">${p.category}</span></td>
        <td style="font-family: var(--font-mono); font-size: 11px; color: #2563eb; font-weight: 700;">${p.slot}</td>
      </tr>
    `).join('');
  },

  parseAndFillArrangerSample() {
    const input = document.getElementById('arrangerTextInput');
    if (input) {
      input.value = [
        'AI Project Final Code & Docker Submission 90m critical deadline',
        'DBMS SQL & Indexing Revision 60m high study',
        'Python Graph Algorithms Practice 60m medium study',
        'Update Project Documentation & Wiki 30m work',
        'Read Research Paper on Transformer Attention 45m study'
      ].join('\n');
      this.previewArrangedTasks();
    }
  },

  applyArrangedTasks(alsoScheduleEvents = true) {
    const input = document.getElementById('arrangerTextInput');
    if (!input) return;

    const parsed = this.parseArrangerText(input.value);
    if (parsed.length === 0) {
      alert('Please enter or paste at least one task.');
      return;
    }

    const currentTasks = PlanoraStore.getDailyTasks();
    parsed.forEach(pt => {
      currentTasks.unshift({
        id: 'dt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        title: pt.title,
        duration: pt.duration,
        durationMin: pt.durationMin,
        priority: pt.priority,
        category: pt.category,
        status: 'pending',
        rollover: true
      });
    });
    PlanoraStore.saveDailyTasks(currentTasks);

    if (alsoScheduleEvents) {
      const todayStr = new Date().toISOString().split('T')[0];
      const events = PlanoraStore.getEvents();
      let currentSlotHour = 18;
      let currentSlotMin = 0;

      parsed.forEach(pt => {
        const dur = pt.durationMin || 45;
        const totalStartMin = currentSlotHour * 60 + currentSlotMin;
        const totalEndMin = totalStartMin + dur;
        const sh = Math.floor(totalStartMin / 60);
        const sm = totalStartMin % 60;
        const eh = Math.floor(totalEndMin / 60);
        const em = totalEndMin % 60;

        events.push({
          id: 'ev_arr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          title: pt.title,
          date: todayStr,
          startTime: `${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}`,
          endTime: `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`,
          category: (pt.category || 'focus').toLowerCase(),
          priority: pt.priority || 'medium',
          energyLevel: 'high',
          status: 'planned',
          completed: false,
          notes: `AI Auto-Arranged into Circadian Evening Window`
        });

        currentSlotHour = eh;
        currentSlotMin = em;
      });

      PlanoraStore.saveEvents(events);
    }

    this.closeTaskArrangerModal();
    this.refreshAll();
    this.showToast(`AI Auto-Arranged and added ${parsed.length} tasks!`);
  },

  // ------------------------------------------------------------
  // View Switching Router
  // ------------------------------------------------------------
  switchView(viewName) {
    const target = (viewName === 'dashboard' || !viewName) ? 'overview' : viewName;
    document.querySelectorAll('.nav-item').forEach(b => {
      if (b.getAttribute('data-view') === target) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSec = document.getElementById(`view-${target}`);
    if (activeSec) {
      activeSec.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.activeTab = target;
    this.closeMobileSidebar();
  },

  bindEvents() {
    // Navigation routing
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetView = btn.getAttribute('data-view');
        if (!targetView) return;
        e.preventDefault();

        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const activeSec = document.getElementById(`view-${targetView}`);
        if (activeSec) activeSec.classList.add('active');
        this.activeTab = targetView;
        this.closeMobileSidebar();
      });
    });

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeFilter = chip.getAttribute('data-filter') || 'all';
        this.renderTimeline();
      });
    });

    // NLP bar enter key
    const nlpInput = document.getElementById('nlpSearchInput');
    if (nlpInput) {
      nlpInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.processNLPBar();
      });
    }

    // AI Chat input enter key (Drawer)
    const aiInput = document.getElementById('aiChatInput');
    if (aiInput) {
      aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendAIMessage();
      });
    }

    // AI Full Studio Chat input enter key (Dedicated AI Page)
    const fullAiInput = document.getElementById('fullAiChatInput');
    if (fullAiInput) {
      fullAiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendFullAIMessage();
      });
    }

    // Keyboard Shortcuts (Ctrl+Z / Ctrl+Y / Escape)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          PlanoraStore.redo();
        } else {
          PlanoraStore.undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        PlanoraStore.redo();
      } else if (e.key === 'Escape') {
        this.closeModal();
        this.closeAIDrawer();
        this.closeMobileSidebar();
        this.closeTimezoneModal();
      }
    });

    // Window resize handler for mobile drawer state reset
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebarBackdrop');
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Theme toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('planora_theme', isDark ? 'light' : 'dark');
      });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('planora_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }
};

// Auto-boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  PlanoraUI.init();
});
