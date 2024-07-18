const Professor = require("../../models/Professor");
const JWT = require("../../models/JWT");

module.exports = function (request, response, banco) {
  console.log("GET: /professor");

  const auth = request.headers.authorization;
  if (!auth) {
    const resposta = {
      status: false,
      msg: "Authorization header is missing!",
      codigo: "003",
      dados: {},
    };
    response.status(200).send(resposta);
    return;
  }

  console.log(auth);
  const jwt = new JWT();
  const validou = jwt.validar(auth);
  if (validou.status == true) {
    const professor = new Professor(banco);

    professor
      .read()
      .then((respostaPromise) => {
        const resposta = {
          status: true,
          msg: "Sucesso",
          codigo: "002",
          dados: respostaPromise,
          token: jwt.gerar(validou.payload),
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
  } else {
    const resposta = {
      status: false,
      msg: "token invalido!",
      codigo: "003",
      dados: {},
    };
    response.status(200).send(resposta);
    return;
  }
};
