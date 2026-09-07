import { WeatherData, WeatherForecastDay } from '../types';

// Map WMO Weather Interpretation Codes to friendly icons & strings
const wmoWeatherMap: Record<number, { condition: string; icon: string }> = {
  0: { condition: 'Clear Sky ☀️', icon: '☀️' },
  1: { condition: 'Mainly Clear 🌤️', icon: '🌤️' },
  2: { condition: 'Partly Cloudy ⛅', icon: '⛅' },
  3: { condition: 'Overcast ☁️', icon: '☁️' },
  45: { condition: 'Foggy 🌫️', icon: '🌫️' },
  48: { condition: 'Depositing Rime Fog 🌫️', icon: '🌫️' },
  51: { condition: 'Light Drizzle 🌧️', icon: '🌧️' },
  53: { condition: 'Moderate Drizzle 🌧️', icon: '🌧️' },
  55: { condition: 'Dense Drizzle 🌧️', icon: '🌧️' },
  61: { condition: 'Slight Rain 🌦️', icon: '🌦️' },
  63: { condition: 'Moderate Rain 🌧️', icon: '🌧️' },
  65: { condition: 'Heavy Rain 🌧️⛈️', icon: '⛈️' },
  80: { condition: 'Light Rain Showers 🌦️', icon: '🌦️' },
  81: { condition: 'Moderate Rain Showers 🌧️', icon: '🌧️' },
  82: { condition: 'Violent Rain Showers ⛈️', icon: '⛈️' },
  95: { condition: 'Thunderstorm ⛈️', icon: '⛈️' },
};

const defaultLocation = {
  name: 'Guntur, Andhra Pradesh',
  lat: 16.3067,
  lon: 80.4365,
};

export const fetchWeatherForLocation = async (
  lat?: number,
  lon?: number,
  locationNameSearch?: string
): Promise<WeatherData> => {
  let targetLat = lat || defaultLocation.lat;
  let targetLon = lon || defaultLocation.lon;
  let targetName = locationNameSearch || defaultLocation.name;

  try {
    // If a search string is provided without coordinates, resolve lat/lon using Open-Meteo Geocoding
    if (locationNameSearch && (!lat || !lon)) {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        locationNameSearch
      )}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData.results && geoData.results.length > 0) {
          const match = geoData.results[0];
          targetLat = match.latitude;
          targetLon = match.longitude;
          targetName = `${match.name}${match.admin1 ? ', ' + match.admin1 : ''}`;
        }
      }
    }

    // Fetch live weather data from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean,wind_speed_10m_max&timezone=auto`;
    const res = await fetch(weatherUrl);
    
    if (!res.ok) {
      throw new Error(`Open-Meteo API response not ok: ${res.statusText}`);
    }

    const data = await res.json();
    const current = data.current;
    const daily = data.daily;

    const weatherMeta = wmoWeatherMap[current.weather_code] || {
      condition: 'Partly Cloudy ⛅',
      icon: '⛅',
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecast: WeatherForecastDay[] = [];

    if (daily && daily.time) {
      for (let i = 0; i < Math.min(5, daily.time.length); i++) {
        const dateObj = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Today' : daysOfWeek[dateObj.getDay()];
        const code = daily.weather_code[i];
        const dayMeta = wmoWeatherMap[code] || { condition: 'Partly Cloudy', icon: '⛅' };

        forecast.push({
          dayName,
          dateStr: daily.time[i],
          tempMax: Math.round(daily.temperature_2m_max[i]),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          weatherCode: code,
          condition: dayMeta.condition,
          icon: dayMeta.icon,
          rainProbability: Math.round(daily.precipitation_probability_max?.[i] ?? (i === 1 ? 70 : 20)),
          humidity: Math.round(daily.relative_humidity_2m_mean?.[i] ?? 65),
          windSpeed: Math.round(daily.wind_speed_10m_max?.[i] ?? 12),
        });
      }
    }

    return {
      locationName: targetName,
      latitude: targetLat,
      longitude: targetLon,
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      rainProbability: forecast[0]?.rainProbability || 20,
      condition: weatherMeta.condition,
      icon: weatherMeta.icon,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      forecast: forecast.length > 0 ? forecast : getFallbackForecast(),
    };
  } catch (err) {
    console.warn('Live weather fetch failed, using realistic mock weather:', err);
    return getMockWeatherData(targetName, targetLat, targetLon);
  }
};

const getFallbackForecast = (): WeatherForecastDay[] => {
  return [
    { dayName: 'Today', dateStr: '2026-08-11', tempMax: 31, tempMin: 24, weatherCode: 2, condition: 'Partly Cloudy ⛅', icon: '⛅', rainProbability: 20, humidity: 68, windSpeed: 14 },
    { dayName: 'Tomorrow', dateStr: '2026-08-12', tempMax: 29, tempMin: 23, weatherCode: 63, condition: 'Moderate Rain 🌧️', icon: '🌧️', rainProbability: 75, humidity: 82, windSpeed: 18 },
    { dayName: 'Thu', dateStr: '2026-08-13', tempMax: 30, tempMin: 24, weatherCode: 1, condition: 'Mainly Clear 🌤️', icon: '🌤️', rainProbability: 15, humidity: 64, windSpeed: 11 },
    { dayName: 'Fri', dateStr: '2026-08-14', tempMax: 32, tempMin: 25, weatherCode: 0, condition: 'Sunny ☀️', icon: '☀️', rainProbability: 10, humidity: 58, windSpeed: 10 },
    { dayName: 'Sat', dateStr: '2026-08-15', tempMax: 33, tempMin: 25, weatherCode: 0, condition: 'Sunny ☀️', icon: '☀️', rainProbability: 5, humidity: 55, windSpeed: 9 },
  ];
};

export const getMockWeatherData = (
  locationName: string = 'Guntur, Andhra Pradesh',
  lat: number = 16.3067,
  lon: number = 80.4365
): WeatherData => {
  return {
    locationName,
    latitude: lat,
    longitude: lon,
    temp: 31,
    feelsLike: 34,
    humidity: 68,
    windSpeed: 14,
    rainProbability: 20,
    condition: 'Partly Cloudy ⛅',
    icon: '⛅',
    lastUpdated: '10:30 AM',
    forecast: getFallbackForecast(),
  };
};
