
con = require("../config/db.js").pool;
var candidaturaModel = require('../model/candidaturaModel.js')

const candidaturaController = {
        candidatar: (req, res, id_vaga) => {
            if(req.session.loggedin){
                var sql = "SELECT * FROM vaga WHERE id_vaga = "+id_vaga+"";
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    res.render('candidatura.ejs', {logado: req.session.userdata, vagas: result});
                });
            }else{
                res.redirect('/')
            }    
        },

        confirmaCandidatura: function (req, res, id_vaga, id_candidato, status_candidatura) {
            if(req.session.loggedin){
                var sql = "INSERT INTO candidatura (id_vaga, id_usuario, status_candidatura) VALUES ("+id_vaga+","+id_candidato+", '"+status_candidatura+"')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Numero de registros inseridos: " + result.affectedRows);
                    res.redirect('/vagas')
                });
            }else{
                res.redirect('/')
            }    
        }
}

module.exports = candidaturaController;