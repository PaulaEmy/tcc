const Professor = require("../../models/Professor");

module.exports = function (request, response, banco) {
  console.log("DELETE: /professor");
  const p_registro = request.params.registro;

  const professor = new Professor(banco);
  professor._registro = p_registro;
  professor
    .delete()
    .then(() => {
      const resposta = {
        status: true,
        msg: "Deletado com sucesso!!",
        codigo: "004",
        dados: {
          registro: p_registro,
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
