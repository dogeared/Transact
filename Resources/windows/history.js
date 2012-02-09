win = Titanium.UI.currentWindow;

var data = [];
var date = new Date();

for (var i=0; i<10; i++) {
	var category = 'debit - main' + i;
	var amount = '14.' + i;
	var description = 'lunch'+i;
	date.setDate(date.getDate()-1);
	var dateString = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
	
	var row = Titanium.UI.createTableViewRow();
	row.height = 90;
	var dtLabel = Titanium.UI.createLabel({
		top: 5,
		left: 5,
		width: 100,
		height: 25,
		text: dateString
	});
	row.add(dtLabel);
	
	var cLabel = Titanium.UI.createLabel({
		top: 5,
		left: 110,
		width: 100,
		height: 25,
		text: category
	});
	row.add(cLabel);
	
	var aLabel = Titanium.UI.createLabel({
		top: 25,
		left: 5,
		width: 100,
		height: 25,
		text: '$'+amount
	});
	row.add(aLabel);
	
	
	var dsLabel = Titanium.UI.createLabel({
		top: 50,
		left: 5,
		width: 250,
		height: 25,
		text: description
	});
	row.add(dsLabel);
	
	data.push(row);	 
}

var tableView = Titanium.UI.createTableView({
	top: 0,
	height: 280, 
	borderWidth:1,
	borderColor: "black",
	data: data 
});

tableView.addEventListener('click', function(e) {
	var background = e.row.getBackgroundColor();
	if (background == null || background == '#fff') {
		e.row.setBackgroundColor('#500');
	} else {
		e.row.setBackgroundColor('#fff');
	}
});

var button = Titanium.UI.createButton({
	bottom: 15,
	height: 30,
	width: 150,
	title: 'process',
	font: { fontSize: 24 }
});

win.add(tableView);
win.add(button);