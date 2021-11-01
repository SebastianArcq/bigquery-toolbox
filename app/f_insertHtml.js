/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to insert / remove HTML into BQ tabs. 
 * Used in f_TabLayout_toggle.js. Inserted into tabs in f_executeScriptInTabs.js
 */

// KNOWN ISSUE: When opening a NEW Query tab, the insert will not happen.

devlog(">>> executing f_insertHtml.js...");

// ADD HTML
// =============================================================================
// this function is called from 
function insertHtmlAfter(existingElement, newElement, id) {
    removeHtml(id); // just to be sure, try to remove it before inserting it
    devlog("typeof existingElement: " + typeof existingElement);

    if (typeof existingElement !== 'undefined') { // check if existingElement exists
        existingElement.insertAdjacentHTML('afterend', newElement);
    }
};


// REMOVE HTML
// =============================================================================
function removeHtml(id) {
    var myNewElement = document.querySelector("#"+id);
    if (document.body.contains(myNewElement)) {
        myNewElement.parentNode.removeChild(myNewElement); 
    }   
};
