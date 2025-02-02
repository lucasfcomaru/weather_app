import styled from "styled-components";

const StyledFooter = styled.div`
  color: #000000;
  display: flex;
  justify-content: center;
  width: 300px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px 4px 0 0 ;
  background-color: #fab73a;

  & p {
    padding: 8px;
    font-weight: 400;
  }

  & a {
    transition: all ease-in-out 0.3s;
    color: #FFFFFF;

    &:visited {
      color: #FFFFFF;
    }

    &:hover {
      color: #FFFFFF;
    }
  }

  & span {
    font-weight: 600;
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
