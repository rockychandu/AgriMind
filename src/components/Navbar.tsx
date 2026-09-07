import React, { useState } from 'react';
import { 
  Leaf, Sun, Stethoscope, Compass, History, User, Menu, X, MapPin, Globe,
  Sprout, TestTube, Package, Droplets, TrendingUp, DollarSign, Sparkles, LayoutDashboard
} from 'lucide-react';
import { Language, FarmProfile } from '../types';
import { getTranslation } from '../services/i18n';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  profile: FarmProfile;
  onOpenOnboarding: () => void;
  locationName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  profile,
  onOpenOnboarding,
  locationName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  const navItems = [
    { id: 'home', label: t('home'), icon: Leaf },
    { id: 'cropSelection', label: t('cropSelection'), icon: Sprout },
    { id: 'soilAnalysis', label: t('soilAnalysis'), icon: TestTube },
    { id: 'cropRecommendation', label: t('cropRecommendation'), icon: Compass },
    { id: 'fertilizer', label: t('fertilizerRecommendation'), icon: Package },
    { id: 'irrigation', label: t('irrigationScheduling'), icon: Droplets },
    { id: 'diseaseDetection', label: t('diseaseDetection'), icon: Stethoscope },
    { id: 'yieldPrediction', label: t('yieldPrediction'), icon: TrendingUp },
    { id: 'expenseTracking', label: t('expenseTracking'), icon: DollarSign },
    { id: 'profitPrediction', label: t('profitPrediction'), icon: Sparkles },
    { id: 'dashboard', label: t('farmerDashboard'), icon: LayoutDashboard },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-agri-dark/95 backdrop-blur-md text-white border-b border-agri-fresh/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-agri-leaf to-agri-fresh flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-6 h-6 text-agri-dark" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1">
                {t('brandName')}
                <span className="w-2 h-2 rounded-full bg-agri-yellow inline-block animate-ping"></span>
              </span>
              <p className="text-[10px] sm:text-xs text-agri-leaf font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-agri-fresh text-agri-dark font-bold shadow-md scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative flex items-center bg-white border-2 border-agri-fresh rounded-xl px-2.5 py-1.5 text-xs shadow-sm">
              <Globe className="w-4 h-4 text-agri-deep mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-agri-dark text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-white text-agri-dark font-bold">English</option>
                <option value="hi" className="bg-white text-agri-dark font-bold">हिंदी</option>
                <option value="te" className="bg-white text-agri-dark font-bold">తెలుగు</option>
              </select>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-agri-dark/95 border-t border-agri-fresh/20 py-4 px-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-agri-fresh text-agri-dark font-bold'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
