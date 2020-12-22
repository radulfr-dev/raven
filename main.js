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

app.get('/', authenticateToken, function(req, res){
    res.render('index');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/register', function(req, res){
    res.render('register');
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
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            //res.json({ accessToken: accessToken });
            res.cookie('auth', accessToken, { httpOnly: true, secure: false });
            res.redirect('/');
        }else{
            res.send('Not Allowed');
        }
    }catch(err){
        console.log(err);
        res.status(500).send();
    }


});

function authenticateToken(req, res, next){

    const token = req.cookies['auth'];
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

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
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
