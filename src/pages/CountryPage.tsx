import React from 'react';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import CityList from '../components/CityList';
import Footer from '../components/Footer';
import SEOContent from '../components/SEOContent';
import CityWeatherPage from '../components/CityWeatherPage';

interface CountryPageProps {
  country: 'albania' | 'kosovo' | 'macedonia';
}

const countryNames = {
  albania: 'Shqipëri',
  kosovo: 'Kosovë',
  macedonia: 'Maqedoni e Veriut'
};

const countryDescriptions = {
  albania: 'Parashikimi i motit për të gjitha qytetet e Shqipërisë. Informacion i përditësuar për temperaturën, reshjet dhe erën.',
  kosovo: 'Parashikimi i motit për të gjitha qytetet e Kosovës. Informacion i përditësuar për temperaturën, reshjet dhe erën.',
  macedonia: 'Parashikimi i motit për të gjitha qytetet e Maqedonisë së Veriut. Informacion i përditësuar për temperaturën, reshjet dhe erën.'
};

export default function CountryPage({ country }: CountryPageProps) {
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    // Update URL without page reload
    const countryPath = {
      albania: 'shqiperia',
      kosovo: 'kosova',
      macedonia: 'maqedonia'
    }[country];
    
    const citySlug = city.toLowerCase()
      .replace(/ë/g, 'e')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
      
    window.history.pushState(
      {}, 
      '', 
      `/${countryPath}/${citySlug}`
    );
  };

  const handleBack = () => {
    setSelectedCity(null);
    const countryPath = {
      albania: 'shqiperia',
      kosovo: 'kosova',
      macedonia: 'maqedonia'
    }[country];
    window.history.pushState({}, '', `/${countryPath}`);
  };

  if (selectedCity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
        <Navbar />
        <CityWeatherPage 
          city={selectedCity} 
          onBack={handleBack}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-4">
            Parashikimi i Motit {countryNames[country]}
          </h1>
          <p className="text-lg text-sky-700 mb-8">
            {countryDescriptions[country]}
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm px-6 py-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-sky-500" />
              <span className="text-sky-900 font-medium">{countryNames[country]}</span>
            </div>
          </div>
        </div>

        <CityList 
          country={country} 
          onCitySelect={handleCitySelect}
        />

        <SEOContent country={country} />
      </main>

      <Footer />
    </div>
  );
}