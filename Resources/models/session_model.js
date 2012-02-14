Ti.include('/services/auth_service.js');

models.SessionModel = {};

models.SessionModel.authenticate = function(e, callback) {
  services.LoginService.authenticate(
    e.token,
    function(err, response) {
      if (err) {
        Ti.API.fireEvent('message', {
          message: 'Cannot connect to server. Please contact support.'
        });
        return callback(false);
      }

      if (response.session) {
        return callback(true);
      } else {
        return callback(false);
      }
    }
  );
};