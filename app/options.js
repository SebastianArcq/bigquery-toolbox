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

devlog(">>> executing options.js...");

// Saves options to chrome.storage
// =============================================================================
// Stores the current status of all check boxes to chrome.storage

function save_options() {
  devlog("> executing save_options()...");
  
  var hide_explorer_panel = document.getElementById('hide_explorer_panel').checked;
  var hide_nav_menu = document.getElementById('hide_nav_menu').checked;
  var hide_top_bar = document.getElementById('hide_top_bar').checked;
  var hide_query_results = document.getElementById('hide_query_results').checked;
  //var hide_top_toolbar = document.getElementById('hide_top_toolbar').checked; // removed after BQ redesign
  //var minimize_new_query_button = document.getElementById('minimize_new_query_button').checked; // removed after BQ redesign
  var tabs_multirow = document.getElementById('tabs_multirow').checked;

  chrome.storage.sync.set({
    hide_explorer_panel: hide_explorer_panel,
    hide_nav_menu: hide_nav_menu,
    hide_top_bar: hide_top_bar,
    hide_query_results: hide_query_results,
    //hide_top_toolbar: hide_top_toolbar,
    //minimize_new_query_button: minimize_new_query_button,
    tabs_multirow: tabs_multirow
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
            hide_explorer_panel: false,
            hide_nav_menu: true,
            hide_top_bar: true,
            hide_query_results: false,
            //hide_top_toolbar: false,            
            //minimize_new_query_button: false,
            tabs_multirow: false
        },
        function(items) {
            document.getElementById('hide_nav_menu').checked = items.hide_nav_menu;
            document.getElementById('hide_explorer_panel').checked = items.hide_explorer_panel;
            document.getElementById('hide_top_bar').checked = items.hide_top_bar;
            document.getElementById('hide_query_results').checked = items.hide_query_results;
            //document.getElementById('hide_top_toolbar').checked = items.hide_top_toolbar;
            //document.getElementById('minimize_new_query_button').checked = items.minimize_new_query_button;
            document.getElementById('tabs_multirow').checked = items.tabs_multirow;
        });
};


// Function to apply settings (save, but not close)
// =============================================================================
// There are two types of features:
// 1. Icon-click-features: Are executed when clicking the icon. Those just need to be saved.
//    --> hide_explorer_panel, hide_query_results, hide_nav_menu, hide_top_bar
//    --> these are done in iconClicked.js
// 2. Options-features: Are set in the Option menu. Those need to be applied when clicking the Apply / Save buttons
//    --> hide_top_toolbar, minimize_new_query_button, tabs_multirow
//    --> these are done here

function applySettings() {
    devlog("> executing applySettings()...");

    // Determine the state of the check boxes (for Options-features only)
    //chk_hideTopToolbar = document.getElementById('hide_top_toolbar').checked;
    //chk_minimizeNewQueryButton = document.getElementById('minimize_new_query_button').checked;
    chk_tabs_multirow = document.getElementById('tabs_multirow').checked;
  
    // Log
    //devlog('chk_hideTopToolbar: ' + chk_hideTopToolbar);
    //devlog('chk_minimizeNewQueryButton: ' + chk_minimizeNewQueryButton);
    devlog('chk_tabs_multirow: ' + chk_tabs_multirow);
  
    // apply chk_hideTopToolbar
    /*
    if (chk_hideTopToolbar == true) { // if the checkbox says "hide"
      executeScriptInTabs(f_TopToolbar_toggle, "hidden", "Top Toolbar is hidden.");
	  } else {
      executeScriptInTabs(f_TopToolbar_toggle, "shown", "Top Toolbar is not hidden.");
    };*/
    
    // apply chk_minimizeNewQueryButton
    /*
    if (chk_minimizeNewQueryButton == true) {
      executeScriptInTabs(f_ComposeButton_toggle, "mini", "New Query Button is minimized.");
    } else {
      executeScriptInTabs(f_ComposeButton_toggle, "maxi", "New Query Button is not minimized.");
    };*/

    // apply chk_tabs_multirow
    if (chk_tabs_multirow == true) {
      executeScriptInTabs(f_TabLayout_toggle, "newTab", "New Tab Layout is activated.");
    } else {
      executeScriptInTabs(f_TabLayout_toggle, "oldTab", "New Tab Layout is not activated.");
    };
};


// =============================================================================
// ASSIGN BUTTONS --> FUNCTIONS
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
  applySettings();
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
