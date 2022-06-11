exports.getSessionToken = function (req) {
    var sessiontoken = '';
    if (typeof (req) != 'undefined') {
        if (typeof req.session.token != 'undefined') {
            sessiontoken = req.session.token;
        }
    }
    return sessiontoken;
}
exports.getEnvVariables = function (req) {
    return {
        sessiontoken: this.getSessionToken(req)
    };
}