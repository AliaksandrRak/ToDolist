var express = require("express");
var app = express();
const bodyParser = require("body-parser");

// const config = require("./config");
const socket = require("./socket");
const auth = require("./endPoints/auth");
const user = require("./endPoints/user");

var port = process.env.PORT || 3002;

const jsonParser = bodyParser.json();

auth.creatAdmin();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

app.post("/login", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log('--------------------------------------------------login------------------------------------------------------');
    console.log("/login", request.body);
    auth.login(request, response);
});

app.get("/user", jsonParser, function (request, response) {
    console.log('-----------------------------------------------/user---------------------------------------------------------');
    console.log("/user/get");
    user.userGet(request, response);
});

app.post("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log('-----------------------------------------------/user---------------------------------------------------------');
    console.log("/user/add", request.body);
    user.userAdd(request, response);
});

app.put("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log('-----------------------------------------------/user---------------------------------------------------------');
    console.log("/user/update", request.body);
    user.userUpdate(request, response);
});

app.delete("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log('-----------------------------------------------/user---------------------------------------------------------');
    console.log("/user/delete", request.body);
    user.userDelete(request, response);
});

socket.initSocket();

app.listen(port, () => {
  console.log("Server endpoints listening at port %d", port);
  console.log('----------------------------------------------Server----------------------------------------------------------');
});


