module.exports = class AlunoGrupo {
  constructor(banco) {
    this._banco = banco;

    this._aluno = {
      matricula: null,
    };
    this._trabalho = {
      idTrabalho: null,
    };
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const aluno = this._aluno.matricula;
      const trabalho = this._trabalho.idTrabalho;
      const parametros = [trabalho, aluno];
      console.log(parametros);
      const sql =
        "INSERT INTO alunogrupo (trabalho_idTrabalho, aluno_matricula) VALUES (?, ?)";
      this._banco.query(sql, parametros, function (erro, resultados) {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(JSON.stringify(resultados));
        }
      });
    });
    return operacao;
  }

  async read() {
    const operacao = new Promise((resolve, reject) => {
      const parametros = [];
      const sql = "select * from alunogrupo order by trabalho_idTrabalho;";
      this._banco.query(sql, parametros, function (erro, resultados) {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(resultados);
        }
      });
    });
    return operacao;
  }

  async update() {
    const operacao = new Promise((resolve, reject) => {
      const matricula = this._aluno_matricula;
      const trabalho_idTrabalho = this._trabalho_idTrabalho;

      const parametros = [trabalho_idTrabalho, matricula];
      console.log(parametros);
      const sql =
        "update alunogrupo set trabalho_idTrabalho = ? where aluno_matricula = ?";
      this._banco.query(sql, parametros, function (erro, resultados) {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(resultados);
        }
      });
    });
    return operacao;
  }

  async delete() {
    const operacao = new Promise((resolve, reject) => {
      const matricula = this._aluno_matricula;

      const parametros = [matricula];
      const sql = "delete from alunogrupo where aluno_matricula = ?";
      console.log(parametros);
      this._banco.query(sql, parametros, function (erro, resultados) {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(JSON.stringify(resultados));
        }
      });
    });
    return operacao;
  }

  set banco(valor) {
    this._banco = valor;
  }

  get banco() {
    return this._banco;
  }

  set _aluno_matricula(value) {
    this._aluno_matriculaValue = value;
  }

  get _aluno_matricula() {
    return this._aluno_matriculaValue;
  }

  set _trabalho_idTrabalho(value) {
    this._trabalho_idTrabalhoValue = value;
  }

  get _trabalho_idTrabalho() {
    return this._trabalho_idTrabalhoValue;
  }
};
