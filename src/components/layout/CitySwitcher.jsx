import { Link } from "react-router-dom";
import { useCityContext } from "../../context/CityContext";
import { cityConfig } from "../../data/cityConfig";

const CITIES = ["casablanca", "rabat", "marrakech"];

const CitySwitcher = () => {
  const { cityData } = useCityContext();

  if (!cityData) return null;

  const { currentLang, currentCity } = cityData;

  return (
    <div className="city-switcher">
      {CITIES.map((city) => {
        const { name, canonical } = cityConfig[city][currentLang];
        const path = canonical.replace("https://www.moudevpro.com", "") || "/";
        return (
          <Link
            key={city}
            to={path}
            className={`city-switcher__btn${currentCity === city ? " active" : ""}`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default CitySwitcher;
