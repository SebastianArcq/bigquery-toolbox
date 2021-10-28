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

// Send code to ALL BQ tabs (used in options.js and background.js)

// How do subscripts work?
// for options.js --> footer of options.html
// for background.js and iconClicked.js --> importScripts in background-wrapper.js

devlog(">>> executing f_executeScriptInTabs.js...");

// First, make f_devlog.js available in all pages (params are just forwarded to executeScriptInTabs2())
function executeScriptInTabs(funcName, funcParam, callbackText) {
  devlog('> executing executeScriptInTab1()')

  // Check parameters
  devlog('funcName: ' + funcName); // f_TopToolbar_toggle.js
  devlog('funcParam: ' + funcParam); // hide
  devlog('callbackText: ' + callbackText);


  // Define scripts that should be sent to page
  var scriptArr = ['f_devlog.js']; // could add more scripts here, but not necessary
  devlog('typeof(scriptArr): ' + typeof(scriptArr)); // type: object

  chrome.tabs.query(
    {
      url: 'https://console.cloud.google.com/bigquery*'
    },
    function (tabs) {
      devlog(tabs)
      tabs.forEach(t => {
        chrome.scripting.executeScript(
          {
            target: { tabId: t.id },
            files: scriptArr
          },
          function () {
            devlog(callbackText)
            executeScriptInTabs2(funcName, funcParam, callbackText) // f_TopToolbar_toggle() is available from options.js because it is loaded in options.html
          }
        )
      })
    }
  )
}

// Then, execute the function in all pages
// This could also be in the callback of executeScriptInTabs(), but that would be too confusing
function executeScriptInTabs2(myFunc, myArgs, callbackText) {
  devlog('> executing executeScriptInTab2()')

  // Check parameters
  devlog('myFunc: ' + myFunc) // f_TopToolbar_toggle() (entire function, not just the name)
  devlog('myArgs: ' + myArgs) // hide
  devlog('callbackText: ' + callbackText)

  chrome.tabs.query(
    {
      url: 'https://console.cloud.google.com/bigquery*'
    },
    function (tabs) {
      devlog(tabs)
      tabs.forEach(t => {
        chrome.scripting.executeScript(
          {
            target: { tabId: t.id },
            func: myFunc,
            args: [myArgs]
          },
          function () {
            console.log(callbackText)
          }
        )
      })
    }
  )
}



