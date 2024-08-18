const Avaliacao = require("../../models/Avaliacao");

module.exports = async function (request, response, banco) {

  const p_idTrabalho = request.body.idTrabalho;
  const p_professorRegistro = request.body.REGISTRO;
  const p_notaApresentacao = request.body.notaApresentacao;
  const p_notaRelevancia = request.body.notaRelevancia;
  const p_notaConhecimento = request.body.notaConhecimento;
  const p_melhorTrabalho = request.body.melhorTrabalho;
  const p_obs = request.body.obs;

  try {
    if (!p_idTrabalho) {
      throw new Error("Projeto não encontrado");
    }

    const avaliacao = new Avaliacao(banco);
    avaliacao._trabalho = { idTrabalho: p_idTrabalho };
    avaliacao._professor = { registro: p_professorRegistro };
    avaliacao._notaApresentacao = p_notaApresentacao;
    avaliacao._notaRelevancia = p_notaRelevancia;
    avaliacao._notaConhecimento = p_notaConhecimento;
    avaliacao._melhorTrabalho = p_melhorTrabalho;
    avaliacao._obs = p_obs;

    const respostaPromise = await avaliacao.create();

    const resposta = {
      status: true,
      msg: "Cadastrado com sucesso!!",
      codigo: "002",
      dados: {
        idTrabalho: p_idTrabalho,
        Professor: p_professorRegistro,
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
