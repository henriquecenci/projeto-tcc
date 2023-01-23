
con = require("../config/db.js").pool;

var vagaController = require('../controller/vagaController.js')
    const vagaRoutes = {
        anunciarVaga: (req, res) => {
            if(req.session.loggedin)
                res.render('anunciarVaga.ejs', {logado: req.session.userdata});
            else
                res.render("error.ejs", {mensagem: "Ops! Você precisa estar logado para fazer isso."});
        },

        vagas: (req, res) => {
            vagaController.listar(req, res, 0);
        },

        vagaPage: (req, res) => {
            var page = parseInt(req.params.page) -1
            vagaController.listarpage(req, res, page);   
        },

        pesquisa: (req, res) => {
            let pesquisa = req.query.pesquisa;
            vagaController.pesquisa(req, res, pesquisa);
        },

        filtro: (req, res) => {
            let salario = req.query.salario;
            let cidade = req.query.cidade;
            let tipo = req.query.tipo;
            let turno = req.query.turno;

            vagaController.filtrar(req, res, salario, cidade, tipo, turno);
        },

        editarVaga: (req, res) => {
            let id_vaga = req.params.id;

            vagaController.editarVaga(req, res, id_vaga);
        },

        confirmaEdit: (req, res) => {
            let id_vaga = req.params.id;
            let id_usuario = req.params.iduser;
            vagaController.confirmaEdit(req, res, id_vaga, id_usuario);
        },
    }

module.exports = vagaRoutes;