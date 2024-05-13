const { request, response } = require("express");
const Curso = require("../models/Cursos");
const controle_create = require("../control/curso/curso.create");
const controle_read = require("../control/curso/curso.read");
const controle_update = require("../control/curso/curso.update");
const controle_delete = require("../control/curso/curso.delete");

module.exports = function (app, banco) {
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
