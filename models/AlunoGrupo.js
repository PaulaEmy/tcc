module.exports = class AlunoGrupo {
  constructor(banco) {
    this._banco = banco;
    this._matricula;
    this._nomeAluno;
    this._turma = {
      idTurma: null,
    };
    this._trabalho = {
      idTrabalho: null,
    };
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const matricula = this._matricula;
      const nomeAluno = this._nomeAluno;
      const turma_idTurma = this._turma.idTurma;
      const trabalho_idTrabalho = this._trabalho.idTrabalho;
      const parametros = [
        matricula,
        nomeAluno,
        turma_idTurma,
        trabalho_idTrabalho,
      ];
      console.log(parametros);
      const sql =
        "INSERT INTO alunogrupo (matricula, nomeAluno, turma_idTurma, trabalho_idTrabalho) VALUES (?, ?, ?, ?)";
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
      const sql = "select * from alunogrupo order by nomeAluno;";
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
      const nomeAluno = this._nomeAluno;
      const turma = this._turma_idTurma;
      const trabalho = this._trabalho_idTrabalho;
      const parametros = [nomeAluno, turma, trabalho, matricula];
      console.log(parametros);
      const sql =
        "update alunogrupo set nomeAluno = ?, turma_idTurma = ?, trabalho_idTrabalho = ? where matricula = ?";
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
      const sql = "delete from alunogrupo where matricula = ?";
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

  set _nomeAluno(value) {
    this._nomeAlunoValue = value;
  }

  get _nomeAluno() {
    return this._nomeAlunoValue;
  }

  set _turma(value) {
    this._turma_idTurma = value;
  }

  get _turma() {
    return this._turma_idTurma;
  }

  set _trabalho_idTrabalho(value) {
    this._trabalho_idTrabalhoValue = value;
  }

  get _trabalho_idTrabalho() {
    return this._trabalho_idTrabalhoValue;
  }
};
