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

var saveSwitch = Titanium.UI.createSwitch({
	top: 120,
	left: 100,
    value: false
});

win.add(label);
win.add(tf);
win.add(loginButton);
win.add(switchLabel);
win.add(saveSwitch);

/**
 * Event handlers
 * 
 */

Ti.App.addEventListener('get_session_model_result', function(e) {
	if (e.SessionModel.save) {
		tf.value = e.SessionModel.token;
		saveSwitch.setValue(true);
	}
});

win.addEventListener('focus', function() {
	Ti.App.fireEvent('get_session_model');
})

tf.addEventListener('return', function() {
	tf.blur();
});

tf.addEventListener('blur', function() {
	Ti.App.fireEvent('set_session_model', {token: tf.value, save: saveSwitch.value});
});

loginButton.addEventListener('click', function() {
  tf.blur();
  Ti.App.fireEvent('do_auth', {
    token: tf.value
  });
});

saveSwitch.addEventListener('change', function(e) {
	Ti.App.fireEvent('set_session_model', {token: tf.value, save: saveSwitch.value});
});
