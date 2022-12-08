const express = require('express');
var session = require('express-session');
const mysql = require('mysql');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use( express.static("public") );

const userController = require("./controller/userController");
const vagaController = require("./controller/vagaController");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tcc"
  });

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));


//index-----------------------------------------
app.get('/', function (req, res) {
    var nome
	if(req.session.username)	
		nome = req.session.username;
	else 
		nome = null;
    res.render('index.ejs', {usuario: nome});
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
    res.redirect('/login');
});

//anunciar Vaga---------------------------------
app.get('/anunciar', function (req, res) {
    res.render('anunciarVaga.ejs');
});

app.post('/anunciar', function(req, res){
    vagaController.anunciar (req, res);
});

//-----------------------------------------------
app.listen(80, function () {
    console.log("Servidor executando na porta 80");
});