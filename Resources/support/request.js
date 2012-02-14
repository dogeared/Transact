Ti.include('/config/defaults.js');

var request = {
  xhr: Ti.Network.createHTTPClient(),
  configEnv: config.environments[config.env]
};

request.init = function() {
  request.xhr.timeout = config.serviceTimeout * 1000;
  request.xhr.clearCookies(request.configEnv.proto + '://' + 
  	request.configEnv.host + ':' + request.configEnv.port);
};

request.registerHandlers = function(callback) {
  request.xhr.onload = function(e) {
    try {
      Ti.API.info("in xhr onload handler with response: " + request.xhr.responseText);
      var responseData = JSON.parse(request.xhr.responseText);
      callback(e.error, responseData);
    } catch (err) {
      callback(err, []);
    }
  };

  request.xhr.onerror = function(e) {
    callback(e.error, undefined);
  };
};

request.post = function(endpoint, params, callback) {
  request.registerHandlers(callback);
  
  var url = request.configEnv.proto + '://' + request.configEnv.host + ':' + 
  	request.configEnv.port + endpoint;
  request.xhr.open('POST', url);

  request.xhr.setRequestHeader('content-type', 'application/json');

  request.xhr.send(JSON.stringify(params));
};

request.get = function(endpoint, params, callback) {
  var qString = '';

  for (var key in params) {
    qString += key + '=' + params[key] + '&';
  }

  var url = request.configEnv.proto + '://' +
    request.configEnv.host + ':' +
    request.configEnv.port + endpoint +
    ((qString === '') ? '' : '?' + qString);

  request.registerHandlers(callback);
  request.xhr.open('GET', url);
  request.xhr.send();
};
