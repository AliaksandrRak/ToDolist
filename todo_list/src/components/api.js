import io from 'socket.io-client';
const socket = io('localhost:3001');

const addUser_api = 'addUser';
const login_api = 'login';
const tasksList_api = 'tasksList';
const updateTask_api = 'updateTask';
const createTask_api = 'createTask';
const deleteTask_api = 'deleteTask';
const beingEdited_api = 'beingEdited';
const stopBeingEdited_api = 'stopBeingEdited';
const userConnect_api = 'userConnect';
const userLeft_api = 'userLeft';
const disconnect_api = 'disconnect';
const reconnect_api = 'reconnect';
const reconnect_error_api = 'reconnect_error';

const socketEmit = (message, data)=> socket.emit(message, data);


export {
    socketEmit,
    socket,
    addUser_api,
    userConnect_api,
    userLeft_api,
    login_api,
    tasksList_api,
    updateTask_api,
    createTask_api,
    deleteTask_api,
    beingEdited_api,
    stopBeingEdited_api,
    disconnect_api,
    reconnect_api,
    reconnect_error_api,
}

