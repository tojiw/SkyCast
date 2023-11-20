import React, { useState } from "react";
import "./styles.css";
import clear_icon from "../Assets/clear.png";
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

function WeatherApp() {
  const key = "d12201c20458456e8ff114656231406";
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const search = async () => {
    // console.log("working")
    try {
      const element = document.getElementsByClassName("cityInput");
      if (element[0].value === "") {
        alert("Please Enter a City Name");
        return;
      }
      const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${element[0].value}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Falied to fetch weather data");
      }
      // console.log(data)
      const humidity = document.getElementsByClassName("humidity-percentage");
      const wind = document.getElementsByClassName("wind-speed");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.current.humidity + " %";
      temperature[0].innerHTML = data.current.temp_c + "°c";
      wind[0].innerHTML = data.current.wind_kph + " KPH";
      location[0].innerHTML = [data.location.name];

      if (
        data.current.condition.code === 1003 ||
        data.current.condition.code === 1006
      ) {
        setWeatherIcon(cloud_icon);
      } else if (
        data.current.condition.code === 1183 ||
        data.current.condition.code === 1189
      ) {
        setWeatherIcon(rain_icon);
      } else if (data.current.condition.code === 1000) {
        setWeatherIcon(clear_icon);
      } else if (
        data.current.condition.code === 1114 ||
        data.current.condition.code === 1117
      ) {
        setWeatherIcon(snow_icon);
      }
      console.log(data.current.condition.code);
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occured while fetching weather data");
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search"></input>
        <div className="search" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="cloud-icon"></img>
      </div>
      <div className="weather-temp">24 C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon"></img>
          <div className="data">
            <div className="humidity-percentage">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon"></img>
          <div className="data">
            <div className="wind-speed">18km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
