const Aluno = require("../../models/Aluno");
const Turma = require("../../models/Turma");
const Curso = require("../../models/Cursos");
const JWT = require("../../models/JWT");

module.exports = async function (request, response, banco) {
  const auth = request.headers.authorization;
  console.log(auth);
  const jwt = new JWT();
  const validou = jwt.validar(auth);
  if (validou.status == true) {
    const p_matricula = request.body.matricula;
    const p_nome = request.body.nome;
    const p_email = request.body.email;
    const p_senha = request.body.senha;
    const p_nascimento = request.body.nascimento;
    const p_turma_nome = request.body.nomeTurma;
    const p_curso_nome = request.body.nomeCurso;

    if (
      p_nome == "" ||
      p_email == "" ||
      p_senha == "" ||
      p_nascimento == "" ||
      p_turma_nome == "" ||
      p_matricula == "" ||
      p_curso_nome == ""
    ) {
      const resposta = {
        status: false,
        msg: "Por favor preencha todos os campos!!",
        codigo: "001",
        dados: {},
      };
      response.status(200).send(resposta);
      return;
    }

    // Obtendo o ID da turma pelo nome
    try {
      const turma = new Turma(banco);
      const idTurma = await turma.obterIdTurmaPorNome(p_turma_nome);

      const curso = new Curso(banco);
      const idCurso = await curso.obterIdCursoPorNome(p_curso_nome);

      console.log(idTurma);
      if (!idTurma) {
        throw new Error("Turma não encontrada :(");
      }

      if (!idCurso) {
        throw new Error("Curso não encontrada :(");
      }
      // Criando objeto Aluno com os IDs da turma e do curso obtidos
      const aluno = new Aluno(banco);
      aluno._matricula = p_matricula;
      aluno._nome = p_nome;
      aluno._email = p_email;
      aluno._senha = p_senha;
      aluno._nascimento = p_nascimento;
      aluno._turma.idTurma = idTurma;
      aluno._curso.idCurso = idCurso;

      // Criando o aluno no banco de dados
      const respostaPromise = await aluno.create();

      const resposta = {
        status: true,
        msg: "Cadastrado com sucesso!!",
        codigo: "002",
        dados: {
          matricula: p_matricula,
          nome: p_nome,
          email: p_email,
          nascimento: p_nascimento,
          senha: p_senha,
          turma: idTurma,
          curso: idCurso,
        },
      };
      response.status(200).send(resposta);
    } catch (erro) {
      const resposta = {
        status: false,
        msg: "Erro ao cadastrar!",
        codigo: "003",
        dados: {},
      };
      console.log(erro);
      response.status(200).send(resposta);
    }
  }
};
