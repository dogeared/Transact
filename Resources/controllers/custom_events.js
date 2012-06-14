Ti.include('/support/request.js');
Ti.include('/services/auth_service.js');
Ti.include('/services/transaction_service.js');
Ti.include('/services/history_service.js');
Ti.include('/models/session_model.js');

request.init();

Ti.App.addEventListener('resumed', function() {
	if (Titanium.App.Properties.getBool('save')) {
		SessionModel.update(
	      Titanium.App.Properties.getString('token'), 
	      Titanium.App.Properties.getString('server'),
	      Titanium.App.Properties.getString('port'), 
	      true
	    );
		Ti.App.fireEvent('do_auth', {token: SessionModel.token});
	}
	Ti.App.fireEvent('update_date', {date: new Date()});
});

Ti.App.addEventListener('do_auth', function(e) {
  request.setServer(SessionModel.server, SessionModel.port);
  services.AuthService.authenticate(e.token,
    function(err, response) {
      var message = 'Boo! Bad token.';
      if (err) {
		message = 'Cannot connect to server.';
      } else if (response.status === 'SUCCESS') {
        message = 'Conrgrats! You are logged in.';
      }
      Ti.App.fireEvent('message', {message: message});
    }
  );
});

Ti.App.addEventListener('get_session_model', function(e) {
	Ti.App.fireEvent('get_session_model_result', {SessionModel: SessionModel});
});

Ti.App.addEventListener('set_session_model', function(e) {
	SessionModel.update(e.token, e.server, e.port, e.save);
})

Ti.App.addEventListener('do_transaction', function(e) {
  services.TransactionService.transact(e.data, function(response) {
  	Ti.App.fireEvent('transaction_result', {result: response});
  })
});

var historyResponse = function(response) {
	Ti.App.fireEvent('message', {message: response.message});
	if (response.status !== 'FAILURE') {
		Ti.App.fireEvent('get_history_result', {data: response.result});
	}	
}

Ti.App.addEventListener('do_get_history', function() {
	services.HistoryService.getHistory(function(response) {
		historyResponse(response);
	});
});

Ti.App.addEventListener('do_update_history', function(e) {
	services.HistoryService.process(e.ids, function(response) {
		historyResponse(response);
	});
});
