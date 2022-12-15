const formidable = require('formidable');
con = require("../config/db.js").pool;

const vagaController = {
    anunciar: (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            var sql = "INSERT INTO vaga (titulo, salario, beneficios, localizacao, carga_horaria, horario_trabalho, tipo_vaga, descricao, requisitos) VALUES ?";
            var values = [
                [fields['titulo'], fields['salario'], fields['beneficios'], fields['cidade'], fields['carga_horaria'], fields['turno'], fields['tipo_vaga'], fields['descricao'], fields['requisitos']]
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
        var sql = "SELECT * FROM vaga ORDER BY titulo ASC LIMIT ? OFFSET ?"
        con.query(contagem, function (err, result2, fields) {
            if (err) throw err;
            con.query(sql, [perPage, page], function (err, result, fields) {
                if (err) throw err;
                pages = Math.ceil(result2[0]['numero'] / perPage)
                res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages, })
            });
        });
    },

    listarpage: (req, res, page) => {
            var perPage = 5
            var pagea = page * perPage
            contagem = "SELECT COUNT(*) as numero FROM vaga";
            var sql = "SELECT * FROM vaga ORDER BY titulo ASC LIMIT ? OFFSET ?"
            con.query(contagem, function (err, result2, fields) {
                if (err) throw err;
                con.query(sql, [perPage, pagea], function (err, result, fields) {
                    if (err) throw err;
                    pages = Math.ceil(result2[0]['numero'] / perPage)
                    res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages, })
            });
        });
    }
}

module.exports = vagaController;