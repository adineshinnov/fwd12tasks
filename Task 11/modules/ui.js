export const $ = (sel) => document.querySelector(sel);

export function setStatus(el, type, text) {
  el.textContent = text || '';
  el.style.color = type === 'error' ? '#b91c1c' : 'var(--muted)';
}

/** Render the suggestions dropdown and wire click handlers */
export function showSuggestions(box, results, onPick) {
  box.innerHTML = '';
  if (!results.length) { box.classList.remove('show'); return; }

  for (const r of results) {
    const item = document.createElement('div');
    item.className = 'suggestion';
    item.role = 'option';
    item.textContent = r.label;
    item.addEventListener('click', () => onPick(r));
    box.append(item);
  }
  box.classList.add('show');
}

/** Current weather card */
export function renderCurrent(container, data) {
  container.innerHTML = `
    <div class="current-head">
      <div>
        <div class="place">${escapeHtml(data.place)}</div>
        <div class="meta">${new Date(data.time).toLocaleString()}</div>
      </div>
      <div class="wx-icon" aria-hidden="true">${data.icon}</div>
    </div>

    <div class="current-row">
      <div class="temp">
        <span class="t" style="font-size:32px;font-weight:800">${Math.round(data.temp)}°C</span>
        <div class="meta">${escapeHtml(data.desc)}</div>
      </div>
      <div class="current-kv">
        <span>Feels like <strong>${Math.round(data.feels)}°C</strong></span>
        <span>Wind <strong>${data.wind} m/s</strong></span>
        <span>Humidity <strong>${data.humidity}%</strong></span>
      </div>
    </div>
  `;
}

/** Forecast day cards */
export function renderForecast(container, days) {
  container.innerHTML = '';
  for (const d of days) {
    const card = document.createElement('article');
    card.className = 'day card';
    const dt = new Date(d.date);
    card.innerHTML = `
      <div class="meta">${dt.toLocaleDateString(undefined, { weekday:'short', day:'2-digit', month:'short' })}</div>
      <div class="wx" aria-hidden="true">${d.icon}</div>
      <div class="t">${Math.round(d.tmax)}° / ${Math.round(d.tmin)}°C</div>
      <div class="r">${escapeHtml(d.desc)} • ${Math.round(d.prec)} mm</div>
    `;
    container.append(card);
  }
}

/* ---------- helpers ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

