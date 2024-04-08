const Trabalho = require("../../models/Trabalho");

module.exports = function (request, response, banco) {
  console.log("PUT: /trabalho");
  const p_nomeTrabalho = request.body.nomeTrabalho;
  const p_idTrabalho = request.params.idTrabalho;
  const p_resumo = request.body.resumo;
  const p_Curso_idCurso = request.body.Curso_idCurso;

  if (p_nomeTrabalho === "" || p_resumo === "" || p_Curso_idCurso === "") {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const trabalho = new Trabalho(banco);
    trabalho._idTrabalho = p_idTrabalho;
    trabalho._nomeTrabalho = p_nomeTrabalho;
    trabalho._resumo = p_resumo;
    trabalho._Curso_idCurso = p_Curso_idCurso;

    trabalho
      .update()
      .then(() => {
        const resposta = {
          status: true,
          msg: "Atualizado com sucesso!!",
          codigo: "002",
          dados: {
            idTrabalho: p_idTrabalho,
            nomeTrabalho: p_nomeTrabalho,
            resumo: p_resumo,
            Curso_idCurso: p_Curso_idCurso,
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
