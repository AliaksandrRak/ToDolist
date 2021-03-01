import React from 'react';
import './DragDropContext.sass'

import { reorder } from './DragDropSettings'

import {
    socketEmit, socket,  addUser_api,
    userLeft_api, login_api, tasksList_api,
    updateTask_api, deleteTask_api, beingEdited_api,
    stopBeingEdited_api, disconnect_api, reconnect_api,
    reconnect_error_api, userConnect_api,
} from './api'
import Messages from './Messages';



class DragDropContextClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            taskText: '',
            numberUsers: 0,
        }
    }

    componentDidMount() {
        let username = window.localStorage.getItem('username');

        if (username) {
            socketEmit(addUser_api, username);
        } else {
            let id = Math.ceil(Math.random() * 100);
            username = `user${id}`;
            window.localStorage.setItem('username', username);
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
            console.log('you have been disconnected');
        });

        socket.on(reconnect_api, () => {
            console.log('you have been reconnected');
            if (username) {
                socketEmit(addUser_api, username);
            }
        });

        socket.on(reconnect_error_api, () => {
            console.log('attempt to reconnect has failed');
        });
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            result.source,
            result.destination,
            this,
        );

        socketEmit(updateTask_api, items.state.todoList);
        this.setState(items.state);
    }

    changeStatus = (id) => {
        let newTodoList = [...this.state.todoList];
        newTodoList.find((el, index) => el.id === id && (newTodoList[index].isCompleted = !newTodoList[index].isCompleted));

        socketEmit(updateTask_api, newTodoList);
        this.setState({ todoList: newTodoList });
    }

    beingEdited = (el) => {
        if (el.isBeingEdited.status) {
            socketEmit(stopBeingEdited_api, el.id);
        } else {
            socketEmit(beingEdited_api, el.id);
        }
    }

    deleteTask = (id) => {
        socketEmit(deleteTask_api, id);
    }

    changeTask = (id, text) => {
        let newTodoList = [...this.state.todoList];
        newTodoList.find((el, index) => el.id === id && (newTodoList[index].text = text));

        socketEmit(updateTask_api, newTodoList);
        this.setState({ todoList: newTodoList });
        socketEmit(stopBeingEdited_api, id);
    }

    render() {
        debugger
        return (
            <>
                <span className="information">{this.state.numberUsers}</span>
                {this.state.todoList.map((item, index)=>
                    <Messages user={item.isBeingEdited.user} text={item.text}></Messages>
                    )}
                {/* <DragDropContext onDragEnd={this.onDragEnd}>
                    <DraggableElement
                        deleteTask={this.deleteTask}
                        changeStatus={this.changeStatus}
                        beingEdited={this.beingEdited}
                        changeTask={this.changeTask}
                        items={this.state.todoList}
                        id="todoList" />
                </DragDropContext> */}
            </>
        );
    }
}

export default DragDropContextClass;