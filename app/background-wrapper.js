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

// https://stackoverflow.com/questions/66406672/chrome-extension-mv3-modularize-service-worker-js-file

console.log(">>> executing background-wrapper.js"); // --> service worker console

try {
    importScripts(
      "f_devlog.js", 
      "f_TopToolbar_toggle.js", 
      "f_ComposeButton_toggle.js", 
      "f_executeScriptInTabs.js", 
      "background.js"
    );
  } catch (e) {
    console.error(e);
  }