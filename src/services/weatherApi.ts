import axios from 'axios';
import { getCityCoordinates } from '../utils/cityData';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  current: {
    temperature: number;
    windSpeed: number;
    humidity: number;
    description: string;
    icon: string;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    description: string;
    icon: string;
  }>;
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    description: string;
    icon: string;
  }>;
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const coordinates = getCityCoordinates(city);
    if (!coordinates) {
      throw new Error(`Qyteti "${city}" nuk u gjet në sistemin tonë`);
    }

    const { lat, lon } = coordinates;

    // Get current weather
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'sq'
      }
    });

    // Get 5 day forecast
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'sq'
      }
    });

    const current = currentResponse.data;
    const forecast = forecastResponse.data;

    const weatherData: WeatherData = {
      current: {
        temperature: Math.round(current.main.temp),
        windSpeed: Math.round(current.wind.speed),
        humidity: current.main.humidity,
        description: current.weather[0].description,
        icon: current.weather[0].icon
      },
      hourly: forecast.list.slice(0, 8).map((item: any) => ({
        time: new Date(item.dt * 1000).toISOString(),
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon
      })),
      daily: []
    };

    // Process daily forecast
    const dailyMap = new Map();
    forecast.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          temps: [],
          descriptions: [],
          icons: []
        });
      }
      const dayData = dailyMap.get(date);
      dayData.temps.push(item.main.temp);
      dayData.descriptions.push(item.weather[0].description);
      dayData.icons.push(item.weather[0].icon);
    });

    weatherData.daily = Array.from(dailyMap.entries())
      .slice(0, 5)
      .map(([date, data]) => ({
        date,
        maxTemp: Math.round(Math.max(...data.temps)),
        minTemp: Math.round(Math.min(...data.temps)),
        description: data.descriptions[Math.floor(data.descriptions.length / 2)],
        icon: data.icons[Math.floor(data.icons.length / 2)]
      }));

    return weatherData;

  } catch (error) {
    console.error('Weather API Error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API çelësi është i pavlefshëm');
      }
      if (error.response?.status === 404) {
        throw new Error(`Qyteti "${city}" nuk u gjet`);
      }
      if (error.response?.status === 429) {
        throw new Error('Keni arritur limitin e kërkesave. Ju lutemi prisni pak minuta.');
      }
      if (!error.response) {
        throw new Error('Nuk mund të lidhemi me serverin e motit. Kontrolloni lidhjen tuaj të internetit.');
      }
    }
    
    throw new Error('Gabim në marrjen e të dhënave të motit. Provoni përsëri.');
  }
};