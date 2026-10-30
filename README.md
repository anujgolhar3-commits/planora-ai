# Planora AI · Circadian Schedule Intelligence

> **Autonomous Schedule Intelligence & Real-Time Circadian Co-Pilot**  
> Aligns your high-stakes cognitive work with your biological peak stamina, protects against metabolic slump dips, and orchestrates your Google Calendar seamlessly.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://planora-ai-chi-one.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-000000?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](LICENSE)

---

## 🌐 Live Application
- **Production URL**: [https://planora-ai-chi-one.vercel.app](https://planora-ai-chi-one.vercel.app)
- **Instant Demo**: Click **"Try Instant Demo"** on the login page for zero-setup exploration.

---

## 📖 About Planora AI
**Planora AI** is an intelligent scheduling orchestrator built from the ground up for deep-work practitioners, engineers, and researchers. Unlike static to-do lists and fragmented calendar apps, Planora continuously models your circadian rhythm to optimize cognitive throughput:

- **Circadian Energy Rhythm Mapping**: Defends your peak cognitive windows (e.g., 18:00–23:00) for high-stakes problem solving while reserving metabolic slump intervals (13:30–16:00) for lightweight admin triage and recovery.
- **Bi-Directional Google Calendar Integration**: Connects via OAuth 2.0 to inspect scheduled commitments, identify contiguous free blocks, and auto-book sessions directly into Google Calendar.
- **Natural Language Co-Pilot**: Powered by frontier LLMs (Groq / OpenAI / Gemini) to dynamically answer schedule queries (*"When am I free today?"*, *"Reschedule my backlog into tomorrow's peak window"*).
- **Guarded Milestone Engine**: Proactively detects impending project deadlines and auto-schedules protective deep-work blocks before delivery cutoffs.
- **Monochrome Precision UI**: Distraction-free, high-contrast black-and-white design engineered for zero visual fatigue and rapid execution across desktop and mobile.

---

## 🚀 Key Features

| Feature | Capability |
|---|---|
| **Circadian Autopilot** | Enforces focus defense rules, buffer blocks, and automatic end-of-day shutdown |
| **Weekly Matrix & Drag-and-Drop** | Visual 7-day schedule grid with interactive drag-and-drop task rescheduling |
| **Instant Task Checkbox** | Seamless completion toggles with audio-tactile feedback and rollover history |
| **Protected Milestones** | Real-time countdowns and automatic deep-work preparation alarms |
| **AI Schedule Arranger** | Freeform text parser that decomposes thoughts into categorized circadian slots |
| **Cross-Platform Responsive** | Full flexbox layout optimized for smartphones, tablets, and desktop workstations |

---

## 🛠️ Tech Stack
- **Frontend**: Vanilla JavaScript (ES6+), Semantic HTML5, Pure Modern CSS (Flexbox / Grid, CSS Variables)
- **Backend**: Node.js HTTP Micro-Engine with HMAC-SHA256 Signed Stateless Sessions
- **Authentication**: Google OAuth 2.0 (Google Calendar API v3)
- **AI Engine**: Groq SDK / OpenAI SDK / DeepSeek / Gemini Live API with Circadian System Prompting
- **Deployment**: Vercel Serverless Edge Architecture

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anujgolhar3-commits/planora-ai.git
   cd planora-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your credentials:
   ```env
   PORT=5500
   SESSION_SECRET=your_secure_random_hmac_secret
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:5500/auth/google/callback
   ```

4. **Start the local server**:
   ```bash
   node server.js
   ```
   Open `http://localhost:5500/login.html` in your browser.

---

## 🔒 Security & Privacy
Planora AI adheres strictly to the **Google API Services User Data Policy** (Limited Use disclosure). All authentication cookies are cryptographically signed using HMAC-SHA256. User calendar data is used exclusively for scheduling execution and is never monetized or used for foundation model training.
- [Privacy Policy](https://planora-ai-chi-one.vercel.app/privacy.html)
- [Terms of Service](https://planora-ai-chi-one.vercel.app/terms.html)
