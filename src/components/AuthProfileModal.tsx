import React, { useState } from 'react';
import { User, X, LogIn, UserPlus, History, MapPin, Sprout, ShieldCheck, CheckCircle2, Award, Activity } from 'lucide-react';
import { FarmProfile } from '../types';

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmProfile;
  onSaveProfile: (profile: FarmProfile) => void;
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'login' | 'signup' | 'activity'>('profile');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLocation, setSignupLocation] = useState('Guntur, Andhra Pradesh');
  const [signupCrop, setSignupCrop] = useState('Bt Cotton');
  const [signupAcres, setSignupAcres] = useState('3.5');

  // Simulated Activity Log History
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, type: 'SOIL_TEST', title: 'Soil NPK Analysis Completed', desc: 'NPK (90-45-50), pH 6.8 - Suitable for Kharif Cotton', time: 'Today, 2:15 PM' },
    { id: 2, type: 'CROP_RECOMMENDATION', title: 'Indian Crop Recommendation Generated', desc: 'Top Match: Paddy Rice (94%) and Bt Cotton (88%)', time: 'Yesterday, 5:30 PM' },
    { id: 3, type: 'FERTILIZER_PLAN', title: 'Wheat Fertilizer Schedule Generated', desc: 'DAP: 140kg, Urea: 260kg, MOP: 85kg split over 3 stages', time: '05 Sep 2026' },
    { id: 4, type: 'DISEASE_DIAGNOSIS', title: 'Crop Health Inspection', desc: 'Diagnosed Early Blight on Tomato foliage - Spray Copper Oxychloride', time: '02 Sep 2026' },
  ]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert('Please enter email and password.');
      return;
    }
    const nameFromEmail = loginEmail.split('@')[0];
    onSaveProfile({
      ...profile,
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      mobile: loginEmail,
    });
    setIsLoggedIn(true);
    setActiveTab('profile');
    alert('Logged in successfully!');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      alert('Please fill out all required fields.');
      return;
    }
    const updated: FarmProfile = {
      name: signupName,
      mobile: signupEmail,
      locationName: signupLocation,
      primaryCrop: (signupCrop as any),
      farmSizeAcres: signupAcres,
      language: 'en',
      isGuest: false,
    };
    onSaveProfile(updated);
    setIsLoggedIn(true);
    setActivityHistory([
      { id: Date.now(), type: 'ACCOUNT_CREATED', title: 'New Farmer Account Created', desc: `Welcome ${signupName} to AgriMind Platform!`, time: 'Just now' },
      ...activityHistory
    ]);
    setActiveTab('profile');
    alert('Account created successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-agri-fresh shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-dark to-[#163E2E] p-6 text-white flex justify-between items-center border-b border-agri-fresh/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-agri-fresh text-agri-dark flex items-center justify-center font-black shadow-lg">
              <User className="w-7 h-7 text-agri-dark" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Farmer Profile & Dashboard</h2>
              <p className="text-xs text-agri-leaf font-bold">AgriMind Account Management</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-100 p-2 gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'profile' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <User className="w-4 h-4" /> My Details
          </button>
          
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'activity' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <History className="w-4 h-4" /> Activity History
          </button>

          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'login' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <LogIn className="w-4 h-4" /> Login
          </button>

          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'signup' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Sign Up
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: USER PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-agri-dark text-agri-yellow flex items-center justify-center font-black text-2xl shadow-md">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'F'}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-agri-dark">{profile.name || 'Farmer Account'}</h3>
                    <p className="text-xs text-gray-700 font-bold">{profile.mobile || 'Registered Farmer'}</p>
                    <span className="inline-block mt-1 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Verified Account</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Farm Location</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-agri-deep" /> {profile.locationName || 'Guntur, Andhra Pradesh'}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Primary Crop Cultivar</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-agri-deep" /> {profile.primaryCrop || 'Bt Cotton'}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Farm Land Holding</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-agri-deep" /> {profile.farmSizeAcres || '3.5'} Acres
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Preferred Language</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-agri-deep" /> {profile.language === 'hi' ? 'हिंदी (Hindi)' : profile.language === 'te' ? 'తెలుగు (Telugu)' : 'English'}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('signup')}
                  className="bg-agri-dark text-agri-yellow font-extrabold px-5 py-2.5 rounded-xl text-xs hover:bg-[#163E2E] transition-all"
                >
                  Edit Profile Details
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY HISTORY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-lg font-extrabold text-agri-dark flex items-center gap-2">
                  <Activity className="w-5 h-5 text-agri-deep" /> Farmer Activity Log
                </h3>
                <span className="text-xs bg-agri-fresh/20 text-agri-dark font-extrabold px-3 py-1 rounded-full">{activityHistory.length} Recorded Activities</span>
              </div>

              <div className="space-y-3">
                {activityHistory.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 space-y-1 hover:border-agri-fresh transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-extrabold text-agri-dark">{item.title}</span>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-700 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center max-w-sm mx-auto mb-4">
                <h3 className="text-xl font-extrabold text-agri-dark">Farmer Login</h3>
                <p className="text-xs text-gray-600 font-semibold mt-1">Log in to access saved soil profiles, crop recommendations, and activity history.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Email / Mobile Number</label>
                <input
                  type="text"
                  required
                  placeholder="ramesh.kumar@example.com or 9876543210"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-agri-dark text-agri-yellow font-extrabold py-3 rounded-xl text-sm hover:bg-[#163E2E] transition-all shadow-md mt-4"
              >
                Log In to AgriMind
              </button>
            </form>
          )}

          {/* TAB 4: SIGNUP FORM */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="text-center max-w-sm mx-auto mb-4">
                <h3 className="text-xl font-extrabold text-agri-dark">New Farmer Sign Up</h3>
                <p className="text-xs text-gray-600 font-semibold mt-1">Create an account to track your farm activities and recommendations.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ramesh Kumar"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Email / Mobile</label>
                  <input
                    type="text"
                    required
                    placeholder="ramesh@gmail.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Farm Location</label>
                  <input
                    type="text"
                    placeholder="Guntur, Andhra Pradesh"
                    value={signupLocation}
                    onChange={(e) => setSignupLocation(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Primary Crop Cultivar</label>
                  <select
                    value={signupCrop}
                    onChange={(e) => setSignupCrop(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  >
                    <option value="Bt Cotton">Bt Cotton (कपास)</option>
                    <option value="Paddy Rice">Paddy Rice (धान)</option>
                    <option value="Bread Wheat">Bread Wheat (गेहूं)</option>
                    <option value="Sugarcane">Sugarcane (गन्ना)</option>
                    <option value="Chickpea">Chickpea / Gram (चना)</option>
                    <option value="Indian Mustard">Indian Mustard (सरसों)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Farm Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={signupAcres}
                    onChange={(e) => setSignupAcres(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-agri-fresh text-agri-dark font-extrabold py-3 rounded-xl text-sm hover:bg-emerald-400 transition-all shadow-md mt-4"
              >
                Create Farmer Account
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
