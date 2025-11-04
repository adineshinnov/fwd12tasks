# Task 6 — README

**Title**  
Conditional Greetings with Transitions & Animations

**Questions / Description**  
Display “Good Morning/Afternoon/Evening” based on current time using CSS transitions/keyframes for entry.

**Aim**  
Combine simple JS logic with animation for a polished greeting.

**Step by Step Procedure**  
1. Build a `<div id="greeting">` in `index.html`.  
2. In `app.js`, read local time and set the appropriate message/class.  
3. In `styles.css`, define transition and `@keyframes` for entry.  
4. Provide a reduced-motion fallback with `@media (prefers-reduced-motion: reduce)`.

**Explanation of Concepts**  
- Date/time logic (hour-based branching).  
- Class toggling to trigger CSS animations.  
- Reduced-motion accessibility.

**Answers**  
Expected: smooth fade/slide-in of a greeting; message changes by time.

**Files & Hints**  
- Files: `index.html`, `styles.css`, `app.js`  
- Hints: Test across time bands or simulate by overriding hours in JS.

**Viva Questions & Answers**  
1. *Where do we handle logic?* In JS, then apply classes.  
2. *What’s keyframes?* Named animation steps in CSS.  
3. *Why reduced-motion?* Motion sensitivity accessibility.  
4. *Transition vs animation?* State change vs timeline-driven.  
5. *What is repaint/reflow?* Rendering steps; avoid heavy layout thrash.

**Outcome**  
A pleasant, accessible greeting with minimal code.
