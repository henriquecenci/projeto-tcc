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
            if(req.session.loggedin)	
                res.render('usuario.ejs', {logado: req.session.userdata});
            else 
                res.redirect('/');
        },
        
    }

module.exports = userRoutes;