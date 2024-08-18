const Aluno = require("../../models/Aluno");
const JWT = require("../../models/JWT");

module.exports = function (request, response, banco) {
  const email = request.body.email;
  const senha = request.body.senha;

  const aluno = new Aluno(banco);
  aluno._email = email;
  aluno._senha = senha;

  aluno
    .login()
    .then((resposta) => {
      if (resposta.status == true) {
        const jwt = new JWT();
        const token = jwt.gerar(resposta.dados);
        const resposta2 = {
          status: true,
          matricula: resposta.dados.matricula,
          nome: resposta.dados.nome,
          email: resposta.dados.email,
          token: token,
        };
        response.status(200).send(resposta2);
      } else {
        const resposta2 = {
          status: false,
          msg: "Login inválido",
        };
        response.status(200).send(resposta2);
      }
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send("Erro no servidor");
    });
};
