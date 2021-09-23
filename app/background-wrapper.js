/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 */

console.log("executing background-wrapper.js"); // --> service worker console

try {
    importScripts("background.js");
  } catch (e) {
    console.error(e);
  }