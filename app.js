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

//###################################################################

// Rota para servir o formulário HTML
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastrarprofessor.html"));
});

// Configuração do multer para processar uploads de arquivos
const upload = multer({ storage: multer.memoryStorage() });

//##########PROFESSOR##########

app.post("/upload/professor", upload.single("csvFile"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("Nenhum arquivo enviado.");
    return;
  }

  const csvBuffer = req.file.buffer.toString(); // Convertendo o buffer para string

  var linhas = csvBuffer.split("\n");

  // Array para armazenar os objetos JSON
  var objetosJson = [];
  var professoresDiferentes = [];

  var jsonFinal = JSON.stringify(objetosJson, null, 2);

  // Iterar sobre cada linha (começando da segunda linha, pois a primeira contém os cabeçalhos)
  for (let i = 1; i < linhas.length; i++) {
    const valores = linhas[i].split(";"); // Dividir os valores por ponto e vírgula
    professoresDiferentes.push({
      registro: valores[0],
      nome: valores[1],
      email: valores[2],
    });
  }

  console.log(professoresDiferentes);
  for (let i = 0; i < professoresDiferentes.length; i++) {
    const registro = professoresDiferentes[i].registro;
    const nome = professoresDiferentes[i].nome;
    const email = professoresDiferentes[i].email;

    await upsert(
      "INSERT INTO professor (registro, nome, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nome = VALUES(nome), email = VALUES(email)",
      [registro, nome, email]
    );
  }

  res.status(200).send('{"msg":"Executado com sucesso","status":true}');
});

//##########ALUNOS - CURSOS - TURMA##########

app.post("/upload/alunos", upload.single("csvFile"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("Nenhum arquivo enviado.");
    return;
  }

  const csvBuffer = req.file.buffer.toString(); // Convertendo o buffer para string

  var linhas = csvBuffer.split("\n");

  // Array para armazenar os objetos JSON
  var objetosJson = [];
  var cursosDiferentes = [];
  var turmasDiferentes = [];
  var alunosDiferentes = [];

  var jsonFinal = JSON.stringify(objetosJson, null, 2);

  // Iterar sobre cada linha (começando da segunda linha, pois a primeira contém os cabeçalhos)
  for (let i = 1; i < linhas.length; i++) {
    const valores = linhas[i].split(";"); // Dividir os valores por ponto e vírgula
    if (!cursosDiferentes.includes(valores[5])) {
      cursosDiferentes.push(valores[5]);
    }
    if (!turmasDiferentes.includes(valores[4])) {
      turmasDiferentes.push(valores[4]);
    }
    alunosDiferentes.push({
      matricula: valores[0],
      nome: valores[1],
      email: valores[2],
      nascimento: valores[3],
      turma: valores[4].trim(),
      curso: valores[5].trim(),
    });
  }

  // Limpar duplicatas nas listas de cursos e turmas
  cursosDiferentes = [...new Set(cursosDiferentes)];
  turmasDiferentes = [...new Set(turmasDiferentes)];

  // Upsert para cursos
  for (let i = 0; i < cursosDiferentes.length; i++) {
    const nomeCurso = cursosDiferentes[i].trim();
    const cursoExists = await cursoJaExiste(nomeCurso);
    if (!cursoExists) {
      await upsert("INSERT INTO curso (nomeCurso) VALUES (?)", [nomeCurso]);
    }
  }

  // Upsert para turmas
  for (let i = 0; i < turmasDiferentes.length; i++) {
    const nomeTurma = turmasDiferentes[i].trim();
    const turmaExists = await turmaJaExiste(nomeTurma);
    if (!turmaExists) {
      await upsert("INSERT INTO turma (nomeTurma) VALUES (?)", [nomeTurma]);
    }
  }

  // Função para verificar se um curso já existe
  async function cursoJaExiste(nomeCurso) {
    return new Promise((resolve, reject) => {
      banco.query(
        "SELECT 1 FROM curso WHERE nomeCurso = ?",
        [nomeCurso],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.length > 0);
        }
      );
    });
  }

  // Função para verificar se uma turma já existe
  async function turmaJaExiste(nomeTurma) {
    return new Promise((resolve, reject) => {
      banco.query(
        "SELECT 1 FROM turma WHERE nomeTurma = ?",
        [nomeTurma],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.length > 0);
        }
      );
    });
  }
  // Upsert para alunos
  for (let i = 0; i < alunosDiferentes.length; i++) {
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

    await upsert(
      "INSERT INTO aluno (matricula, nome, email, nascimento, turma_idTurma, curso_idCurso) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE nome = VALUES(nome), email = VALUES(email), nascimento = VALUES(nascimento), turma_idTurma = VALUES(turma_idTurma), curso_idCurso = VALUES(curso_idCurso)",
      [matricula, nome, email, nascimento, idTurma, idCurso]
    );
  }

  res.status(200).send('{"msg":"Executado com sucesso","status":true}');
});

async function upsert(query, params) {
  return new Promise((resolve, reject) => {
    banco.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
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
