import React from 'react';
import './ToDoPage.sass'

import DragDropContextClass from '../components/DragDropContext';
import CreateTaskForm from '../components/CreateTaskForm';



function ToDoPage(props) {


    return (
        <div className="todoPage">
            <div className="todoPage-content">
                <h1>To Do List</h1>
                <CreateTaskForm />
                <DragDropContextClass />
            </div>
        </div>
    );
}


export default ToDoPage;