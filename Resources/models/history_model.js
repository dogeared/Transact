var HistoryModel = {
	getHistory: function() {
		Ti.App.fireEvent('do_get_history');
	},
	process: function(ids) {
		Ti.App.fireEvent('do_update_history', {ids: ids});
	},
	data: []
}
