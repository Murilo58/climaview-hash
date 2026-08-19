const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast'

export async function fetchWeather(lat, lon, days = 7) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl,uv_index',
    daily: `temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max,uv_index_max,sunrise,sunset`,
    forecast_days: Math.min(days, 16),
    timezone: 'America/Sao_Paulo',
    language: 'pt',
  })

  const response = await fetch(`${WEATHER_API_BASE}?${params}`)

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    current: parseCurrentWeather(data.current),
    forecast: parseForecast(data.daily),
  }
}

function parseCurrentWeather(current) {
  return {
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    pressure: current.pressure_msl,
    uvIndex: Math.round(current.uv_index * 10) / 10,
    precipitation: current.precipitation,
    weatherCode: current.weather_code,
    description: getWeatherDescription(current.weather_code),
  }
}

function parseForecast(daily) {
  return daily.time.map((time, idx) => ({
    date: time,
    tempMax: daily.temperature_2m_max[idx],
    tempMin: daily.temperature_2m_min[idx],
    precipitation: daily.precipitation_sum[idx],
    precipitationChance: daily.precipitation_probability_max[idx],
    windSpeed: daily.wind_speed_10m_max[idx],
    uvIndex: Math.round(daily.uv_index_max[idx] * 10) / 10,
    sunrise: daily.sunrise[idx],
    sunset: daily.sunset[idx],
    weatherCode: daily.weather_code[idx],
    description: getWeatherDescription(daily.weather_code[idx]),
  }))
}

function getWeatherDescription(code) {
  const descriptions = {
    0: 'Céu limpo',
    1: 'Parcialmente nublado',
    2: 'Nublado',
    3: 'Muito nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro com depósito',
    51: 'Garoa leve',
    53: 'Garoa moderada',
    55: 'Garoa densa',
    61: 'Chuva fraca',
    63: 'Chuva moderada',
    65: 'Chuva forte',
    71: 'Neve fraca',
    73: 'Neve moderada',
    75: 'Neve forte',
    77: 'Grãos de neve',
    80: 'Chuva fraca',
    81: 'Chuva forte',
    82: 'Chuva muito forte',
    85: 'Neve fraca',
    86: 'Neve forte',
    95: 'Tempestade',
    96: 'Tempestade com granizo fraco',
    99: 'Tempestade com granizo forte',
  }
  return descriptions[code] || 'Desconhecido'
}

export function getWeatherIcon(code) {
  const icons = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌧️',
    53: '🌧️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '⛈️',
    71: '🌨️',
    73: '🌨️',
    75: '🌨️',
    77: '🌨️',
    80: '🌧️',
    81: '⛈️',
    82: '⛈️',
    85: '🌨️',
    86: '🌨️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
  }
  return icons[code] || '🤷'
}
