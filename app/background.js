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

devlog(">>> executing background.js..."); // background.js logs to service worker console!

// INSTALLATION (chrome.runtime.onInstalled)
// =============================================================================
// "Fired when the extension is first installed, when the extension is updated 
// to a new version, and when Chrome is updated to a new version."
chrome.runtime.onInstalled.addListener(
	function(details) {
		devlog("> executing runtime.onInstalled...");	
		devlog("details.reason: " + details.reason);

		// After install (not after update):
		if (details.reason == "install") { 
			
			// Show 'Welcome' popup
			chrome.tabs.create({
				url: 'welcome.html'
			});

			// add a badge to the icon (is removed on click, see below)
			chrome.action.setBadgeText({text: "new"});
			chrome.action.setBadgeBackgroundColor({color: "#FF2923"});

		};
	}
);


// TAB UPDATED (chrome.tabs.onUpdated)
// =============================================================================
// "Fired when a tab is updated [i.e., the status changes]."
// Wait for tab to be loaded (listen for "changeInfo.status == "complete")
// Once loaded, call function to load settings and perform hide_top_toolbar and 
// minimize_new_query_button as required.
// change URL back to "https://console.cloud.google.com/bigquery"
chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		devlog("> executing tabs.onUpdated...");
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
	devlog("> executing loadSettings()...");
	return new Promise(function(resolve, reject) {

		chrome.storage.sync.get({
				// Default fallback values (if undefined)
				// hide_top_toolbar: false, // removed
				// minimize_new_query_button: false, // removed
				tabs_multirow: false
			},
			function(items) {

				// Log
				// devlog('Value for hide_top_toolbar: ' + items.hide_top_toolbar); // removed
				// devlog('Value for minimize_new_query_button: ' + items.minimize_new_query_button); // removed
				devlog('Value for tabs_multirow: ' + items.tabs_multirow);

				// Add all settings to a Map object
				var settingsArray = new Map()
				// settingsArray.set('hide_top_toolbar', items.hide_top_toolbar); // removed
				// settingsArray.set('minimize_new_query_button', items.minimize_new_query_button); // removed
				settingsArray.set('tabs_multirow', items.tabs_multirow);

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
	devlog('> executing main()...')
	
	devlog('awaiting loadSettings()...')
	var settings = await loadSettings();
	devlog('Settings loaded.')

	// var hide_top_toolbar = settings.get('hide_top_toolbar'); // removed
	// var minimize_new_query_button = settings.get('minimize_new_query_button'); // // removed
	var tabs_multirow = settings.get('tabs_multirow');

	// devlog('Value for hide_top_toolbar: ' + hide_top_toolbar); // removed
	// devlog('Value for minimize_new_query_button: ' + minimize_new_query_button); // removed
	devlog('Value for tabs_multirow: ' + tabs_multirow);

	// Apply settings (also see options.js)
    /*
    if (hide_top_toolbar == true) { // if the checkbox says "hide"
		executeScriptInTabs(f_TopToolbar_toggle, "hidden", "Top Toolbar hidden.");
		} else {
		executeScriptInTabs(f_TopToolbar_toggle, "shown", "Top Toolbar shown.");
	};*/

    /*
	if (minimize_new_query_button == true) {
		executeScriptInTabs(f_ComposeButton_toggle, "mini", "New Query Button minimized.");
	  } else {
		executeScriptInTabs(f_ComposeButton_toggle, "maxi", "New Query Button maximized.");
	};*/

	if (tabs_multirow == true) {
		executeScriptInTabs(f_TabLayout_toggle, "newTab", "New Tab Layout is activated.");
	  } else {
		executeScriptInTabs(f_TabLayout_toggle, "oldTab", "New Tab Layout is not activated.");
	};
}


// CLICKING THE EXTENSION BUTTON
// =============================================================================
// This function is executed when the extension button is clicked:
// https://stackoverflow.com/questions/69596600/how-to-prevent-chrome-extension-to-run-on-chrome
// "If lastError has been set and you don't check it within the callback function, then an error will be raised."
// (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/lastError)
chrome.action.onClicked.addListener(function (tab) {
	devlog("> executing addListener...");
	chrome.action.setBadgeText({text: ""}); // remove icon badge text
	devlog("Tab id: " + tab.id);
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['f_devlog.js', 'iconClicked.js']
	}, function() {
		let myError = chrome.runtime.lastError; // needs to be checked to be ignored
		if (myError) {
			if (myError.message.includes("chrome://") || myError.message.includes("chrome-extension://")) {
				console.log("this extension only runs on console.cloud.google.com/bigquery");
			} else {
				console.log(myError.message); // shouldn't happen.
			};
		};
	}); 
});
// EOF