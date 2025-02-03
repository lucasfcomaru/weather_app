import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import styled from "styled-components";
import { theme } from "../theme/Theme";
import iconSelect from "../functions/functions";
import Chart from "./Chart";

const StyledCardForecast = styled.div`
  #cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
  @media (max-width: 1300px) {
    overflow-x: scroll;
  }
`;

const StyledForecast = styled.div`
  background-color: ${theme.blackOpacity};
  display: flex;
  flex-direction: column;
  min-width: 220px;
  align-items: center;
  padding: 60px 40px;
  border-radius: 6px;
  margin-top: 50px;
  box-shadow: 2px 2px 10px ${theme.black};
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  color: ${theme.white};
  position: relative;

  &:hover {
    background-color: ${theme.yellow1};
  }

  &:hover #day {
    color: ${theme.grey};
    font-weight: 400;
  }

  &:hover #description,
  &:hover #temp,
  &:hover #humidity {
    color: ${theme.black};
    font-weight: 600;
  }

  &:hover #info .info-data-container svg {
    fill: ${theme.black};
  }

  &:hover .icon {
      background-color: ${theme.grey};
    }
  &:hover img {
      filter: invert();
    }

  .icon {
    background: ${theme.yellow1};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
    padding: 12px;
    position: absolute;
    top: -35px;

    & img {
      display: block;
      width: 100%;
    }
  }

  #info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    .info-data-container {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      padding: 8px 12px;
      width: 50;
      border-bottom: 1px solid ${theme.grey};

      & svg {
        fill: ${theme.white};
        width: 20px;
        height: auto;
      }
    }

    #day {
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
`;

const Weather5Days = () => {
  const { weather5Days } = useContext(WeatherContext);

  if (weather5Days) {
    let dailyForecast = {};

    for (let forecast of weather5Days.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString(); //converter para data normal

      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast;
      }
    }

    const next5DaysForecastArr = Object.values(dailyForecast).slice(1, 6); //testar o slice

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
          <div id="cards">
            {next5DaysForecastArr.map((forecast) => (
              <StyledForecast key={forecast.dt}>
                <div className="icon">
                  <img
                    src={iconSelect(forecast)}
                    alt={forecast.weather[0].description}
                  />
                </div>
                <div id="info">
                  <p id="day">{converterData(forecast)}</p>
                  <p id="description">{forecast.weather[0].description}</p>
                  <div className="info-data-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-thermometer-half"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                      <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                    </svg>
                    <p id="temp">{forecast.main.temp.toFixed(0)}°C</p>
                  </div>
                  <div className="info-data-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-moisture"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
                    </svg>
                    <p id="humidity">{forecast.main.humidity}%</p>
                  </div>
                </div>
              </StyledForecast>
            ))}
          </div>
        </StyledCardForecast>
        {weather5Days && <Chart weather5Days={weather5Days} />}
      </>
    );
  }
};
export default Weather5Days;
