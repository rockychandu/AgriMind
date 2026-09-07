import React from 'react';
import { Home, Stethoscope, CloudSun, ClipboardCheck, History } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../services/i18n';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab, language }) => {
  const t = (key: string) => getTranslation(language, key);

  const items = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'doctor', label: t('cropDoctor'), icon: Stethoscope },
    { id: 'weather', label: t('weather'), icon: CloudSun },
    { id: 'advisory', label: t('advisory'), icon: ClipboardCheck },
    { id: 'history', label: t('history'), icon: History },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-agri-dark/95 backdrop-blur-md border-t border-agri-fresh/20 px-2 py-2 shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-agri-fresh scale-110 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-agri-fresh/20' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
