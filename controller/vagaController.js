const formidable = require('formidable');
con = require("../config/db.js").pool;

const vagaController = {
    anunciar: (req, res, id_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            var sql = "INSERT INTO vaga (titulo, salario, beneficios, localizacao, carga_horaria, horario_trabalho, tipo_vaga, descricao, requisitos, id_usuario) VALUES ?";
            var values = [
                [fields['titulo'], fields['salario'], fields['beneficios'], fields['cidade'], fields['carga_horaria'], fields['turno'], fields['tipo_vaga'], fields['descricao'], fields['requisitos'], id_usuario]
            ];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("Numero de registros inseridos: " + result.affectedRows);
            });
        });
        res.redirect('/vagas');
    },
    
    //------------------------------------------------------------------------------------------------------------------------------

    listar: (req, res) => {
        var perPage = 5
        var page = 0

        contagem = "SELECT COUNT(*) as numero FROM vaga";
        // anunciante = "SELECT usuario.nome FROM usuario JOIN vaga ON vaga.id_usuario = usuario.id_usuario WHERE vaga.id_usuario = usuario.id_usuario;";
        var sql = "SELECT * FROM vaga ORDER BY id_vaga DESC LIMIT ? OFFSET ?"
        con.query(contagem, function (err, result2, fields) {
            if (err) throw err;
            con.query(sql, [perPage, page], function (err, result, fields) {
                if (err) throw err;
                pages = Math.ceil(result2[0]['numero'] / perPage)
                res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages})
            });
        });
    },

    listarpage: (req, res, page) => {
            var perPage = 5
            var pagea = page * perPage

            contagem = "SELECT COUNT(*) as numero FROM vaga";
            // anunciante = "SELECT usuario.nome FROM usuario JOIN vaga ON vaga.id_usuario = usuario.id_usuario WHERE vaga.id_usuario = usuario.id_usuario;";
            var sql = "SELECT * FROM vaga ORDER BY id_vaga DESC LIMIT ? OFFSET ?"
            con.query(contagem, function (err, result2, fields) {
                if (err) throw err;
                con.query(sql, [perPage, page], function (err, result, fields) {
                    if (err) throw err;
                    pages = Math.ceil(result2[0]['numero'] / perPage)
                    res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages})
                });
            });
    },

    //------------------------------------------------------------------------------------------------------------------------------

    pesquisa: (req, res, pesquisa) => {
  
    },

    //------------------------------------------------------------------------------------------------------------------------------

}

module.exports = vagaController;