var medicineService = require('../services/medicineService');
var middleware = require('../middleware');
const common = require('../common');
const logger = require('../logger');
const {
    urlencoded,
    json
} = require('body-parser');

module.exports = function (app, session) {
    app.get('/medicine', middleware.validateUser, function (req, res) {
        logger.info('trying to load medicine index page..' + process.env.BASE_URI);

        const getData = async function getData() {
            var sessionVariables = common.getSessionVariables(req);
            try {
                var result = await medicineService.list(req);

                logger.debug('found list of medicines ' + JSON.stringify(result));
                res.render('pages/medicine/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                res.render('pages/medicine/index', {
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req),
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        getData();
    });

    app.post('/medicine/delete', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('medicine delete post ' + req.body.id);
        const deleteData = async function deleteData() {
            try {
                var result = await medicineService.delete(req);
                logger.info('result is ' + JSON.stringify(result));
                res.render('pages/index', {
                    'data': result,
                    'msg': 'deleted ',
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            }
        }
        deleteData();
    });

    app.get('/medicine/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);

        res.render('pages/medicine/insert', {
            sessiontoken: sessionVariables.sessiontoken,
            username: sessionVariables.username,
            roles: sessionVariables.roles,
            'msg': ''
        });
    });

    app.post('/medicine/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
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
                    'msg': JSON.stringify(result),
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            }
        });
    });

    app.get('/medicine/update/:id', middleware.validateUser, function (req, res) {
        logger.info('103 trying to load medicine update page..');
        var sessionVariables = common.getSessionVariables(req);

        const getData = async function getData() {
            try {
                var result = await medicineService.get(req);
                logger.debug('106 received response from medicineService.get ' + JSON.stringify(result));
                res.render('pages/medicine/update', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': ''
                });
            } catch (err) {
                logger.error('107 ' + err);
                res.render('pages/medicine/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles
                });
            }
        }
        getData();
    });

    app.post('/medicine/update', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('103 trying to update medicine..');

        const getData = async function getData() {
            try {
                var result = await medicineService.update(req);
                logger.debug('106 received response from medicineService.update post ' + JSON.stringify(result));
                res.render('pages/medicine/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                logger.error('107 ' + err);
                logger.error('107 ' + err.stack);
                res.render('pages/medicine/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            }
        }
        getData();
    });
}