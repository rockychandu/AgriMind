import React, { useState } from 'react';
import { Package, Calendar, AlertTriangle, CheckCircle2, Filter, Sparkles } from 'lucide-react';

interface IndianCropFertilizerSpec {
  id: string;
  name: string;
  localName: string;
  season: string;
  targetYield: string;
  dapKg: number;
  ureaKg: number;
  mopKg: number;
  zincKg: number;
  totalCost: string;
  splitStage1: string;
  splitStage2: string;
  splitStage3: string;
  safetyNote: string;
}

const INDIAN_CROP_FERTILIZER_DATABASE: Record<string, IndianCropFertilizerSpec> = {
  rice_indica: {
    id: 'rice_indica',
    name: 'Paddy Rice (धान / धान)',
    localName: 'Kharif Paddy',
    season: 'Kharif',
    targetYield: '5.5 tonnes/ha',
    dapKg: 130,
    ureaKg: 240,
    mopKg: 100,
    zincKg: 25,
    totalCost: '$215.00 / ha (₹17,800/ha)',
    splitStage1: 'Basal (At Transplanting): 100% DAP (130 kg) + 25% Urea (60 kg) + 50% MOP (50 kg) + Zinc Sulfate (25 kg).',
    splitStage2: 'Active Tillering (21-25 Days): Top-dress 45% Urea (108 kg) into 2-3 cm standing water.',
    splitStage3: 'Panicle Initiation (45-50 Days): Top-dress 30% Urea (72 kg) + 50% MOP (50 kg).',
    safetyNote: 'Apply Zinc Sulfate separately from DAP to avoid insoluble Zinc Phosphate precipitation.'
  },
  wheat_bread: {
    id: 'wheat_bread',
    name: 'Bread Wheat (गेहूं)',
    localName: 'Rabi Gehun',
    season: 'Rabi',
    targetYield: '5.0 tonnes/ha',
    dapKg: 140,
    ureaKg: 260,
    mopKg: 85,
    zincKg: 20,
    totalCost: '$210.00 / ha (₹17,400/ha)',
    splitStage1: 'Basal (At Sowing): 100% DAP (140 kg) + 25% Urea (65 kg) + 50% MOP (42.5 kg).',
    splitStage2: 'First Crown Root Initiation Irrigation (21 Days): Top-dress 45% Urea (117 kg).',
    splitStage3: 'Jointing / Flowering Irrigation (45 Days): Top-dress 30% Urea (78 kg) + 50% MOP (42.5 kg).',
    safetyNote: 'Ensure soil moisture prior to top-dressing Urea to minimize ammonia gas volatilization.'
  },
  cotton_bt: {
    id: 'cotton_bt',
    name: 'Bt Cotton (कपास)',
    localName: 'Hybrid Kapas',
    season: 'Kharif',
    targetYield: '2.8 tonnes/ha',
    dapKg: 130,
    ureaKg: 235,
    mopKg: 100,
    zincKg: 25,
    totalCost: '$225.00 / ha (₹18,600/ha)',
    splitStage1: 'Basal (At Planting): 100% DAP (130 kg) + 20% Urea (47 kg) + 50% MOP (50 kg).',
    splitStage2: 'Square Formation Stage (45 Days): Top-dress 40% Urea (94 kg) + MagSulf.',
    splitStage3: 'Peak Flowering & Boll Development (75 Days): Top-dress 40% Urea (94 kg) + 50% MOP (50 kg).',
    safetyNote: 'Maintain fertilizer placement 5 cm lateral to seed row to protect taproot seedlings.'
  },
  sugarcane_hybrid: {
    id: 'sugarcane_hybrid',
    name: 'Sugarcane (गन्ना)',
    localName: 'Ganna Crop',
    season: 'Perennial',
    targetYield: '85.0 tonnes/ha',
    dapKg: 195,
    ureaKg: 550,
    mopKg: 200,
    zincKg: 30,
    totalCost: '$410.00 / ha (₹34,000/ha)',
    splitStage1: 'Basal (At Planting): 100% DAP (195 kg) + 20% Urea (110 kg) + 33% MOP (66 kg).',
    splitStage2: 'First Tillering (45-60 Days): Top-dress 40% Urea (220 kg) + 33% MOP (66 kg).',
    splitStage3: 'Grand Growth Phase (90-120 Days): Earthing up with 40% Urea (220 kg) + 34% MOP (68 kg).',
    safetyNote: 'Heavy nitrogen application requires adequate irrigation to maximize cane sucrose percentage.'
  },
  chickpea_kabuli: {
    id: 'chickpea_kabuli',
    name: 'Chickpea / Gram (चना)',
    localName: 'Rabi Chana',
    season: 'Rabi',
    targetYield: '2.2 tonnes/ha',
    dapKg: 130,
    ureaKg: 40,
    mopKg: 50,
    zincKg: 15,
    totalCost: '$110.00 / ha (₹9,100/ha)',
    splitStage1: 'Basal (At Sowing): 100% DAP (130 kg) + 100% Urea (40 kg starter) + 100% MOP (50 kg).',
    splitStage2: 'Branching Phase (30 Days): Foliar spray 2% DAP solution if required.',
    splitStage3: 'Pod Formation (60 Days): Foliar spray 1% 19:19:19 water-soluble NPK.',
    safetyNote: 'Inoculate seed with Rhizobium and PSB bio-fertilizers for maximum nitrogen fixation.'
  },
  mustard_indian: {
    id: 'mustard_indian',
    name: 'Indian Mustard (सरसों)',
    localName: 'Sarson Oilseed',
    season: 'Rabi',
    targetYield: '2.1 tonnes/ha',
    dapKg: 90,
    ureaKg: 180,
    mopKg: 65,
    zincKg: 20,
    totalCost: '$145.00 / ha (₹12,000/ha)',
    splitStage1: 'Basal (At Sowing): 100% DAP (90 kg) + 50% Urea (90 kg) + 100% MOP (65 kg) + Elemental Sulfur (20 kg).',
    splitStage2: 'First Irrigation / Rosette Stage (25-30 Days): Top-dress 50% Urea (90 kg).',
    splitStage3: 'Flowering Stage (50 Days): Foliar spray 0.5% Borax solution for pod setting.',
    safetyNote: 'Sulfur application is essential for oil synthesis and glucosinolate quality.'
  },
  tomato_hybrid: {
    id: 'tomato_hybrid',
    name: 'Hybrid Tomato (टमाटर)',
    localName: 'Tamatar Crop',
    season: 'Kharif/Rabi',
    targetYield: '45.0 tonnes/ha',
    dapKg: 195,
    ureaKg: 350,
    mopKg: 250,
    zincKg: 25,
    totalCost: '$380.00 / ha (₹31,500/ha)',
    splitStage1: 'Basal (Transplanting): 100% DAP (195 kg) + 25% Urea (87.5 kg) + 33% MOP (83 kg).',
    splitStage2: 'Vegetative Growth (25 Days): Fertigate 40% Urea (140 kg) + 33% MOP (83 kg).',
    splitStage3: 'Fruit Harvest Phase (55-80 Days): Fertigate 35% Urea (122.5 kg) + 34% MOP (84 kg) + Calcium Nitrate.',
    safetyNote: 'Foliar Calcium Nitrate application prevents blossom end rot in heavy fruiting varieties.'
  },
};

