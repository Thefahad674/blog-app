import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const  defaultLocation = "Delhi"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=f64434d2dfc11a462cf9904c187cdd6d`;
    const response = await axios.get(url);
    setData(response.data)
    }
    fetchDefaultLocation()
  }, [])

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=f64434d2dfc11a462cf9904c187cdd6d`

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true })
      }else {
         setData(response.data)
    setLocation("")
      }
    } catch(error) {
      if(error.response && error.response.status === 404){
        setData({ notFound: true})
      } else{
        console.error('An unexpected error occurred', error);
        
      }
    }





    
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Haze":
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };


  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      search()
    }
  }

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
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (<div className="not-found">Not Found ❌</div>) :(

        <div className="weather-data">
        {data.weather &&
          data.weather[0] &&
          getWeatherIcon(data.weather[0].main)}
        <div className="weather-type">
          {data.weather ? data.weather[0].main : null}
        </div>
        <div className="temp">
          {data.main ? `${Math.floor(data.main.temp)}°` : null}
        </div>
      </div>
      )}
    </div>
  );
};

export default Weather;
