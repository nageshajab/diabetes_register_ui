const axios = require('axios');
const logger = require('../logger');

exports.generateToken = async function generateToken(username1, password1) {
    return new Promise(function (resolve, reject) {
        const data = JSON.stringify({
            username: username1,
            password: password1
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            }
        };
        logger.info(`uri is ${process.env.BASE_URI}/users/generateToken`);
        axios.post(`${process.env.BASE_URI}/users/generateToken`, data, config)
            .then((res) => {
                if (res.status === 200)
                    resolve(res.data);
                else
                   logger.error('res status is not 200');
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