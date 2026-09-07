import React from 'react';
import { DiagnosisResult, FarmProfile, Language, WeatherData } from '../types';
import { getTranslation } from '../services/i18n';
import { Sun, Stethoscope, Compass, History, MapPin, ArrowRight, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

interface FarmerDashboardProps {
  profile: FarmProfile;
  weatherData: WeatherData;
  latestDiagnosis: DiagnosisResult | null;
  historyCount: number;
  language: Language;
  onNavigate: (tab: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  profile,
  weatherData,
  latestDiagnosis,
  historyCount,
  language,
  onNavigate,
}) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <section className="py-10 bg-agri-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-agri-dark via-agri-dark to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-agri-fresh/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-agri-leaf uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
              FARM COMMAND CENTER
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Good Morning, {profile.name} 🌱
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-agri-yellow" />
              <span>Location: {profile.locationName}</span>
              <span className="text-gray-400">•</span>
              <span>Primary Crop: {profile.primaryCrop}</span>
            </p>
          </div>

          <button
            onClick={() => onNavigate('doctor')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-agri-fresh to-agri-leaf text-agri-dark font-extrabold text-sm shadow-glow-green hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <Stethoscope className="w-5 h-5 text-agri-dark" />
            <span>Scan Crop Now</span>
          </button>
        </div>

        {/* 4 Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Crop Health */}
          <div 
            onClick={() => onNavigate('doctor')}
            className="bg-white rounded-2xl p-5 border border-agri-fresh/20 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>CROP HEALTH STATUS</span>
              <Activity className="w-4 h-4 text-agri-fresh" />
            </div>
            <p className="text-xl font-extrabold text-agri-dark">
              {latestDiagnosis ? `${latestDiagnosis.severity} Risk` : 'Healthy / Unscanned'}
            </p>
            <p className="text-[11px] text-gray-500">
              {latestDiagnosis ? latestDiagnosis.diseaseName : 'No active alerts'}
            </p>
          </div>

          {/* Card 2: Weather */}
          <div 
            onClick={() => onNavigate('weather')}
            className="bg-white rounded-2xl p-5 border border-agri-fresh/20 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>LIVE FARM WEATHER</span>
              <Sun className="w-4 h-4 text-agri-yellow" />
            </div>
            <p className="text-xl font-extrabold text-agri-dark">
              {weatherData.temp}°C • {weatherData.condition.split(' ')[0]}
            </p>
            <p className="text-[11px] text-blue-600 font-semibold">
              Rain Chance {weatherData.rainProbability}%
            </p>
          </div>

          {/* Card 3: Today's Advisory */}
          <div 
            onClick={() => onNavigate('advisory')}
            className="bg-white rounded-2xl p-5 border border-agri-fresh/20 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>TODAY'S ADVISORY</span>
              <Compass className="w-4 h-4 text-agri-deep" />
            </div>
            <p className="text-sm font-bold text-agri-dark truncate">
              Inspect leaves for disease spread
            </p>
            <p className="text-[11px] text-agri-deep font-semibold">
              4-Step Action Plan Ready
            </p>
          </div>

          {/* Card 4: Next Action */}
          <div 
            onClick={() => onNavigate('history')}
            className="bg-white rounded-2xl p-5 border border-agri-fresh/20 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>CROP HISTORY</span>
              <History className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xl font-extrabold text-agri-dark">
              {historyCount} Reports Saved
            </p>
            <p className="text-[11px] text-gray-500">
              Click to view timeline
            </p>
          </div>

        </div>

        {/* Quick Actions Shortcuts Banner */}
        <div className="bg-white rounded-3xl p-6 shadow-agri-card border border-agri-fresh/20 space-y-4">
          <h2 className="text-lg font-extrabold text-agri-dark">
            Recommended Farm Actions Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <button
              onClick={() => onNavigate('doctor')}
              className="p-4 rounded-2xl bg-agri-cream border border-agri-fresh/30 hover:border-agri-fresh text-left flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-agri-fresh text-agri-dark font-bold flex items-center justify-center">
                  🌱
                </div>
                <div>
                  <h3 className="text-sm font-bold text-agri-dark group-hover:text-agri-deep">
                    Diagnose New Leaf Photo
                  </h3>
                  <p className="text-xs text-gray-500">Upload affected leaf from field</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-agri-deep group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('weather')}
              className="p-4 rounded-2xl bg-agri-cream border border-agri-fresh/30 hover:border-agri-fresh text-left flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-agri-dark font-bold flex items-center justify-center">
                  ☀️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-agri-dark group-hover:text-agri-deep">
                    Check Safe Spray Windows
                  </h3>
                  <p className="text-xs text-gray-500">Sync chemical application with weather</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-agri-deep group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
