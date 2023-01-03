const formidable = require('formidable');
const vagaModel = require('../model/vagaModel.js');
con = require("../config/db.js").pool;

const vagaController = {
    anunciar: (req, res, id_usuario) => {
        if(req.session.loggedin){
            var form = new formidable.IncomingForm();
            form.parse(req, (err, fields) => {
                vagaModel.anunciar(fields['titulo'], fields['salario'], fields['beneficios'], 
                fields['cidade'], fields['carga_horaria'], fields['turno'], fields['tipo_vaga'], 
                fields['descricao'], fields['requisitos'], id_usuario);
            });
            res.redirect('/vagas');
        }else{
            res.redirect("/login");
        }
    },
    
    //------------------------------------------------------------------------------------------------------------------------------

    listar: (req, res) => {
        var perPage = 5
        var page = 0

        contagem = "SELECT COUNT(*) as numero FROM vaga";
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
        var page = page * perPage

        contagem = "SELECT COUNT(*) as numero FROM vaga";
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
        var perPage = 5
        var page = 0

        contagem = "SELECT COUNT(*) as numero FROM vaga";
        var sql = "SELECT * FROM vaga WHERE titulo LIKE '%"+pesquisa+"%' ORDER BY id_vaga DESC LIMIT ? OFFSET ?"
        con.query(contagem, function (err, result2, fields) {
            if (err) throw err;
            con.query(sql, [perPage, page], function (err, result, fields) {
                if (err) throw err;
                pages = Math.ceil(result2[0]['numero'] / perPage)
                res.render('vagas-search.ejs', { vagas: result, current: page + 1, pages: pages})
            });
        });
    }

    //------------------------------------------------------------------------------------------------------------------------------

}

module.exports = vagaController;