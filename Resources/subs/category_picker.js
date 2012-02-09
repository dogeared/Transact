var win = Titanium.UI.currentWindow;
var categoryLabel = win.categoryLabel;

var picker = Ti.UI.createPicker();

var data = [];
data[0]=Ti.UI.createPickerRow({title:'debit - main'});
data[1]=Ti.UI.createPickerRow({title:'debit - mortgage'});
data[2]=Ti.UI.createPickerRow({title:'savings'});
data[3]=Ti.UI.createPickerRow({title:'cash'});

picker.selectionIndicator = true;

picker.add(data);

picker.setSelectedRow(0,categoryLabel.pickerRow,false);

picker.addEventListener('change', function(e) {
	categoryLabel.text = e.row.title;
	categoryLabel.pickerRow = e.rowIndex;
})

win.add(picker);