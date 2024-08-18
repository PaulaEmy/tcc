const Avaliacao = require("../../models/Avaliacao");
module.exports = function (request, response, banco) {
  const p_idAvaliacao = request.params.idAvaliacao;
  const p_notaApresentacao = request.body.notaApresentacao;
  const p_notaRelevancia = request.body.notaRelevancia;
  const p_notaConhecimento = request.body.notaConhecimento;
  const p_obs = request.body.obs;

  if (
    p_notaApresentacao === "" ||
    p_notaRelevancia === "" ||
    p_notaConhecimento === ""
  ) {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const avaliacao = new Avaliacao(banco);
    avaliacao._idAvaliacao = p_idAvaliacao;
    avaliacao._notaApresentacao = p_notaApresentacao;
    avaliacao._notaRelevancia = p_notaRelevancia;
    avaliacao._notaConhecimento = p_notaConhecimento;
    avaliacao._obs = p_obs;

    avaliacao
      .update()
      .then(() => {
        const resposta = {
          status: true,
          msg: "Atualizado com sucesso!!",
          codigo: "002",
          dados: {
            idAvaliacao: p_idAvaliacao,
            notaApresentacao: p_notaApresentacao,
            notaRelevancia: p_notaRelevancia,
            notaConhecimento: p_notaConhecimento,
            obs: p_obs,
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
