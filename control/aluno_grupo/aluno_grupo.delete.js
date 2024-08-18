const AlunoGrupo = require("../../models/AlunoGrupo");

module.exports = function (request, response, banco) {
  const p_matricula = request.params.aluno_matricula;

  const alunogrupo = new AlunoGrupo(banco);
  alunogrupo._aluno_matricula = p_matricula;
  alunogrupo
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
