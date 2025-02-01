import { createContext, useState } from "react";

export const WeatherContext = createContext(null);

export const WeatherStorage = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [weather5Days, setWeather5Days] = useState(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather, weather5Days, setWeather5Days }}>
      {children}
    </WeatherContext.Provider>
  );
};
