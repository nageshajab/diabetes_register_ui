var middleware = require('../middleware');
var logger = require('../logger');
var logService=require('../services/logService');

module.exports = function (app) {
    app.get('/logs', middleware.validateUser, function (req, res) {
        logger.info('trying to load logs page..');

        const getData = async function getData() {
            try {
                var result = await logService.list(req);

                res.render('pages/logs', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': ''
                });
            } catch (err) {
                res.render('pages/login', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });
}