import axios from "axios";
import { useState, useEffect } from "react";
import cloud from "./appImage/cloud.png";
import mist from "./appImage/mist.png";
import rainH from "./appImage/heavyrain.png";
import notTooMuchCloud from "./appImage/partlycloudy.png";
import sun from "./appImage/sun.png";
import rain from "./appImage/rain-remove.png";

function WeatherDisplay({ enteredLocation }) {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [errorForUser, setErrorForUser] = useState(false);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setErrorForUser("");
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&units=metric&appid=6e2551f5abc891885e58848c710ba025`
        );
        const data = response.data;
        setWeatherInfo(data);
      } catch (error) {
        setErrorForUser(true);
      }
    };

    if (enteredLocation) {
      fetchWeatherData();
    }
    
  }, [enteredLocation]);

  const weatherObject = {
    "broken clouds": <img id="imgForWeather" src={cloud} />,
    "overcast clouds": <img id="imgForWeather" src={cloud} />,
    "light rain": <img id="imgForWeather" src={rain} />,
    "scattered clouds": <img id="imgForWeather" src={notTooMuchCloud} />,
    "few clouds": <img id="imgForWeather" src={notTooMuchCloud} />,
    "clear sky": <img id="imgForWeather" src={sun} />,
    "shower rain": <img id="imgForWeather" src={rainH} />,
    thunderstorm: <img id="imgForWeather" src={rain} />,
    haze: <img id="imgForWeather" src={mist} />,
  };

  const weatherDescription = weatherInfo?.weather[0]?.description;

  return (
    <div>
      {errorForUser && <h2 id="errorMasge">enter a valid region</h2>}
      {weatherInfo && !errorForUser ? (
        <div>
          <h2>The Weather in {enteredLocation}</h2>

          {weatherDescription && weatherObject[weatherDescription]}

          <h2>Temperature: {weatherInfo.main.temp}°C</h2>
          <h2>Description: {weatherInfo.weather[0].description}</h2>
        </div>
      ) : (
        <h2>Enter a country or a city name to get weather information</h2>
      )}
    </div>
  );
}

export default WeatherDisplay;
