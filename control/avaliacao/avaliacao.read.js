const Avaliacao = require("../../models/Avaliacao");
module.exports = function (request, response, banco) {
  console.log("GET: /avaliacao");

  const avaliacao = new Avaliacao(banco);

  avaliacao
    .read()
    .then((respostaPromise) => {
      const resposta = {
        status: false,
        msg: "Sucesso",
        codigo: "002",
        dados: respostaPromise,
      };
      response.status(200).send(resposta);
    })
    .catch((erro) => {
      const resposta = {
        status: false,
        msg: "Erro ao ler!",
        codigo: "003",
        dados: {},
      };
      response.status(200).send(resposta);
    });
};
