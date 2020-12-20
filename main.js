const express = require('express');
const app = express();
const ravenDb = require('./database/database.js');
//const bcrypt = require('bcrypt');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/login', function(req, res){

});

app.post('/register', async function(req, res){
    try {
        //const hashedPassword = async bcrypt.hash(req.body.password, 10);
        // TODO: Add user to database here

        res.redirect('/login');
    }catch{
        res.redirect('/register');
    }
});

app.listen(3000, function(){
    console.log('Server is live on 3000');
});
