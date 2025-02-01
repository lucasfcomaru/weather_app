import { createContext, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import WeatherInformations from "./WeatherInformations";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5%;
  padding: 0 60px;

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
      height: 40px;
      width: 300px;
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
      }
    }
  }
`;

const Header = () => {
  const [weather, setWeather] = useState({});
  const inputRef = useRef();
  const erroRef = useRef(null);

  async function buscarCidadeKeyUp(e) {
    let error = false;
    if (e.key === "Enter") {
      try {
        const cidade = inputRef.current.value;
        const key = "0c6d0ee63e9b2ad54cef19f75205ace8";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;

        const apiInfo = await axios.get(url);
        setWeather(apiInfo.data);

        console.log(apiInfo);
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
      const key = "0c6d0ee63e9b2ad54cef19f75205ace8";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;

      const apiInfo = await axios.get(url);
      setWeather(apiInfo.data);

      console.log(apiInfo);
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
        <span ref={erroRef} id="erro"></span>
      </StyledHeader>
      <WeatherInformations weather={weather} />
    </>
  );
};

export default Header;
