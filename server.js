const express = require('express');
var session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use( express.static("public") );

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));

const userController = require("./controller/userController");
const vagaController = require("./controller/vagaController");

con = require("./config/db.js").pool;

//index-----------------------------------------
app.get('/', function (req, res) {
	if(req.session.loggedin)	
        res.render('index.ejs', {logado: req.session.userdata});
	else 
        res.render('index.ejs', {logado: null});
});

//login-----------------------------------------
app.get('/login', function (req, res) {
    res.render('login.ejs', {mensagem: null});
});

app.post('/login', function (req, res) {
    userController.login(req,res);
});

//cadastro candidato----------------------------
app.get('/candidato', function (req, res) {
    res.render('cadastraCandidato.ejs');
});

app.post('/candidato', function (req, res) {
    userController.cadastro(req, res, "candidato");
});

//cadastro anunciante----------------------------
app.get('/anunciante', function (req, res) {
    res.render('cadastraAnunciante.ejs');
});

app.post('/anunciante', function (req, res) {
    userController.cadastro(req, res, "anunciante");
});

//logout----------------------------------------
app.get('/logout',function(req,res){
    req.session.destroy(function(err) {  
})
    res.redirect('/');
});

//anunciar Vaga---------------------------------
app.get('/anunciar', function (req, res) {
    res.render('anunciarVaga.ejs');
});

app.post('/anunciar', function(req, res){
    vagaController.anunciar(req, res);
});

//usuario----------------------------------------
app.get('/usuario', function(req, res){
    if(req.session.loggedin)	
        res.render('usuario.ejs', {logado: req.session.userdata});
	else 
        res.render('usuario.ejs', {logado: null});
});

//listar----------------------------------------
app.get('/vagas', function(req, res){
    vagaController.listar(req, res, 0);
});

app.get('/vagas/:page', function(req, res){
    var page = parseInt(req.params.page) -1
    vagaController.listarpage(req, res, page);      
});
//-----------------------------------------------
app.listen(80, function () {
    console.log("Servidor executando na porta 80");
});