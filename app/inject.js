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
        sidebar_status = document.querySelectorAll("cfc-panel.cfc-panel-color-grey.cfc-panel-orientation-vertical")[0];
        if (sidebar_status.style.display == 'none') {
            sidebar_status.style.display = 'flex'
        } else {
            sidebar_status.style.display = 'none'
        }
    }

})();