module.exports = class Trabalho {
  constructor(banco) {
    this._banco = banco;
    this._idTrabalho;
    this._nomeTrabalho;
    this._resumo;
    this._curso = {
      idCurso: null,
      nomeCurso: null,
    };
    this._professor = {
      registro: -1,
      nome: "",
    };
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
      console.log(parametros);
      const sql =
        "INSERT INTO trabalho (nomeTrabalho, resumo, Curso_idCurso, professor_registro) VALUES (?, ?, ?, ?)";
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
      const sql = "select * from trabalho order by idTrabalho;";
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
      const idTrabalho = this._idTrabalho;
      const nomeTrabalho = this._nomeTrabalho;
      const resumo = this._resumo;

      const parametros = [nomeTrabalho, resumo, idTrabalho];
      console.log(parametros);
      const sql =
        "update trabalho set nomeTrabalho = ?, resumo = ? where idTrabalho = ?";
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
      const sql = "delete from trabalho where idTrabalho = ?";
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
    this._Curso_idCursoValue = value;
  }

  get _curso() {
    return this._Curso_idCursoValue;
  }

  set _professor(value) {
    this._Professor_registro = value;
  }

  get _professor() {
    return this._Professor_registro;
  }
};
