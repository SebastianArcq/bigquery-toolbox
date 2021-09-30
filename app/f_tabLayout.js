// function to add style tag to head
function addStyle(css, classname) {
    var style = document.createElement('style')
    style.setAttribute('class', classname);
    style.innerText = css
    document.head.appendChild(style)
};

// style for small tabs
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
        margin-bottom: 5px; /* so it doesnt go behind the shadow of the blue bar */
    }
    `;

// styke for tabs in multiple rows
var bqtoolbox_tabrows_css = `
    .mat-tab-links {
        display:block;s
    }
    `;

// add style to head
addStyle(bqtoolbox_smalltabs_css, 'bqtoolbox_smalltabs');
addStyle(bqtoolbox_tabrows_css, 'bqtoolbox_tabrows');

////////////////////////////////////////////////////////////////////////////////

// remove ALL elements with a certain class
// https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom
// see JavaScript Arrow functions in ES6

function removeStyle(styleClass) {
    document.querySelectorAll(styleClass).forEach(element => element.remove());
};

removeStyle(".bqtoolbox_smalltabs");

////////////////////////////////////////////////////////////////////////////////

// https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
// Load the rules and execute after the DOM loads
window.onload = function() {
    addCss(rule)
};