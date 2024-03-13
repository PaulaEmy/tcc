const express = require("express");
const app = express();
const mysql = require("mysql");

const rotas_cursos = require("./routes/rotas_cursos");
const rotas_professor = require("./routes/rotas_professor");
const rotas_trabalho = require("./routes/rotas_trabalho");

app.use(express.json());
app.use(express.static("js"));

app.use("/", express.static(__dirname + "/view"));

const porta = 80;

const host = "http://localhost:" + porta;

const banco = mysql.createPool({
  connectionLimit: 128,
  host: "localhost",
  user: "root",
  password: "",
  database: "FeiraTecnica",
});

rotas_cursos(app, banco);
rotas_professor(app, banco);
rotas_trabalho(app, banco),
  app.listen(porta, function () {
    console.log("Servidor rodando!: " + porta);
    console.log(">> " + host);
  });
