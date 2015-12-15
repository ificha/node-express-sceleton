global.rootRequire = function (name) {
	return require(__dirname + '/' + name);
}

var gulp = require('gulp'),
	orm = require('orm'),
	qOrm = require('q-orm'),
	config = rootRequire('config/config'),
	domainModel = rootRequire('app/models/models.server');

// create required table in db
gulp.task('init', function () {

	qOrm.qConnect(config.db_connection_str)
		.then(function (db) {
						
			db.qExecQuery('CREATE TABLE queries (id SERIAL NOT NULL PRIMARY KEY, query_id VARCHAR(50) NOT NULL ,query_name VARCHAR(50) NOT NULL ,query_expression VARCHAR(1000) NOT NULL ,query_status VARCHAR(50) NOT NULL );')
				.then(function(res){
					console.log(res);
					process.exit();
				})
				.catch(function(ex){
					console.error(ex);
					process.exit();
				});										
		});
});

// show query records
gulp.task('info', function(){	
	
	qOrm.qConnect(config.db_connection_str)
		.then(function (db) {
			
			// register domain model
			var models = {};
			domainModel(db, models);

			models.queries.qAll()
				.then(function (data) {
					console.log('Queries: ');
					console.log(JSON.stringify(data));
					process.exit();
				})
		});	
})