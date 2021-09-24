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

    // FUNCTION TO MINIMIZE 'COMPOSE NEW QUERY'-BUTTON
    function toggleComposeButton(para) {
        if (para == 'minimize') {
            var oldString = 'Compose new query';
            var newString = '<!--Compose new query-->';
        } else if (para == 'maximize') {
            var oldString = '<!--Compose new query-->';
            var newString = 'Compose new query';
        };

        var button_wrappers = document.querySelectorAll("span.mat-button-wrapper"); // returns an array ("NodeList") of all spans with that class (30+)

        button_wrappers.forEach(function(item) { // loop through all elements
            if (item.innerHTML.includes(oldString)) { // look for oldstring ("Compose new query")
                item.innerHTML = item.innerHTML.replace(oldString, newString); // replace oldstring with newstring
            }  
        });
    };

    // FUNCTION TO HIDE ELEMENTS
    function hideElements(options) {
        console.log("calling hideElements()...");

        // Retrieve options from function parameter
        var hide_explorer_panel = options.get('hide_explorer_panel');
        var hide_top_toolbar = options.get('hide_top_toolbar');
        var hide_query_results = options.get('hide_query_results');
        var minimize_new_query_button = options.get('minimize_new_query_button');

        console.log('Value for hide_explorer_panel: ' + hide_explorer_panel);
        console.log('Value for hide_top_toolbar: ' + hide_top_toolbar);
        console.log('Value for hide_query_results: ' + hide_query_results);
        console.log('Value for minimize_new_query_button: ' + minimize_new_query_button);

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
            
            // Hide all the things:
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

            if (minimize_new_query_button == true) {
                toggleComposeButton('minimize'); // Call toggleComposeButton to minimize button
            };  
            
            hide_status = "hidden" // update hide_status
            console.log("hide_status changed to: " + hide_status);

        } else {
            
            // Unhide all the things:
            if (hide_explorer_panel == true) {
                sidebar.style.display = 'flex'; // unhide sidebar
            };

            if (hide_top_toolbar == true) {
                top_toolbar.style.display = 'flex'; // unhide top toolbar
            };

            if (hide_query_results == true) {
                query_results.style.height = '50%'; // unhide query results
            };

            if (minimize_new_query_button == true) {
                toggleComposeButton('maximize'); // Call toggleComposeButton to maximize button
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
            hide_query_results: false,
            minimize_new_query_button: false
        }, function(items) {

            // Log values of vars to console
            //console.log('Value for hide_explorer_panel: ' + items.hide_explorer_panel);
            //console.log('Value for hide_top_toolbar: ' + items.hide_top_toolbar);
            //console.log('Value for hide_query_results: ' + items.hide_query_results);
            //console.log('Value for minimize_new_query_button: ' + items.minimize_new_query_button);

            // Add all settings to a Map object
            var settingsArray = new Map()
            settingsArray.set('hide_explorer_panel', items.hide_explorer_panel);
            settingsArray.set('hide_top_toolbar', items.hide_top_toolbar);
            settingsArray.set('hide_query_results', items.hide_query_results);
            settingsArray.set('minimize_new_query_button', items.minimize_new_query_button);

            // Call hideElements with the three settings as parameters
            hideElements(settingsArray);
            
          });
    } else {
        console.log('this extension only runs on console.cloud.google.com/bigquery');
    };

})();