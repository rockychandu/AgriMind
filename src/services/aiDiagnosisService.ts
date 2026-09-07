import { CropType, DiagnosisResult, GrowthStage, SampleCropPreset, SeverityLevel, WeatherData } from '../types';

export const SAMPLE_PRESETS: SampleCropPreset[] = [
  {
    id: 'preset-rice',
    crop: 'Rice',
    diseaseName: 'Rice Blast Disease',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=800&auto=format&fit=crop',
    label: 'Rice • Spindle Spots',
    sampleObservation: 'Leaves showing diamond/spindle-shaped lesions with grayish centers after recent humid days.'
  },
  {
    id: 'preset-cotton',
    crop: 'Cotton',
    diseaseName: 'Cercospora Leaf Spot',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop',
    label: 'Cotton • Brown Leaf Spots',
    sampleObservation: 'Small circular reddish-brown spots with purple borders appearing on lower leaves.'
  },
  {
    id: 'preset-chilli',
    crop: 'Chilli',
    diseaseName: 'Chilli Leaf Curl Syndrome',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=800&auto=format&fit=crop',
    label: 'Chilli • Upward Leaf Curling',
    sampleObservation: 'Leaves puckered, curling upwards with stunted terminal shoots.'
  },
  {
    id: 'preset-tomato',
    crop: 'Tomato',
    diseaseName: 'Early Blight',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop',
    label: 'Tomato • Target Spots',
    sampleObservation: 'Concentric ring dark brown spots on older lower leaves, yellowing around spots.'
  },
  {
    id: 'preset-maize',
    crop: 'Maize',
    diseaseName: 'Turcicum Leaf Blight',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
    label: 'Maize • Long Gray Lesions',
    sampleObservation: 'Elliptical gray-brown spots parallel to leaf veins.'
  },
  {
    id: 'preset-groundnut',
    crop: 'Groundnut',
    diseaseName: 'Tikka Leaf Spot',
    severity: 'Low',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop',
    label: 'Groundnut • Dark Leaf Spots',
    sampleObservation: 'Circular dark dark-brown spots surrounded by yellow halos on mature foliage.'
  }
];

