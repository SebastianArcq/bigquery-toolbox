/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * This file now only deals with things happening after the app icon is clicked.
 * The function is called from background.js and is executed in every tab
 */

devlog(">>> executing iconClicked.js...");

// WRAPPER FUNCTION
// =============================================================================
(function() {

    // FUNCTION TO HIDE ELEMENTS
    // =============================================================================
    function hideElements(options) {
        devlog("> executing hideElements()...");

        // Retrieve options from function parameter
        var hide_explorer_panel = options.get('hide_explorer_panel');
        var hide_nav_menu = options.get('hide_nav_menu');
        var hide_top_bar = options.get('hide_top_bar');
        var hide_query_results = options.get('hide_query_results');

        devlog('Settings for hide_explorer_panel: ' + hide_explorer_panel);
        devlog('Settings for hide_nav_menu: ' + hide_nav_menu);
        devlog('Settings for hide_top_bar: ' + hide_top_bar);
        devlog('Settings for hide_query_results: ' + hide_query_results);

        // Declare relevant objects - identify using Chrome > Inspect > Elements > Copy > Copy selector
        // BQ Exlorer panel (containing projects, tables) // not really needed any more
        explorerSidebar = document.querySelectorAll("cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-vertical")[0];

        // BQ Nav menu
        navMenu = document.querySelectorAll("cfc-panel.pan-shell-section-nav-panel.cfc-panel.cfc-panel-color-white.cfc-panel-orientation-vertical")[0];

        // Top Bar
        topBar = document.querySelector("#ocb-platform-bar");

        // Query results
        query_results1 = document.querySelectorAll("cfc-panel.cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-horizontal")[0]; // left tab
        query_results2 = document.querySelectorAll("cfc-panel.cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-horizontal")[1]; // right tab
        devlog("query_results2: " + query_results2); // "undefined" if only one tab in use
        
        // Initialize hide_status
        if (typeof hide_status == 'undefined') {
            hide_status = 'not_hidden';
        }
        devlog("hide_status: " + hide_status);
        
        // Hide / Unhide
        if (hide_status == "not_hidden") {
            
            // Hide Explorer panel:
            if (hide_explorer_panel == true) {
                explorerSidebar.style.display = 'none'; // hide explorerSidebar
            };

            // Hide Nav Menu:
            if (hide_nav_menu == true) {
                navMenu.style.display = 'none'; // hide navMenu
            };

             // Hide Top Bar:
             if (hide_top_bar == true) {
                topBar.style.display = 'none'; // hide topBar
            };

            // Hide query results
            if (hide_query_results == true) {
                devlog('pausing for a bit...'); // the height is changed when the other elements are hidden. Needs a few ms to update.
                setTimeout(function() {
                    query_results1.style.height = '100%'; // hide query results (left)
                    if(query_results2) {query_results2.style.height = '100%'}; // hide query results (right)
                }, (300));
                devlog('done, continuing');
            };
            
            hide_status = "hidden" // update hide_status
            devlog("hide_status changed to: " + hide_status);

        } else {
            
            // Unhide all the things:
            if (hide_explorer_panel == true) {
                explorerSidebar.style.display = 'flex'; // unhide sidebar
            };

            if (hide_nav_menu == true) {
                navMenu.style.display = 'flex'; // unhide navMenu
            };

            if (hide_top_bar == true) {
                topBar.style.display = 'flex'; // unhide topBar
            };

            if (hide_query_results == true) {
                query_results1.style.height = '50%'; // unhide query results (left)
                if(query_results2) {query_results2.style.height = '50%'}; // unhide query results (right)
            };

            hide_status = 'not_hidden'; // update hide_status; TODO: there should be a check of the actual status
            devlog("hide_status changed to: " + hide_status);
        };

        // Log status Explorer panel
        if (hide_explorer_panel == true) {
            if (explorerSidebar.style.display == 'none') {
                console.log("Explorer panel hidden.");
            } else if (explorerSidebar.style.display == 'flex') {
                console.log("Explorer panel shown.");
            };
        } else {
            console.log("Explorer panel not touched.");
        }

        // Log status Nav menu
        if (hide_nav_menu == true) {
            if (navMenu.style.display == 'none') {
                console.log("Navigation menu hidden.");
            } else if (navMenu.style.display == 'flex') {
                console.log("Navigation menu shown.");
            };
        } else {
            console.log("Navigation menu not touched.");
        }

        // Log status Top bar
        if (hide_top_bar == true) {
            if (topBar.style.display == 'none') {
                console.log("Top bar hidden.");
            } else if (topBar.style.display == 'flex') {
                console.log("Top bar shown.");
            };
        } else {
            console.log("Top bar not touched.");
        }

        // Log status Query results (setTimeout!)
        if (hide_query_results == true) {
            setTimeout(function() {
                if (query_results1.style.height == '100%') {
                    console.log("Query results hidden.");
                } else if (query_results1.style.height != '100%') {
                    console.log("Query results shown.");
                };
            }, (400));
          
        } else {
            console.log("Query results not touched.");
        }
      
    };
    
    // ASYNC LOAD SETTINGS; CALL HIDE ELEMENTS WHEN SUCCESSFUL
    // =============================================================================
	if (window.location.href.includes("console.cloud.google.com/bigquery") == true) {

        chrome.storage.sync.get({
            // Use default values if nothing stored
            hide_explorer_panel: false,
            hide_nav_menu: true,
            hide_top_bar: true,
            hide_query_results: false,
        }, function(items) {

            // Log values of vars to console
            //console.log('Value for hide_explorer_panel: ' + items.hide_explorer_panel);
            //console.log('Value for hide_nav_menu: ' + items.hide_nav_menu);
            //console.log('Value for hide_top_bar: ' + items.hide_top_bar);
            //console.log('Value for hide_query_results: ' + items.hide_query_results);

            // Add all settings to a Map object
            var settingsArray = new Map()
            settingsArray.set('hide_explorer_panel', items.hide_explorer_panel);
            settingsArray.set('hide_nav_menu', items.hide_nav_menu);
            settingsArray.set('hide_top_bar', items.hide_top_bar);
            settingsArray.set('hide_query_results', items.hide_query_results);

            // Call hideElements with the settings as parameters
            hideElements(settingsArray);
            
          });
    } else {
        console.log('this extension only runs on console.cloud.google.com/bigquery');
    };

})();