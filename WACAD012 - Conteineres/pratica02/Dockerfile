FROM ubuntu: latest
RUN apt-get update
RUN apt-get install -y nginx
ARG PORTA_ARG
EXPOSE $(PORTA_ARG)

"SQL FILE"
	CREATE SCHEMA IF NOT EXISTS webacademy;

	USE webacademy;

	CREATE TABLE IF NOT EXISTS webacademy_alunos (
	   id BIGINT PRIMARY KEY AUTO_INCREMENT,
	   nome VARCHAR(180) NOT NULL
	);

	SHOW TABLES;
