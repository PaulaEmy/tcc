module.exports = class Aluno {
  constructor(banco) {
    this._banco = banco;
    this._matricula;
    this._nome;
    this._email;
    this._nascimento;
    this._senha;
    this._turma = {
      idTurma: null,
    };
    this._curso = {
      idCurso: null,
    };
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const matricula = this._matricula;
      const nome = this._nome;
      const email = this._email;
      const nascimento = this._nascimento;
      const senha = this._senha;
      const turma = this._turma.idTurma;
      const curso = this._curso.idCurso;
      const parametros = [
        matricula,
        nome,
        email,
        nascimento,
        senha,
        turma,
        curso,
      ];
      console.log(parametros);
      const sql =
        "iNSERT INTO aluno (matricula, nome, email, nascimento, senha, turma_idTurma, curso_idCurso) VALUES (?, ? ,?, ?, md5(?), ?, ?)";
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

  async read() {
    const operacao = new Promise((resolve, reject) => {
      const parametros = [];
      const sql = "select * from aluno order by nome;";
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
      const matricula = this._matricula;
      const nome = this._nome;
      const email = this._email;
      const senha = this._senha;
      const turma = this._idTurma;
      const curso = this._idCurso;

      const parametros = [nome, email, senha, turma, curso, matricula];
      console.log(parametros);
      const sql =
        "update aluno set nome = ?, email = ?, senha = ?, turma = ?, curso = ? where matricula = ?";
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
      const matricula = this._matricula;

      const parametros = [matricula];
      const sql = "delete from aluno where matricula = ?";
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

  set _matricula(value) {
    this._matriculaValue = value;
  }

  get _matricula() {
    return this._matriculaValue;
  }

  set _nome(value) {
    this._nomeValue = value;
  }

  get _nome() {
    return this._nomeValue;
  }

  set _idTurma(value) {
    this._Turma_idTurmaValue = value;
  }

  get _idTurma() {
    return this._Turma_idTurmaValue;
  }

  set _idCurso(value) {
    this._Turma_idCursoValue = value;
  }

  get _idCurso() {
    return this._Turma_idCursoValue;
  }

  set _nascimento(value) {
    this._nascimentoValue = value;
  }

  get _nascimento() {
    return this._nascimentoValue;
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
