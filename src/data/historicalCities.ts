export interface HistoricalCity {
  id: string;
  name: string;
  countryId: string;
  coordinates: [number, number]; // [lat, lng]
  population: {
    ancient?: number;
    medieval?: number;
    colonial?: number;
    modern?: number;
    future?: number;
  };
  historicalSignificance: string;
  eraInfo: {
    era: "ancient" | "medieval" | "colonial" | "modern" | "future";
    description: string;
    role: string; // e.g., "Trade Hub", "Administrative Center", "Cultural Heart"
  }[];
}

export const historicalCities: HistoricalCity[] = [
  {
    id: "alexandria",
    name: "Alexandria",
    countryId: "EG",
    coordinates: [31.2001, 29.9187],
    population: {
      ancient: 500000,
      medieval: 200000,
      colonial: 300000,
      modern: 5200000,
    },
    historicalSignificance: "Major Mediterranean trade hub, home to the Library of Alexandria.",
    eraInfo: [
      { era: "ancient", description: "Founded by Alexander the Great (332 BC)", role: "Cultural & Trade Hub" },
      { era: "medieval", description: "Declined under Arab rule but remained important", role: "Regional Port" },
      { era: "colonial", description: "Revived under British and Egyptian modernization", role: "Imperial Gateway" },
      { era: "modern", description: "Modern metropolis on Mediterranean", role: "Trade & Culture" },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    countryId: "IT",
    coordinates: [41.9028, 12.4964],
    population: {
      ancient: 1000000,
      medieval: 50000,
      colonial: 150000,
      modern: 2850000,
    },
    historicalSignificance: "Capital of Roman Empire, center of Christianity.",
    eraInfo: [
      { era: "ancient", description: "Capital of world's greatest empire", role: "Imperial Center" },
      { era: "medieval", description: "Seat of Papacy, religiously significant", role: "Religious Center" },
      { era: "colonial", description: "Papal States under limited secular power", role: "Ecclesiastical Power" },
      { era: "modern", description: "Capital of united Italian nation", role: "National Capital" },
    ],
  },
  {
    id: "athens",
    name: "Athens",
    countryId: "GR",
    coordinates: [37.9715, 23.7267],
    population: {
      ancient: 200000,
      medieval: 50000,
      colonial: 100000,
      modern: 3154000,
    },
    historicalSignificance: "Birthplace of democracy and Western philosophy.",
    eraInfo: [
      { era: "ancient", description: "Peak of Classical Greek civilization", role: "Philosophical Center" },
      { era: "medieval", description: "Declined under Byzantine and Ottoman rule", role: "Regional City" },
      { era: "colonial", description: "Part of Ottoman Empire", role: "Provincial City" },
      { era: "modern", description: "Capital of modern Greece", role: "National Capital" },
    ],
  },
  {
    id: "bagdad",
    name: "Baghdad",
    countryId: "IQ",
    coordinates: [33.3128, 44.3615],
    population: {
      ancient: 0,
      medieval: 1500000,
      colonial: 300000,
      modern: 7665000,
    },
    historicalSignificance: "Capital of Abbasid Caliphate, center of Islamic Golden Age.",
    eraInfo: [
      { era: "medieval", description: "Abbasid capital, center of learning and science", role: "Islamic Center" },
      { era: "colonial", description: "Declined under Ottoman rule", role: "Provincial City" },
      { era: "modern", description: "Modern capital of Iraq", role: "National Capital" },
    ],
  },
  {
    id: "beijing",
    name: "Beijing",
    countryId: "CN",
    coordinates: [39.9042, 116.4074],
    population: {
      ancient: 500000,
      medieval: 1000000,
      colonial: 500000,
      modern: 20960000,
    },
    historicalSignificance: "Chinese imperial capital, seat of many dynasties.",
    eraInfo: [
      { era: "ancient", description: "Early settlement, minor regional importance", role: "Regional City" },
      { era: "medieval", description: "Yuan, Ming, Qing dynasty capital", role: "Imperial Center" },
      { era: "colonial", description: "Partially controlled by foreign powers", role: "Contested City" },
      { era: "modern", description: "Modern capital of China", role: "National Capital" },
    ],
  },
  {
    id: "constantinople",
    name: "Constantinople",
    countryId: "TR",
    coordinates: [41.0082, 28.9784],
    population: {
      ancient: 400000,
      medieval: 400000,
      colonial: 150000,
      modern: 15800000,
    },
    historicalSignificance: "Capital of Byzantine Empire, gateway between Europe and Asia.",
    eraInfo: [
      { era: "ancient", description: "Founded by Constantine as Byzantium", role: "Imperial Capital" },
      { era: "medieval", description: "Byzantine Empire capital for 1000 years", role: "Eastern Roman Center" },
      { era: "colonial", description: "Conquered by Ottomans, renamed Istanbul", role: "Ottoman Capital" },
      { era: "modern", description: "Modern Istanbul, largest city in Turkey", role: "Economic Hub" },
    ],
  },
  {
    id: "delhi",
    name: "Delhi",
    countryId: "IN",
    coordinates: [28.7041, 77.1025],
    population: {
      ancient: 200000,
      medieval: 500000,
      colonial: 600000,
      modern: 31407000,
    },
    historicalSignificance: "Multiple Indian capitals, seat of various empires.",
    eraInfo: [
      { era: "ancient", description: "Early settlements on Yamuna river", role: "Regional Hub" },
      { era: "medieval", description: "Delhi Sultanate capital, major trade center", role: "Islamic Capital" },
      { era: "colonial", description: "British make Delhi center of control", role: "British Colonial Hub" },
      { era: "modern", description: "Capital of independent India", role: "National Capital" },
    ],
  },
  {
    id: "istanbul_bazaar",
    name: "Istanbul (Ottoman Trade Hub)",
    countryId: "TR",
    coordinates: [41.0082, 28.9784],
    population: {
      medieval: 300000,
      colonial: 200000,
      modern: 15800000,
    },
    historicalSignificance: "Ottoman Empire's commercial powerhouse.",
    eraInfo: [
      { era: "medieval", description: "Ottoman trading post", role: "Trade Hub" },
      { era: "colonial", description: "Ottoman Empire capital and trade center", role: "Ottoman Capital" },
      { era: "modern", description: "Turkey's largest city and economic center", role: "Modern Metropolis" },
    ],
  },
  {
    id: "cairo",
    name: "Cairo",
    countryId: "EG",
    coordinates: [30.0444, 31.2357],
    population: {
      ancient: 0,
      medieval: 300000,
      colonial: 400000,
      modern: 20900000,
    },
    historicalSignificance: "Islamic Cairo, center of Islamic world in medieval times.",
    eraInfo: [
      { era: "medieval", description: "Mamluk Sultanate capital, major Islamic center", role: "Islamic Power Center" },
      { era: "colonial", description: "Egyptian regional capital under British rule", role: "Colonial Center" },
      { era: "modern", description: "Capital of modern Egypt", role: "National Capital" },
    ],
  },
  {
    id: "london",
    name: "London",
    countryId: "GB",
    coordinates: [51.5074, -0.1278],
    population: {
      ancient: 50000,
      medieval: 100000,
      colonial: 500000,
      modern: 9060000,
    },
    historicalSignificance: "Hub of the British Empire, global financial center.",
    eraInfo: [
      { era: "ancient", description: "Roman settlement (Londinium)", role: "Regional Port" },
      { era: "medieval", description: "English royal city and trade center", role: "National Center" },
      { era: "colonial", description: "Capital of world's largest empire", role: "Imperial Capital" },
      { era: "modern", description: "Global financial and cultural center", role: "World City" },
    ],
  },
  {
    id: "paris",
    name: "Paris",
    countryId: "FR",
    coordinates: [48.8566, 2.3522],
    population: {
      ancient: 50000,
      medieval: 200000,
      colonial: 500000,
      modern: 2165000,
    },
    historicalSignificance: "Center of French power, art, and culture.",
    eraInfo: [
      { era: "ancient", description: "Celtic settlement on Seine island", role: "Regional City" },
      { era: "medieval", description: "French royal capital, emerging power", role: "National Center" },
      { era: "colonial", description: "Enlightenment hub, French imperial center", role: "Cultural Capital" },
      { era: "modern", description: "Modern Europe's cultural heart", role: "Global Cultural Hub" },
    ],
  },
];
