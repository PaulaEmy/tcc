const Curso = require("../../models/Cursos");
module.exports = function (request, response, banco) {
  console.log("PUT: /cursos");

  const p_nomeCurso = request.body.nomeCurso;
  const p_idCurso = request.params.idCurso;

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
    curso._idCurso = p_idCurso;
    curso
      .update()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Atualizado com sucesso!!",
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
          msg: "Erro ao atualizar!",
          codigo: "003",
          dados: {},
        };
        response.status(200).send(resposta);
      });
  }
};
