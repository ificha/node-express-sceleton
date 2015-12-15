var express = require('express'),
	fs = require('fs'),
	FileStreamRotator = require('file-stream-rotator'),
	morgan = require('morgan'),
	orm = require('orm'),
	qOrm = require('q-orm'),
	ormModel = rootRequire('app/models/models.server');

module.exports = function () {
	var app = express();

	// ensure log directory exists
	var logDirectory = g.appRoot + '/logs';
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

	// create a rotating write stream
	var accessLogStream = FileStreamRotator.getStream({
		filename: logDirectory + '/access-%DATE%.log',
		frequency: 'daily',
		verbose: false
	});

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('combined', { stream: accessLogStream }));
	} else if (process.env.NODE_ENV === 'production') {

	}

	// orm
	app.use(qOrm.qExpress(g.config.db_connection_str, {
		define: function (db, models, next) {
			ormModel(db, models);
			next();
		}
	}));

	// register api routes
	rootRequire('/app/routes/api_v1.routes.server')(app);

	return app;
}