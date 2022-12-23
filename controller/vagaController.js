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

    listar: (req, res, id_vaga) => {
        let sql = "SELECT * FROM vaga ORDER BY id_vaga DESC";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.render('vagas.ejs', { vagas: result, teste: id_vaga});
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------
    
    detalhar: (req, res, id_vaga) => {
        let sql = "SELECT * FROM vaga ORDER BY id_vaga DESC";
        let detalhamento = "SELECT * FROM vaga WHERE id_vaga = ?";
        con.query(detalhamento, id_vaga, function (err, result2, fields) {
            if (err) throw err;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.render('vagas.ejs', { vagas: result, teste: id_vaga, detalhamento: result2 });
            });
        });
    }
}

module.exports = vagaController;