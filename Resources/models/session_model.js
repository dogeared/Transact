var SessionModel = {
	token: undefined,
	server: undefined,
	port: undefined,
	save: false,
	update: function(token, server, port, save) {
		SessionModel.token = token;
		SessionModel.server = server;
		SessionModel.port = port;
		SessionModel.save = save;
		if (save) {
			Titanium.App.Properties.setBool('save', true);
	    	Titanium.App.Properties.setString('token', token);
	    	Titanium.App.Properties.setString('server', server);
	    	Titanium.App.Properties.setString('port', port);
		} else {
			Titanium.App.Properties.removeProperty('save');
			Titanium.App.Properties.removeProperty('token');
			Titanium.App.Properties.removeProperty('server');
			Titanium.App.Properties.removeProperty('port');
		}
	}
};

