import React, { useEffect, useState } from "react";
import "./CitySelector.css";
import axios from "axios";

function CitySelector() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");



  useEffect(() => {
    axios
    .get("https://location-selector.labs.crio.do/countries")
    .then((response)=>{
      setCountries(response.data);
    })
    .catch((error)=>{
      console.error("Error fetching countries:", error);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
      .get(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/states`
      )
        .then((response) => {
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedCountry]);


  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
      .get(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedState, selectedCountry]);

  return (
    <div className="container">
      <h1 className="heading">Select Location</h1>

      <div className="dropdown">

        {/* COUNTRY */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* STATE */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* CITY */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

      </div>

      {selectedCity && (
         <h2 className="final">
          You selected <span className="sc">{selectedCity}</span>,
          <span className="d">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default CitySelector;