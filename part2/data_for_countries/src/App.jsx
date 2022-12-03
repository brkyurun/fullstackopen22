import { useEffect, useState } from "react";
import axios from "axios";

const CountryDetail = ({ country, isVisible }) => {
  const [weather, setWeather] = useState({});
  const languages = Object.values(country.languages);

  if (isVisible) {
    axios
      .get(
        `${import.meta.env.VITE_WEATHER_API_URL}?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .then((res) => setWeather(res.data));
  }

  if (Object.keys(weather).length !== 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages spoken</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <br />
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather?.main?.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          alt={weather?.weather[0]?.description}
        />
        <p>Wind speed: {weather?.wind?.speed} m/s</p>
      </div>
    );
  }
};

const CountryWithButton = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  const handleClick = () => {
    setShowCountry((prev) => !prev);
  };

  return (
    <div>
      <p
        key={country.name.common}
        style={{ display: "inline-block", marginRight: ".5rem" }}
      >
        {country.name.common}
      </p>
      <button
        type="button"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        Show
      </button>
      {showCountry && (
        <CountryDetail country={country} isVisible={showCountry} />
      )}
    </div>
  );
};

const Countries = ({ countries }) => {
  let result;

  if (countries.length > 10) {
    result = "Too many matches, please narrow down the query!";
  } else if (countries.length <= 10) {
    result = countries.map((country) => (
      <CountryWithButton key={country.name.common} country={country} />
    ));
  }

  return <div>{result}</div>;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCOuntries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCOuntries(filtered);
  }, [query]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="searchCountry">find countries</label>
        <input
          type="text"
          id="searchCountry"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      {filteredCountries.length === 1 ? (
        <CountryDetail country={filteredCountries[0]} isVisible="true" />
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </>
  );
};

export default App;
