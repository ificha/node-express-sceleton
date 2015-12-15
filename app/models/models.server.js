
module.exports = function (db, model) {

	model.queries = db.qDefine('queries', {
        id: { type: 'integer', key: true },
		query_id: { type: 'text' },
		query_name: { type: 'text' },
		query_expression: { type: 'text' },
		query_status: { type: 'text' }
    });

};