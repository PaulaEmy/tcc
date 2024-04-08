const Turma = require("../../models/Turma");
module.exports = function (request, response, banco) {
  console.log("DELETE: /turmas");

  const p_idTurma = request.params.idturma;

  const turma = new Turma(banco);
  turma._idturma = p_idTurma;
  turma
    .delete()
    .then((respostaPromise) => {
      const resposta = {
        status: false,
        msg: "Deletado com sucesso!!",
        codigo: "004",
        dados: {
          idturma: p_idTurma,
        },
      };
      response.status(200).send(resposta);
    })
    .catch((erro) => {
      const resposta = {
        status: false,
        msg: "Erro ao deletar!",
        codigo: "003",
        dados: {},
      };
      response.status(200).send(resposta);
    });
};
