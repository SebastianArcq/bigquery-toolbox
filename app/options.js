/*
 * Hide BigQuery Explorer Panel
 * Project homepage: https://arcq.de/hide-bigquery-explorer-panel/
 * Github: https://github.com/SebastianArcq/hide-bq-explorer/
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

  chrome.storage.sync.set({
    hide_explorer_panel: hide_explorer_panel,
    hide_top_toolbar: hide_top_toolbar,
    hide_query_results: hide_query_results
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
        hide_query_results: false
    }, function(items) {
    document.getElementById('hide_explorer_panel').checked = items.hide_explorer_panel;
    document.getElementById('hide_top_toolbar').checked = items.hide_top_toolbar;
    document.getElementById('hide_query_results').checked = items.hide_query_results;
  });
};

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);
