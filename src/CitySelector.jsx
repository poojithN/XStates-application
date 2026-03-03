import { useEffect,useState } from "react";
import "./Country.css";
function CitySelector(){
const [countries,setCountries] = useState([]);
const [states,setStates] = useState([]);
const [city,setCity] = useState([]);

const [selectedCountries,setSelectedCountries] = useState("");
const [selectedStates,setSelectedStates] = useState("");
const [selectedCity,setSelectedCity] = useState("");
//fecting countries data
useEffect(()=>{
    fetch("https://location-selector.labs.crio.do/countries")
    .then((res)=>res.json())
    .then((data)=>setCountries(data))
    .catch((error) => {
        console.error("Error fetching countries:", error);
    });

},[])
useEffect(()=>{
if(selectedCountries){
    fetch(`https://location-selector.labs.crio.do/country=${selectedCountries}/states`)
    .then((res)=>res.json())
    .then((data)=>{
        setStates(data);
        setSelectedStates("");
        setCity([]);
        setSelectedCity("");
    })
    .catch((error) => {
        console.error("Error fetching states:", error);
    })
}
},[selectedCountries])
useEffect(()=>{
    if(selectedCountries && selectedStates){
        fetch(`https://location-selector.labs.crio.do/country=${selectedCountries}/state=${selectedStates}/cities`)
        .then((res)=>res.json())
        .then((data)=>{
            setCity(data);
            setSelectedCity("");
        })
        .catch((error) => {
        console.error("Error fetching cities:", error);
    })
    }
},[selectedStates])


return(
    <div className="container">
        <h1 className="heading">Select Location</h1>
        <div className="dropdown">
            <select value={selectedCountries}
        onChange={(e)=>setSelectedCountries(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map((c)=>(
                <option  key={c} value={c}>{c}</option>
            ))}
        </select>
        <select value={selectedStates}
        onChange={(e)=>setSelectedStates(e.target.value)}>
            <option value="">Select State</option>
            {states.map((s)=>(
                <option  key={s} value={s}>{s}</option>
            ))}
        </select>
        <select value={selectedCity}
        onChange={(e)=>setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {city.map((city)=>(
                <option  key={city} value={city}>{city}</option>
            ))}
        </select>
        </div>
        {selectedCity && (
        <h3>
          You selected {selectedCity}, {selectedStates}, {selectedCountries}
        </h3>
      )}
    </div>
)
}

export default CitySelector;