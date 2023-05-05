import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 1rem; 
  border-radius: 0.5rem; 
  background-color: white;
  margin-top: 1.67rem; 
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2); 
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2); 
    transform: translateY(-0.2rem); 
  }

 
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const CardTitle = styled.h3`
  padding: 0.5rem 0.5rem 0.5rem 0; 
  font-weight: normal;
  max-width: 80%; 
  overflow-wrap: break-word;
`;

export const CardDescription = styled.div`
  margin: 0.3125rem 0; 
  padding-right: 0.3125rem; 
  max-width: 100%; 
  overflow-wrap: break-word;
`;

export const CardDate = styled.p`
  padding-top: 0.5rem; 
  padding-right: 0.5rem;
`;

export const CardPriority = styled.div`
  display: flex;
  justify-content: left;
`;

export const FlexWrap = styled.div.attrs((props) => ({
  margin: props.$primary ? "0.3125rem" : "0",
}))`
  margin-top: ${(props) => props.margin};
  display: flex;
  justify-content: space-between;
`;

export const CardOption = styled.option``;
