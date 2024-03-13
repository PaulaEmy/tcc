module.exports = class Trabalho {
  constructor(banco) {
    this._banco = banco;
    this._idTrabalho;
    this._nomeTrabalho;
    this._resumo;
    this._Curso_idCurso = {
      idCurso: null,
      nomeCurso: null,
    };
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const nomeTrabalho = this._nomeTrabalho;
      const resumo = this._resumo;
      const Curso_idCurso = this._Curso_idCurso;
      const parametros = [nomeTrabalho, resumo, Curso_idCurso];
      console.log(parametros);
      const sql =
        "INSERT INTO trabalho (nomeTrabalho, resumo, Curso_idCurso) VALUES (?, ?, ?)";
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
      const sql = "select * from professor order by nome;";
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
      const registro = this._registro;
      const nome = this._nome;
      const email = this._email;
      const senha = this._senha;

      const parametros = [nome, email, senha, registro];
      console.log(parametros);
      const sql =
        "update professor set nome = ?, email = ?, senha = ? where registro = ?";
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
      const registro = this._registro;

      const parametros = [registro];
      const sql = "delete from professor where registro = ?";
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

  set _idTrabalho(value) {
    this._idTrabalhoValue = value;
  }

  get _idTrabalho() {
    return this._idTrabalhoValue;
  }

  set _nomeTrabalho(value) {
    this._nomeTrabalhoValue = value;
  }

  get _nomeTrabalho() {
    return this._nomeTrabalhoValue;
  }

  set _resumo(value) {
    this._resumoValue = value;
  }

  get _resumo() {
    return this._resumoValue;
  }

  set _curso(value) {
    this._cursoValue = value;
  }

  get _curso() {
    return this._cursoValue;
  }
};
