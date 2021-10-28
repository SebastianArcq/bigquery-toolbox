/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to log if devmode = 1
 */

// Devmode function

// How do subscripts work?
// for options.js --> footer of options.html
// for background.js and iconClicked.js --> importScripts in background-wrapper.js

// Turn devmode on / off
// Set devmode = 1 to display all sorts of console logs

var devmode = 0;

devlog (">>> executing f_devlog.js...");

// Devlog function
function devlog(logtext) {
    if (devmode == 1) {
		console.log(logtext);
	} // otherwise: do nothing
};

// devlog(">>> executing f_devlog.js...");

// This only logs if devmode=1
devlog('Dev mode ON...');