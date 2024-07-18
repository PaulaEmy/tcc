const Professor = require("../../models/Professor");
const JWT = require("../../models/JWT");

module.exports = function (request, response, banco) {
  const email = request.body.email;
  const senha = request.body.senha;

  const professor = new Professor(banco);
  professor.email = email;
  professor.senha = senha;

  professor
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
