/*
 * BigQuery Toolbox
 * Project homepage: https://arcq.de/bigquery-toolbox/
 * Github: https://github.com/SebastianArcq/bigquery-toolbox/
 * 
 * MIT License
 * Sebastian Arcq
 * 
 * Function to change the layout of the tabs
 */

// https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript

devlog(">>> executing f_TabLayout_toggle.js...");

function f_TabLayout_toggle(target_state) {

    devlog("> executing f_TabLayout_toggle()....");
    devlog('target_state: ' + target_state);

    // Style for small tabs
    var bqtoolbox_smalltabs_css = `
    bq-tab-panel .cfc-panel-sub-header .mat-tab-link {
        padding: 0 2px !important;
        height: 28px !important; /*36px*/
        border-bottom: 1px solid #949494;
        border-right: 1px solid #949494;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    bq-tab-panel .cfc-panel-sub-header .mat-button {
        line-height: 27px !important; /*36px*/
    }

    div.pan-shell-top-container {
        margin-bottom: 8px; /* so it doesnt go behind the shadow of the blue bar */
    }
    `;

    // Style for tabs in multiple rows
    var bqtoolbox_tabrows_css = `
    .mat-tab-links {
        display:block;
    }
    `;

    // HTML elements
    var existingElement = document.querySelectorAll("bq-tab-container bq-tab-head > div > div > span")[0]; // space gets ANY child, ">" gets DIRECT child
    var newElement = '<span id="thisIsMyId" class="cfc-truncated-text-inline ng-star-inserted"> 1 </span>'; // including 'thisIsMyId' to remove it later
    var id = "thisIsMyId"; // this must match the id above!

    // Add / remove the style and HTML elements (---> f_addStyle.js, f_insertHtml.js)
    if (target_state=="newTab") {
        addStyle(bqtoolbox_smalltabs_css, 'bqtoolbox_smalltabs');
        addStyle(bqtoolbox_tabrows_css, 'bqtoolbox_tabrows');
        insertHtmlAfter(existingElement, newElement, id);
    } else if (target_state=="oldTab") {
        removeStyle(".bqtoolbox_smalltabs");
        removeStyle(".bqtoolbox_tabrows");
        removeHtml(id);
    };
};