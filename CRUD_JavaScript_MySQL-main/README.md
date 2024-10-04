# CRUD-JS-y-MySQL


Antes de usar instalas express con -> npm install express
Antes de usar instalas cors con -> npm install cors

CREATE DATABASE IF NOT EXISTS usuarios;

USE usuarios;

CREATE TABLE IF NOT EXISTS  usuariostable (
	ID int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    EMAIL VARCHAR(255) NOT NULL,
    NOMBRE VARCHAR(255) NOT NULL,
    ACTIVO BOOLEAN DEFAULT FALSE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

SELECT * FROM usuariostable;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1011200657Aalan@.';
