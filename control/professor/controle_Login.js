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
        const resposta2 = {
          status: true,
          registro: resposta.dados.registro,
          nome: resposta.dados.nome,
          email: resposta.dados.email,
          token: token,
        };
        response.status(200).send(resposta2); // Envia o token na resposta
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
