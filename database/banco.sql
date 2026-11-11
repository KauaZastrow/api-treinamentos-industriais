CREATE DATABASE banco;
USE banco;

CREATE TABLE treinamentos (
  id_treinamento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  carga_horaria INT NOT NULL,
  modalidade VARCHAR(50) NOT NULL
);

CREATE TABLE instrutores (
  id_instrutor INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  especialidade VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL
);

CREATE TABLE salas (
  id_sala INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  capacidade INT NOT NULL,
  localizacao VARCHAR(150) NOT NULL
);
