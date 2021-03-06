var userService = require('../services/userService');
var roleService=require('../services/roleService');
var middleware = require('../middleware');
const logger = require('../logger');
const common = require('../common');
const {
    urlencoded,
    json
} = require('body-parser');

module.exports = function (app, session) {
    app.get('/users', middleware.validateUser, function (req, res) {
        logger.info('trying to load user index page..' + process.env.BASE_URI);
        var sessionVariables = common.getSessionVariables(req);
        const getData = async function getData() {
            try {
                var result = await userService.list(req);
                // logger.debug('found list of users '+JSON.stringify(result));
                res.render('pages/users/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                res.render('pages/users/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        getData();
    });

    app.post('/users/delete', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info(req.body.id);
        const deleteData = async function deleteData() {
            try {
                var result = await userService.delete(req);
                logger.info('result is ' + JSON.stringify(result));
                res.render('pages/users/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': 'deleted '
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/users/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                });
            }
        }
        deleteData();
    });

    app.get('/users/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        const getroles = async function getroles() {
            var allroles = await roleService.list(req);
            console.log('allroles are '+ JSON.stringify(allroles) );
            res.render('pages/users/insert', {
                sessiontoken: sessionVariables.sessiontoken,
                username: sessionVariables.username,
                roles: sessionVariables.roles,
                allroles: JSON.stringify( allroles),
                'msg': '',
                'apiurl': process.env.BASE_URI
            });
        }
        getroles();
    });

    app.post('/users/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('in post method of user insert ');
        logger.debug('req body is ' + JSON.stringify(req.body));
        userService.insert(req).then((result) => {
            logger.debug('user service insert method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
                logger.debug('101 result.acknowledged == true')
                res.redirect('/users');
            } else {
                logger.debug('102 returning to same page as insert failed')
                res.render('pages/users/insert', {
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': JSON.stringify(result)
                });
            }
        });
    });

    app.get('/users/update/:id', middleware.validateUser, function (req, res) {
        logger.info('103 trying to load user update page..');
        var sessionVariables = common.getSessionVariables(req);
        const getData = async function getData() {
            try {
                var result = await userService.get(req);

                logger.debug('106 received response from userService.get ' + JSON.stringify(result));
                res.render('pages/users/update', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                logger.error('107 ' + err);
                res.render('pages/users/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        getData();
    });

    app.post('/users/update', middleware.validateUser, function (req, res) {
        logger.info('103 trying to update user..');
        var sessionVariables = common.getSessionVariables(req);
        const getData = async function getData() {
            try {
                var result = await userService.update(req);
                logger.debug('106 received response from userService.update post ' + JSON.stringify(result));
                res.render('pages/users/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                logger.error('107 ' + err);
                res.render('pages/users/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        getData();
    });
}