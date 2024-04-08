const Trabalho = require("../../models/Trabalho");
module.exports = function (request, response, banco) {
  console.log("DELETE: /trabalho");

  const p_idTrabalho = request.params.idTrabalho;

  const trabalho = new Trabalho(banco);
  trabalho._idTrabalho = p_idTrabalho;
  trabalho
    .delete()
    .then((respostaPromise) => {
      const resposta = {
        status: false,
        msg: "Deletado com sucesso!!",
        codigo: "004",
        dados: {
          idTrabalho: p_idTrabalho,
          respostaPromise,
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
