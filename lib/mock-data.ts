// Mock data for BESS projects and analytics

export interface BESSProject {
  id: string
  planta: string // Changed from 'name'
  pais: string // Changed from 'country'
  provincia: string // Changed from 'state'
  mw: number // Changed from 'capacity'
  mwh: number // Changed from 'capacityMWh'
  empresa: string // Changed from 'developer'
  status: "operational" | "under-construction" | "planned"
  lat: number // Changed from 'latitude'
  lon: number // Changed from 'longitude'
  year: number
}

export interface CountryStats {
  country: string
  totalCapacity: number
  projectCount: number
  growthRate: number
  yearlyData: { year: number; capacity: number }[]
}

// ejemplo de tabla de BESS projects en las Americas que va en la pagina principal
export const mockProjects: BESSProject[] = [
  {
    id: "1",
    pais: "United States",
    planta: "North Central Valley",
    empresa: "North Central Valley Energy Storage, LLC",
    mw: 132,
    mwh: 528,
    lat: 38.015291,
    lon: -121.0178,
    provincia: "CA",
    status: "operational",
    year: 2023,
  },
  {
    id: "2",
    pais: "United States",
    planta: "Manatee Solar Energy Center",
    empresa: "Florida Power & Light Co",
    mw: 409,
    mwh: 900,
    lat: 27.607469,
    lon: -82.35528,
    provincia: "FL",
    status: "operational",
    year: 2023,
  },
  {
    id: "3",
    pais: "United States",
    planta: "Sonoran Solar Energy",
    empresa: "Sonoran Solar Energy, LLC",
    mw: 260,
    mwh: 1040,
    lat: 33.248767,
    lon: -112.5424,
    provincia: "AZ",
    status: "operational",
    year: 2023,
  },
  {
    id: "4",
    pais: "United States",
    planta: "Kola Energy Center",
    empresa: "Kola Energy Storage, LLC",
    mw: 275,
    mwh: 1100,
    lat: 37.709773,
    lon: -121.5553,
    provincia: "CA",
    status: "operational",
    year: 2023,
  },
  {
    id: "5",
    pais: "United States",
    planta: "Gemini Solar Hybrid",
    empresa: "Gemini Solar",
    mw: 380,
    mwh: 380,
    lat: 36.4678,
    lon: -114.806,
    provincia: "NV",
    status: "operational",
    year: 2023,
  },
  {
    id: "6",
    pais: "United States",
    planta: "Sealy BESS",
    empresa: "Sealy Power, LLC",
    mw: 200,
    mwh: 400,
    lat: 29.847993,
    lon: -96.19868,
    provincia: "TX",
    status: "operational",
    year: 2023,
  },
  {
    id: "7",
    pais: "United States",
    planta: "Bright Arrow Solar, LLC",
    empresa: "Bright Arrow Solar, LLC",
    mw: 103.6,
    mwh: 100,
    lat: 33.22392,
    lon: -95.73077,
    provincia: "TX",
    status: "operational",
    year: 2023,
  },
  {
    id: "8",
    pais: "United States",
    planta: "Great Lakes Hydro America - ME",
    empresa: "Great Lakes Hydro America LLC",
    mw: 10,
    mwh: 10,
    lat: 45.647179,
    lon: -68.70437,
    provincia: "ME",
    status: "operational",
    year: 2023,
  },
  {
    id: "9",
    pais: "United States",
    planta: "Seaside BESS",
    empresa: "Portland General Electric Co",
    mw: 200,
    mwh: 800,
    lat: 45.615304,
    lon: -122.7811,
    provincia: "OR",
    status: "operational",
    year: 2023,
  },
  {
    id: "10",
    pais: "United States",
    planta: "Harding Street",
    empresa: "AES Indiana",
    mw: 20,
    mwh: 20,
    lat: 39.711319,
    lon: -86.19687,
    provincia: "IN",
    status: "operational",
    year: 2023,
  },
]

// Limited data for free tier (only 3 countries)
export const freeCountryStats: CountryStats[] = [
  {
    country: "United States",
    totalCapacity: 580,
    projectCount: 3,
    growthRate: 45.2,
    yearlyData: [
      { year: 2020, capacity: 150 },
      { year: 2021, capacity: 220 },
      { year: 2022, capacity: 380 },
      { year: 2023, capacity: 580 },
    ],
  },
  {
    country: "Brazil",
    totalCapacity: 120,
    projectCount: 1,
    growthRate: 67.8,
    yearlyData: [
      { year: 2020, capacity: 25 },
      { year: 2021, capacity: 45 },
      { year: 2022, capacity: 75 },
      { year: 2023, capacity: 120 },
    ],
  },
  {
    country: "Canada",
    totalCapacity: 200,
    projectCount: 1,
    growthRate: 38.5,
    yearlyData: [
      { year: 2020, capacity: 80 },
      { year: 2021, capacity: 120 },
      { year: 2022, capacity: 160 },
      { year: 2023, capacity: 200 },
    ],
  },
]

// Full data for pro tier
export const proCountryStats: CountryStats[] = [
  ...freeCountryStats,
  {
    country: "Mexico",
    totalCapacity: 95,
    projectCount: 1,
    growthRate: 52.3,
    yearlyData: [
      { year: 2020, capacity: 30 },
      { year: 2021, capacity: 50 },
      { year: 2022, capacity: 70 },
      { year: 2023, capacity: 95 },
    ],
  },
  {
    country: "Chile",
    totalCapacity: 85,
    projectCount: 1,
    growthRate: 71.2,
    yearlyData: [
      { year: 2020, capacity: 20 },
      { year: 2021, capacity: 35 },
      { year: 2022, capacity: 55 },
      { year: 2023, capacity: 85 },
    ],
  },
  {
    country: "Argentina",
    totalCapacity: 110,
    projectCount: 1,
    growthRate: 43.8,
    yearlyData: [
      { year: 2020, capacity: 40 },
      { year: 2021, capacity: 60 },
      { year: 2022, capacity: 85 },
      { year: 2023, capacity: 110 },
    ],
  },
  {
    country: "Peru",
    totalCapacity: 75,
    projectCount: 1,
    growthRate: 43.8,
    yearlyData: [
      { year: 2020, capacity: 0 },
      { year: 2021, capacity: 0 },
      { year: 2022, capacity: 0 },
      { year: 2023, capacity: 0 },
      { year: 2025, capacity: 75 },
    ],
  },
]

export const mockKPIs = {
  totalCapacity: 4740, // Updated total capacity with new projects
  totalProjects: 43, // Updated total project count
  averageGrowthRate: 52.4,
  countriesActive: 7,
  capacityUnderConstruction: 735, // Updated construction capacity
  plannedCapacity: 185,
}
