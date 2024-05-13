const Aluno = require("../../models/Aluno");

module.exports = function (request, response, banco) {
  console.log("PUT: /aluno");
  const p_nome = request.body.nomeAluno;
  const p_matricula = request.params.matricula;
  const p_email = request.body.email;
  const p_senha = request.body.senha;
  const p_turma = request.body.turma_idTurma;
  const p_curso = request.body.curso_idCurso;

  if (
    p_nome === "" ||
    p_matricula === "" ||
    p_email === "" ||
    p_senha == "" ||
    p_turma == "" ||
    p_curso == ""
  ) {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const aluno = new Aluno(banco);
    aluno._nome = p_nome;
    aluno._matricula = p_matricula;
    aluno._email = p_email;
    aluno._senha = p_senha;
    aluno._turma = p_turma_idTurma;
    aluno._curso = p_curso_idCurso;

    aluno
      .update()
      .then(() => {
        const resposta = {
          status: true,
          msg: "Atualizado com sucesso!!",
          codigo: "002",
          dados: {
            nome: p_nome,
            matricula: p_matricula,
            turma_idTurma: p_turma_idTurma,
            email: p_email,
            senha: p_senha,
            turma: p_turma,
            curso: p_curso,
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
