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

  async login() {
    const operacao = new Promise((resolve, reject) => {
      const email = this._email;
      const senha = this._senha;

      const parametros = [email, senha];
      //console.log(parametros);
      const sql =
        "SELECT COUNT(*)as qtd, matricula, nome, email, senha, nascimento, turma_idTurma, curso_idCurso FROM aluno  WHERE email= ? AND senha =md5(?)";
      this._banco.query(sql, parametros, (erro, tuplas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          console.log(tuplas);
          if (tuplas[0].qtd > 0) {
            const obj = {
              status: true,
              dados: {
                registro: tuplas[0].registro,
                nome: tuplas[0].nome,
                email: tuplas[0].email,
                senha: senha[0].senha,
                nascimento: tuplas[0].nascimento,
                turma: tuplas[0].turma,
              },
            };

            resolve(obj);
          } else {
            const obj = {
              status: false,
            };
            resolve(obj);
          }
        }
      });
    });

    return operacao;
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const matricula = this._matricula;
      const nome = this._nome;
      const email = this._email;
      const nascimento = this._nascimento;
      const senha = this._matricula + this._nascimento.replaceAll("-", "");
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
      const sql = `
        SELECT 
          aluno.matricula, 
          aluno.nome, 
          aluno.email, 
          aluno.nascimento, 
          aluno.turma_idTurma, 
          aluno.curso_idCurso,
          turma.nomeTurma AS nomeTurma,
          curso.nomeCurso AS nomeCurso
        FROM aluno 
        LEFT JOIN turma ON aluno.turma_idTurma = turma.idTurma
        LEFT JOIN curso ON aluno.curso_idCurso = curso.idCurso
        ORDER BY aluno.nome;
      `;
      this._banco.query(sql, [], function (erro, resultados) {
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
    return new Promise((resolve, reject) => {
      const matricula = this._matricula;
      const nome = this._nome;
      const email = this._email;
      const senha = this._senha;
      const turma = this._idTurma;
      const curso = this._idCurso;

      const parametros = [nome, email, senha, turma, curso, matricula];
      console.log(parametros);
      const sql =
        "UPDATE aluno SET nome = ?, email = ?, senha = md5(?), turma_idTurma = ?, curso_idCurso = ? WHERE matricula = ?";
      this._banco.query(sql, parametros, function (erro, resultados) {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(resultados);
        }
      });
    });
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
