# Task 9 — README

**Title**  
Utility Components (Badges, Buttons, Tags)

**Questions / Description**  
Build small, reusable UI fragments and document variants (sizes/colors).

**Aim**  
Create a component showcase that can be reused in other tasks.

**Step by Step Procedure**  
1. Define base `.btn`, `.badge`, `.tag` in `styles.css`.  
2. Add variants: `.primary`, `.info`, `.warning`, sizes like `.sm`, `.lg`.  
3. Showcase in `index.html` with examples and captions.  
4. Ensure focus/hover states for each variant.

**Explanation of Concepts**  
- Variants via additional classes.  
- Consistent spacing and font sizes.  
- Accessibility: focus visibility and semantics.

**Answers**  
Expected: a gallery of buttons/badges/tags with consistent variants.

**Files & Hints**  
- Files: `index.html`, `styles.css`  
- Hints: Keep API predictable (same class naming across variants).

**Viva Questions & Answers**  
1. *Atomic vs Utility CSS?* Small single-purpose classes vs component-level.  
2. *Variant explosion?* Balance with design tokens.  
3. *Why not inline styles?* Hard to maintain/reuse.  
4. *Focus ring importance?* Keyboard accessibility.  
5. *What is a11y contrast ratio?* Meets WCAG 2.1 AA/AAA.

**Outcome**  
A reusable UI toolkit to speed development of later tasks.
