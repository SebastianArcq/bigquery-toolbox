(function () {
    //console.log("executing f_TopToolbar_hide.js...");

    const topToolbar = document.querySelectorAll("#default-action-bar > mat-toolbar")[0];
    //console.log('topToolbar: ' + topToolbar);

    // Hide the top toolbar (if it is not hidden yet)
    //console.log('topToolbar.style.display: ' + topToolbar.style.display)
    if (topToolbar.style.display = 'flex') {
        topToolbar.style.display = 'none'; 
    };


})();