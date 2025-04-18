const { request, response } = require("express");
const Aluno = require("../models/Aluno");
const controle_create = require("../control/aluno/aluno.create");
const controle_read = require("../control/aluno/aluno.read");
const controle_update = require("../control/aluno/aluno.update");
const controle_delete = require("../control/aluno/aluno.delete");
const controleAluno_Login = require("../control/aluno/controleAluno_Login");

module.exports = function (app, banco) {
  /*######################################################################################################*/
  app.post("/aluno", (request, response) => {
    controle_create(request, response, banco);
  });
  /*######################################################################################################*/
  app.get("/aluno", (request, response) => {
    controle_read(request, response, banco);
  });
  /*######################################################################################################*/
  app.put("/aluno/:matricula", (request, response) => {
    console.log(`PUT: /aluno/${request.params.matricula}`);
    controle_update(request, response, banco);
  });
  /*######################################################################################################*/
  app.delete("/aluno/:matricula", (request, response) => {
    controle_delete(request, response, banco);
    const p_matricula = request.params.matricula;
    console.log(`DELETE: /aluno/${p_matricula}`);
  });
  /*######################################################################################################*/
  app.delete("/aluno", (request, response) => {
    const sql = "DELETE FROM Aluno";
    banco.query(sql, (err, result) => {
      if (err) {
        console.error("Erro ao deletar todos os alunos!!:", err);
        response.status(500).send("Erro ao deletar todos os alunos!!.");
      } else {
        console.log("Todos os alunos foram deletados >:).");
        response.status(200).send("Todos os alunos foram deletados. >:)");
      }
    });
  });
  /*######################################################################################################*/
  app.post("/login_aluno", (request, response) => {
    controleAluno_Login(request, response, banco);
  });
  /*######################################################################################################*/
  app.get("/alunos", async (request, response) => {
    try {
      const alunoModel = new Aluno(banco);
      const alunos = await alunoModel.read();
      response.json(alunos);
    } catch (error) {
      console.error("Erro ao obter alunos:", error);
      response.status(500).json({ error: "Erro ao obter alunos" });
    }
  });
  /*######################################################################################################*/
  app.get("aluno/:matricula", (request, response) => {});
};
