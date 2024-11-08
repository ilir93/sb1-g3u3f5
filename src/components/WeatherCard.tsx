import React from 'react';
import { Sun, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherCard({
  city,
  temperature,
  condition,
  humidity,
  windSpeed
}: WeatherCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-sky-900 mb-2">{city}</h2>
          <div className="flex items-center justify-center md:justify-start">
            <Sun className="w-16 h-16 text-yellow-500 mr-4" />
            <div>
              <span className="text-5xl font-bold text-sky-900">{temperature}°</span>
              <p className="text-sky-600">{condition}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center">
            <Wind className="w-6 h-6 text-sky-500 mr-3" />
            <span className="text-sky-900">Era: {windSpeed} km/h</span>
          </div>
          <div className="flex items-center">
            <Droplets className="w-6 h-6 text-sky-500 mr-3" />
            <span className="text-sky-900">Lagështia: {humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}