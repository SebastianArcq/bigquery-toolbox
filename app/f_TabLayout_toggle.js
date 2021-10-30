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
  
    devlog("> executing f_TabLayout_toggle()....");
    devlog('target_state: ' + target_state);

    // Add / remove the style (funcs ---> f_addStyle.js)
    if (target_state=="newTab") {
        addStyle(bqtoolbox_smalltabs_css, 'bqtoolbox_smalltabs');
        addStyle(bqtoolbox_tabrows_css, 'bqtoolbox_tabrows');
    } else if (target_state=="oldTab") {
        removeStyle(".bqtoolbox_smalltabs");
        removeStyle(".bqtoolbox_tabrows");
    };
};