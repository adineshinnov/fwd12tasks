# Task 12 — README

**Title**  
E-Commerce Cart (OOP + SCSS + Storage + Theming)

**Questions / Description**  
Implement a mini cart with:  
- OOP models (`Product` → `BookProduct` / `ElectronicProduct` / `ClothingProduct`, `CartItem`, `Cart`)  
- Cart drawer (add/remove, inc/dec qty) with totals (subtotal, 18% tax, grand)  
- Light/Dark theming and localStorage persistence  
- SCSS source with comments + compiled CSS

**Aim**  
Apply OOP, state management, theming, and SCSS workflow in a cohesive UI.

**Step by Step Procedure**  
1. Create `index.html` with product grid, theme button, and cart drawer.  
2. In `app.js`, build OOP classes and sample products; wire add/remove/qty.  
3. Persist cart (`t12:cart`) and theme (`t12:theme`) to storage.  
4. Show toast on add; animate drawer open/close.  
5. Author `styles.scss` (variables/mixins/nesting) and compile to `styles.css`.

**Explanation of Concepts**  
- Encapsulation with private fields (`#id`).  
- Inheritance overriding `finalPrice()` (discounts/fees).  
- CSS variables for runtime theme; SCSS for authoring ergonomics.

**Answers**  
Expected: products load with images, adding shows toast, cart drawer updates totals; theme toggles and persists.

**Files & Hints**  
- Files: `index.html`, `app.js`, `styles.scss`, `styles.css`  
- Hints: Keep SCSS comments explaining differences vs CSS; compile with `sass styles.scss styles.css --style expanded`.

**Viva Questions & Answers**  
1. *Why OOP here?* Clear separation of concerns and extensibility.  
2. *Private fields benefit?* Prevent accidental external mutation.  
3. *SCSS vs CSS variables?* Compile-time vs runtime theming.  
4. *Why persist theme/cart?* Better UX across reloads.  
5. *Accessibility in drawers?* `aria-modal`, focus management, Escape to close.

**Outcome**  
A polished, persistent, themed cart demonstrating OOP and SCSS proficiency.
