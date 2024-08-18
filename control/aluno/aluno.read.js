const Aluno = require("../../models/Aluno");
const JWT = require("../../models/JWT");
module.exports = function (request, response, banco) {
  const aluno = new Aluno(banco);
  const auth = request.headers.authorization;
  console.log(auth);
  const jwt = new JWT();
  const validou = jwt.validar(auth);
  if (validou.status == true) {
    aluno
      .read()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Sucesso!! :D",
          codigo: "002",
          dados: respostaPromise,
          token: jwt.gerar(validou.payload),
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "Erro ao ler! :(",
          codigo: "003",
          dados: {},
        };
        response.status(200).send(resposta);
      });
  }
};
