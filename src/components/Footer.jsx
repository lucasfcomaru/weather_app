import styled from "styled-components";

const StyledP = styled.div`
  color: #7a7a7a;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 300px;
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);

  a {
    transition: all ease-in-out 0.3s;
  }

  a:visited {
    color: #7a7a7a;
  }

  a:hover {
    color: #ffffff;
  }

  & span {
    font-weight: 600;
  }
`;

const Footer = () => {
  return (
    <>
      <StyledP>
        <p>
          Developed with ❤{" "}
          <a href="https://github.com/lucasfcomaru/" target="_blank">
            <span>Lucas Comaru</span>
          </a>
        </p>
      </StyledP>
    </>
  );
};

export default Footer;
