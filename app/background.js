/*
 * Hide BigQuery Explorer Panel
 * Project homepage: https://arcq.de/hide-bigquery-explorer-panel/
 * Github: https://github.com/SebastianArcq/hide-bq-explorer/
 * 
 * MIT License
 * Sebastian Arcq
 */

console.log("executing background.js"); // --> service worker console
 
async function getCurrentTab() {
   let queryOptions = { active: true, currentWindow: true };
   let [tab] = await chrome.tabs.query(queryOptions);
   return tab;
 }

chrome.action.onClicked.addListener(async function (tab) {
	//console.log("click");
	//console.log("Tab id: " + tab.id);
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['inject.js']
	});
});