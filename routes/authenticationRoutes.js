var userService = require('../services/user-service');
var common = require('../common');
var middleware = require('../middleware');
//var logger = require('../logger').logger;

module.exports = function (app) {
    //authentication
    app.get('/login', function (req, res) {
        var envVariables = common.getEnvVariables(req);
        res.render('pages/login', {
            sessiontoken: require('../common').getSessionToken(req),
            'msg': ''
        });
    });

    app.post('/login', function (req, res) {
     //   logger.debug('110 post login ' + req.body.username + ' ' + req.body.password);
        const generateToken = async function generateToken() {
            try {
                var result = await userService.generateToken(req.body.username, req.body.password);
          //      logger.info('result is ' + result);
                req.session.token = result;
                res.redirect('/');
            } catch (err) {
                res.render('pages/login', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req),
                    DB_URI: common.getEnvVariables()
                });
            }
        }
        generateToken();
    });
}