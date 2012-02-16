var app = {};
var services = {};

Titanium.include('utils/messages.js');
Titanium.include('controllers/custom_events.js');

Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title: 'Transact',
    url: 'windows/transact.js',
    backgroundColor: '#fff'
});

var tab1 = Titanium.UI.createTab({  
    icon: 'images/tabs/piggy.png',
    title: 'Transact',
    window: win1
});

var win2 = Titanium.UI.createWindow({  
    title: 'History',
    url: 'windows/history.js',
    backgroundColor: '#fff'
});

var tab2 = Titanium.UI.createTab({  
    icon: 'images/tabs/safe.png',
    title: 'History',
    window: win2
});

var win3 = Titanium.UI.createWindow({  
    title: 'Settings',
    url: 'windows/settings.js',
    backgroundColor: '#fff'
});

var tab3 = Titanium.UI.createTab({  
    icon: 'images/tabs/preferences.png',
    title: 'Settings',
    window: win3
});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);

tabGroup.open({
	transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
});

if (Titanium.App.Properties.getBool('save')) {
	SessionModel.update(Titanium.App.Properties.getString('token'), true);
	Ti.App.fireEvent('do_auth', {token: SessionModel.token});
}
