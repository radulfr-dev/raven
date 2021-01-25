require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const ravenDb = require('./database/database.js');
const authentication = require('./middleware/authentication.js');

const OrdersController = require('./controllers/ordersController.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Routes
// ===============
// GET

app.get('/', authentication.checkUserIsAuthorized, function(req, res){
    res.render('index');
});

app.get('/login', authentication.redirectIfLoggedIn, function(req, res){
    res.render('login');
});

app.get('/logout', authentication.logoutUser, function(req, res){
    res.redirect('/login');
});

app.get('/register', authentication.checkUserIsAdmin, function(req, res){
    res.locals.errorQueries = {
        query: req.query
    };
    res.render('register');
});

app.get('/top-up', authentication.checkUserIsAuthorized, function(req, res){
    res.render('top-up');
});

// Routes
// ===============
// POST

app.post('/login', authentication.loginUser, function(req, res){
    res.redirect('/');
});

app.post('/register', authentication.registerUser, function(req, res){
    res.redirect('/login');
});

app.post('/top-up-form', function(req, res){
    OrdersController.processAsgardianTopUp(req.body);
});

// Start server
// ===========================

app.listen(3000, function(){
    console.log('Server is live on 3000');
});
