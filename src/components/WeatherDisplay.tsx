import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../services/weatherApi';

interface WeatherDisplayProps {
  data: WeatherData;
  cityName: string;
  formatWeekday: (date: string) => string;
}

export default function WeatherDisplay({ data, cityName, formatWeekday }: WeatherDisplayProps) {
  const getWeatherIconUrl = (icon: string) => 
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const today = new Date();
  const formattedDate = formatWeekday(today.toISOString());

  const getCityDescription = (city: string) => {
    const descriptions: { [key: string]: string } = {
      'Tiranë': 'Tirana, kryeqyteti i Shqipërisë, karakterizohet nga një klimë mesdhetare me verë të nxehtë dhe dimër të butë. Qyteti ndodhet në një luginë të rrethuar nga male, çka ndikon në modelet lokale të motit.',
      'Durrës': 'Durrësi, si një qytet bregdetar, ndikohet shumë nga Deti Adriatik. Klima është tipike mesdhetare me lagështi të lartë dhe erëra detare që moderojnë temperaturat.',
      'Vlorë': 'Vlora gëzon një nga klimat më të mira në Shqipëri, me më shumë se 300 ditë me diell në vit. Gjiri i Vlorës krijon kushte unike meteorologjike.',
      'Shkodër': 'Shkodra, e vendosur pranë liqenit më të madh në Ballkanin Perëndimor, ka një klimë të ndikuar nga ujërat dhe malet përreth. Dimri është i lagësht, ndërsa vera është e nxehtë.',
      'default': 'Qyteti karakterizohet nga klima tipike e rajonit, me ndikime të relievit dhe pozicionit gjeografik në kushtet lokale të motit.'
    };

    return descriptions[city] || descriptions.default;
  };

  const getCityWeatherTips = (city: string) => {
    const tips: { [key: string]: string[] } = {
      'Tiranë': [
        'Vera është zakonisht shumë e nxehtë - rekomandohet të shmangni aktivitetet e jashtme mes orës 11:00 dhe 16:00',
        'Në periudhën Nëntor-Mars mund të ketë reshje të papritura - mbani gjithmonë një çadër',
        'Pranvera dhe vjeshta janë stinët më të përshtatshme për aktivitete në natyrë'
      ],
      'Durrës': [
        'Era e detit është më e fortë në mëngjes dhe pasdite',
        'Temperaturat janë më të moderuara se në brendësi të vendit',
        'Lagështia është zakonisht e lartë - merrni masat e duhura për ruajtjen e objekteve të ndjeshme'
      ],
      'default': [
        'Kontrolloni parashikimin e motit përpara planifikimit të aktiviteteve në natyrë',
        'Mbani parasysh ndryshimet e papritura të motit gjatë ndërrimit të stinëve',
        'Përshtatni veshjen sipas kushteve aktuale të motit'
      ]
    };

    return tips[city] || tips.default;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div id="current" className="mb-8">
        <div className="flex flex-col space-y-1 mb-4">
          <h2 className="text-2xl font-bold text-sky-900">
            Moti Sot në {cityName}, {formattedDate}
          </h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <Cloud className="w-8 h-8 text-sky-600" />
              </div>
              <div>
                <p className="text-gray-500">Temperatura</p>
                <p className="text-2xl font-bold">{data.current.temperature}°C</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <Wind className="w-8 h-8 text-sky-600" />
              </div>
              <div>
                <p className="text-gray-500">Era</p>
                <p className="text-2xl font-bold">{data.current.windSpeed} m/s</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-sky-100 rounded-full">
                <Droplets className="w-8 h-8 text-sky-600" />
              </div>
              <div>
                <p className="text-gray-500">Lagështia</p>
                <p className="text-2xl font-bold">{data.current.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="hourly" className="mb-8">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">Orët e Ardhshme</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.hourly.slice(0, 6).map((hour) => (
            <div key={hour.time} className="bg-white rounded-lg p-4 text-center shadow">
              <p className="text-gray-500">
                {new Date(hour.time).toLocaleTimeString('sq', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <img
                src={getWeatherIconUrl(hour.icon)}
                alt={hour.description}
                className="w-12 h-12 mx-auto my-2"
              />
              <p className="font-bold">{hour.temperature}°C</p>
              <p className="text-sm text-gray-600">{hour.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="daily">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">5 Ditët e Ardhshme</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {data.daily.map((day) => (
            <div key={day.date} className="bg-white rounded-lg p-4 text-center shadow">
              <p className="text-gray-500">
                {formatWeekday(day.date)}
              </p>
              <img
                src={getWeatherIconUrl(day.icon)}
                alt={day.description}
                className="w-12 h-12 mx-auto my-2"
              />
              <p className="font-bold">{day.maxTemp}°</p>
              <p className="text-gray-500">{day.minTemp}°</p>
              <p className="text-sm text-gray-600">{day.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-sky-900 mb-6">Moti në {cityName}</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 leading-relaxed mb-6">
              {getCityDescription(cityName)}
            </p>
            
            <h3 className="text-xl font-semibold text-sky-800 mb-4">Këshilla për Motin në {cityName}</h3>
            <ul className="space-y-3">
              {getCityWeatherTips(cityName).map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-sky-900 mb-6">Informacion i Përgjithshëm për Motin në {cityName}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-sky-800 mb-4">Temperatura</h4>
              <p className="text-gray-600 mb-4">
                Temperatura aktuale në {cityName} është {data.current.temperature}°C. 
                Sot pritet të variojë nga {Math.min(...data.hourly.map(h => h.temperature))}°C 
                deri në {Math.max(...data.hourly.map(h => h.temperature))}°C.
              </p>
              <p className="text-gray-600">
                Bazuar në parashikimet 5-ditore, temperaturat do të lëvizin nga
                {' '}{Math.min(...data.daily.map(d => d.minTemp))}°C deri në
                {' '}{Math.max(...data.daily.map(d => d.maxTemp))}°C.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-sky-800 mb-4">Kushtet Atmosferike</h4>
              <p className="text-gray-600 mb-4">
                Aktualisht në {cityName} kemi {data.current.description.toLowerCase()}.
                Lagështia është {data.current.humidity}% dhe era fryn me shpejtësi {data.current.windSpeed} m/s.
              </p>
              <p className="text-gray-600">
                Këto kushte janë tipike për këtë periudhë të vitit në {cityName}.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-sky-900 mb-6">Pyetje të Shpeshta për Motin në {cityName}</h3>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-lg p-6">
              <summary className="text-lg font-semibold text-sky-800 cursor-pointer">
                Cila është periudha më e mirë për të vizituar {cityName}?
              </summary>
              <p className="mt-4 text-gray-600">
                Bazuar në të dhënat historike të motit, periudha më e përshtatshme për të vizituar {cityName} 
                është gjatë pranverës (Prill-Maj) dhe vjeshtës (Shtator-Tetor), kur temperaturat janë të moderuara 
                dhe reshjet më të pakta.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-lg p-6">
              <summary className="text-lg font-semibold text-sky-800 cursor-pointer">
                Si ndryshon moti në {cityName} gjatë stinëve?
              </summary>
              <p className="mt-4 text-gray-600">
                {cityName} ka katër stinë të dallueshme: verë të nxehtë, vjeshtë të butë, dimër relativisht 
                të ftohtë dhe pranverë të këndshme. Çdo stinë ka karakteristikat e veta unike që ndikojnë 
                në aktivitetet e përditshme.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-lg p-6">
              <summary className="text-lg font-semibold text-sky-800 cursor-pointer">
                Sa të besueshme janë parashikimet e motit për {cityName}?
              </summary>
              <p className="mt-4 text-gray-600">
                Parashikimet tona bazohen në të dhëna nga stacionet meteorologjike moderne dhe 
                përditësohen çdo orë. Saktësia është më e lartë për parashikimet 24-48 orëshe 
                dhe gradualisht zvogëlohet për parashikimet afatgjata.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}