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
    margin-left: -15px;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: left;
  padding-left: 60px; 
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
  }
`;

export const Button = styled.button`
  width: 67%;
  padding: 10px;
  margin: 10px 10px 10px 25px;
  border: none;
  border-radius: 5px;
  background-color: #2ecc71;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #27ae60;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const WarningMessage = styled.div`
  font-size: small;
  color: red;
  padding-left: 10px;
`;
