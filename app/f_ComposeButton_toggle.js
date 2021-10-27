/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to toggle the "Compose new query" button
 */

console.log(">>> executing f_ComposeButton_toggle.js...");

function f_ComposeButton_toggle(target_state) {
    devlog("> executing f_ComposeButton_toggle()....");

    var text_unhidden = 'Compose new query';
    var text_hidden = '<!--query_button_hidden-->';

    // Get all buttons in an array
    var button_wrappers = document.querySelectorAll("span.mat-button-wrapper"); // returns an array ("NodeList") of all spans with that class (30+)
    
    // Find correct element ("Compose new query") and change its innerHTML
    button_wrappers.forEach(function(item) { // loop through all elements
        if (target_state=="mini") {
            if (item.innerHTML.includes(text_unhidden)) { // look for oldstring ("Compose new query")
                item.innerHTML = item.innerHTML.replace(text_unhidden, text_hidden); // replace oldstring with newstring
            }  
        } else if (target_state=="maxi") {
            if (item.innerHTML.includes(text_hidden)) { // look for oldstring ("Compose new query")
                item.innerHTML = item.innerHTML.replace(text_hidden, text_unhidden); // replace oldstring with newstring
            }  
        };
    });

};