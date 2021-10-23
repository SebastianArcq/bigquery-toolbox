/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to log if devmode = 1
 */

// Send code to ALL BQ tabs (used in options.js and background.js)

// How do subscripts work?
// for options.js --> footer of options.html
// for background.js and iconClicked.js --> importScripts in background-wrapper.js

console.log(">>> executing f_executeScriptInTabs.js...");

function executeScriptInTabs(scriptName, callbackText) {
	devlog("> executing executeScriptInTab()");
	chrome.tabs.query({
	  url: "https://console.cloud.google.com/bigquery*"
	}, function(tabs) {
	  devlog(tabs);
	  tabs.forEach(t => {
		chrome.scripting.executeScript({
			target: {tabId: t.id},
			files: [scriptName]
		  },
		  function() {
			console.log(callbackText);
		  }
		);
	  });
	});
  }