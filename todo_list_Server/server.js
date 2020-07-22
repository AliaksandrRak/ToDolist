
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});


app.use(express.static(path.join(__dirname, 'public')));


var numUsers = 0;
var todoList = [];

io.on('connection', (socket) => {
  var addedUser = false;

  socket.on('add user', (username) => {
    console.log("username", username);
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', todoList);

    io.sockets.emit('user connect', {
      username: socket.username,
      numUsers: numUsers
    });

  });

  socket.on('update task', (data) => {

    todoList = data;
    socket.broadcast.emit('tasks list',  todoList);

  });

  socket.on('create task', (data) => {

    todoList.push(data);
    socket.broadcast.emit('tasks list',  todoList);

  });

  socket.on('delete task', function (id) {

    todoList = todoList.filter(el => el.id !== id);

    io.sockets.emit('tasks list',  todoList);

  });

  socket.on('being edited', (id) => {

    todoList.find((el, index) => el.id === id && 
    (todoList[index].isBeingEdited = { status: !todoList[index].isBeingEdited.status, user: socket.username }));

    io.sockets.emit('tasks list',  todoList);

  });

  socket.on('stop being edited', (id) => {

    todoList.find((el, index) => el.id === id && 
    (todoList[index].isBeingEdited = { status: !todoList[index].isBeingEdited.status, user: '' }));

    io.sockets.emit('tasks list',  todoList);

  });

  socket.on('disconnect', () => {
    console.log("disconnect", numUsers);

    if (addedUser) {
      --numUsers;

      io.sockets.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });

    }

  });

});