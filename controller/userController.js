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

     perfil: (req, res, id_usuario) => {
        var sql = "SELECT vaga.* FROM vaga JOIN usuario ON usuario.id_usuario = vaga.id_usuario WHERE usuario.id_usuario = "+id_usuario+" AND vaga.id_usuario = "+id_usuario+" ORDER BY id_vaga DESC;";
        var sql2 = "SELECT candidatura.status_candidatura, vaga.titulo, usuario.nome FROM candidatura JOIN vaga ON candidatura.id_vaga = vaga.id_vaga JOIN usuario ON candidatura.id_usuario = usuario.id_usuario WHERE usuario.id_usuario = "+id_usuario+";"

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            con.query(sql2, function (err, result2, fields) {
                if (err) throw err;
                    if(req.session.loggedin)
                        res.render('usuario.ejs', { vagas: result, logado: req.session.userdata, candidaturas: result2 })
                    else
                        res.render('error.ejs', { mensagem: "Ops! Você precisa estar logado para fazer isso!"})
            });
        });
    },

    editarCadastro: (req, res, id_usuario) => {
        var sql ="SELECT * FROM usuario WHERE id_usuario = "+id_usuario+"";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
                if (req.session.loggedin) {
                    res.render('editarCadastro.ejs', { usuario: result, logado: req.session.userdata, mensagem: req.session.mensagem1, mensagemErro: req.session.mensagemErro});
                }else {
                    res.render('error.ejs',  {mensagem: "Ops! Você precisa estar logado para fazer isso."})
                }
        });
    },

    confirmaEditSenha: (req, res, id_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            var senha = fields['senha'];
            
            bcrypt.hash(senha, saltRounds, function (err, hash) {
                var sql = "UPDATE usuario SET senha = ? WHERE id_usuario = ?";
                var values = [hash, id_usuario];
                    
                    con.query(sql, values, function (err, result) {
                        if (err) throw err;
                        console.log("senhas alteradas:" + result.affectedRows +" : "+ senha);
                    });
                });
                req.session.mensagem1 = "Senha alterada com sucesso!"
                res.redirect('/editarCadastro/'+ id_usuario);
            });

    },

    confirmaEditInfos: (req, res, id_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            var nome = fields['nome'];
            var email =  fields['email'];
            
            var sql = "UPDATE usuario SET nome = ?, email = ? WHERE id_usuario = ?";
            var values = [nome, email, id_usuario];
                    
           con.query(sql, values, function (err, result) {
               if (err) throw err;
                console.log("cadastros alterados:" + result.affectedRows + " " + nome + " : " + email);
            });
            req.session.mensagem1 = "Informações alteradas com sucesso!"
            res.redirect('/editarCadastro/'+ id_usuario);
        });

    },

    confirmaEditFoto: (req, res, id_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {

            var oldpath = files.imagem.filepath;
            let extensao = files.imagem.mimetype.split('/')[1]
            if(extensao == "png" || extensao == "jpeg" || extensao == "gif" || extensao == "jpg"){
                var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                img = hash + '.' + files.imagem.mimetype.split('/')[1]
                var newpath = path.join(__dirname, '../public/imagens/', img);
    
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });

                var sql = "UPDATE usuario SET foto_perfil = ? WHERE id_usuario = ?";
                var values = [img, id_usuario]; 
    
                con.query(sql, values, function (err, result) {
                    if (err) throw err;
                     console.log("fotos alteradas:" + result.affectedRows);
                 });
                 req.session.mensagem1 = "Foto de perfil alterada com sucesso!"
                 res.redirect('/editarCadastro/'+ id_usuario);
            } else {
                req.session.mensagemErro = "Apenas imagens são aceitas como foto de perfil."
                res.redirect('/editarCadastro/'+ id_usuario);
            }
        });

    },

    deletarCadastro: (req, res, id_usuario) => {
        sql = "DELETE FROM usuario WHERE id_usuario ="+id_usuario+"";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("cadastros deletados:" + result.affectedRows);
        });

        res.redirect('/')
    }
}


module.exports = userController;