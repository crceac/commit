import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  // Replace with your OpenWeatherMap API key
  const API_KEY = 'YOUR_API_KEY_HERE';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    // Optionally fetch weather for default location on mount
    // fetchWeather('London');
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Weather Application</h1>
        
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="description">
              {weather.weather[0].description}
            </div>
            <div className="details">
              <div>Humidity: {weather.main.humidity}%</div>
              <div>Wind Speed: {weather.wind.speed} m/s</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


