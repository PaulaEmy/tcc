const Trabalho = require("../../models/Trabalho");
const Curso = require("../../models/Cursos");
const Professor = require("../../models/Professor");

module.exports = async function (request, response, banco) {
  console.log(`PUT: /trabalho/${request.params.idTrabalho}`);

  const p_idTrabalho = request.params.idTrabalho;
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
    trabalho.idTrabalho = p_idTrabalho;
    trabalho.nomeTrabalho = p_nomeTrabalho;
    trabalho.resumo = p_resumo;
    trabalho.curso = { idCurso: idCurso, nomeCurso: p_nomeCurso };
    trabalho.professor = { registro: registro, nome: p_nomeProfessor };

    const respostaPromise = await trabalho.update();

    const resposta = {
      status: true,
      msg: "Atualizado com sucesso!!",
      codigo: "004",
      dados: {
        idTrabalho: p_idTrabalho,
        nomeTrabalho: p_nomeTrabalho,
        resumo: p_resumo,
        curso: idCurso,
        professor: registro,
      },
    };
    response.status(200).send(resposta);
  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
    const resposta = {
      status: false,
      msg: "Erro ao atualizar!",
      codigo: "005",
      dados: {},
    };
    response.status(500).send(resposta);
  }
};
