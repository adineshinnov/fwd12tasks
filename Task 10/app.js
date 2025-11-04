/* ==========================================================
   Task 10 — Storage, Fetch & Error Handling (JS)
   Implements:
     • localStorage for tasks + theme preference
     • fetch (async/await) for external data
     • try/catch + UI error banners
     • DOM manipulation (render, add, toggle, delete)
   ========================================================== */

const els = {
  body: document.documentElement,
  themeBtn: document.getElementById('themeBtn'),
  failToggle: document.getElementById('failToggle'),

  // Tasks
  form: document.getElementById('taskForm'),
  title: document.getElementById('title'),
  taskList: document.getElementById('taskList'),
  taskStatus: document.getElementById('taskStatus'),
  importBtn: document.getElementById('importBtn'),
  clearBtn: document.getElementById('clearBtn'),

  // Fetch pane
  fetchStatus: document.getElementById('fetchStatus'),
  feed: document.getElementById('feed'),
  refreshBtn: document.getElementById('refreshBtn'),
};

const STORE_KEYS = {
  tasks: 't10:tasks',
  theme: 't10:pref:theme',
};

/* ----------------------------
   Utilities
   ---------------------------- */
function uid() {
  return (crypto && crypto.randomUUID) ? crypto.randomUUID() :
    'id-' + Math.random().toString(36).slice(2);
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key, fallback) {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
}

function banner(type, text) {
  const div = document.createElement('div');
  div.className = `banner ${type}`;
  div.innerHTML = `<span>${text}</span>`;
  const close = document.createElement('button');
  close.className = 'close';
  close.type = 'button';
  close.ariaLabel = 'Close';
  close.textContent = '×';
  close.addEventListener('click', () => div.remove());
  div.append(close);
  return div;
}

function setStatus(el, type, text) {
  el.innerHTML = '';
  if (!text) return;
  el.append(banner(type, text));
}

/* ----------------------------
   Theme preference (storage)
   ---------------------------- */
function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  els.themeBtn.setAttribute('aria-pressed', String(mode === 'dark'));
  save(STORE_KEYS.theme, mode);
}
(function initTheme() {
  const stored = load(STORE_KEYS.theme, null);
  if (stored) return applyTheme(stored);
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
})();
els.themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur === 'light' ? 'dark' : 'light');
});

/* ----------------------------
   Task model (storage-backed)
   ---------------------------- */
let tasks = load(STORE_KEYS.tasks, []); // [{id, title, done, createdAt}]

function persistTasks() {
  save(STORE_KEYS.tasks, tasks);
}

function addTask(title) {
  const t = { id: uid(), title: title.trim(), done: false, createdAt: Date.now() };
  tasks.unshift(t);
  persistTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  persistTasks();
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  persistTasks();
  renderTasks();
}

function clearTasks() {
  tasks = [];
  persistTasks();
  renderTasks();
}

function renderTasks() {
  els.taskList.innerHTML = '';
  if (!tasks.length) {
    els.taskList.innerHTML = '<li class="badge">No tasks yet. Add one above.</li>';
    return;
  }

  for (const t of tasks) {
    const li = document.createElement('li');
    li.className = `task ${t.done ? 'completed' : ''}`;
    li.dataset.id = t.id;

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = t.done;
    cb.addEventListener('change', () => toggleTask(t.id));

    const span = document.createElement('span');
    span.className = 'title';
    span.textContent = t.title;

    const actions = document.createElement('div');
    actions.className = 'actions';
    const del = document.createElement('button');
    del.className = 'btn btn-ghost';
    del.textContent = 'Delete';
    del.addEventListener('click', () => removeTask(t.id));

    actions.append(del);
    li.append(cb, span, actions);
    els.taskList.append(li);
  }
}

// Initial render
renderTasks();

// Form events
els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = els.title.value.trim();
  if (!val) {
    setStatus(els.taskStatus, 'error', 'Please enter a task title.');
    return;
  }
  addTask(val);
  els.title.value = '';
  els.title.focus();
  setStatus(els.taskStatus, 'info', 'Task added and saved to localStorage.');
});

els.importBtn.addEventListener('click', () => {
  // Example: seed a few tasks to demonstrate storage
  const sample = [
    'Review PR #42',
    'Prepare slides for Web class',
    'Refactor login module',
    'Add unit tests for utils'
  ];
  for (const s of sample) addTask(s);
  setStatus(els.taskStatus, 'info', 'Sample tasks imported.');
});

els.clearBtn.addEventListener('click', () => {
  clearTasks();
  setStatus(els.taskStatus, 'info', 'All tasks cleared from localStorage.');
});

/* ----------------------------
   Fetch external data (with errors handled)
   ---------------------------- */
/**
 * fetchWithTimeout(url, ms):
 * Abort the request after ms milliseconds to avoid hanging UIs.
 */
function fetchWithTimeout(url, ms = 8000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  return fetch(url, { signal: ctl.signal })
    .finally(() => clearTimeout(t));
}

async function loadFeed() {
  // If "simulate error" is on, request an invalid URL to test UI handling.
  const simulateError = els.failToggle.checked;
  const url = simulateError
    ? 'https://jsonplaceholder.typicode.com/____typo____'
    : 'https://jsonplaceholder.typicode.com/posts?_limit=6';

  // Show a loading message
  setStatus(els.fetchStatus, 'info', 'Loading community posts…');

  // Skeleton UI (simple)
  els.feed.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const sk = document.createElement('div');
    sk.className = 'feed-item';
    sk.innerHTML = `
      <div class="banner info"><span class="sr-only">Loading…</span><span style="width:70%;height:14px;background:#eef3ff;display:block;border-radius:8px;"></span></div>
    `;
    els.feed.append(sk);
  }

  try {
    const res = await fetchWithTimeout(url, 8000);
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    const data = await res.json();

    // Render list
    els.feed.innerHTML = '';
    for (const item of data) {
      const card = document.createElement('article');
      card.className = 'feed-item';
      card.innerHTML = `
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.body || 'No description')}</p>
      `;
      els.feed.append(card);
    }

    setStatus(els.fetchStatus, 'info', 'Loaded successfully.');
  } catch (err) {
    console.error(err);
    els.feed.innerHTML = '';

    // Provide a retry button in the error banner
    const wrap = document.createElement('div');
    wrap.className = 'banner error';
    const msg = document.createElement('span');
    msg.textContent = 'Failed to load posts. Check your network and try again.';
    const retry = document.createElement('button');
    retry.className = 'btn';
    retry.type = 'button';
    retry.textContent = 'Retry';
    retry.addEventListener('click', loadFeed);
    wrap.append(msg, retry);

    els.fetchStatus.innerHTML = '';
    els.fetchStatus.append(wrap);
  }
}

// Simple HTML escaper for safety
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Events
els.refreshBtn.addEventListener('click', loadFeed);

// Load once on boot
loadFeed();
