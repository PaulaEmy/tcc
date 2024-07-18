const { request, response } = require("express");
const Trabalho = require("../models/Trabalho");
const controle_create = require("../control/trabalho/trabalho.create");
const controle_read = require("../control/trabalho/trabalho.read");
const controle_update = require("../control/trabalho/trabalho.update");
const controle_delete = require("../control/trabalho/trabalho.delete");

module.exports = function (app, banco) {
  app.post("/trabalho", (request, response) => {
    controle_create(request, response, banco);
  });

  app.get("/trabalho", (request, response) => {
    controle_read(request, response, banco);
  });

  app.put("/trabalho/:idTrabalho", (request, response) => {
    console.log(`PUT: /trabalho/${request.params.idTrabalho}`);
    controle_update(request, response, banco);
  });
  app.delete("/trabalho/:idTrabalho", (request, response) => {
    controle_delete(request, response, banco);
    const p_idTrabalho = request.params.idTrabalho;
    console.log(`DELETE: /trabalho/${p_idTrabalho}`);
  });

  app.get("/trabalhos", async (request, response) => {
    try {
      const trabalhoModel = new Trabalho(banco);
      const trabalho = await trabalhoModel.read();
      response.json(trabalho);
    } catch (error) {
      console.error("Erro ao obter projeto:", error);
      response.status(500).json({ error: "Erro ao obter projeto" });
    }
  });

  // Nova rota para buscar ID do curso pelo nome
  app.get("/cursos", async (req, res) => {
    const nomeCurso = req.query.nome;
    const sql = "SELECT idCurso FROM curso WHERE nomeCurso = ?";
    banco.query(sql, [nomeCurso], (erro, resultados) => {
      if (erro) {
        return res.status(500).send(erro);
      }
      if (resultados.length === 0) {
        return res.status(404).send({ message: "Curso não encontrado" });
      }
      res.json(resultados[0]);
    });
  });
  app.get("/professor", async (req, res) => {
    const nome = req.query.nome;
    const sql = "SELECT registro FROM professor WHERE nome = ?";
    banco.query(sql, [nome], (erro, resultados) => {
      if (erro) {
        return res.status(500).send(erro);
      }
      if (resultados.length === 0) {
        return res.status(404).send({ message: "Professor não encontrado" });
      }
      res.json(resultados[0]);
    });
  });
};
