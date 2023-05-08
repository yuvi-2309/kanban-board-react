import {
  Container,
  ImageContainer,
  Title,
  FormContainer,
  Form,
  Input,
  Button,
  WarningMessage,
  InputWrap,
} from "./login.style";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  // destructing all the needed objects from the useForm hook
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  // useNavigate to navigate to another route
  const navigate = useNavigate();

  // function to be called if the form is submitted and navigate to next page if the hard coded email and password is submitted
  const onSubmit = (data: any) => {
    if (data.email === "yuvaraj@gmail.com" && data.password === "1122") {
      navigate("/board");
    } else {
      setError("password", {
        type: "manual",
        message: "Invalid Email or Password",
      });
    }
  };

  return (
    <Container>
      <ImageContainer />
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Sign in to continue</Title>
          <InputWrap>
            <Input
              {...register("email", {
                required: true,
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Email is wrong" },
              })}
              placeholder="Email"
            />
            {errors.email && errors.email.type === "required" && (
              <WarningMessage data-testid="email-error">
                Email is required
              </WarningMessage>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <WarningMessage data-testid="email-error">
                Invalid email
              </WarningMessage>
            )}
          </InputWrap>
          <InputWrap>
            <Input
              {...register("password", { required: true })}
              placeholder="Password"
              type="password"
            />
            {errors.password && errors.password.type === "manual" && (
              <WarningMessage data-testid="password-invalid">
                Invalid Email or Password
              </WarningMessage>
            )}
            {errors.password && errors.password.type === "required" && (
              <WarningMessage data-testid="password-error">
                Password is required
              </WarningMessage>
            )}
          </InputWrap>
          <Button type="submit">Log in</Button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default Login;
