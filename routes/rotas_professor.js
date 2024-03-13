const { request, response } = require("express");
const Professor = require("../models/Professor");
const controle_create = require("../control/professor.create");
const controle_read = require("../control/professor.read");
const controle_update = require("../control/professor.update");
const controle_delete = require("../control/professor.delete");

module.exports = function (app, banco) {
  app.post("/professor", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/professor", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/professor/:registro", (request, response) => {
    controle_update(request, response, banco);
  });
  app.delete("/professor/:registro", (request, response) => {
    controle_delete(request, response, banco);
  });
};
