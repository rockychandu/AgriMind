import React, { useState } from 'react';
import { Compass, Sparkles, Sprout, Filter, CheckCircle2, ArrowRight, Activity, Droplets, Thermometer, ShieldCheck } from 'lucide-react';

interface IndianCrop {
  id: str;
  name: str;
  localName: str;
  category: str;
  season: str;
  optN: number;
  optP: number;
  optK: number;
  optPhMin: number;
  optPhMax: number;
  optRainfallMin: number;
  optRainfallMax: number;
  optTempMin: number;
  optTempMax: number;
  yieldHa: str;
  desc: str;
}

const INDIAN_CROPS_DATABASE = [
  {
    id: 'rice_indica',
    name: 'Paddy Rice (धान)',
    localName: 'Dhaan / Chawal',
    category: 'Cereal',
    season: 'Kharif (Monsoon)',
    optN: 120, optP: 60, optK: 60,
    optPhMin: 5.5, optPhMax: 7.2,
    optRainfallMin: 1000, optRainfallMax: 2000,
    optTempMin: 20, optTempMax: 35,
    yieldHa: '5.5 tonnes/ha',
    desc: 'Major staple Kharif crop thriving in high rainfall and puddle clay loam soils across India.'
  },
  {
    id: 'wheat_bread',
    name: 'Bread Wheat (गेहूं)',
    localName: 'Gehun',
    category: 'Cereal',
    season: 'Rabi (Winter)',
    optN: 130, optP: 65, optK: 50,
    optPhMin: 6.0, optPhMax: 7.5,
    optRainfallMin: 400, optRainfallMax: 650,
    optTempMin: 12, optTempMax: 25,
    yieldHa: '5.0 tonnes/ha',
    desc: 'Primary Rabi cereal crop requiring cool winter temperatures and well-drained alluvial soil.'
  },
  {
    id: 'cotton_bt',
    name: 'Bt Cotton (कपास)',
    localName: 'Kapas',
    category: 'Fiber / Cash Crop',
    season: 'Kharif',
    optN: 120, optP: 60, optK: 60,
    optPhMin: 6.5, optPhMax: 8.2,
    optRainfallMin: 600, optRainfallMax: 1000,
    optTempMin: 22, optTempMax: 38,
    yieldHa: '2.8 tonnes/ha',
    desc: 'Major commercial fiber crop suited for deep Vertisol black cotton soils of central and western India.'
  },
  {
    id: 'sugarcane_hybrid',
    name: 'Sugarcane (गन्ना)',
    localName: 'Ganna',
    category: 'Cash Crop',
    season: 'Perennial (12-14 Months)',
    optN: 250, optP: 85, optK: 120,
    optPhMin: 6.5, optPhMax: 7.8,
    optRainfallMin: 1200, optRainfallMax: 2200,
    optTempMin: 22, optTempMax: 38,
    yieldHa: '85.0 tonnes/ha',
    desc: 'High sucrose heavy feeder crop widely cultivated in Uttar Pradesh, Maharashtra, and Tamil Nadu.'
  },
  {
    id: 'chickpea_kabuli',
    name: 'Chickpea / Gram (चना)',
    localName: 'Chana',
    category: 'Pulse',
    season: 'Rabi',
    optN: 25, optP: 60, optK: 30,
    optPhMin: 6.2, optPhMax: 8.0,
    optRainfallMin: 300, optRainfallMax: 500,
    optTempMin: 14, optTempMax: 28,
    yieldHa: '2.2 tonnes/ha',
    desc: 'Leading protein-rich pulse crop with Rhizobium atmospheric nitrogen fixation capabilities.'
  },
  {
    id: 'mustard_indian',
    name: 'Indian Mustard / Raya (सरसों)',
    localName: 'Sarson',
    category: 'Oilseed',
    season: 'Rabi',
    optN: 90, optP: 40, optK: 40,
    optPhMin: 6.0, optPhMax: 7.8,
    optRainfallMin: 250, optRainfallMax: 450,
    optTempMin: 12, optTempMax: 26,
    yieldHa: '2.1 tonnes/ha',
    desc: 'Essential winter oilseed crop adapted to dryland and loamy soils of Rajasthan, Haryana, and UP.'
  },
  {
    id: 'peanut_runner',
    name: 'Groundnut / Peanut (मूंगफली)',
    localName: 'Moongphali',
    category: 'Oilseed',
    season: 'Kharif / Summer',
    optN: 35, optP: 60, optK: 50,
    optPhMin: 6.0, optPhMax: 7.2,
    optRainfallMin: 500, optRainfallMax: 800,
    optTempMin: 22, optTempMax: 34,
    yieldHa: '2.8 tonnes/ha',
    desc: 'Subterranean pegging oilseed thriving in sandy loam friable soils of Gujarat and Andhra Pradesh.'
  },
  {
    id: 'tomato_hybrid',
    name: 'Hybrid Tomato (टमाटर)',
    localName: 'Tamatar',
    category: 'Vegetable',
    season: 'All-Season (Kharif/Rabi)',
    optN: 180, optP: 90, optK: 150,
    optPhMin: 6.0, optPhMax: 7.0,
    optRainfallMin: 500, optRainfallMax: 900,
    optTempMin: 18, optTempMax: 30,
    yieldHa: '45.0 tonnes/ha',
    desc: 'High-value commercial vegetable crop demanding balanced NPK fertigation and warm days.'
  },
  {
    id: 'potato_table',
    name: 'Table Potato (आलू)',
    localName: 'Aloo',
    category: 'Tuber',
    season: 'Rabi',
    optN: 150, optP: 80, optK: 180,
    optPhMin: 5.5, optPhMax: 6.8,
    optRainfallMin: 450, optRainfallMax: 700,
    optTempMin: 15, optTempMax: 24,
    yieldHa: '30.0 tonnes/ha',
    desc: 'Major tuber crop requiring cool night temperatures and heavy potassium nutrition for tuberization.'
  },
  {
    id: 'maize_field',
    name: 'Field Maize / Corn (मक्का)',
    localName: 'Makka',
    category: 'Cereal',
    season: 'Kharif / Rabi',
    optN: 150, optP: 70, optK: 70,
    optPhMin: 6.0, optPhMax: 7.5,
    optRainfallMin: 550, optRainfallMax: 950,
    optTempMin: 18, optTempMax: 34,
    yieldHa: '7.0 tonnes/ha',
    desc: 'Versatile cereal crop widely grown across Karnataka, Telangana, Bihar, and MP for grain and feed.'
  },
];

