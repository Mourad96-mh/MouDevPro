/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const CityContext = createContext(null);

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cityData, setCityData] = useState(null);
  return (
    <CityContext.Provider value={{ cityData, setCityData }}>
      {children}
    </CityContext.Provider>
  );
};
