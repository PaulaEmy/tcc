const Avaliacao = require("../../models/Avaliacao");
module.exports = function (request, response, banco) {
  console.log("POST: /avaliacao");
  const p_trabalho_idTrabalho = request.body.idTrabalho;
  const p_professor_registro = request.body.registro;
  const p_notaApresentacao = request.body.notaApresentacao;
  const p_notaRelevancia = request.body.notaRelevancia;
  const p_notaConhecimento = request.body.notaConhecimento;
  const p_melhorTrabalho = request.body.melhorTrabalho;
  const p_obs = request.body.obs;

  if (
    p_trabalho_idTrabalho == "" ||
    p_notaApresentacao == "" ||
    p_notaRelevancia == "" ||
    p_notaConhecimento == "" ||
    p_melhorTrabalho == ""
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
    avaliacao._trabalho.idTrabalho = p_trabalho_idTrabalho;
    avaliacao._professor.registro = p_professor_registro;
    avaliacao._notaApresentacao = p_notaApresentacao;
    avaliacao._notaRelevancia = p_notaRelevancia;
    avaliacao._notaConhecimento = p_notaConhecimento;
    avaliacao._melhorTrabalho = p_melhorTrabalho;
    avaliacao._obs = p_obs;

    avaliacao
      .create()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Cadastrado com sucesso!!",
          codigo: "002",
          dados: {
            idAvaliacao: respostaPromise.insertId,
            trabalho: p_trabalho_idTrabalho,
            registro: p_professor_registro,
            notaApresentacao: p_notaApresentacao,
            notaRelevancia: p_notaRelevancia,
            notaConhecimento: p_notaConhecimento,
            melhorTrabalho: p_melhorTrabalho,
            obs: p_obs,
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "Erro ao cadastrar!",
          codigo: "003",
          dados: {},
        };
        console.log(erro);
        response.status(200).send(resposta);
      });
  }
};
