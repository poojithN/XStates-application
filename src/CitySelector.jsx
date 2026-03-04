import { useEffect, useState } from "react";
import "./CitySelector.css";
import axios from "axios";

function CitySelector() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countryError, setCountryError] = useState("");

  useEffect(() => {
    axios
    .get("https://location-selector.labs.crio.do/countries")
    .then((response)=>{
      setCountries(response.data);
      setCountryError("");
    })
    .catch((error)=>{
      console.error("Error fetching Countries:", error);
      setCountryError("Failed to load countries");
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
          setSelectedStates("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedCountry]);


  useEffect(() => {
    if (selectedCountry && selectedStates) {
      axios
      .get(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedStates}/cities`
      )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedStates, selectedCountry]);

  return (
    <div className="container">
      <h1 className="heading">Select Location</h1>

      <div className="dropdown">

        {/* COUNTRY */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          data-testid="country-dropdown" // ✅ For Cypress
        >
          <option value="">Select Country</option>
          {countryError ? (
            <option disabled>{countryError}</option> // ✅ Show error in dropdown
          ) : (
            countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))
          )}
        </select>

        {/* STATE */}
        <select
          value={selectedStates}
          onChange={(e) => setSelectedStates(e.target.value)}
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
          disabled={!selectedStates}
        >
          <option value="">Select City</option>
          {city.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

      </div>

      {selectedCity && (
        <h3>
          You selected {selectedCity}, {selectedStates}, {selectedCountry}
        </h3>
      )}
    </div>
  );
}

export default CitySelector;