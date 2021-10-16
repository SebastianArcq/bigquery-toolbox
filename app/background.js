/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * background.js core file
 */

console.log(">>> executing background.js..."); // background.js logs to service worker console!

// DEV MODE FUNCTIONALITY
// =============================================================================
// Set devmode = 1 to display all sorts of console logs
var devmode = 0;

function devlog(logtext) {
    if (devmode == 1) {
		console.log(logtext);
	} // otherwise: do nothing
};

devlog('Dev mode ON...');

// INSTALLATION (chrome.runtime.onInstalled)
// =============================================================================
// Initialize variables after installation 
// "Fired when the extension is first installed, when the extension is updated 
// to a new version, and when Chrome is updated to a new version."
chrome.runtime.onInstalled.addListener(() => {
	devlog(">>> executing runtime.onInstalled...");
	devlog("nothing happening here.");
});


// TAB UPDATED (chrome.tabs.onUpdated)
// =============================================================================
// "Fired when a tab is updated [i.e., the status changes]."
// Wait for tab to be loaded (listen for "changeInfo.status == "complete")
// Once loaded, call function to load settings and perform hide_top_toolbar and 
// minimize_new_query_button as required.
// change URL back to "https://console.cloud.google.com/bigquery"
chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		devlog(">>> executing tabs.onUpdated...");
		devlog('changeInfo.status: ' + changeInfo.status);

		// When page has loaded, call main()
		if (changeInfo.status == "complete") {
			devlog('status "complete".');
			if (tab.url.indexOf("https://console.cloud.google.com/bigquery") == 0) {
				devlog('url looking good: ' + tab.url);
				main();
			}
		};
	}
);

// TAB ACTIVATED (chrome.tabs.onActivated)
// =============================================================================
// "Fires when the active tab in a window changes."
chrome.tabs.onActivated.addListener((activeInfo) => {
	//devlog(">>> executing tabs.onActivated...");
	//devlog("nothing happening here.");
});


// LOAD SETTINGS
// "The chrome.storage API is asynchronous - it doesn't return it directly, 
// rather passing it as an argument to the callback function. The function call 
// itself always returns undefined."
function loadSettings() {
	devlog(">>> executing loadSettings()...");
	return new Promise(function(resolve, reject) {

		chrome.storage.sync.get({
				// Default fallback values (if undefined)
				hide_top_toolbar: false, 
				minimize_new_query_button: false
			},
			function(items) {

				// Log
				devlog('Value for hide_top_toolbar: ' + items.hide_top_toolbar);
				devlog('Value for minimize_new_query_button: ' + items.minimize_new_query_button);

				// Add all settings to a Map object
				var settingsArray = new Map()
				settingsArray.set('hide_top_toolbar', items.hide_top_toolbar);
				settingsArray.set('minimize_new_query_button', items.minimize_new_query_button);

				// Log
				devlog("settingsArray:");
				devlog(settingsArray);

				// Resolve
				resolve(settingsArray)
	  	});
	});
}

// ASYNC FUNCTION - LOAD SETTINGS, THEN APPLY SETTINGS
// =============================================================================
async function main(){
	devlog('>>> executing main()...')
	
	devlog('awaiting loadSettings()...')
	var settings = await loadSettings();
	devlog('Settings loaded.')

	var hide_top_toolbar = settings.get('hide_top_toolbar');
	var minimize_new_query_button = settings.get('minimize_new_query_button');

	devlog('Value for hide_top_toolbar: ' + hide_top_toolbar);
	devlog('Value for minimize_new_query_button: ' + minimize_new_query_button);

	// Apply settings (also see options.js)
	// hide_top_toolbar
    if (hide_top_toolbar == true) {
		executeScriptInTabs("f_TopToolbar_hide.js", "Top Toolbar hidden.");
	} else {
		executeScriptInTabs("f_TopToolbar_unhide.js", "Top Toolbar shown.");
	};

	// minimize_new_query_button
    if (minimize_new_query_button == true) {
		executeScriptInTabs("f_ComposeButton_mini.js", "New Query Button minimized.");
	} else {
		executeScriptInTabs("f_ComposeButton_maxi.js", "New Query Button maximized.");
	};
}


// Send code to ALL BQ tabs (also in options.js!)
// =============================================================================
function executeScriptInTabs(scriptName, callbackText) {
	devlog("executing executeScriptInTab()");
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

// CLICKING THE EXTENSION BUTTON
// =============================================================================
// This function is executed when the extension button is clicked:
// https://stackoverflow.com/questions/69596600/how-to-prevent-chrome-extension-to-run-on-chrome
// "If lastError has been set and you don't check it within the callback function, then an error will be raised."
// (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/lastError)
chrome.action.onClicked.addListener(function (tab) {
	devlog("executing addListener...");
	devlog("Tab id: " + tab.id);
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['iconClicked.js']
	//}).catch(() => {}); // this also works
	}, function() {
		let myError = chrome.runtime.lastError; // ignoring the error
		if (myError) {
			if (myError.message.includes("chrome://")) { 
				console.log("this extension only runs on console.cloud.google.com/bigquery");
			} else {
				console.log(myError.message); // shouldn't happen.
			};
		};
	}); 
});






// EOF