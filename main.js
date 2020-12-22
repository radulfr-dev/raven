require('dotenv').config();
const express = require('express');
const app = express();
const ravenDb = require('./database/database.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}));

app.use(express.json());

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
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.post('/register', async function(req, res){
    try {
        //const hashedPassword = async bcrypt.hash(req.body.password, 10);
        // TODO: Add user to database here
        //
        console.log(req.body);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            email: req.body.email
        }
        res.redirect('/login');
    }catch(err){
        console.log(err);
        res.redirect('/register');
    }
});

app.listen(3000, function(){
    console.log('Server is live on 3000');
});
