import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import styled from "styled-components";

const StyledCardForecast = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

const StyledForecast = styled.div`
  background-color: #202020;
  display: flex;
  flex-direction: column;
  min-width: 180px;
  align-items: center;
  padding: 40px;
  border-radius: 6px;
  margin-top: 20px;
  box-shadow: 2px 2px 10px #000000;
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
  color: #ffff;

  &:hover {
    background-color: #2b2b2b;
  }

  & img {
    display: block;
    width: 70px;
  }

  #info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    #data {
      font-size: 0.875rem;
    }

    #description {
      font-size: 1rem;
      text-transform: capitalize;
      font-weight: 500;
    }

    #temp {
      font-size: 0.875rem;
    }

    #humidity {
      font-size: 0.875rem;
    }
  }

  /* @media (max-width: 1300px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  } */
`;

const Weather5Days = () => {
  const { weather5Days } = useContext(WeatherContext);
  console.log("weather5Days:", weather5Days);

  if (weather5Days) {
    let dailyForecast = {};

    for (let forecast of weather5Days.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString(); //converter para data normal

      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast;
      }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);
    console.log("forecast", next5DaysForecast);

    function converterData(date) {
      const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
      });
      return newDate;
    }

    return (
      <>
        <StyledCardForecast className="container">
          {next5DaysForecast.map((forecast) => (
            <StyledForecast key={forecast.dt}>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
              />
              <div id="info">
                <p id="data">{converterData(forecast)}</p>
                <p id="description">{forecast.weather[0].description}</p>
                <p id="temp">{forecast.main.temp.toFixed(0)}°C</p>
                <p id="humidity">{forecast.main.humidity}%</p>
              </div>
            </StyledForecast>
          ))}
        </StyledCardForecast>
      </>
    );
  }
};
export default Weather5Days;
