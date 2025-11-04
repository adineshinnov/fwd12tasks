// Simple front-end validation + redirect (no backend)
// Stores username in sessionStorage; optional "remember" stores in localStorage

const f = document.getElementById('loginForm');
const u = document.getElementById('username');
const p = document.getElementById('password');
const uErr = document.getElementById('uErr');
const pErr = document.getElementById('pErr');
const remember = document.getElementById('remember');
const formMsg = document.getElementById('formMsg');

// Pre-fill username if remembered
const remembered = localStorage.getItem('demo:username');
if (remembered) {
  u.value = remembered;
  remember.checked = true;
}

// Validation rules
function validateUsername() {
  const v = u.value.trim();
  if (!v) { uErr.textContent = 'Username is required.'; return false; }
  if (v.length < 3) { uErr.textContent = 'Minimum 3 characters.'; return false; }
  uErr.textContent = '';
  return true;
}
function validatePassword() {
  const v = p.value;
  if (!v) { pErr.textContent = 'Password is required.'; return false; }
  if (v.length < 6) { pErr.textContent = 'Minimum 6 characters.'; return false; }
  if (!/\d/.test(v)) { pErr.textContent = 'Include at least one number.'; return false; }
  pErr.textContent = '';
  return true;
}

// Live-clear errors when user types
u.addEventListener('input', () => { if (uErr.textContent) validateUsername(); });
p.addEventListener('input', () => { if (pErr.textContent) validatePassword(); });

f.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.classList.add('d-none');
  const okU = validateUsername();
  const okP = validatePassword();
  if (!okU || !okP) return;

  const username = u.value.trim();

  // Optional: "remember me" stores username in localStorage
  if (remember.checked) localStorage.setItem('demo:username', username);
  else localStorage.removeItem('demo:username');

  // Keep the active user for this session
  sessionStorage.setItem('demo:activeUser', username);

  // Redirect to dashboard
  window.location.href = 'dashboard.html';
});
