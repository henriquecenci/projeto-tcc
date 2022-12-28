const formidable = require('formidable');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

con = require("../config/db.js").pool;

const candidaturaController = {
    candidatura: (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
                var oldpath = files.imagem.filepath;
                var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                curriculo = hash + '.' + files.imagem.mimetype.split('/')[1]
                var newpath = path.join(__dirname, '../public/curriculo/', curriculo);
    
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });

                var sql = "INSERT INTO candidatura (curriculo) VALUES ?";
                var values = [
                    [fields['curriculo']]
                ];
                con.query(sql, [values], function (err, result) {
                    if (err) throw err;
                    console.log("Numero de registros inseridos: " + result.affectedRows);
                });
            });
        res.redirect('/vagas');
    }
}

module.exports = candidaturaController;