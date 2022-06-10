var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
const dotenv = require('dotenv');
const common = require('./common');
var logger = require('./logger');
const bodyParser = require('body-parser')

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
require('./routes/otherRoutes')(app);

//about page
app.get('/about', function (req, res) {
    res.render('pages/about', {
        sessiontoken: common.getSessionToken(req),
        DB_URI:common.getEnvVariables()
    });
});

//start listening on port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.clearLogFiles();
  logger.info(`Server is up and running on ${PORT}`);
  console.log(`Server is up and running on ${PORT}`);
});