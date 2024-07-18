module.exports = class Avaliacao {
  constructor(banco) {
    this._banco = banco;
    this._idAvaliacao;
    this._professor = {
      registro: null,
    };
    this._notaApresentacao;
    this._notaRelevancia;
    this._notaConhecimento;
    this._melhorTrabalho;
    this._obs;
    this._trabalho = {
      idTrabalho: null,
    };
  }

  async create() {
    const operacao = new Promise((resolve, reject) => {
      const idTrabalho = this._trabalho.idTrabalho;
      const obs = this._obs;
      const professor = this._professor.registro;
      const notaApresentacao = this._notaApresentacao;
      const notaRelevancia = this._notaRelevancia;
      const notaConhecimento = this._notaConhecimento;
      const melhorTrabalho = this._melhorTrabalho;

      const parametros = [
        idTrabalho,
        professor,
        notaApresentacao,
        notaRelevancia,
        notaConhecimento,
        melhorTrabalho,
        obs,
      ];
      console.log(parametros);
      const sql =
        "INSERT INTO avaliacao (trabalho_idTrabalho, professor_registro, notaApresentacao, notaRelevancia, notaConhecimento, melhorTrabalho, obs) VALUES (?, ?, ?, ?, ?, ?, ?)";
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
      const sql =
        "SELECT avaliacao.idAvaliacao, avaliacao.trabalho_idTrabalho, avaliacao.notaApresentacao, avaliacao.notaRelevancia, avaliacao.notaConhecimento, avaliacao.melhorTrabalho, avaliacao.obs, trabalho.nomeTrabalho AS nomeTrabalho FROM avaliacao LEFT JOIN trabalho ON avaliacao.trabalho_idTrabalho = trabalho.idTrabalho ORDER BY avaliacao.idAvaliacao;";
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
      const idAvaliacao = this._idAvaliacao;
      const notaApresentacao = this._notaApresentacao;
      const notaRelevancia = this._notaRelevancia;
      const notaConhecimento = this._notaConhecimento;
      const obs = this._obs;

      const parametros = [
        notaApresentacao,
        notaRelevancia,
        notaConhecimento,
        obs,
        idAvaliacao,
      ];
      console.log(parametros);
      const sql =
        "update avaliacao set notaApresentacao = ?, notaRelevancia = ?, notaConhecimento = ?, obs =? where idAvaliacao = ?";
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
      const idAvaliacao = this._idAvaliacao;

      const parametros = [idAvaliacao];
      const sql = "delete from avaliacao where idAvaliacao = ?";
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
    this._Trabalho_idTrabalhoValue = value;
  }

  get _idTrabalho() {
    return this._Trabalho_idTrabalhoValue;
  }

  set _registro(value) {
    this._Professor_registroValue = value;
  }

  get _registro() {
    return this._Professor_registroValue;
  }

  set _notaApresentacao(value) {
    this._notaApresentacaoValue = value;
  }

  get _notaApresentacao() {
    return this._notaApresentacaoValue;
  }

  set _notaRelevancia(value) {
    this._notaRelevanciaValue = value;
  }

  get _notaRelevancia() {
    return this._notaRelevanciaValue;
  }

  set _notaConhecimento(value) {
    this._notaConhecimentoValue = value;
  }

  get _notaConhecimento() {
    return this._notaConhecimentoValue;
  }

  set _melhorTrabalho(value) {
    this._melhorTrabalhoValue = value;
  }

  get _melhorTrabalho() {
    return this._melhorTrabalhoValue;
  }

  set _obs(value) {
    this._obsValue = value;
  }

  get _obs() {
    return this._obsValue;
  }
};
