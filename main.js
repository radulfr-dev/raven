require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const ravenDb = require('./database/database.js');
const authentication = require('./middleware/authentication.js');

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

app.get('/', authentication.checkUserIsAuthorized, function(req, res){
    res.render('index');
});

app.get('/login', function(req, res){
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('login');
    }
});

app.get('/logout', function(req, res){
    if(req.session.user){
        delete req.session.user;
    }
    res.redirect('/login');
    
});

app.get('/register', function(req, res){
    if(req.session.user && req.session.user['role'] === 'admin'){
        res.render('register');
    }
    if(req.session.user && req.session.user['role'] === 'normal'){
        res.redirect('/');
    }
    if(!req.session.user){
        res.redirect('/login');
    }
});

app.post('/login', async function(req, res){
    const username = req.body.username;
    const usernameMatches = await ravenDb.checkDatabaseForUsername(username);

    if(usernameMatches.length === 0){
        return res.status(400).send('Cannot find user');
    }
    
    const user = {
        username: usernameMatches[0].username,
        password: usernameMatches[0].password,
        role: usernameMatches[0].role,
        email: usernameMatches[0].email,
        timeRegistered: usernameMatches[0]['time_registered'],
        lastLogin: usernameMatches[0]['last_login'],
        authorized: usernameMatches[0].authorized
    };

    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            req.session.user = user;
            res.redirect('/');
        }else{
            res.send('Not Allowed');
        }
    }catch(err){
        console.log(err);
        res.status(500).send();
    }


});

app.post('/register', async function(req, res){
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            email: req.body.email
        }
        ravenDb.addUserToDatabase(user);
        res.redirect('/login');
    }catch(err){
        console.log(err);
        res.redirect('/register');
    }
});

app.listen(3000, function(){
    console.log('Server is live on 3000');
});
