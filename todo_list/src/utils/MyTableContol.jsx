import React, { useState } from "react";
import config from "../config";
import myFetch from "../utils/myFetch";

import MyIcons from "../utils/MyIcons";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./MyTableContol.sass";


import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../utils/MyButton";
import MyTextField from "./MyTextField";

export default function MyTableContol(props) {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType('');
    setLogin('');
    setPass('');
    setHasError(false);
  };

  const clickAdd = () => {
    setModalType('add');
    handleClickOpen();
  };

  const addFetch = ()=> {
    myFetch(config.user, 'POST', {login: login, pass: pass })
    .then((res) => {
      if(res[0]?._id) {
        console.log(res);
        handleClose();
        props.getUsers();
      } else {
        console.log(res);
        setHasError(true);
      }
    });
  };

  const clickEdit = () => {
    setModalType('edit');
    setLogin(props.data[props.checking[0]].login);
    setPass(props.data[props.checking[0]].pass);
    handleClickOpen();
  };

  const editFetch = ()=> {
    myFetch(config.user, 'PUT', {
    id: props.data[props.checking[0]]._id,
    new: {login: login, pass: pass }
    })
    .then((res) => {
      if(res.n > 0) {
        console.log(res);
        handleClose();
        props.getUsers();
      } else {
        console.log(res);
        setHasError(true);
      }
    });
  };

  const clickDelete = () => {
    console.log("clickDelete");
    setModalType('delete');
    handleClickOpen();
  };

  const deleteFetch = ()=> {
    myFetch(config.user, 'DELETE', {id: props.data[props.checking[0]]._id})
    .then((res) => {
      if(res.n > 0) {
        console.log(res);
        handleClose();
        props.clearChecking();
        props.getUsers();
      } else {
        console.log(res);
      }
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className='tableContol-dialog'
      >
        <DialogTitle >
         {
           {
            'add': 'Добавление пользователя',
            'edit': 'Редактирование пользователя',
            'delete': 'Вы точно хотите удалить этого пользователя ?',
           }[modalType]
         }
        </DialogTitle>

        <DialogContent>
          {
            modalType !== 'delete' &&
            <div>
              <MyTextField 
              label={'Логин'} 
              value={login} 
              change={(e)=> {setLogin(e.target.value)}}
              isError={hasError}
               />
              <MyTextField 
              label={'Пароль'} 
              value={pass} 
              change={(e)=> {setPass(e.target.value)}} 
              isError={hasError}
              errorText={'Пользователь с таким Логином или Паролем существует'}
              />
            </div>
          }
        </DialogContent>

        <DialogActions>
        {
           {
            'add': <>
            <MyButton click={addFetch} >Создать</MyButton> 
            <MyButton click={handleClose} >Отмена</MyButton>
            </>,
            'edit': <>
            <MyButton click={editFetch} >Редактировать</MyButton>
            <MyButton click={handleClose} >Отмена</MyButton>
            </>,
            'delete': <>
            <MyButton click={deleteFetch} >Удалить</MyButton>
            <MyButton click={handleClose} >Отмена</MyButton>
            </>,
           }[modalType]
         }
        </DialogActions>
      </Dialog>
      
      <div className="tableContol">
        <div className="tableContol-chacked">
          {props.checking.length > 0 && (
            <span>{props.checking.length} Выбранно</span>
          )}
        </div>
        <div className="tableContol-content">
          <div className="tableContol-content-item">
            <MyIcons click={clickAdd}>
              <AddBoxRoundedIcon />
            </MyIcons>
          </div>
          <div className="tableContol-content-item">
            <MyIcons click={clickEdit} disabled={props.checking.length !== 1}>
              <EditRoundedIcon />
            </MyIcons>
          </div>
          <div className="tableContol-content-item">
            <MyIcons click={clickDelete} disabled={props.checking.length !== 1}>
              <DeleteRoundedIcon />
            </MyIcons>
          </div>
        </div>
      </div>
    </>
  );
}
