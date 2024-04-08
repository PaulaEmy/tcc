const AlunoGrupo = require("../../models/AlunoGrupo");
module.exports = function (request, response, banco) {
  console.log("GET: /aluno");
  const alunogrupo = new AlunoGrupo(banco);

  alunogrupo
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
