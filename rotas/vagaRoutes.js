con = require("../config/db.js").pool;
var vagaController = require('../controller/vagaController.js')
    const vagaRoutes = {
        anunciarVaga: (req, res) => {
            if(req.session.loggedin)
                res.render('anunciarVaga.ejs', {logado: req.session.userdata});
            else
                res.redirect('/login');
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
    }

module.exports = vagaRoutes;