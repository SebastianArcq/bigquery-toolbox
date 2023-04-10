#  BigQuery Toolbox
Chrome Web Store: https://chrome.google.com/webstore/detail/bigquery-toolbox/gogipkdhiiopcbfakdagfkinjoecfoam/ \
Project homepage: https://arcq.de/bigquery-toolbox/ \
Github: https://github.com/SebastianArcq/bigquery-toolbox/


## About BigQuery Toolbox
The BigQuery Toolbox is a lightweight Chrome browser extension made for users of Google BigQuery. The BigQuery Toolbox comes with a set of features designed to make your live in BigQuery a lot easier. Top features include:

* Toggle the "Navigation menu" side panel with the click of a button
* Toggle the "Top bar" side panel with the click of a button
* Toggle the "Query Results" with the click of a button
* Show (smaller, redesigned) query tabs in multiple rows.

## How to install
Simply install from the Chrome Web Store at https://chrome.google.com/webstore/detail/bigquery-toolbox/gogipkdhiiopcbfakdagfkinjoecfoam.


## Pin to toolbar
After installing what you want to do first is to "pin" the BigQuery Toolbox icon to your extension toolbar in Chrome for easier access.

To do that, click the "Extensions" button in the top-right of your browser, next to your profile picture (the button that looks like a puzzle piece). From the dropdown list, find "BigQuery Toolbox" and click the pin so it turns blue. Boom.


## How to use
### Basics
While in BigQuery, simply click the BigQuery Toolbox button to toggle the Navigation menu. 


## Advanced Options
For more advances features, right-click the extension icon and click on "Options".

Here you can do two things.

First, you can set what left-clicking the extension button does. By default it just toggles the Navigation Menu.

If you tick "Hide Top Bar", "Hide Explorer Panel", or "Hide Query Results", it will also do just that every time you click the icon.

Second, you can further improve the BigQuery UI by checking the following option:

- Redesigned multi-row query tabs: Instead of having a side-scrolling query tab bar, enabling this feature shows tabs in multiple rows, while also reducing their size


## FAQ
<i>Q: I use Firefox, why is there no Firefox version of the BigQuery Toolbox?</i>\
A: There will be, but it'll be a short while. Now that Firefox <a href="https://blog.mozilla.org/addons/2022/11/17/manifest-v3-signing-available-november-21-on-firefox-nightly/">has implemented Chrome’s Manifest V3 extension spec</a> I will hopefully get around to do this some time soon. No promises.</a>.

<i>Q: Why is [your preferred feature here] not part of the Toolbox?</i>\
A: BigQuery Toolbox is hobby project. Most likely I didn't have the time yet. That said, feel free to drop me a line at chromedev@arcq.de.

<i>Q: I love this extension so much, can I buy you a coffee?</i>\
A: What a great question. Sure you can, over at <a href="https://ko-fi.com/sebastianarcq">ko-fi.com</a>.


## Files & Folder Structure
### Root
- Licence.md: Licence text
- README.md: this file; shows up on https://github.com/SebastianArcq/bigquery-toolbox

### Folder "app"
#### JSON Files
- manifest.json: required file; contains settings and information that define the extension, such as name, version or requested permissions of the extension

#### HTML files
- options.html: HTML file for options menu (right click on extension icon > options)
- welcome.html: Info page shown after install and after an upgrade

#### JavaScript Files
- background-wrapper.js: a wrapper for background.js; allows catching errors.
- background.js: core file.
- iconClicked.js: deals with things happening after the icon is clicked; contains function to hide elements
- options.js: deals with things that happen in the option menu.
- f_*.js: Functions that are called from elsewhere.
  - f_TabLayout_toggle.js
  - f_addStyle.js
  - f_devlog.js
  - f_executeScriptInTabs.js
  - f_insertHtml.js

#### Images
- img/*: images used on html pages, e.g. welcome.html
- icon.png: Icon 19px * 19px; see manifest.json
- icon_128.png: Icon 128px * 128px; see manifest.json


## Contributing
Pull requests are welcome.


## License
[gpl-3.0](https://choosealicense.com/licenses/gpl-3.0/)