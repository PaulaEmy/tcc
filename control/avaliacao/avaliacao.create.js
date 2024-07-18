const Avaliacao = require("../../models/Avaliacao");
const Professor = require("../../models/Professor");
const Trabalho = require("../../models/Trabalho");
const JWT = require("../../models/JWT");

module.exports = async function (request, response, banco) {
  console.log("POST: /avaliacao");

  const p_nomeTrabalho = request.body.nomeTrabalho;
  const p_nomeProfessor = request.body.nomeProfessor;
  const p_notaApresentacao = request.body.notaApresentacao;
  const p_notaRelevancia = request.body.notaRelevancia;
  const p_notaConhecimento = request.body.notaConhecimento;
  const p_melhorTrabalho = request.body.melhorTrabalho;
  const p_obs = request.body.obs;

  try {
    const professor = new Professor(banco);
    const registro = await professor.obterRegistroPorNome(p_nomeProfessor);

    if (!registro) {
      throw new Error("Professor não encontrado");
    }

    const trabalho = new Trabalho(banco);
    const idTrabalho = await trabalho.obterRegistroPorNome(p_nomeTrabalho);

    if (!idTrabalho) {
      throw new Error("Projeto não encontrado");
    }

    const avaliacao = new Avaliacao(banco);
    avaliacao._trabalho = { idTrabalho: idTrabalho };
    avaliacao._professor = { registro: registro };

    avaliacao._notaApresentacao = p_notaApresentacao;
    avaliacao._notaRelevancia = p_notaRelevancia;
    avaliacao._notaConhecimento = p_notaConhecimento;

    const respostaPromise = await avaliacao.create();

    const resposta = {
      status: true,
      msg: "Cadastrado com sucesso!!",
      codigo: "002",
      dados: {
        nomeTrabalho: p_nomeTrabalho,
        professor: p_nomeProfessor,
        notaApresentacao: p_notaApresentacao,
        notaRelevancia: p_notaRelevancia,
        notaConhecimento: p_notaConhecimento,
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
