import React, { useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { cityCoordinates } from '../utils/cityData';

interface CityListProps {
  country: string;
  onCitySelect: (city: string) => void;
}

export default function CityList({ country, onCitySelect }: CityListProps) {
  const cities = useMemo(() => {
    const allCities = Object.entries(cityCoordinates);
    
    const filterCities = (countryCode: string) => {
      if (countryCode === 'albania') {
        // Only Albanian cities (excluding Kosovo and Macedonia)
        return allCities
          .filter(([city]) => 
            !city.includes('(') && // Excludes Kosovo cities with parentheses
            !['Shkup', 'Tetovë', 'Kumanovë', 'Ohër', 'Gostivar', 'Strugë', 'Dibër'].includes(city) && // Excludes Macedonia cities
            !['Prishtinë', 'Prizren', 'Pejë', 'Mitrovicë', 'Gjakovë', 'Gjilan', 'Ferizaj', 
              'Drenas', 'Vushtrri', 'Deçan', 'Kaçanik', 'Skenderaj', 'Lipjan', 'Malishevë',
              'Rahovec', 'Fushë Kosovë', 'Artanë', 'Besianë', 'Brezovicë', 'Burim', 'Dardanë',
              'Graçanicë', 'Hani i Elezit', 'Junik', 'Kastriot', 'Klinë', 'Kllokot', 'Kuqishtë',
              'Leposaviq', 'Mamushë', 'Partesh', 'Prevallë', 'Ranillug', 'Rugovë', 'Sharr',
              'Shtërpcë', 'Shtime', 'Therandë', 'Viti', 'Zubin Potok', 'Zveçan'].includes(city) // Excludes all Kosovo cities
          )
          .map(([city]) => city)
          .sort();
      }
      if (countryCode === 'kosovo') {
        // Only Kosovo cities
        return allCities
          .filter(([city]) => 
            city.includes('(') || // Cities with parentheses are from Kosovo
            ['Prishtinë', 'Prizren', 'Pejë', 'Mitrovicë', 'Gjakovë', 'Gjilan', 'Ferizaj',
             'Drenas', 'Vushtrri', 'Deçan', 'Kaçanik', 'Skenderaj', 'Lipjan', 'Malishevë',
             'Rahovec', 'Fushë Kosovë', 'Artanë', 'Besianë', 'Brezovicë', 'Burim', 'Dardanë',
             'Graçanicë', 'Hani i Elezit', 'Junik', 'Kastriot', 'Klinë', 'Kllokot', 'Kuqishtë',
             'Leposaviq', 'Mamushë', 'Partesh', 'Prevallë', 'Ranillug', 'Rugovë', 'Sharr',
             'Shtërpcë', 'Shtime', 'Therandë', 'Viti', 'Zubin Potok', 'Zveçan'].includes(city)
          )
          .map(([city]) => city)
          .sort();
      }
      if (countryCode === 'macedonia') {
        // Only Macedonia cities
        return allCities
          .filter(([city]) => 
            ['Shkup', 'Tetovë', 'Kumanovë', 'Ohër', 'Gostivar', 'Strugë', 'Dibër'].includes(city)
          )
          .map(([city]) => city)
          .sort();
      }
      return [];
    };

    return {
      albania: filterCities('albania'),
      kosovo: filterCities('kosovo'),
      macedonia: filterCities('macedonia')
    };
  }, []);

  const selectedCities = cities[country as keyof typeof cities] || [];

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-2xl font-bold text-sky-900 mb-6">
        Qytetet Kryesore
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {selectedCities.map((city) => (
          <button
            key={city}
            onClick={() => onCitySelect(city)}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow hover:bg-sky-50"
          >
            <MapPin className="w-4 h-4 text-sky-500 mr-2 flex-shrink-0" />
            <span className="text-sky-900 text-sm md:text-base truncate">
              {city}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}