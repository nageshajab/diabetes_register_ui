exports.getSessionVariables = function (req) {
    var sessiontoken = '';
    var username, roles;

    if (typeof (req) != 'undefined') {
        if (typeof req.session.token != 'undefined') {
            sessiontoken = req.session.token;
        }
        if (typeof req.session.username != 'undefined') {
            username = req.session.username;
        }
        if (typeof req.session.roles != 'undefined') {
            roles = req.session.roles;
        }
        return {
            'sessiontoken': sessiontoken,
            'username': username,
            'roles': roles
        };
    }
    return sessiontoken;
}
