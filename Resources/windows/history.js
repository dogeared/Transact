win = Titanium.UI.currentWindow;

var label = Titanium.UI.createLabel({
	color: '#999',
	text: 'I am Window 2',
	font: {fontSize: 20,fontFamily: 'Helvetica Neue'},
	textAlign: 'center',
	width: 'auto'
});

win.add(label);
