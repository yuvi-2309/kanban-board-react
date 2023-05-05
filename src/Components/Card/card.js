import React, { useState } from "react";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardDate,
  CardPriority,
  FlexWrap,
} from "./card.style";
import { Chip, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

function Card  ({
  id,
  name,
  description,
  date,
  priority,
  onEditTask,
  onDeleteTask,
}) {
  /* This state variable is used to control the opening and closing of a
  menu component in the card. */
  const [anchorEl, setAnchorEl] = useState(null);

  // The handleClick function sets the anchor element to the current target of the event.
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // The function handleClose sets the value of AnchorEl to null.
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*
   The handleEdit function sets the id of the current card/task to the onEditTask function
  which is accessed by a callback function to perform edit in the board page 
  */
  const handleEdit = () => {
    onEditTask(id);
    handleClose();
  };

  /*
   The handleDelete function sets the id of the current card/task to the onDeleteTask function
   which is accessed by a callback function to perform delete in the board page 
  */
  const handleDelete = () => {
    onDeleteTask(id);
    handleClose();
  };

  // converted nested ternary operator of color into a statement for code readability
  let color;
  if (priority === "Low") {
    color = "success";
  } else if (priority === "Medium") {
    color = "warning";
  } else if (priority === "High") {
    color = "error";
  }

  // Function for converting the date of format mm/dd/yyyy to Month date format
  const formatDate = (dateString) => {
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

  // The date is passed as a parameter to the formatDate function to display it in the card/task
  const formattedDate = formatDate(date);

  return (
    <CardContainer>
      <FlexWrap>
        <CardTitle>{name}</CardTitle>
        <IconButton
          aria-label="more"
          aria-controls="card-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <DehazeIcon fontSize="small" />
        </IconButton>
        <Menu
          id="card-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </FlexWrap>

      {description && <CardDescription>{description}</CardDescription>}

      <FlexWrap $primary>
        {priority && (
          <CardPriority>
            <Stack spacing={1} alignItems="center">
              <Stack direction="row" spacing={1}>
                <Chip label={priority} color={color} />
              </Stack>
            </Stack>
          </CardPriority>
        )}
        {date && (
          <CardDate>
            {formattedDate}
            {/* <Chip label={date} /> */}
          </CardDate>
        )}
      </FlexWrap>
    </CardContainer>
  );
};

export default Card;
