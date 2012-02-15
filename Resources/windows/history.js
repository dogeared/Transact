Titanium.include('../models/history_model.js');

win = Titanium.UI.currentWindow;

var tableView = Titanium.UI.createTableView({
	top: 0,
	height: 300, 
	borderWidth:1,
	borderColor: "black",
	data: [] 
});

tableView.addEventListener('click', function(e) {
	var background = e.row.getBackgroundColor();
	if (background == null || background == '#fff') {
		e.row.setBackgroundColor('#7EE01B');
		HistoryModel.data[e.index].selected = true;
	} else {
		e.row.setBackgroundColor('#fff');
		HistoryModel.data[e.index].selected = false;
	}
});

var button = Titanium.UI.createButton({
	bottom: 15,
	height: 30,
	width: 150,
	title: 'process',
	font: { fontSize: 24 }
});

button.addEventListener('click', function(e) {
	var data = HistoryModel.data;
	var ids = [];
	
	for (var i=0; i<data.length; i++) {
		if (data[i].selected) {
			ids.push(data[i].id);
		}
	}
	HistoryModel.process(ids);
});

var refresh = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
});

refresh.addEventListener('click', function() {
	HistoryModel.getHistory();
});

win.rightNavButton = refresh;

win.add(tableView);
win.add(button);

Ti.App.addEventListener('get_history_result', function(e) {
	HistoryModel.data = [];
	var data = (e.data)?e.data:[];
	var tableData = [];
	for (i=0; i<data.length; i++) {
		var row = Titanium.UI.createTableViewRow();
		row.height = 90;
		var dtLabel = Titanium.UI.createLabel({
			top: 5,
			left: 5,
			width: 100,
			height: 25,
			text: data[i].date
		});
		row.add(dtLabel);
		
		var cLabel = Titanium.UI.createLabel({
			top: 5,
			left: 110,
			width: 100,
			height: 25,
			text: data[i].category
		});
		row.add(cLabel);
		
		var aLabel = Titanium.UI.createLabel({
			top: 25,
			left: 5,
			width: 100,
			height: 25,
			text: '$'+data[i].amount
		});
		row.add(aLabel);
		
		var dsLabel = Titanium.UI.createLabel({
			top: 50,
			left: 5,
			width: 250,
			height: 25,
			text: data[i].description
		});
		row.add(dsLabel);
		HistoryModel.data.push({selected: false, id: data[i]._id});
		
		tableData.push(row);
	}
	
	tableView.setData(tableData);
});

HistoryModel.getHistory();
