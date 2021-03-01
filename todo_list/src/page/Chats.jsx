import React from "react";
import "./Chats.sass";

import DragDropContextClass from "../components/DragDropContext";
import SendMessageForm from "../components/SendMessageForm";
import ChatsMenu from "../components/ChatsMenu";

function Chats(props) {
  return (
    <div className="chats">
      <ChatsMenu></ChatsMenu>
      <div className="chats-content">
        <div className="chats-content-messages">
        <DragDropContextClass />
        </div>

       
        <div className="chats-content-send">
        <SendMessageForm />
        </div>
       
      </div>
    </div>
  );
}

export default Chats;
