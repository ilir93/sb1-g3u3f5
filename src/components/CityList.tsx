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
        return allCities
          .filter(([city]) => 
            !city.includes('(') &&
            !['Shkup', 'Tetovë', 'Kumanovë', 'Ohër', 'Gostivar', 'Strugë', 'Dibër'].includes(city) &&
            !['Prishtinë', 'Prizren', 'Pejë', 'Mitrovicë', 'Gjakovë', 'Gjilan', 'Ferizaj'].includes(city)
          )
          .map(([city]) => city)
          .sort();
      }
      if (countryCode === 'kosovo') {
        return allCities
          .filter(([city]) => 
            ['Prishtinë', 'Prizren', 'Pejë', 'Mitrovicë', 'Gjakovë', 'Gjilan', 'Ferizaj',
             'Deçan', 'Dragash', 'Istog', 'Klinë', 'Lipjan', 'Malishevë', 'Rahovec', 'Vushtrri'].includes(city)
          )
          .map(([city]) => city)
          .sort();
      }
      if (countryCode === 'macedonia') {
        return allCities
          .filter(([city]) => 
            ['Shkup', 'Tetovë', 'Kumanovë', 'Ohër', 'Gostivar', 'Strugë', 'Dibër'].includes(city)
          )
          .map(([city]) => city)
          .sort();
      }
      return [];
    };

    return filterCities(country);
  }, [country]);

  const handleCityClick = (e: React.MouseEvent<HTMLButtonElement>, city: string) => {
    e.preventDefault();
    onCitySelect(city);
  };

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-2xl font-bold text-sky-900 mb-6">
        Qytetet Kryesore
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {cities.map((city) => (
          <button
            key={city}
            onClick={(e) => handleCityClick(e, city)}
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