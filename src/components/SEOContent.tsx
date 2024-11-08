import React from 'react';
import { CloudSun, Umbrella, Wind, Thermometer } from 'lucide-react';

interface SEOContentProps {
  country?: string;
}

export default function SEOContent({ country }: SEOContentProps) {
  const getCountrySpecificContent = () => {
    if (!country) return null;

    const countryContent = {
      albania: {
        title: 'Moti në Shqipëri',
        description: 'Parashikimi i motit për të gjitha qytetet e Shqipërisë, përfshirë Tiranën, Durrësin, Vlorën dhe qytete të tjera.'
      },
      kosovo: {
        title: 'Moti në Kosovë',
        description: 'Parashikimi i motit për të gjitha qytetet e Kosovës, përfshirë Prishtinën, Prizrenin, Pejën dhe qytete të tjera.'
      },
      macedonia: {
        title: 'Moti në Maqedoninë e Veriut',
        description: 'Parashikimi i motit për të gjitha qytetet e Maqedonisë së Veriut, përfshirë Shkupin, Tetovën, Ohrin dhe qytete të tjera.'
      }
    };

    const content = countryContent[country as keyof typeof countryContent];
    
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">{content.title}</h2>
        <p className="text-gray-600">{content.description}</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mb-16">
      {getCountrySpecificContent()}

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-sky-900 mb-6">Pyetjet më të Shpeshta (FAQ)</h2>
        <div className="space-y-6">
          <details className="bg-white rounded-lg shadow-sm p-6">
            <summary className="font-semibold text-sky-900 cursor-pointer">
              Si është llogaritur parashikimi i motit?
            </summary>
            <p className="mt-3 text-gray-600">
              Parashikimi ynë i motit bazohet në të dhëna nga modelet më të avancuara meteorologjike dhe stacionet lokale të motit. 
              Përdorim teknologji të fundit për të siguruar parashikime të sakta deri në 7 ditë përpara.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-sm p-6">
            <summary className="font-semibold text-sky-900 cursor-pointer">
              Sa shpesh përditësohen të dhënat e motit?
            </summary>
            <p className="mt-3 text-gray-600">
              Të dhënat tona përditësohen çdo orë për parashikimet afatshkurtra dhe çdo 3 orë për parashikimet 7-ditore, 
              duke siguruar informacion të saktë dhe të përditësuar.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-sm p-6">
            <summary className="font-semibold text-sky-900 cursor-pointer">
              Cilat janë parametrat e motit që mund të shoh?
            </summary>
            <p className="mt-3 text-gray-600">
              Ofrojmë informacion të detajuar për temperaturën, lagështinë, shpejtësinë e erës, reshjet, 
              presionin atmosferik dhe parashikime të përgjithshme për çdo qytet.
            </p>
          </details>
        </div>
      </section>

      <section className="prose prose-sky max-w-none">
        <h2 className="text-2xl font-bold text-sky-900 mb-6">Informacion i Detajuar për Motin</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <CloudSun className="w-6 h-6 text-sky-500 mr-3" />
              <h3 className="text-lg font-semibold text-sky-900">Parashikime të Sakta</h3>
            </div>
            <p className="text-gray-600">
              Ofrojmë parashikime të motit me saktësi të lartë për të gjitha qytetet kryesore në Shqipëri, 
              Kosovë dhe Maqedoninë e Veriut, duke përdorur teknologjitë më të avancuara meteorologjike.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Umbrella className="w-6 h-6 text-sky-500 mr-3" />
              <h3 className="text-lg font-semibold text-sky-900">Reshjet dhe Lagështia</h3>
            </div>
            <p className="text-gray-600">
              Monitorojmë vazhdimisht nivelet e reshjeve dhe lagështisë për të ofruar informacion 
              të detajuar për planifikimin e aktiviteteve tuaja të përditshme.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Wind className="w-6 h-6 text-sky-500 mr-3" />
              <h3 className="text-lg font-semibold text-sky-900">Kushtet e Erës</h3>
            </div>
            <p className="text-gray-600">
              Informacion i detajuar për drejtimin dhe shpejtësinë e erës, i dobishëm për lundrim, 
              sportet ujore dhe aktivitetet në natyrë.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Thermometer className="w-6 h-6 text-sky-500 mr-3" />
              <h3 className="text-lg font-semibold text-sky-900">Temperatura</h3>
            </div>
            <p className="text-gray-600">
              Parashikime të sakta të temperaturës, duke përfshirë temperaturat maksimale dhe minimale 
              për planifikimin më të mirë të ditës suaj.
            </p>
          </div>
        </div>

        <div className="bg-sky-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-sky-900 mb-4">Pse të Zgjidhni Shërbimin Tonë?</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Përditësime të vazhdueshme të të dhënave meteorologjike</li>
            <li>Mbulim i plotë i të gjitha qyteteve kryesore</li>
            <li>Parashikime të detajuara 7-ditore</li>
            <li>Informacion i besueshëm dhe i saktë</li>
            <li>Ndërfaqe e thjeshtë dhe e lehtë për përdorim</li>
            <li>Të dhëna të përshtatura për rajonin e Ballkanit Perëndimor</li>
          </ul>
        </div>
      </section>
    </div>
  );
}