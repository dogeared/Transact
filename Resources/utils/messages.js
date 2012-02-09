/**
 * CREATE CUSTOM LOADING INDICATOR
 */

(function() {
  app.indicatorInit = function() {
    if (Ti.Platform.osname !== 'android') {
      app.indWin = Titanium.UI.createWindow({
        height: 150,
        width: 250
      });

      var indView = Titanium.UI.createView({
        height: 150,
        width: 250,
        backgroundColor: '#000',
        borderRadius: 10,
        opacity: 0.8
      });

      app.indWin.add(indView);
    }

    app.actInd = Titanium.UI.createActivityIndicator({
      style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
      height: 30,
      width: 30
    });
    
    if (Ti.Platform.osname !== 'android') {
      app.indWin.add(app.actInd);

      app.indMessageLabel = Titanium.UI.createLabel({
        color: '#fff',
        width: 'auto',
        height: 'auto',
        font: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        bottom: 20,
        textAlign: 'center'
      });
      app.indWin.add(app.indMessageLabel);
    }
  }

  app.messageInit = function() {
    app.messageWin = Titanium.UI.createWindow({
      height: 150,
      width: 250,
      borderRadius: 10,
      touchEnabled: false,
   
      orientationModes: [
        Titanium.UI.PORTRAIT,
        Titanium.UI.UPSIDE_PORTRAIT,
        Titanium.UI.LANDSCAPE_LEFT,
        Titanium.UI.LANDSCAPE_RIGHT
      ]
    });
  
    var messageView = Titanium.UI.createView({
      id: 'messageview',
      height: 150,
      width: 250,
      borderRadius: 10,
      backgroundColor: '#000',
      opacity: 0.7,
      touchEnabled: false
    });
  
    app.messageLabel = Titanium.UI.createLabel({
      id: 'messagelabel',
      color: '#fff',
      width: 240,
      height: 'auto',
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 20,
        fontWeight: 'bold'
      },
      textAlign: 'center'
    });
    app.messageWin.add(messageView);
    app.messageWin.add(app.messageLabel);    
  }

 app.showIndicator = function(e) {
    var messageText = (e && e.message) ? e.message : L('getting_deals');

    if (Ti.Platform.osname !== 'android') {
      app.indMessageLabel.text = messageText;
    }
    else {
      app.actInd.message = messageText;
    }

    app.actInd.show();
    app.indWin.open();
  };

  app.hideIndicator = function() {
    app.actInd.hide();
    if (Ti.Platform.osname != 'android') {
      app.indWin.close({ opacity:0, duration:500 });
    }
  };

  app.handleMessage = function(e) {
    app.messageLabel.text = e.message;
    app.messageWin.open();

    if (e.duration) {
      setTimeout(function() {
        app.messageWin.close({ opacity: 0, duration: 500 });
        if (e.callback) {
          callback();
        }
      }, (e.duration * 1000));
    }
  }
})();

app.indicatorInit();
app.messageInit();

/**
 * Add global event handlers to hide/show custom indicator
 */

Titanium.App.addEventListener('show_indicator', function(e) {
  app.showIndicator(e);
});

Titanium.App.addEventListener('hide_indicator', function(e) {
  app.hideIndicator();
});

Titanium.App.addEventListener('message', function(e) {
  if (!e.duration) {
    e.duration = 2;
  }
  app.handleMessage(e);
});

Titanium.App.addEventListener('show_message', function(e) {
  app.handleMessage(e);
});

Titanium.App.addEventListener('hide_message', function(e) {
  app.messageWin.close({ opacity: 0, duration: 500 });
});
