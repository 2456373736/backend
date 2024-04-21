const jwt = require('jsonwebtoken');
const secrectSalt = 'ananyakaprojecthai123@#$'

function setUser(user){
    return jwt.sign({ user }, secrectSalt);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secrectSalt);
    }
    catch(error){
        return error;
    }
}

module.exports = {
    setUser,
    getUser,
};