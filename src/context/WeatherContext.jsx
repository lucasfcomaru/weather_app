import { createContext, useState } from "react";

export const WeatherContext = createContext(null);

export const WeatherStorage = ({ children }) => {
  const [weather, setWeather] = useState(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
