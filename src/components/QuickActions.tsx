import React from 'react';
import { Microscope, CloudSun, Sparkles, Calendar, ArrowRight, Sprout, TestTube, Package, Droplets, TrendingUp, DollarSign } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../services/i18n';

interface QuickActionsProps {
  onNavigate: (actionId: string) => void;
  language: Language;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate, language }) => {
  const t = (key: string) => getTranslation(language, key);

  const cards = [
    {
      id: 'cropSelection',
      icon: Sprout,
      title: 'Crop Selection & Soil Analysis',
      description: 'Analyze soil NPK, pH, EC and match high-yield adapted crop cultivars.',
      buttonText: 'Analyze Soil & Crops',
      accentColor: 'from-emerald-600 to-agri-deep',
    },
    {
      id: 'fertilizer',
      icon: Package,
      title: 'Fertilizer & Irrigation Schedule',
      description: 'Get precise NPK dosage blends (Urea/DAP/MOP) and FAO-56 irrigation runtime.',
      buttonText: 'View Schedule',
      accentColor: 'from-amber-500 to-amber-600',
    },
    {
      id: 'profitPrediction',
      icon: Sparkles,
      title: 'Yield & Profit Simulation',
      description: 'Simulate 1,000 Monte-Carlo market price scenarios and break-even thresholds.',
      buttonText: 'Predict Profit',
      accentColor: 'from-lime-600 to-emerald-700',
    },
    {
      id: 'diseaseDetection',
      icon: Microscope,
      title: 'Disease Detection & Advisory',
      description: 'Diagnose plant pathogens with probabilistic Bayesian symptom analysis.',
      buttonText: 'Diagnose Crop',
      accentColor: 'from-sky-600 to-blue-700',
    },
  ];

  return (
    <section className="py-12 bg-agri-dark border-b border-agri-fresh/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How can AgriMind help your farm today?
          </h2>
          <p className="text-sm text-gray-300 mt-2 font-medium">
            Select an agricultural decision engine below to explore real-time agronomic intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl hover:border-agri-fresh hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accentColor} flex items-center justify-center text-white font-bold mb-4 shadow-md group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-agri-dark mb-2 group-hover:text-agri-deep transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed mb-6 font-semibold">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-bold text-agri-deep group-hover:translate-x-1 transition-transform">
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-agri-deep" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
