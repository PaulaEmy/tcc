const AlunoGrupo = require("../../models/AlunoGrupo");

module.exports = function (request, response, banco) {
  console.log("PUT: /aluno_grupo");
  const p_matricula = request.params.aluno_matricula;
  const p_trabalho_idTrabalho = request.body.trabalho_idTrabalho;

  if (p_matricula === "" || p_trabalho_idTrabalho === "") {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const alunogrupo = new AlunoGrupo(banco);
    alunogrupo._aluno_matricula = p_matricula;
    alunogrupo._trabalho_idTrabalho = p_trabalho_idTrabalho;

    alunogrupo
      .update()
      .then(() => {
        const resposta = {
          status: true,
          msg: "Atualizado com sucesso!!",
          codigo: "002",
          dados: {
            matricula: p_matricula,
            trabalho_idTrabalho: p_trabalho_idTrabalho,
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
