Titanium.include('../models/transact_model.js');

var win = Titanium.UI.currentWindow;

var data = [];

var row = Titanium.UI.createTableViewRow();

var dateLabel = Titanium.UI.createLabel({
	left: 5,
	width: 200,
	height: 'auto',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

row.add(dateLabel);
row.hasChild = true;
row.child = '../subs/date_picker.js';
row.subName = 'Date';
data.push(row);

row = Titanium.UI.createTableViewRow();

var amountLabel = Titanium.UI.createLabel({
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'Amount: $',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

var amountTF = Titanium.UI.createTextField({
	left: 125,
	height: 30,
	width: 150,
	font: { fontSize: 24, fontWeight: 'bold' },
	keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

amountTF.addEventListener('return', function() { amountTF.blur(); });

row.add(amountLabel);
row.add(amountTF);
data.push(row);

row = Titanium.UI.createTableViewRow();

var descLabel = Titanium.UI.createLabel({
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'Desc: ',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left'
});

var descTF = Titanium.UI.createTextField({
	left: 125,
	height: 30,
	width: 150,
	font: { fontSize: 24, fontWeight: 'bold' },
	returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED	
});

descTF.addEventListener('return', function() { descTF.blur(); });

row.add(descLabel);
row.add(descTF);
data.push(row);

row = Titanium.UI.createTableViewRow();

var categoryLabel = Titanium.UI.createLabel({
	left: 5,
	width: 'auto',
	height: 'auto',
	text: 'debit - main',
	font: { fontSize: 24, fontWeight: 'bold' },
	textAlign: 'left',
	pickerRow: 0
});

row.add(categoryLabel);
row.hasChild = true;
row.child = '../subs/category_picker.js';
row.subName = 'Category';
data.push(row);

var tableView = Titanium.UI.createTableView({
	data: data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

tableView.addEventListener('click', function(e) {
	if (e.rowData.child) {
		subWin = Titanium.UI.createWindow({
			url: e.rowData.child,
			title: e.rowData.subName
		});
		
		subWin.dateLabel = dateLabel;
		subWin.categoryLabel = categoryLabel;
		
		Titanium.UI.currentTab.open(subWin,{animated:true});
	}
});

win.add(tableView);

var processResult = function(result) {
	if (result.status === "SUCCESS") {
		amountTF.setValue("");
		descTF.setValue("");
	}
	Ti.App.fireEvent('message', {
    	message: result.message
    });
}

var plusButton = Titanium.UI.createButton({
	top: 200,
	left: 10,
	height: 80,
	width: 80,
	title: '+',
	font: { fontSize: 48, fontWeight: 'bold' }
});

plusButton.addEventListener('click', function(e) {
	var data = {
		date: dateLabel.text, 
		amount: amountTF.getValue(), 
		description: descTF.getValue(), 
		category: categoryLabel.text
	};
	TransactModel.credit(data);
});

var minusButton = Titanium.UI.createButton({
	top: 200,
	left: 230,
	height: 80,
	width: 80,
	title: '-',
	font: { fontSize: 48, fontWeight: 'bold' }
});

minusButton.addEventListener('click', function(e) {
	var data = {
		date: dateLabel.text, 
		amount: amountTF.getValue(), 
		description: descTF.getValue(), 
		category: categoryLabel.text
	};
	TransactModel.debit(data);
});

win.add(plusButton);
win.add(minusButton);

Ti.App.addEventListener('transaction_result', function(e) {
	processResult(e.result);
});

Ti.App.addEventListener('update_date', function(e) {
	dateLabel.setText((e.date.getMonth()+1) + '/' + e.date.getDate() + '/' + e.date.getFullYear());
	dateLabel.dateValue = e.date;
});

Ti.App.fireEvent('update_date', {date: new Date()});