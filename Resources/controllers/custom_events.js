Ti.include('/support/request.js');
Ti.include('/services/auth_service.js');
Ti.include('/services/transaction_service.js');

request.init();

Ti.App.addEventListener('do_auth', function(e) {
  services.AuthService.authenticate(e.token,
    function(err, response) {
      var authenticated = false;
      if (err) {
        Ti.App.fireEvent('message', {
          message: 'Cannot connect to server. Please contact support.'
        });
      } else if (response.status === 'SUCCESS') {
        authenticated = true;
      }
      Ti.App.fireEvent('auth_result', { authenticated: authenticated });
    }
  );
});

Ti.App.addEventListener('do_transaction', function(e) {
  services.TransactionService.transact(e.data, function(result) {
  	Ti.App.fireEvent('transaction_result', {result: result});
  })
});

Ti.App.addEventListener('do_get_history', function() {
	request.get(config.endpoints.history, {}, function(err, response) {
		Ti.App.fireEvent('get_history_result', {data: response.result});
	});
});

Ti.App.addEventListener('do_update_history', function(e) {
	request.post(config.endpoints.process, {ids: e.ids}, function(err, response) {
		Ti.App.fireEvent('get_history_result', {data: response.result});
	});
});
