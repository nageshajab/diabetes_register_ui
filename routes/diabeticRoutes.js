var diabeticService = require('../services/diabeticService');
var middleware = require('../middleware');
//const logger = require('../logger').logger;
const { urlencoded, json } = require('body-parser');

module.exports = function (app) {
    app.get('/', middleware.validateUser, function (req, res) {
      //  logger.info('trying to load index page..');

        const getData = async function getData() {
            try {
                var result = await diabeticService.list(req);

                res.render('pages/index', {
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

    app.post('/diabetic/delete', middleware.validateUser, function (req, res) {
     //   logger.info(req.body.id);
        const deleteData = async function deleteData() {
            try {
                var result = await diabeticService.delete(req);
       //         logger.info('result is ' + JSON.stringify(result));
                res.render('pages/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': 'deleted ',
                    DB_URI: common.getEnvVariables()
                });
            } catch (err) {
         //       logger.error(err);
                res.render('pages/index', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req),
                    DB_URI: common.getEnvVariables()
                });
            }
        }
        deleteData();
    });

    app.get('/diabetic/insert', middleware.validateUser, function (req, res) {
        res.render('pages/diabetic/insert', {
            sessiontoken: require('../common').getSessionToken(req),
            'msg': ''
        });
    });

    app.post('/diabetic/insert',middleware.validateUser, function (req, res) {
        // logger.info('in post method of diabetic insert ');
        // logger.debug('req body is ' + JSON.stringify(req.body));
         diabeticService.insert(req).then((result) => {
          //  logger.debug('diabetic service insert method returned this result ' + JSON.stringify(result));
            if (result.acknowledged == true) {
            //    logger.debug('101 result.acknowledged == true')
                res.redirect('/');
            } else {
              //  logger.debug('102 returning to same page as insert failed')
                res.render('pages/diabetic/insert', {
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': JSON.stringify(result)
                });
            }
        });
    });

    app.get('/diabetic/update/:id', middleware.validateUser, function (req, res) {
      //  logger.info('103 trying to load update page..');

        const getData = async function getData() {
            try {
                var result = await diabeticService.get(req);
            console.log('106 received response from diabeticService.get '+JSON.stringify(result)) ;   
                res.render('pages/diabetic/update', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg': ''
                });
            } catch (err) {
            //    logger.error('107 '+ JSON.stringify(err));
                res.render('pages/login', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });

}