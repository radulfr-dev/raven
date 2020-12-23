function Authentication(){
    function checkUserIsAuthorized(req, res, next){

        if(!req.session.user && !process.env.DEV) return res.redirect('/login');

        next();

    }
    return { checkUserIsAuthorized };
}

module.exports = Authentication();
