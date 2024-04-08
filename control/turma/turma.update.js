const Turma = require("../../models/Turma");
module.exports = function (request, response, banco) {
  console.log("PUT: /turmas");

  const p_nomeTurma = request.body.nomeTurma;
  const p_idturma = request.params.idturma;

  if (p_nomeTurma == "") {
    const resposta = {
      status: false,
      msg: "O nome da turma não pode ser vazio!!",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const turma = new Turma(banco);
    turma._nomeTurma = p_nomeTurma;
    turma._idturma = p_idturma;
    turma
      .update()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Atualizado com sucesso!!",
          codigo: "002",
          dados: {
            idturma: respostaPromise.insertId,
            nomeTurma: p_nomeTurma,
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
