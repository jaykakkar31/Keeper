import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
function Note(props) {
  

// console.log("Firsst attempt " +JSON.stringify(props.notesData));


  return (
    <div  className="note">
      <h1>{props.notesData.title}</h1>
      <p>{props.notesData.content}</p>
      <button
        onClick={() => {
          props.deleteNoteById(props.notesData)
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
