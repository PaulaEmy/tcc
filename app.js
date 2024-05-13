const express = require("express");
const app = express();
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

//############################## ROTAS ##############################

const rotas_cursos = require("./routes/rotas_cursos");
const rotas_professor = require("./routes/rotas_professor");
const rotas_trabalho = require("./routes/rotas_trabalho");
const rotas_turmas = require("./routes/rotas_turmas");
const rotas_avaliacao = require("./routes/rotas_avaliacao");
const rotas_aluno = require("./routes/rotas_aluno");
const rotas_alunogrupo = require("./routes/rotas_alunogrupo");

//###################################################################

const Aluno = require("./models/Aluno");
const Curso = require("./models/Cursos");
const Turma = require("./models/Turma");
const Professor = require("./models/Professor");

app.use(express.json());
app.use(express.static("js"));

app.use("/", express.static(__dirname + "/view"));

// Define a pasta pública para servir arquivos estáticos
app.use(express.static("public"));

const banco = mysql.createPool({
  connectionLimit: 128,
  host: "localhost",
  user: "root",
  password: "",
  database: "FeiraTecnica",
});

// Rota para servir o formulário HTML
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Configuração do multer para processar uploads de arquivos
const upload = multer({ storage: multer.memoryStorage() });

//UPLOAD DE PROFESSOR
app.post("/upload/professor", upload.single("csvFile"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("Nenhum arquivo enviado.");
    return;
  }

  const csvBuffer = req.file.buffer.toString(); // Convertendo o buffer para string

  var linhas = csvBuffer.split("\n");

  // Limpar tabela de professores
  await limparTabelaProfessor();

  // Array para armazenar os objetos JSON
  var objetosJson = [];
  var professoresDiferentes = [];

  var jsonFinal = JSON.stringify(objetosJson, null, 2);

  // Iterar sobre cada linha (começando da segunda linha, pois a primeira contém os cabeçalhos)
  for (var i = 1; i < linhas.length; i++) {
    var valores = linhas[i].split(";"); // Dividir os valores por ponto e vírgula
    //if (!alunosDiferentes.includes(valores[0])) {
    professoresDiferentes.push({
      registro: valores[0],
      nome: valores[1],
      email: valores[2],
    });
    //}
  }

  //##########ALUNOS##########
  console.log(professoresDiferentes);
  for (i = 0; i < professoresDiferentes.length; i++) {
    const registro = professoresDiferentes[i].registro;
    const nome = professoresDiferentes[i].nome;
    const email = professoresDiferentes[i].email;
    const p = new Professor(banco);
    p._registro = registro;
    p._nome = nome;
    p._email = email;
    p._senha = "UNIVAP2024";
    await p.create();
  }

  res.status(200).send('{"msg":"Executado com sucesso","status":true}');
});

