import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../services/i18n';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <footer className="bg-agri-dark text-white border-t border-agri-fresh/20 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-agri-leaf to-agri-fresh flex items-center justify-center">
                <Leaf className="w-6 h-6 text-agri-dark" />
              </div>
              <span className="text-2xl font-extrabold text-white">
                {t('brandName')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed font-normal">
              AI-powered farming guidance for healthier crops and resilient farms. From field conditions to clear farming decisions.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs text-agri-leaf font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-agri-yellow" />
              <span>Weather-Aware Agronomic Intelligence</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-agri-leaf uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-agri-fresh transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctor')} className="hover:text-agri-fresh transition-colors">
                  {t('cropDoctor')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('weather')} className="hover:text-agri-fresh transition-colors">
                  {t('weather')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advisory')} className="hover:text-agri-fresh transition-colors">
                  {t('advisory')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-agri-fresh transition-colors">
                  {t('history')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-agri-leaf uppercase tracking-wider">
              Agri Resources & Disclaimer
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              KisanMitra combines computer vision with meteorological data. For severe crop outbreaks, always consult your district Agricultural Officer or Krishi Vigyan Kendra (KVK).
            </p>
            <p className="text-xs font-bold text-white pt-2">
              National Farmers Toll-Free Advisory: <span className="text-agri-yellow">1800-180-1551</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} KisanMitra. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-agri-fresh font-bold text-sm">
            <span>Built for farmers. Powered by AI.</span>
            <Leaf className="w-4 h-4 text-agri-leaf" />
          </p>
        </div>

      </div>
    </footer>
  );
};
