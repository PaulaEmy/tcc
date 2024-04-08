const Curso = require("../../models/Cursos");
module.exports = function (request, response, banco) {
  console.log("GET: /cursos");

  const curso = new Curso(banco);

  curso
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
