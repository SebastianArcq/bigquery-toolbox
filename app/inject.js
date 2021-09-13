/*
 * Hide BigQuery Explorer Panel
 * Project homepage: https://arcq.de/hide-bigquery-explorer-panel/
 * Github: https://github.com/SebastianArcq/hide-bq-explorer/
 * 
 * MIT License
 * Sebastian Arcq
 */

console.log("executing inject.js"); // --> browser console

(function() {

	if (window.location.href.includes("console.cloud.google.com/bigquery") == true) {
        // Hide BQ exlorer (containing projects, tables)
        // <cfc-panel ... class="cfc-panel cfc-panel-color-grey cfc-panel-orientation-vertical" ...>
        sidebar_status = document.querySelectorAll("cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-vertical")[0];
        if (sidebar_status.style.display == 'none') {
            sidebar_status.style.display = 'flex'
        } else {
            sidebar_status.style.display = 'none'
        }

        // Hide top toolbar ("Features & Info" / "Shortcut" / "Disable Editor Tabs")
        // <mat-toolbar ... class="mat-toolbar cfc-action-bar md-menu-toolbar cfc-legacy-toolbar-resize mat-toolbar-single-row" ...>
        top_toolbar_status = document.querySelectorAll("mat-toolbar.cfc-action-bar.md-menu-toolbar.cfc-legacy-toolbar-resize.mat-toolbar-single-row")[0];
        if (top_toolbar_status.style.display == 'none') {
            top_toolbar_status.style.display = 'flex'
        } else {
            top_toolbar_status.style.display = 'none'
        }
    }

})();