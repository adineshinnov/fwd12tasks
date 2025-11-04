/* ==========================================================
   Task 9 — Async API Calls and Layout Adjustments
   EXACT skills per spec:
     ✔ fetch + async/await (primary request to REST Countries)
     ✔ Promise chaining + Promise.all (secondary requests to Open-Meteo)
     ✔ DOM updates + graceful loading/error UI
   APIs (no API key needed, CORS-enabled):
     • https://restcountries.com/v3.1/region/{region}
     • https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m
   ========================================================== */

const grid   = document.getElementById('grid');
const statusEl = document.getElementById('status');
const regionSel = document.getElementById('region');
const limitInp  = document.getElementById('limit');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');

/* ----------------------------
   Utilities
   ---------------------------- */

/** Make a simple element with classes and text */
function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

/** Local “hero” image via Picsum seed (no API call needed) */
function heroImageFor(name) {
  const seed = encodeURIComponent(name);
  // dynamic image URL; browser fetches it directly
  return `https://picsum.photos/seed/${seed}/800/480`;
}

/** Clear grid and show skeleton cards while loading */
function showSkeleton(count = 6) {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const card = el('article', 'card');
    const hero = el('div', 'hero skeleton'); hero.style.height = '200px';
    const body = el('div', 'body');
    const t1 = el('div', 'skeleton'); t1.style.height = '18px'; t1.style.width = '70%';
    const t2 = el('div', 'skeleton'); t2.style.height = '14px'; t2.style.width = '50%';
    const foot = el('div', 'foot');
    const f1 = el('div', 'skeleton'); f1.style.height = '16px'; f1.style.width = '40%';
    const f2 = el('div', 'skeleton'); f2.style.height = '32px'; f2.style.width = '80px';
    body.append(t1, t2);
    foot.append(f1, f2);
    card.append(hero, body, foot);
    grid.append(card);
  }
}

/** Render a country card */
function renderCard({ name, capital, region, population, flag, hero, weather }) {
  const card = el('article', 'card');

  const img = new Image();
  img.className = 'hero';
  img.alt = `${name} scenic`;
  img.src = hero;
  card.append(img);

  const body = el('div', 'body');
  const title = el('h3', 'title', name);
  const meta  = el('div', 'meta', `${region} • Capital: ${capital || '-'}`);
  const wx    = el('div', 'wx', weather
    ? `Now: ${weather.temp}°C, Wind: ${weather.wind} m/s`
    : `Weather: n/a`);
  body.append(title, meta, wx);
  card.append(body);

  const foot = el('div', 'foot');
  const pop = el('span', '', `Population: ${population.toLocaleString()}`);
  const btn = el('button', 'btn', 'Details');
  btn.addEventListener('click', () => {
    alert(`${name}\nCapital: ${capital || '-'}\nRegion: ${region}\nPopulation: ${population.toLocaleString()}\n\nWeather now: ${
      weather ? `${weather.temp}°C, wind ${weather.wind} m/s` : 'n/a'
    }`);
  });
  foot.append(pop, btn);
  card.append(foot);

  grid.append(card);
}

/* ----------------------------
   Async flow
   ---------------------------- */

/**
 * 1) async/await to fetch countries in a region
 * 2) Promise chaining + Promise.all to fetch weather for each (lat/lon)
 */
async function loadDestinations() {
  const region = regionSel.value || 'asia';
  const limit  = Math.max(3, Math.min(24, Number(limitInp.value) || 8));

  statusEl.textContent = `Loading ${region}…`;
  showSkeleton(Math.min(limit, 8));

  try {
    // --- Primary request (async/await)
    const url = `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}?fields=name,capital,latlng,flags,region,population`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`REST Countries error: ${res.status}`);
    const data = await res.json();

    // Shape data and keep only those with coordinates
    const countries = data
      .filter(c => Array.isArray(c.latlng) && c.latlng.length >= 2)
      .slice(0, limit)
      .map(c => ({
        name: c.name?.common || 'Unknown',
        capital: Array.isArray(c.capital) ? c.capital[0] : c.capital || '',
        region: c.region || region,
        lat: c.latlng[0],
        lon: c.latlng[1],
        flag: c.flags?.svg || c.flags?.png || '',
        population: Number(c.population) || 0,
        hero: heroImageFor(c.name?.common || 'travel')
      }));

    if (!countries.length) {
      grid.innerHTML = '';
      statusEl.textContent = 'No destinations found.';
      grid.setAttribute('aria-busy', 'false');
      return;
    }

    statusEl.textContent = `Fetched ${countries.length} countries. Loading weather…`;

    // --- Secondary requests: chain & aggregate (Promise.all)
    // Build requests
    const weatherPromises = countries.map(c => {
      const wurl = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,wind_speed_10m`;
      // demonstrate Promise chaining (no await here)
      return fetch(wurl)
        .then(r => (r.ok ? r.json() : Promise.reject(new Error('Open-Meteo failed'))))
        .then(j => ({
          temp: j?.current?.temperature_2m ?? null,
          wind: j?.current?.wind_speed_10m ?? null
        }))
        .catch(() => ({ temp: null, wind: null })); // continue even if weather fails
    });

    // Wait for all weather calls to resolve (good or fallback)
    const wx = await Promise.all(weatherPromises);

    // Merge & render
    grid.innerHTML = '';
    countries.forEach((c, i) => renderCard({ ...c, weather: wx[i] }));

    statusEl.textContent = 'Done.';
  } catch (err) {
    console.error(err);
    grid.innerHTML = '';
    statusEl.textContent = 'Failed to load data. Please try again.';
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}

/* ----------------------------
   Events
   ---------------------------- */
loadBtn.addEventListener('click', loadDestinations);
clearBtn.addEventListener('click', () => {
  grid.innerHTML = '';
  statusEl.textContent = 'Cleared.';
});
