import { useState } from "react";
import { weatherApi } from "../../api/api";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      const data = await weatherApi.getWeatherByCity(city);
      setWeather(data);
      console.log("weather", data);
      setCity("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
    try {
      const data = await weatherApi.getForecastByCity(city);
      setForecast(data);
      console.log("forecast", data);
      setCity("");
    } catch (err) {
      setError("City not found. Please try again.");
      setForecast(null);
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

  // Function to calculate local time
  const getLocalTime = (timezoneOffset: number) => {
    const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
    return localTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header and Search Section */}
        <div className="flex items-center justify-center gap-4 mb-6 w-full">
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8 w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-grow max-h-10 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
          {searchHistory.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {searchHistory.map((item) => (
                <div
                  onClick={() => setCity(item.name)}
                  key={item.name}
                  className="bg-white/80 backdrop-blur-md text-gray-800 p-4 rounded-xl shadow-md cursor-pointer w-48"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <button onClick={() => removeFromHistory(item)}>
                      <IoIosRemoveCircle className="text-2xl text-red-600" />
                    </button>
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <span>{item.main.temp}°C</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="weather icon"
                      className="w-12 h-12"
                    />
                  </div>
                  <span>Local Time: {getLocalTime(item.timezone)}</span>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Main Weather Content */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Current Weather Card */}
          {weather && (
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">{weather.name}</h2>
                  <div className="flex gap-2">
                    <button onClick={() => addToHistory(weather)}>
                      <IoIosAddCircle className="text-2xl text-blue-600 hover:text-blue-700" />
                    </button>
                    <button onClick={() => removeFromHistory(weather)}>
                      <IoIosRemoveCircle className="text-2xl text-red-600 hover:text-red-700" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-bold">
                      {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="text-lg capitalize">
                      {weather.weather[0].description}
                    </div>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="w-24 h-24"
                  />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <WiHumidity className="text-3xl text-blue-600" />
                    <span className="text-sm">Humidity</span>
                    <span className="font-semibold">
                      {weather.main.humidity}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <WiStrongWind className="text-3xl text-blue-600" />
                    <span className="text-sm">Wind</span>
                    <span className="font-semibold">
                      {weather.wind.speed} m/s
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <WiBarometer className="text-3xl text-blue-600" />
                    <span className="text-sm">Pressure</span>
                    <span className="font-semibold">
                      {weather.main.pressure} hPa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forecast Card */}
          {forecast && (
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {forecast.list
                    .filter((_: any, index: number) => index % 8 === 0)
                    .map((day: any) => (
                      <div
                        key={day.dt}
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="text-sm font-semibold">
                          {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          alt="weather icon"
                          className="w-12 h-12"
                        />
                        <div className="font-bold">
                          {Math.round(day.main.temp)}°C
                        </div>
                        <div className="text-xs text-center capitalize">
                          {day.weather[0].description}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full mt-6">
            <div className="text-red-500 text-center bg-red-100/90 backdrop-blur-md p-4 rounded-lg shadow-md">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
