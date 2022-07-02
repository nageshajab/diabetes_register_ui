var userService = require('../services/user-service');
var common = require('../common');
var middleware = require('../middleware');
var logger = require('../logger');

module.exports = function (app, session) {

    app.get('/report/weight', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        res.render('pages/reports/weight', {
            'msg': '',
            'apiurl': process.env.BASE_URI,
            sessiontoken: sessionVariables.sessiontoken,
            username: sessionVariables.username,
            roles: sessionVariables.roles,
            'reportType': 'weight'
        });
    });

    app.get('/report/bloodsugar', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        res.render('pages/reports/weight', {
            'msg': '',
            'apiurl': process.env.BASE_URI,
            sessiontoken: sessionVariables.sessiontoken,
            username: sessionVariables.username,
            roles: sessionVariables.roles,
            'reportType': 'bloodsugar'
        });
    });

    app.get('/report/bloodpressure', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        res.render('pages/reports/weight', {
            'msg': '',
            'apiurl': process.env.BASE_URI,
            sessiontoken: sessionVariables.sessiontoken,
            username: sessionVariables.username,
            roles: sessionVariables.roles,
            'reportType': 'bloodpressure'
        });
    });
}