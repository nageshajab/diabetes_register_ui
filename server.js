var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const common = require('./common');
var logger = require('./logger').logger;

const {
    type
} = require('express/lib/response');
var app = express();

app.use(cookieParser());
app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));
//define body parser to read request body
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//set view engine to ejs
app.set('view engine', 'ejs');

// read environment variables
dotenv.config();

//define routes
require('./routes/authenticationRoutes')(app);
require('./routes/diabeticRoutes')(app);

//about page
app.get('/about', function (req, res) {
    res.render('pages/about', {
        sessiontoken: common.getSessionToken(req),
        DB_URI:common.getEnvVariables()
    });
});

app.listen(8080);
logger.info('server is listening on port 8080');