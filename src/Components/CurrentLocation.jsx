
import axios from "axios";
import { useState, useEffect } from "react"; // Import useEffect
// import PropTypes from 'prop-types';
import "./currentLocation.css";
import { UseDate } from "./Date/UseDate";
import Forecast from "./Forecast/Forecast";
// import Navbar from "./Navbar/Navbar";
const CurrentLocation = () => {
  // const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResult] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ name: "", country: "" }); // Initialize selectedCity as an object
  const { date, time } = UseDate();
  useEffect(() => {
    // Fetch weather data when searchTerm changes
    if (searchTerm !== '') {
      weatherData(searchTerm);
    }
  }, [searchTerm]);

  const weatherData = async (city) => {
    try {
      // console.log("Fetching weather data for city:", city); 
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      );
      const data = response.data;
      // console.log("API Response:", data);
  
      if (data.results && data.results.length > 0) {
        // setSearchResult(data.results);
        setSelectedCity(data.results[0]); // Select the first result as the selected city
        // console.log(selectedCity.name);
      } 
    } catch (e) {
      console.log("Error Fetching weather data", e);
    }
  };

  const handleSearch = () => {
    weatherData(searchTerm);
    // APIdata(searchTerm);
  };
  const handleChange = (value) => {
    setSearchTerm(value)
  }
  return (
    <>
    {/* <UseDate/> */}
      {/* <Navbar/>  */}
      <div className="container">
        <div className="left-container">
          {selectedCity.name && ( // Check if selectedCity has a name before rendering
            <>
            <h1 className="current-city-name">{selectedCity.name}, {selectedCity.country}</h1>
              <div className="date-container">
                <div>
                <p className="time">{time}</p>
                </div>
                <div>
                <p className="date">{date}</p>
                </div>
              </div>
            </>
          )}
          <ul>
            
          </ul>
        </div>
        <div className="right-container">
            <Forecast searchTerm={searchTerm} handleSearch={handleSearch} handleChange={handleChange}/>
        </div>
      </div>
    </>
  );
};

CurrentLocation.propTypes = {
  // onAddCity: PropTypes.func.isRequired, // Require onAddCity to be a function
};

export default CurrentLocation;
