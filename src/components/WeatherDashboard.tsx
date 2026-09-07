import React from 'react';
import { WeatherData, Language } from '../types';
import { getTranslation } from '../services/i18n';
import { MapPin, RefreshCw, Thermometer, Droplets, Wind, CloudRain, Sun, ShieldAlert, Sparkles, Sprout } from 'lucide-react';

interface WeatherDashboardProps {
  weatherData: WeatherData;
  language: Language;
  onRefreshWeather: () => void;
  locationName: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  weatherData,
  language,
  onRefreshWeather,
  locationName,
}) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <section className="py-10 bg-agri-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        
        {/* Header & Location Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-agri-fresh/20 shadow-agri-card">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agri-fresh/15 text-agri-deep text-xs font-bold mb-1">
              <Sun className="w-3.5 h-3.5 text-agri-yellow" />
              <span>FARM WEATHER STATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark tracking-tight">
              {t('weatherHeader')}
            </h1>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-agri-deep" />
              <span>{locationName}</span>
              <span className="text-gray-300">•</span>
              <span>Updated: {weatherData.lastUpdated}</span>
            </p>
          </div>

          <button
            onClick={onRefreshWeather}
            className="px-4 py-2.5 rounded-xl bg-agri-deep text-white font-bold text-xs sm:text-sm hover:bg-agri-dark transition-all flex items-center space-x-2 shadow"
          >
            <RefreshCw className="w-4 h-4 text-agri-fresh" />
            <span>Refresh Live Data</span>
          </button>
        </div>

        {/* Current Weather Main Banner */}
        <div className="bg-gradient-to-br from-agri-dark via-agri-dark to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-agri-fresh/30 relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Main Temperature */}
            <div className="md:col-span-6 space-y-2">
              <span className="text-xs font-mono text-agri-leaf uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                CURRENT CONDITIONS
              </span>
              <div className="flex items-center space-x-4 pt-2">
                <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter">
                  {weatherData.temp}°C
                </span>
                <div className="text-4xl">{weatherData.icon}</div>
              </div>
              <p className="text-lg font-bold text-agri-fresh">
                {weatherData.condition}
              </p>
              <p className="text-xs text-gray-300">
                {t('feelsLike')}: <span className="font-bold text-white">{weatherData.feelsLike}°C</span>
              </p>
            </div>

            {/* Right Weather Metrics Grid */}
            <div className="md:col-span-6 grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center space-y-1">
                <Droplets className="w-5 h-5 text-sky-400 mx-auto" />
                <span className="text-[10px] text-gray-300 font-bold uppercase block">{t('humidity')}</span>
                <span className="text-lg font-extrabold text-white block">{weatherData.humidity}%</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center space-y-1">
                <Wind className="w-5 h-5 text-teal-400 mx-auto" />
                <span className="text-[10px] text-gray-300 font-bold uppercase block">{t('windSpeed')}</span>
                <span className="text-lg font-extrabold text-white block">{weatherData.windSpeed} km/h</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center space-y-1">
                <CloudRain className="w-5 h-5 text-blue-400 mx-auto" />
                <span className="text-[10px] text-gray-300 font-bold uppercase block">{t('rainProb')}</span>
                <span className="text-lg font-extrabold text-agri-yellow block">{weatherData.rainProbability}%</span>
              </div>
            </div>

          </div>
        </div>

        {/* 5-Day Farm Weather Forecast */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-agri-dark">
              {t('forecast5Day')}
            </h2>
            <span className="text-xs text-agri-deep font-bold bg-agri-fresh/15 px-3 py-1 rounded-full">
              HOURLY SYNCED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, idx) => (
              <div
                key={idx}
                className="bg-agri-cream rounded-2xl p-4 border border-agri-fresh/20 text-center space-y-2 hover:border-agri-fresh transition-all hover:shadow shadow-sm"
              >
                <span className="text-sm font-bold text-agri-dark block">{day.dayName}</span>
                <div className="text-3xl py-1">{day.icon}</div>
                <div className="text-sm font-extrabold text-agri-dark">
                  {day.tempMax}° <span className="text-gray-400 text-xs font-normal">/ {day.tempMin}°C</span>
                </div>
                <div className="text-[11px] font-semibold text-gray-600 truncate">
                  {day.condition}
                </div>
                <div className="pt-2 border-t border-gray-200 text-[10px] space-y-1 font-medium text-gray-500">
                  <div className="flex items-center justify-between text-blue-700 font-bold">
                    <span>Rain</span>
                    <span>{day.rainProbability}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Humid</span>
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wind</span>
                    <span>{day.windSpeed}k/h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agricultural Weather Insights */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20 space-y-6">
          <div className="flex items-center space-x-2 text-agri-dark font-extrabold text-xl">
            <Sparkles className="w-6 h-6 text-agri-fresh" />
            <h2>{t('agriInsights')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Insight 1: Rain Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-900">🌧 Rain Alert</h3>
                <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                  {weatherData.forecast[1]?.rainProbability >= 50
                    ? 'Rain is likely within the next 24-36 hours. Avoid applying foliar chemical sprays before rainfall.'
                    : 'Low rainfall probability for the next 48 hours. Favorable dry spell.'}
                </p>
              </div>
            </div>

            {/* Insight 2: Humidity Disease Risk */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900">💧 Humidity Risk</h3>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {weatherData.humidity >= 65
                    ? 'High relative humidity (> 65%) increases fungal leaf spot proliferation. Inspect leaf undersides daily.'
                    : 'Moderate humidity levels reduce fungal spore germination risk.'}
                </p>
              </div>
            </div>

            {/* Insight 3: Field Inspection */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900">🌱 Field Condition</h3>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Current temperature ({weatherData.temp}°C) and wind conditions ({weatherData.windSpeed} km/h) are favorable for field walking and scouting.
                </p>
              </div>
            </div>

            {/* Insight 4: Spray Advisory */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-purple-900">🧴 Spray Window Advisory</h3>
                <p className="text-xs text-purple-800 mt-1 leading-relaxed">
                  Best window for foliar fertilizer or fungicide application: Early morning between 6:00 AM – 9:00 AM.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
