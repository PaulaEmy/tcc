module.exports = class Professor {
  constructor(banco) {
    this._banco = banco;
    this._registro;
    this._nome;
    this._email;
    this._senha;
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const nome = this._nome;
      const email = this._email;
      const senha = this._senha;
      const parametros = [nome, email, senha];
      const sql =
        "insert into professor (nome, email, senha) values (?, ?, ?);";
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

  set _registro(value) {
    this._registroValue = value;
  }

  get _registro() {
    return this._registroValue;
  }

  set _nome(value) {
    this._nomeValue = value;
  }

  get _nome() {
    return this._nomeValue;
  }

  set _email(value) {
    this._emailValue = value;
  }

  get _email() {
    return this._emailValue;
  }

  set _senha(value) {
    this._senhaValue = value;
  }

  get _senha() {
    return this._senhaValue;
  }
};
