
con = require("../config/db.js").pool;

module.exports = {
    anunciar: function(titulo, salario, beneficios, cidade, carga_horaria, turno, tipo_vaga, descricao, requisitos, id_usuario){
        var sql = "INSERT INTO vaga (titulo, salario, beneficios, localizacao, carga_horaria, horario_trabalho, tipo_vaga, descricao, requisitos, id_usuario) VALUES ?";
        var values = [
            [titulo, salario, beneficios, cidade, carga_horaria, turno, tipo_vaga, descricao, requisitos, id_usuario]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Numero de registros inseridos: " + result.affectedRows);
        });
    },

    listar: function(){
  
    },

    listarPage: function(page, perPage){

    }
}