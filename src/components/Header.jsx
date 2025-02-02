import { useContext, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { WeatherContext } from "../context/WeatherContext";

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
      color: #fab73a;
      transition: color ease-in-out 0.2s;

      &:hover {
        color: #f5a20a;
      }
    }

    & img {
      height: 80px;
    }
  }

  #search {
    display: flex;
    align-items: center;

    & input {
      background-color: #3a3a3a;
      color: #ffffff;
      font-weight: 400;
      height: 40px;
      width: 300px;
      padding: 8px 16px;
      border: none;
      outline: none;
      border: 1px solid #3a3a3a;
      border-radius: 6px 0 0 6px;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

      &:focus {
        background-color: #f5f5f5;
        color: #3a3a3a;
      }
    }

    & button {
      height: 40px;
      border-radius: 0;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: #fab73a;
      color: #ffffff;
      font-weight: 500;
      border-radius: 0 6px 6px 0;
      border: 1px solid #3a3a3a;
      transition: background-color ease-in-out 0.2s;

      &:hover {
        background-color: #f5a20a;
      }
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 40px;
  }
  @media (max-width: 400px) {
    gap: 20px;

    #logo {
      & h1 {
        color: #fab73a;
        font-size: 1.5rem;
      }

      & img {
        height: 60px;
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
        border: none;
        outline: none;

        &:focus {
          background-color: #f5f5f5;
        }
      }

      & button {
        height: 40px;
        border-radius: 0;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px;
        background-color: #fab73a;
        color: #ffffff;
        font-weight: 500;
        border-radius: 0 6px 6px 0;
      }
    }
  }
`;

const StyledH4 = styled.div`
  margin-top: 40px;
  padding: 20px;
  color: #f5a20a;
  display: flex;
  justify-content: center;

  h4 {
    text-align: center;
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
          <img src="/logo.png" alt="Logo WeatherApp" />
          <Link to="/">
            <h1>WeatherApp</h1>
          </Link>
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
          <button onClick={buscarCidade}>Buscar</button>
        </div>
      </StyledHeader>
      <StyledH4 id="container-erro">
        <h4 ref={erroRef} id="erro"></h4>
      </StyledH4>
    </>
  );
};

export default Header;
