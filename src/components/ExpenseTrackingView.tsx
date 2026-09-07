import React from 'react';
import { DollarSign, PieChart, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ExpenseTrackingView: React.FC = () => {
  const expenses = [
    { cat: 'Seeds & Seedlings', desc: 'Hybrid Tomato Seedlings', qty: '2.5 ha', amount: '$350.00', pct: '28%' },
    { cat: 'Fertilizers', desc: 'DAP (180kg) + Urea (284kg)', qty: '2.5 ha', amount: '$540.65', pct: '43%' },
    { cat: 'Crop Protection', desc: 'Preventative Bio-fungicide', qty: '2 sprays', amount: '$120.00', pct: '10%' },
    { cat: 'Labor & Field Work', desc: 'Transplanting & Weeding', qty: '12 days', amount: '$150.00', pct: '12%' },
    { cat: 'Irrigation & Utilities', desc: 'Drip Power & Water', qty: '447 m3', amount: '$89.35', pct: '7%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <DollarSign className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Farm Expense Tracking Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">Field Ledger & Activity-Based Costing</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Multi-field operational financial ledger, cost per hectare breakdown, and regional benchmark expense comparison.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Field Expenses</span>
          <div className="text-3xl font-extrabold text-agri-dark">$1,250.00</div>
          <span className="text-xs text-agri-deep font-bold">$500.00 / hectare</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Regional Benchmark Comparison</span>
          <div className="text-3xl font-extrabold text-emerald-700">-15.4% <span className="text-sm font-bold text-gray-600">vs Peers</span></div>
          <span className="text-xs text-emerald-800 font-extrabold">Below Regional Benchmark ($650/ha)</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
          <span className="text-xs font-bold text-gray-500 uppercase">Budget Status</span>
          <div className="text-3xl font-extrabold text-amber-700">On Benchmark</div>
          <span className="text-xs text-gray-700 font-semibold">Optimal Fertilizer & Energy Allocation</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-extrabold text-agri-dark">Itemized Operational Expense Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 font-extrabold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Expense Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Quantity / Unit</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Share %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-semibold">
              {expenses.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-extrabold text-agri-dark">{e.cat}</td>
                  <td className="px-6 py-4">{e.desc}</td>
                  <td className="px-6 py-4 text-gray-600">{e.qty}</td>
                  <td className="px-6 py-4 font-bold text-amber-700">{e.amount}</td>
                  <td className="px-6 py-4 font-extrabold text-agri-deep">{e.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
