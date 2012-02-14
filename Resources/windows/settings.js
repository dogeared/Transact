var win = Titanium.UI.currentWindow;

var label = Titanium.UI.createLabel({
	top: 20,
	left: 10,
	width: 'auto',
	height: 'auto',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left',
	text: 'Token: '
});

var tf = Titanium.UI.createTextField({
	top: 48,
	left: 10,
	height: 30,
	width: 250,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	color: '#336699',
	font: { fontSize: 24, fontWeight: 'bold' },
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var loginButton = Titanium.UI.createButton({
	top: 85,
	left: 10,
	width: 150,
	height: 30,
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'center',
	title: 'Login'
})

var switchLabel = Titanium.UI.createLabel({
	top: 120,
	left: 10,
	width: 'auto',
	height: 'auto',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left',
	text: 'Save?: '
});

var basicSwitch = Titanium.UI.createSwitch({
	top: 120,
	left: 100,
    value: false
});

win.add(label);
win.add(tf);
win.add(loginButton);
win.add(switchLabel);
win.add(basicSwitch);

/**
 * Event handlers
 * 
 */

tf.addEventListener('return', function() {
	tf.blur();
});

loginButton.addEventListener('click', function() {
  tf.blur();
  Ti.App.fireEvent('do_auth', {
    token: tf.value
  }); // support/custom_events.js
});

Ti.App.addEventListener('auth_result', function(e) {
	var message = (e.authenticated)?'Conrgrats! You are logged in.':'Boo! Bad token.';
	Ti.App.fireEvent('message', {
		message: message
	});
});
