import React, { useState } from "react";

function App() {
  const [district, setDistrict] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleFetchWeather = async () => {
    if (!district) return;

    try {
      const apiKey = "21024072e0eb7dc63bdb2ef7d0195811"; // 🔁 Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("District not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      console.error(err);
      setWeather(null);
      setError("Could not fetch weather. Please check the district name.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-2xl font-bold mb-4">District Weather Finder</h1>

      <input
        type="text"
        placeholder="Enter District Name"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        className="p-2 border border-gray-400 rounded mr-2"
      />

      <button
        onClick={handleFetchWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
