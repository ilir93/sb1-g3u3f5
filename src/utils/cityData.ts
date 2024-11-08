interface CityCoordinates {
  lat: number;
  lon: number;
  alternateNames?: string[];
}

export const cityCoordinates: { [key: string]: CityCoordinates } = {
  // Albania cities remain the same...

  // Kosovo
  'Artanë': { lat: 42.6167, lon: 21.4167, alternateNames: ['Novobërdë'] },
  'Besianë': { lat: 42.9094, lon: 21.1933, alternateNames: ['Podujevë'] },
  'Burim': { lat: 42.7808, lon: 20.4867, alternateNames: ['Istog'] },
  'Dardanë': { lat: 42.5889, lon: 21.5719, alternateNames: ['Kamenicë'] },
  'Deçan': { lat: 42.5389, lon: 20.2875 },
  'Dragash': { lat: 42.0264, lon: 20.6533, alternateNames: ['Sharr'] },
  'Drenas': { lat: 42.6283, lon: 20.8944, alternateNames: ['Gllogoc'] },
  'Ferizaj': { lat: 42.3706, lon: 21.1553 },
  'Fushë Kosovë': { lat: 42.6647, lon: 21.0961 },
  'Gjakovë': { lat: 42.3803, lon: 20.4308 },
  'Gjilan': { lat: 42.4639, lon: 21.4681 },
  'Graçanicë': { lat: 42.6000, lon: 21.1833 },
  'Hani i Elezit': { lat: 42.1511, lon: 21.2967 },
  'Junik': { lat: 42.4750, lon: 20.2750 },
  'Kaçanik': { lat: 42.2319, lon: 21.2594 },
  'Kastriot': { lat: 42.6867, lon: 21.0719, alternateNames: ['Obiliq'] },
  'Klinë': { lat: 42.6194, lon: 20.5778 },
  'Kllokot': { lat: 42.3667, lon: 21.3667 },
  'Leposaviq': { lat: 43.1039, lon: 20.8028 },
  'Lipjan': { lat: 42.5217, lon: 21.1258 },
  'Malishevë': { lat: 42.4828, lon: 20.7458 },
  'Mamushë': { lat: 42.3308, lon: 20.7269 },
  'Mitrovicë': { lat: 42.8914, lon: 20.8664 },
  'Pejë': { lat: 42.6597, lon: 20.2889 },
  'Prishtinë': { lat: 42.6629, lon: 21.1655 },
  'Prizren': { lat: 42.2139, lon: 20.7397 },
  'Rahovec': { lat: 42.3994, lon: 20.6547 },
  'Ranillug': { lat: 42.4917, lon: 21.5989 },
  'Sharr': { lat: 42.0264, lon: 20.6533, alternateNames: ['Dragash'] },
  'Shtërpcë': { lat: 42.2394, lon: 21.0272 },
  'Shtime': { lat: 42.4333, lon: 21.0397 },
  'Skenderaj': { lat: 42.7475, lon: 20.7886 },
  'Suharekë': { lat: 42.3586, lon: 20.8256, alternateNames: ['Therandë'] },
  'Viti': { lat: 42.3214, lon: 21.3583 },
  'Vushtrri': { lat: 42.8231, lon: 20.9675 },
  'Zubin Potok': { lat: 42.9144, lon: 20.6897 },
  'Zveçan': { lat: 42.9075, lon: 20.8397 },

  // North Macedonia
  'Shkup': { lat: 42.0024, lon: 21.3936 },
  'Tetovë': { lat: 42.0097, lon: 20.9715 },
  'Kumanovë': { lat: 42.1322, lon: 21.7144 },
  'Ohër': { lat: 41.1231, lon: 20.8017 },
  'Gostivar': { lat: 41.7964, lon: 20.9083 },
  'Strugë': { lat: 41.1775, lon: 20.6781 },
  'Dibër': { lat: 41.5169, lon: 20.5353 }
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