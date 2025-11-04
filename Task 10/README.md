# Task 10 — README

**Title**  
Storage + Fetch + Error Handling

**Questions / Description**  
Create a mini dashboard:  
- To-do list stored in `localStorage` (add/toggle/delete/clear).  
- Fetch a public JSON feed with a timeout and show graceful errors with retry.

**Aim**  
Practice persistence and robust network handling.

**Step by Step Procedure**  
1. Build two panels in `index.html`: Tasks and Feed.  
2. In `app.js`, write a small model to sync tasks to `localStorage`.  
3. Implement `fetchWithTimeout` using `AbortController`.  
4. Render loading, success, and error states; include a Retry button.  
5. Add an optional “simulate error” toggle to test UI.

**Explanation of Concepts**  
- `localStorage` read/write JSON.  
- `async/await` with try/catch and abort.  
- Defensive UI: banners and retries.

**Answers**  
Expected: tasks persist across reloads; feed loads (or shows an error state) with retry.

**Files & Hints**  
- Files: `index.html`, `styles.css`, `app.js`  
- Hints: Always JSON-parse/stringify; catch network and parse errors.

**Viva Questions & Answers**  
1. *localStorage limits?* ~5–10MB, synchronous.  
2. *Why abort fetch?* Prevents hanging requests and stale updates.  
3. *Idempotent UI?* Safe to re-click retry.  
4. *What is CORS?* Cross-origin access policy.  
5. *XSS safety?* Sanitize dynamic HTML (escape).

**Outcome**  
A resilient UI with persistent state and safe network behavior.
