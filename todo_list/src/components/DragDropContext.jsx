import React from 'react';
import './DragDropContext.sass'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder, getItemStyle, getListStyle } from './DragDropSettings'
import DragDropElement from './DragDropElement'


import io from 'socket.io-client';
const socket = io('http://192.168.100.82:3001');


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
            socket.emit('add user', username);
        } else {
            let id = Math.ceil(Math.random() * 100);
            username = `user${id}`;
            window.localStorage.setItem('username', username);
        }

        socket.on('user connect', (data) => {
            this.setState({ numberUsers: data.numUsers });
        });

        socket.on('user left', (data) => {
            this.setState({ numberUsers: data.numUsers });
        });

        socket.on('login', (list) => {
            this.setState({ todoList: list });
        });

        socket.on('tasks list', (list) => {
            this.setState({ todoList: list });
        });

        socket.on('disconnect', () => {
            console.log('you have been disconnected');
        });

        socket.on('reconnect', () => {
            console.log('you have been reconnected');
            if (username) {
                socket.emit('add user', username);
            }
        });

        socket.on('reconnect_error', () => {
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

        socket.emit('update task', items.state.todoList);
        this.setState(items.state);
    }

    changeStatus = (id) => {
        let newTodoList = [...this.state.todoList];
        newTodoList.find((el, index) => el.id === id && (newTodoList[index].isCompleted = !newTodoList[index].isCompleted));
        
        socket.emit('update task', newTodoList);
        this.setState({ todoList: newTodoList });
    }

    beingEdited = (el) => {
        if (el.isBeingEdited.status) {
            socket.emit('stop being edited', el.id);
        } else {
            socket.emit('being edited', el.id);
        }
    }

    deleteTask = (id) => {
        socket.emit('delete task', id);
    }

    changeTask = (id, text) => {
        let newTodoList = [...this.state.todoList];
        newTodoList.find((el, index) => el.id === id && (newTodoList[index].text = text));

        socket.emit('update task', newTodoList);
        this.setState({ todoList: newTodoList });
        socket.emit('stop being edited', id);
    }

    render() {


        return (
            <>
                <span className="information">{this.state.numberUsers}</span>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DragDropElement
                        deleteTask={this.deleteTask}
                        changeStatus={this.changeStatus}
                        beingEdited={this.beingEdited}
                        changeTask={this.changeTask}
                        items={this.state.todoList}
                        id="todoList" />
                </DragDropContext>
            </>
        );
    }
}

export default DragDropContextClass;