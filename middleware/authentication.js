const ravenDb = require('../database/database.js');
const bcrypt = require('bcrypt');

function Authentication(){

    function checkUserIsAuthorized(req, res, next){

        console.log(req.session.user);
        console.log(process.env.DEV);
        console.log(!req.session.user && !process.env.DEV);

        if(!req.session.user) return res.redirect('/login');

            res.locals.userInfo = {
                username: req.session.user['username'],
                role: req.session.user['role']
            };

        next();

    }

    function checkUserIsAdmin(req, res, next){

        if(!req.session.user) return res.redirect('/login');

        if(req.session.user['role'] === 'normal') return res.redirect('/');

        next();
    }

    function logoutUser(req, res, next){
        if(req.session.user) delete req.session.user;
        next();
    }

    function redirectIfLoggedIn(req, res, next){
        if(req.session.user) return res.redirect('/');
        next();
    }

    async function loginUser(req, res, next){

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
                next();
            }else{
                res.send('Not Allowed');
            }
        }catch(err){
            console.log(err);
            res.status(500).send();
        }


    }

    async function registerUser(req, res, next){

        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = {
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role,
                email: req.body.email
            }
            let databaseResponse = await ravenDb.addUserToDatabase(user);
            console.log('databaseResponse');
            console.log(databaseResponse);
            next();
        }catch(err){
            let errorString = encodeURIComponent(err.message);
            res.redirect('/register?error=true&message=' + errorString);
        }
    }

    return { checkUserIsAuthorized, checkUserIsAdmin, logoutUser, redirectIfLoggedIn, loginUser, registerUser };

}

module.exports = Authentication();
