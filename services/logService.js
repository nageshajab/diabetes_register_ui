const axios = require('axios');
const logger = require('../logger');
const req = require('express/lib/request');

exports.list = async function list(req) {
    return new Promise(function (resolve, reject) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Length':'',// data.length,
                'Bearer': req.session.token
            }
        };
        var data = {};
        logger.info('making get call to logs');
        axios.get(`${process.env.BASE_URI}/logs`, data, config)
            .then((res) => {
                logger.info(res.status);
                if (res.status === 200) {
                    resolve(res.data);
                }
            })
            .catch(err => {
                logger.error(err);
                if (err.response.status == 401) {
                    reject({
                        'status': 401,
                        'msg': 'Unauthorized, invalid username or password'
                    });
                } else {
                    reject({
                        'status': err.response.status,
                        'msg': String(err).substring(0, 100)
                    });
                }
            });
    });
}

exports.delete = async function delete1(req) {
    return new Promise(function (resolve, reject) {
        logger.info('deleting watch list ' + req.body.id);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Length':'',// data.length,
                'Bearer': req.session.token
            }
        };
        var data = {
            id: req.body.id
        };
        axios.post(`${process.env.BASE_URI}/diabetic/delete`, data, config)
            .then((res) => {
                if (res.status === 200)
                    resolve(res.data);
                else
                    console.log('res status is not 200');
            })
            .catch(err => {
                logger.error(err);
                if (err.response.status == 401) {
                    reject({
                        'status': 401,
                        'msg': 'Unauthorized, invalid username or password'
                    });
                } else {
                    reject({
                        'status': err.response.status,
                        'msg': String(err).substring(0, 100)
                    });
                }
            });
    });
}
