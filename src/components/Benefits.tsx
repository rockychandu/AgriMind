import React from 'react';
import { Leaf, CloudRain, Bot, Users } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Leaf,
      title: 'Detect Crop Problems Early',
      description: 'Identify likely fungal, bacterial, or viral crop health issues from leaf photos with instant confidence metrics.',
      color: 'text-agri-fresh bg-agri-fresh/15',
    },
    {
      icon: CloudRain,
      title: 'Weather-Aware Treatment Windows',
      description: 'Never waste expensive pesticide sprays before heavy rains. Know exact safe spray windows based on hourly forecasts.',
      color: 'text-sky-500 bg-sky-500/15',
    },
    {
      icon: Bot,
      title: 'AI-Powered Simple Guidance',
      description: 'Translates complex agronomic research into simple, actionable steps that any farmer can execute with confidence.',
      color: 'text-amber-500 bg-amber-500/15',
    },
    {
      icon: Users,
      title: 'Built Specifically for Farmers',
      description: 'Designed for smartphone screens, rural network speeds, and multi-lingual support (English, Hindi, Telugu).',
      color: 'text-agri-leaf bg-agri-leaf/15',
    },
  ];

  return (
    <section className="py-16 bg-agri-cream border-b border-agri-fresh/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-agri-dark tracking-tight">
            Why Indian Farmers Trust KisanMitra
          </h2>
          <p className="text-base text-gray-600 mt-2 font-normal">
            Bridging raw field realities with reliable agricultural intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-agri-fresh/15 hover:shadow-agri-card transition-all duration-300 space-y-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${b.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-agri-dark">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
