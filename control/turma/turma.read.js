const Turma = require("../../models/Turma");
module.exports = function (request, response, banco) {
  console.log("GET: /turmas");

  const turma = new Turma(banco);

  turma
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
