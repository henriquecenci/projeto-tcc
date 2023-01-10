
con = require("../config/db.js").pool;

// anunciante = "SELECT usuario.nome FROM usuario JOIN vaga ON vaga.id_usuario = usuario.id_usuario WHERE vaga.id_usuario = usuario.id_usuario;";

module.exports = {
    cadastro: function (nome, email, hash, img, tipo_usuario) {
        var sql = "INSERT INTO usuario (nome, email, senha, foto_perfil, tipo_usuario) VALUES ?";
        var values = [
            [nome, email, hash, img, tipo_usuario]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Numero de registros inseridos: " + result.affectedRows);
        });
    },

    login: function(senha, email){
        const bcrypt = require('bcrypt');
 
    },

    perfil: function(res, id_usuario){

    }
}