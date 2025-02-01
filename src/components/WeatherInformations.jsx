import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import styled from "styled-components";

const StyledAviso = styled.div`
  color: #FFFFFF;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;

  & p {
    text-align: center;
  }
`;

const StyledWeatherInformations = styled.section`
  background-color: #202020;
  display: flex;
  padding: 60px 80px;
  margin-top: 40px;
  border-radius: 6px;
  width: 100%;
  line-height: 2;
  justify-content: space-between;
  align-items: end;
  box-shadow: 2px 2px 10px #000000;
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

  &:hover {
    background-color: #2b2b2b;
  }

  #name {
    #weather-img {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;

      & img {
        width: 20%;
        display: block;
      }

      & h3 {
        font-size: 1.2rem;
        color: #fab73a;
      }
    }
    h2 {
      font-size: 2.5rem;
      color: #ffffff;
    }
  }

  #info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    #info-data {
      display: flex;
      gap: 20px;

      .info-data-container {
        display: flex;
        gap: 10px;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 2px 2px 8px #00000060;
        & svg {
          fill: #fff;
          width: 20px;
          height: auto;
        }

        & p {
          font-size: 0.875rem;
          color: #ffffff;
          font-weight: 400;
        }
      }
    }
  }

  @media (max-width: 1300px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  @media (max-width: 700px) {
    padding: 40px;
    #info {
      width: 100%;
      #info-data {
        flex-direction: column;
        width: 100%;
        .info-data-container {
          display: flex;
          gap: 10px;
          justify-content: flex-start;

          & p {
            font-weight: 600;
          }
        }
      }
    }
  }
`;

const WeatherInformations = () => {
  const { weather } = useContext(WeatherContext);
  console.log(weather);

  if (!weather) {
    return (
      <StyledAviso>
        <p>Busque uma cidade para ver as informações.</p>
      </StyledAviso>
    );
  }
  else {
    return (
      <StyledWeatherInformations
        className="container"
        aria-label="Informações climáticas"
      >
        <div id="name">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div id="weather-img">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <h3>{weather.weather[0].description.toUpperCase()}</h3>
          </div>
        </div>
        <div id="info">
          <div id="info-data">
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
              <p>Temperatura: {weather.main.temp.toFixed(0)}°C</p>
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
              <p>Umidade: {weather.main.humidity.toFixed(0)}%</p>
            </div>
            <div className="info-data-container" aria-label="Temperatura máxima">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-up-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                />
              </svg>
              <p>Max: {weather.main.temp_max.toFixed(0)}°C</p>
            </div>
            <div className="info-data-container" aria-label="Temperatura mínima">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                />
              </svg>
              <p>Min: {weather.main.temp_min.toFixed(0)}°C</p>
            </div>
          </div>
        </div>
      </StyledWeatherInformations>
    );
  }

};

export default WeatherInformations;