export const analyzeCropImage = async (
  imageUrl: string,
  crop: CropType,
  growthStage: GrowthStage,
  locationName: string,
  farmerObservation?: string,
  weatherData?: WeatherData
): Promise<DiagnosisResult> => {
  // Simulate AI deep learning processing latency (1.8s)
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const rainForecastHigh = weatherData?.forecast?.some((f, idx) => idx <= 1 && f.rainProbability >= 50);
  const rainTomm = weatherData?.forecast?.[1]?.rainProbability || 70;

  // Compute spray window based on upcoming weather timeline
  let sprayWindowAdvice;
  if (rainForecastHigh) {
    sprayWindowAdvice = {
      isSafeToSpray: false,
      recommendedTimeWindow: 'Wait 36–48 Hours (After rain clears)',
      reason: `High rain chance (${rainTomm}%) expected tomorrow. Chemical sprays will wash off into soil, wasting input cost and contaminating runoff.`,
      warningMessage: 'Rain is expected soon and will wash away liquid spray applications.',
      weatherTimelineSummary: 'Rain expected tomorrow morning → Dry window opens on Day 3 morning (6:00 AM – 9:00 AM).'
    };
  } else {
    sprayWindowAdvice = {
      isSafeToSpray: true,
      recommendedTimeWindow: 'Tomorrow Morning, 6:00 AM – 9:00 AM',
      reason: 'Low rain probability (< 20%), optimal morning humidity, and gentle wind speed (< 12 km/h) ensure maximum foliage absorption.',
      warningMessage: 'Recheck weather forecast if cloud cover increases rapidly.',
      weatherTimelineSummary: 'Clear dry morning conditions expected for the next 48 hours.'
    };
  }

  // Base disease profile depending on crop
  switch (crop) {
    case 'Rice':
      return {
        id: `diag-${Date.now()}`,
        crop: 'Rice',
        growthStage,
        diseaseName: 'Rice Blast (Pyricularia oryzae)',
        scientificName: 'Pyricularia oryzae',
        confidence: 89,
        severity: 'Moderate',
        imageUrl,
        symptoms: [
          'Diamond or spindle-shaped brown lesions on leaves',
          'Center of spots appearing whitish to gray with dark brown margins',
          'Lesions enlarging rapidly under high humidity',
          'Mild yellowing surrounding affected leaf sections'
        ],
        summaryExplanation: 'Your rice crop shows visual symptoms characteristic of Rice Blast. Spindle-shaped gray-centered spots are interfering with leaf photosynthesis.',
        whyItHappened: [
          'High night temperatures combined with relative humidity above 85%',
          'Heavy dew formation or lingering water droplets on leaf canopy',
          'Excess nitrogen fertilizer application without balanced potassium',
          'Airborne fungal spores traveling from neighboring affected paddy fields'
        ],
        treatmentPlan: [
          {
            stepNumber: 1,
            title: 'Remove Severely Affected Leaves & Drain Stagnant Water',
            description: 'Prune heavily infected lower leaves and dispose of them outside the farm perimeter. Temporarily drain excessive standing water for 2 days to lower humidity.'
          },
          {
            stepNumber: 2,
            title: 'Improve Canopy Ventilation & Nitrogen Balance',
            description: 'Avoid applying quick-release urea nitrogen fertilizer right now. Top-dress with Potash (MOP) to strengthen plant cell walls.'
          },
          {
            stepNumber: 3,
            title: 'Apply Recommended Bio-Fungicide / Spray Option',
            description: 'Spray Trichoderma viride bio-fungicide OR consult local agriculture guidelines for recommended Tricyclazole 75% WP.',
            activeIngredient: 'Tricyclazole 75% WP or Pseudomonas fluorescens',
            purpose: 'Inhibits fungal spore germination and protects clean emerging leaves.',
            safetyWarning: 'Follow product label directions strictly. Wear protective gloves and face mask during spraying.'
          }
        ],
        sprayWindow: sprayWindowAdvice,
        preventionSteps: [
          'Use blast-resistant certified seed varieties (e.g. BPT 5204 or MTU 1010 resistant strains)',
          'Treat seeds with Carbendazim (2g/kg seed) before sowing',
          'Maintain balanced NPK fertilizer ratio (120:60:60 kg/ha)'
        ],
        detectionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        farmerObservation,
        locationName,
        expertConsultationRecommended: false
      };

    case 'Cotton':
      return {
        id: `diag-${Date.now()}`,
        crop: 'Cotton',
        growthStage,
        diseaseName: 'Cercospora Leaf Spot',
        scientificName: 'Cercospora gossypina',
        confidence: 86,
        severity: 'Moderate',
        imageUrl,
        symptoms: [
          'Small circular reddish-purple spots on lower older foliage',
          'As spots age, centers turn light brown/tan',
          'Premature leaf drop in severe spots',
          'Reduced boll filling in upper canopy'
        ],
        summaryExplanation: 'Visual features indicate Cercospora spot infection. The circular reddish-brown specks are caused by fungal spores spreading during humid spells.',
        whyItHappened: [
          'Extended leaf wetness following recent rains',
          'Potassium deficiency in cotton plants during boll formation stage',
          'Dense crop spacing hindering sunlight penetration'
        ],
        treatmentPlan: [
          {
            stepNumber: 1,
            title: 'Clear Infected Foliage & Weeds',
            description: 'Pick off fallen diseased foliage from around the plant base to prevent spore splash-back onto clean leaves.'
          },
          {
            stepNumber: 2,
            title: 'Foliar Spray of Potash & Micronutrients',
            description: 'Foliar application of 1% Potassium Nitrate (13-0-45) to reduce physiological stress.'
          },
          {
            stepNumber: 3,
            title: 'Targeted Fungicidal Protection',
            description: 'If leaf spots spread to more than 15% foliage, spray Copper Oxychloride 50% WP.',
            activeIngredient: 'Copper Oxychloride 50% WP or Mancozeb 75% WP',
            purpose: 'Forms a protective copper barrier blocking fungal cell division.',
            safetyWarning: 'Do not spray during high afternoon wind or when heavy rain is expected within 12 hours.'
          }
        ],
        sprayWindow: sprayWindowAdvice,
        preventionSteps: [
          'Maintain proper plant spacing (90cm x 60cm)',
          'Apply farmyard manure (FYM) before planting to build soil health',
          'Rotate crops with sorghum or maize every 2 seasons'
        ],
        detectionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        farmerObservation,
        locationName,
        expertConsultationRecommended: false
      };

    case 'Chilli':
      return {
        id: `diag-${Date.now()}`,
        crop: 'Chilli',
        growthStage,
        diseaseName: 'Chilli Leaf Curl Virus & Thrips Damage',
        scientificName: 'Begomovirus / Scirtothrips dorsalis',
        confidence: 91,
        severity: 'High',
        imageUrl,
        symptoms: [
          'Upward curling and boat-shaped puckering of leaves',
          'Stunted terminal plant shoots and short internodes',
          'Thickened, leathery leaf texture with yellowing veins',
          'Reduced flower drop and smaller misshapen chilli pods'
        ],
        summaryExplanation: 'Your chilli plant shows upward leaf curling caused by insect vector (Whitefly/Thrips) transmitting viral infection.',
        whyItHappened: [
          'High population of whiteflies and thrips during dry hot spells',
          'Presence of alternate weed hosts nearby (e.g. Parthenium)',
          'Delay in early vector management at nursery/vegetative stage'
        ],
        treatmentPlan: [
          {
            stepNumber: 1,
            title: 'Install Yellow & Blue Sticky Traps',
            description: 'Hang 10–12 Yellow Sticky Traps (for Whiteflies) and Blue Sticky Traps (for Thrips) per acre at crop height.'
          },
          {
            stepNumber: 2,
            title: 'Uproot Severely Stunted Viral Plants',
            description: 'Carefully pull out totally distorted viral plants, place them in a plastic bag, and destroy them away from field.'
          },
          {
            stepNumber: 3,
            title: 'Vector Control Bio-Botanical Spray',
            description: 'Spray Neem Oil (10,000 ppm) at 3ml/liter water OR recommended systemic insecticide.',
            activeIngredient: 'Neem Oil 10,000 ppm OR Imidacloprid 17.8% SL (under expert guidance)',
            purpose: 'Controls sap-sucking whiteflies and thrips to halt further virus transmission.',
            safetyWarning: 'Spray during early morning or evening to protect beneficial pollinator bees.'
          }
        ],
        sprayWindow: sprayWindowAdvice,
        preventionSteps: [
          'Use insect-proof nursery nets during seedling stage',
          'Plant border rows of maize or sorghum as physical barrier against flying insects',
          'Keep field bunds free from weeds'
        ],
        detectionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        farmerObservation,
        locationName,
        expertConsultationRecommended: true
      };

    case 'Tomato':
      return {
        id: `diag-${Date.now()}`,
        crop: 'Tomato',
        growthStage,
        diseaseName: 'Tomato Early Blight',
        scientificName: 'Alternaria solani',
        confidence: 88,
        severity: 'High',
        imageUrl,
        symptoms: [
          'Concentric ring "target board" brown spots on lower leaves',
          'Yellow halo surrounding brownish leaf lesions',
          'Drying and crisping of lower canopy leaves',
          'Dark sunken spots near fruit stem attachment'
        ],
        summaryExplanation: 'Symptoms closely match Early Blight fungal infection. Concentric circular target-like spots break down green chlorophyll.',
        whyItHappened: [
          'Warm temperatures (24–29°C) combined with frequent rain or overhead sprinkler watering',
          'Soil-borne fungal spores splashing onto low-hanging leaves',
          'Inadequate stakes/pruning causing lower leaves to touch moist soil'
        ],
        treatmentPlan: [
          {
            stepNumber: 1,
            title: 'Prune Lower 12 Inches of Foliage',
            description: 'Cut off all leaves touching the ground. Stake plants securely so branches remain upright.'
          },
          {
            stepNumber: 2,
            title: 'Mulch Soil Base',
            description: 'Cover soil around tomato plants with clean dry straw or plastic mulch to stop rain splash.'
          },
          {
            stepNumber: 3,
            title: 'Fungicide Foliar Protection',
            description: 'Apply Mancozeb 75% WP at 2.5g/liter or Copper Hydroxide.',
            activeIngredient: 'Mancozeb 75% WP or Azoxystrobin 23% SC',
            purpose: 'Protects upper healthy green foliage from fungal spore infection.',
            safetyWarning: 'Observe 7-day pre-harvest safety interval before picking tomatoes.'
          }
        ],
        sprayWindow: sprayWindowAdvice,
        preventionSteps: [
          'Drip irrigation instead of overhead spray watering',
          'Practice 3-year crop rotation without solanaceous crops (potato, brinjal)',
          'Ensure 60cm spacing between plants'
        ],
        detectionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        farmerObservation,
        locationName,
        expertConsultationRecommended: false
      };

    case 'Maize':
    case 'Groundnut':
    case 'Wheat':
    case 'Sugarcane':
    case 'Other':
    default:
      return {
        id: `diag-${Date.now()}`,
        crop,
        growthStage,
        diseaseName: `${crop} Leaf Spot & Blight Symptoms`,
        scientificName: 'Cercospora / Bipolaris species',
        confidence: 85,
        severity: 'Moderate',
        imageUrl,
        symptoms: [
          'Irregular brownish lesions with chlorotic yellow borders',
          'Foliage drying prematurely from leaf margins inward',
          'Mild leaf spotting across lower canopy leaves',
          'Slight reduction in leaf vigor'
        ],
        summaryExplanation: `Your ${crop} crop displays foliar spot symptoms commonly linked with fungal humidity stress or localized nutrient imbalance.`,
        whyItHappened: [
          'High ambient humidity and overcast weather conditions',
          'Poor air circulation inside dense crop canopy',
          'Over-irrigation leading to wet soil surfaces'
        ],
        treatmentPlan: [
          {
            stepNumber: 1,
            title: 'Remove Heavily Affected Foliage',
            description: 'Trim off severely spotted leaves and remove them from the field base.'
          },
          {
            stepNumber: 2,
            title: 'Regulate Watering & Soil Aeration',
            description: 'Allow topsoil surface to dry out slightly between waterings.'
          },
          {
            stepNumber: 3,
            title: 'Apply Protective Bio-Fungicide',
            description: 'Foliar spray of Trichoderma viride or recommended bio-pesticide.',
            activeIngredient: 'Trichoderma viride 1% WP or Copper Oxychloride 50% WP',
            purpose: 'Prevents fungal hyphae expansion across healthy leaves.',
            safetyWarning: 'Follow package safety precautions and local agriculture officer instructions.'
          }
        ],
        sprayWindow: sprayWindowAdvice,
        preventionSteps: [
          'Ensure proper crop spacing and weed management',
          'Use healthy, disease-indexed seeds',
          'Apply balanced organic compost and bio-fertilizers'
        ],
        detectionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        farmerObservation,
        locationName,
        expertConsultationRecommended: false
      };
  }
};
