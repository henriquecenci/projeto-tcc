const express = require('express');
var session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use( express.static("public") );

app.use(session({ secret: '2C44-4D44-WppQ38S', resave: false, saveUninitialized: true }));

const userController = require("./controller/userController");
const vagaController = require("./controller/vagaController");
const candidaturaController = require("./controller/candidaturaController");
const userRoutes = require("./rotas/userRoutes.js");
const vagaRoutes = require("./rotas/vagaRoutes.js");
const candidaturaRoutes = require('./rotas/candidaturaRoutes');

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
app.get('/usuario/:id', function(req, res){
    userRoutes.perfil(req, res);
});

//editar cadsatro--------------------------------
app.get('/editarCadastro/:id', function(req, res){
    userRoutes.editarCadastro(req, res);
});

app.post('/editarSenha/:id', function(req, res){
    userRoutes.confirmaEditSenha(req, res);
});

app.post('/editarInfos/:id', function(req, res){
    userRoutes.confirmaEditInfos(req, res);
});

app.post('/editarFoto/:id', function(req, res){
    userRoutes.confirmaEditFoto(req, res);
});

//deletar cadsatro-------------------------------
app.get('/deletarCadastro/:id', function(req, res){
    userRoutes.deletarCadastro(req, res);
});

//listar-----------------------------------------
app.get('/vagas', function(req, res){
    vagaRoutes.vagas(req, res);
});

app.get('/vagas/:page', function(req, res){
    vagaRoutes.vagaPage(req, res);
});

app.get('/vagas-search', function(req, res){
    vagaRoutes.pesquisa(req, res);
});

app.get('/vagas-filter', function(req, res){
    vagaRoutes.filtro(req, res);
});

//listar candidaturas--------------------------
app.get('/listarCandidaturas/:idvaga', function (req, res) {
    candidaturaRoutes.listarCandidaturas(req, res)
});

app.get('/cancelarCandidatura/:id/:idvaga', function (req, res) {
    candidaturaRoutes.cancelarCandidatura(req, res)
});

app.get('/aprovarCandidatura/:id/:idvaga', function (req, res) {
    candidaturaRoutes.aprovarCandidatura(req, res)
});

app.get('/emAndamento/:id/:idvaga', function (req, res) {
    candidaturaRoutes.reverCandidatura(req, res)
});

//Editar vaga ---------------------------------
app.get('/editarVaga/:id', function(req, res){
    vagaRoutes.editarVaga(req, res)
});

app.post('/editarVaga/:id/:iduser', function(req, res){
    vagaRoutes.confirmaEdit(req, res)
});

//Editar vaga ---------------------------------
app.get('/deletarVaga/:id/:iduser', function(req, res){
    vagaRoutes.deletarVaga(req, res)
});

//candidatura ---------------------------------
app.get('/candidatura/:id', function (req, res) {
    candidaturaRoutes.candidatura(req, res)
});

app.post('/candidatura/:idvaga/:idusuario', function(req, res){
    candidaturaRoutes.confirmarCandidatura(req, res)
});

//excluir candidaturas--------------------------
app.get('/excluirCandidatura/:id', function (req, res) {
    candidaturaRoutes.excluirCandidatura(req, res)
});

//error --------------------------------------

app.get('/error', function(req, res){
    userRoutes.error(req, res);
});

//-----------------------------------------------
app.listen(80, function () {
    console.log("Servidor executando na porta 80");
});