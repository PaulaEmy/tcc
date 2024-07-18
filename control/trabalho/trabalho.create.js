const Trabalho = require("../../models/Trabalho");
const Curso = require("../../models/Cursos");
const Professor = require("../../models/Professor");
const JWT = require("../../models/JWT");

module.exports = async function (request, response, banco) {
  console.log("POST: /trabalho");

  const p_nomeTrabalho = request.body.nomeTrabalho;
  const p_resumo = request.body.resumo;
  const p_nomeCurso = request.body.nomeCurso;
  const p_nomeProfessor = request.body.nomeProfessor;

  try {
    const professor = new Professor(banco);
    const registro = await professor.obterRegistroPorNome(p_nomeProfessor);

    const curso = new Curso(banco);
    const idCurso = await curso.obterIdCursoPorNome(p_nomeCurso);

    if (!idCurso) {
      throw new Error("Curso não encontrado");
    }

    if (!registro) {
      throw new Error("Professor não encontrado");
    }

    const trabalho = new Trabalho(banco);
    trabalho._nomeTrabalho = p_nomeTrabalho;
    trabalho._resumo = p_resumo;
    trabalho._curso = { idCurso: idCurso };
    trabalho._professor = { registro: registro };

    const respostaPromise = await trabalho.create();

    const resposta = {
      status: true,
      msg: "Cadastrado com sucesso!!",
      codigo: "002",
      dados: {
        nomeTrabalho: p_nomeTrabalho,
        resumo: p_resumo,
        curso: idCurso,
        professor: registro,
      },
    };
    response.status(200).send(resposta);
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    const resposta = {
      status: false,
      msg: "Erro ao cadastrar!",
      codigo: "003",
      dados: {},
    };
    response.status(500).send(resposta);
  }
};
