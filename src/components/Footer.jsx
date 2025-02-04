import styled from "styled-components";
import { theme } from "../theme/Theme";

const StyledFooter = styled.div`
  color: ${theme.yellow2};
  display: flex;
  justify-content: center;
  width: 300px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px 4px 0 0;
  background-color: ${theme.black};

  & p {
    padding: 8px;
    font-weight: 400;
  }

  & a {
    transition: all ease-in-out 0.3s;
    color: ${theme.yellow2};

    &:visited {
      color: ${theme.yellow2};
    }

    &:hover {
      color: ${theme.yellow1};
    }
  }

  & span {
    font-weight: 600;
  }

  @media (prefers-color-scheme: light) {
    color: ${theme.grey};
    background-color: ${theme.yellow1};

    & a {
      color: ${theme.grey};

      &:visited {
        color: ${theme.grey};
      }

      &:hover {
        color: ${theme.black};
      }
    }
  }
`;

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <p>
          Developed with ❤{" "}
          <a href="https://github.com/lucasfcomaru/" target="_blank">
            <span>Lucas Comaru</span>
          </a>
        </p>
      </StyledFooter>
    </>
  );
};

export default Footer;
