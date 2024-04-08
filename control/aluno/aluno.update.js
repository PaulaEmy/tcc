const AlunoGrupo = require("../../models/AlunoGrupo");

module.exports = function (request, response, banco) {
  console.log("PUT: /aluno");
  const p_nomeAluno = request.body.nomeAluno;
  const p_matricula = request.params.matricula;
  const p_turma_idTurma = request.body.turma_idTurma;
  const p_trabalho_idTrabalho = request.body.trabalho_idTrabalho;

  if (
    p_nomeAluno === "" ||
    p_matricula === "" ||
    p_turma_idTurma === "" ||
    p_trabalho_idTrabalho === ""
  ) {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const alunogrupo = new AlunoGrupo(banco);
    alunogrupo._nomeAluno = p_nomeAluno;
    alunogrupo._matricula = p_matricula;
    alunogrupo._turma_idTurma = p_turma_idTurma;
    alunogrupo._trabalho_idTrabalho = p_trabalho_idTrabalho;

    alunogrupo
      .update()
      .then(() => {
        const resposta = {
          status: true,
          msg: "Atualizado com sucesso!!",
          codigo: "002",
          dados: {
            nomeAluno: p_nomeAluno,
            matricula: p_matricula,
            turma_idTurma: p_turma_idTurma,
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
