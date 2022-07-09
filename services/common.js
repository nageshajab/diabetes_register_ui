const logger = require('../logger');

exports.getAxiosConfig =  function getAxiosConfig(req) {
    var config2= {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Length':'',// data.length,
            'Bearer': req.session.token
        },
        timeout: 20000
    };
  
    return config2;
}