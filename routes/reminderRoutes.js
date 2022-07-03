var reminderService = require('../services/reminderService');
var middleware = require('../middleware');
const common = require('../common');
const logger = require('../logger');
const {
    urlencoded,
    json
} = require('body-parser');

module.exports = function (app, session) {
    app.get('/reminder/index', middleware.validateUser, function (req, res) {
        logger.info('trying to load reminder index page..' + process.env.BASE_URI);

        const getData = async function getData() {
            var sessionVariables = common.getSessionVariables(req);
            try {
                var result = await reminderService.list(req);

                logger.debug('found list of reminders ' + JSON.stringify(result));
                res.render('pages/reminder/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                res.render('pages/reminder/index', {
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': err.status + err.msg,
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        getData();
    });

    app.post('/reminder/delete', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('reminder delete post ' + req.body.id);
        const deleteData = async function deleteData() {
            try {
                var result = await medicineService.delete(req);
                logger.info('result is ' + JSON.stringify(result));
                res.render('pages/reminder/index', {
                    'data': result,
                    'msg': 'deleted ',
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/reminder/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            }
        }
        deleteData();
    });

    app.get('/reminder/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);

        res.render('pages/reminder/insert', {
            sessiontoken: sessionVariables.sessiontoken,
            username: sessionVariables.username,
            roles: sessionVariables.roles,
            'msg': '',
            'apiurl': process.env.BASE_URI
        });
    });

    app.post('/reminder/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('in post method of reminder insert ');
        logger.debug('req body is ' + JSON.stringify(req.body));
        reminderService.insert(req).then((result) => {
            logger.debug('reminder service insert method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
                logger.debug('101 result.acknowledged == true')
                res.redirect('/medicine');
            } else {
                logger.debug('102 returning to same page as insert failed')
                res.render('pages/reminder/insert', {
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': JSON.stringify(result),
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            }
        });
    });

    app.get('/reminder/update/:id', middleware.validateUser, function (req, res) {
        logger.info('103 trying to load medicine update page..');
        var sessionVariables = common.getSessionVariables(req);

        const getData = async function getData() {
            try {
                var result = await reminderService.get(req);
                logger.debug('106 received response from reminderService.get ' + JSON.stringify(result));
                res.render('pages/reminder/update', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': ''
                });
            } catch (err) {
                logger.error('107 ' + err);
                res.render('pages/reminder/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles
                });
            }
        }
        getData();
    });

    app.post('/reminder/update', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('103 trying to update reminder..');

        const getData = async function getData() {
            try {
                var result = await reminderService.update(req);
                logger.debug('106 received response from reminderService.update post ' + JSON.stringify(result));
                res.render('pages/reminder/index', {
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
                res.render('pages/reminder/index', {
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