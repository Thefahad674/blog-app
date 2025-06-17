import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=f64434d2dfc11a462cf9904c187cdd6d`;

    const response = await axios.get(url);

    setData(response.data);
    setLocation('')
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      <div className="weather-data">
        <i className="bx  bxs-sun"></i>
        <div className="weather-type">{data.weather ? data.weather[0] : null}</div>
        <div className="temp">28°</div>
      </div>
    </div>
  );
};

export default Weather;
