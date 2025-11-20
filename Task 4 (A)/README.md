# Task 4 — README

**Title**  
CSS vs SCSS (with Explanatory Comments)

**Questions / Description**  
Demonstrate SCSS features—`$variables`, `@mixin`, `@include`, nesting—compiled into equivalent CSS.

**Aim**  
Differentiate compile-time SCSS features from runtime CSS variables.

**Step by Step Procedure**  
1. Author `styles.scss` using `$variables`, `@mixin`, and nested selectors (comment each feature).  
2. Keep CSS custom properties for runtime theming.  
3. Compile with: `sass styles.scss styles.css --style expanded`  
4. Link `styles.css` in `index.html` and verify parity.

**Explanation of Concepts**  
- SCSS variables are compile-time; CSS variables are runtime (theming).  
- Mixins reuse property bundles and accept parameters.  
- Nesting compiles to flat selectors—avoid deep nesting.

**Answers**  
Expected: compiled CSS visually matches SCSS; comments clarify how SCSS differs.

**Files & Hints**  
- Files: `index.html`, `styles.scss`, `styles.css`  
- Hints: Keep both SCSS + CSS in the repo for evaluation.

**Viva Questions & Answers**  
1. *SCSS vs CSS variables?* Compile-time vs runtime.  
2. *Partials and imports?* `_file.scss` and `@use`/`@forward`.  
3. *Mixins vs placeholders?* Mixins take args; placeholders via `@extend`.  
4. *Why limit nesting?* Readability and specificity control.  
5. *Source order precedence?* Later rules override earlier.

**Outcome**  
A clear SCSS→CSS pipeline with maintainable styling patterns.
