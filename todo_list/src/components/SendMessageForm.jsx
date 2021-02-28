import React, { useState } from "react";
import "./SendMessageForm.sass";
import TextField from '@material-ui/core/TextField';

import { socketEmit, createTask_api } from "./api";

function SendMessageForm(props) {
  const [taskText, setTaskText] = useState();

  const createTask = () => {
    let id = Math.ceil(Math.random() * 100) + "id";
    let newEl = {
      id: id,
      isCompleted: false,
      isBeingEdited: { status: false, user: "" },
      index: 0,
      text: taskText,
    };

    socketEmit(createTask_api, newEl);
    setTaskText("");
  };

  return (
    <div className="messageForm">
       <TextField
          className='messageForm-field'
          multiline
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
          }}
        />
      <button className='messageForm-btn' onClick={createTask}>send</button>
    </div>
  );
}

export default SendMessageForm;
