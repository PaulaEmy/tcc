const AlunoGrupo = require("../../models/AlunoGrupo");
module.exports = function (request, response, banco) {
  const p_matricula = request.body.matricula;
  const p_trabalho_idTrabalho = request.body.idTrabalho;

  if (p_matricula == "" || p_trabalho_idTrabalho == "") {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };
    response.status(200).send(resposta);
  } else {
    const alunogrupo = new AlunoGrupo(banco);
    alunogrupo._aluno.matricula = p_matricula;
    alunogrupo._trabalho.idTrabalho = p_trabalho_idTrabalho;
    alunogrupo
      .create()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Cadastrado com sucesso!!",
          codigo: "002",
          dados: {
            matricula: p_matricula,
            trabalho_idTrabalho: p_trabalho_idTrabalho,
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
