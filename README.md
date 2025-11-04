# Hands-On Web Project — HTML / CSS / JavaScript (Front-End Only)

**Overview**  
A 12‑task practice project covering layout, forms, SCSS, responsive design, DOM, storage, async fetch, ES modules, and a mini e‑commerce cart. **No backend or DB** is required.

---

## **Prerequisites**
- A modern browser (Chrome, Edge, Firefox, Safari).
- **Local HTTP server is recommended** (needed for ES modules and some fetch calls):
  - VS Code: install **Live Server** → “Open with Live Server”
  - Python: `python3 -m http.server 5173` → open http://localhost:5173

> Opening files directly as `file://…` may break **Task 10/11** (fetch/ES modules).

---

## **Quick Start**
1. Open `index.html` and log in with:
   - **Username**: any ≥ 3 characters  
   - **Password**: ≥ 6 characters + at least one number
2. You’ll be redirected to `dashboard.html`.
3. Use the left sidebar (**Task 1…Task 12**). The selected task loads its own `index.html` in the center frame.
4. Click **Open in new tab** to view a task full page.

---

## **Folder Structure**
```
/index.html            # Login page (front-end validation only)
/login.js              # Form validation + redirect
/dashboard.html        # Sidebar, iframe preview, header with username, logout
/dashboard.js          # Loads tasks into iframe; remembers last selection
/styles.css            # Shared styles (login & dashboard)

/Task 1/index.html     # Each task has its own index.html (+ README.md)
...
/Task 12/index.html
/Lab Experiments/      # This folder holds lab-style README files per task
```
> If your task folder names differ (e.g., `Task-1`), update the mapping in `dashboard.js`.

---

## **Tasks Overview**
| #  | Task (short name)                                   | Notes |
|----|------------------------------------------------------|------|
| 1  | Colorful UI / Intro Card (HTML+CSS)                 | Static layout; responsive |
| 2  | Responsive Product Gallery                           | Cards grid; images; responsive |
| 3  | Event Registration Form                              | Strict validation; inline errors; success state |
| 4  | CSS vs SCSS                                          | `styles.scss` with comments; compiled `styles.css` |
| 5  | Navigation & Footer                                  | Media queries; sticky patterns |
| 6  | Conditional Greetings                                | Transitions & keyframe animations |
| 7  | DOM Interactions                                     | Buttons/Toast/State |
| 8  | Responsive Cards + Well-formatted CSS                | Semantic classes & clean formatting |
| 9  | Utility Components                                   | Badges, buttons, helpers |
| 10 | Storage + Fetch + Error Handling                     | localStorage + async fetch + safe UI errors |
| 11 | Weather Dashboard (ES Modules + API)                 | Open-Meteo API; search + forecast |
| 12 | E-Commerce Cart (OOP + SCSS + Storage)               | Cart drawer, theming, persistence |

---

## **Troubleshooting**
- **Blank or error in Task 11**: Must run via HTTP server (ES modules don’t load from `file://`).  
- **Network errors in Task 10/11**: Try a different network (campus firewalls may block public APIs).  
- **Task doesn’t load in dashboard**: Confirm folder exists exactly as `Task X/index.html` (case/space sensitive).

---

## **Notes**
- **Remember Me** stores username only (in `localStorage`); the active session is in `sessionStorage`.  
- **SCSS** is included for learning (Task 4 & 12). Compiled CSS is already present. To recompile:
  ```bash
  sass styles.scss styles.css --style expanded --no-source-map
  ```
