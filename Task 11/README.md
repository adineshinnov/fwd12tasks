# Task 11 — README

**Title**  
Weather Dashboard (ES Modules + Open-Meteo API)

**Questions / Description**  
Search a city and display current weather + 5-day forecast using Open-Meteo Geocoding & Forecast APIs (no API key).

**Aim**  
Organize code with ES6 modules and handle async fetching with graceful UI states.

**Step by Step Procedure**  
1. Create `index.html` with search input, current panel, and forecast grid.  
2. Split JS into modules: `api.js`, `icons.js`, `state.js`, `ui.js`, and `app.js` (entry).  
3. In `api.js`, implement `searchPlaces()` and `getWeather()` with `fetch`.  
4. Render current conditions and forecast; add status messages and suggestion dropdown.  
5. Add responsive grid + subtle animations in `styles.css`.

**Explanation of Concepts**  
- ES modules require HTTP (not `file://`).  
- Async flow: `await fetch().then(resp.json())` with error checks.  
- ARIA live regions for dynamic updates.

**Answers**  
Expected: typing a city shows suggestions; selecting loads current + 5 cards of forecast with simple icons.

**Files & Hints**  
- Files: `index.html`, `styles.css`, `app.js`, `modules/api.js`, `modules/icons.js`, `modules/state.js`, `modules/ui.js`  
- Hints: Run via local server (Live Server / `python -m http.server`); networks may block public APIs.

**Viva Questions & Answers**  
1. *Why modules need HTTP?* Browser security/module resolution.  
2. *What are WMO weather codes?* Standardized code set (mapped to icons).  
3. *How to debounce search?* Delay calls while typing.  
4. *What is `aria-live`?* Announces changes for assistive tech.  
5. *How to handle empty results?* Clear suggestions and show status.

**Outcome**  
A modular, responsive weather tool with robust UX feedback.
