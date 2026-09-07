import React, { useState } from 'react';
import { Sprout, Filter, Sparkles, CheckCircle, Droplets, Thermometer } from 'lucide-react';

const INDIAN_CROP_SELECTION_CATALOG = [
  { id: 'rice_indica', name: 'Paddy Rice (धान)', category: 'Cereal', season: 'Kharif', optN: 120, optP: 60, optK: 60, optPh: 6.2, optRain: 1200, yield: '5.5 t/ha', desc: 'Lowland puddle rice thriving in clay loam alluvial soil with high rainfall.' },
  { id: 'wheat_bread', name: 'Bread Wheat (गेहूं)', category: 'Cereal', season: 'Rabi', optN: 130, optP: 65, optK: 50, optPh: 6.8, optRain: 480, yield: '5.0 t/ha', desc: 'Rabi cereal requiring cool winter growth conditions and moderate irrigation.' },
  { id: 'cotton_bt', name: 'Bt Cotton (कपास)', category: 'Fiber', season: 'Kharif', optN: 120, optP: 60, optK: 60, optPh: 7.5, optRain: 750, yield: '2.8 t/ha', desc: 'Deep taproot fiber crop suited for black cotton vertisol soils.' },
  { id: 'sugarcane_hybrid', name: 'Sugarcane (गन्ना)', category: 'Cash Crop', season: 'Perennial', optN: 280, optP: 90, optK: 120, optPh: 7.0, optRain: 1600, yield: '85.0 t/ha', desc: 'Heavy nitrogen feeder cash crop requiring abundant irrigation.' },
  { id: 'chickpea_kabuli', name: 'Chickpea / Gram (चना)', category: 'Pulse', season: 'Rabi', optN: 25, optP: 60, optK: 30, optPh: 7.2, optRain: 320, yield: '2.2 t/ha', desc: 'Drought-tolerant leguminous pulse fixing atmospheric nitrogen.' },
  { id: 'mustard_indian', name: 'Indian Mustard (सरसों)', category: 'Oilseed', season: 'Rabi', optN: 90, optP: 40, optK: 40, optPh: 6.8, optRain: 310, yield: '2.1 t/ha', desc: 'Essential Rabi oilseed high in erucic acid oil profiles.' },
  { id: 'peanut_runner', name: 'Groundnut (मूंगफली)', category: 'Oilseed', season: 'Kharif', optN: 35, optP: 60, optK: 50, optPh: 6.5, optRain: 520, yield: '2.8 t/ha', desc: 'Subterranean pegging legume thriving in light sandy loam soil.' },
  { id: 'tomato_hybrid', name: 'Hybrid Tomato (टमाटर)', category: 'Vegetable', season: 'Kharif/Rabi', optN: 180, optP: 90, optK: 150, optPh: 6.5, optRain: 600, yield: '45.0 t/ha', desc: 'High-value solanaceous vegetable with high market returns.' },
];

export const CropSelectionView: React.FC = () => {
  const [ph, setPh] = useState<number>(6.8);
  const [nitrogen, setNitrogen] = useState<number>(90);
  const [phosphorus, setPhosphorus] = useState<number>(45);
  const [potassium, setPotassium] = useState<number>(50);
  const [rainfall, setRainfall] = useState<number>(600);
  const [temperature, setTemperature] = useState<number>(24);

  const evaluatedCrops = INDIAN_CROP_SELECTION_CATALOG.map((crop) => {
    const diffN = Math.abs(nitrogen - crop.optN) / 200;
    const diffPh = Math.abs(ph - crop.optPh) / 2;
    const diffRain = Math.abs(rainfall - crop.optRain) / 1000;
    const score = Math.round(Math.max(10, (1 - (diffN * 0.4 + diffPh * 0.3 + diffRain * 0.3)) * 100));
    return { ...crop, score };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <Sprout className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Crop Selection Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Indian Crop Selection & Parameter Matcher</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Filter and select suitable Indian crops based on your farm's exact soil NPK levels, pH value, temperature, and seasonal rainfall.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
        <div>
          <label className="block text-xs font-bold text-agri-dark mb-1">Nitrogen (N): {nitrogen} kg/ha</label>
          <input type="range" min="10" max="250" step="5" value={nitrogen} onChange={(e) => setNitrogen(parseInt(e.target.value))} className="w-full accent-agri-deep" />
        </div>
        <div>
          <label className="block text-xs font-bold text-agri-dark mb-1">Soil pH: {ph} pH</label>
          <input type="range" min="4.5" max="9.0" step="0.1" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} className="w-full accent-amber-600" />
        </div>
        <div>
          <label className="block text-xs font-bold text-agri-dark mb-1">Rainfall: {rainfall} mm</label>
          <input type="range" min="200" max="2000" step="50" value={rainfall} onChange={(e) => setRainfall(parseInt(e.target.value))} className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {evaluatedCrops.map((c) => (
          <div key={c.id} className="bg-white border-2 border-gray-200 hover:border-agri-fresh transition-all rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-agri-dark text-agri-yellow text-xs font-bold rounded-full">{c.season}</span>
                <span className="text-agri-deep font-extrabold text-sm">{c.score}% Match</span>
              </div>
              <h3 className="text-lg font-extrabold text-agri-dark mb-1">{c.name}</h3>
              <p className="text-xs text-gray-700 font-semibold mb-3">{c.desc}</p>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-xs text-gray-800 font-bold">
              <span>Expected Yield:</span>
              <span className="text-agri-deep">{c.yield}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
