const axios = require('axios');
const logger = require('../logger');
const common = require('./common');

exports.list = async function list(req) {
    return new Promise(function (resolve, reject) {
        const config = common.getAxiosConfig(req);
        var data = {};
        axios.post(`${process.env.BASE_URI}/medicine/list`, data, config)
            .then((res) => {
                logger.info(res.status);
                if (res.status === 200) {
                    resolve(res.data);
                } else
                    reject('res status is not 200');
            })
            .catch(err => {
                logger.error(err);
                if (err.response != undefined && err.response.status == 401) {
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

exports.get = async function get(req) {
    var config = common.getAxiosConfig(req);
    return new Promise(function (resolve, reject) {
        logger.debug('id to fetch is ' + req.params.id);
        const data = JSON.stringify({
            id: req.params.id
        });

        logger.info(`uri is ${process.env.BASE_URI}/users/generateToken`);
        axios.post(`${process.env.BASE_URI}/medicine/get`, data, config)
            .then((res) => {
                if (res.status === 200)
                    resolve(res.data);
                else {
                    logger.error('generateToken res status is not 200');
                    reject('res status is not 200');
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
        logger.info('deleting medicine ' + req.body.id);
        const config = common.getAxiosConfig(req);
        var data = {
            id: req.body.id
        };
        axios.post(`${process.env.BASE_URI}/medicine/delete`, data, config)
            .then((res) => {
                if (res.status === 200)
                    resolve(res.data);
                else {
                    logger.error('res status is not 200');
                    reject('res status is not 200');
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

exports.insert = async function insert(req) {
    return new Promise(function (resolve, reject) {
        logger.info('inserting new visit entry ');
        logger.debug(JSON.stringify(req.body));
        const config = common.getAxiosConfig(req);
        var data = req.body;
        axios.post(`${process.env.BASE_URI}/medicine/insert`, data, config)
            .then((res) => {
                if (res.status === 200) {
                    logger.debug(`returned api status as ${res.status}`);
                    logger.debug(` ${ JSON.stringify( res.data)}`);
                    resolve(res.data);
                } else {
                    logger.error('res status is not 200');
                    reject('res status is not 200');
                }
            })
            .catch(err => {
                logger.error(err);
                if (typeof err.response != 'undefined' && err.response.status == 401) {
                    reject({
                        'status': 401,
                        'msg': 'Unauthorized, invalid username or password'
                    });
                } else {
                    var status = 'undefined status';
                    if (typeof err.response != 'undefined')
                        status = err.response.status;
                    reject({
                        'status': status,
                        'msg': String(err).substring(0, 100)
                    });
                }
            });
    });
}

exports.update = async function update(req) {
    return new Promise(function (resolve, reject) {
        logger.info('updating medicine entry ');
        logger.debug(JSON.stringify(req.body));
        const config = common.getAxiosConfig(req);
        var data = req.body;
        axios.post(`${process.env.BASE_URI}/medicine/update`, data, config)
            .then((res) => {
                if (res.status === 200) {
                    logger.debug(`returned api status as ${res.status}`);
                    logger.debug(` ${ JSON.stringify( res.data)}`);
                    resolve(res.data);
                } else {
                    logger.error('res status is not 200');
                    reject('res status is not 200');
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