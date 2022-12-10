const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const path = require('path');
const saltRounds = 10;
const app = express();

con = require("../config/db.js").pool;

const userController = {
    login: (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err1, fields, files) {
            var senha = fields.senha;
            var sql = "SELECT * FROM usuario where email = '" + fields.email + "'";

            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result.length) {
                    bcrypt.compare(senha, result[0]['senha'], function (err, resultado) {
                        if (err) throw err;
                        if (resultado) {

                            req.session.loggedin = true;
                            req.session.username = result[0]['nome'];
                            res.redirect('/usuario');

                        } else {
                            res.render('login.ejs', { mensagem: "senha esta incorreta" });

                        }
                    });
                } else {
                    res.render('login.ejs', { mensagem: "email esta incorreto", });

                }
            });
        });
    },

    //----------------------------------------------------------------------------------

    cadastro: (req, res, tipo_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let img = null;

            if(files.imagem.size > 0){
                var oldpath = files.imagem.filepath;
                var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                img = hash + '.' + files.imagem.mimetype.split('/')[1]
                var newpath = path.join(__dirname, '../public/imagens/', img);
    
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });
            }

            bcrypt.hash(fields['senha'], saltRounds, function (err, hash) {
                var sql = "INSERT INTO usuario (nome, email, senha, foto_perfil, tipo_usuario) VALUES ?";
                var values = [
                    [fields['nome'], fields['email'], hash, img, tipo_usuario]
                ];
                con.query(sql, [values], function (err, result) {
                    if (err) throw err;
                    console.log("Numero de registros inseridos: " + result.affectedRows);
                });
            });
        });
        res.redirect('/login');
    }
}


module.exports = userController;