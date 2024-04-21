const { getUser } = require('../services/auth');

async function restrictToLoggedInUserOnly(req, res, next){
    const token = req.cookies?.token;
    const requestedUrl = req.originalUrl;
    if(requestedUrl === '/user/login' || requestedUrl === '/user/signup'){
        return next();
    }
    if(!token) return res.redirect('/user/login');
    const user = getUser(token);
    if(!user) return res.redirect('/user/login');
    req.user = user.user;
    return next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}