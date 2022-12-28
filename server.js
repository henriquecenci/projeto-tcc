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
const candidaturaController = require("./controller/candidaturaController");
const userRoutes = require("./rotas/userRoutes.js");
const vagaRoutes = require("./rotas/vagaRoutes.js");

con = require("./config/db.js").pool;

//index-----------------------------------------
app.get('/', function (req, res) {
    userRoutes.index(req, res);
});

//login-----------------------------------------
app.get('/login', function (req, res) {
    userRoutes.logar(req, res);
});

app.post('/login', function (req, res) {
    userController.login(req,res);
});

//cadastro candidato----------------------------
app.get('/candidato', function (req, res) {
    userRoutes.candidato(req, res);
});

app.post('/candidato', function (req, res) {
    userController.cadastro(req, res, "candidato");
});

//cadastro anunciante----------------------------
app.get('/anunciante', function (req, res) {
    userRoutes.anunciante(req, res);
});

app.post('/anunciante', function (req, res) {
    userController.cadastro(req, res, "anunciante");
});

//logout----------------------------------------
app.get('/logout',function(req,res){
    userController.logout(req, res);
});

//anunciar Vaga---------------------------------
app.get('/anunciar', function (req, res) {
    vagaRoutes.anunciarVaga(req, res);
});

app.post('/anunciar/:id', function(req, res){
    var id_usuario = req.params.id;
    vagaController.anunciar(req, res, id_usuario);
});

//usuario----------------------------------------
app.get('/usuario', function(req, res){
    userRoutes.perfil(req, res);
});

//listar----------------------------------------
app.get('/vagas', function(req, res){
    vagaController.listar(req, res, 0);
});

app.get('/vagas/:page', function(req, res){
    var page = parseInt(req.params.page) -1
    vagaController.listarpage(req, res, page); 
});

app.get('/vagas/:', function(req, res){
    var pesquisa = req.params;
    vagaController.pesquisa(req, res, pesquisa); 
});

//candidatura ---------------------------------
app.get('/candidatura', function (req, res) {
    res.render('candidatura.ejs');
});

app.post('/candidatura', function(req, res){
    candidaturaController.candidatura(req, res);
});
//-----------------------------------------------
app.listen(80, function () {
    console.log("Servidor executando na porta 80");
});