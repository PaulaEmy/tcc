const { request, response } = require("express");
const AlunoGrupo = require("../models/AlunoGrupo");
const controle_create = require("../control/aluno/aluno.create");
const controle_read = require("../control/aluno/aluno.read");
const controle_update = require("../control/aluno/aluno.update");
const controle_delete = require("../control/aluno/aluno.delete");

module.exports = function (app, banco) {
  app.post("/aluno", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/aluno", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/aluno/:matricula", (request, response) => {
    controle_update(request, response, banco);
  });
  app.delete("/aluno/:matricula", (request, response) => {
    controle_delete(request, response, banco);
  });
};
