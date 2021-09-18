/*
 * Hide BigQuery Explorer Panel
 * Project homepage: https://arcq.de/hide-bigquery-explorer-panel/
 * Github: https://github.com/SebastianArcq/hide-bq-explorer/
 * 
 * MIT License
 * Sebastian Arcq
 */

console.log("executing inject.js..."); // --> log to browser console

(function() {

	if (window.location.href.includes("console.cloud.google.com/bigquery") == true) {

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
            sidebar.style.display = 'none'; // hide sidebar
            top_toolbar.style.display = 'none'; // hide top toolbar
            console.log('pausing for a bit...'); // the height is changed when the other elements are hidden. Needs a few ms to update.
            setTimeout(function() {
                query_results.style.height = '100%'; // hide query results
            }, (300));
            console.log('done, continuing');
            hide_status = "hidden" // update hide_status
            console.log("hide_status changed to: " + hide_status);

        } else {
            sidebar.style.display = 'flex'; // unhide sidebar
            top_toolbar.style.display = 'flex'; // unhide top toolbar
            query_results.style.height = '50%'; // unhide query results
            hide_status = 'not_hidden'; // update hide_status
            console.log("hide_status changed to: " + hide_status);
        }

    };

})();