var roleService = require('../services/roleService');
var middleware = require('../middleware');
const logger = require('../logger');
const {
    urlencoded,
    json
} = require('body-parser');

module.exports = function (app,session) {
    app.get('/roles', middleware.validateUser, function (req, res) {
        logger.info('trying to load role index page..'+process.env.BASE_URI);

        const getData = async function getData() {
            try {
                var result = await roleService.list(req);
                logger.debug('found list of roles '+JSON.stringify(result));
                res.render('pages/roles/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': '',
                    'apiurl':process.env.BASE_URI
                });
            } catch (err) {
                res.render('pages/roles/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req),
                    'apiurl':process.env.BASE_URI
                });
            }
        }
        getData();
    });

    app.post('/roles/delete', middleware.validateUser, function (req, res) {
        logger.info(req.body.id);
        const deleteData = async function deleteData() {
            try {
                var result = await roleService.delete(req);
                logger.info('result is ' + JSON.stringify(result));
                res.render('pages/roles/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': 'deleted '
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/roles/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        deleteData();
    });

    app.get('/roles/insert', middleware.validateUser, function (req, res) {
        res.render('pages/roles/insert', {
            sessiontoken: require('../common').getSessionToken(req),
            'msg': ''
        });
    });

    app.post('/roles/insert', middleware.validateUser, function (req, res) {
        logger.info('in post method of role insert ');
        logger.debug('role insert: req body is ' + JSON.stringify(req.body));
        roleService.insert(req).then((result) => {
            logger.debug('role service insert method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
                logger.debug('101 result.acknowledged == true')
                res.redirect('/roles');
            } else {
                logger.debug('102 returning to same page as insert failed')
                res.render('pages/roles/insert', {
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': JSON.stringify(result)
                });
            }
        });
    });

    app.get('/roles/update/:id', middleware.validateUser, function (req, res) {
        logger.info('103 trying to load role update page..');

        const getData = async function getData() {
            try {
                var result = await roleService.get(req);
                logger.debug('106 received response from roleService.get ' + JSON.stringify(result));
                res.render('pages/roles/update', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': ''
                });
            } catch (err) {
                logger.error('107 ' + err);
                res.render('pages/roles/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });

    app.post('/roles/update', middleware.validateUser, function (req, res) {
        logger.info('103 trying to update role..');

        const getData = async function getData() {
            try {
                var result = await roleService.update(req);
                logger.debug('106 received response from roleService.update post ' + JSON.stringify(result));
                res.render('pages/roles/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': '',
                    'apiurl':process.env.BASE_URI
                });
            } catch (err) {
                logger.error('107 ' +err);
                res.render('pages/roles/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });
}