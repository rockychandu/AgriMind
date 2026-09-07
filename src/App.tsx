import React, { useState, useEffect } from 'react';
import { DiagnosisResult, FarmProfile, Language, WeatherData } from './types';
import { fetchWeatherForLocation } from './services/weatherService';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { QuickActions } from './components/QuickActions';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { CropDoctor } from './components/CropDoctor';
import { DiagnosisReport } from './components/DiagnosisReport';
import { WeatherDashboard } from './components/WeatherDashboard';
import { SmartAdvisory } from './components/SmartAdvisory';
import { AIChatAssistant } from './components/AIChatAssistant';
import { FarmerDashboard } from './components/FarmerDashboard';
import { FarmHistory } from './components/FarmHistory';
import { OnboardingModal } from './components/OnboardingModal';
import { Footer } from './components/Footer';

// New Feature Modules Components
import { CropSelectionView } from './components/CropSelectionView';
import { SoilAnalysisView } from './components/SoilAnalysisView';
import { CropRecommendationView } from './components/CropRecommendationView';
import { FertilizerView } from './components/FertilizerView';
import { IrrigationView } from './components/IrrigationView';
import { YieldPredictionView } from './components/YieldPredictionView';
import { ExpenseTrackingView } from './components/ExpenseTrackingView';
import { ProfitPredictionView } from './components/ProfitPredictionView';

import { ArrowRight, Leaf, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [locationName, setLocationName] = useState<string>('Guntur, Andhra Pradesh');
  const [coords, setCoords] = useState<{ lat?: number; lon?: number }>({ lat: 16.3067, lon: 80.4365 });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(null);
  const [history, setHistory] = useState<DiagnosisResult[]>([]);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  const [profile, setProfile] = useState<FarmProfile>({
    name: 'Ramesh Kumar',
    mobile: '9876543210',
    locationName: 'Guntur, Andhra Pradesh',
    primaryCrop: 'Cotton',
    farmSizeAcres: '3.5',
    language: 'en',
    isGuest: false,
  });

  // Load saved history & profile from LocalStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('kisan_mitra_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedProfile = localStorage.getItem('kisan_mitra_profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Fetch weather when location changes or on load
  const loadWeather = async (lat?: number, lon?: number, locName?: string) => {
    const data = await fetchWeatherForLocation(lat, lon, locName || locationName);
    setWeatherData(data);
    if (data.locationName) {
      setLocationName(data.locationName);
    }
  };

  useEffect(() => {
    loadWeather(coords.lat, coords.lon, locationName);
  }, []);

  const handleRequestLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setCoords({ lat, lon });
          loadWeather(lat, lon);
        },
        (err) => {
          alert('Location access unavailable or denied. Using manual location.');
        }
      );
    }
  };

  const handleDiagnosisComplete = (result: DiagnosisResult) => {
    setCurrentDiagnosis(result);
    saveToHistory(result);
  };

  const saveToHistory = (result: DiagnosisResult) => {
    setHistory((prev) => {
      const filtered = prev.filter((r) => r.id !== result.id);
      const updated = [result, ...filtered];
      try {
        localStorage.setItem('kisan_mitra_history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('kisan_mitra_history');
    } catch (e) {}
  };

  const handleSaveProfile = (updated: FarmProfile) => {
    setProfile(updated);
    setLanguage(updated.language || 'en');
    try {
      localStorage.setItem('kisan_mitra_profile', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-agri-dark text-white flex flex-col font-sans selection:bg-agri-leaf selection:text-agri-dark">
      
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        profile={profile}
        onOpenOnboarding={() => setShowOnboarding(true)}
        locationName={locationName}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onCheckCropClick={() => setActiveTab('diseaseDetection')}
              onViewWeatherClick={() => setActiveTab('weather')}
              language={language}
            />
            <QuickActions onNavigate={setActiveTab} language={language} />
            <HowItWorks />
            <Benefits />
          </>
        )}

        {activeTab === 'cropSelection' && <CropSelectionView />}
        {activeTab === 'soilAnalysis' && <SoilAnalysisView />}
        {activeTab === 'cropRecommendation' && <CropRecommendationView />}
        {activeTab === 'fertilizer' && <FertilizerView />}
        {activeTab === 'irrigation' && <IrrigationView />}
        
        {(activeTab === 'diseaseDetection' || activeTab === 'doctor') && (
          currentDiagnosis ? (
            <DiagnosisReport
              result={currentDiagnosis}
              weatherData={weatherData || ({} as any)}
              language={language}
              onReset={() => setCurrentDiagnosis(null)}
              onSaveToHistory={saveToHistory}
            />
          ) : (
            <CropDoctor
              onDiagnosisComplete={handleDiagnosisComplete}
              language={language}
              weatherData={weatherData || ({} as any)}
              locationName={locationName}
              setLocationName={(loc) => {
                setLocationName(loc);
                loadWeather(undefined, undefined, loc);
              }}
              onRequestLocationPermission={handleRequestLocationPermission}
            />
          )
        )}

        {activeTab === 'yieldPrediction' && <YieldPredictionView />}
        {activeTab === 'expenseTracking' && <ExpenseTrackingView />}
        {activeTab === 'profitPrediction' && <ProfitPredictionView />}

        {activeTab === 'weather' && (
          <WeatherDashboard
            weatherData={weatherData || ({} as any)}
            language={language}
            onRefreshWeather={() => loadWeather(coords.lat, coords.lon, locationName)}
            locationName={locationName}
          />
        )}

        {activeTab === 'advisory' && (
          <SmartAdvisory
            latestDiagnosis={currentDiagnosis}
            weatherData={weatherData || ({} as any)}
            language={language}
            onGoToDoctor={() => setActiveTab('diseaseDetection')}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmerDashboard
            profile={profile}
            weatherData={weatherData || ({} as any)}
            latestDiagnosis={currentDiagnosis}
            historyCount={history.length}
            language={language}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'history' && (
          <FarmHistory
            history={history}
            onSelectRecord={(rec) => {
              setCurrentDiagnosis(rec);
              setActiveTab('diseaseDetection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearHistory={handleClearHistory}
            language={language}
            onGoToDoctor={() => setActiveTab('diseaseDetection')}
          />
        )}
      </main>

      {/* Floating AI Chat Assistant */}
      <AIChatAssistant
        language={language}
        setLanguage={setLanguage}
        latestDiagnosis={currentDiagnosis}
        weatherData={weatherData || ({} as any)}
      />

      {/* Mobile Sticky Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* Farmer Onboarding / Profile Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onSaveProfile={handleSaveProfile}
        language={language}
        setLanguage={setLanguage}
        currentProfile={profile}
      />

      {/* Footer */}
      <Footer language={language} onNavigate={setActiveTab} />
    </div>
  );
}

export default App;
