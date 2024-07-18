const { request, response } = require("express");
const Professor = require("../models/Professor");
const controle_create = require("../control/professor/professor.create");
const controle_read = require("../control/professor/professor.read");
const controle_update = require("../control/professor/professor.update");
const controle_delete = require("../control/professor/professor.delete");
const controle_login = require("../control/professor/controle_Login");

module.exports = function (app, banco) {
  app.post("/professor", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/professor", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/professor/:registro", (request, response) => {
    console.log(`PUT: /professor/${request.params.registro}`);
    controle_update(request, response, banco);
  });
  app.delete("/professor/:registro", (request, response) => {
    const p_registro = request.params.registro;
    controle_delete(request, response, banco);
    console.log(`DELETE: /professor/${p_registro}`);
  });
  app.post("/login", (request, response) => {
    controle_login(request, response, banco);
  });
  app.get("/professores", async (request, response) => {
    try {
      const professorModel = new Professor(banco);
      const professor = await professorModel.read();
      response.json(professor);
    } catch (error) {
      console.error("Erro ao obter professor:", error);
      response.status(500).json({ error: "Erro ao obter professor" });
    }
  });
};
