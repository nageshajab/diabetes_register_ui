var userService = require('../services/user-service');
var common = require('../common');
var middleware = require('../middleware');
var logger = require('../logger');

module.exports = function (app,session) {
    //authentication
    app.get('/login', function (req, res) {

        session = req.session;
        if (session.userid) {
            res.send("Welcome User <a href=\'/logout'>click to logout</a>");
        } else
            res.render('pages/login', {
                'msg': '',
                'apiurl':process.env.BASE_URI
            });
    });

    app.post('/login', function (req, res) {
        logger.debug('110 in post login ' + req.body.username + ' ' + req.body.password);
        const generateToken = async function generateToken() {
            try {
                var result = await userService.generateToken(req.body.username, req.body.password);
                logger.info('result is ' +JSON.stringify( result));
                session=req.session;
                session.username=req.body.username;
                session.token=result.token;
                session.roles=result.roles;
                console.log('roles received in login post '+result.roles);
                session.roles=result.roles;

                res.redirect('/');
            } catch (err) {
                console.log(err);
                console.log('inside error of login post');
                res.render('pages/login', {
                    'msg': err.status + err.msg
                });
            }
        }
        generateToken();
    });

    app.get('/logout',(req,res) => {
        req.session.destroy();
        res.redirect('/login');
    });
}