services.HistoryService = {
	getHistory: function(callback) {
		request.get(config.endpoints.history, {}, function(err, response) {
			if (err) {
				response = {
					status: 'FAILURE',
					message: 'Cannot connect to server.'				
				}
			} else if (response.status === 'SUCCESS') {
				response.message = 'Successfully retrieved history.';
			} else {
				response.message = 'No history.';
			}
			callback(response);
		})
	},
	process: function(ids, callback) {
		request.post(config.endpoints.process, {ids: ids}, function(err, response) {
			if (err) {
				response = {
					status: 'FAILURE',
					message: 'Cannot connect to server.'				
				}
			} else if (response.status === 'SUCCESS') {
				response.message = 'Successfully processed history.';
			} else {
				response.message = "Didn't process history.";
			}
			callback(response);
		});
	}
}
