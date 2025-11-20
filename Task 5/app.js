const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");

toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true" || false;
  toggle.setAttribute("aria-expanded", !expanded);
  nav.classList.toggle("open");
});