export const CropRecommendationView: React.FC = () => {
  // Input parameters state
  const [nitrogen, setNitrogen] = useState<number>(90);
  const [phosphorus, setPhosphorus] = useState<number>(45);
  const [potassium, setPotassium] = useState<number>(50);
  const [ph, setPh] = useState<number>(6.8);
  const [rainfall, setRainfall] = useState<number>(650);
  const [humidity, setHumidity] = useState<number>(65);
  const [temperature, setTemperature] = useState<number>(24);
  const [seasonFilter, setSeasonFilter] = useState<string>('All');

  // Recommendation algorithm calculating match score for Indian crops
  const calculateCropRecommendations = () => {
    return INDIAN_CROPS_DATABASE.map((crop) => {
      // 1. NPK Distance Score
      const diffN = Math.abs(nitrogen - crop.optN) / 200;
      const diffP = Math.abs(phosphorus - crop.optP) / 100;
      const diffK = Math.abs(potassium - crop.optK) / 150;
      const npkScore = Math.max(0.1, 1 - (diffN * 0.4 + diffP * 0.3 + diffK * 0.3));

      // 2. pH Match Score
      let phScore = 1.0;
      if (ph < crop.optPhMin) phScore = Math.max(0.2, 1 - (crop.optPhMin - ph) / 2);
      else if (ph > crop.optPhMax) phScore = Math.max(0.2, 1 - (ph - crop.optPhMax) / 2);

      // 3. Rainfall Match Score
      let rainScore = 1.0;
      if (rainfall < crop.optRainfallMin) rainScore = Math.max(0.2, rainfall / crop.optRainfallMin);
      else if (rainfall > crop.optRainfallMax) rainScore = Math.max(0.3, 1 - (rainfall - crop.optRainfallMax) / 1500);

      // 4. Temp Match Score
      let tempScore = 1.0;
      if (temperature < crop.optTempMin) tempScore = Math.max(0.2, 1 - (crop.optTempMin - temperature) / 15);
      else if (temperature > crop.optTempMax) tempScore = Math.max(0.2, 1 - (temperature - crop.optTempMax) / 15);

      // Overall Composite Match Score (0 - 100%)
      const finalScore = Math.round((npkScore * 0.35 + phScore * 0.25 + rainScore * 0.25 + tempScore * 0.15) * 100);

      return {
        ...crop,
        matchScore: finalScore,
        npkScorePct: Math.round(npkScore * 100),
        phScorePct: Math.round(phScore * 100),
        rainScorePct: Math.round(rainScore * 100),
        tempScorePct: Math.round(tempScore * 100),
      };
    })
    .filter((c) => seasonFilter === 'All' || c.season.toLowerCase().includes(seasonFilter.toLowerCase()))
    .sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendedCrops = calculateCropRecommendations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <Compass className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Indian Crop Recommendation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Parameter-Based Crop Recommendation Form</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Enter your soil soil test parameters (Nitrogen, Phosphorus, Potassium, pH) and climate parameters (Rainfall, Humidity, Temperature) below to generate instant agronomic recommendations for major Indian crops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Parameter Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-extrabold text-agri-dark flex items-center gap-2">
              <Filter className="w-5 h-5 text-agri-deep" /> Soil & Climate Parameters
            </h2>
            <span className="text-xs bg-agri-fresh/20 text-agri-dark px-3 py-1 rounded-full font-bold">Interactive Form</span>
          </div>

          <div className="space-y-4">
            {/* Season Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cropping Season Filter</label>
              <select
                value={seasonFilter}
                onChange={(e) => setSeasonFilter(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-3 py-2 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
              >
                <option value="All">All Seasons (Kharif, Rabi, Perennial)</option>
                <option value="Kharif">Kharif Season (Monsoon / Rainfed)</option>
                <option value="Rabi">Rabi Season (Winter / Irrigation)</option>
              </select>
            </div>

            {/* Nitrogen Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Nitrogen (N) - Soil Level:</span>
                <span className="text-agri-deep font-extrabold">{nitrogen} kg/ha (ppm)</span>
              </div>
              <input
                type="range" min="10" max="250" step="5" value={nitrogen}
                onChange={(e) => setNitrogen(parseInt(e.target.value))}
                className="w-full accent-agri-deep"
              />
            </div>

            {/* Phosphorus Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Phosphorus (P) - Soil Level:</span>
                <span className="text-agri-deep font-extrabold">{phosphorus} kg/ha (ppm)</span>
              </div>
              <input
                type="range" min="5" max="120" step="5" value={phosphorus}
                onChange={(e) => setPhosphorus(parseInt(e.target.value))}
                className="w-full accent-agri-deep"
              />
            </div>

            {/* Potassium Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Potassium (K) - Soil Level:</span>
                <span className="text-agri-deep font-extrabold">{potassium} kg/ha (ppm)</span>
              </div>
              <input
                type="range" min="15" max="250" step="5" value={potassium}
                onChange={(e) => setPotassium(parseInt(e.target.value))}
                className="w-full accent-agri-deep"
              />
            </div>

            {/* pH Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Soil pH Value:</span>
                <span className="text-amber-700 font-extrabold">{ph} pH</span>
              </div>
              <input
                type="range" min="4.5" max="9.0" step="0.1" value={ph}
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Rainfall Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Annual / Seasonal Rainfall:</span>
                <span className="text-blue-700 font-extrabold">{rainfall} mm</span>
              </div>
              <input
                type="range" min="150" max="2200" step="50" value={rainfall}
                onChange={(e) => setRainfall(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Humidity Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Relative Humidity:</span>
                <span className="text-teal-700 font-extrabold">{humidity}%</span>
              </div>
              <input
                type="range" min="20" max="95" step="5" value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            {/* Temperature Input */}
            <div>
              <div className="flex justify-between text-xs font-bold text-agri-dark mb-1">
                <span>Average Temperature:</span>
                <span className="text-red-700 font-extrabold">{temperature} °C</span>
              </div>
              <input
                type="range" min="8" max="42" step="1" value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>
          </div>
        </div>

        {/* Recommended Indian Crops Display */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-agri-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-agri-deep" /> Top Recommended Indian Crops ({recommendedCrops.length})
            </h2>
            <span className="text-xs font-bold text-gray-600">Sorted by Agronomic Match Score</span>
          </div>

          <div className="space-y-4">
            {recommendedCrops.map((crop, idx) => (
              <div
                key={crop.id}
                className="bg-white border-2 border-gray-200 hover:border-agri-fresh rounded-2xl p-6 shadow-lg transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-agri-dark text-agri-yellow text-xs font-extrabold rounded-full">
                        #{idx + 1} Rank
                      </span>
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
                        {crop.season}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {crop.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-agri-dark">{crop.name}</h3>
                    <p className="text-xs text-gray-500 font-bold">{crop.localName}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-agri-deep">{crop.matchScore}%</div>
                    <span className="text-xs font-bold text-gray-600">Match Score</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-semibold leading-relaxed">{crop.desc}</p>

                {/* Match Score Parameters Breakdown */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-200 text-center">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">NPK Match</span>
                    <span className="text-xs font-extrabold text-agri-dark">{crop.npkScorePct}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">pH Match</span>
                    <span className="text-xs font-extrabold text-agri-dark">{crop.phScorePct}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">Rainfall Match</span>
                    <span className="text-xs font-extrabold text-agri-dark">{crop.rainScorePct}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">Temp Match</span>
                    <span className="text-xs font-extrabold text-agri-dark">{crop.tempScorePct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
