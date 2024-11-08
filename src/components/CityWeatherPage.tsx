import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, ChevronRight, MapPin } from 'lucide-react';
import { fetchWeatherData, type WeatherData } from '../services/weatherApi';
import WeatherDisplay from './WeatherDisplay';
import { cityCoordinates } from '../utils/cityData';

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

const getRelatedCities = (currentCity: string): string[] => {
  // Get coordinates of current city
  const currentCoords = cityCoordinates[currentCity];
  if (!currentCoords) return [];

  // Calculate distances to all other cities
  const cities = Object.entries(cityCoordinates)
    .filter(([name]) => name !== currentCity)
    .map(([name, coords]) => {
      const distance = Math.sqrt(
        Math.pow(coords.lat - currentCoords.lat, 2) + 
        Math.pow(coords.lon - currentCoords.lon, 2)
      );
      return { name, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5) // Get 5 closest cities
    .map(city => city.name);

  return cities;
};

const getCityUrlSlug = (city: string): string => {
  return city.toLowerCase()
    .replace(/ë/g, 'e')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export default function CityWeatherPage({ city, onBack }: CityWeatherPageProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const relatedCities = getRelatedCities(city);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-8">
        <div className="space-y-2">
          <nav className="flex items-center space-x-2 text-sm text-sky-600">
            <a href="/" className="hover:text-sky-800">
              <Home className="w-4 h-4" />
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <a href="/shqiperia" className="hover:text-sky-800">Shqipëria</a>
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
        <>
          <WeatherDisplay 
            data={weatherData} 
            cityName={city}
            formatWeekday={(date: string) => {
              const d = new Date(date);
              return formatDate(d);
            }}
          />

          {/* Related Cities Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-sky-900 mb-6">
              Moti në Qytetet e Afërta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCities.map((relatedCity) => (
                <a
                  key={relatedCity}
                  href={`/shqiperia/${getCityUrlSlug(relatedCity)}`}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                >
                  <MapPin className="w-5 h-5 text-sky-500 mr-3 group-hover:text-sky-600" />
                  <div>
                    <h3 className="font-medium text-sky-900 group-hover:text-sky-700">
                      Moti në {relatedCity}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Shiko parashikimin e motit
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-sky-400 ml-auto group-hover:text-sky-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Popular Cities Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-sky-900 mb-6">
              Qytetet Kryesore
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Tiranë', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan', 'Fier', 'Korçë', 'Berat'].map((majorCity) => (
                majorCity !== city && (
                  <a
                    key={majorCity}
                    href={`/shqiperia/${getCityUrlSlug(majorCity)}`}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <MapPin className="w-4 h-4 text-sky-500 mr-2 group-hover:text-sky-600" />
                    <span className="text-sky-900 group-hover:text-sky-700">{majorCity}</span>
                  </a>
                )
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}