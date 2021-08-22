/*
 * Hide BigQuery Explorer Panel
 * Project homepage: https://arcq.de/hide-bigquery-explorer-panel/
 * Github: <Github link coming soon...>
 * 
 * MIT License
 * Sebastian Arcq
 */

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});