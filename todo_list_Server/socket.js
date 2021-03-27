var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3001;

module.exports.initSocket = () => {
  server.listen(port, () => {
    console.log('----------------------------------------------Server----------------------------------------------------------');
    console.log("Server socket listening at port %d", port);
  });

  app.use(express.static(path.join(__dirname, "public")));

  var numUsers = 0;
  var todoList = []; // instead of an array, there can be any database

  io.on("connection", (socket) => {
    var addedUser = false;

    socket.on("addUser", (username) => {
      console.log("username", username);
      if (addedUser) return;

      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit("login", todoList);

      io.sockets.emit("userConnect", {
        username: socket.username,
        numUsers: numUsers,
      });
    });

    socket.on("updateTask", (data) => {
      todoList = data;
      io.sockets.emit("tasksList", todoList);
    });

    socket.on("createTask", (data) => {
      todoList.push(data);
      io.sockets.emit("tasksList", todoList);
    });

    socket.on("deleteTask", function (id) {
      todoList = todoList.filter((el) => el.id !== id);

      io.sockets.emit("tasksList", todoList);
    });

    socket.on("beingEdited", (id) => {
      todoList.find(
        (el, index) =>
          el.id === id &&
          (todoList[index].isBeingEdited = {
            status: !todoList[index].isBeingEdited.status,
            user: socket.username,
          })
      );

      io.sockets.emit("tasksList", todoList);
    });

    socket.on("stopBeingEdited", (id) => {
      todoList.find(
        (el, index) =>
          el.id === id &&
          (todoList[index].isBeingEdited = {
            status: !todoList[index].isBeingEdited.status,
            user: "",
          })
      );

      io.sockets.emit("tasksList", todoList);
    });

    socket.on("disconnect", () => {
      console.log("disconnect", numUsers);

      if (addedUser) {
        --numUsers;

        io.sockets.emit("userLeft", {
          username: socket.username,
          numUsers: numUsers,
        });
      }
    });
  });
};
