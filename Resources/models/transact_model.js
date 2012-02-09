var credCounter = 0;

var TransactModel = {
	transact: function(data, callback) {
		if (credCounter%2 === 0) {
			var ret = { status: "SUCCESS", message: "submitted " + data.amount + 
				" to " + data.category + "." };
		} else {
			var ret = { status: "FAILURE", message: "Unable to connect!"}
		};
		credCounter++;
		callback(ret);		
	},
	credit: function(data, callback) {
		TransactModel.transact(data, callback);
	},
	debit: function(data, callback) {
		data.amount = (isNaN(parseInt(data.amount))) ? "" + 0 : "" + (0-parseInt(data.amount));
		TransactModel.transact(data, callback);
	}
};
