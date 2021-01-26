import React from "react";
import "./Support.sass";

import DragDropContextClass from "../components/DragDropContext";
import SendMessageForm from "../components/SendMessageForm";

function Support(props) {
  return (
    <div className="todoPage">
      <div className="todoPage-content">
        <h1>Тех поддержка Сайта</h1>

        <DragDropContextClass />
        <SendMessageForm />
      </div>
    </div>
  );
}

export default Support;
