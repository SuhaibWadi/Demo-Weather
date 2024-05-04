import { useState, useRef } from "react";
import "./App.css";
import WeatherDisplay from "./WeatherDisplay";
function App() {
  const [location, setLocation] = useState("");
  const [trackForEmptyOrSpaceInput, setTrackForEmptyOrSpaceInput] =
    useState("");
  const locationRef = useRef();

  
  const handleChangeOfInput = (event) => {
    setTrackForEmptyOrSpaceInput(event.target.value);
  };

  const handleLocationChange = () => {
    const locationValue = locationRef.current.value;
    setLocation(locationValue);
  };

  return (
    <div id="app">
      <h1 id="WeatherTitle">Weather App</h1>
      <div id="inputContainer">
        <input
          id="searchW"
          type="text"
          placeholder="Enter location"
          ref={locationRef}
          onChange={handleChangeOfInput}
          value={trackForEmptyOrSpaceInput}
        />
        <button
          id="enterW"
          onClick={handleLocationChange}
          disabled={!trackForEmptyOrSpaceInput.trim()}
        >
          search
        </button>
      </div>

      <WeatherDisplay enteredLocation={location} />
    </div>
  );
}

export default App;
