import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../board";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import React from "react";

describe("Test cases for kanban board component", () => {
  test("renders Kanban Board without crashing", () => {
    render(
      <MemoryRouter initialEntries={['/board']}>
        <Routes>
          <Route path="/board" element={React.createElement(Board)} />
        </Routes>
      </MemoryRouter>
    )
    
    const header = screen.getByText(/Kanban Board/i);
    expect(header).toBeInTheDocument();
  });

  test("renders initial columns correctly", () => {
    render(
      <MemoryRouter initialEntries={['/board']}>
        <Routes>
          <Route path="/board" element={React.createElement(Board)} />
        </Routes>
      </MemoryRouter>
    )
    const todoColumn = screen.getByText("📃 To do");
    const inProgressColumn = screen.getByText("✏️ In progress");
    const backLogColumn = screen.getByText("⌛️ Backlog")
    const doneColumn = screen.getByText("✔️ Completed");

    expect(todoColumn).toBeInTheDocument();
    expect(inProgressColumn).toBeInTheDocument();
    expect(backLogColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
  });

});