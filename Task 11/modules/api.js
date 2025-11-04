// Open-Meteo geocoding + forecast (no API key required)
// Docs:
//  - https://geocoding-api.open-meteo.com/v1/search?name=City
//  - https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..
// Using async/await + promise handling

function ok(res) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function searchPlaces(query, count = 5) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;
  const data = await fetch(url).then(ok);
  const results = (data.results || []).map(r => ({
    label: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}, ${r.country}`,
    lat: r.latitude,
    lon: r.longitude
  }));
  return results;
}

export async function getWeather(lat, lon) {
  // current + 7-day forecast
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'auto'
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  return fetch(url).then(ok);
}
