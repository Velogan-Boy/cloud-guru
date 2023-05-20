import React, { useContext, useEffect } from 'react';

import { VscSearch } from 'react-icons/vsc';
import { TbCurrentLocation } from 'react-icons/tb';

import { WeatherContext } from '../../contexts/WeatherContext';

import styles from './Landing.module.css';

function Landing() {
   const { getWeatherDataUsingCityName, getWeatherDataUsingCoordinates, setLoading } = useContext(WeatherContext);

   const formSubmitHandler = (event) => {
      event.preventDefault();

      getWeatherDataUsingCityName(event.target.cityName.value);

      event.target.cityName.value = '';
   };

   useEffect(() => {
      setLoading(false);
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.box}>
            <form onSubmit={formSubmitHandler} className={styles.nameSearchContainer}>
               <h2>Search by Location</h2>
               <div className={styles.locationInput}>
                  <input type="text" name="cityName" />
                  <span className={styles.searchLogo}>
                     <VscSearch />
                  </span>
               </div>
            </form>

            <div className={styles.divider}>--- OR ---</div>

            <button className={styles.coordinatesBtn} onClick={getWeatherDataUsingCoordinates}>
               <span>
                  <TbCurrentLocation />
               </span>
               Use my Device cordinates instead
            </button>
         </div>
      </div>
   );
}

export default Landing;
