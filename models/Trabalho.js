module.exports = class Trabalho {
  constructor(banco) {
    this._banco = banco;
    this._idTrabalho = null;
    this._nomeTrabalho = null;
    this._resumo = null;
    this._curso = {
      idCurso: null,
      nomeCurso: null,
    };
    this._professor = {
      registro: null,
      nome: null,
    };
  }

  async obterIdTrabalhoPorNome(nomeTrabalho) {
    const operacao = new Promise((resolve, reject) => {
      const parametros = [nomeTrabalho];
      console.log(parametros);
      const sql = "SELECT idTrabalho FROM trabalho WHERE nomeTrabalho = ?";
      this._banco.query(sql, parametros, function (erro, resultados) {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          if (resultados.length > 0) {
            resolve(resultados[0].idTrabalho);
          } else {
            resolve(null);
          }
        }
      });
    });
    return operacao;
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const nomeTrabalho = this._nomeTrabalho;
      const resumo = this._resumo;
      const Curso_idCurso = this._curso.idCurso;
      const professor_registro = this._professor.registro;
      const parametros = [
        nomeTrabalho,
        resumo,
        Curso_idCurso,
        professor_registro,
      ];

      const sql =
        "INSERT INTO trabalho (nomeTrabalho, resumo, Curso_idCurso, professor_registro) VALUES (?, ?, ?, ?)";
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
      const sql =
        "SELECT trabalho.idTrabalho, trabalho.nomeTrabalho, trabalho.resumo, trabalho.Curso_idCurso, trabalho.professor_registro, curso.nomeCurso AS nomeCurso, professor.nome AS nome FROM trabalho LEFT JOIN professor ON trabalho.professor_registro = professor.registro LEFT JOIN curso ON trabalho.curso_idCurso = curso.idCurso ORDER BY trabalho.nomeTrabalho;";
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
    const operacao = new Promise((resolve, reject) => {
      const idTrabalho = this._idTrabalho;
      const nomeTrabalho = this._nomeTrabalho;
      const resumo = this._resumo;
      const curso_idCurso = this._curso.idCurso;
      const professor_registro = this._professor.registro;

      const parametros = [
        nomeTrabalho,
        resumo,
        curso_idCurso,
        professor_registro,
        idTrabalho,
      ];
      console.log(parametros);
      const sql =
        "UPDATE trabalho SET nomeTrabalho = ?, resumo = ?, Curso_idCurso = ?, professor_registro = ? WHERE idTrabalho = ?";
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
      const idTrabalho = this._idTrabalho;

      const parametros = [idTrabalho];
      const sql = "DELETE FROM trabalho WHERE idTrabalho = ?";
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

  set idTrabalho(value) {
    this._idTrabalho = value;
  }

  get idTrabalho() {
    return this._idTrabalho;
  }

  set nomeTrabalho(value) {
    this._nomeTrabalho = value;
  }

  get nomeTrabalho() {
    return this._nomeTrabalho;
  }

  set resumo(value) {
    this._resumo = value;
  }

  get resumo() {
    return this._resumo;
  }

  set curso(value) {
    this._curso = value;
  }

  get curso() {
    return this._curso;
  }

  set professor(value) {
    this._professor = value;
  }

  get professor() {
    return this._professor;
  }
};
