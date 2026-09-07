import React from 'react';
import { DiagnosisResult, Language, WeatherData } from '../types';
import { getTranslation } from '../services/i18n';
import { Compass, AlertCircle, CheckCircle2, Clock, Eye, Calendar, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface SmartAdvisoryProps {
  latestDiagnosis: DiagnosisResult | null;
  weatherData: WeatherData;
  language: Language;
  onGoToDoctor: () => void;
}

export const SmartAdvisory: React.FC<SmartAdvisoryProps> = ({
  latestDiagnosis,
  weatherData,
  language,
  onGoToDoctor,
}) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <section className="py-10 bg-agri-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-agri-fresh/20 shadow-agri-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agri-leaf/20 text-agri-deep text-xs font-bold mb-1">
              <Compass className="w-3.5 h-3.5 text-agri-fresh" />
              <span>INTEGRATED FARM ADVISORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark tracking-tight">
              {t('advisoryHeader')}
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Personalized action steps synthesized from crop health scan & live weather data.
            </p>
          </div>

          {!latestDiagnosis && (
            <button
              onClick={onGoToDoctor}
              className="px-5 py-3 rounded-xl bg-agri-fresh text-agri-dark font-extrabold text-xs sm:text-sm hover:bg-agri-leaf transition-all shadow flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-agri-dark" />
              <span>Scan Crop First</span>
            </button>
          )}
        </div>

        {/* Action Plan Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-xl font-extrabold text-agri-dark">
              {t('todayPlan')}
            </h2>
            <span className="text-xs font-mono text-agri-deep bg-agri-fresh/15 px-3 py-1 rounded-full font-bold">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 🔴 Priority */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-xs font-black text-red-700 uppercase tracking-wider">{t('priority')}</span>
              </div>
              <p className="text-sm font-bold text-red-950">
                {latestDiagnosis ? `Inspect ${latestDiagnosis.crop} lower leaves for disease spread` : 'Inspect lower leaves for disease symptoms.'}
              </p>
              <p className="text-xs text-red-700">Scout 10 random plants along field diagonal.</p>
            </div>

            {/* 🟢 Recommended */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">{t('recommended')}</span>
              </div>
              <p className="text-sm font-bold text-emerald-950">
                Prune & dispose of heavily affected leaf debris away from field bunds.
              </p>
              <p className="text-xs text-emerald-700">Prevents fungal spore recirculation.</p>
            </div>

            {/* 🟡 Wait */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500"></span>
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider">{t('wait')}</span>
              </div>
              <p className="text-sm font-bold text-amber-950">
                Delay chemical spraying until rain chance drops below 25%.
              </p>
              <p className="text-xs text-amber-700">Rain washes away expensive foliar spray.</p>
            </div>

            {/* 🔵 Monitor */}
            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-sky-500"></span>
                <span className="text-xs font-black text-sky-800 uppercase tracking-wider">{t('monitor')}</span>
              </div>
              <p className="text-sm font-bold text-sky-950">
                Check new leaf growth after 24–48 hours for fresh spot emergence.
              </p>
              <p className="text-xs text-sky-700">Re-scan image if symptoms worsen.</p>
            </div>

          </div>
        </div>

        {/* 4-Step Advisory Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20 space-y-6">
          <h2 className="text-xl font-extrabold text-agri-dark flex items-center gap-2">
            <Calendar className="w-5 h-5 text-agri-deep" />
            {t('timelineTitle')}
          </h2>

          <div className="relative border-l-2 border-agri-fresh/30 ml-4 pl-6 space-y-8">
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-agri-fresh text-agri-dark font-black text-xs flex items-center justify-center shadow">
                1
              </div>
              <div className="bg-agri-cream p-4 rounded-2xl border border-agri-fresh/20 space-y-1">
                <span className="text-xs font-bold text-agri-deep">TODAY</span>
                <h3 className="text-base font-bold text-agri-dark">Field Scouting & Pruning</h3>
                <p className="text-xs text-gray-600">
                  Inspect crops carefully in natural morning light. Clip off infected leaves showing dark spots or yellowing.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-agri-leaf text-agri-dark font-black text-xs flex items-center justify-center shadow">
                2
              </div>
              <div className="bg-agri-cream p-4 rounded-2xl border border-agri-fresh/20 space-y-1">
                <span className="text-xs font-bold text-agri-deep">TOMORROW MORNING</span>
                <h3 className="text-base font-bold text-agri-dark">Re-Check Weather & Disease Progression</h3>
                <p className="text-xs text-gray-600">
                  Verify local morning rain forecast. If weather remains dry, prepare recommended bio-spray solution.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-agri-yellow text-agri-dark font-black text-xs flex items-center justify-center shadow">
                3
              </div>
              <div className="bg-agri-cream p-4 rounded-2xl border border-agri-fresh/20 space-y-1">
                <span className="text-xs font-bold text-agri-deep">BEST TREATMENT WINDOW (TOMORROW 6-9 AM)</span>
                <h3 className="text-base font-bold text-agri-dark">Targeted Protective Spray Application</h3>
                <p className="text-xs text-gray-600">
                  Apply bio-fungicide or active ingredient evenly over upper and lower leaf surfaces during cool early morning hours.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-agri-deep text-white font-black text-xs flex items-center justify-center shadow">
                4
              </div>
              <div className="bg-agri-cream p-4 rounded-2xl border border-agri-fresh/20 space-y-1">
                <span className="text-xs font-bold text-agri-deep">NEXT 3 DAYS</span>
                <h3 className="text-base font-bold text-agri-dark">Monitor New Leaf Canopy Growth</h3>
                <p className="text-xs text-gray-600">
                  Ensure new emerging shoot tips remain green and free of lesions. Save report to track recovery history.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
