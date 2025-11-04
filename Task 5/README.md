# Task 5 — README

**Title**  
Navigation & Footer with Media Queries

**Questions / Description**  
Create a responsive header navigation that wraps on small screens and a consistent footer.

**Aim**  
Deliver usable navigation across device sizes with good accessibility.

**Step by Step Procedure**  
1. Build `<header>` with brand and `<nav>` links.  
2. Use flexbox for layout; add a mobile breakpoint to stack/collapse links.  
3. Implement a sticky footer via min-height on the page wrapper.  
4. Provide `:focus-visible` styles for links/buttons.

**Explanation of Concepts**  
- Flex for row alignment and wrapping.  
- Mobile-first CSS with media queries.  
- Sticky footer pattern using layout math.

**Answers**  
Expected: no horizontal scroll on mobile; footer remains consistent; links are focusable and readable.

**Files & Hints**  
- Files: `index.html`, `styles.css`  
- Hints: Verify keyboard navigation and color contrast.

**Viva Questions & Answers**  
1. *Flex vs Grid for nav?* Flex is simpler for rows.  
2. *What is `gap`?* Container-controlled spacing.  
3. *How to handle sticky header?* `position: sticky; top: 0;` with backdrop.  
4. *ARIA for nav?* `<nav>` implies navigation landmark.  
5. *Mobile hamburger?* Optional if links overflow.

**Outcome**  
Accessible navigation and footer that adapt elegantly to screen width.
