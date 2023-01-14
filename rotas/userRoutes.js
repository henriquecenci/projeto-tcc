con = require("../config/db.js").pool;
const userController = require("../controller/userController.js")
    const userRoutes = {
        index: (req, res) => {
            if(req.session.loggedin)	
                res.render('index.ejs', {logado: req.session.userdata});
            else 
                res.render('index.ejs', {logado: null});
        },

        logar: (req, res) => {
            res.render('login.ejs', {mensagem: null});
        },

        candidato: (req, res) =>{
            res.render('cadastraCandidato.ejs');
        },

        anunciante: (req, res) =>{
            res.render('cadastraAnunciante.ejs');
        },

        perfil: (req, res) => {
            var id_anunciante = req.params.id;
            userController.perfil(req, res, id_anunciante)
        },

        cadastro: (req, res) => {
            
        },

        error: (req, res) => {
            res.render('error.ejs', {mensagem: "404 error"})
        }
        
    }

module.exports = userRoutes;