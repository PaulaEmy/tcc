const Aluno = require("../../models/Aluno");
const Curso = require("../../models/Cursos");
const Turma = require("../../models/Turma");

module.exports = async function (request, response, banco) {
  console.log("PUT: /aluno");
  const p_matricula = request.params.matricula;
  const p_nome = request.body.nomeAluno;
  const p_email = request.body.email;
  const p_nascimento = request.body.nascimento;
  const p_turma_nome = request.body.nomeTurma;
  const p_curso_nome = request.body.nomeCurso;

  console.log("Dados recebidos:");
  console.log("Nome:", p_nome);
  console.log("Matrícula:", p_matricula);
  console.log("Email:", p_email);
  console.log("Nascimento:", p_nascimento);
  console.log("Nome da Turma:", p_turma_nome);
  console.log("Nome do Curso:", p_curso_nome);

  if (
    !p_nome ||
    !p_matricula ||
    !p_email ||
    !p_nascimento ||
    !p_turma_nome ||
    !p_curso_nome
  ) {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(400).send(resposta);
  } else {
    try {
      const objTurma = new Turma(banco);
      const objCurso = new Curso(banco);
      const idTurma = await objTurma.obterIdTurmaPorNome(p_turma_nome);
      const idCurso = await objCurso.obterIdCursoPorNome(p_curso_nome);

      if (idTurma === null || idCurso === null) {
        const resposta = {
          status: false,
          msg: "Turma ou Curso não encontrado",
          codigo: "004",
          dados: {},
        };
        response.status(404).send(resposta);
        return;
      }

      console.log("ID da turma:", idTurma);
      console.log("ID do curso:", idCurso);

      const aluno = new Aluno(banco);
      aluno._nome = p_nome;
      aluno._matricula = p_matricula;
      aluno._email = p_email;
      aluno._nascimento = p_nascimento;
      aluno._idTurma = idTurma;
      aluno._idCurso = idCurso;

      await aluno.update();

      const resposta = {
        status: true,
        msg: "Atualizado com sucesso!!",
        codigo: "002",
        dados: {
          nome: p_nome,
          matricula: p_matricula,
          email: p_email,
          nascimento: p_nascimento,
          turma_idTurma: idTurma,
          curso_idCurso: idCurso,
        },
      };
      response.status(200).send(resposta);
    } catch (erro) {
      console.log(erro);
      const resposta = {
        status: false,
        msg: "Erro ao atualizar!",
        codigo: "003",
        dados: {},
      };
      response.status(500).send(resposta);
    }
  }
};
