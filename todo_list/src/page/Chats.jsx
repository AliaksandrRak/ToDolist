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
        <h1>Тех поддержка Сайта</h1>
        

        <DragDropContextClass />
        <SendMessageForm />
      </div>
    </div>
  );
}

export default Chats;
