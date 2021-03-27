const mongoApi = require("../mongoApi");

module.exports.userGet = (request, response) => {
  mongoApi.find("users").then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.userAdd = (request, response) => {
  mongoApi.findOne("users", request.body).then((res) => {
    if (!res) {
      mongoApi
        .insertOne("users", request.body)
        .then((res) => {
          response.send(JSON.stringify(res));
        });
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'not added, user already exists'};
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.userUpdate = (request, response) => {
  mongoApi.updateOne("users", request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'element not update user'};
      response.send(JSON.stringify(answer));
    }

  });
};

module.exports.userDelete = (request, response) => {
  mongoApi.deleteOne("users", request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'not delete user'};
      response.send(JSON.stringify(answer));
    }
    
  });
};
