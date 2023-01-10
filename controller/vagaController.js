const formidable = require('formidable');
const vagaModel = require('../model/vagaModel.js');
con = require("../config/db.js").pool;

const vagaController = {
    anunciar: (req, res, id_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {

            vagaModel.anunciar(fields['titulo'], fields['salario'], fields['beneficios'], 
            fields['cidade'], fields['carga_horaria'], fields['turno'], fields['tipo_vaga'], 
            fields['descricao'], fields['requisitos'], id_usuario);
            });

        res.redirect('/usuario');
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
                    if(req.session.loggedin)
                        res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages, logado: req.session.userdata})
                    else
                        res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages, logado: null})
            });
        });
    },

    listarpage: (req, res, page) => {
        var perPage = 5
        var page = page * perPage

        contagem = "SELECT COUNT(*) as numero FROM vaga";
        var sql = "SELECT * FROM vaga ORDER BY id_vaga ASC LIMIT ? OFFSET ?"
        con.query(contagem, function (err, result2, fields) {
            if (err) throw err;
            con.query(sql, [perPage, page], function (err, result, fields) {
                if (err) throw err;
                pages = Math.ceil(result2[0]['numero'] / perPage)
                    if(req.session.loggedin)
                        res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages, logado: req.session.userdata})
                    else
                        res.render('vagas.ejs', { vagas: result, current: page + 1, pages: pages, logado: null})
            });
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------

    pesquisa: (req, res, pesquisa) => {
        var sql = "SELECT * FROM vaga WHERE titulo LIKE '%"+pesquisa+"%' ORDER BY id_vaga DESC"
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
                if(req.session.loggedin)
                    res.render('vagas-search.ejs', { vagas: result, logado: req.session.userdata})
                else
                   res.render('vagas-search.ejs', { vagas: result, logado: null})
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------

    filtrar: (req, res, salario, cidade, tipo, turno) => {

        var sql = "SELECT * FROM vaga"

        if(tipo != "todos"){
            sql += " WHERE tipo_vaga = '"+tipo+"'"

            if(tipo != "todos" && cidade != "todas"){
                sql += " AND localizacao = '"+cidade+"'"
            }
            if(tipo != "todos" && turno != "todos"){
                sql += " AND horario_trabalho = '"+turno+"'"
            }
            if(tipo != "todos" && salario != "todos"){
                sql += " AND salario <= "+salario+""
            }


            if(tipo != "todos" && cidade != "todas" && turno != "todos"){
                sql += " AND localizacao = '"+cidade+"' AND horario_trabalho = '"+turno+"'"
            }
            if(tipo != "todos" && cidade != "todas" && salario != "todos"){
                sql += " AND localizacao = '"+cidade+"' AND salario <= "+salario+""
            }
            if(tipo != "todos" && salario != "todos" && turno != "todos"){
                sql += " AND salario <= "+salario+" AND horario_trabalho = '"+turno+"'"
            } 
        }else if(cidade != "todos"){
            sql += " WHERE localizacao = '"+cidade+"'"

            if(cidade != "todos" && turno != "todos"){
                sql += " AND horario_trabalho = '"+turno+"'"
            }
            if(cidade != "todos" && salario != "todos"){
                sql += " AND salario <= "+salario+""
            }

            if(cidade != "todos" && salario != "todos" && turno != "todos"){
                sql += " AND salario <= "+salario+" AND horario_trabalho = '"+turno+"'"
            } 
        }else if(salario != "todos"){
            sql += " WHERE salario <= "+salario+""

            if(salario != "todos" && turno != "todos"){
                sql += " AND salario <= "+salario+""
            }
        }else if(turno != "todos"){
            sql += " WHERE horario_trabalho = '"+turno+"'"
        }

        sql += " ORDER BY id_vaga DESC"
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
                if(req.session.loggedin)
                    res.render('vagas-filter.ejs', { vagas: result, logado: req.session.userdata})
                else
                   res.render('vagas-filter.ejs', { vagas: result, logado: null})
        });
    },
}

module.exports = vagaController;