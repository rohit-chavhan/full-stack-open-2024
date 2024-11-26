const Weather = ({ capital, weather, iconurl }) => {
  return (
    <div>
      <h3>Weather in {capital} </h3>
      <p>temperature {weather.celsius} celsius</p>
      <img src={iconurl} alt='weather icon url' />
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default Weather;
