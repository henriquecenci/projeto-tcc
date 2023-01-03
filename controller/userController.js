const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const path = require('path');
const saltRounds = 10;
const app = express();

con = require("../config/db.js").pool;
const userModel = require("../model/userModel.js");

const userController = {
    

    login: (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err1, fields, files) {
            var senha = fields.senha;
            var email = fields.email;
            
            var sql ="SELECT * FROM usuario where email = '" + email +"'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                if(result.length){
                    bcrypt.compare(senha, result[0]['senha'], function(err, resultado) {
                        if (err) throw err;
                        if (resultado){
                            req.session.loggedin = true;
                            req.session.userdata = result[0];
                            res.redirect('/');
                            res.end();
                        }else{
                            res.render('login.ejs', {mensagem: "senha esta incorreta"});
                            res.end();
                        }
                    });
                }else{
                    res.render('login.ejs', {mensagem: "email esta incorreto",});
                    res.end();
                }
            }); 
        });
    },
    
    //----------------------------------------------------------------------------------

    logout: (req, res) => {
        req.session.destroy(function(err) {  
        })
        res.redirect('/');
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
                userModel.cadastro(fields['nome'], fields['email'], hash, img, tipo_usuario);
            });
        });
        res.redirect('/login');
    },

     //----------------------------------------------------------------------------------
}


module.exports = userController;