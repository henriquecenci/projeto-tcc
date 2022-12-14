var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tcc"
});

con.connect(function (err) {
  if (err) throw err;
  var sql = "CREATE TABLE usuario (id_usuario INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(20) NOT NULL, email VARCHAR(30) NOT NULL, senha VARCHAR(255) NOT NULL, foto_perfil VARCHAR(255), tipo_usuario VARCHAR(10) NOT NULL)";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabela usuario criada");
  });

  if (err) throw err;
  var sql = "CREATE TABLE vaga (id_vaga INT AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR(50) NOT NULL, salario INT NOT NULL, beneficios VARCHAR(50), localizacao VARCHAR(50), carga_horaria INT NOT NULL, horario_trabalho VARCHAR(30), tipo_vaga VARCHAR(30) NOT NULL, descricao VARCHAR(255) NOT NULL, requisitos VARCHAR(255) NOT NULL, id_usuario INT REFERENCES usuario (id_usuario))";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabela vaga criada");
  });

  if (err) throw err;
  var sql = "CREATE TABLE candidatura (id_candidatura INT AUTO_INCREMENT PRIMARY KEY, curriculo VARCHAR(255) NOT NULL, status_candidatura VARCHAR(20), id_usuario INT REFERENCES usuario (id_usuario), id_vaga INT REFERENCES vaga (id_vaga))";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabela candidatura criada");
  });
  con.end();
});