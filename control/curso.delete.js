const Curso = require("../models/Cursos");
module.exports = function (request, response, banco) {
  console.log("DELETE: /cursos");

  const p_idCurso = request.params.idCurso;

  const curso = new Curso(banco);
  curso._idCurso = p_idCurso;
  curso
    .delete()
    .then((respostaPromise) => {
      const resposta = {
        status: false,
        msg: "Deletado com sucesso!!",
        codigo: "004",
        dados: {
          idCurso: p_idCurso,
        },
      };
      response.status(200).send(resposta);
    })
    .catch((erro) => {
      const resposta = {
        status: false,
        msg: "Erro ao deletar!",
        codigo: "003",
        dados: {},
      };
      response.status(200).send(resposta);
    });
};
