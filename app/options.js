/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * This file now only deals with things happen in the option menu
 */

console.log(">>> executing options.js...");

// Saves options to chrome.storage
// =============================================================================
// Stores the current status of all check boxes to chrome.storage

function save_options() {
  devlog("> executing save_options()...");
  
  var hide_explorer_panel = document.getElementById('hide_explorer_panel').checked;
  var hide_query_results = document.getElementById('hide_query_results').checked;
  var hide_top_toolbar = document.getElementById('hide_top_toolbar').checked;
  var minimize_new_query_button = document.getElementById('minimize_new_query_button').checked;

  chrome.storage.sync.set({
    hide_explorer_panel: hide_explorer_panel,
    hide_top_toolbar: hide_top_toolbar,
    hide_query_results: hide_query_results,
    minimize_new_query_button: minimize_new_query_button
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
};

// Restore options from chrome.storage
// =============================================================================
// Restores checkbox state using the preferences stored in chrome.storage.
function restore_options() {
    devlog("> executing restore_options()...");

    chrome.storage.sync.get({
            // Default fallback values (if undefined)
            hide_explorer_panel: true,
            hide_top_toolbar: false,
            hide_query_results: false,
            minimize_new_query_button: false
        },
        function(items) {
            document.getElementById('hide_explorer_panel').checked = items.hide_explorer_panel;
            document.getElementById('hide_top_toolbar').checked = items.hide_top_toolbar;
            document.getElementById('hide_query_results').checked = items.hide_query_results;
            document.getElementById('minimize_new_query_button').checked = items.minimize_new_query_button;
        });
};


// Function to apply settings (save, but not close)
// =============================================================================
// There are two types of features:
// 1. Icon-click-features: Are executed when clicking the icon. Those just need to be saved.
//    --> hide_explorer_panel, hide_query_results
// 2. Options-features: Are set in the Option menu. Those need to be applied when clicking the Apply / Save buttons
//    --> hide_top_toolbar, minimize_new_query_button

function applySettings() {
    devlog("> executing applySettings()...");

    // Determine the state of the check boxes (for Options-features only)
    chk_hideTopToolbar = document.getElementById('hide_top_toolbar').checked;
    chk_minimizeNewQueryButton = document.getElementById('minimize_new_query_button').checked;
    
    // Log
    devlog('chk_hideTopToolbar: ' + chk_hideTopToolbar);
    devlog('chk_minimizeNewQueryButton: ' + chk_minimizeNewQueryButton);
  
    // apply chk_hideTopToolbar
    if (chk_hideTopToolbar == true) {
      executeScriptInTabs("f_TopToolbar_hide.js", "Top Toolbar hidden.");
	} else {
		  executeScriptInTabs("f_TopToolbar_unhide.js", "Top Toolbar shown.");
    };

    // apply chk_minimizeNewQueryButton
    if (chk_minimizeNewQueryButton == true) {
      executeScriptInTabs("f_ComposeButton_mini.js", "New Query Button minimized.");
    } else {
      executeScriptInTabs("f_ComposeButton_maxi.js", "New Query Button maximized.");
	};
};


// =============================================================================
// BUTTONS --> FUNCTIONS
// =============================================================================

// Function to close the current options tab
// =============================================================================
function closeOptionsTab() {
  devlog("> executing closeOptionsTab()...");

  chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() { });
  });
};

// Function to save, wait, then close the current options tab
// =============================================================================
function buttonSaveAndClose() {
  devlog("> executing buttonSaveAndClose()...");
  save_options();
  applySettings()
  // Wait a bit before closing the tab so the "save" message can be seen.
  setTimeout(function() {
      closeOptionsTab();
  }, 750);    
};

// Click Apply button --> save and apply options, but don't close the options
// =============================================================================
function buttonApply() {
  devlog("> executing buttonApply()...");
  save_options();
  applySettings();
};

// =============================================================================
// EVENT LISTENERS
// =============================================================================
// Event listeners: Page loaded
// Restore options after options page has loaded
document.addEventListener('DOMContentLoaded', restore_options);

// Event listeners: Buttons clicked
document.getElementById('save_button').addEventListener('click', buttonSaveAndClose);
document.getElementById('apply_button').addEventListener('click', buttonApply);
