##npm install express --save

##npm install mysql --save

##npm install jsonwebtoken --save

##npm install md5 --save

=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

    se for visitante, registro = null

=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
AUTO_INCREMENT = 3
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
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`trabalho`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`trabalho` (
`idTrabalho` INT(11) NOT NULL AUTO_INCREMENT,
`nomeTrabalho` VARCHAR(128) NOT NULL,
`resumo` VARCHAR(256) NULL DEFAULT NULL,
`Curso_idCurso` INT(11) NOT NULL,
`professor_registro` INT(11) NULL,
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
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

---

-- Table `feiratecnica`.`turma`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`turma` (
`idturma` INT NOT NULL AUTO_INCREMENT,
`nomeTurma` VARCHAR(45) NULL,
PRIMARY KEY (`idturma`))
ENGINE = InnoDB;

---

-- Table `feiratecnica`.`AlunoGrupo`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`AlunoGrupo` (
`Matricula` INT NOT NULL,
`nomeAluno` VARCHAR(45) NULL,
`turma_idturma` INT NOT NULL,
`trabalho_idTrabalho` INT(11) NOT NULL,
PRIMARY KEY (`Matricula`),
INDEX `fk_AlunoGrupo_turma1_idx` (`turma_idturma` ASC),
INDEX `fk_AlunoGrupo_trabalho1_idx` (`trabalho_idTrabalho` ASC),
CONSTRAINT `fk_AlunoGrupo_turma1`
FOREIGN KEY (`turma_idturma`)
REFERENCES `feiratecnica`.`turma` (`idturma`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT `fk_AlunoGrupo_trabalho1`
FOREIGN KEY (`trabalho_idTrabalho`)
REFERENCES `feiratecnica`.`trabalho` (`idTrabalho`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

---

-- Table `feiratecnica`.`Avaliacao`

---

CREATE TABLE IF NOT EXISTS `feiratecnica`.`Avaliacao` (
`idAvaliacao` INT NOT NULL AUTO_INCREMENT,
`trabalho_idTrabalho` INT(11) NOT NULL,
`professor_registro` INT(11) NULL,
`notaApresentacao` INT NULL,
`notaRelevancia` INT NULL,
`notaConhecimento` INT NULL,
`melhorTrabalho` INT NULL,
`obs` VARCHAR(100) NULL,
PRIMARY KEY (`idAvaliacao`),
INDEX `fk_Avaliacao_trabalho1_idx` (`trabalho_idTrabalho` ASC),
INDEX `fk_Avaliacao_professor1_idx` (`professor_registro` ASC),
CONSTRAINT `fk_Avaliacao_trabalho1`
FOREIGN KEY (`trabalho_idTrabalho`)
REFERENCES `feiratecnica`.`trabalho` (`idTrabalho`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT `fk_Avaliacao_professor1`
FOREIGN KEY (`professor_registro`)
REFERENCES `feiratecnica`.`professor` (`registro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
