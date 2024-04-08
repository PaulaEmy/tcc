const Curso = require("../../models/Cursos");
module.exports = function (request, response, banco) {
  console.log("POST: /cursos");

  const p_nomeCurso = request.body.nomeCurso;

  if (p_nomeCurso == "") {
    const resposta = {
      status: false,
      msg: "O nome do curso não pode ser vazio!!",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const curso = new Curso(banco);
    curso._nomeCurso = p_nomeCurso;
    curso
      .create()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Cadastrado com sucesso!!",
          codigo: "002",
          dados: {
            idCurso: respostaPromise.insertId,
            nomeCurso: p_nomeCurso,
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
