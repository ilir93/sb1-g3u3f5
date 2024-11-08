import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TabSelector from './components/TabSelector';
import CityList from './components/CityList';
import CityWeatherPage from './components/CityWeatherPage';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';
import CountryPage from './pages/CountryPage';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('albania');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Simple routing based on URL path
  const path = window.location.pathname;
  
  if (path === '/shqiperia') {
    return <CountryPage country="albania" />;
  }
  
  if (path === '/kosova') {
    return <CountryPage country="kosovo" />;
  }
  
  if (path === '/maqedonia') {
    return <CountryPage country="macedonia" />;
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
              Parashikimi më i saktë i motit për Shqipërinë, Kosovën dhe Maqedoninë e Veriut
            </p>
          </div>

          <TabSelector
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
          />

          <CityList 
            country={selectedCountry} 
            onCitySelect={setSelectedCity}
          />

          <SEOContent />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;