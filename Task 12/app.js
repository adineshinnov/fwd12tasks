/* ==============================================================
   Task 12 — E-Commerce Cart with Theming and Storage
   Features:
     • OOP: Product (base) -> BookProduct / ElectronicProduct / ClothingProduct
     • CartItem + Cart classes
     • Theme (CSS custom properties) + localStorage persistence
     • Add/Remove/Qty controls, totals, tax calc
     • Animations (drawer + toast), responsive + accessible
   ============================================================== */

// ---------- Utilities ----------
const Rs = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

function $(sel) { return document.querySelector(sel); }
function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

// Generate SVG image cover (no external files)
function coverSVG(title = 'Item') {
  const letter = (title.trim()[0] || 'I').toUpperCase();
  const palettes = [
    ['#2563eb','#00c2ff'], ['#6a5cff','#ff7ad9'], ['#00c896','#82eaff'],
    ['#ff7a7a','#ffd6a5'], ['#ffa500','#ffed4a'],
  ];
  const [c1, c2] = palettes[letter.charCodeAt(0) % palettes.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
            font-family="system-ui,-apple-system,Segoe UI,Roboto,Arial" font-size="260"
            fill="rgba(255,255,255,.94)" font-weight="800">${letter}</text>
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function stars(r) {
  const full = Math.floor(r), half = r - full >= 0.5 ? 1 : 0, empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(empty);
}

// ---------- Theme (storage) ----------
const THEME_KEY = 't12:theme';
const root = document.documentElement;
const themeBtn = $('#themeBtn');

function applyTheme(mode) {
  root.setAttribute('data-theme', mode);
  themeBtn.setAttribute('aria-pressed', String(mode === 'dark'));
  localStorage.setItem(THEME_KEY, mode);
}
(function initTheme(){
  const s = localStorage.getItem(THEME_KEY);
  if (s) applyTheme(s);
  else applyTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
themeBtn.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

// ---------- OOP Model ----------
class Product {
  #id;
  constructor({ id, title, price, rating = 0, category = 'general', cover = '' }) {
    this.#id = id ?? crypto.randomUUID();
    this.title = title;
    this.price = Number(price);
    this.rating = Number(rating);
    this.category = category;
    this.cover = cover || coverSVG(title);
    this.type = 'Product';
  }
  get id(){ return this.#id; }
  getBadge(){ return this.type; }
  finalPrice(){ return this.price; }
  oldPrice(){ return null; }
}

class BookProduct extends Product {
  constructor(o){ super(o); this.type = 'Book'; }
  // Example: 10% off for books
  finalPrice(){ return Math.round(this.price * 0.90); }
  oldPrice(){ return this.price; }
}

class ElectronicProduct extends Product {
  constructor(o){ super(o); this.type = 'Electronic'; this.envFee = 0.03; }
  // Example: 3% environmental fee
  finalPrice(){ return Math.round(this.price * (1 + this.envFee)); }
  oldPrice(){ return null; }
}

class ClothingProduct extends Product {
  constructor(o){ super(o); this.type = 'Clothing'; this.seasonalOff = 0.15; }
  finalPrice(){ return Math.round(this.price * (1 - this.seasonalOff)); }
  oldPrice(){ return this.price; }
}

// Factory
function makeProduct(data){
  switch((data.type || '').toLowerCase()){
    case 'book': return new BookProduct(data);
    case 'electronic': return new ElectronicProduct(data);
    case 'clothing': return new ClothingProduct(data);
    default: return new Product(data);
  }
}

class CartItem {
  constructor(product, qty = 1){
    this.product = product;
    this.qty = qty;
  }
  inc(){ this.qty++; }
  dec(){ if (this.qty > 1) this.qty--; }
  total(){ return this.product.finalPrice() * this.qty; }
}

class Cart {
  constructor(){
    this.items = []; // array of CartItem
  }
  // find by product id
  _idx(id){ return this.items.findIndex(ci => ci.product.id === id); }
  add(product, qty = 1){
    const i = this._idx(product.id);
    if (i >= 0) this.items[i].qty += qty;
    else this.items.unshift(new CartItem(product, qty));
  }
  remove(id){ this.items = this.items.filter(ci => ci.product.id !== id); }
  setQty(id, qty){ 
    const i = this._idx(id);
    if (i >= 0) this.items[i].qty = Math.max(1, qty|0);
  }
  inc(id){ const i = this._idx(id); if (i >= 0) this.items[i].inc(); }
  dec(id){ const i = this._idx(id); if (i >= 0) this.items[i].dec(); }
  clear(){ this.items = []; }
  subtotal(){ return this.items.reduce((s, ci) => s + ci.total(), 0); }
  tax(){ return Math.round(this.subtotal() * 0.18); } // 18% GST example
  grand(){ return this.subtotal() + this.tax(); }
  count(){ return this.items.reduce((s, ci) => s + ci.qty, 0); }
  toJSON(){ // persist minimal data
    return this.items.map(ci => ({ id: ci.product.id, qty: ci.qty }));
  }
  fromJSON(arr, productMap){
    this.items = [];
    for (const rec of arr || []) {
      const p = productMap.get(rec.id);
      if (p) this.items.push(new CartItem(p, rec.qty));
    }
  }
}

// ---------- State & Persistence ----------
const STORE_KEY = 't12:cart';
const grid = $('#grid');
const emptyState = $('#empty');

const q = $('#q'), catSel = $('#cat'), sortSel = $('#sort');
const seedBtn = $('#seedBtn');

const openCartBtn = $('#openCartBtn'), closeCartBtn = $('#closeCartBtn');
const clearCartBtn = $('#clearCartBtn'), checkoutBtn = $('#checkoutBtn');
const drawer = $('#cartDrawer'), backdrop = $('#drawerBackdrop');
const cartList = $('#cartList');
const subtotalEl = $('#subtotal'), taxEl = $('#tax'), grandEl = $('#grand'), cartCountEl = $('#cartCount');
const toastEl = $('#toast');

const products = []; // Product instances
const productMap = new Map(); // id -> Product
const cart = new Cart();

// Sample
const samples = [
  { type:'electronic', title:'Noise Smartwatch', price:2499, rating:4.2, category:'electronics' },
  { type:'electronic', title:'USB-C Hub 7-in-1', price:1599, rating:4.0, category:'electronics' },
  { type:'book', title:'Clean Code', price:589, rating:4.7, category:'books' },
  { type:'book', title:'Atomic Habits', price:399, rating:4.6, category:'books' },
  { type:'clothing', title:'Classic Tee — Navy', price:699, rating:4.1, category:'clothing' },
  { type:'clothing', title:'Hoodie — Charcoal', price:1299, rating:4.4, category:'clothing' },
  { type:'electronic', title:'Bluetooth Speaker', price:1499, rating:4.1, category:'electronics' },
  { type:'book', title:'The Pragmatic Programmer', price:675, rating:4.8, category:'books' },
];

function persistCart(){ localStorage.setItem(STORE_KEY, JSON.stringify(cart.toJSON())); }
function restoreCart(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    cart.fromJSON(saved, productMap);
    renderCart();
  } catch { /* ignore */ }
}

// ---------- Rendering ----------
function renderProducts(list){
  grid.innerHTML = '';
  if (!list.length) {
    emptyState.classList.remove('d-none');
    return;
  }
  emptyState.classList.add('d-none');

  for (const p of list) {
    const card = el('article', 'card');

    // media
    const media = el('div', 'card-media');
    const img = new Image(); img.src = p.cover; img.alt = `${p.title} image`;
    const badge = el('span', 'badge-cat', p.category);
    media.append(img, badge);

    // content
    const title = el('h3', 'card-title', p.title);
    const meta  = el('div', 'card-meta', p.getBadge());
    const rating = el('div', 'rating', `${stars(p.rating)}  ${p.rating.toFixed(1)}`);

    const foot = el('div', 'card-foot');
    const priceWrap = el('div', '');
    const price = el('span', 'price', Rs.format(p.finalPrice()));
    const old = p.oldPrice();
    if (old) {
      const oldEl = el('span', 'old', Rs.format(old));
      priceWrap.append(price, oldEl);
    } else priceWrap.append(price);

    const btn = el('button', 'btn primary', 'Add to Cart');
    btn.addEventListener('click', () => {
      cart.add(p, 1);
      persistCart();
      renderCart();
      showToast(`Added “${p.title}”`);
    });

    foot.append(priceWrap, btn);
    card.append(media, title, meta, rating, foot);
    grid.append(card);
  }
}

function getFilteredSorted(){
  const query = (q.value || '').toLowerCase().trim();
  const cat = catSel.value || 'all';
  let list = products.filter(p => {
    const matchQ = p.title.toLowerCase().includes(query) || (p.category||'').toLowerCase().includes(query);
    const matchC = (cat === 'all') || (p.category.toLowerCase() === cat);
    return matchQ && matchC;
  });

  switch (sortSel.value) {
    case 'price-asc':  list.sort((a,b) => a.finalPrice() - b.finalPrice()); break;
    case 'price-desc': list.sort((a,b) => b.finalPrice() - a.finalPrice()); break;
    case 'rating-asc': list.sort((a,b) => a.rating - b.rating); break;
    case 'rating-desc':list.sort((a,b) => b.rating - a.rating); break;
    default: /* insertion order */ break;
  }
  return list;
}

function refresh(){ renderProducts(getFilteredSorted()); }

function renderCart(){
  cartList.innerHTML = '';
  if (!cart.items.length) {
    cartList.append(el('div', 'alert info', 'Your cart is empty.'));
  } else {
    for (const ci of cart.items) {
      const row = el('div', 'item');

      const img = new Image(); img.src = ci.product.cover; img.alt = `${ci.product.title} image`;
      const mid = el('div', '');
      const title = el('p', 'title', ci.product.title);
      const meta = el('div', 'meta', `${ci.product.getBadge()} • ${ci.product.category}`);
      mid.append(title, meta);

      const right = el('div', '');
      const qtyWrap = el('div', 'qty');
      const minus = el('button', 'btn icon', '−');
      minus.addEventListener('click', () => { cart.dec(ci.product.id); persistCart(); renderCart(); });
      const qty = el('span', '', String(ci.qty));
      const plus = el('button', 'btn icon', '+');
      plus.addEventListener('click', () => { cart.inc(ci.product.id); persistCart(); renderCart(); });
      qtyWrap.append(minus, qty, plus);

      const price = el('div', 'meta', Rs.format(ci.total()));
      const rmv = el('button', 'btn ghost rmv', 'Remove');
      rmv.addEventListener('click', () => { cart.remove(ci.product.id); persistCart(); renderCart(); });

      right.append(qtyWrap, price, rmv);
      row.append(img, mid, right);
      cartList.append(row);
    }
  }

  subtotalEl.textContent = Rs.format(cart.subtotal());
  taxEl.textContent = Rs.format(cart.tax());
  grandEl.textContent = Rs.format(cart.grand());
  cartCountEl.textContent = String(cart.count());
}

// ---------- Drawer + Toast ----------
function openDrawer(){
  drawer.hidden = false;
  requestAnimationFrame(() => {
    drawer.classList.add('open');
    openCartBtn.setAttribute('aria-expanded', 'true');
  });
}
function closeDrawer(){
  drawer.classList.remove('open');
  openCartBtn.setAttribute('aria-expanded', 'false');
  drawer.addEventListener('transitionend', () => { drawer.hidden = true; }, { once: true });
}

openCartBtn.addEventListener('click', openDrawer);
closeCartBtn.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 1400);
}

// ---------- Events ----------
q.addEventListener('input', refresh);
catSel.addEventListener('change', refresh);
sortSel.addEventListener('change', refresh);

seedBtn.addEventListener('click', () => {
  if (!products.length) {
    for (const s of samples) {
      const p = makeProduct({ ...s, cover: coverSVG(s.title) });
      products.push(p);
      productMap.set(p.id, p);
    }
  }
  refresh();
  // After seeding, try to restore cart (maps ids to instances)
  restoreCart();
});

clearCartBtn.addEventListener('click', () => { cart.clear(); persistCart(); renderCart(); });
checkoutBtn.addEventListener('click', () => { showToast('Checkout not implemented (demo).'); });

// ---------- Boot ----------
(function boot(){
  // Seed immediately for easy testing:
  for (const s of samples) {
    const p = makeProduct({ ...s, cover: coverSVG(s.title) });
    products.push(p);
    productMap.set(p.id, p);
  }
  refresh();
  // restore saved cart referencing current product instances
  restoreCart();
})();
