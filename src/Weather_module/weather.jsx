import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDisplay = ({ cityName }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("Error fetching weather data");
      }
    };

    if (cityName) {
      fetchWeather();
    }
  }, [cityName]);

  if (error) return <p>{error}</p>;

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="weather_box">
      <h2 className="weather_title">Weather forecast</h2>
      <div className="weather_details">
        <h4>Cloud cover:</h4>
        <p>{weather.weather[0].description}</p>
      </div>
      <div className="weather_details">
        <h4>Temperature:</h4>
        <p>{weather.main.temp}°C</p>
      </div>
      <div className="weather_details">
        <h4>Humidity:</h4>
        <p>{weather.main.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
