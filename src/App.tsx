import "./App.css";
import Auth from "./pages/auth/auth";
import { Routes, Route } from "react-router-dom";
import Weather from "./pages/weather/weather";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
