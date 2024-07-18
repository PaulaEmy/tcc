##npm install express --save

##npm install mysql --save

##npm install jsonwebtoken --save

##npm install md5 --save

##npm install csvtojson --save

##npm install multer --save

##npm install csv

=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

    se for visitante, registro = null

=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

---

-- Schema mydb

---

---

-- Schema feiratecnica

---

---

-- Schema feiratecnica

---

CREATE SCHEMA IF NOT EXISTS `feiratecnica` DEFAULT CHARACTER SET utf8mb4 ;
USE `feiratecnica` ;

---

-- Table `feiratecnica`.`curso`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`curso` (
`idCurso` INT(11) NOT NULL AUTO_INCREMENT,
`nomeCurso` VARCHAR(45) NULL DEFAULT NULL,
PRIMARY KEY (`idCurso`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`professor`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`professor` (
`registro` INT(11) NOT NULL AUTO_INCREMENT,
`nome` VARCHAR(50) NULL DEFAULT NULL,
`email` VARCHAR(50) NULL DEFAULT NULL,
`senha` VARCHAR(50) NULL DEFAULT NULL,
PRIMARY KEY (`registro`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`trabalho`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`trabalho` (
`idTrabalho` INT(11) NOT NULL AUTO_INCREMENT,
`nomeTrabalho` VARCHAR(128) NOT NULL,
`resumo` VARCHAR(256) NULL DEFAULT NULL,
`Curso_idCurso` INT(11) NOT NULL,
`professor_registro` INT(11) NULL DEFAULT NULL,
PRIMARY KEY (`idTrabalho`),
INDEX `fk_Trabalho_Curso1_idx` (`Curso_idCurso` ASC),
INDEX `fk_trabalho_professor1_idx` (`professor_registro` ASC),
CONSTRAINT `fk_Trabalho_Curso1`
FOREIGN KEY (`Curso_idCurso`)
REFERENCES `feiratecnica`.`curso` (`idCurso`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT `fk_trabalho_professor1`
FOREIGN KEY (`professor_registro`)
REFERENCES `feiratecnica`.`professor` (`registro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`turma`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`turma` (
`idturma` INT(11) NOT NULL AUTO_INCREMENT,
`nomeTurma` VARCHAR(45) NULL DEFAULT NULL,
PRIMARY KEY (`idturma`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`aluno`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`aluno` (
`matricula` INT NOT NULL,
`nome` VARCHAR(45) NULL,
`email` VARCHAR(45) NULL,
`nascimento` VARCHAR(45) NULL,
`senha` VARCHAR(45) NULL,
`turma_idturma` INT(11) NOT NULL,
PRIMARY KEY (`matricula`),
INDEX `fk_aluno_turma1_idx` (`turma_idturma` ASC),
CONSTRAINT `fk_aluno_turma1`
FOREIGN KEY (`turma_idturma`)
REFERENCES `feiratecnica`.`turma` (`idturma`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

---

-- Table `feiratecnica`.`alunogrupo`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`alunogrupo` (
`trabalho_idTrabalho` INT(11) NOT NULL,
`aluno_matricula` INT NOT NULL,
INDEX `fk_AlunoGrupo_trabalho1_idx` (`trabalho_idTrabalho` ASC),
INDEX `fk_alunogrupo_aluno1_idx` (`aluno_matricula` ASC),
CONSTRAINT `fk_AlunoGrupo_trabalho1`
FOREIGN KEY (`trabalho_idTrabalho`)
REFERENCES `feiratecnica`.`trabalho` (`idTrabalho`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT `fk_alunogrupo_aluno1`
FOREIGN KEY (`aluno_matricula`)
REFERENCES `feiratecnica`.`aluno` (`matricula`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`avaliacao`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`avaliacao` (
`idAvaliacao` INT(11) NOT NULL AUTO_INCREMENT,
`trabalho_idTrabalho` INT(11) NOT NULL,
`professor_registro` INT(11) NULL DEFAULT NULL,
`notaApresentacao` INT(11) NULL DEFAULT NULL,
`notaRelevancia` INT(11) NULL DEFAULT NULL,
`notaConhecimento` INT(11) NULL DEFAULT NULL,
`melhorTrabalho` INT(11) NULL DEFAULT NULL,
`obs` VARCHAR(100) NULL DEFAULT NULL,
PRIMARY KEY (`idAvaliacao`),
INDEX `fk_Avaliacao_trabalho1_idx` (`trabalho_idTrabalho` ASC),
INDEX `fk_Avaliacao_professor1_idx` (`professor_registro` ASC),
CONSTRAINT `fk_Avaliacao_professor1`
FOREIGN KEY (`professor_registro`)
REFERENCES `feiratecnica`.`professor` (`registro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT `fk_Avaliacao_trabalho1`
FOREIGN KEY (`trabalho_idTrabalho`)
REFERENCES `feiratecnica`.`trabalho` (`idTrabalho`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

const Avaliacao = require("../../models/Avaliacao");
module.exports = function (request, response, banco) {
console.log("POST: /avaliacao");
const p_trabalho_idTrabalho = request.body.idTrabalho;
const p_professor_registro = request.body.registro;
const p_notaApresentacao = request.body.notaApresentacao;
const p_notaRelevancia = request.body.notaRelevancia;
const p_notaConhecimento = request.body.notaConhecimento;
const p_melhorTrabalho = request.body.melhorTrabalho;
const p_obs = request.body.obs;

if (
p_trabalho_idTrabalho == "" ||
p_notaApresentacao == "" ||
p_notaRelevancia == "" ||
p_notaConhecimento == "" ||
p_melhorTrabalho == ""
) {
const resposta = {
status: false,
msg: "Por favor preencha todos os campos",
codigo: "001",
dados: {},
};
response.status(200).send(resposta);
} else {
const avaliacao = new Avaliacao(banco);
avaliacao.\_trabalho.idTrabalho = p_trabalho_idTrabalho;
avaliacao.\_professor.registro = p_professor_registro;
avaliacao.\_notaApresentacao = p_notaApresentacao;
avaliacao.\_notaRelevancia = p_notaRelevancia;
avaliacao.\_notaConhecimento = p_notaConhecimento;
avaliacao.\_melhorTrabalho = p_melhorTrabalho;
avaliacao.\_obs = p_obs;

    avaliacao
      .create()
      .then((respostaPromise) => {
        const resposta = {
          status: false,
          msg: "Cadastrado com sucesso!!",
          codigo: "002",
          dados: {
            idAvaliacao: respostaPromise.insertId,
            trabalho: p_trabalho_idTrabalho,
            registro: p_professor_registro,
            notaApresentacao: p_notaApresentacao,
            notaRelevancia: p_notaRelevancia,
            notaConhecimento: p_notaConhecimento,
            melhorTrabalho: p_melhorTrabalho,
            obs: p_obs,
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "Erro ao cadastrar!",
          codigo: "003",
          dados: {},
        };
        console.log(erro);
        response.status(200).send(resposta);
      });

}
};
