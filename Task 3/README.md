# Task 3 — README

**Title**  
Styled Event Registration Form (Strict Validation)

**Questions / Description**  
Build a form with mandatory fields. Show inline **red** errors beside each invalid control. Errors disappear when corrected. Show **“Validated Successfully”** only on a fully valid submit.

**Aim**  
Deliver robust, user-friendly client-side validation.

**Step by Step Procedure**  
1. Create `index.html` with fields (name, email, phone, date, category, terms). Mark required with `*`.  
2. Put `<small class="err">` elements near each input for error text.  
3. In `app.js`, implement validators (length, email regex, phone pattern, required).  
4. On `submit`, `preventDefault()`, validate each field, focus the first invalid, and render messages.  
5. If valid, show a success banner, optionally reset form after timeout.

**Explanation of Concepts**  
- Constraint Validation API + custom rules.  
- `aria-live` to announce messages.  
- Event-driven UX: `input`/`blur` clears errors.

**Answers**  
Expected: errors only appear when invalid; on correction they clear; one success banner shows after valid submit.

**Files & Hints**  
- Files: `index.html`, `styles.css`, `app.js`  
- Hints: Avoid duplicate validation logic; centralize rules.

**Viva Questions & Answers**  
1. *Why `preventDefault()`?* To run custom validation first.  
2. *`input` vs `change`?* `input` fires each keystroke; `change` on commit.  
3. *Role of `aria-live`?* Screen readers get updates.  
4. *Regex pitfalls?* Over-restricting valid inputs.  
5. *Is client-side validation enough?* No—server re-validation is required (in real apps).

**Outcome**  
A professional form with clear, accessible validation behavior.
