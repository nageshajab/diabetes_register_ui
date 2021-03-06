var visitService = require('../services/visitService');
var medicineService = require('../services/medicineService');
var middleware = require('../middleware');
const common=require('../common');
const logger = require('../logger');

const {
    urlencoded,
    json
} = require('body-parser');

module.exports = function (app, session) {
    app.get('/', middleware.validateUser, function (req, res) {
        logger.info('trying to load visit index page..');
        var sessionVariables = common.getSessionVariables(req);
        const getData = async function getData() {
            try {
                visitService.list(req).then((result) => {
                    //  console.log(JSON.stringify(result));
                    logger.debug('received visits from visitService ' + result.length);
                    var result1 = [];
                    for (let i = 0; i < result.length; i++) {
                        var obj = result[i];
                        var dt = new Date(obj.date);
                        var obj = {
                            _id: obj._id,
                            date: dt.getDate() + '/' + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
                            bloodpressurepre: obj.bloodpressurepre,
                            bloodpressurepost: obj.bloodpressurepost,
                            weight: obj.weight,
                            bslf: obj.bslf,
                            bslpp: obj.bslpp,
                            diagnosis: obj.diagnosis,
                            medicines: obj.medicines
                        };
                        logger.info('getting visit List ' + JSON.stringify(obj));
                        result1.push(obj);
                    }
                    res.render('pages/index', {
                        'data': result1,
                        sessiontoken: sessionVariables.sessiontoken,
                        username: sessionVariables.username,
                        roles: sessionVariables.roles,
                        'msg': '',
                        'apiurl': process.env.BASE_URI,
                        'res': res.locals
                    });
                }).catch(error => {
                    console.error(error);
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/index', {
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

    app.post('/visit/delete', middleware.validateUser, function (req, res) {
        logger.info('deleting visit entry in route ' + req.body.id);
        var sessionVariables = common.getSessionVariables(req);
        const deleteData = async function deleteData() {
            try {
                var result = await visitService.delete(req);
                logger.info('result is ' + JSON.stringify(result));
                res.render('pages/index', {
                    'data': result,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': 'deleted ',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                logger.error(err);
                res.render('pages/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        deleteData();
    });

    app.get('/visit/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        const getData = async function getData() {
            try {
                var visitResult = await visitService.list(req);

                logger.debug('received medicines ' + JSON.stringify(visitResult));
                res.render('pages/visit/insert', {
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI,
                    medicines: JSON.stringify(visitResult)
                });
            } catch (err) {
                logger.error('107 ' + err);
                res.render('pages/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'apiurl': process.env.BASE_URI,
                });
            }
        }
        getData();
    });

    app.post('/visit/insert', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('in post method of visit insert ');
        logger.debug('req body is ' + JSON.stringify(req.body));
        visitService.insert(req).then((result) => {
            logger.debug('visit service insert method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
                logger.debug('101 result.acknowledged == true')
                res.redirect('/');
            } else {
                logger.debug('102 returning to same page as insert failed')
                res.render('pages/visit/insert', {
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': JSON.stringify(result),
                    'apiurl': process.env.BASE_URI
                });
            }
        });
    });

    app.get('/visit/update/:id', middleware.validateUser, function (req, res) {
        logger.info('103 trying to load update page..');
        var sessionVariables = common.getSessionVariables(req);
        const getData = async function getData() {
            try {
                var medicineResult = await medicineService.list(req);

                var result = await visitService.get(req);
                logger.debug('106 received response from visitService.get ' + JSON.stringify(result));
                res.render('pages/visit/update', {
                    data: result,
                    medicines: JSON.stringify(medicineResult),
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': '',
                    'apiurl': process.env.BASE_URI
                });
            } catch (err) {
                logger.error('107 error retrieving visit id for update' + err);
                res.render('pages/index', {
                    'msg': err.status + err.msg + '107 error retrieving visit id for update',
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'apiurl': process.env.BASE_URI
                });
            }
        }
        getData();
    });

    app.post('/visit/update', middleware.validateUser, function (req, res) {
        var sessionVariables = common.getSessionVariables(req);
        logger.info('in post method of visit update ');
        logger.debug('req body is ' + JSON.stringify(req.body));
        visitService.update(req).then((result) => {
            logger.debug('visit service update method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
                logger.debug('101 result.acknowledged == true')
                res.redirect('/');
            } else {
                logger.debug('102 returning to same page as insert failed')
                res.render('pages/visit/insert', {
                    sessiontoken: sessionVariables.sessiontoken,
                    username: sessionVariables.username,
                    roles: sessionVariables.roles,
                    'msg': JSON.stringify(result),
                    'apiurl': process.env.BASE_URI
                });
            }
        });
    });
}