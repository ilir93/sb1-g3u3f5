const BASE_URL = 'https://api.met.no/weatherapi/locationforecast/2.0';
const USER_AGENT = 'ParashikimiIMotit/1.0 (https://www.parashikimiimotit.com; contact@parashikimiimotit.com)';

interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  current: {
    temperature: number;
    windSpeed: number;
    humidity: number;
    symbol: string;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    symbol: string;
  }>;
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    symbol: string;
  }>;
}

export const fetchWeatherData = async (coordinates: Coordinates): Promise<WeatherData> => {
  if (!coordinates || typeof coordinates.lat !== 'number' || typeof coordinates.lon !== 'number') {
    throw new Error('Invalid coordinates provided');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/compact?lat=${coordinates.lat.toFixed(4)}&lon=${coordinates.lon.toFixed(4)}`,
      {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'application/json',
          'If-Modified-Since': new Date(Date.now() - 3600000).toUTCString(),
        },
        cache: 'no-cache',
      }
    );

    if (response.status === 304) {
      throw new Error('Weather data not modified');
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    if (!data?.properties?.timeseries) {
      throw new Error('Invalid data format received from weather API');
    }

    return transformWeatherData(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch weather data:', error.message);
      throw new Error(`Nuk mund të marrim të dhënat e motit: ${error.message}`);
    }
    throw new Error('Ndodhi një gabim i papritur. Ju lutemi provoni përsëri.');
  }
};

const transformWeatherData = (data: any): WeatherData => {
  try {
    const timeseries = data.properties.timeseries;
    const current = timeseries[0];

    if (!current?.data?.instant?.details) {
      throw new Error('Missing current weather data');
    }

    return {
      current: {
        temperature: Number(current.data.instant.details.air_temperature.toFixed(1)),
        windSpeed: Number(current.data.instant.details.wind_speed.toFixed(1)),
        humidity: Math.round(current.data.instant.details.relative_humidity),
        symbol: current.data.next_1_hours?.summary?.symbol_code || 'clearsky_day',
      },
      hourly: timeseries.slice(0, 24).map((item: any) => ({
        time: item.time,
        temperature: Number(item.data.instant.details.air_temperature.toFixed(1)),
        symbol: item.data.next_1_hours?.summary?.symbol_code || 'clearsky_day',
      })),
      daily: getDailyForecast(timeseries),
    };
  } catch (error) {
    console.error('Error transforming weather data:', error);
    throw new Error('Could not process weather data');
  }
};

const getDailyForecast = (timeseries: any[]): WeatherData['daily'] => {
  const dailyData: { [key: string]: { temps: number[]; symbols: string[] } } = {};

  timeseries.forEach((item: any) => {
    if (!item?.data?.instant?.details?.air_temperature) return;

    const date = item.time.split('T')[0];
    if (!dailyData[date]) {
      dailyData[date] = { temps: [], symbols: [] };
    }

    dailyData[date].temps.push(item.data.instant.details.air_temperature);
    if (item.data.next_6_hours?.summary?.symbol_code) {
      dailyData[date].symbols.push(item.data.next_6_hours.summary.symbol_code);
    }
  });

  return Object.entries(dailyData)
    .slice(0, 7)
    .map(([date, data]) => ({
      date,
      maxTemp: Number(Math.max(...data.temps).toFixed(1)),
      minTemp: Number(Math.min(...data.temps).toFixed(1)),
      symbol: getMostFrequentSymbol(data.symbols),
    }));
};

const getMostFrequentSymbol = (symbols: string[]): string => {
  if (!symbols.length) return 'clearsky_day';
  
  const frequency: { [key: string]: number } = {};
  let maxFreq = 0;
  let mostFrequent = symbols[0];

  symbols.forEach(symbol => {
    frequency[symbol] = (frequency[symbol] || 0) + 1;
    if (frequency[symbol] > maxFreq) {
      maxFreq = frequency[symbol];
      mostFrequent = symbol;
    }
  });

  return mostFrequent;
};