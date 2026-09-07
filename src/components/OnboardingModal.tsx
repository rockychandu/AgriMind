import React, { useState } from 'react';
import { X, User, Phone, MapPin, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { CropType, FarmProfile, Language } from '../types';
import { getTranslation } from '../services/i18n';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: FarmProfile) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentProfile: FarmProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  language,
  setLanguage,
  currentProfile,
}) => {
  const t = (key: string) => getTranslation(language, key);

  const [name, setName] = useState(currentProfile.name || 'Ramesh Kumar');
  const [mobile, setMobile] = useState(currentProfile.mobile || '9876543210');
  const [locationName, setLocationName] = useState(currentProfile.locationName || 'Guntur, Andhra Pradesh');
  const [primaryCrop, setPrimaryCrop] = useState<CropType>(currentProfile.primaryCrop || 'Cotton');
  const [farmSizeAcres, setFarmSizeAcres] = useState(currentProfile.farmSizeAcres || '3.5');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      mobile,
      locationName,
      primaryCrop,
      farmSizeAcres,
      language,
      isGuest: false,
    });
    onClose();
  };

  const handleContinueGuest = () => {
    onSaveProfile({
      ...currentProfile,
      isGuest: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-agri-fresh/30 relative max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-agri-dark p-1 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-agri-fresh to-agri-leaf text-agri-dark flex items-center justify-center font-bold text-2xl mx-auto shadow">
            🌱
          </div>
          <h2 className="text-2xl font-extrabold text-agri-dark">
            Tell us about your farm
          </h2>
          <p className="text-xs text-gray-600 font-medium">
            Customizes weather-aware spray windows & disease recommendations for your fields.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-agri-dark">
          
          {/* Name */}
          <div>
            <label className="block mb-1 uppercase tracking-wider">Farmer Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-agri-deep absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-agri-fresh focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 uppercase tracking-wider">Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-agri-deep absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-agri-fresh focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 uppercase tracking-wider">Farm Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-agri-deep absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Village / District..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-agri-fresh focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Primary Crop */}
            <div>
              <label className="block mb-1 uppercase tracking-wider">Primary Crop</label>
              <select
                value={primaryCrop}
                onChange={(e) => setPrimaryCrop(e.target.value as CropType)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-agri-fresh focus:outline-none"
              >
                <option value="Cotton">Cotton (పత్తి)</option>
                <option value="Rice">Rice (వరి)</option>
                <option value="Chilli">Chilli (మిరప)</option>
                <option value="Tomato">Tomato (టమోటా)</option>
                <option value="Maize">Maize (జొన్న)</option>
                <option value="Groundnut">Groundnut (వేరుశనగ)</option>
              </select>
            </div>

            {/* Farm Size */}
            <div>
              <label className="block mb-1 uppercase tracking-wider">Farm Size (Acres)</label>
              <input
                type="text"
                value={farmSizeAcres}
                onChange={(e) => setFarmSizeAcres(e.target.value)}
                placeholder="e.g. 3.5"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 font-medium focus:ring-2 focus:ring-agri-fresh focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-agri-deep to-agri-fresh text-white font-extrabold text-sm shadow-md hover:brightness-110 transition-all pt-3"
          >
            Save Farm Profile
          </button>
        </form>

        {/* Continue as Guest option */}
        <div className="pt-3 border-t border-gray-200 text-center">
          <button
            type="button"
            onClick={handleContinueGuest}
            className="text-xs text-gray-500 hover:text-agri-dark font-bold underline transition-colors"
          >
            Continue as Guest (No account needed)
          </button>
        </div>

      </div>
    </div>
  );
};
