# Task 2 — README

**Title**  
Responsive Product Gallery

**Questions / Description**  
Build a grid of product cards (image, title, price, CTA) that reflows across breakpoints.

**Aim**  
Practice CSS Grid, card composition, image aspect ratio, and responsive columns.

**Step by Step Procedure**  
1. Structure cards inside a `.grid` wrapper in `index.html`.  
2. In `styles.css`, set `grid-template-columns: repeat(4, 1fr);` and breakpoints to 3→2→1.  
3. Use `aspect-ratio` + `object-fit: cover` for images.  
4. Add hover elevation, readable spacing, and focus states.  
5. Validate mobile view (no horizontal scroll).

**Explanation of Concepts**  
- Grid vs Flex (2D vs 1D layouts).  
- Aspect ratio prevents CLS.  
- Media queries adapt the layout by screen width.

**Answers**  
Expected: gallery flows 4/3/2/1 columns; cards keep consistent image cropping and legible text.

**Files & Hints**  
- Files: `index.html`, `styles.css`, `img/*`  
- Hints: Optimize images; test keyboard navigation.

**Viva Questions & Answers**  
1. *Grid vs Flex?* Grid is 2D; Flex is 1D.  
2. *Why `object-fit: cover`?* To avoid distortion/gaps.  
3. *What is CLS?* Cumulative Layout Shift; minimized by fixed ratios.  
4. *When use `minmax()`?* To bound track sizes.  
5. *How to handle focus?* `:focus-visible` styling.

**Outcome**  
A responsive product gallery with accessible, stable cards.
