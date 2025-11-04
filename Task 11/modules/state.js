// Theme + simple persisted state
const KEY = 't11:state'; // { lastQuery: "City" }

export function getState() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}
export function setState(patch) {
  const next = { ...getState(), ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function initTheme(btnSel) {
  const btn = document.querySelector(btnSel);
  const root = document.documentElement;

  function apply(mode) {
    root.setAttribute('data-theme', mode);
    btn.setAttribute('aria-pressed', String(mode === 'dark'));
    localStorage.setItem('t11:theme', mode);
  }

  const stored = localStorage.getItem('t11:theme');
  if (stored) apply(stored);
  else {
    const dark = matchMedia('(prefers-color-scheme: dark)').matches;
    apply(dark ? 'dark' : 'light');
  }

  btn.addEventListener('click', () => {
    apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
}

