const Trabalho = require("../models/Trabalho");

module.exports = function (request, response, banco) {
  console.log(request.body);
  const p_nomeTrabalho = request.body.nomeTrabalho;
  const p_resumo = request.body.resumo;
  const p_Curso_idCurso = request.body.Curso_idCurso;

  if (p_nomeTrabalho == "" || p_resumo == "" || p_Curso_idCurso == "") {
    const resposta = {
      status: false,
      msg: "Por favor preencha todos os campos",
      codigo: "001",
      dados: {},
    };

    response.status(200).send(resposta);
  } else {
    const trabalho = new Trabalho(banco);
    trabalho._nomeTrabalho = p_nomeTrabalho;
    trabalho._resumo = p_resumo;
    trabalho._curso.idCurso = p_Curso_idCurso;

    trabalho
      .create()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Cadastrado com sucesso!",
          codigo: "002",
          dados: {
            idTrabalho: respostaPromise.InsertId,
            nomeTrabalho: p_nomeTrabalho,
            resumo: p_resumo,
            curso: p_Curso_idCurso,
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "Ocorreu um erro!",
          codigo: "003",
          dados: erro,
        };
        console.log(erro);
        response.status(200).send(resposta);
      });
  }
};