export const FertilizerView: React.FC = () => {
  const [selectedCropKey, setSelectedCropKey] = useState<string>('wheat_bread');
  const cropSpec = INDIAN_CROP_FERTILIZER_DATABASE[selectedCropKey] || INDIAN_CROP_FERTILIZER_DATABASE['wheat_bread'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl text-white">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <Package className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Indian Fertilizer Recommendation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Crop-Specific Fertilizer Recommendations & Timelines</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Select an Indian crop below to generate custom stoichiometric fertilizer dosages (Urea, DAP, MOP, SSP, Zinc Sulfate) and stage-by-stage split application schedules.
        </p>
      </div>

      {/* Interactive Crop Selection Dropdown */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-agri-dark text-agri-yellow flex items-center justify-center font-bold">
            🌱
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Select Target Indian Crop</label>
            <span className="text-lg font-extrabold text-agri-dark">Choose Cultivar for Custom Fertilizer Plan</span>
          </div>
        </div>

        <select
          value={selectedCropKey}
          onChange={(e) => setSelectedCropKey(e.target.value)}
          className="w-full md:w-80 bg-gray-50 border-2 border-agri-fresh rounded-xl px-4 py-3 text-sm font-extrabold text-agri-dark focus:outline-none focus:ring-2 focus:ring-agri-deep cursor-pointer shadow-sm"
        >
          {Object.values(INDIAN_CROP_FERTILIZER_DATABASE).map((c) => (
            <option key={c.id} value={c.id} className="bg-white text-agri-dark font-bold">
              {c.name} ({c.season})
            </option>
          ))}
        </select>
      </div>

      {/* Selected Crop Specific Recommended Fertilizer Dosages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold uppercase text-agri-dark bg-agri-fresh/20 px-3 py-1 rounded-full border border-agri-fresh">Basal Phosphate</span>
          <h3 className="text-lg font-extrabold text-agri-dark">DAP (18:46:0)</h3>
          <div className="text-3xl font-extrabold text-agri-deep">{cropSpec.dapKg} <span className="text-sm font-bold text-gray-600">kg / ha</span></div>
          <p className="text-xs text-gray-700 font-semibold">Supplies water-soluble phosphorus for root establishment.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold uppercase text-agri-dark bg-agri-fresh/20 px-3 py-1 rounded-full border border-agri-fresh">Nitrogen Top-Dress</span>
          <h3 className="text-lg font-extrabold text-agri-dark">Prilled Urea (46% N)</h3>
          <div className="text-3xl font-extrabold text-agri-deep">{cropSpec.ureaKg} <span className="text-sm font-bold text-gray-600">kg / ha</span></div>
          <p className="text-xs text-gray-700 font-semibold">Split into 3 phenological dressings across growth stages.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold uppercase text-agri-dark bg-agri-fresh/20 px-3 py-1 rounded-full border border-agri-fresh">Potassium (K)</span>
          <h3 className="text-lg font-extrabold text-agri-dark">MOP / SOP (60% K2O)</h3>
          <div className="text-3xl font-extrabold text-agri-deep">{cropSpec.mopKg} <span className="text-sm font-bold text-gray-600">kg / ha</span></div>
          <p className="text-xs text-gray-700 font-semibold">Enhances grain filling, test weight, and disease resistance.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">Micro-Nutrient</span>
          <h3 className="text-lg font-extrabold text-agri-dark">Zinc Sulfate (33% Zn)</h3>
          <div className="text-3xl font-extrabold text-amber-700">{cropSpec.zincKg} <span className="text-sm font-bold text-gray-600">kg / ha</span></div>
          <p className="text-xs text-gray-700 font-semibold">Prevents khaira disease and interveinal chlorosis.</p>
        </div>
      </div>

      {/* Stage-by-Stage Split Application Schedule */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-agri-dark flex items-center gap-2">
              <Calendar className="w-5 h-5 text-agri-deep" /> Stage-by-Stage Split Application Schedule for {cropSpec.name}
            </h3>
            <span className="text-xs text-gray-500 font-bold">Target Yield Baseline: {cropSpec.targetYield}</span>
          </div>
          <span className="text-sm font-extrabold text-agri-deep bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-300">
            Total Input Cost: {cropSpec.totalCost}
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="font-extrabold text-agri-dark text-base">Stage 1: Basal Application</div>
            <p className="text-xs text-gray-800 font-bold leading-relaxed">{cropSpec.splitStage1}</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="font-extrabold text-agri-dark text-base">Stage 2: Vegetative Growth Top-Dressing</div>
            <p className="text-xs text-gray-800 font-bold leading-relaxed">{cropSpec.splitStage2}</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="font-extrabold text-agri-dark text-base">Stage 3: Flowering & Grain Filling Top-Dressing</div>
            <p className="text-xs text-gray-800 font-bold leading-relaxed">{cropSpec.splitStage3}</p>
          </div>
        </div>

        {/* Safety Guideline Warning */}
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-start space-x-3 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs font-bold leading-relaxed">
            <span className="uppercase text-amber-800 block mb-0.5">Agronomic Safety Guideline:</span>
            {cropSpec.safetyNote}
          </div>
        </div>
      </div>
    </div>
  );
};
