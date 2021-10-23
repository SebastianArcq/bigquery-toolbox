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

console.log(">>> executing f_devlog.js...");

function devlog(logtext) {
    if (devmode == 1) {
		console.log(logtext);
	} // otherwise: do nothing
};

// Set devmode = 1 to display all sorts of console logs
var devmode = 1;

// This only logs if devmode=1
devlog('Dev mode ON...');