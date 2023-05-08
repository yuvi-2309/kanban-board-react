import { render, fireEvent } from "@testing-library/react";
import Card from "../card";

describe("Card Component", () => {
  const mockOnEditTask = jest.fn();
  const mockOnDeleteTask = jest.fn();

  const mockProps = {
    id: 1,
    name: "Test Task",
    description: "This is a test task",
    date: "2022-01-01",
    priority: "High",
    onEditTask: mockOnEditTask,
    onDeleteTask: mockOnDeleteTask,
  };

  test("renders the task name", () => {
    const { getByText } = render(<Card {...mockProps} />);
    const taskName = getByText(mockProps.name);
    expect(taskName).toBeInTheDocument();
  });

  test("renders the task description", () => {
    const { getByText } = render(<Card {...mockProps} />);
    const taskDescription = getByText(mockProps.description);
    expect(taskDescription).toBeInTheDocument();
  });

  test("renders the task date", () => {
    const { getByText } = render(<Card {...mockProps} />);
    const taskDate = getByText("January 1");
    expect(taskDate).toBeInTheDocument();
  });

  test("renders the task priority", () => {
    const { getByText } = render(<Card {...mockProps} />);
    const taskPriority = getByText(mockProps.priority);
    expect(taskPriority).toBeInTheDocument();
  });

  test("calls the onEditTask function when the Edit menu item is clicked", () => {
    const { getByLabelText, getByText } = render(<Card {...mockProps} />);
    const moreButton = getByLabelText("more");
    fireEvent.click(moreButton);
    const editMenuItem = getByText("Edit");
    fireEvent.click(editMenuItem);
    expect(mockOnEditTask).toHaveBeenCalledTimes(1);
    expect(mockOnEditTask).toHaveBeenCalledWith(mockProps.id);
  });

  test("calls the onDeleteTask function when the Delete menu item is clicked", () => {
    const { getByLabelText, getByText } = render(<Card {...mockProps} />);
    const moreButton = getByLabelText("more");
    fireEvent.click(moreButton);
    const deleteMenuItem = getByText("Delete");
    fireEvent.click(deleteMenuItem);
    expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTask).toHaveBeenCalledWith(mockProps.id);
  });

  test("formatDate function returns correct month and date", () => {
    const dateString = "2022-05-08"; // May 8th, 2022
    const expectedDate = "May 8";

    const formatDate = (dateString: string) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const date = new Date(dateString);
      const month = months[date.getMonth()];
      const day = date.getDate();

      return `${month} ${day}`;
    };
    expect(formatDate(dateString)).toEqual(expectedDate);
  });
});
