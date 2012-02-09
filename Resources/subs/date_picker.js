var win = Titanium.UI.currentWindow;
var dateLabel = win.dateLabel;

var now = new Date();
var max = new Date();
max.setFullYear(now.getFullYear()+1);
var min = new Date();
min.setFullYear(now.getFullYear()-1);
var picker = Ti.UI.createPicker({	
	type:Ti.UI.PICKER_TYPE_DATE,
	value: dateLabel.dateValue,
	minDate: min,
	maxDate: max

});

picker.selectionIndicator = true;

picker.addEventListener('change', function(e) {
	dateLabel.dateValue = e.value;
	dateLabel.text = (e.value.getMonth()+1) + '/' + e.value.getDate() + '/' + e.value.getFullYear();
})

win.add(picker);