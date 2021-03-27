const mongoApi = require("../mongoApi");

module.exports.login = (request, response) => {
  mongoApi.findOne("users", request.body).then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.creatAdmin = () => {
  mongoApi.findOne("users", { login: "admin", pass: "admin" }).then((res) => {
    if (!res) {
      mongoApi
        .insertOne("users", { login: "admin", pass: "admin" })
        .then((res) => {
          console.log("creatAdmin", JSON.stringify(res));
        });
    }
  });
};
