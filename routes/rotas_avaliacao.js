const { request, response } = require("express");
const Avaliacao = require("../models/Avaliacao");
const controle_create = require("../control/avaliacao/avaliacao.create");
const controle_read = require("../control/avaliacao/avaliacao.read");
const controle_update = require("../control/avaliacao/avaliacao.update");
const controle_delete = require("../control/avaliacao/avaliacao.delete");

module.exports = function (app, banco) {
  app.post("/avaliacao", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/avaliacao", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/avaliacao/:idAvaliacao", (request, response) => {
    controle_update(request, response, banco);
  });
  app.delete("/avaliacao/:idAvaliacao", (request, response) => {
    controle_delete(request, response, banco);
  });
};
