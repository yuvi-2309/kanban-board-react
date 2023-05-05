import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }   
`;

export const HeadContainer = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 50px;
  @media screen and (max-width: 990px) {
    padding: 0 30px;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GlobalStyle;