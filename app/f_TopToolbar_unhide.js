/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to unhide the top toolbar
 */

(function () {
    //console.log("executing f_TopToolbar_unhide.js...");

    const topToolbar = document.querySelectorAll("#default-action-bar > mat-toolbar")[0];
    //console.log('topToolbar: ' + topToolbar);

    // Hide the top toolbar (if it is not hidden yet)
    //console.log('topToolbar.style.display: ' + topToolbar.style.display)
    if (topToolbar.style.display == 'none') {
        topToolbar.style.display = 'flex'; 
    };


})();