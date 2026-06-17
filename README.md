# ResumeForge Pro

ATS-friendly Developer Resume Builder built with React + Vite.

## Features
- 3 professional resume templates (Modern Developer, Minimal ATS, Professional Corporate)
- Live preview that updates as you type
- Resume strength score with actionable feedback
- ATS insights panel
- PDF export (real, downloadable PDF)
- LocalStorage persistence — data survives page refresh
- Dark/light mode
- Fully responsive

## Stack
- React 18 + Vite 5
- Plain CSS with CSS variables
- html2pdf.js for PDF generation
- No backend, no auth

## Quick Start

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Deploy to Vercel

1. Push this repo to GitHub (public)
2. Go to vercel.com → New Project → Import your repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy — done ✅

No environment variables needed.

## Project Structure

```
resumeforge/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── form/
│   │   │   └── index.jsx        # All form sections
│   │   ├── preview/
│   │   │   ├── index.jsx        # Preview panel + template switcher
│   │   │   └── Templates.jsx    # 3 resume templates
│   │   ├── ui/
│   │   │   └── index.jsx        # Reusable primitives (Input, Btn, Card…)
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── ScorePanel.jsx       # Score ring + ATS insights
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── index.js             # Score calc, ATS check, constants
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

Built by **Shivansh Saxena** · shivanshsaxena127@gmail.com  
**Built for Digital Heroes** · https://digitalheroesco.com
