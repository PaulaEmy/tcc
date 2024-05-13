const Aluno = require("../../models/Aluno");

module.exports = function (request, response, banco) {
  console.log("DELETE: /aluno");
  const p_matricula = request.params.matricula;

  const aluno = new Aluno(banco);
  aluno._matricula = p_matricula;
  aluno
    .delete()
    .then(() => {
      const resposta = {
        status: true,
        msg: "Deletado com sucesso!!",
        codigo: "004",
        dados: {
          matricula: p_matricula,
        },
      };
      response.status(200).json(resposta);
    })
    .catch((erro) => {
      console.error(erro);
      const resposta = {
        status: false,
        msg: "Erro ao deletar!",
        codigo: "003",
        dados: {},
      };
      response.status(500).json(resposta);
    });
};
