import { useState, useEffect } from 'react';
import axios from 'axios';
import OneCountry from './components/OneCountry';
import SearchInput from './components/SearchInput';
import Result from './components/Result';
import Weather from './components/Weather';

function App() {
  const [ray, setRay] = useState(null);
  const [obj, setObj] = useState(null);
  const [search, setSearch] = useState('');
  const [capital, setCapital] = useState('');
  const [iconurl, setIconurl] = useState('');
  const [weather, setWeather] = useState('');

  const SummingUp = (prop) => {
    return (
      <div className='sum'>
        <OneCountry obj={obj} />
        <Weather capital={capital} weather={weather} iconurl={prop.iconurl} />
      </div>
    );
  };

  const BtnLists = ({ ray }) => {
    return (
      <div>
        <ul>
          {ray.map((el, index) => (
            <>
              <li key={index}>{el}</li>
              <button data-country={el} onClick={showCountry}>
                show
              </button>
            </>
          ))}
        </ul>
      </div>
    );
  };

  const showCountry = (event) => {
    const target = event.target.dataset.country;
    setRay([target]);
    setTimeout(() => getCountryApi(target), 0);
  };

  const getString = (event) => {
    setSearch(event.target.value);
  };

  const getIcons = () => {
    if (weather) {
      axios
        .get(`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
        .then((res) => {
          const iconUrl = res.config.url;
          setIconurl(iconUrl);
        })
        .catch((res) => res);
    }
  };
  useEffect(getIcons, [weather]);

  const SingleCountry = ({ obj }) => {
    if (obj === null) {
      return null;
    }
    setCapital(obj.capital[0]);
  };

  const fetchWeather = () => {
    if (capital) {
      const api_key = import.meta.env.VITE_SOME_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
        )
        .then((res) => {
          const kelvinCelsius = res.data.main.temp - 273.15;

          const icons = res.data.weather[0].icon;
          const wind = res.data.wind.speed;
          let weatherData = {
            wind: wind,
            celsius: kelvinCelsius.toFixed(2),
            icon: icons,
          };
          setWeather(weatherData);
        })
        .catch((res) => res);
    }
  };
  useEffect(fetchWeather, [capital]);

  const getCountryApi = (str) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${str}`)
      .then((res) => {
        let data = res.data;
        setObj(data);
      })
      .catch(setObj[null]);
  };

  const getCountryObj = (str) => {
    if (obj !== null && obj.name.common === str) return;
    getCountryApi(str);
  };

  const InputResponse = ({ ray }) => {
    if (ray === null) {
      return null;
    }

    if (ray.length === 1) {
      getCountryObj(ray[0]);
    }

    return (
      <div>
        {ray.length >= 10 && search !== '' && (
          <Result value={'Too many matches, specify another filter'} />
        )}
        {ray.length >= 2 && ray.length < 10 && <BtnLists ray={ray} />}
      </div>
    );
  };

  const serverCalls = () => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then((res) => {
        let data = res.data.filter((el) => {
          let name = el.name.common.toLowerCase();
          return name.match(search.toLowerCase());
        });
        let commonName = data.map((el) => el.name.common);
        setRay(commonName);
      })
      .catch((res) => res);
  };
  useEffect(serverCalls, [search]);

  return (
    <div>
      <SearchInput onChange={getString} value={search} />
      <InputResponse ray={ray} />
      {ray && ray.length === 1 && <SingleCountry obj={obj} />}
      {iconurl !== '' && ray.length === 1 && <SummingUp iconurl={iconurl} />}
    </div>
  );
}

export default App;
