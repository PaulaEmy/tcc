const Avaliacao = require("../../models/Avaliacao");
module.exports = function (request, response, banco) {

  const p_idAvaliacao = request.params.idAvaliacao;

  const avaliacao = new Avaliacao(banco);
  avaliacao._idAvaliacao = p_idAvaliacao;
  avaliacao
    .delete()
    .then((respostaPromise) => {
      const resposta = {
        status: false,
        msg: "Deletado com sucesso!!",
        codigo: "004",
        dados: {
          idAvaliacao: p_idAvaliacao,
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
