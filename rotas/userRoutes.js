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
            if(typeof req.session.mensagem != 'undefined')
                res.render('cadastraCandidato.ejs', { mensagem: req.session.mensagem });
            else
                res.render('cadastraCandidato.ejs', { mensagem: null});
        },  

        anunciante: (req, res) =>{
            if(typeof req.session.mensagem != 'undefined')
                res.render('cadastraAnunciante.ejs', { mensagem: req.session.mensagem });
            else
                res.render('cadastraAnunciante.ejs', { mensagem: null });
        },

        perfil: (req, res) => {
            var id_usuario = req.params.id;
            userController.perfil(req, res, id_usuario)
        },

        editarCadastro: (req, res) => {
            var id_usuario = req.params.id;
            userController.editarCadastro(req, res, id_usuario)            
        },

        confirmaEdit: (req, res) => {
            var id_usuario = req.params.id;
            userController.confirmaEdit(req, res, id_usuario)            
        },

        deletarCadastro: (req, res) => {
            var id_usuario = req.params.id;
            userController.deletarCadastro(req, res, id_usuario) 
        },

        confirmaEditSenha: (req, res) => {
            var id_usuario = req.params.id;
            userController.confirmaEditSenha(req, res, id_usuario)
        },

        confirmaEditInfos: (req, res) => {
            var id_usuario = req.params.id;
            userController.confirmaEditInfos(req, res, id_usuario)
        },

        confirmaEditFoto: (req, res) => {
            var id_usuario = req.params.id;
            userController.confirmaEditFoto(req, res, id_usuario)
        },
 
        error: (req, res) => {
            res.render('error.ejs', {mensagem: "404 error"})
        }
        
    }

module.exports = userRoutes;