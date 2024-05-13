const { request, response } = require("express");
const AlunoGrupo = require("../models/AlunoGrupo");
const controle_create = require("../control/aluno_grupo/aluno_grupo.create");
const controle_read = require("../control/aluno_grupo/aluno_grupo.read");
const controle_update = require("../control/aluno_grupo/aluno_grupo.update");
const controle_delete = require("../control/aluno_grupo/aluno_grupo.delete");

module.exports = function (app, banco) {
  app.post("/alunogrupo", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/alunogrupo", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/alunogrupo/:aluno_matricula", (request, response) => {
    controle_update(request, response, banco);
  });
  app.delete("/alunogrupo/:aluno_matricula", (request, response) => {
    controle_delete(request, response, banco);
  });
};
