/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 */

// console.log("executing inject.js..."); // --> log to console

(function() {

    // FUNCTION TO HIDE ELEMENTS
    function hideElements(options) {
        console.log("calling hideElements()...");

        hide_explorer_panel = options.get('hide_explorer_panel');
        hide_top_toolbar = options.get('hide_top_toolbar');
        hide_query_results = options.get('hide_query_results');

        console.log('Value for hide_explorer_panel: ' + hide_explorer_panel);
        console.log('Value for hide_top_toolbar: ' + hide_top_toolbar);
        console.log('Value for hide_query_results: ' + hide_query_results);

        // Declare relevant objects
        // BQ exlorer (containing projects, tables)
        sidebar = document.querySelectorAll("cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-vertical")[0];
        // Hide top toolbar ("Features & Info" / "Shortcut" / "Disable Editor Tabs")
        top_toolbar = document.querySelectorAll("#default-action-bar > mat-toolbar")[0];
        // Hide query results
        query_results= document.querySelectorAll("cfc-panel.cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-horizontal")[0];
        
        // Initialize hide_status
        if (typeof hide_status == 'undefined') {
            hide_status = 'not_hidden';
        }
        console.log("hide_status: " + hide_status);
        
        // Hide / Unhide
        if (hide_status == "not_hidden") {

            if (hide_explorer_panel == true) {
                sidebar.style.display = 'none'; // hide sidebar
            };

            if (hide_top_toolbar == true) {
                top_toolbar.style.display = 'none'; // hide top toolbar
            };

            if (hide_query_results == true) {
                console.log('pausing for a bit...'); // the height is changed when the other elements are hidden. Needs a few ms to update.
                setTimeout(function() {
                    query_results.style.height = '100%'; // hide query results
                }, (300));
                console.log('done, continuing');
            };
            
            hide_status = "hidden" // update hide_status

            console.log("hide_status changed to: " + hide_status);

        } else {

            if (hide_explorer_panel == true) {
                sidebar.style.display = 'flex'; // unhide sidebar
            };

            if (hide_top_toolbar == true) {
                top_toolbar.style.display = 'flex'; // unhide top toolbar
            };

            if (hide_query_results == true) {
                query_results.style.height = '50%'; // unhide query results
            };
       
            hide_status = 'not_hidden'; // update hide_status

            console.log("hide_status changed to: " + hide_status);
        };
    };
    
    // ASYNC LOAD SETTINGS; CALL HIDE ELEMENTS WHEN SUCCESSFUL
	if (window.location.href.includes("console.cloud.google.com/bigquery") == true) {

        chrome.storage.sync.get({
            // Use default values
            hide_explorer_panel: true,
            hide_top_toolbar: false,
            hide_query_results: false
        }, function(items) {

            // Log values of vars to console
            //console.log('Value for hide_explorer_panel: ' + items.hide_explorer_panel);
            //console.log('Value for hide_top_toolbar: ' + items.hide_top_toolbar);
            //console.log('Value for hide_query_results: ' + items.hide_query_results);

            // Add all settings to a Map object
            var settingsArray = new Map()
            settingsArray.set('hide_explorer_panel', items.hide_explorer_panel);
            settingsArray.set('hide_top_toolbar', items.hide_top_toolbar);
            settingsArray.set('hide_query_results', items.hide_query_results);

            // Call hideElements with the three settings as parameters
            hideElements(settingsArray);
            
          });
    } else {
        console.log('this extension only runs on console.cloud.google.com/bigquery');
    };


})();