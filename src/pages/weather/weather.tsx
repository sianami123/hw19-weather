import { useState } from "react";
import { weatherApi } from "../../api/api";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      const data = await weatherApi.getWeatherByCity(city);
      setWeather(data);
      addToHistory(data);
      setCity("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  const addToHistory = (data: any) => {
    if (searchHistory.find((item) => item.name === data.name)) {
      return;
    }
    setSearchHistory([...searchHistory, data]);
  };

  const removeFromHistory = (historyItem: any) => {
    setSearchHistory(
      searchHistory.filter((item) => item.name !== historyItem.name)
    );
  };

  return (
    <div className="min-h-screen bg-slate-500 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header and Search Section */}
        <div className="flex items-center justify-center gap-4 mb-6 w-full">
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8 w-full">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>

        {/* Weather Data Card */}
        {weather && (
          <div className="bg-white/80 backdrop-blur-md text-gray-800 p-6 rounded-xl mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className="w-10 h-10"
              />
            </div>
            <p className="mb-1">Country: {weather.sys.country}</p>
            <p className="mb-1">
              Temperature: {Math.round(weather.main.temp)}°C
            </p>
            <p className="mb-1">
              Feels like: {Math.round(weather.main.feels_like)}°C
            </p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}

        {/* Search History Cards */}
        {searchHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {searchHistory.map((item) => (
              <div
                key={item.name}
                className="bg-white/80 backdrop-blur-md text-gray-800 p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <button
                    onClick={() => removeFromHistory(item)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
                <p className="mb-1">Country: {item.sys.country}</p>
                <p className="mb-1">
                  Temperature: {Math.round(item.main.temp)}°C
                </p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center bg-red-100/80 backdrop-blur-md p-4 rounded-lg mt-4 shadow-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
