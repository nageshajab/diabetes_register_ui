exports.getSessionToken = function (req) {
    var sessiontoken ='';
    if (typeof req.session.token != 'undefined') {
        sessiontoken = req.session.token;
    }
    return sessiontoken;
}
exports.getEnvVariables = function (req) {
    return {
        DB_URI : process.env.DB_URI,
        sessiontoken: this.getSessionToken(req)
    }; 
}