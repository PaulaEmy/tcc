const { request, response } = require("express");
const Avaliacao = require("../models/Avaliacao");
const controle_create = require("../control/avaliacao/avaliacao.create");
const controle_read = require("../control/avaliacao/avaliacao.read");
const controle_update = require("../control/avaliacao/avaliacao.update");
const controle_delete = require("../control/avaliacao/avaliacao.delete");
const jwt = require("jsonwebtoken");

// Função para decodificar o JWT
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString("binary")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

module.exports = function (app, banco) {
  app.post("/avaliacao", (request, response) => {
    controle_create(request, response, banco);
  });
  app.get("/avaliacao", (request, response) => {
    controle_read(request, response, banco);
  });
  app.put("/avaliacao/:idAvaliacao", (request, response) => {
    const { idAvaliacao } = request.params;
    const {
      nomeTrabalho,
      apresentacao,
      relevancia,
      conhecimento,
      melhorTrabalho,
      obs,
    } = request.body;

    const sql =
      "UPDATE Avaliacao SET nomeTrabalho = ?, apresentacao = ?, relevancia = ?, conhecimento = ?, melhorTrabalho = ?, obs = ? WHERE idAvaliacao = ?";
    const values = [
      nomeTrabalho,
      apresentacao,
      relevancia,
      conhecimento,
      melhorTrabalho,
      obs,
      idAvaliacao,
    ];

    banco.run(sql, values, function (err) {
      if (err) {
        console.error(err.message);
        response.status(500).send("Erro ao atualizar avaliação.");
      } else {
        response.status(200).send("Avaliação atualizada com sucesso.");
      }
    });
  });
  app.delete("/avaliacao/:idAvaliacao", (request, response) => {
    const { idAvaliacao } = request.params;
    const sql = "DELETE FROM Avaliacao WHERE idAvaliacao = ?";

    banco.run(sql, [idAvaliacao], function (err) {
      if (err) {
        console.error(err.message);
        response.status(500).send("Erro ao deletar avaliação.");
      } else {
        response.status(200).send("Avaliação deletada com sucesso.");
      }
    });
  });
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
};
