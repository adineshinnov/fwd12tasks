const root = document.documentElement;
const btn = document.getElementById("toggleBtn");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

btn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const newTheme = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", newTheme);
});
