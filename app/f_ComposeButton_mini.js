// FUNCTION TO MINIMIZE 'COMPOSE NEW QUERY'-BUTTON
(function () {
    //console.log("executing f_ComposeButton_mini.js...");

    var text_unhidden = 'Compose new query';
    var text_hidden = '<!--query_button_hidden-->';

    // Get all buttons into an array
    var button_wrappers = document.querySelectorAll("span.mat-button-wrapper"); // returns an array ("NodeList") of all spans with that class (30+)
    
    button_wrappers.forEach(function(item) { // loop through all elements
        if (item.innerHTML.includes(text_unhidden)) { // look for oldstring ("Compose new query")
            item.innerHTML = item.innerHTML.replace(text_unhidden, text_hidden); // replace oldstring with newstring
        }  
    });

})();