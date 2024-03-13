const Professor = require("../models/Professor");
module.exports = function (request, response, banco) {
  console.log("POST: /professor");
  const p_nome = request.body.nome;
  const p_email = request.body.email;
  const p_senha = request.body.senha;

  if (p_nome == "" || p_email == "" || p_senha == "") {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const professor = new Professor(banco);
    professor._nome = p_nome;
    professor._email = p_email;
    professor._senha = p_senha;
    professor
      .create()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Cadastrado com sucesso!!",
          codigo: "002",
          dados: {
            idCurso: respostaPromise.insertId,
            nome: p_nome,
            email: p_email,
            senha: p_senha,
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "Erro ao cadastrar!",
          codigo: "003",
          dados: {},
        };
        response.status(200).send(resposta);
      });
  }
};
