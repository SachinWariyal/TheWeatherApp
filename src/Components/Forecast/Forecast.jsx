import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const Forecast = ({ searchTerm, handleSearch, handleChange }) => {
  const [searchResults, setSearchResult] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          // Geocoding API to get latitude and longitude based on city name
          // const geocodingResponse = await axios.get(
          //   `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${"1b9448e7c3e2aaae110dc1a9bc31b80e"}`
          // );
          // const { coord } = geocodingResponse.data;
          // const { lat, lon } = coord;

          // Weather data API
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`
          );
          const data = response.data;
          console.log("data: ", data);

          setSearchResult(data);
          console.log(searchResults)
          setTemperature(data.current.temperature_2m);
          setWindSpeed(data.current.wind_speed_10m);
          setHumidity(data.current.relative_humidity_2m);
          setSunrise(data.daily.sunrise[0].slice(11));
          setSunset(data.daily.sunset[0].slice(11));
          if (data && data.daily && data.daily.temperature_2m_max) {
            const maxTemp = Math.max(...data.daily.temperature_2m_max);
            const minTemp = Math.min(...data.daily.temperature_2m_min);
            setMaxTemp(maxTemp);
            setMinTemp(minTemp);
          } else {
            console.log("No temperature data found");
          }
        } catch (e) {
          console.log("Error fetching data", e);
        }
      };

      // Call fetchData function when searchTerm changes
      fetchData();
      handleSearch()
    }
  }, [searchTerm]);

  return (
    <>
      <div className="weather-forecast">Weather Forecast</div>
      <input
        type="text"
        placeholder="Search by City(eg: Delhi)"
        className="search-box"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      {temperature && windSpeed && humidity && (
        <div className="weather-data">
          <div className="regular-data">
            <p className="temp">Temperature: {temperature} °C</p>
            <p className="wind">Wind Speed: {windSpeed} km/hr</p>
            <p className="humidity">Humidity: {humidity} %</p>
          </div>
          <div className="sunrise-sunset">
            <p>Sunrise: {sunrise}</p>
            <p>Sunset: {sunset}</p>
          </div>
          <div className="max-min-temp">
            <p>Max Temp: {maxTemp}</p>
            <p>Min Temp: {minTemp}</p>
          </div>
        </div>
      )}
    </>
  );
};

// Define prop types for the Forecast component
Forecast.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Forecast;
