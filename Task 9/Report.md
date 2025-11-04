# Task 9 — Async API Calls + CSS calc() Layout

## Aim
To demonstrate async fetching, parallel requests, and layout using calc() for a scrollable main area.

## Questions
1. Which endpoint(s) will you use and why mock locally?
2. Where will you display loading/error states?
3. Which layout dimension uses calc() and why?

## Step-by-Step Procedure
1. Create `Task 9` with `index.html`, `styles.css`, `app.js`, `destinations.json`, `weather/*.json`.
2. Use `Promise.all` to fetch per-city weather; show a non-blocking error banner on failure.
3. Keep a fixed header; size main as `calc(100vh - 64px)`.

## Answers / Key Points
Demonstrates async/await and batched fetches with a resilient UI and accessible error feedback.

## Program Files
- `index.html`
- `styles.css`
- `app.js`
- `destinations.json`
- `weather/*.json`
- `goa.png`
- `paris.png`

## Sample Test / Evidence
- Run on a local server (VS Code Live Server or `python -m http.server`).
- Capture **mobile** (375px) and **desktop** (≥1280px) screenshots.
- Validate HTML/CSS (W3C validators) and include reports.

## Result
The objective was achieved and verified with test evidence.

## Viva Questions
1. What semantic tags were used and why?
2. How did media queries affect layout?
3. What accessibility considerations were implemented?

---
