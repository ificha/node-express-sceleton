var express = require('express');

module.exports = function () {
	var router = express.Router();

	router.get('/', function (req, res) {
		req.models.queries.qAll().then(function (data) {
			res.json({ data: data });
		});
	});

	router.get('/get/:id', function (req, res) {

		var id = req.params.id;
		req.db.qExecQuery('select * from queries where id = ' + id)
			.then(function (data) {
				if (data && data.length != 0)
					res.json(data[0]);
				else
					res.status(400).send({message: 'not found'});
			});
	});

	router.get('/get2/:id', function (req, res) {

		var id = req.params.id;
		req.models.queries.qFind({id: id}, 10)
			.then(function (data) {
				if (data && data.length != 0)
					res.json(data[0]);
				else
					res.status(400).send({message: 'not found'});
			});			
	});

	return router;
}