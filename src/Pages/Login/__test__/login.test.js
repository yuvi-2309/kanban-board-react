import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../login";
import userEvent from "@testing-library/user-event";

describe("Test the login component", () => {
  test("check if login component renders correctly by checking if form title is displayed in the screen", () => {
    render(<Login />);
    const linkElement = screen.getByText(/Sign in to continue/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("check if the email and password fields are displayed", () => {
    const loginComponent = render(<Login />);
    const childElementEmail = loginComponent.getByPlaceholderText("Email");
    const childElementPassword =
      loginComponent.getAllByPlaceholderText("Password");
    expect(childElementEmail).toBeTruthy();
    expect(childElementPassword).toBeTruthy();
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

    const emailInput = screen.getByPlaceholderText("Email");

    const loginButton = screen.getByRole("button", { name: "Log in" });
    userEvent.type(emailInput, "");
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

    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });
    userEvent.type(passwordInput, "");
    userEvent.click(loginButton);

    await waitFor(() => {
      const passwordError = screen.getByTestId("password-error");
      expect(passwordError).toHaveTextContent("Password is required");
    });
  });
});
