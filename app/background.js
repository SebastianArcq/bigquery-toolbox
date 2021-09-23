/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
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