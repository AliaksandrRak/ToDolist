import React, { useState } from "react";
import "./Messages.sass";


function Messages(props) {
  const [isOpen, setIsOpen] = useState(true);

  const userName = localStorage.getItem('username');

  return (
    <div className={`messages ${userName === props.user ? 'messages-local' : 'messages-income'}`}>
      <div className="messages-content">
        {props.text}
      </div>
    </div>
  );
}

export default Messages;
