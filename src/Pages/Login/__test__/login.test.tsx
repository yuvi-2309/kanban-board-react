import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../login";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

const renderLogin = () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={React.createElement(Login)} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Test the login component", () => {
  test("check if the login component renders correctly", () => {
    renderLogin();
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
    renderLogin();
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("check if the login button is defined as type submit so that onSubmit function runs", () => {
    renderLogin();
    const button = screen.getByRole("button", { name: "Log in" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  test("displays error for invalid email format", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "invalid-email");

    await waitFor(() => {
      const emailError = screen.getByTestId("email-error");
      expect(emailError).toHaveTextContent("Invalid email");
    });
  });

  test("displays email is required error for empty email input submission", async () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    userEvent.type(passwordInput, "1122");
    userEvent.click(loginButton);

    await waitFor(() => {
      const emailError = screen.getByTestId("email-error");
      expect(emailError).toBeInTheDocument();
    });
  });

  test("No error is displayed in the document once the email passes the regex validation", async () => {
    renderLogin();

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
    renderLogin();

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
    renderLogin();
    const loginButton = screen.getByText("Log in");

    fireEvent.click(loginButton);

    await waitFor(() => {
      const emailError = screen.queryByTestId("email-error");
      const passwordError = screen.queryByTestId("password-error");

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  test("typing in email and password input fields", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "yuvaraj@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1122" } });

    expect(emailInput).toHaveValue("yuvaraj@gmail.com");
    expect(passwordInput).toHaveValue("1122");
  });

  test("navigates to /board page on successful login", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "yuvaraj@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1122" } });
    fireEvent.click(screen.getByText("Log in"));

    // Wait for a short period of time for the navigation to complete
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
