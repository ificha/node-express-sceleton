
// global 
global.rootRequire = rootRequire;
global.g = {
	config : rootRequire('config/config'),
	appRoot: __dirname
};

var app = rootRequire('config/express')();
app.listen(g.config.port);

console.log('app works on http://localhost:' + g.config.port);

function rootRequire(name){
	return require(__dirname + '/' + name);
}


