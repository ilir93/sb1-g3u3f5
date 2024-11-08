import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CityWeatherPage from './components/CityWeatherPage';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';
import CountryPage from './pages/CountryPage';
import { fetchWeatherData } from './services/weatherApi';
import { Cloud } from 'lucide-react';

function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityWeather, setCityWeather] = useState<{[key: string]: any}>({});
  
  const mainCities = [
    'Tiranë', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan',
    'Fier', 'Korçë', 'Berat', 'Lushnjë', 'Kavajë'
  ];

  const allAlbanianCities = [
    'Bajram Curri', 'Ballsh', 'Berat', 'Bilisht', 'Bulqizë', 'Burrel', 'Butrint',
    'Cërrik', 'Çorovodë', 'Delvinë', 'Dhërmi', 'Divjakë', 'Durrës', 'Elbasan',
    'Ersekë', 'Fier', 'Fushë-Arrëz', 'Fushë-Krujë', 'Gjiri i Lalëzit', 'Gjirokastër',
    'Golem', 'Gramsh', 'Himarë', 'Kamëz', 'Kavajë', 'Këlcyrë', 'Konispol', 'Koplik',
    'Korçë', 'Krastë', 'Krrabë', 'Krujë', 'Krumë', 'Ksamil', 'Kuçovë', 'Kukës',
    'Laç', 'Lazarat', 'Leskovik', 'Lezhë', 'Libohovë', 'Librazhd', 'Lushnje',
    'Maliq', 'Mamurras', 'Memaliaj', 'Milot', 'Orikum', 'Patos', 'Peqin', 'Përmet',
    'Përrënjas', 'Peshkopi', 'Pogradec', 'Poliçan', 'Pukë', 'Qerret', 'Roskovec',
    'Rrëshen', 'Rrogozhinë', 'Rubik', 'Sarandë', 'Selenicë', 'Shëngjin', 'Shijak',
    'Shkodër', 'Shtërmen', 'Tepelenë', 'Theth', 'Tiranë', 'Ura Vajgurore', 'Valbonë',
    'Velipojë', 'Vlorë', 'Voskopojë'
  ].sort((a, b) => a.localeCompare(b, 'sq'));

  useEffect(() => {
    mainCities.forEach(async (city) => {
      try {
        const data = await fetchWeatherData(city);
        setCityWeather(prev => ({
          ...prev,
          [city]: data
        }));
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
      }
    });
  }, []);
  
  const path = window.location.pathname;
  
  if (path === '/shqiperia') {
    return <CountryPage country="albania" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <Navbar />
      
      {selectedCity ? (
        <CityWeatherPage 
          city={selectedCity} 
          onBack={() => setSelectedCity(null)} 
        />
      ) : (
        <main className="container mx-auto px-4 pt-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-4">
              Parashikimi i Motit
            </h1>
            <p className="text-lg text-sky-700 mb-8">
              Parashikimi më i saktë i motit për Shqipërinë
            </p>

            <h2 className="text-2xl font-bold text-sky-800 mb-6">
              Temperatura aktuale në qytetet kryesore
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
              {mainCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className="flex items-center justify-between px-4 py-3 bg-white hover:bg-sky-50 text-sky-900 rounded-lg shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <Cloud className="w-4 h-4 text-sky-500 mr-2" />
                    <span className="font-medium">{city}</span>
                  </div>
                  {cityWeather[city] && (
                    <span className="text-sky-700">
                      {Math.round(cityWeather[city].current.temperature)}°C
                    </span>
                  )}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-sky-800 mb-6">
              Zgjidhni shtetin
            </h2>

            <div className="flex flex-col items-center gap-4 mb-12 max-w-xs mx-auto">
              <div className="w-full space-y-4">
                <button 
                  onClick={() => window.location.href = '/shqiperia'}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-sky-50 text-sky-900 rounded-lg shadow-sm transition-colors duration-200 text-lg font-medium"
                >
                  🇦🇱 Shqipëria
                </button>
                
                <div className="grid grid-cols-1 gap-2 pl-4">
                  {allAlbanianCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className="w-full inline-flex items-center justify-between px-4 py-2 bg-white hover:bg-sky-50 text-sky-900 rounded-lg shadow-sm transition-colors duration-200"
                    >
                      <span className="font-medium">{city}</span>
                      {cityWeather[city] && (
                        <span className="text-sky-700">
                          {Math.round(cityWeather[city].current.temperature)}°C
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/kosova'}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-sky-50 text-sky-900 rounded-lg shadow-sm transition-colors duration-200 text-lg font-medium"
              >
                🇽🇰 Kosova
              </button>
              <button 
                onClick={() => window.location.href = '/maqedonia'}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-sky-50 text-sky-900 rounded-lg shadow-sm transition-colors duration-200 text-lg font-medium"
              >
                🇲🇰 Maqedonia e Veriut
              </button>
            </div>

            <SEOContent />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;