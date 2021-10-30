/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to insert / remove CSS into BQ tabs. Used in f_TabLayout_toggle.js
 */

// ADD STYLE
// =============================================================================
// Function to add style tag to head
function addStyle(css, classname) {
    var style = document.createElement('style')
    style.setAttribute('class', classname);
    style.innerText = css
    document.head.appendChild(style)
};


// REMOVE STYLE
// =============================================================================
// remove ALL elements with a certain class
// https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom

function removeStyle(styleClass) {
    document.querySelectorAll(styleClass).forEach(element => element.remove());
};