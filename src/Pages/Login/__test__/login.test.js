import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../login";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


describe("Test the login component", () => {

  test("check if the login component renders correctly", () => {
    render(<Login />)
    const title = screen.getByText("Sign in to continue");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("check if the password input is defined as type password or not", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("check if the login button is defined as type submit so that onSubmit function runs", () => {
    const { getByRole } = render(<Login />);
    const button = getByRole("button", { name: "Log in" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  test("displays error for invalid email format", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "invalid-email");

    await waitFor(() => {
      const emailError = screen.getByTestId("email-error");
      expect(emailError).toHaveTextContent("Invalid email");
    });
  });

  test("displays email is required error for empty email input submission", async () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText("Password");

    const loginButton = screen.getByRole("button", { name: "Log in" });
    userEvent.type(passwordInput, "1122")
    userEvent.click(loginButton);

    await waitFor(() => {
      const emailError = screen.getByTestId("email-error");
      expect(emailError).toHaveTextContent("Email is required");
    });
  });

  test("No error is displayed in the document once the email passes the regex validation", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");

    const loginButton = screen.getByRole("button", { name: "Log in" });
    userEvent.type(emailInput, "yuvaraj@gmail.com");
    userEvent.click(loginButton);

    await waitFor(() => {
      const emailError = screen.queryByTestId("email-error");
      expect(emailError).not.toBeInTheDocument();
    });
  });

  test("displays password is required error for empty password input submission", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const loginButton = screen.getByRole("button", { name: "Log in" });
    userEvent.type(emailInput, "yuvaraj@gmail.com");
    userEvent.click(loginButton);

    await waitFor(() => {
      const passwordError = screen.getByTestId("password-error");
      expect(passwordError).toHaveTextContent("Password is required");
    });
  });

  test("should display validation error if email and password is empty", async () => {
    const { getByText } = render(<Login />);
    const loginButton = getByText("Log in");

    fireEvent.click(loginButton);

    await waitFor(() => {
      const emailError = screen.queryByTestId("email-error");
      const passwordError = screen.queryByTestId("password-error");

      expect(emailError).toHaveTextContent("Email is required");
      expect(passwordError).toHaveTextContent("Password is required");
    });
  });

  test("typing in email and password input fields", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "yuvaraj@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1122" } });

    expect(emailInput).toHaveValue("yuvaraj@gmail.com");
    expect(passwordInput).toHaveValue("1122");
  });
});
