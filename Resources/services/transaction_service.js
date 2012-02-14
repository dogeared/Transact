services.TransactionService = {};

services.TransactionService.transact = function(data, callback) {
	request.post(config.endpoints.transaction, data, function(err, response) {
		if (err) {
			response.status = 'FAILURE';
			response.message = 'General failure.'; // put something more specific here
		} else if (response.status === 'SUCCESS') {
			response.message = 'Successfully added transaction!';
		} else {
			response.message = 'Failed to add transaction!';
		}
		callback(response);
	});
};