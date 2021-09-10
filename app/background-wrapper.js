/*
 * Hide BigQuery Explorer Panel
 * Project homepage: https://arcq.de/hide-bigquery-explorer-panel/
 * Github: https://github.com/SebastianArcq/hide-bq-explorer/
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