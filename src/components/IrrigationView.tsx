import React from 'react';
import { Droplets, Sun, Wind, Clock, CheckCircle2 } from 'lucide-react';

export const IrrigationView: React.FC = () => {
  const schedule = [
    { day: 'Mon', et0: '4.5 mm', kc: '0.75', etc: '3.38 mm', rain: '0.0 mm', irr: '3.75 mm', vol: '93.7 m3', run: '1.5 hrs' },
    { day: 'Tue', et0: '4.8 mm', kc: '0.75', etc: '3.60 mm', rain: '0.0 mm', irr: '4.00 mm', vol: '100.0 m3', run: '1.6 hrs' },
    { day: 'Wed', et0: '5.1 mm', kc: '0.76', etc: '3.88 mm', rain: '12.0 mm', irr: '0.00 mm', vol: '0.0 m3', run: '0.0 hrs' },
    { day: 'Thu', et0: '4.2 mm', kc: '0.76', etc: '3.19 mm', rain: '0.0 mm', irr: '3.50 mm', vol: '87.5 m3', run: '1.4 hrs' },
    { day: 'Fri', et0: '4.6 mm', kc: '0.77', etc: '3.54 mm', rain: '0.0 mm', irr: '3.90 mm', vol: '97.5 m3', run: '1.5 hrs' },
    { day: 'Sat', et0: '4.9 mm', kc: '0.77', etc: '3.77 mm', rain: '0.0 mm', irr: '4.20 mm', vol: '105.0 m3', run: '1.7 hrs' },
    { day: 'Sun', et0: '5.2 mm', kc: '0.78', etc: '4.05 mm', rain: '0.0 mm', irr: '4.50 mm', vol: '112.5 m3', run: '1.8 hrs' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 sm:p-8 rounded-2xl border border-agri-fresh/20 shadow-xl">
        <div className="flex items-center space-x-3 text-agri-yellow mb-2">
          <Droplets className="w-6 h-6 text-agri-yellow" />
          <span className="text-sm font-bold tracking-wider uppercase text-agri-yellow">Irrigation Scheduling Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">FAO-56 Penman-Monteith Water Balance</h1>
        <p className="text-gray-200 max-w-3xl text-sm sm:text-base font-medium">
          Computes daily reference evapotranspiration ($ET_o$), crop coefficient growth curves ($K_c$), soil moisture depletion, and drip irrigation runtime schedules.
        </p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-extrabold text-agri-dark flex items-center gap-2">
            <Clock className="w-5 h-5 text-agri-deep" /> 7-Day Drip System Irrigation Schedule
          </h3>
          <span className="text-xs text-agri-dark font-bold bg-agri-fresh/20 px-3 py-1.5 rounded-full border border-agri-fresh">Drip Efficiency: 90%</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 font-extrabold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Day</th>
                <th className="px-6 py-4">FAO-56 ET0</th>
                <th className="px-6 py-4">Kc Factor</th>
                <th className="px-6 py-4">Crop ETc</th>
                <th className="px-6 py-4">Effective Rain</th>
                <th className="px-6 py-4">Gross Irrigation</th>
                <th className="px-6 py-4">Water Volume</th>
                <th className="px-6 py-4">Pump Runtime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-semibold">
              {schedule.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-extrabold text-agri-dark">{s.day}</td>
                  <td className="px-6 py-4">{s.et0}</td>
                  <td className="px-6 py-4 text-amber-700 font-bold">{s.kc}</td>
                  <td className="px-6 py-4">{s.etc}</td>
                  <td className="px-6 py-4 text-emerald-700 font-bold">{s.rain}</td>
                  <td className="px-6 py-4 font-extrabold text-agri-deep">{s.irr}</td>
                  <td className="px-6 py-4">{s.vol}</td>
                  <td className="px-6 py-4 font-bold text-amber-700">{s.run}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
