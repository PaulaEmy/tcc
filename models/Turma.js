module.exports = class Turma {
  constructor(banco) {
    this._banco = banco;
    this._idturma = null;
    this._nomeTurma = null;
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const nome = this._nomeTurma;
      const parametros = [nome];
      const sql = "insert into turma (nomeTurma) values (?);";
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
      const sql = "select * from turma order by nomeTurma;";
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
      const nome = this._nomeTurma;
      const id = this._idturma;
      const parametros = [nome, id];
      const sql = "update turma set nomeTurma = ? where idturma = ?;";
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
      const id = this._idturma;
      const parametros = [id];
      const sql = "delete from turma where idturma = ?";
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

  set _idturma(value) {
    this._idturmaValue = value;
  }

  get _idturma() {
    return this._idturmaValue;
  }

  set _nomeTurma(value) {
    this._nomeTurmaValue = value;
  }

  get _nomeTurma() {
    return this._nomeTurmaValue;
  }
};
