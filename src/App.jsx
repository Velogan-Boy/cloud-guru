import React, { useEffect, useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { WeatherContext } from './contexts/WeatherContext';

import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Weather from './pages/Weather/Weather';

import './App.css';
import Loader from './components/Loader/Loader';
import { Toaster, toast } from 'react-hot-toast';

function App() {
   const { loading } = useContext(WeatherContext);

   useEffect(() => {
      const ele = document.getElementById('my-loader');
      if (ele) {
         // fade out
         setTimeout(() => {
            // remove from DOM
            ele.classList.add('available');

            toast.success('Welcome to Weather App!');
         }, 3000);
      }
   }, []);

   return (
      <div className="App">
         <Toaster />
         {loading && <Loader />}
         <Navbar />
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/weather" element={<Weather />} />
         </Routes>
      </div>
   );
}

export default App;

