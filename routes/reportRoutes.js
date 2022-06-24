var userService = require('../services/user-service');
var common = require('../common');
var middleware = require('../middleware');
var logger = require('../logger');

module.exports = function (app,session) {
    
    app.get('/report/weight',  middleware.validateUser, function (req, res) {
        res.render('pages/reports/weight',{
            'msg':'',
            'apiurl': process.env.BASE_URI,
            sessiontoken: require('../common').getSessionToken(req),
            'reportType':'weight'
        });       
    });

    app.get('/report/bloodsugar',  middleware.validateUser, function (req, res) {
        res.render('pages/reports/weight',{
            'msg':'',
            'apiurl': process.env.BASE_URI,
            sessiontoken: require('../common').getSessionToken(req),
            'reportType':'bloodsugar'
        });       
    });

    app.get('/report/bloodpressure',  middleware.validateUser, function (req, res) {
        res.render('pages/reports/weight',{
            'msg':'',
            'apiurl': process.env.BASE_URI,
            sessiontoken: require('../common').getSessionToken(req),
            'reportType':'bloodpressure'
        });       
    });
}