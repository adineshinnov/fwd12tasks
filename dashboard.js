/* -------------------------
   Route guard + header user
   ------------------------- */
const user = sessionStorage.getItem('demo:activeUser');
if (!user) window.location.replace('index.html');

const hello = document.getElementById('hello');
const logoutBtn = document.getElementById('logoutBtn');
hello.textContent = `Hi, ${user}`;
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('demo:activeUser');
  window.location.href = 'index.html';
});

/* -------------------------
   DOM elements
   ------------------------- */
const menu = document.getElementById('menu');
const frame = document.getElementById('taskFrame');
const frameTitle = document.getElementById('frameTitle');
const frameStatus = document.getElementById('frameStatus');
const openNewTab = document.getElementById('openNewTab');

/* -------------------------
   Task map (1..12)
   Folder names must exist physically:
   ./Task 1/index.html  ... ./Task 12/index.html
   ------------------------- */
const TASKS = Array.from({ length: 12 }).map((_, i) => {
  const n = i + 1;
  return {
    id: `task-${n}`,
    title: `Task ${n}`,
    // Path to each task's index.html
    path: `./Task ${n}/index.html`,
  };
});

/* -------------------------
   Render sidebar menu
   ------------------------- */
function renderMenu(activeId) {
  menu.innerHTML = '';
  TASKS.forEach(t => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = t.title;
    a.dataset.id = t.id;
    if (t.id === activeId) a.classList.add('active');
    a.addEventListener('click', (e) => {
      e.preventDefault();
      loadTask(t.id);
    });
    li.append(a);
    menu.append(li);
  });
}

/* -------------------------
   Load a task into iframe
   ------------------------- */
function setActiveLink(id) {
  [...menu.querySelectorAll('a')].forEach(a => {
    a.classList.toggle('active', a.dataset.id === id);
  });
}

function loadTask(id) {
  const t = TASKS.find(x => x.id === id) || TASKS[0];
  setActiveLink(t.id);
  frameTitle.textContent = t.title;

  // Build a safe URL (handles spaces)
  const url = encodeURI(t.path);

  // Show loading status
  frameStatus.textContent = ' — Loading…';

  // Update "open in new tab"
  openNewTab.href = url;

  // Load iframe
  frame.src = url;

  // When loaded, clear status
  const onLoad = () => { frameStatus.textContent = ''; frame.removeEventListener('load', onLoad); };
  frame.addEventListener('load', onLoad);

  // Persist selection for this session
  sessionStorage.setItem('demo:lastTask', t.id);
}

/* -------------------------
   Init: restore last task (if any)
   ------------------------- */
(function boot() {
  const last = sessionStorage.getItem('demo:lastTask');
  renderMenu(last || TASKS[0].id);
  loadTask(last || TASKS[0].id);
})();
