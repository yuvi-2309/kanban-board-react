import styled from "styled-components";
import { HeadContainer } from "../../globalStyles";
import { Link } from "react-router-dom";

export const Head = styled.nav`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 0.1875rem;
  z-index: 999;
  position: sticky;
  font-size: 1.2rem;
`;

export const NavContainer = styled(HeadContainer)`
  display: flex;
  justify-content: space-between;
  height: 5rem;
`;

export const NavLogo = styled(Link)`
  justify-self: flex-start;
  display: flex;
  font-size: 2rem;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-left: 0.1875rem;

  @media (max-width: 400px) {
    margin-left: 1.5625rem;
  }
`;
