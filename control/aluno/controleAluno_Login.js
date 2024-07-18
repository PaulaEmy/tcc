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
        const token = jwt.gerar(resposta.dados); // Captura o token gerado
        response.status(200).send(token); // Envia o token na resposta
      } else {
        response.status(200).send("login invalido");
      }
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send("Erro no servidor");
    });
};
