// Minimal WMO weather code mapping -> emoji + description
// https://open-meteo.com/en/docs

const MAP = {
  0:  { e: '☀️', d: 'Clear sky' },
  1:  { e: '🌤️', d: 'Mainly clear' },
  2:  { e: '⛅', d: 'Partly cloudy' },
  3:  { e: '☁️', d: 'Overcast' },
  45: { e: '🌫️', d: 'Fog' },
  48: { e: '🌫️', d: 'Depositing rime fog' },
  51: { e: '🌦️', d: 'Light drizzle' },
  53: { e: '🌦️', d: 'Drizzle' },
  55: { e: '🌧️', d: 'Dense drizzle' },
  61: { e: '🌦️', d: 'Slight rain' },
  63: { e: '🌧️', d: 'Rain' },
  65: { e: '🌧️', d: 'Heavy rain' },
  66: { e: '🌨️', d: 'Freezing rain' },
  67: { e: '🌨️', d: 'Heavy freezing rain' },
  71: { e: '🌨️', d: 'Slight snow' },
  73: { e: '🌨️', d: 'Snow' },
  75: { e: '❄️', d: 'Heavy snow' },
  77: { e: '❄️', d: 'Snow grains' },
  80: { e: '🌦️', d: 'Rain showers' },
  81: { e: '🌧️', d: 'Moderate showers' },
  82: { e: '🌧️', d: 'Violent showers' },
  85: { e: '🌨️', d: 'Snow showers' },
  86: { e: '🌨️', d: 'Heavy snow showers' },
  95: { e: '⛈️', d: 'Thunderstorm' },
  96: { e: '⛈️', d: 'Thunderstorm w/ hail' },
  99: { e: '⛈️', d: 'Severe thunderstorm' },
};

export function iconFor(code) {
  return (MAP[code]?.e) || '🌡️';
}
export function describeCode(code) {
  return (MAP[code]?.d) || 'Weather';
}
