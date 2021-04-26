import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function handleClick(event) {
    event.preventDefault();
    props.onDelete(props.uniqueid);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button style={{ backgroundColor: "white" }} onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
