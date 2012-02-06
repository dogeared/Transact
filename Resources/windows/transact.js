var win = Titanium.UI.currentWindow;

var now = new Date();

var minDate = new Date();
minDate.setFullYear(now.getFullYear()-1);

var maxDate = new Date();
maxDate.setFullYear(now.getFullYear()+1);

var data = [];

// date
var row = Titanium.UI.createTableViewRow();

var dateLabel = Titanium.UI.createLabel({
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'Date: ' + now.getMonth() + '/' + now.getDay() + '/' + now.getFullYear(),
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

row.add(dateLabel);
row.hasChild = true;
data.push(row);

row = Titanium.UI.createTableViewRow();

view = Titanium.UI.createView();

var amountLabel = Titanium.UI.createLabel({
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'Amount: $',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

view.add(amountLabel);

var tf = Titanium.UI.createTextField({
	left: 125,
	height: 30,
	width: 150,
	color: '#336699',
	font: { fontSize: 24, fontWeight: 'bold' },
	keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

tf.addEventListener('return', function() {
	tf.blur();
});

view.add(tf);

row.add(view);
data.push(row);

row = Titanium.UI.createTableViewRow();

var categoryLabel = Titanium.UI.createLabel({
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'Category: ' + 'debit - main',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

row.add(categoryLabel);
row.hasChild = true;
data.push(row);

var tableView = Titanium.UI.createTableView({ 
	data: data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
win.add(tableView);

var plusButton = Titanium.UI.createButton({
	left: 115,
	height: 40,
	width: 40,
	title: '+',
	font: { fontSize: 24, fontWeight: 'bold' }
});

var minusButton = Titanium.UI.createButton({
	left: 165,
	height: 40,
	width: 40,
	title: '-',
	font: { fontSize: 24, fontWeight: 'bold' }
});

win.add(plusButton);
win.add(minusButton);
