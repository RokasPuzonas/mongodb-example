var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Handlebars = require('handlebars')
const hbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//var ExpressValidator = require("express-validator")
//var ExpressSession = require("express-session")

var index_router = require('./routes/index');

var app = express();

// view engine setup
app.engine("hbs", hbs({
	extname: "hbs",
	defaultLayout: "layout",
	layoutsDir: __dirname + "/views/layouts/",
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(ExpressSession({secret: "max", saveUninitialized: false, resave: false}))

app.use('/', index_router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.statusCode = 404
	res.statusMessage = "Not Found"
	next();
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
