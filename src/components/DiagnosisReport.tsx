import React, { useState } from 'react';
import { DiagnosisResult, Language, WeatherData } from '../types';
import { getTranslation } from '../services/i18n';
import { ShieldAlert, CheckCircle, Clock, CloudRain, Sun, Calendar, AlertTriangle, UserCheck, Bookmark, Download, RotateCcw, Share2, Sparkles, Droplets, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiagnosisReportProps {
  result: DiagnosisResult;
  weatherData: WeatherData;
  language: Language;
  onReset: () => void;
  onSaveToHistory: (result: DiagnosisResult) => void;
}

export const DiagnosisReport: React.FC<DiagnosisReportProps> = ({
  result,
  weatherData,
  language,
  onReset,
  onSaveToHistory,
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSaveToHistory(result);
    setIsSaved(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22C55E', '#84CC16', '#FACC15'],
    });
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section className="py-10 bg-agri-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-agri-fresh/20 shadow-sm">
          <div>
            <span className="text-xs font-bold text-agri-deep uppercase tracking-widest bg-agri-leaf/20 px-3 py-1 rounded-full">
              OFFICIAL CROP HEALTH REPORT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark tracking-tight mt-1">
              {t('reportHeader')}
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Analyzed on {result.detectionDate} • Location: {result.locationName}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-sm ${
                isSaved
                  ? 'bg-agri-fresh text-agri-dark font-extrabold cursor-default'
                  : 'bg-agri-deep text-white hover:bg-agri-dark'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? t('saved') : t('saveToHistory')}</span>
            </button>

            <button
              onClick={onReset}
              className="px-4 py-2.5 rounded-xl bg-agri-cream text-agri-dark font-bold text-xs sm:text-sm border border-gray-300 hover:bg-gray-200 transition-all flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Diagnosis</span>
            </button>
          </div>
        </div>

        {/* Diagnosis Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Column */}
            <div className="md:col-span-5 relative group">
              <img
                src={result.imageUrl}
                alt={result.diseaseName}
                className="w-full h-64 sm:h-72 object-cover rounded-2xl border-2 border-agri-fresh/30 shadow-md"
              />
              <div className="absolute top-3 left-3 bg-agri-dark/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                {result.crop} • {result.growthStage}
              </div>
            </div>

            {/* Right Diagnosis Details */}
            <div className="md:col-span-7 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('likelyIssue')}
                </span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${getSeverityBadgeClass(result.severity)}`}>
                  {result.severity} Risk
                </span>
                <span className="text-xs font-extrabold bg-agri-fresh/20 text-agri-dark px-3 py-1 rounded-full border border-agri-fresh/30">
                  {result.confidence}% {t('confidence')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-agri-dark">
                {result.diseaseName}
              </h2>
              {result.scientificName && (
                <p className="text-xs font-mono italic text-agri-deep">
                  Scientific ID: {result.scientificName}
                </p>
              )}

              {/* Severity Gauge Indicator */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                  <span>Severity Gauge:</span>
                  <span className="text-agri-deep">{result.severity}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                  <div className={`h-full ${result.severity === 'Low' ? 'w-1/4 bg-green-500' : 'w-1/4 bg-gray-300'}`} />
                  <div className={`h-full ${result.severity === 'Moderate' ? 'w-1/4 bg-yellow-500' : 'w-1/4 bg-gray-300'}`} />
                  <div className={`h-full ${result.severity === 'High' ? 'w-1/4 bg-orange-500' : 'w-1/4 bg-gray-300'}`} />
                  <div className={`h-full ${result.severity === 'Critical' ? 'w-1/4 bg-red-600' : 'w-1/4 bg-gray-300'}`} />
                </div>
              </div>

              {/* Symptoms Bullet List */}
              <div className="bg-agri-cream p-4 rounded-2xl border border-agri-fresh/20 text-xs space-y-1.5">
                <span className="font-bold text-agri-dark block mb-1">Key Detected Symptoms:</span>
                {result.symptoms.map((sym, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-agri-fresh shrink-0 mt-0.5" />
                    <span>{sym}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* "What We Found" & "Why it may be happening" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-3xl p-6 shadow-agri-card border border-agri-fresh/20 space-y-3">
            <div className="flex items-center space-x-2 text-agri-deep font-bold text-lg">
              <Sparkles className="w-5 h-5 text-agri-fresh" />
              <h3>{t('whatWeFound')}</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {result.summaryExplanation}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-agri-card border border-agri-fresh/20 space-y-3">
            <div className="flex items-center space-x-2 text-agri-brown font-bold text-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3>{t('whyHappening')}</h3>
            </div>
            <ul className="text-xs text-gray-700 space-y-2">
              {result.whyItHappened.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Treatment Plan: "What You Should Do Now" */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20 space-y-6">
          <div>
            <span className="text-xs font-bold text-agri-deep uppercase tracking-widest bg-agri-fresh/20 px-3 py-1 rounded-full">
              ACTION PLAN
            </span>
            <h2 className="text-2xl font-extrabold text-agri-dark mt-2">
              {t('whatToDoNow')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.treatmentPlan.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-agri-cream rounded-2xl p-6 border border-agri-fresh/30 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-agri-deep text-agri-fresh font-black flex items-center justify-center text-base mb-4 shadow">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-base font-bold text-agri-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {step.activeIngredient && (
                  <div className="pt-3 border-t border-gray-200 space-y-1.5 text-[11px]">
                    <p className="font-bold text-agri-deep">
                      Active Ingredient: <span className="text-agri-dark font-normal">{step.activeIngredient}</span>
                    </p>
                    {step.purpose && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Purpose:</span> {step.purpose}
                      </p>
                    )}
                    {step.safetyWarning && (
                      <div className="bg-amber-50 border border-amber-200 p-2 rounded-lg text-[10px] text-amber-800 font-medium flex items-start gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{step.safetyWarning}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WEATHER-AWARE ACTION WINDOW (Key Differentiating Feature) */}
        <div className="bg-gradient-to-br from-agri-dark via-agri-dark to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-agri-fresh/30 space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agri-yellow/20 text-agri-yellow text-xs font-bold mb-1">
                <Sun className="w-3.5 h-3.5" />
                <span>WEATHER-SYNCHRONIZED TIMING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('whenShouldYouAct')}
              </h2>
            </div>

            <div className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold border ${
              result.sprayWindow.isSafeToSpray
                ? 'bg-agri-fresh text-agri-dark border-agri-leaf'
                : 'bg-amber-500 text-agri-dark border-amber-400'
            }`}>
              {result.sprayWindow.isSafeToSpray ? `✓ ${t('bestWindow')}` : `⚠️ ${t('waitBeforeSpraying')}`}
            </div>
          </div>

          {/* Action Window Main Callout */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="flex items-center space-x-2 text-agri-yellow text-sm font-bold">
              <Clock className="w-5 h-5" />
              <span>Recommended Timing: {result.sprayWindow.recommendedTimeWindow}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
              {result.sprayWindow.reason}
            </p>
          </div>

          {/* Weather Timeline Preview (Next 3-5 Days) */}
          <div>
            <h4 className="text-xs font-bold text-agri-leaf uppercase tracking-wider mb-3">
              Upcoming 4-Day Forecast & Spray Suitability:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {weatherData.forecast.slice(0, 4).map((day, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/10 text-center space-y-1">
                  <span className="text-xs font-bold text-gray-300 block">{day.dayName}</span>
                  <span className="text-2xl block">{day.icon}</span>
                  <span className="text-xs font-bold text-white block">{day.tempMax}° / {day.tempMin}°C</span>
                  <span className="text-[10px] text-agri-leaf block flex items-center justify-center gap-1">
                    <CloudRain className="w-3 h-3" /> Rain {day.rainProbability}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amber Safety Warning */}
          <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl p-3.5 text-xs text-amber-200 flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-agri-yellow shrink-0" />
            <span>{t('amberWeatherWarning')}</span>
          </div>

        </div>

        {/* AI Disclaimer & Expert Escalation */}
        <div className="bg-white rounded-3xl p-6 shadow-agri-card border border-agri-fresh/20 space-y-4">
          <div className="flex items-start space-x-3 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <ShieldAlert className="w-5 h-5 text-agri-deep shrink-0 mt-0.5" />
            <span>{t('disclaimer')}</span>
          </div>

          {result.expertConsultationRecommended && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <UserCheck className="w-8 h-8 text-amber-700 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Need Expert Verification?</h4>
                  <p className="text-xs text-amber-800">
                    Confidence is moderate. You can directly connect with your district Krishi Officer.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Escalating to local Agricultural Expert office... Connected!')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-all shrink-0"
              >
                {t('talkToExpert')}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
