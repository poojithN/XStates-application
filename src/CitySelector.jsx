import { useEffect, useState } from "react";
import "./Country.css";

function CitySelector() {

  // ---------------- STATES ----------------
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API failed");
        }
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountries) {
      fetch(
        `https://location-selector.labs.crio.do/country=${selectedCountries}/states`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("API failed");
          }
          return res.json();
        })
        .then((data) => {
          setStates(data);

          // reset lower selections
          setSelectedStates("");
          setCity([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedCountries]);


  useEffect(() => {
    if (selectedCountries && selectedStates) {
      fetch(
        `https://location-selector.labs.crio.do/country=${selectedCountries}/state=${selectedStates}/cities`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("API failed");
          }
          return res.json();
        })
        .then((data) => {
          setCity(data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedStates, selectedCountries]);

  return (
    <div className="container">
      <h1 className="heading">Select Location</h1>

      <div className="dropdown">

        {/* COUNTRY */}
        <select
          value={selectedCountries}
          onChange={(e) => setSelectedCountries(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* STATE */}
        <select
          value={selectedStates}
          onChange={(e) => setSelectedStates(e.target.value)}
          disabled={!selectedCountries}
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
          You selected {selectedCity}, {selectedStates}, {selectedCountries}
        </h3>
      )}
    </div>
  );
}

export default CitySelector;