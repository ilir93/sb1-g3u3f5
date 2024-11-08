import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { fetchWeatherData, type WeatherData } from '../services/weatherApi';
import WeatherDisplay from './WeatherDisplay';

const monthsInAlbanian = [
  'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
  'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
];

const weekdaysInAlbanian = [
  'E Diel', 'E Hënë', 'E Martë', 'E Mërkurë',
  'E Enjte', 'E Premte', 'E Shtunë'
];

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const weekday = weekdaysInAlbanian[date.getDay()];
  
  return `${weekday}, ${day}.${month}.${year}`;
};

interface CityWeatherPageProps {
  city: string;
  onBack: () => void;
}

export default function CityWeatherPage({ city, onBack }: CityWeatherPageProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState('Shqipëri'); // Default country, you might want to pass this as a prop

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ndodhi një gabim i papritur');
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  const getCountryLink = () => {
    switch(country) {
      case 'Shqipëri':
        return '/shqiperia';
      case 'Kosovë':
        return '/kosova';
      case 'Maqedoni e Veriut':
        return '/maqedonia';
      default:
        return '/';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-8">
        <div className="space-y-2">
          <nav className="flex items-center space-x-2 text-sm text-sky-600">
            <a href="/" className="hover:text-sky-800">
              <Home className="w-4 h-4" />
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <a href={getCountryLink()} className="hover:text-sky-800">{country}</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{city}</span>
          </nav>
          <h1 className="text-3xl font-bold text-sky-900">
            Parashikimi i Motit {city}
          </h1>
        </div>

        <div className="flex items-center space-x-6 text-sky-600 font-medium">
          <a href="#current" className="hover:text-sky-800">Moti Sot</a>
          <a href="#hourly" className="hover:text-sky-800">Orët e Ardhshme</a>
          <a href="#daily" className="hover:text-sky-800">5 Ditët e Ardhshme</a>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Gabim</p>
          <p>{error}</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-b-sky-600"></div>
        </div>
      ) : weatherData ? (
        <WeatherDisplay 
          data={weatherData} 
          cityName={city}
          formatWeekday={(date: string) => {
            const d = new Date(date);
            return formatDate(d);
          }}
        />
      ) : null}
    </div>
  );
}