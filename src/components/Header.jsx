import { useContext, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { WeatherContext } from "../context/WeatherContext";
import { theme } from "../theme/Theme";
import SwitchTheme from "./SwitchTheme";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4%;
  padding: 0;

  #logo {
    display: flex;
    align-items: center;
    gap: 20px;

    & h1 {
      color: ${theme.yellow1};
      font-family: "Bebas Neue", sans-serif;
      letter-spacing: 0.2rem;
      font-size: 6rem;
      transition: color ease-in-out 0.2s;

      &:hover {
        color: ${theme.yellow2};
      }
    }

    & img {
      height: 80px;
    }
  }

  #search {
    display: flex;
    align-items: center;
    gap: 10px;

    & input {
      background-color: ${theme.grey};
      color: ${theme.white};
      font-weight: 400;
      height: 40px;
      width: 400px;
      padding: 8px 16px;
      border: none;
      outline: none;
      border: 1px solid ${theme.yellow1};
      border-radius: 20px;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

      &:focus {
        background-color: ${theme.white};
        color: ${theme.grey};
      }
    }

    & button {
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: ${theme.yellow1};
      color: ${theme.grey};
      font-weight: 500;
      border-radius: 50%;
      border: 1px solid ${theme.grey};
      transition: background-color ease-in-out 0.2s;

      &:hover {
        background-color: ${theme.yellow2};
      }

      & svg {
        width: 20px;
        height: auto;
      }
    }
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 8%;

    #switch {
      order: -1;
    }
  }

  @media (max-width: 550px) {
    gap: 20px;

    #logo {
      & h1 {
        font-size: 4rem;
      }
    }

    #search {
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;

      & input {
        height: 40px;
        padding: 8px 16px;
      }
    }
  }

  @media (prefers-color-scheme: light) {
    #logo {
      & h1 {
        color: ${theme.grey};

        &:hover {
          color: ${theme.black};
        }
      }
    }

    #search {
      & input {
        background-color: ${theme.grey};
        color: ${theme.white};
        border: 1px solid ${theme.grey};

        &:focus {
          background-color: ${theme.white};
          color: ${theme.grey};
        }
      }

      & button {
        background-color: ${theme.yellow1};
        color: ${theme.grey};
        border: 1px solid ${theme.yellow1};

        &:hover {
          background-color: ${theme.yellow2};
        }

        & svg {
          width: 20px;
          height: auto;
        }
      }
    }
  }
`;

const StyledH4 = styled.div`
  margin-top: 40px;
  padding: 20px;
  color: ${theme.yellow1};
  display: flex;
  justify-content: center;

  h4 {
    text-align: center;
  }

  @media (prefers-color-scheme: light) {
    color: ${theme.grey};
  }
`;

const Header = () => {
  const { weather, setWeather } = useContext(WeatherContext);
  const { weather5Days, setWeather5Days } = useContext(WeatherContext);
  const inputRef = useRef();
  const erroRef = useRef(null);

  async function buscarCidadeKeyUp(e) {
    let error = false;
    if (e.key === "Enter") {
      try {
        const cidade = inputRef.current.value;
        const key = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;
        const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;

        const apiInfo = await axios.get(url);
        const apiInfo5days = await axios.get(url5days);
        setWeather(apiInfo.data);
        setWeather5Days(apiInfo5days.data);
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
        error = true;
      }

      if (erroRef.current) {
        erroRef.current.innerText = error
          ? "A cidade que você procura não existe"
          : "";
      }
    }
  }
  async function buscarCidade() {
    let error = false;

    try {
      const cidade = inputRef.current.value;
      const key = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;
      const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;

      const apiInfo = await axios.get(url);
      const apiInfo5days = await axios.get(url5days);
      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5days.data);
    } catch (e) {
      console.error("Erro ao buscar dados:", e);
      error = true;
    }

    if (erroRef.current) {
      erroRef.current.innerText = error
        ? "A cidade que você procura não existe"
        : "";
    }
  }

  return (
    <>
      <StyledHeader className="container">
        <div id="logo">
          <Link to="/">
            <h1>WeatherApp</h1>
          </Link>
        </div>
        <div id="switch">
          <SwitchTheme />
        </div>
        <div id="search">
          <input
            onKeyUp={buscarCidadeKeyUp}
            ref={inputRef}
            type="text"
            name="cidade"
            id="cidade"
            placeholder="Digite o nome da cidade"
          />
          <button onClick={buscarCidade}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
      </StyledHeader>
      <StyledH4 id="container-erro">
        <h4 ref={erroRef} id="erro"></h4>
      </StyledH4>
    </>
  );
};

export default Header;
