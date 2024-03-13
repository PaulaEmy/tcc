##npm install express --save

##npm install mysql --save

##npm install jsonwebtoken --save

##npm install md5 --save

=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

    se for visitante, registro = null

=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

create database FeiraTecnica;
use FeiraTecnica;

CREATE TABLE IF NOT EXISTS `FeiraTecnica`.`Curso` (
`idCurso` INT NOT NULL AUTO_INCREMENT,
`nomeCurso` VARCHAR(45) NULL,
PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS 'FeiraTecnica',.'professor'(
'registro' INT NOT NULL,
'nome' VARCHAR(45) NULL,
'email' VARCHAR(50) NULL,
'senha' VARCHAR(50) NOT NULL,
PRIMARY KEY('registro'))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `FeiraTecnica`.`Trabalho` (
`idTrabalho` INT NOT NULL AUTO_INCREMENT,
`nomeTrabalho` VARCHAR(128) NOT NULL,
`resumo` VARCHAR(256) NULL,
`Curso_idCurso` INT NOT NULL,
PRIMARY KEY (`idTrabalho`),
INDEX `fk_Trabalho_Curso1_idx` (`Curso_idCurso` ASC),
CONSTRAINT `fk_Trabalho_Curso1`
FOREIGN KEY (`Curso_idCurso`)
REFERENCES `FeiraTecnica`.`Curso` (`idCurso`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;
"# tcc" 
