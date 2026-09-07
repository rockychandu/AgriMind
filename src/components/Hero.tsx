import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CloudSun, Leaf, Activity } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../services/i18n';

interface HeroProps {
  onCheckCropClick: () => void;
  onViewWeatherClick: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onCheckCropClick, onViewWeatherClick, language }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <section className="relative overflow-hidden bg-agri-dark text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Image Overlay with Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-agri-dark/80 via-agri-dark/95 to-agri-dark pointer-events-none" />

      {/* Subtle Leaf floating particles */}
      <div className="absolute top-10 left-10 opacity-20 animate-leaf-float pointer-events-none">
        <Leaf className="w-16 h-16 text-agri-leaf" />
      </div>
      <div className="absolute bottom-12 right-20 opacity-20 animate-leaf-float pointer-events-none" style={{ animationDelay: '2s' }}>
        <Leaf className="w-20 h-20 text-agri-fresh" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-agri-fresh/15 border border-agri-fresh/30 text-agri-leaf text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
              <Sparkles className="w-4 h-4 text-agri-yellow animate-spin-slow" />
              <span>{t('trustLine')}</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t('heroTitle').split('. ')[0]}.<br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-agri-fresh via-agri-leaf to-agri-yellow bg-clip-text text-transparent">
                {t('heroTitle').split('. ')[1] || 'Protect Your Harvest.'}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onCheckCropClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-agri-fresh to-agri-leaf text-agri-dark font-extrabold text-base sm:text-lg shadow-glow-green hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-3 group"
              >
                <Leaf className="w-5 h-5 text-agri-dark group-hover:rotate-12 transition-transform" />
                <span>{t('checkMyCrop')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewWeatherClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 text-white font-bold text-base sm:text-lg border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2.5 backdrop-blur-sm"
              >
                <CloudSun className="w-5 h-5 text-agri-yellow" />
                <span>{t('viewWeather')}</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-gray-400 font-medium">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-agri-fresh" />
                <span>Trusted Agri Guidance</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-agri-yellow" />
                <span>Weather-Synced Spray Windows</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive AI Ag Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-agri-fresh/30 to-agri-leaf/10 blur-2xl transform scale-95" />

            {/* Main Interactive Visual Card */}
            <div className="relative w-full max-w-md bg-agri-dark/90 rounded-2xl border border-agri-fresh/30 p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Card Top Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-agri-leaf bg-agri-fresh/10 px-2.5 py-1 rounded-full border border-agri-fresh/20">
                  LIVE AI SCAN
                </span>
              </div>

              {/* Crop Leaf Scan Graphic */}
              <div className="relative rounded-xl overflow-hidden mb-5 aspect-[4/3] group cursor-pointer" onClick={onCheckCropClick}>
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop"
                  alt="Cotton Leaf Scan Demo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* AI Laser Scan Line Animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-agri-fresh to-transparent shadow-glow-green animate-pulse" style={{ top: '45%' }} />
                
                {/* Bounding Box Visual Overlay */}
                <div className="absolute top-6 left-12 w-28 h-20 border-2 border-dashed border-agri-yellow rounded-lg bg-agri-yellow/10 flex items-start justify-end p-1">
                  <span className="text-[9px] font-bold bg-agri-yellow text-agri-dark px-1 rounded">89% Match</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-agri-dark/85 backdrop-blur-md p-2.5 rounded-lg border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-agri-fresh"></span>
                    <span className="font-semibold text-white">Cotton Leaf Spot</span>
                  </div>
                  <span className="text-agri-yellow font-bold">Moderate Risk</span>
                </div>
              </div>

              {/* Weather Synced Action Window Widget Preview */}
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-medium flex items-center gap-1.5">
                    <CloudSun className="w-4 h-4 text-agri-yellow" />
                    Weather-Aware Spray Window
                  </span>
                  <span className="text-agri-fresh text-[11px] font-bold bg-agri-fresh/20 px-2 py-0.5 rounded">
                    OPTIMAL
                  </span>
                </div>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Tomorrow 6:00 AM – 9:00 AM</span>
                  <span className="text-xs text-agri-leaf font-mono">29°C • Rain 15%</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
