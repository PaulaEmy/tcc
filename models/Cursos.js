module.exports = class Cursos {
  constructor(banco) {
    this._banco = banco;
    this._idCursoValue = null;
    this._nomeCursoValue = null;
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const nome = this._nomeCursoValue;
      const parametros = [nome];
      const sql = "insert into curso (nomeCurso) values (?);";
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
      const sql = "select * from curso order by nomeCurso;";
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
      const nome = this._nomeCurso;
      const id = this._idCurso;
      const parametros = [nome, id];
      const sql = "update curso set nomecurso = ? where idcurso = ?;";
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
      const idCurso = this._idCurso;
      const parametros = [idCurso];
      const sql = "delete from curso where idcurso = ?";
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

  set _idCurso(value) {
    this._idCursoValue = value;
  }

  get _idCurso() {
    return this._idCursoValue;
  }

  set _nomeCurso(value) {
    this._nomeCursoValue = value;
  }

  get _nomeCurso() {
    return this._nomeCursoValue;
  }
};
