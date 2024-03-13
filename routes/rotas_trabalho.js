const { request, response } = require("express");
const Trabalho = require("../models/Trabalho");
const controle_create = require("../control/trabalho.create");
const controle_read = require("../control/trabalho.read");
const controle_update = require("../control/trabalho.update");
const controle_delete = require("../control/trabalho.delete");

module.exports = function (app, banco) {
  app.post("/trabalho", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/trabalho", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/trabalho/:idTrabalho", (request, response) => {
    controle_update(request, response, banco);
  });
  app.delete("/trabalho/:idTrabalho", (request, response) => {
    controle_delete(request, response, banco);
  });
};
