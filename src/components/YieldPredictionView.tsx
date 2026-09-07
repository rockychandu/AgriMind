import React from 'react';
import { TrendingUp, ShieldAlert, BarChart3, Sparkles } from 'lucide-react';

export const YieldPredictionView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <TrendingUp className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Yield Prediction Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Multi-Factor Yield & Stress Penalty Analytics</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Radiation Use Efficiency (RUE) crop biomass simulator combined with multi-factor stress reduction deductions (Water, Temperature, Salinity, Disease).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold text-gray-500 uppercase">Potential Genetic Yield</span>
          <div className="text-3xl font-extrabold text-agri-dark">45.0 <span className="text-sm text-gray-600 font-bold">t / ha</span></div>
          <p className="text-xs text-gray-700 font-semibold">Maximum theoretical potential under zero stress.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold text-gray-500 uppercase">Attainable Field Yield</span>
          <div className="text-3xl font-extrabold text-agri-deep">36.77 <span className="text-sm text-gray-600 font-bold">t / ha</span></div>
          <p className="text-xs text-emerald-700 font-extrabold">Confidence interval: 32.35 - 41.18 t/ha</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-3">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Stress Deduction</span>
          <div className="text-3xl font-extrabold text-amber-700">18.3% <span className="text-sm text-gray-600 font-bold">Deduction</span></div>
          <p className="text-xs text-amber-800 font-extrabold">81.7% Attainable yield retention factor.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-6">
        <h3 className="text-xl font-extrabold text-agri-dark">Abiotic & Biotic Yield Penalty Breakdown</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 font-bold">Water Deficit Penalty</span><span className="text-amber-700 font-extrabold">8.2% Deduction</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full w-[45%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 font-bold">Temperature Heat Stress Penalty</span><span className="text-amber-700 font-extrabold">4.5% Deduction</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full w-[25%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 font-bold">Salinity EC Penalty</span><span className="text-emerald-700 font-extrabold">0.0% Deduction</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full w-[0%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 font-bold">Pest & Disease Pressure</span><span className="text-amber-700 font-extrabold">5.6% Deduction</span></div>
            <div className="w-full bg-gray-200 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full w-[30%]"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
