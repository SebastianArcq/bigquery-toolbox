/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * This file is just a wrapper for the background js that allows catching errors
 */

console.log("executing background-wrapper.js"); // --> service worker console

try {
    importScripts("background.js");
  } catch (e) {
    console.error(e);
  }