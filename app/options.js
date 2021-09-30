/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 */

// CODE SNIPPETS:
// https://developer.chrome.com/docs/extensions/mv3/options/
// https://developer.chrome.com/docs/extensions/reference/storage/

// Saves options to chrome.storage
function save_options() {
  
  var hide_explorer_panel = document.getElementById('hide_explorer_panel').checked;
  var hide_top_toolbar = document.getElementById('hide_top_toolbar').checked;
  var hide_query_results = document.getElementById('hide_query_results').checked;
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default values
    chrome.storage.sync.get({
        hide_explorer_panel: true,
        hide_top_toolbar: false,
        hide_query_results: false,
        minimize_new_query_button: false
    }, function(items) {
    document.getElementById('hide_explorer_panel').checked = items.hide_explorer_panel;
    document.getElementById('hide_top_toolbar').checked = items.hide_top_toolbar;
    document.getElementById('hide_query_results').checked = items.hide_query_results;
    document.getElementById('minimize_new_query_button').checked = items.minimize_new_query_button;
  });
};

// Function to close the current options tab
function closeOptionsTab() {
    chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() { });
    });
};

// Function to save, wait, then close the current options tab
function saveAndClose() {
    save_options();
    setTimeout(function() {
        closeOptionsTab();
    }, 750);    
};

// Function to apply (save, but not close)
function apply() {
  save_options();   
};


// Listen to change of the tick box status
// https://stackoverflow.com/questions/24172963/jquery-change-method-in-vanilla-javascript
// https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
document.querySelector('#hide_top_toolbar').addEventListener('change',function(){
  if (document.getElementById('hide_top_toolbar').checked) {
    console.log("box checked");
    executeScriptInTab("f_HideTopToolbar.js", "HideTopToolbar toggled")

  } else {
    console.log("box un-checked");
  }
});

// Send code to BQ tabs
function executeScriptInTab(scriptName, callbackText) {
  console.log("executing executeScriptInTab()");
  chrome.tabs.query({
    url: "https://console.cloud.google.com/bigquery*"
  }, function(tabs) {
    console.log(tabs);
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

// Event listeners: Page loaded
document.addEventListener('DOMContentLoaded', restore_options);

// Event listeners: Buttons clicked
document.getElementById('save_button').addEventListener('click', saveAndClose);
document.getElementById('apply_button').addEventListener('click', apply);
