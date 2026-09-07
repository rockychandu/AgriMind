export type Language = 'en' | 'hi' | 'te';

export type CropType = 
  | 'Rice' 
  | 'Cotton' 
  | 'Chilli' 
  | 'Tomato' 
  | 'Maize' 
  | 'Groundnut' 
  | 'Sugarcane' 
  | 'Wheat' 
  | 'Other';

export type GrowthStage = 
  | 'Seedling' 
  | 'Vegetative' 
  | 'Flowering' 
  | 'Fruiting' 
  | 'Harvest';

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface WeatherForecastDay {
  dayName: string;
  dateStr: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  condition: string;
  icon: string;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherData {
  locationName: string;
  latitude: number;
  longitude: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  condition: string;
  icon: string;
  lastUpdated: string;
  forecast: WeatherForecastDay[];
}

export interface TreatmentStep {
  stepNumber: number;
  title: string;
  description: string;
  activeIngredient?: string;
  purpose?: string;
  safetyWarning?: string;
}

export interface SprayWindowAdvice {
  isSafeToSpray: boolean;
  recommendedTimeWindow: string;
  reason: string;
  warningMessage: string;
  weatherTimelineSummary: string;
}

export interface DiagnosisResult {
  id: string;
  crop: CropType;
  growthStage: GrowthStage;
  diseaseName: string;
  scientificName?: string;
  confidence: number;
  severity: SeverityLevel;
  imageUrl: string;
  symptoms: string[];
  summaryExplanation: string;
  whyItHappened: string[];
  treatmentPlan: TreatmentStep[];
  sprayWindow: SprayWindowAdvice;
  preventionSteps: string[];
  detectionDate: string;
  farmerObservation?: string;
  locationName: string;
  expertConsultationRecommended?: boolean;
}

export interface FarmProfile {
  name: string;
  mobile: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  primaryCrop: CropType;
  farmSizeAcres: string;
  language: Language;
  isGuest: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface SampleCropPreset {
  id: string;
  crop: CropType;
  diseaseName: string;
  severity: SeverityLevel;
  imageUrl: string;
  label: string;
  sampleObservation: string;
}
