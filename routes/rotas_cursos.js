const { request, response } = require("express");
const Curso = require("../models/Cursos");
const controle_create = require("../control/curso.create");
const controle_read = require("../control/curso.read");
const controle_update = require("../control/curso.update");
const controle_delete = require("../control/curso.delete");

module.exports = function (app, banco) {
  console.log("Criando rotas /cursos");
  app.post("/cursos", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/cursos", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/cursos/:idCurso", (request, response) => {
    controle_update(request, response, banco);
  });
  app.delete("/cursos/:idCurso", (request, response) => {
    controle_delete(request, response, banco);
  });
};
