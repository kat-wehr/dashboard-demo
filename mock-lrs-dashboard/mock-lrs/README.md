# Mock LRS Dashboard
### QRM 501 · Micro-Critique xAPI Demo

A self-contained React app simulating a Learning Record Store (LRS) with 25 mock students across 7 weeks of the Micro-Critique assignment.

---

## Features
- **Cohort Overview** — submissions per week, avg scores, word counts, completion heatmap
- **Learner Progress** — individual student drilldown with score and word count charts
- **Statement Explorer** — query raw xAPI statements by verb, week, and/or student

---

## Project Structure

```
mock-lrs/
├── public/
│   └── index.html
├── src/
│   ├── App.js               ← main shell
│   ├── index.js             ← React entry point
│   ├── data.js              ← mock data + query engine
│   ├── components/
│   │   ├── StatCard.js
│   │   ├── VerbTag.js
│   │   └── ChartTooltip.js
│   └── tabs/
│       ├── CohortTab.js
│       ├── LearnerTab.js
│       └── QueryTab.js
└── package.json
```

---

## Deploy Options

### Option 1 — CodeSandbox (fastest, no install)
1. Go to [codesandbox.io](https://codesandbox.io) → **Create Sandbox** → **Import from ZIP**
2. Upload this ZIP file
3. It runs instantly and gives you a shareable URL

### Option 2 — Vercel (permanent URL, free)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Vercel auto-detects Create React App — just click **Deploy**
4. Done. You get a URL like `https://mock-lrs.vercel.app`

### Option 3 — Run locally
```bash
cd mock-lrs
npm install
npm start
```
Opens at `http://localhost:3000`

---

## Dependencies
- `react` + `react-dom` ^18
- `recharts` ^2.12 (charts)
- `react-scripts` 5 (build tooling)

All fonts loaded from Google Fonts (Syne + JetBrains Mono).
