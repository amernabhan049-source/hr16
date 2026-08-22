# PeopleHub — HR Portal

A complete HR Portal built with **React 18 + Vite + TypeScript** (CSS Modules,
no Tailwind) and a **Node/Express** backend, featuring an embedded AI agent
chat popup ("Ask HR") powered by **Azure OpenAI**.

## File Tree

```
HR 16/
├── frontend/                      # Vite + React + TypeScript app
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css              # brand color variables + resets
│       ├── types.ts
│       ├── vite-env.d.ts
│       ├── data/
│       │   ├── announcements.json
│       │   ├── leaveRequests.json
│       │   ├── employees.json
│       │   └── policies.json
│       ├── components/
│       │   ├── Layout.tsx / Layout.module.css
│       │   ├── Sidebar.tsx / Sidebar.module.css
│       │   └── ChatWidget.tsx / ChatWidget.module.css
│       └── pages/
│           ├── Dashboard.tsx / Dashboard.module.css
│           ├── Leave.tsx / Leave.module.css
│           ├── Employees.tsx / Employees.module.css
│           └── Policies.tsx / Policies.module.css
├── backend/                       # Express server (local dev / traditional hosting)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── server.ts
│       └── chat.ts                # Azure OpenAI call + mock fallback
├── netlify/
│   └── functions/
│       └── chat.ts                # Serverless equivalent of /api/chat
├── netlify.toml
├── package.json                   # root — only used so Netlify can resolve function deps
├── .env.example
├── .gitignore
└── README.md
```

## Brand Spec (verify first)

| Token | Value |
|---|---|
| Primary (navy) | `#1f3a5f` |
| Accent (teal) | `#2e8b76` |
| Background | `#f5f7fa` |
| Text | `#1a1a1a` |
| Header title | "PeopleHub — HR Portal" |
| Chat launcher label | "Ask HR" |
| Agent's first message | "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies." |

## Running Locally

### 1. Backend (Express API)

```bash
cd backend
npm install
cp .env.example .env
# edit .env and fill in AZURE_OPENAI_ENDPOINT / AZURE_OPENAI_API_KEY / AZURE_OPENAI_DEPLOYMENT
npm run dev
```

The API runs on `http://localhost:4000`. If the Azure env vars are left blank,
`/api/chat` still responds with a canned demo reply so the popup keeps working.

### 2. Frontend (Vite app)

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite runs on `http://localhost:5173` and proxies `/api/*` requests to the
backend on port 4000 (see `frontend/vite.config.ts`).

Open `http://localhost:5173` and click **Ask HR** in the bottom-right corner.

## Deploying to Netlify

The frontend is a static Vite build, and `/api/chat` is also implemented as a
Netlify Function (`netlify/functions/chat.ts`), so no separate server needs to
be hosted.

### Step 1 — Create a GitHub repo and push

```bash
git init
git add .
git commit -m "Initial commit: PeopleHub HR Portal"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(`.env` files are already excluded via `.gitignore` — only `.env.example` is
committed, so your real Azure key never reaches GitHub.)

### Step 2 — Connect the repo to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. Choose GitHub and select your repo.
3. Netlify will read `netlify.toml` automatically:
   - Build command: `npm install --prefix frontend && npm run build --prefix frontend`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`
4. Click **Deploy site**.

### Step 3 — Set Azure OpenAI environment variables in Netlify

Go to **Site settings → Environment variables** and add:

| Key | Value |
|---|---|
| `AZURE_OPENAI_ENDPOINT` | `https://your-resource-name.openai.azure.com/` |
| `AZURE_OPENAI_API_KEY` | your Azure OpenAI key |
| `AZURE_OPENAI_DEPLOYMENT` | your chat deployment name, e.g. `gpt-4o` |

Trigger a redeploy (Deploys → Trigger deploy) so the function picks up the new
variables. The key stays server-side inside the Netlify Function and is never
exposed to the browser.

## Precision Controls Checklist

Verify these first, since they were treated as hard spec:

1. Exact hex colors used verbatim: `#1f3a5f`, `#2e8b76`, `#f5f7fa`, `#1a1a1a`
   (see `frontend/src/index.css`).
2. Header title text: "PeopleHub — HR Portal" (`frontend/src/components/Layout.tsx`).
3. Chat launcher button label: "Ask HR" (`frontend/src/components/ChatWidget.tsx`).
4. Agent's first message text matches exactly (`frontend/src/components/ChatWidget.tsx`,
   `GREETING` constant).
5. Exactly 4 pages behind a left sidebar with React Router: Dashboard, Leave,
   Employees, Policies.
6. `/api/chat` accepts `{ message, history }` and returns `{ reply }` — wired
   identically in both `backend/src/server.ts` (Express) and
   `netlify/functions/chat.ts` (serverless).
7. `@azure/openai`'s `AzureOpenAI` client is used, reading
   `AZURE_OPENAI_ENDPOINT` / `AZURE_OPENAI_API_KEY` / `AZURE_OPENAI_DEPLOYMENT`
   from environment variables, with a mock fallback when they're missing.
8. `.env` is git-ignored everywhere; only `.env.example` files are committed.
