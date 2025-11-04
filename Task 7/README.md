# Task 7 — README

**Title**  
DOM Interactions: Buttons, Toasts, and Local State

**Questions / Description**  
Implement buttons that update on-page text/state and a small toast notification component.

**Aim**  
Practice event handling, state updates, and timed UI feedback.

**Step by Step Procedure**  
1. Create a few buttons and a text area in `index.html`.  
2. Write `toast()` utility in `app.js` to show/hide a message with `setTimeout`.  
3. Attach `click` handlers to update text (e.g., counter, toggles) and call `toast()`.  
4. Style the toast and buttons (focus, hover).

**Explanation of Concepts**  
- Event listeners drive UI updates.  
- Timers for ephemeral notifications.  
- Separation of concerns: small utilities.

**Answers**  
Expected: clicking buttons updates the UI and shows a brief toast.

**Files & Hints**  
- Files: `index.html`, `styles.css`, `app.js`  
- Hints: Debounce noisy events if needed.

**Viva Questions & Answers**  
1. *`addEventListener` vs inline handlers?* Separation & reusability.  
2. *What is event bubbling?* Propagation up the DOM.  
3. *Why timers?* Delayed/temporary feedback.  
4. *What is debouncing?* Grouping rapid events.  
5. *Accessibility of toasts?* `role="status"` and `aria-live`.

**Outcome**  
A small interactive panel demonstrating core DOM skills.
