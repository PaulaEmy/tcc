const Aluno = require("../../models/Aluno");

module.exports = async function (request, response, banco) {
  const p_matricula = request.params.matricula;

  if (!p_matricula) {
    return response.status(400).send({
      status: false,
      msg: "Matrícula não fornecida :/",
      codigo: "001",
      dados: {},
    });
  }

  try {
    const aluno = new Aluno(banco);
    aluno._matricula = p_matricula;

    const deletado = await aluno.delete();

    if (deletado) {
      response.status(200).send({
        status: true,
        msg: "Aluno deletado com sucesso :D",
        codigo: "002",
        dados: {},
      });
    } else {
      response.status(404).send({
        status: false,
        msg: "Aluno não encontrado D:",
        codigo: "003",
        dados: {},
      });
    }
  } catch (erro) {
    console.log(erro);
    response.status(500).send({
      status: false,
      msg: "Erro ao deletar o aluno :O",
      codigo: "004",
      dados: {},
    });
  }
};
