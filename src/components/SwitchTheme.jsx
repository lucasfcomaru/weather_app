import styled from "styled-components";
import { theme } from "../theme/Theme";
import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

const StyledSwitch = styled.div`
  background: ${theme.black};
  width: 60px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid ${theme.yellow1};
  position: relative;
  cursor: pointer;

  .indicador {
    width: 30px;
    height: 30px;
    background-color: ${theme.yellow1};
    border-radius: 50%;
    position: absolute;
    top: -2px;
    left: -2px;
    transform: scale(0.9);
    transition: all cubic-bezier(0.2, 0.28, 0.29, 1.31) 0.5s;
  }

  &.active .indicador {
    position: absolute;
    left: 28px;
  }

  @media (prefers-color-scheme: light) {
    border: 2px solid ${theme.grey};

    &:hover .indicador {
      background-color: ${theme.yellow1}
    }
    .indicador {
    background-color: ${theme.lightGrey};
    }
  }
`;

const SwitchTheme = () => {
  const { classActive, setClassActive } = useContext(WeatherContext);

  function handleClick() {
    setClassActive(!classActive);
  }

  return (
    <StyledSwitch className={classActive ? "active" : ""} onClick={handleClick}>
      <div className="indicador"></div>
    </StyledSwitch>
  );
};

export default SwitchTheme;
