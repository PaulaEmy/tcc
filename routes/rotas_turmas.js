const { request, response } = require("express");
const Turma = require("../models/Turma");
const controle_create = require("../control/turma/turma.create");
const controle_read = require("../control/turma/turma.read");
const controle_update = require("../control/turma/turma.update");
const controle_delete = require("../control/turma/turma.delete");

module.exports = function (app, banco) {
  /*######################################################################################################*/
  app.post("/turma", (request, response) => {
    controle_create(request, response, banco);
  });
  /*######################################################################################################*/
  app.get("/turma", (request, response) => {
    controle_read(request, response, banco);
  });
  /*######################################################################################################*/
  app.put("/turma/:idturma", (request, response) => {
    controle_update(request, response, banco);
  });
  /*######################################################################################################*/
  app.delete("/turma/:idturma", (request, response) => {
    controle_delete(request, response, banco);
  });
  /*######################################################################################################*/
};
