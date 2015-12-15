process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = rootRequire('config/env/' + process.env.NODE_ENV + '.js');