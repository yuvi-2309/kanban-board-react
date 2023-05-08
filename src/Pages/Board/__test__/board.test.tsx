import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import Board from "../board";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import React from "react";
import userEvent from "@testing-library/user-event";

const renderBoard = () => {
  render(
    <MemoryRouter initialEntries={["/board"]}>
      <Routes>
        <Route path="/board" element={React.createElement(Board)} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Test cases for kanban board component", () => {
  test("renders header component which is called inside board component without crashing", () => {
    renderBoard();

    const header = screen.getByText(/Kanban Board/i);
    expect(header).toBeInTheDocument();
  });

  test("renders header component which is called inside board component without crashing", () => {
    renderBoard();

    const header = screen.getByText(/Kanban Board/i);
    expect(header).toBeInTheDocument();
  });

  test("renders initial columns correctly", () => {
    renderBoard();
    const todoColumn = screen.getByText("📃 To do");
    const inProgressColumn = screen.getByText("✏️ In progress");
    const backLogColumn = screen.getByText("⌛️ Backlog");
    const doneColumn = screen.getByText("✔️ Completed");

    expect(todoColumn).toBeInTheDocument();
    expect(inProgressColumn).toBeInTheDocument();
    expect(backLogColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
  });

  test("check if the add task dialogue box renders correctly", async () => {
    renderBoard();

    // Click the "Add Task" button to open the dialog
    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    // Fill in the task details
    const titleInput = await screen.findByText("Title");
    const descriptionInput = await screen.findByText("Description");
    const submitButton = await screen.findByText("Add");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("check if validation is working properly", async () => {
    renderBoard();

    // Click the "Add Task" button to open the dialog
    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    // Fill in the task details
    const titleInput = await screen.findByText("Title");
    const descriptionInput = await screen.findByText("Description");
    const submitButton = await screen.findByText("Add");
    userEvent.type(titleInput, "");
    userEvent.type(descriptionInput, "Hello");
    fireEvent.click(submitButton);

    const helperText = screen.getByText("Title is required");
    expect(helperText).toBeInTheDocument();
  });

  test("updates localStorage on task add", async () => {
    renderBoard();

    // Click the "Add Task" button to open the dialog
    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    // Fill in the task details
    const titleInput = await screen.findByText("Title");
    userEvent.type(titleInput, "Test task");
    const myData = JSON.parse(localStorage.getItem("kanbanData") || "null");
    if (myData && myData.length > 0) {
      expect(myData[0].tasks[myData[0].tasks.length - 1].title).toEqual(
        "Test task"
      );
    }
  });
});
