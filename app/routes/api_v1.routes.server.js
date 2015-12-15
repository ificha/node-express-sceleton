
module.exports = function(app){
	
	var testCtrl = rootRequire('/app/controllers/queries.api.server.ctrl');
	app.use('/api/v1/queries', testCtrl());
}