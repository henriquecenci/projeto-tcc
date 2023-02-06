var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tcc"
});

con.connect(function (err) {
  if (err) throw err;
  var sql = "CREATE TABLE usuario (id_usuario INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(20) NOT NULL, email VARCHAR(30) UNIQUE NOT NULL, senha VARCHAR(255) NOT NULL, foto_perfil VARCHAR(255), tipo_usuario VARCHAR(10) NOT NULL)";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabela usuario criada");
  });

  if (err) throw err;
  var sql3 = "INSERT INTO usuario VALUES (21, 'FinTECH', 'fin@tech.com', '123', null, 'anunciante')";

  con.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Usuario inserido");
  });

  if (err) throw err;
  var sql = "CREATE TABLE vaga (id_vaga INT AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR(50) NOT NULL, salario INT NOT NULL, beneficios VARCHAR(50) NOT NULL, localizacao VARCHAR(50) NOT NULL, carga_horaria INT NOT NULL, horario_trabalho VARCHAR(50) NOT NULL, tipo_vaga VARCHAR(30) NOT NULL, descricao VARCHAR(255) NOT NULL, requisitos VARCHAR(255) NOT NULL, id_usuario INT REFERENCES usuario (id_usuario))";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabela vaga criada");
  });

  if (err) throw err;
  var sql1 = "INSERT INTO vaga VALUES (1, 'Programador estagiario web', 900, 'Vale transporte + Vale Refeição', 'Gravataí - RS', 5, 'Manhã', 'Estágio', 'Atuar como desenvolvedor web e efetuar manutenções nas aplicações ja existentes', 'saber logica de programação, saber php, css, html e javascript', 21)";

  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Cadastro inseridos");
  });

  if (err) throw err;
  var sql = "CREATE TABLE candidatura (id_candidatura INT AUTO_INCREMENT PRIMARY KEY, curriculo VARCHAR(255) NOT NULL, status_candidatura VARCHAR(20) NOT NULL, id_usuario INT REFERENCES usuario (id_usuario), id_vaga INT REFERENCES vaga (id_vaga))";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabela candidatura criada");
  });
  con.end();
});