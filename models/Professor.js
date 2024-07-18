module.exports = class Professor {
  constructor(banco) {
    this._banco = banco;
    this._registro;
    this._nome;
    this._email;
    this._senha;
  }

  async login() {
    const operacao = new Promise((resolve, reject) => {
      const email = this._email;
      const senha = this._senha;

      const parametros = [email, senha];
      const sql =
        "SELECT COUNT(*) AS qtd, registro, nome, email, senha FROM professor WHERE email = ? AND senha = md5(?)";
      this._banco.query(sql, parametros, (erro, tuplas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          if (tuplas[0].qtd > 0) {
            const obj = {
              status: true,
              dados: {
                registro: tuplas[0].registro,
                nome: tuplas[0].nome,
                email: tuplas[0].email,
              },
            };
            resolve(obj);
          } else {
            resolve({ status: false });
          }
        }
      });
    });
    return operacao;
  }

  async obterRegistroPorNome(nomeProfessor) {
    const operacao = new Promise((resolve, reject) => {
      const parametros = [nomeProfessor];
      const sql = "SELECT registro FROM professor WHERE nome = ?";
      this._banco.query(sql, parametros, (erro, resultados) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(resultados.length > 0 ? resultados[0].registro : null);
        }
      });
    });
    return operacao;
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const registro = this._registro;
      const nome = this._nome;
      const email = this._email;
      const senha = this._senha;

      const parametros = [registro, nome, email, senha];
      const sql =
        "INSERT INTO professor (registro, nome, email, senha) VALUES (?, ?, ?, md5(?))";
      this._banco.query(sql, parametros, (erro, tuplas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve({ status: true });
        }
      });
    });
    return operacao;
  }

  async read() {
    const operacao = new Promise((resolve, reject) => {
      const sql = "SELECT registro, nome, email FROM professor ORDER BY nome";
      this._banco.query(sql, (erro, tuplas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(tuplas);
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

      const parametros = [nome, email, registro];
      const sql = "UPDATE professor SET nome = ?, email = ? WHERE registro = ?";
      this._banco.query(sql, parametros, (erro, tuplas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve({ status: true });
        }
      });
    });
    return operacao;
  }

  async delete() {
    const operacao = new Promise((resolve, reject) => {
      const registro = this._registro;
      const parametros = [registro];
      const sql = "DELETE FROM professor WHERE registro = ?";
      this._banco.query(sql, parametros, (erro, tuplas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve({ status: true });
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

  set email(value) {
    this._email = value;
  }

  get email() {
    return this._email;
  }

  set senha(value) {
    this._senha = value;
  }

  get senha() {
    return this._senha;
  }
};
