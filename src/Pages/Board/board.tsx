import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal } from "antd";

import { Header, Card } from "../../Components";
import {
  KanbanColumnContent,
  KanbanColumnTitle,
  KanbanContainer,
  KanbanColumn,
  ButtonContainer,
} from "./board.style";
import { FlexColumn } from "../../globalStyles";
import { columnData } from "../../Data/columnData";

interface Task {
  id: string;
  description?: string;
  title: string;
  date?: string;
  priority?: string;
}

function Board() {
  // useState for storing the data of the tasks and columns
  const [data, setData] = useState<any>(columnData);

  // useEffect to get the item from the localStorage and set the data to the state
  useEffect(() => {
    const storedDataString = localStorage.getItem("kanbanData");
    if (storedDataString) {
      setData(JSON.parse(storedDataString));
    }
  }, []);

  // useState to check if new task should be added or edit the existing task by using the id of the task
  const [toEdit, setToEdit] = useState(null);

  // useState to add new task or edit the existing task
  const [newTask, setNewTask] = useState<Task>({
    id: uuidv4(),
    description: "",
    title: "",
    date: "",
    priority: "",
  });

  /* `const onDragEnd` is a function that is called when a drag and drop operation is completed. It
  takes a `result` object as its argument, which contains information about the drag and drop
  operation, such as the source and destination droppable IDs, the index of the dragged item, and
  the ID of the dragged item. The function then updates the state of the `data` array to reflect the
  new order of the tasks after the drag and drop operation. If the dragged item is moved within the
  same column, the function updates the `tasks` array of the column in the `data` array. If the
  dragged item is moved between different columns, the function updates the `tasks` arrays of both
  the source and destination columns in the `data` array. Finally, the function updates the
  `localStorage` with the new `data` array. */
  const onDragEnd = (result: any) => {
    // to prevent error message when the draggable item is dropped outside drag and drop context
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const columnIndex = data.findIndex(
        (e: any) => e.id === source.droppableId
      );
      const column = data[columnIndex];
      const newTaskIds = Array.from(column.tasks);
      const [removed] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, removed);
      const newColumn = {
        ...column,
        tasks: newTaskIds,
      };
      const newData = Array.from(data);
      newData[columnIndex] = newColumn;
      setData(newData);
      const dataString = JSON.stringify(newData);
      localStorage.setItem("kanbanData", dataString);
    } else {
      const sourceColIndex = data.findIndex(
        (e: any) => e.id === source.droppableId
      );
      const destinationColIndex = data.findIndex(
        (e: any) => e.id === destination.droppableId
      );
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      const dataString = JSON.stringify(data);
      localStorage.setItem("kanbanData", dataString);
    }
  };

  // useState to show and hide the dialogue box
  const [open, setOpen] = useState(false);

  /**
   * The function handles adding or updating a task in a Kanban board and updates the data and local
   * storage accordingly.
   */

  const [dialogError, setDialogError] = useState("");
  const handleAddTask = () => {
    setOpen(true);
    if (newTask.title !== "") {
      setDialogError("");
      if (toEdit === null) {
        data[0].tasks.push(newTask);
        setOpen(false);
        const dataString = JSON.stringify(data);
        localStorage.setItem("kanbanData", dataString);
      } else {
        const itemToUpdate = data.find((item: any) =>
          item.tasks.find((task: any) => task.id === toEdit)
        );
        const newData = data.map((item: any) => {
          if (item.id === itemToUpdate.id) {
            return {
              ...item,
              tasks: item.tasks.map((task: any) => {
                if (task.id === toEdit) {
                  return newTask;
                }
                return task;
              }),
            };
          }
          return item;
        });
        setData(newData);
        const dataString = JSON.stringify(newData);
        localStorage.setItem("kanbanData", dataString);
        setOpen(false);
        setToEdit(null);
      }
    } else {
      setDialogError("error");
    }
    setNewTask({
      id: uuidv4(),
      title: "",
      description: "",
    });
  };

  // function to get the data from the input fields of the dialogue box
  function handleAddInputTask(event: any) {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  // callBack function to set the id of the task which is to be edited to the toEdit state
  const handleEditTask = (id: any) => {
    setOpen(true);
    setToEdit(id);
    const itemToUpdate = data.find((item: any) =>
      item.tasks.find((task: any) => task.id === id)
    );
    if (itemToUpdate) {
      const taskToUpdate = itemToUpdate.tasks.find(
        (task: any) => task.id === id
      );
      setNewTask(taskToUpdate);
    }
  };

  // function to delete the existing task by using the id of that particular task
  const handleDeleteTask = (id: any) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const newData = data.map((item: any) => {
          const updatedTasks = item.tasks.filter((task: any) => task.id !== id);
          return { ...item, tasks: updatedTasks };
        });
        setData(newData);
        const dataString = JSON.stringify(newData);
        localStorage.setItem("kanbanData", dataString);
      },
    });
    setNewTask({
      id: uuidv4(),
      title: "",
      description: "",
    });
  };

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          startIcon={<AddCircleIcon />}
        >
          Add Task
        </Button>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setToEdit(null);
            setNewTask({
              id: uuidv4(),
              title: "",
              description: "",
            });
            setDialogError("");
          }}
          data-testid="dialog"
        >
          <DialogTitle>Add new task</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill out the details below</DialogContentText>
            <FlexColumn>
              <TextField
                autoFocus
                name="title"
                margin="dense"
                label="Title"
                type="text"
                variant="standard"
                id="outlined-error"
                value={newTask.title || ""}
                onChange={(event) => handleAddInputTask(event)}
                {...(dialogError && { error: true })}
                helperText={dialogError ? "Title is required" : ""}
              />

              <TextField
                name="description"
                margin="dense"
                label="Description"
                type="text"
                variant="standard"
                value={newTask.description || ""}
                onChange={(event) => handleAddInputTask(event)}
              />

              <FormControl variant="standard" sx={{ width: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Priority
                </InputLabel>
                <Select
                  name="priority"
                  labelId="demo-simple-select-standard-label"
                  id={"demo-simple-select-standard"}
                  label="Priority"
                  value={newTask.priority || ""}
                  onChange={(event) => handleAddInputTask(event)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                name="date"
                margin="dense"
                type="date"
                variant="standard"
                value={newTask.date || ""}
                onChange={(event) => handleAddInputTask(event)}
              />
            </FlexColumn>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add</Button>
          </DialogActions>
        </Dialog>
      </ButtonContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanContainer>
          {data.map((section: any) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <KanbanColumn
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <KanbanColumnTitle>{section.title}</KanbanColumnTitle>
                  <KanbanColumnContent>
                    {section.tasks.map((task: any, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <Card
                              id={task.id}
                              name={task.title}
                              description={task.description}
                              date={task.date}
                              priority={task.priority}
                              onEditTask={handleEditTask}
                              onDeleteTask={handleDeleteTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </KanbanColumnContent>
                </KanbanColumn>
              )}
            </Droppable>
          ))}
        </KanbanContainer>
      </DragDropContext>
    </>
  );
}

export default Board;
