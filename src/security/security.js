const auth = require('../authentication')

module.exports = function checkAuth(){

    function middleware(req, res, next){
        auth.checkToken.confirmToken(req)
        next();
    }

    return middleware;
}