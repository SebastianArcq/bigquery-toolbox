/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to toggle the top toolbar
 */

devlog(">>> executing f_TopToolbar_toggle.js...");

function f_TopToolbar_toggle(target_state) {
    
    devlog("> executing f_TopToolbar_toggle()....");

    const topToolbar = document.querySelectorAll("#default-action-bar > .mat-toolbar")[0];
    devlog('topToolbar: ' + topToolbar);
    devlog('topToolbar.style: ' + topToolbar.style);
    devlog('topToolbar.style.display: ' + topToolbar.style.display);
    devlog('target_state: ' + target_state);

    // Toggle the top toolbar
    devlog('before: topToolbar.style.display: ' + topToolbar.style.display)
    if (target_state=="hidden") {
        topToolbar.style.display = 'none'; 
    } else if (target_state=="shown") {
        topToolbar.style.display = 'flex'; 
    };
    devlog('after: topToolbar.style.display: ' + topToolbar.style.display)
};