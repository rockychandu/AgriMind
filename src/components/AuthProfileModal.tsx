import React, { useState, useEffect } from 'react';
import { User, X, LogIn, UserPlus, History, MapPin, Sprout, ShieldCheck, Award, Activity, LogOut, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FarmProfile } from '../types';

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmProfile | null;
  onSaveProfile: (profile: FarmProfile) => void;
  onLogout: () => void;
}

interface UserAccountRecord extends FarmProfile {
  password?: string;
  email?: string;
  id?: string;
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'login' | 'signup' | 'activity'>('login');
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLocation, setSignupLocation] = useState('Guntur, Andhra Pradesh');
  const [signupCrop, setSignupCrop] = useState('Bt Cotton');
  const [signupAcres, setSignupAcres] = useState('3.5');
  const [signupError, setSignupError] = useState('');

  // Activity Log State
  const [activityHistory, setActivityHistory] = useState<any[]>([]);

  // On open, set default tab based on login state
  useEffect(() => {
    if (isOpen) {
      if (profile && profile.name) {
        setActiveTab('profile');
      } else {
        setActiveTab('login');
      }
      setLoginError('');
      setSignupError('');
    }
  }, [isOpen, profile]);

  // Load activity history for active user
  useEffect(() => {
    if (profile && profile.mobile) {
      const storageKey = `agrimind_activity_${profile.mobile}`;
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setActivityHistory(JSON.parse(saved));
        } else {
          setActivityHistory([
            { id: 1, type: 'ACCOUNT_CREATED', title: 'Account Registered', desc: `Welcome ${profile.name} to AgriMind Platform`, time: 'Recently' },
            { id: 2, type: 'SOIL_TEST', title: 'Soil NPK Analysis Completed', desc: 'NPK (90-45-50), pH 6.8 - Suitable for Kharif Cotton', time: 'Today' },
            { id: 3, type: 'CROP_RECOMMENDATION', title: 'Indian Crop Recommendation Generated', desc: 'Top Match: Paddy Rice (94%) and Bt Cotton (88%)', time: 'Yesterday' },
          ]);
        }
      } catch (e) {}
    }
  }, [profile]);

  if (!isOpen) return null;

  // Helper to fetch registered users database from LocalStorage
  const getRegisteredUsers = (): UserAccountRecord[] => {
    try {
      const data = localStorage.getItem('agrimind_registered_users');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  // Helper to save registered users database
  const saveRegisteredUsers = (users: UserAccountRecord[]) => {
    try {
      localStorage.setItem('agrimind_registered_users', JSON.stringify(users));
    } catch (e) {}
  };

  // Sign Up Handler
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setSignupError('Please fill in all required fields.');
      return;
    }

    const registered = getRegisteredUsers();
    const existing = registered.find(u => u.mobile?.toLowerCase() === signupEmail.toLowerCase().trim());

    if (existing) {
      setSignupError('An account with this email address already exists. Please log in.');
      return;
    }

    const newUser: UserAccountRecord = {
      id: 'usr_' + Date.now(),
      name: signupName.trim(),
      mobile: signupEmail.trim().toLowerCase(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword.trim(),
      locationName: signupLocation.trim() || 'Guntur, AP',
      primaryCrop: signupCrop as any,
      farmSizeAcres: signupAcres || '3.5',
      language: 'en',
      isGuest: false,
    };

    // Save to database
    registered.push(newUser);
    saveRegisteredUsers(registered);

    // Save initial activity log
    const initialLog = [
      { id: Date.now(), type: 'ACCOUNT_CREATED', title: 'Farmer Account Created', desc: `Registered user ${newUser.name} on AgriMind platform.`, time: 'Just now' }
    ];
    try {
      localStorage.setItem(`agrimind_activity_${newUser.mobile}`, JSON.stringify(initialLog));
    } catch (e) {}

    // Authenticate user session
    onSaveProfile(newUser);
    setActiveTab('profile');
    alert(`Account created successfully! Welcome ${newUser.name}.`);
  };

  // Login Handler with Credential Verification
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter email and password.');
      return;
    }

    const registered = getRegisteredUsers();
    const target = registered.find(u => u.mobile?.toLowerCase() === loginEmail.trim().toLowerCase() || u.email?.toLowerCase() === loginEmail.trim().toLowerCase());

    if (!target) {
      setLoginError('Invalid account details or user does not exist. Please sign up first.');
      return;
    }

    if (target.password !== loginPassword.trim()) {
      setLoginError('Incorrect password! Please check your credentials and try again.');
      return;
    }

    // Login successful
    onSaveProfile(target);
    setActiveTab('profile');
    alert(`Logged in successfully as ${target.name}!`);
  };

  const handleLogoutClick = () => {
    if (confirm('Are you sure you want to log out from AgriMind?')) {
      onLogout();
      setActiveTab('login');
      setLoginEmail('');
      setLoginPassword('');
    }
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
              <h2 className="text-xl font-extrabold text-white">
                {profile ? `${profile.name}'s Dashboard` : 'Farmer Account Authentication'}
              </h2>
              <p className="text-xs text-agri-leaf font-bold">
                {profile ? 'Logged In Session' : 'Login or Create New Account'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-100 p-2 gap-2">
          {profile ? (
            <>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'profile' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <User className="w-4 h-4" /> My Dashboard
              </button>
              
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'activity' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <History className="w-4 h-4" /> Activity Log
              </button>

              <button
                onClick={handleLogoutClick}
                className="py-2.5 px-4 rounded-xl text-xs font-extrabold bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'login' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LogIn className="w-4 h-4" /> Log In
              </button>

              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'signup' ? 'bg-agri-dark text-agri-yellow shadow-md' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <UserPlus className="w-4 h-4" /> Sign Up / Register
              </button>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: LOGGED IN USER DETAILS & DASHBOARD */}
          {activeTab === 'profile' && profile && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-agri-dark text-agri-yellow flex items-center justify-center font-black text-2xl shadow-md border-2 border-agri-fresh">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-agri-dark">{profile.name}</h3>
                    <p className="text-xs text-gray-700 font-bold">{profile.mobile || 'Registered Farmer'}</p>
                    <span className="inline-block mt-1 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      ✓ Active Authenticated Session
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogoutClick}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Farmer Name</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <User className="w-4 h-4 text-agri-deep" /> {profile.name}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Email / Account ID</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-agri-deep" /> {profile.mobile}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Farm Location</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-agri-deep" /> {profile.locationName}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Primary Crop Cultivar</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-agri-deep" /> {profile.primaryCrop}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Farm Land Size</div>
                  <div className="text-base font-extrabold text-agri-dark flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-agri-deep" /> {profile.farmSizeAcres} Acres
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY HISTORY */}
          {activeTab === 'activity' && profile && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-lg font-extrabold text-agri-dark flex items-center gap-2">
                  <Activity className="w-5 h-5 text-agri-deep" /> Activity Log for {profile.name}
                </h3>
                <span className="text-xs bg-agri-fresh/20 text-agri-dark font-extrabold px-3 py-1 rounded-full">{activityHistory.length} Activities</span>
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
          {activeTab === 'login' && !profile && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center max-w-sm mx-auto mb-4">
                <h3 className="text-xl font-extrabold text-agri-dark">Log In to Your Account</h3>
                <p className="text-xs text-gray-600 font-semibold mt-1">Enter your registered email and password to access your farm dashboard.</p>
              </div>

              {loginError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-300 rounded-xl text-xs font-bold text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Email / Username</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
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
                className="w-full bg-agri-dark text-agri-yellow font-extrabold py-3 rounded-xl text-sm hover:bg-[#163E2E] transition-all shadow-md mt-4 cursor-pointer"
              >
                Log In
              </button>

              <div className="text-center text-xs font-bold text-gray-600 pt-2">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-agri-deep underline font-extrabold cursor-pointer"
                >
                  Sign Up Here
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: SIGNUP FORM */}
          {activeTab === 'signup' && !profile && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="text-center max-w-sm mx-auto mb-4">
                <h3 className="text-xl font-extrabold text-agri-dark">Create New Farmer Account</h3>
                <p className="text-xs text-gray-600 font-semibold mt-1">Sign up to save your farm details and activity history in our database.</p>
              </div>

              {signupError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-300 rounded-xl text-xs font-bold text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-agri-dark focus:outline-none focus:border-agri-fresh"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-agri-dark uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="farmer@example.com"
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
                className="w-full bg-agri-fresh text-agri-dark font-extrabold py-3 rounded-xl text-sm hover:bg-emerald-400 transition-all shadow-md mt-4 cursor-pointer"
              >
                Sign Up Account
              </button>

              <div className="text-center text-xs font-bold text-gray-600 pt-2">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-agri-deep underline font-extrabold cursor-pointer"
                >
                  Log In Here
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
