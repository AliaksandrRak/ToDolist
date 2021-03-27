import React from "react";
import "./Chats.sass";

import DragDropContext from "../components/DragDropContext";
import SendMessageForm from "../components/SendMessageForm";
import ChatsMenu from "../components/ChatsMenu";


import {
  socketEmit,
  socket,
  addUser_api,
  userLeft_api,
  login_api,
  tasksList_api,
  updateTask_api,
  deleteTask_api,
  beingEdited_api,
  stopBeingEdited_api,
  disconnect_api,
  reconnect_api,
  reconnect_error_api,
  userConnect_api,
} from "../components/api";

class ChatsClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      taskText: "",
      numberUsers: 0,
    };
  }

  componentDidMount() {
    let username = JSON.parse(localStorage.getItem("user"));

    if (username) {
      socketEmit(addUser_api, username._id);
    }

    socket.on(userConnect_api, (data) => {
      this.setState({ numberUsers: data.numUsers });
    });

    socket.on(userLeft_api, (data) => {
      this.setState({ numberUsers: data.numUsers });
    });

    socket.on(login_api, (list) => {
      this.setState({ todoList: list });
    });

    socket.on(tasksList_api, (list) => {
      this.setState({ todoList: list });
    });

    socket.on(disconnect_api, () => {
      console.log("you have been disconnected");
    });

    socket.on(reconnect_api, () => {
      console.log("you have been reconnected");
      if (username) {
        socketEmit(addUser_api, username._id);
      }
    });

    socket.on(reconnect_error_api, () => {
      console.log("attempt to reconnect has failed");
    });
  }
   // onDragEnd = (result) => {
  //     // dropped outside the list
  //     if (!result.destination) {
  //         return;
  //     }

  //     const items = reorder(
  //         result.source,
  //         result.destination,
  //         this,
  //     );

  //     socketEmit(updateTask_api, items.state.todoList);
  //     this.setState(items.state);
  // }

  // changeStatus = (id) => {
  //     let newTodoList = [...this.state.todoList];
  //     newTodoList.find((el, index) => el.id === id && (newTodoList[index].isCompleted = !newTodoList[index].isCompleted));

  //     socketEmit(updateTask_api, newTodoList);
  //     this.setState({ todoList: newTodoList });
  // }

  // beingEdited = (el) => {
  //     if (el.isBeingEdited.status) {
  //         socketEmit(stopBeingEdited_api, el.id);
  //     } else {
  //         socketEmit(beingEdited_api, el.id);
  //     }
  // }

  deleteMessage = (id) => {
      socketEmit(deleteTask_api, id);
  }

  // changeTask = (id, text) => {
  //     let newTodoList = [...this.state.todoList];
  //     newTodoList.find((el, index) => el.id === id && (newTodoList[index].text = text));

  //     socketEmit(updateTask_api, newTodoList);
  //     this.setState({ todoList: newTodoList });
  //     socketEmit(stopBeingEdited_api, id);
  // }

  render() {
    return (
      <div className="chats">
        <ChatsMenu></ChatsMenu>
        <div className="chats-content">
          <div className="chats-content-messages">
            <DragDropContext todoList={this.state.todoList} deleteMessage={this.deleteMessage} numberUsers={this.state.numberUsers} />
          </div>

          <div className="chats-content-send">
            <SendMessageForm />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatsClass;
