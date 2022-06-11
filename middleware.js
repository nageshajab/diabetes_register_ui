'use strict'

const res = require("express/lib/response");
const common=require('./common');

exports.validateUser = function (req, res, next) {
    if (req.session.token === undefined || req.session.token == '') {
        res.redirect('/login');
    } else {
        next();
    }
}
exports.addEnvironmentVariablesToResponse = function (req, res, next) {
    if (typeof res.body == 'undefined') {
        res.body = {};
    }
    res.body.msg = '';
    res.body.sessiontoken = common.getSessionToken(req);

    next();
}