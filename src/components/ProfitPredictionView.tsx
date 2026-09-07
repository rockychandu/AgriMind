import React from 'react';
import { DollarSign, TrendingUp, ShieldAlert, Sparkles, PieChart } from 'lucide-react';

export const ProfitPredictionView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <TrendingUp className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Profit Prediction Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Monte-Carlo Profit Simulation & Break-Even Analytics</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Simulates 1,000 price & yield market volatility iterations to calculate expected net returns, break-even yield ($Y_{BE}$), break-even price ($P_{BE}$), and ROI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Gross Revenue Projection</span>
          <div className="text-3xl font-extrabold text-agri-dark">$41,366.25</div>
          <span className="text-xs text-agri-deep font-bold">$16,546.50 / hectare</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Projected Net Profit</span>
          <div className="text-3xl font-extrabold text-emerald-700">$40,116.25</div>
          <span className="text-xs text-amber-700 font-extrabold">ROI: 3,209%</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Break-Even Yield ($Y_{BE}$)</span>
          <div className="text-3xl font-extrabold text-agri-dark">0.56 <span className="text-sm font-bold text-gray-600">t / ha</span></div>
          <span className="text-xs text-emerald-700 font-extrabold">Attainable Yield: 36.77 t/ha</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Break-Even Price ($P_{BE}$)</span>
          <div className="text-3xl font-extrabold text-agri-dark">$6.80 <span className="text-sm font-bold text-gray-600">/ tonne</span></div>
          <span className="text-xs text-emerald-700 font-extrabold">Market Price: $450.00 / tonne</span>
        </div>
      </div>

      {/* Monte-Carlo Scenario Simulation */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-agri-dark flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-agri-deep" /> Monte-Carlo 1,000 Scenario Simulations
          </h3>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">Loss Probability: 0.0% (Very Low Risk)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs text-gray-600 font-bold uppercase">Pessimistic Scenario (P10)</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">$32,500.00</div>
            <p className="text-xs text-gray-700 font-medium mt-1">Simulated 15% price drop + severe weather anomaly.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs text-gray-600 font-bold uppercase">Baseline Scenario (P50)</span>
            <div className="text-2xl font-extrabold text-agri-deep mt-1">$40,116.25</div>
            <p className="text-xs text-gray-700 font-medium mt-1">Expected yield & baseline commodity price.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs text-gray-600 font-bold uppercase">Optimistic Scenario (P90)</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">$48,200.00</div>
            <p className="text-xs text-gray-700 font-medium mt-1">Peak seasonal commodity price + optimal weather.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
