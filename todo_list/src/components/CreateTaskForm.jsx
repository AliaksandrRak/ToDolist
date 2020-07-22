import React, { useState } from 'react';
import './CreateTaskForm.sass'

import io from 'socket.io-client';
const socket = io('http://192.168.100.82:3001');



function CreateTaskForm(props) {

    const [taskText, setTaskText] = useState();

    const createTask = () => {
        let id = Math.ceil(Math.random() * 100) + "id";
        let newEl = { id: id, isCompleted: false, isBeingEdited: {status:false, user:''}, index: 0, text: taskText };

        socket.emit('create task', newEl);
        setTaskText('');
    }

        return (
            <div className="createTask">
                <input type="text" placeholder="Введите название" onChange={(e) => { setTaskText(e.target.value) }} value={taskText} />
                <button onClick={createTask}>Создать задачу</button>
            </div >
        );
    
}

export default CreateTaskForm;