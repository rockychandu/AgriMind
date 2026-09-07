/**
 * AgriMind Offline Crop Health Doctor & Bayesian Disease Diagnostic Engine
 */
import React, { useState, useRef } from 'react';
import { Camera, Upload, Leaf, MapPin, X, AlertCircle, Info, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { CropType, GrowthStage, Language, SampleCropPreset, WeatherData } from '../types';
import { getTranslation } from '../services/i18n';
import { SAMPLE_PRESETS, analyzeCropImage } from '../services/aiDiagnosisService';

interface CropDoctorProps {
  onDiagnosisComplete: (result: any) => void;
  language: Language;
  weatherData: WeatherData;
  locationName: string;
  setLocationName: (loc: string) => void;
  onRequestLocationPermission: () => void;
}

export const CropDoctor: React.FC<CropDoctorProps> = ({
  onDiagnosisComplete,
  language,
  weatherData,
  locationName,
  setLocationName,
  onRequestLocationPermission,
}) => {
  const t = (key: string) => getTranslation(language, key);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Cotton');
  const [growthStage, setGrowthStage] = useState<GrowthStage>('Vegetative');
  const [farmerObservation, setFarmerObservation] = useState<string>('');
  const [showPhotoTips, setShowPhotoTips] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const loadingMessages = [
    'Inspecting the leaf image...',
    'Checking possible crop diseases...',
    'Analyzing weather conditions...',
    'Preparing your farm advisory...',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: SampleCropPreset) => {
    setSelectedImage(preset.imageUrl);
    setSelectedCrop(preset.crop);
    setFarmerObservation(preset.sampleObservation);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setLoadingStepIndex(0);

    // Rotate loading messages every 450ms
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 450);

    try {
      const result = await analyzeCropImage(
        selectedImage,
        selectedCrop,
        growthStage,
        locationName,
        farmerObservation,
        weatherData
      );

      clearInterval(interval);
      setIsAnalyzing(false);
      onDiagnosisComplete(result);
    } catch (err) {
      clearInterval(interval);
      setIsAnalyzing(false);
      alert('Analysis error. Please try again.');
    }
  };

  return (
    <section id="crop-doctor" className="py-10 bg-agri-cream min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-agri-fresh/15 border border-agri-fresh/30 text-agri-deep text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-agri-fresh" />
            <span>AI CROP DIAGNOSIS ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-agri-dark tracking-tight">
            {t('doctorHeader')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Fast, accurate crop disease detection powered by computer vision & weather intelligence.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-agri-card border border-agri-fresh/20 space-y-8">
          
          {/* Photo Upload Area */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-bold text-agri-dark flex items-center gap-2">
                <Camera className="w-5 h-5 text-agri-deep" />
                1. Crop Photo
              </label>
              
              <button
                onClick={() => setShowPhotoTips(!showPhotoTips)}
                className="text-xs font-bold text-agri-deep hover:text-agri-fresh flex items-center gap-1 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>{showPhotoTips ? 'Hide Tips' : 'Photo Guidance'}</span>
              </button>
            </div>

            {/* Photo Guidance Tips Modal/Drawer */}
            {showPhotoTips && (
              <div className="mb-4 bg-agri-light border border-agri-fresh/30 rounded-2xl p-4 text-xs text-agri-dark space-y-2 animate-fadeIn">
                <p className="font-bold text-agri-deep text-sm mb-1">For Best Diagnosis Results:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agri-fresh shrink-0" />
                    <span>Use clear natural daylight (avoid harsh shadows)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agri-fresh shrink-0" />
                    <span>Keep affected leaf sharply in focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agri-fresh shrink-0" />
                    <span>Capture both healthy and diseased leaf areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agri-fresh shrink-0" />
                    <span>Take close-up and full plant perspective</span>
                  </div>
                </div>
              </div>
            )}

            {/* Dropzone Container */}
            {!selectedImage ? (
              <div className="border-2 border-dashed border-agri-fresh/40 rounded-2xl p-8 sm:p-12 text-center bg-agri-cream/60 hover:bg-agri-cream transition-all duration-200 group relative">
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-agri-fresh/10 text-agri-deep flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-agri-leaf/10 text-agri-leaf flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-agri-yellow/10 text-agri-brown flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-agri-dark mb-1">
                  {t('dragDropText')}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                  {t('daylightTip')} <span className="font-semibold text-agri-deep">(JPG, PNG, WEBP supported)</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-agri-deep text-white font-bold text-sm shadow-md hover:bg-agri-dark transition-all flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-4 h-4 text-agri-fresh" />
                    <span>{t('takePhoto')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-agri-fresh text-agri-dark font-bold text-sm shadow-md hover:bg-agri-leaf transition-all flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4 text-agri-dark" />
                    <span>{t('uploadImage')}</span>
                  </button>
                </div>

                {/* Preset Picker */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                    {t('orSelectPreset')}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {SAMPLE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="group flex flex-col items-center bg-white p-2 rounded-xl border border-gray-200 hover:border-agri-fresh hover:shadow-md transition-all text-left"
                      >
                        <img
                          src={preset.imageUrl}
                          alt={preset.label}
                          className="w-full h-16 object-cover rounded-lg mb-1.5 group-hover:scale-105 transition-transform"
                        />
                        <span className="text-[11px] font-bold text-agri-dark truncate w-full text-center">
                          {preset.crop}
                        </span>
                        <span className="text-[9px] text-gray-500 truncate w-full text-center">
                          {preset.diseaseName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* Selected Image Preview */
              <div className="relative rounded-2xl overflow-hidden border-2 border-agri-fresh bg-agri-dark p-2">
                <img
                  src={selectedImage}
                  alt="Crop Preview"
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />

                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button
                    onClick={handleRemoveImage}
                    className="p-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-lg hover:bg-red-700 transition-all flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-agri-dark/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-agri-fresh flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Photo Loaded Successfully
                  </span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-agri-yellow underline font-bold hover:text-white"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Crop Information Form */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-agri-dark flex items-center gap-2">
              <Leaf className="w-5 h-5 text-agri-fresh" />
              2. {t('cropFormHeading')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Select Crop */}
              <div>
                <label className="block text-xs font-bold text-agri-dark mb-1.5 uppercase tracking-wider">
                  {t('selectCrop')}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value as CropType)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-agri-dark font-semibold text-sm focus:ring-2 focus:ring-agri-fresh focus:border-agri-fresh focus:outline-none shadow-sm"
                >
                  <option value="Cotton">Cotton (పత్తి / कपास)</option>
                  <option value="Rice">Rice (వరి / धान)</option>
                  <option value="Chilli">Chilli (మిరప / मिर्च)</option>
                  <option value="Tomato">Tomato (టమోటా / टमाटर)</option>
                  <option value="Maize">Maize (జొన్న / मक्का)</option>
                  <option value="Groundnut">Groundnut (వేరుశనగ / मूंगफली)</option>
                  <option value="Sugarcane">Sugarcane (చెరకు / गन्ना)</option>
                  <option value="Wheat">Wheat (గోధుమ / गेहूं)</option>
                  <option value="Other">Other Crop</option>
                </select>
              </div>

              {/* Growth Stage */}
              <div>
                <label className="block text-xs font-bold text-agri-dark mb-1.5 uppercase tracking-wider">
                  {t('selectStage')}
                </label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value as GrowthStage)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-agri-dark font-semibold text-sm focus:ring-2 focus:ring-agri-fresh focus:border-agri-fresh focus:outline-none shadow-sm"
                >
                  <option value="Seedling">Seedling (మొలకల దశ / अंकुरण)</option>
                  <option value="Vegetative">Vegetative (ఎదుగుదల దశ / वृद्धि)</option>
                  <option value="Flowering">Flowering (పూత దశ / फूल आना)</option>
                  <option value="Fruiting">Fruiting / Pod Formation (కాత దశ / फल आना)</option>
                  <option value="Harvest">Harvest Ready (కోత దశ / कटाई)</option>
                </select>
              </div>

            </div>

            {/* Farm Location Input */}
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1.5 uppercase tracking-wider">
                {t('yourLocation')}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-5 h-5 text-agri-deep absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder={t('locationPlaceholder')}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-agri-dark font-medium text-sm focus:ring-2 focus:ring-agri-fresh focus:outline-none shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={onRequestLocationPermission}
                  className="px-4 py-3 rounded-xl bg-agri-cream border border-agri-fresh/40 text-agri-deep font-bold text-xs hover:bg-agri-fresh/20 transition-colors flex items-center justify-center space-x-2 shrink-0"
                >
                  <MapPin className="w-4 h-4 text-agri-yellow" />
                  <span>{t('autoLocateBtn')}</span>
                </button>
              </div>
            </div>

            {/* Farmer's Observation text area */}
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1.5 uppercase tracking-wider">
                {t('farmerObsLabel')}
              </label>
              <textarea
                value={farmerObservation}
                onChange={(e) => setFarmerObservation(e.target.value)}
                rows={3}
                placeholder={t('farmerObsPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-agri-dark font-medium text-sm focus:ring-2 focus:ring-agri-fresh focus:outline-none shadow-sm"
              />
            </div>

          </div>

          {/* Submit / Analyze Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleStartAnalysis}
              disabled={!selectedImage || isAnalyzing}
              className={`w-full py-4 rounded-2xl font-extrabold text-base sm:text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg ${
                !selectedImage || isAnalyzing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-agri-deep via-agri-fresh to-agri-leaf text-white hover:brightness-110 hover:shadow-glow-green active:scale-98'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin text-agri-yellow" />
                  <span className="animate-pulse">{loadingMessages[loadingStepIndex]}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-agri-yellow" />
                  <span>{t('analyzeBtn')}</span>
                </>
              )}
            </button>
            {!selectedImage && (
              <p className="text-center text-xs text-amber-600 font-semibold mt-2 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Please take a photo or select a sample photo above to analyze.
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
