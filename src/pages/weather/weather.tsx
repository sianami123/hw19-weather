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
      console.log(city);
      console.log(data);
      setWeather(data);
      setSearchHistory([...searchHistory, data]);

      setCity("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Weather Forecast
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex gap-2 justify-center mb-8"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="px-4 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:outline-none w-64 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-sm"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center bg-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <h2 className="text-3xl font-semibold mb-2">{weather.name}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="w-20 h-20"
                  />
                  <div>
                    <p className="text-5xl font-bold">
                      {Math.round(weather.main.temp)}°C
                    </p>
                    <p className="text-lg opacity-90">
                      Feels like {Math.round(weather.main.feels_like)}°C
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl capitalize">
                    {weather.weather[0].main}
                  </p>
                  <p className="opacity-90 capitalize">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-900 text-sm font-medium mb-1">
                  Humidity
                </p>
                <p className="text-2xl text-blue-700">
                  {weather.main.humidity}%
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-900 text-sm font-medium mb-1">
                  Wind Speed
                </p>
                <p className="text-2xl text-blue-700">
                  {weather.wind.speed} m/s
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-900 text-sm font-medium mb-1">
                  Pressure
                </p>
                <p className="text-2xl text-blue-700">
                  {weather.main.pressure} hPa
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-900 text-sm font-medium mb-1">
                  Temperature
                </p>
                <p className="text-2xl text-blue-700">
                  {Math.round(weather.main.temp)}°C
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {searchHistory.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Recent Searches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchHistory.map((item) => (
                <div
                  key={item.name}
                  className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-3 text-white">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm opacity-90">{item.timezone}</p>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt={item.weather[0].description}
                          className="w-12 h-12"
                        />
                        <p className="text-2xl font-bold text-blue-900">
                          {Math.round(item.main.temp)}°C
                        </p>
                      </div>
                      <p className="text-sm text-blue-700 capitalize">
                        {item.weather[0].main}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
