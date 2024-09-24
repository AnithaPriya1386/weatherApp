import React, { useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null); // State to store fetched weather data
  const [error, setError] = useState(null); // State to store any error

  const API_KEY = '841828ceab8b8c549eafcbc6448368a9';  //your OpenWeather API key


  const handleInputChange = (e) => {
    setCity(e.target.value);  // Save the user's input in state
  };

   const handleSearchClick = async () => {
    try {
      setError(null);  // Clear any previous errors
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);  // Store the weather data in state
      console.log(response.data);
    } catch (err) {
      setError('City not found!');  // Handle errors (e.g., if the city is not found)
      setWeatherData(null);
    }
  };

  const toDateFunction = () => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const WeekDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
			}`;
		return date;
	};


  return (
    <div className="weather">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
        className='inputCity'
      />
      <button onClick={handleSearchClick} className='handleButton'>
        Search
      </button>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '30px' }}>
          <h2>{weatherData.name}</h2>
          <div className="date">
						<span style={{ color: 'red',fontWeight:'bold'}}>{toDateFunction()}</span>
					</div>
          <p>Temperature: {Math.floor(weatherData.main.temp)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Latitude:{weatherData.coord.lat}</p>
          <p>Longitude:{weatherData.coord.lon}</p>

        </div>
      )}



    </div>
  );
}

export default App;
