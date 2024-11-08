interface CityCoordinates {
  lat: number;
  lon: number;
  id: number;
  alternateNames?: string[];
}

export const cityCoordinates: { [key: string]: CityCoordinates } = {
  // Major Cities
  'Tiranë': { lat: 41.3275, lon: 19.8187, id: 3183875, alternateNames: ['Tirana'] },
  'Durrës': { lat: 41.3233, lon: 19.4417, id: 3185728, alternateNames: ['Durres'] },
  'Vlorë': { lat: 40.4667, lon: 19.4833, id: 3183719, alternateNames: ['Vlore', 'Vlora'] },
  'Shkodër': { lat: 42.0683, lon: 19.5126, id: 3184081, alternateNames: ['Shkoder', 'Shkodra'] },
  'Elbasan': { lat: 41.1125, lon: 20.0822, id: 3185670 },
  'Fier': { lat: 40.7239, lon: 19.5567, id: 3185638 },
  'Korçë': { lat: 40.6186, lon: 20.7808, id: 3184862, alternateNames: ['Korce', 'Korca'] },
  'Berat': { lat: 40.7058, lon: 19.9522, id: 3186084 },
  'Lushnjë': { lat: 40.9419, lon: 19.7050, id: 3184517, alternateNames: ['Lushnje'] },
  'Kavajë': { lat: 41.1856, lon: 19.5569, id: 3185012, alternateNames: ['Kavaje'] },

  // Other Cities
  'Bajram Curri': { lat: 42.3573, lon: 20.0764, id: 781171 },
  'Ballsh': { lat: 40.5989, lon: 19.7347, id: 3186145 },
  'Bilisht': { lat: 40.6278, lon: 20.9900, id: 3186053 },
  'Bulqizë': { lat: 41.4917, lon: 20.2219, id: 3186957, alternateNames: ['Bulqize'] },
  'Burrel': { lat: 41.6100, lon: 20.0089, id: 3186952 },
  'Cërrik': { lat: 41.0317, lon: 19.9756, id: 3186449, alternateNames: ['Cerrik'] },
  'Çorovodë': { lat: 40.5044, lon: 20.2272, id: 3186280, alternateNames: ['Corovode'] },
  'Delvinë': { lat: 39.9508, lon: 20.0958, id: 3185892, alternateNames: ['Delvine'] },
  'Divjakë': { lat: 40.9964, lon: 19.5289, id: 3185840, alternateNames: ['Divjake'] },
  'Ersekë': { lat: 40.3378, lon: 20.6789, id: 3185665, alternateNames: ['Erseke'] },
  'Fushë-Krujë': { lat: 41.4783, lon: 19.7178, id: 3185583, alternateNames: ['Fushe-Kruje'] },
  'Gramsh': { lat: 40.8697, lon: 20.1844, id: 3185462 },
  'Himarë': { lat: 40.1017, lon: 19.7453, id: 3185385, alternateNames: ['Himare'] },
  'Kamëz': { lat: 41.3817, lon: 19.7606, id: 3185037, alternateNames: ['Kamez', 'Kamza'] },
  'Këlcyrë': { lat: 40.3131, lon: 20.1894, id: 3185007, alternateNames: ['Kelcyre'] },
  'Koplik': { lat: 42.2136, lon: 19.4367, id: 3184875 },
  'Krujë': { lat: 41.5089, lon: 19.7928, id: 3184779, alternateNames: ['Kruje'] },
  'Kuçovë': { lat: 40.8003, lon: 19.9167, id: 3184748, alternateNames: ['Kucove'] },
  'Kukës': { lat: 42.0769, lon: 20.4219, id: 3184735, alternateNames: ['Kukes'] },
  'Laç': { lat: 41.6356, lon: 19.7131, id: 3184688, alternateNames: ['Lac'] },
  'Leskovik': { lat: 40.1511, lon: 20.5972, id: 3184591 },
  'Lezhë': { lat: 41.7836, lon: 19.6436, id: 3184571, alternateNames: ['Lezhe'] },
  'Librazhd': { lat: 41.1792, lon: 20.3147, id: 3184538 },
  'Maliq': { lat: 40.7058, lon: 20.6997, id: 3184475 },
  'Mamurras': { lat: 41.5775, lon: 19.6922, id: 3184464 },
  'Memaliaj': { lat: 40.3514, lon: 19.9803, id: 3184432 },
  'Orikum': { lat: 40.3258, lon: 19.4717, id: 3184233 },
  'Patos': { lat: 40.6833, lon: 19.6167, id: 3184172 },
  'Peqin': { lat: 41.0461, lon: 19.7514, id: 3184148 },
  'Përmet': { lat: 40.2339, lon: 20.3517, id: 3184137, alternateNames: ['Permet'] },
  'Peshkopi': { lat: 41.6850, lon: 20.4289, id: 3184127 },
  'Pogradec': { lat: 40.9025, lon: 20.6525, id: 3184081 },
  'Pukë': { lat: 42.0444, lon: 19.8997, id: 3184029, alternateNames: ['Puke'] },
  'Roskovec': { lat: 40.7375, lon: 19.7019, id: 3183952 },
  'Rrëshen': { lat: 41.7675, lon: 19.8756, id: 3183937, alternateNames: ['Rreshen'] },
  'Rrogozhinë': { lat: 41.0758, lon: 19.6653, id: 3183936, alternateNames: ['Rrogozhine'] },
  'Sarandë': { lat: 39.8756, lon: 20.0053, id: 3183875, alternateNames: ['Sarande', 'Saranda'] },
  'Selenicë': { lat: 40.5306, lon: 19.6358, id: 3183864, alternateNames: ['Selenice'] },
  'Shëngjin': { lat: 41.8136, lon: 19.5944, id: 3183719, alternateNames: ['Shengjin'] },
  'Shijak': { lat: 41.3458, lon: 19.5672, id: 3183717 },
  'Tepelenë': { lat: 40.2958, lon: 20.0192, id: 3183623, alternateNames: ['Tepelene'] },
  'Velipojë': { lat: 41.8744, lon: 19.4269, id: 3183521, alternateNames: ['Velipoje'] },
  'Voskopojë': { lat: 40.6325, lon: 20.5886, id: 3183437, alternateNames: ['Voskopoje'] }
};

export const getCityCoordinates = (cityName: string): CityCoordinates | null => {
  // Direct match
  if (cityCoordinates[cityName]) {
    return cityCoordinates[cityName];
  }

  // Check alternate names
  for (const [key, value] of Object.entries(cityCoordinates)) {
    if (value.alternateNames?.includes(cityName)) {
      return value;
    }
  }

  // Handle special cases with dashes
  const normalizedName = cityName.split('-').map(part => {
    // Check if each part exists in coordinates or alternate names
    for (const [key, value] of Object.entries(cityCoordinates)) {
      if (key.toLowerCase() === part.toLowerCase() || 
          value.alternateNames?.some(alt => alt.toLowerCase() === part.toLowerCase())) {
        return key;
      }
    }
    return part;
  })[0]; // Take the first valid city name found

  return cityCoordinates[normalizedName] || null;
};