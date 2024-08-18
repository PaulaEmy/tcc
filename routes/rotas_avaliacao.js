const { request, response } = require("express");
const Avaliacao = require("../models/Avaliacao");
const controle_create = require("../control/avaliacao/avaliacao.create");
const controle_read = require("../control/avaliacao/avaliacao.read");
const controle_update = require("../control/avaliacao/avaliacao.update");
const controle_delete = require("../control/avaliacao/avaliacao.delete");
const jwt = require("jsonwebtoken");

module.exports = function (app, banco) {
  /*######################################################################################################*/
  app.get("/avaliacoes", async (request, response) => {
    try {
      const avaliacaoModel = new Avaliacao(banco);
      const avaliacao = await avaliacaoModel.read();
      response.json(avaliacao);
    } catch (error) {
      console.error("Erro ao obter avaliação:", error);
      response.status(500).json({ error: "Erro ao obter avaliação" });
    }
  });
  /*######################################################################################################*/
  app.post("/avaliacao", (request, response) => {
    controle_create(request, response, banco);
  });
  /*######################################################################################################*/
  app.get("/avaliacao", (request, response) => {
    controle_read(request, response, banco);
  });
  /*######################################################################################################*/
  app.put("/avaliacao/:idAvaliacao", (request, response) => {
    console.log(`PUT: /avaliacao/${request.params.idAvaliacao}`);
    controle_update(request, response, banco);
  });
  /*######################################################################################################*/
  app.delete("/avaliacao", (request, response) => {
    const sql = "DELETE FROM Avaliacao";
    banco.query(sql, (err, result) => {
      if (err) {
        console.error("Erro ao deletar todas as avaliações:", err);
        response.status(500).send("Erro ao deletar todas as avaliações.");
      } else {
        console.log("Todas as avaliações foram deletadas.");
        response.status(200).send("Todas as avaliações foram deletadas.");
      }
    });
  });
  /*######################################################################################################*/
  app.delete("/avaliacao/:idAvaliacao", (request, response) => {
    controle_delete(request, response, banco);
    const p_idAvaliacao = request.params.idAvaliacao;
    console.log(`DELETE: /avaliacao/${p_idAvaliacao}`);
  });
  /*######################################################################################################*/
  app.get("/avaliacao", (request, response) => {
    const sql = "SELECT * FROM Avaliacao";
    banco.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        response.status(500).send("Erro ao buscar avaliações.");
      } else {
        response.json(rows);
      }
    });
  });
  /*######################################################################################################*/
  app.get("/trabalho", async (req, res) => {
    const nomeTrabalho = req.query.nomeTrabalho;
    const sql = "SELECT idTrabalho FROM trabalho WHERE nomeTrabalho = ?";
    banco.query(sql, [nomeTrabalho], (erro, resultados) => {
      if (erro) {
        return res.status(500).send(erro);
      }
      if (resultados.length === 0) {
        return res.status(404).send({ message: "Trabalho não encontrado" });
      }
      res.json(resultados[0]);
    });
  });
  /*######################################################################################################*/
};
