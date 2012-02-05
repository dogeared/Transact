Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title: 'Transact',
    backgroundColor: '#fff'
});

var tab1 = Titanium.UI.createTab({  
    icon: 'KS_nav_views.png',
    title: 'Transact',
    window: win1
});

var label1 = Titanium.UI.createLabel({
	color: '#999',
	text: 'I am Window 1',
	font: {fontSize: 20,fontFamily: 'Helvetica Neue'},
	textAlign: 'center',
	width: 'auto'
});

win1.add(label1);

var win2 = Titanium.UI.createWindow({  
    title: 'History',
    backgroundColor: '#fff'
});

var tab2 = Titanium.UI.createTab({  
    icon: 'KS_nav_ui.png',
    title: 'History',
    window: win2
});

var label2 = Titanium.UI.createLabel({
	color: '#999',
	text: 'I am Window 2',
	font: {fontSize: 20,fontFamily: 'Helvetica Neue'},
	textAlign: 'center',
	width: 'auto'
});

win2.add(label2);

var win3 = Titanium.UI.createWindow({  
    title: 'Settings',
    backgroundColor: '#fff'
});

var tab3 = Titanium.UI.createTab({  
    icon: 'KS_nav_ui.png',
    title: 'Settings',
    window: win3
});

var label3 = Titanium.UI.createLabel({
	color: '#999',
	text: 'I am Window 3',
	font: {fontSize: 20,fontFamily: 'Helvetica Neue'},
	textAlign: 'center',
	width: 'auto'
});

win3.add(label3);

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);

tabGroup.open();