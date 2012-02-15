var TransactModel = {
	transact: function(data) {
		Ti.App.fireEvent('do_transaction', { data: data });
	},
	credit: function(data, callback) {
		TransactModel.transact(data);
	},
	debit: function(data, callback) {
		data.amount = (isNaN(parseInt(data.amount))) ? "" + 0 : "" + (0-parseFloat(data.amount));
		TransactModel.transact(data);
	}
};