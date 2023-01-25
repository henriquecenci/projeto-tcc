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

        res.redirect('/usuario/'+id_usuario);
    },
    
    //------------------------------------------------------------------------------------------------------------------------------

    listar: (req, res) => {
        var perPage = 5
        var page = 0

        contagem = "SELECT COUNT(*) as numero FROM vaga";
        var sql = "SELECT usuario.*, vaga.* FROM vaga JOIN usuario ON usuario.id_usuario = vaga.id_usuario WHERE usuario.id_usuario = vaga.id_usuario ORDER BY id_vaga DESC LIMIT ? OFFSET ?;";
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
        var sql = "SELECT usuario.*, vaga.* FROM vaga JOIN usuario ON usuario.id_usuario = vaga.id_usuario WHERE usuario.id_usuario = vaga.id_usuario ORDER BY id_vaga DESC LIMIT ? OFFSET ?;";
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
        var sql = "SELECT usuario.*, vaga.* FROM vaga JOIN usuario ON usuario.id_usuario = vaga.id_usuario WHERE titulo LIKE '%"+pesquisa+"%' AND usuario.id_usuario = vaga.id_usuario ORDER BY id_vaga DESC;"
        
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
                if(req.session.loggedin)
                    res.render('vagas-2.ejs', { vagas: result, logado: req.session.userdata})
                else
                    res.render('vagas-2.ejs', { vagas: result, logado: null})
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------

    filtrar: (req, res, salario, cidade, tipo, turno) => {

        var sql = "SELECT usuario.*, vaga.* FROM vaga JOIN usuario ON usuario.id_usuario = vaga.id_usuario"

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
        }else if(cidade != "todas"){
            sql += " WHERE localizacao = '"+cidade+"'"

            if(cidade != "todas" && turno != "todos"){
                sql += " AND horario_trabalho = '"+turno+"'"
            }
            if(cidade != "todas" && salario != "todos"){
                sql += " AND salario <= "+salario+""
            }

            if(cidade != "todas" && salario != "todos" && turno != "todos"){
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

        sql += " AND usuario.id_usuario = vaga.id_usuario ORDER BY id_vaga DESC;"
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
                if(req.session.loggedin)
                    res.render('vagas-2.ejs', { vagas: result, logado: req.session.userdata})
                else
                    res.render('vagas-2.ejs', { vagas: result, logado: null})
        });
    },

    editarVaga: (req, res, id_vaga) => {
        sql = "SELECT * FROM vaga WHERE id_vaga = "+id_vaga+"";

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
                if(req.session.loggedin)
                    res.render('editarVaga.ejs', { dados: result, logado: req.session.userdata})
                else
                    res.render('error.ejs',  {mensagem: "Ops! Você precisa estar logado para fazer isso."})
        });
    },

    confirmaEdit: (req, res, id_vaga, id_usuario) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            var titulo = fields['titulo']
            var salario = fields['salario']
            var beneficios = fields['beneficios']
            var carga_horaria = fields['carga_horaria']
            var turno = fields['turno']
            var tipo_vaga = fields['tipo_vaga']
            var descricao = fields['descricao']
            var requisitos = fields['requisitos']
            var cidade = fields['cidade']


            sql = "UPDATE vaga SET titulo = '"+titulo+"', salario = "+salario+", beneficios = '"+beneficios+"', localizacao = '"+cidade+"', carga_horaria = '"+carga_horaria+"', horario_trabalho = '"+turno+"', tipo_vaga = '"+tipo_vaga+"', descricao = '"+descricao+"', requisitos = '"+requisitos+"' WHERE id_vaga = "+id_vaga+"";
            
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Numero de registros editados: " + result.affectedRows);
            });
            res.redirect('/usuario/' + id_usuario)
        });
    },

    deletarVaga: (req, res, id_vaga, id_usuario) => {
        sql = "DELETE FROM vaga WHERE id_vaga = "+id_vaga+"";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Numero de registros apagados: " + result.affectedRows);
        });
        res.redirect('/usuario/' + id_usuario)
    }

}

module.exports = vagaController;