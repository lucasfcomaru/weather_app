import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherContext } from "../context/WeatherContext";
import { theme } from "../theme/Theme";
import iconSelect from "../functions/functions";
import Chart from "./Chart";

// importão das chaves fora do componente para
// evitar leituras repetidas durante as renderizações
const geoLocationKey = import.meta.env.VITE_GEOLOCATION_API_KEY;
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

const StyledAviso = styled.div`
  color: ${theme.yellow1};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 10%;

  .loader {
    border: 6px solid ${theme.grey};
    border-top: 6px solid ${theme.yellow1};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (prefers-color-scheme: light) {
    color: ${theme.grey};
    .loader {
      border: 6px solid ${theme.grey};
      border-top: 6px solid ${theme.yellow1};
    }
  }
`;

const StyledWeatherInformations = styled.section`
  background-color: ${theme.yellow1};
  display: flex;
  padding: 60px 80px;
  border-radius: 6px;
  width: 100%;
  line-height: 2;
  justify-content: space-between;
  align-items: end;
  box-shadow: 2px 2px 10px ${theme.black};
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

  &:hover {
    background-color: ${theme.yellow2};
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
        color: ${theme.grey};
      }
    }
    h2 {
      font-size: 2.5rem;
      color: ${theme.black};
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
        padding: 8px 16px;
        border-radius: 6px;
        border: 1px solid ${theme.grey};
        & svg {
          fill: ${theme.grey};
          width: 20px;
          height: auto;
        }

        & p {
          font-size: 0.875rem;
          color: ${theme.grey};
          font-weight: 500;
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

  @media (prefers-color-scheme: light) {
    background-color: ${theme.grey};

    &:hover {
      background-color: ${theme.black};
    }

    #name {
      #weather-img {
        & img {
          filter: invert();
        }

        & h3 {
          color: ${theme.lightGrey};
        }
      }
      h2 {
        color: ${theme.yellow1};
      }
    }

    #info {
      #info-data {
        .info-data-container {
          border: 1px solid ${theme.lightGrey};
          & svg {
            fill: ${theme.lightGrey};
          }

          & p {
            color: ${theme.lightGrey};
          }
        }
      }
    }
  }
`;

// next 5 days

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

  @media (prefers-color-scheme: light) {
    background-color: ${theme.grey};
    opacity: 0.7;
    color: ${theme.white};
    position: relative;

    &:hover {
      background-color: ${theme.black};
      opacity: 1;
    }

    &:hover #day {
      color: ${theme.lightGrey};
      font-weight: 400;
    }

    &:hover #description,
    &:hover #temp,
    &:hover #humidity {
      color: ${theme.white};
      font-weight: 600;
    }

    &:hover #info .info-data-container svg {
      fill: ${theme.lightGrey};
    }

    &:hover .icon {
      background-color: ${theme.yellow1};
    }
    .icon {
      background: ${theme.white};
    }

    #info {

      .info-data-container {
        border-bottom: 1px solid ${theme.lightGrey};

        & svg {
          fill: ${theme.white};
        }
      }
    }
  }
`;

export default function LocationApi() {
  const [weatherNow, setWeatherNow] = useState(null);
  const [weather5Days, setWeather5Days] = useState(null);
  const [next5DaysForecast, setNext5DaysForecast] = useState([]);
  const { weather } = useContext(WeatherContext);

  useEffect(() => {
    const getInformations = async () => {
      try {
        //obtém ip do usuário
        const IpResponse = await axios.get(
          "https://api64.ipify.org?format=json"
        );
        const ipUser = IpResponse.data.ip;

        //obtém localização através do ip
        const locationKey = geoLocationKey;
        const locationResponse = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${locationKey}&ip=${ipUser}`
        );
        if (!locationResponse.data.city) {
          throw new Error("Cidade não encontrada!");
        }
        const locationUser = locationResponse.data.city;

        //obtém dados da localização
        const key = weatherKey;
        const weatherNowResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${locationUser}&appid=${key}&lang=pt_br&units=metric`
        );
        const weather5daysResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${locationUser}&appid=${key}&lang=pt_br&units=metric`
        );
        setWeatherNow(weatherNowResponse.data);
        setWeather5Days(weather5daysResponse.data);

        //pegar datas únicas
        let dailyForecast = {};
        for (let forecast of weather5daysResponse.data.list) {
          const date = new Date(forecast.dt * 1000).toLocaleDateString(); // Converter para data normal
          if (!dailyForecast[date]) {
            dailyForecast[date] = forecast;
          }
        }

        // Filtra os próximos 5 dias
        const next5DaysForecast = Object.values(dailyForecast).slice(1, 6); // testar o slice

        // Atualiza o estado
        setNext5DaysForecast(next5DaysForecast);
      } catch (error) {
        console.log("Erro ao obter localização ou IP:", error);
      }
    };

    getInformations();
  }, []);

  function converterData(date) {
    try {
      const newDate = new Date(date * 1000);
      if (isNaN(newDate)) {
        return "Data inválida"; // Ou outra mensagem de erro
      }
      return newDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
      });
    } catch (error) {
      console.error("Erro ao converter data:", error);
      return "Data inválida"; // Ou outra mensagem de erro
    }
  }

  if (!weatherNow) {
    return (
      <StyledAviso>
        <div className="loader"></div>
        <p>Carregando sua localização...</p>
      </StyledAviso>
    );
  } else if (!weather) {
    return (
      <>
        <StyledWeatherInformations
          className="container"
          aria-label="Informações climáticas"
        >
          <div id="name">
            <h2>
              {weatherNow.name}, {weatherNow.sys.country}
            </h2>
            <div id="weather-img">
              <img
                src={iconSelect(weatherNow)}
                alt={weatherNow.weather[0].description}
              />
              <h3>{weatherNow.weather[0].description.toUpperCase()}</h3>
            </div>
          </div>
          <div id="info">
            <div id="info-data">
              <div className="info-data-container" aria-label="Temperatura">
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
                <p>Temperatura: {weatherNow.main.temp.toFixed(0)}°C</p>
              </div>
              <div className="info-data-container" aria-label="Umidade">
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
                <p>Umidade: {weatherNow.main.humidity.toFixed(0)}%</p>
              </div>
              <div
                className="info-data-container"
                aria-label="Temperatura máxima"
              >
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
                <p>Max: {weatherNow.main.temp_max.toFixed(0)}°C</p>
              </div>
              <div
                className="info-data-container"
                aria-label="Temperatura mínima"
              >
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
                <p>Min: {weatherNow.main.temp_min.toFixed(0)}°C</p>
              </div>
            </div>
          </div>
        </StyledWeatherInformations>
        <StyledCardForecast className="container">
          <div id="cards">
            {next5DaysForecast.map((forecast) => (
              <StyledForecast key={forecast.dt}>
                <div className="icon">
                  <img
                    src={iconSelect(forecast)}
                    alt={forecast.weather[0].description}
                  />
                </div>
                <div id="info">
                  <p id="day">{converterData(forecast.dt)}</p>
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
}
