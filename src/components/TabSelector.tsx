import React from 'react';
import { MapPin } from 'lucide-react';

interface TabSelectorProps {
  selectedCountry: string;
  onSelect: (country: string) => void;
}

export default function TabSelector({ selectedCountry, onSelect }: TabSelectorProps) {
  const countries = [
    { id: 'albania', name: 'Shqipëria' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {countries.map((country) => (
        <button
          key={country.id}
          onClick={() => onSelect(country.id)}
          className={`flex items-center px-6 py-3 rounded-full transition-all ${
            selectedCountry === country.id
              ? 'bg-sky-500 text-white shadow-lg'
              : 'bg-white text-sky-900 hover:bg-sky-50'
          }`}
        >
          <MapPin className="w-4 h-4 mr-2" />
          {country.name}
        </button>
      ))}
    </div>
  );
}