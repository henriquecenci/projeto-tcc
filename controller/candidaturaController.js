const formidable = require('formidable');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

con = require("../config/db.js").pool;
var candidaturaModel = require('../model/candidaturaModel.js')

const candidaturaController = {
        candidatar: (req, res, id_vaga) => {
            if(req.session.loggedin){
                var sql = "SELECT * FROM vaga WHERE id_vaga = "+id_vaga+"";
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    if(typeof req.session.mensagem != 'undefined')
                        res.render('candidatura.ejs', {logado: req.session.userdata, vagas: result, mensagem: req.session.mensagem});
                    else 
                        res.render('candidatura.ejs', {logado: req.session.userdata, vagas: result, mensagem: null});
                });
            }else{
                res.render("error.ejs", {mensagem: "Ops! Você precisa estar logado para fazer isso."});
            }    
        },

        confirmaCandidatura: function (req, res, id_vaga, id_candidato, status_candidatura) {
            if(req.session.loggedin){
                var form = new formidable.IncomingForm();
                form.parse(req, function (err1, fields, files) {
                    var oldpath = files.curriculo.filepath;
                    let extensao = files.curriculo.mimetype.split('/')[1]
                    if(extensao == "pdf"){
                        var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                        var file = hash +'.'+files.curriculo.mimetype.split('/')[1]
                        var newpath = path.join(__dirname, '../public/curriculos', file);
                        
                        fs.rename(oldpath, newpath, function (err) {
                            if (err) throw err;
                        });

                        var sql2 = "SELECT * FROM vaga WHERE id_vaga = "+id_vaga+"";
                        var sql = "INSERT INTO candidatura (curriculo, id_vaga, id_usuario, status_candidatura) VALUES ('"+file+"', "+id_vaga+","+id_candidato+", '"+status_candidatura+"')";
                    
                        con.query(sql2, function (err, result2) {
                        if (err) throw err;
                            con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Numero de registros inseridos: " + result.affectedRows);
                                res.render('confirmaCandidatura.ejs', {vaga: result2, logado: req.session.userdata})
                            });
                        });
                    }else{
                        req.session.mensagem = "Apenas arquivos .PDF são aceitos."
                        res.redirect('/candidatura/' + id_vaga)
                    }
                });   
            }else{
                res.render("error.ejs", {mensagem: "Ops! Você precisa estar logado para fazer isso."});
            }    
        },

        listarCandidatura: (req, res, id_vaga) => {
            var sql = "SELECT * FROM candidatura JOIN vaga ON candidatura.id_vaga = vaga.id_vaga JOIN usuario ON candidatura.id_usuario = usuario.id_usuario WHERE candidatura.id_vaga = "+id_vaga+";";
            
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                if(req.session.loggedin)
                    res.render('listarCandidaturas.ejs', {logado: req.session.userdata, candidaturas: result});
                else 
                    res.render('error.ejs', {mensagem: "Ops! Você precisa estar logado para fazer isso."});
            });
        },

        cancelarCandidatura: (req, res, id_candidarura, id_vaga) => {
            var sql = "DELETE FROM candidatura WHERE id_candidatura = "+id_candidarura+""
            
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("registro apagado?" + result.affectedRows);
            });
            res.redirect('/listarCandidaturas/' + id_vaga);
        },

        aprovaCandidatura: (req, res, id_candidatura, id_vaga) =>{
            var sql = "UPDATE candidatura SET status_candidatura = 'aprovado' WHERE id_candidatura ="+id_candidatura+""

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("registro apagado?" + result.affectedRows);
            });
            res.redirect('/listarCandidaturas/' + id_vaga);
        }
}

module.exports = candidaturaController;












