import React from 'react';
import { TestTube, ShieldCheck, Activity, Award, AlertTriangle } from 'lucide-react';

export const SoilAnalysisView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <TestTube className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Soil Analysis Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Soil Health & Nutrient Profiling</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Complete stoichiometry breakdown covering NPK macronutrients, micro-nutrients (Zn, Fe, B), pH buffering, Electrical Conductivity, and Soil Health Index (SHI).
        </p>
      </div>

      {/* Soil Health Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-agri-deep">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Soil Health Index</span>
            <div className="text-3xl font-extrabold text-agri-dark">74.5 <span className="text-sm font-bold text-agri-deep">/ 100</span></div>
            <span className="text-xs text-agri-deep font-bold">Good Agro-Ecological Health</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">pH Condition</span>
            <div className="text-3xl font-extrabold text-agri-dark">6.8 <span className="text-sm font-bold text-gray-600">Neutral</span></div>
            <span className="text-xs text-gray-700 font-bold">Optimal Nutrient Mobility</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Electrical Conductivity</span>
            <div className="text-3xl font-extrabold text-agri-dark">1.1 <span className="text-sm font-bold text-gray-600">dS/m</span></div>
            <span className="text-xs text-emerald-700 font-bold">Non-Saline Hazard</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-lime-100 flex items-center justify-center text-lime-800">
            <TestTube className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Organic Carbon</span>
            <div className="text-3xl font-extrabold text-agri-dark">0.65%</div>
            <span className="text-xs text-amber-700 font-bold">Moderate (1.12% SOM)</span>
          </div>
        </div>
      </div>

      {/* Nutrient Status Grid */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-6">
        <h2 className="text-xl font-extrabold text-agri-dark">Nutrient Stoichiometry & Deficit Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-800 font-bold">Nitrogen (N)</span><span className="text-amber-700 font-extrabold">Low (28 ppm)</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full w-[45%]"></div></div>
            <p className="text-xs text-gray-700 font-medium">Deficit: 35 kg/ha. Apply split Urea dressing.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-800 font-bold">Phosphorus (P)</span><span className="text-emerald-700 font-extrabold">Optimal (18 ppm)</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full w-[70%]"></div></div>
            <p className="text-xs text-gray-700 font-medium">Sufficient starter DAP balance available.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-800 font-bold">Potassium (K)</span><span className="text-emerald-700 font-extrabold">Optimal (175 ppm)</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full w-[80%]"></div></div>
            <p className="text-xs text-gray-700 font-medium">High cation capacity maintains K retention.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
