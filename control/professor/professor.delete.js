const Professor = require("../../models/Professor");
const JWT = require("../../models/JWT");

module.exports = async function (request, response, banco) {
  console.log("DELETE: /professor");

  const auth = request.headers.authorization;
  console.log("Authorization header:", auth);
  const jwt = new JWT();
  const validou = jwt.validar(auth);

  if (validou.status == true) {
    const p_registro = request.params.registro;

    try {
      const professor = new Professor(banco);
      professor._registro = p_registro;

      const deletado = await professor.delete();

      if (deletado) {
        return {
          status: true,
          msg: "Professor deletado com sucesso",
          codigo: "002",
          dados: {},
        };
      } else {
        return {
          status: false,
          msg: "Professor não encontrado",
          codigo: "003",
          dados: {},
        };
      }
    } catch (erro) {
      console.log(erro);
      throw new Error("Erro ao deletar o professor");
    }
  } else {
    const resposta = {
      status: false,
      msg: "Token inválido!",
      codigo: "003",
      dados: {},
    };
    response.status(401).json(resposta);
  }
};
