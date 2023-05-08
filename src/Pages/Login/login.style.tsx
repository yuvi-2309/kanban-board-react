import styled from "styled-components";
import image from "../../Assets/background.png";

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(Flex)`
  flex-direction: column;
  height: 100vh;

  @media (min-width: 750px) {
    flex-direction: row;
  }
`;

export const ImageContainer = styled(Flex)`
  background-image: url(${image});
  background-size: 95%;
  background-repeat: no-repeat;
  width: 80%;
  height: 100%;

  @media (max-width: 400px) {
    height: 40%;
  }
`;

export const FormContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 50%;

  @media (min-width: 750px) {
    width: 50%;
    height: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;

  @media (max-width: 400px) {
    width: 100%;
    margin-left: -0.9375rem;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: left;
  padding-left: 3.75rem;
`;

export const Input = styled.input`
  width: 80%;
  padding: 0.625rem;
  margin: 0.625rem;
  border: none;
  border-radius: 0.3125rem;
  font-size: 1rem;
  box-shadow: 0 0 0.3125rem rgba(0, 0, 0, 0.3);

  &:focus {
    outline: none;
    box-shadow: 0 0 0.3125rem rgba(0, 0, 0, 0.7);
  }
`;

export const Button = styled.button`
  width: 67%;
  padding: 0.625rem;
  margin: 0.625rem 0.625rem 0.625rem 1.5625rem;
  border: none;
  border-radius: 0.3125rem;
  background-color: #2ecc71;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 0 0.3125rem rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #27ae60;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.625rem;
`;

export const WarningMessage = styled.div`
  font-size: 0.875rem;
  color: red;
  padding-left: 0.625rem;
`;
