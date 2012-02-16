services.AuthService = {
	authenticate: function(token, callback) {
		request.post(config.endpoints.authenticate, { token: token }, callback);
	}
};