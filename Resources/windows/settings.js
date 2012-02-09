var win = Titanium.UI.currentWindow;

var label = Titanium.UI.createLabel({
	top: 20,
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'Token: ',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

var tf = Titanium.UI.createTextField({
	top: 48,
	left: 5,
	height: 30,
	width: 250,
	color: '#336699',
	font: { fontSize: 24, fontWeight: 'bold' },
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

tf.addEventListener('return', function() {
	tf.blur();
});

win.add(label);
win.add(tf);
