var SessionModel = {
	token: undefined,
	save: false,
	update: function(token, save) {
		SessionModel.token = token;
		SessionModel.save = save;
		if (save) {
			Titanium.App.Properties.setBool('save', true);
	    	Titanium.App.Properties.setString('token', token);
		} else {
			Titanium.App.Properties.removeProperty('save');
			Titanium.App.Properties.removeProperty('token');
		}
	}
};

