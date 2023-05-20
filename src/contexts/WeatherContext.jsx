import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
   const [weatherData, setWeatherData] = useState(null);
   const [locationData, setLocationData] = useState(null);
   const [loading, setLoading] = useState(true);

   const navigate = useNavigate();

   const getWeatherDataUsingCityName = async (cityName) => {
      try {
         setLoading(true);
         const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=7&key=${process.env.REACT_APP_WEATHER_API_KEY}`);
         setWeatherData(response.data.forecast.forecastday);
         setLocationData(response.data.location);

         navigate('/weather');

         setLoading(false);
      } catch (error) {
         toast.error('City not found!');

         setLoading(false);
      }
   };

   const getWeatherDataUsingCoordinates = async () => {
      try {
         setLoading(true);

         const { coords } = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
         });

         const { latitude, longitude } = coords;

         const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=7&key=${process.env.REACT_APP_WEATHER_API_KEY}`);
         setWeatherData(response.data.forecast.forecastday);
         setLocationData(response.data.location);

         navigate('/weather');

         setLoading(false);
      } catch (error) {
         toast.error('Something went wrong!');

         setLoading(false);
      }
   };

   return (
      <WeatherContext.Provider value={{ getWeatherDataUsingCityName, getWeatherDataUsingCoordinates, weatherData, setWeatherData, locationData, loading, setLoading }}>
         {children}
      </WeatherContext.Provider>
   );
};
