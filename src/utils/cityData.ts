interface CityCoordinates {
  lat: number;
  lon: number;
  alternateNames?: string[];
}

export const cityCoordinates: { [key: string]: CityCoordinates } = {
  // Albania cities
  'Tiranë': { lat: 41.3275, lon: 19.8187 },
  'Durrës': { lat: 41.3233, lon: 19.4417 },
  'Vlorë': { lat: 40.4667, lon: 19.4833 },
  'Shkodër': { lat: 42.0683, lon: 19.5126 },
  'Elbasan': { lat: 41.1125, lon: 20.0822 },
  'Fier': { lat: 40.7239, lon: 19.5567 },
  'Korçë': { lat: 40.6186, lon: 20.7808 },
  'Berat': { lat: 40.7058, lon: 19.9522 },
  'Lushnjë': { lat: 40.9419, lon: 19.7050 },
  'Kavajë': { lat: 41.1856, lon: 19.5569 },
  'Pogradec': { lat: 40.9025, lon: 20.6525 },
  'Sarandë': { lat: 39.8756, lon: 20.0053 },
  'Peshkopi': { lat: 41.6850, lon: 20.4289 },
  'Kukës': { lat: 42.0769, lon: 20.4219 },
  'Lezhë': { lat: 41.7836, lon: 19.6436 },
  'Krujë': { lat: 41.5089, lon: 19.7928 },
  'Ballsh': { lat: 40.5989, lon: 19.7347 },
  'Bilisht': { lat: 40.6278, lon: 20.9900 },
  'Bulqizë': { lat: 41.4917, lon: 20.2219 },
  'Delvinë': { lat: 39.9508, lon: 20.0958 },
  'Divjakë': { lat: 40.9964, lon: 19.5289 },
  'Himarë': { lat: 40.1017, lon: 19.7453 },
  'Kamëz': { lat: 41.3817, lon: 19.7606 },
  'Këlcyrë': { lat: 40.3131, lon: 20.1894 },
  'Koplik': { lat: 42.2136, lon: 19.4367 },
  'Ksamil': { lat: 39.7675, lon: 19.9981 },
  'Përmet': { lat: 40.2339, lon: 20.3517 },
  'Pukë': { lat: 42.0444, lon: 19.8997 },
  'Tepelenë': { lat: 40.2958, lon: 20.0192 },
  'Velipojë': { lat: 41.8744, lon: 19.4269 }
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