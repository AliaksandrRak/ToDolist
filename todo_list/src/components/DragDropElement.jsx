import React, { useState } from 'react';
import './DragDropElement.sass'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder, getItemStyle, getListStyle } from './DragDropSettings';


function DragDropElement(props) {

    let username = window.localStorage.getItem('username');
    const [text, setText] = useState();

    return (
        <Droppable
            // direction={"horizontal"} // vertical : horizontal
            droppableId={props.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    {props.items.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                        >

                            {(provided, snapshot) => (
                                <div style={{ position: 'relative' }}>
                                    <div className={`${(item.isBeingEdited.status && item.isBeingEdited.user !== username) ? 'beingEdited' : 'beingEdited-hide'}`} >
                                        {item.isBeingEdited.user} вносит изменения
                                    </div>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        style={getItemStyle(
                                            provided.draggableProps.style,
                                            snapshot.isDragging
                                        )}
                                        className='dragDropElement'
                                    >
                                        <div className="dragDropElement-edit" onClick={() => {props.beingEdited(item); setText(item.text)}}></div>

                                            <input type="checkbox" onChange={() => props.changeStatus(item.id)} checked={item.isCompleted} />
                                            
                                            {(item.isBeingEdited.status && item.isBeingEdited.user === username) ?
                                                <div className='dragDropElement-editForm'>
                                                    <textarea className='dragDropElement-editForm-message' type="text" onChange={(e)=>setText(e.target.value)} value={text} />
                                                    <button className='dragDropElement-editForm-submit' onClick={() => props.changeTask(item.id, text)}>Изменить</button>
                                                </div>
                                                :
                                                <span>{item.text}</span>
                                            }

                                        <div className="dragDropElement-delete" onClick={() => props.deleteTask(item.id)}></div>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default DragDropElement;