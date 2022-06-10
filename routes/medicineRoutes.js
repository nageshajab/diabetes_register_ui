var medicineService = require('../services/medicineService');
var middleware = require('../middleware');
const logger = require('../logger');
const {
    urlencoded,
    json
} = require('body-parser');

module.exports = function (app,session) {
    app.get('/medicine', middleware.validateUser, function (req, res) {
        logger.info('trying to load medicine index page..');

        const getData = async function getData() {
            try {
                var result = await medicineService.list(req);
                logger.debug('found list of medicines '+JSON.stringify(result));
                res.render('pages/medicine/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': ''
                });
            } catch (err) {
                res.render('pages/medicine/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });

    app.post('/medicine/delete', middleware.validateUser, function (req, res) {
        logger.info(req.body.id);
        const deleteData = async function deleteData() {
            try {
                var result = await medicineService.delete(req);
                logger.info('result is ' + JSON.stringify(result));
                res.render('pages/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': 'deleted ',
                    DB_URI: common.getEnvVariables()
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req),
                    DB_URI: common.getEnvVariables()
                });
            }
        }
        deleteData();
    });

    app.get('/medicine/insert', middleware.validateUser, function (req, res) {
        res.render('pages/medicine/insert', {
            sessiontoken: require('../common').getSessionToken(req),
            'msg': ''
        });
    });

    app.post('/medicine/insert', middleware.validateUser, function (req, res) {
        logger.info('in post method of medicine insert ');
        logger.debug('req body is ' + JSON.stringify(req.body));
        medicineService.insert(req).then((result) => {
            logger.debug('medicine service insert method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
                logger.debug('101 result.acknowledged == true')
                res.redirect('/medicine');
            } else {
                logger.debug('102 returning to same page as insert failed')
                res.render('pages/medicine/insert', {
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': JSON.stringify(result)
                });
            }
        });
    });

    app.get('/medicine/update/:id', middleware.validateUser, function (req, res) {
        logger.info('103 trying to load medicine update page..');

        const getData = async function getData() {
            try {
                var result = await medicineService.get(req);
                logger.debug('106 received response from medicineService.get ' + JSON.stringify(result));
                res.render('pages/medicine/update', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': ''
                });
            } catch (err) {
                logger.error('107 ' + JSON.stringify(err));
                res.render('pages/medicine/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });

}