//UPLOAD DE ALUNO
app.post("/upload/alunos", upload.single("csvFile"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("Nenhum arquivo enviado.");
    return;
  }

  const csvBuffer = req.file.buffer.toString(); // Convertendo o buffer para string

  var linhas = csvBuffer.split("\n");

  // Limpar tabela de alunos
  await limparTabelaAlunos();

  // Limpar a tabela de cursos
  await limparTabelaCursos();

  // Limpar a tabela de turmas
  await limparTabelaTurmas();

  // Resetar a contagem automática do ID das tabelas
  await resetarContagemID();

  // Array para armazenar os objetos JSON
  var objetosJson = [];
  var cursosDiferentes = [];
  var turmasDiferentes = [];
  var alunosDiferentes = [];

  var jsonFinal = JSON.stringify(objetosJson, null, 2);

  // Iterar sobre cada linha (começando da segunda linha, pois a primeira contém os cabeçalhos)
  for (var i = 1; i < linhas.length; i++) {
    var valores = linhas[i].split(";"); // Dividir os valores por ponto e vírgula
    if (!cursosDiferentes.includes(valores[5])) {
      cursosDiferentes.push(valores[5]);
    }
    if (!turmasDiferentes.includes(valores[4])) {
      turmasDiferentes.push(valores[4]);
    }
    //if (!alunosDiferentes.includes(valores[0])) {
    alunosDiferentes.push({
      matricula: valores[0],
      nome: valores[1],
      email: valores[2],
      nascimento: valores[3],
      turma: valores[4].trim(),
      curso: valores[5].trim(),
    });
    //}
  }

  //##########CURSOS##########
  console.log(cursosDiferentes);
  for (i = 0; i < cursosDiferentes.length; i++) {
    const nomeCurso = cursosDiferentes[i].trim();
    const cursoExistente = await Curso.exists(banco, nomeCurso);
    if (!cursoExistente) {
      const c = new Curso(banco);
      c._nomeCurso = nomeCurso;
      await c.create();
    }
  }
  //##########################

  //##########TURMAS##########
  console.log(turmasDiferentes);
  for (i = 0; i < turmasDiferentes.length; i++) {
    const nomeTurma = turmasDiferentes[i];
    const turmaExistente = await Turma.exists(banco, nomeTurma);
    if (!turmaExistente) {
      const t = new Turma(banco);
      t._nomeTurma = nomeTurma;
      await t.create();
    }
  }

  //##########ALUNOS##########
  console.log(alunosDiferentes);
  for (i = 0; i < alunosDiferentes.length; i++) {
    const objTurma = new Turma(banco);
    const objCurso = new Curso(banco);
    const idTurma = await objTurma.obterIdTurmaPorNome(
      alunosDiferentes[i].turma
    );
    const idCurso = await objCurso.obterIdCursoPorNome(
      alunosDiferentes[i].curso
    );

    const matricula = alunosDiferentes[i].matricula;
    const nome = alunosDiferentes[i].nome;
    const email = alunosDiferentes[i].email;
    const nascimento = alunosDiferentes[i].nascimento;
    //const turma = alunosDiferentes[i].turma;
    //const curso = alunosDiferentes[i].curso;
    const a = new Aluno(banco);
    a._matricula = matricula;
    a._nome = nome;
    a._email = email;
    a._nascimento = nascimento;
    a._senha = nascimento;
    a._turma.idTurma = idTurma;
    a._curso.idCurso = idCurso;
    await a.create();
  }

  res.status(200).send('{"msg":"Executado com sucesso","status":true}');
});

async function limparTabelaAlunos() {
  try {
    const sql = "DELETE FROM aluno";
    await banco.query(sql);
    console.log("Tabela de aluno limpa com sucesso.");
  } catch (error) {
    console.error("Erro ao limpar tabela de aluno:", error);
  }
}

async function limparTabelaProfessor() {
  try {
    const sql = "DELETE FROM professor";
    await banco.query(sql);
    console.log("Tabela de professor limpa com sucesso.");
  } catch (error) {
    console.error("Erro ao limpar tabela de professor:", error);
  }
}

async function limparTabelaCursos() {
  try {
    const sql = "DELETE FROM curso";
    await banco.query(sql);
    console.log("Tabela de cursos limpa com sucesso.");
  } catch (error) {
    console.error("Erro ao limpar tabela de cursos:", error);
  }
}

async function limparTabelaTurmas() {
  try {
    const sql = "DELETE FROM turma";
    await banco.query(sql);
    console.log("Tabela de turmas limpa com sucesso.");
  } catch (error) {
    console.error("Erro ao limpar tabela de turmas:", error);
  }
}

async function resetarContagemID() {
  try {
    const sqlCurso = "ALTER TABLE curso AUTO_INCREMENT = 1";
    await banco.query(sqlCurso);
    console.log(
      "Contagem automática do ID da tabela 'curso' resetada com sucesso."
    );

    const sqlTurma = "ALTER TABLE turma AUTO_INCREMENT = 1";
    await banco.query(sqlTurma);
    console.log(
      "Contagem automática do ID da tabela 'turma' resetada com sucesso."
    );
  } catch (error) {
    console.error("Erro ao resetar contagem automática do ID:", error);
  }
}

const porta = 80;

const host = "http://localhost:" + porta;

rotas_aluno(app, banco), rotas_alunogrupo(app, banco), rotas_cursos(app, banco);
rotas_professor(app, banco);
rotas_trabalho(app, banco),
  rotas_turmas(app, banco),
  rotas_avaliacao(app, banco),
  app.listen(porta, function () {
    console.log("Servidor rodando!: " + porta);
    console.log(">> " + host);
  });
