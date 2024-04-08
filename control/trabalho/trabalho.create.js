const Trabalho = require("../../models/Trabalho");

module.exports = function (request, response, banco) {
  console.log(request.body);
  const p_nomeTrabalho = request.body.nomeTrabalho;
  const p_resumo = request.body.resumo;
  const p_Curso_idCurso = request.body.idCurso;
  const p_professor_registro = request.body.professor_registro;

  console.log(request.body);
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
    console.log(trabalho._professor);
    trabalho._professor = {
      registro: p_professor_registro,
      nome: "",
    };

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
            professor: p_professor_registro,
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
