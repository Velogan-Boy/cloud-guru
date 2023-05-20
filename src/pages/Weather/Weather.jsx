import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { WeatherContext } from '../../contexts/WeatherContext';

import styles from './Weather.module.css';
import { GoLocation } from 'react-icons/go';

function Weather() {
   const { weatherData, locationData } = useContext(WeatherContext);
   const [style, setStyle] = useState({});

   const navigate = useNavigate();

   useEffect(() => {
      if (!weatherData) navigate('/');

      let bgImage = 'rainfall';

      if (weatherData) {
         if ([1000, 1003].includes(weatherData[0].day.condition.code)) bgImage = 'clear-sky';
         else if ([1006, 1009].includes(weatherData[0].day.condition.code)) bgImage = 'cloudy';
         else if ([1273, 1276, 1282].includes(weatherData[0].day.condition.code)) bgImage = 'thuderstorm';
      }

      const style = {
         backgroundImage: `var(--background-gradient),url('/assets/backgrounds/${bgImage}.jpg')`,
         backgroundRepeat: 'no-repeat',
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         height: '100vh',
         width: '100vw',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         overflowY: 'auto',
      };

      setStyle(style);
   }, [weatherData]);

   return (
      <div style={style}>
         <div className={styles.card}>
            <div className={styles.current}>
               <div className={styles.location}>
                  <GoLocation />
                  {locationData && locationData.name}
               </div>

               <div className={styles.weather}>
                  <div className={styles.temp}>{weatherData && Math.trunc(weatherData[0].day.avgtemp_c)} °C</div>
                  <div className={styles.condition}>{weatherData && weatherData[0].day.condition.text}</div>
               </div>

               <div className={styles.day}>
                  {weatherData && new moment(weatherData[0].date, 'YYYY-MM-DD').format('dddd')}
                  <span>{weatherData && new moment(weatherData[0].date, 'YYYY-MM-DD').format('DD MMM[,] yyyy')}</span>
               </div>
            </div>
            <div className={styles.forecast}>
               <div className={styles.dayAttributes}>
                  <div>
                     Chance of Rain <span>{weatherData && weatherData[0].day.daily_chance_of_rain} %</span>
                  </div>
                  <div>
                     Humidity <span>{weatherData && weatherData[0].day.avghumidity} %</span>
                  </div>
                  <div>
                     Wind <span>{weatherData && weatherData[0].day.maxwind_kph} km/h</span>
                  </div>
                  <div>
                     Min Temp <span>{weatherData && weatherData[0].day.mintemp_c} °C</span>
                  </div>

                  <div>
                     Max Temp <span>{weatherData && weatherData[0].day.maxtemp_c} °C</span>
                  </div>
               </div>
               <div className={styles.forecastDays}>
                  {weatherData &&
                     weatherData.map((day, index) => {
                        if (index === 0) return null;
                        return (
                           <div className={styles.forecastDay} key={index}>
                              <div className={styles.day}>{new moment(day.date, 'YYYY-MM-DD').format('ddd')}</div>
                              <div className={styles.icon}>
                                 <img src={day.day.condition.icon} alt="weather icon" />
                              </div>
                              <div className={styles.temp}>
                                 <span>{Math.trunc(day.day.avgtemp_c)} °C</span>
                              </div>
                           </div>
                        );
                     })}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Weather;
