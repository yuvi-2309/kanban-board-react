import { render } from "@testing-library/react";
import Board from "../board";

describe("Test cases for kanban board component", () => {
  test("renders Kanban Board without crashing", () => {
    render(<Board />);
    const header = screen.getByText(/Kanban Board/i);
    expect(header).toBeInTheDocument();
  });

  test("renders initial columns correctly", () => {
    const { getByText } = render(<KanbanBoard />);
    const todoColumn = getByText("📃 To do");
    const inProgressColumn = getByText("✏️ In progress");
    const backLogColumn = getByText("⌛️ Backlog")
    const doneColumn = getByText("✔️ Completed");

    expect(todoColumn).toBeInTheDocument();
    expect(inProgressColumn).toBeInTheDocument();
    expect(backLogColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
  });

  test("draggable item can be moved from one column to another", () => {
    const { getByText } = render(<Board />);
    const todoColumn = getByText("📃 To do");
    const inProgressColumn = getByText("✏️ In progress");
    const draggableItem = todoColumn.children[0];
    
    fireEvent.dragStart(draggableItem);
    fireEvent.dragEnter(inProgressColumn);
    fireEvent.drop(inProgressColumn);
    
    expect(inProgressColumn.children).toContain(draggableItem);
  });
});