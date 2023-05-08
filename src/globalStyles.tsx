import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

export const HeadContainer = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 81.25rem;
  margin: 0 auto;
  padding: 0 3.125rem;
  @media screen and (max-width: 990px) {
    padding: 0 1.875rem;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GlobalStyle