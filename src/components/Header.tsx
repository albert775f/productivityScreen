import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get user's location and fetch weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Using Open-Meteo API (free, no API key required)
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
            );
            const data = await response.json();

            const weatherCode = data.current.weather_code;
            let condition = 'Sunny';
            if (weatherCode >= 61 && weatherCode <= 67) condition = 'Rainy';
            else if (weatherCode >= 71 && weatherCode <= 77) condition = 'Snowy';
            else if (weatherCode >= 51 && weatherCode <= 57) condition = 'Drizzle';
            else if (weatherCode >= 80) condition = 'Stormy';
            else if (weatherCode > 0 && weatherCode < 3) condition = 'Partly Cloudy';
            else if (weatherCode >= 3) condition = 'Cloudy';

            setWeather({
              temperature: Math.round(data.current.temperature_2m),
              condition,
              location: 'Aktueller Standort',
            });
          } catch (error) {
            console.error('Failed to fetch weather:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-12 w-12" />;

    switch (weather.condition) {
      case 'Sunny':
        return <Sun className="h-12 w-12 text-yellow-500" />;
      case 'Rainy':
      case 'Drizzle':
      case 'Stormy':
        return <CloudRain className="h-12 w-12 text-blue-500" />;
      case 'Snowy':
        return <CloudSnow className="h-12 w-12 text-blue-300" />;
      default:
        return <Cloud className="h-12 w-12 text-gray-500" />;
    }
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="text-5xl font-bold text-primary">
            {formatTime(currentTime)}
          </div>
          <div className="text-lg text-muted-foreground mt-2">
            {formatDate(currentTime)}
          </div>
        </div>

        {weather && (
          <div className="flex items-center gap-4">
            {getWeatherIcon()}
            <div>
              <div className="text-3xl font-semibold">
                {weather.temperature}°C
              </div>
              <div className="text-sm text-muted-foreground">
                {weather.location}
              </div>
              <div className="text-sm text-muted-foreground">
                {weather.condition}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
