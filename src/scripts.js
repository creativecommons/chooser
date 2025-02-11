
// all possible State Path Routes
let rawStatePathRoutes = [
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/waive-your-copyright+waive+read/(attribution-details)&tool=cc-0',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by/(attribution-details)&tool=cc-by',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-sa/(attribution-details)&tool=cc-by-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nd/(attribution-details)&tool=cc-by-nd',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc/(attribution-details)&tool=cc-by-nc',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-sa/(attribution-details)&tool=cc-by-nc-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-nd/(attribution-details)&tool=cc-by-nc-nd',
    
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/(attribution-details)&tool=cc-by',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/(attribution-details)&tool=cc-by-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/no/confirmation+ownership+read+revocation/(attribution-details)&tool=cc-by-nd',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/(attribution-details)&tool=cc-by-nc',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/(attribution-details)&tool=cc-by-nc-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/no/confirmation+ownership+read+revocation/(attribution-details)&tool=cc-by-nc-nd',
    'do-you-know-which-license-you-need/no/require-attribution/no/waive-your-copyright+waive+read/(attribution-details)&tool=cc-0'
];

// empty state obj
let state = {};

// all found fieldsets
const fieldsets = document.querySelectorAll('fieldset'); 

// empty defaults obj
let applyDefaults = {};

// set elemnts which need defaults
// on initial page load
applyDefaults.elements = [
    '#require-attribution',
    '#allow-commercial-use',
    '#allow-derivatives',
    '#share-alike',
    '#waive-your-copyright',
    '#confirmation'
];

// function to parse and build state.possibilities
// from rawStatePathRoutes
function setStatePossibilities(state) {

    // create state possibilities from possible tools with adjoining statePaths
    state.possibilities = [];
    rawStatePathRoutes.forEach((path, index) => {

        statePath = path.split("&");
        statepath = statePath;
        tool = statePath[statePath.length - 1].split("=");
        tool = tool[1];

        regEx = /\(([^)]+)\)/g;
        optionals = statePath[0].match(regEx);

        optionals.forEach ((optional) => {

            noOptionalsPath = statePath[0].replace(optional,'');

        });

        fullPath = statePath[0].replace(/[{()}]/g, '') + '/';
    
        if (state.possibilities[tool] == undefined) {
            state.possibilities[tool] = [];
        }
        state.possibilities[tool].push(fullPath);
        state.possibilities[tool].push(noOptionalsPath);
        
    });
}

// function to establish state.parts
function setStateParts(state) {
    state.parts = [];

    // temp defaults
    state.parts[0] = 'do-you-know-which-license-you-need/yes/';
    //state.parts[1] = 'which-license-do-you-need/cc-by/';
    state.parts[8] = 'attribution-details/';
}
// function to update state.parts
function updateStateParts(element, index, event, state) {

    state.parts[index] = element.id + '/' + event.target.value + '/';

    // check if checkbox, with siblings
    if (event.target.getAttribute('type') == 'checkbox') {        
        let checkboxElements = element.querySelectorAll('input[type="checkbox"]');
        let checkboxes = [];
        checkboxElements.forEach((checkbox, index) => { 
            if (checkbox.checked) {
                checkboxes[index] = checkbox.value;
            }
        });


        let joinedCheckboxes = checkboxes.filter(Boolean).join('+');

        state.parts[index] = element.id + '+' + joinedCheckboxes + '/';;
    }

    // check if text input
    if (event.target.getAttribute('type') == 'text') {

        state.parts[index] = element.id + '/';

    }

    console.log("state.parts (after change)");
    console.log(state.parts);
}

// function to combine current tracked 
// state.parts into state.current
function setStateCurrent(element, index,  state) {
    state.parts.forEach((element, i) => {
        if (i > index) {
            state.parts.splice(i);  
        }
    });
    
    state.current = state.parts.join('') //.slice(0, -1);
}

// function to set state.props
// including setting state.props.tool (if valid)
// or error
function setStateProps(index, state) {

    state.props = {};
    state.props.tool = 'unknown';

    // check and match possibilities
    Object.keys(state.possibilities).forEach((possibility) => {
        if(state.possibilities[possibility].includes(state.current)) {
            state.props.tool = possibility;
            console.log('matched');
        }
    });

    // set toolFull, toolShort, toolURL
    if (state.props.tool != 'unknown' | state.props.tool != 'cc-0' ) {

        formattedTool = state.props.tool.replace(/-/, ' ').toUpperCase();
        state.props.toolShort = formattedTool + ' 4.0';

        // set toolShort

        shortName = state.props.tool.replace(/cc-/, '');
        state.props.toolURL = 'https://creativecommons.org/licenses/'+ shortName +'/4.0/'; 
    }

    if (state.props.tool == 'cc-0') {

        state.props.toolShort = 'CC0 1.0';

        // set toolFull

        state.props.toolURL = 'https://creativecommons.org/publicdomain/zero/1.0/';
    }




    state.props.cursor = index;
    console.log('cursor at:');
    console.log(index);

    state.props.attribution = [];
    setStatePropsAttribution(state);
}


// isolated function to just set the attribution 
// subset of state.props (for use other places)
function setStatePropsAttribution(state) {
    state.props.attribution.title = document.querySelector('#attribution-details #title').value.replace(/(<([^>]+)>)/gi, "");
    state.props.attribution.creator = document.querySelector('#attribution-details #creator').value.replace(/(<([^>]+)>)/gi, "");
    state.props.attribution.workLink = document.querySelector('#attribution-details #work-link').value.replace(/(<([^>]+)>)/gi, "");
    state.props.attribution.creatorLink = document.querySelector('#attribution-details #creator-link').value.replace(/(<([^>]+)>)/gi, "");
    state.props.attribution.workCreationYear = document.querySelector('#attribution-details #work-creation-year').value.replace(/(<([^>]+)>)/gi, "");
}

// function to reset values beyond current fieldset
// [T] this could potentially do with a refactor
// check for input type, and them perform 
// contextual resets to universal defaults
// unchecked for radio/checkbox, noselect for 
// selection dropdown, etc.
function clearStepsAfterCursor(fieldsets, state) {
    fieldsets.forEach((element, index) => {
        if (index > state.props.cursor) {

            if (index == 1) {
                element.querySelector("#tool").value = "noselect";
            }

            // if (index = 8) {

            // }

            if (index != 1 | index != 8) {
                console.log('clear at:');
                console.log(index);

                let inputs = element.querySelectorAll('input');
                inputs.forEach((input, i) => {
                    input.checked = false;
                    console.log('uncheck!');
                });
            }
        }
    });
}

// function to render "tool recommendation",
// if valid tool from state.parts and/or state.current
function renderToolRec(state) {
    // document.querySelector('#tool-recommendation header h3').textContent = state.props.tool;

    if (state.props.tool != 'unknown' ) {
        document.querySelector('#tool-recommendation').classList.remove('disable');

        let tool = state.props.tool;
        let template = document.getElementById(tool);
        let templateContent = template.content.cloneNode(true);
        document.querySelector('#tool-recommendation .tool').textContent = '';
        document.querySelector('#tool-recommendation .tool').appendChild(templateContent);
        console.log('tool set to: ' + tool);
    }
    else if (state.props.tool == 'unknown') {
        document.querySelector('#tool-recommendation').classList.add('disable');
        document.querySelector('#tool-recommendation .tool').textContent = '';
    }
}

// render specifically the mark formats subsections
function renderMarkingFormats(state) {

    if (state.props.tool != 'unknown' ) {}

    setStatePropsAttribution(state);

    //let title = state.props.attribution.title;
    //let workCreationYear = state.props.attribution.workCreationYear;

    //let phrase = '(c) ' + workCreationYear + ' ' + title + ' is licensed under ';

    let attribution = state.props.attribution;

    let type = "license";
    let typeAsVerb = "licensed under";
    if (state.props.tool == 'cc-0') {
        type = "mark";
        typeAsVerb = "marked";
    }

    //let mark = attribution.title + ' © ' + attribution.workCreationYear + ' by ' + attribution.creator + ' is ' + type  + ' ' + state.props.toolShort + '. To view a copy of this license, visit ' + state.props.toolURL;
    //document.querySelector('#mark-your-work .plain-text.mark').textContent = mark;


    // set contents of plain text mark
    // TODO: reverse use of <template> since it has limits on tokenization capacity, even if
    // it allows more dev readability.
    let template = document.getElementById('plain-text');
    let templateContent = template.content.cloneNode(true);
    document.querySelector('#mark-your-work .plain-text.mark').textContent = '';

    function parseTokens(name, value, str){
        return str.replaceAll("{{"+name+"}}", value);
    }

    let markProps = {};
    markProps.title = attribution.title;
    markProps.year = attribution.workCreationYear;
    markProps.creator = attribution.creator;
    markProps.type = type;
    markProps.typeAsVerb = typeAsVerb;
    markProps.toolShort = state.props.toolShort;
    markProps.toolURL = state.props.toolURL;

    // could carve out separate sections for different mark formats here
    // only handles plain text at the moment
    for (const [key, value] of Object.entries(markProps)) {
        templateContent.textContent = parseTokens(key, value, templateContent.textContent);
        console.log(`${key}: ${value}`);
        console.log(templateContent);
    }

    document.querySelector('#mark-your-work .plain-text.mark').appendChild(templateContent);


    //templateContent.textContent = parseTokens("year", attribution.workCreationYear, templateContent.textContent);
    //document.querySelector('#mark-your-work .plain-text.mark').appendChild(templateContent);

    // set contents of rich text mark
    let ccSVG = '<svg><use href="vocabulary/svg/cc/icons/cc-icons.svg#cc-logo"></use></svg>';
    let bySVG = '<svg><use href="vocabulary/svg/cc/icons/cc-icons.svg#cc-by"></use></svg>';
    let saSVG = '<svg><use href="vocabulary/svg/cc/icons/cc-icons.svg#cc-sa"></use></svg>';
    let ncSVG = '<svg><use href="vocabulary/svg/cc/icons/cc-icons.svg#cc-nc"></use></svg>';
    let ndSVG = '<svg><use href="vocabulary/svg/cc/icons/cc-icons.svg#cc-nd"></use></svg>';
    let zeroSVG = '<svg><use href="vocabulary/svg/cc/icons/cc-icons.svg#cc-zero"></use></svg>';

    const currentTool = state.props.tool;
    switch (currentTool) {
        case 'cc-0':
            ccIconSet = ccSVG + zeroSVG;
            break;
        case 'cc-by':
            ccIconSet = ccSVG + bySVG;
            break;
        case 'cc-by-sa':
            ccIconSet = ccSVG + bySVG + saSVG;
            break;
        case 'cc-by-nd':
            ccIconSet = ccSVG + bySVG + ndSVG;
            break;
        case 'cc-by-nc':
            ccIconSet = ccSVG + bySVG + ncSVG;
            break;
        case 'cc-by-nc-sa':
            ccIconSet = ccSVG + bySVG + ncSVG + saSVG;
            break;
        case 'cc-by-nc-nd':
            ccIconSet = ccSVG + bySVG + ncSVG + ndSVG;
            break;
        default:
            currentTool = '';
    }

    let richTextMark = attribution.title + ' © ' + attribution.workCreationYear + ' by ' + attribution.creator + ' is ' + typeAsVerb  + ' ' + '<a href="' + state.props.toolURL + '">' + state.props.toolShort + '</a>' + ccIconSet;
    document.querySelector('#mark-your-work .rich-text.mark').innerHTML = richTextMark;


    // set contents of HTML mark
    defaultHTML = '<p xmlns:cc="http://creativecommons.org/ns#">This work is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener noreferrer">CC BY-SA 4.0<img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt=""><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt=""></a></p>';
    let htmlMark = '<textarea readonly="true">' + defaultHTML + '</textarea>';
    document.querySelector('#mark-your-work .html.mark').innerHTML = htmlMark;
}


// function to replace placeholders with values 
// for mark format constriction
// lots of TODOs here (just for testing)
// can use this to build out string replacement when
// swapping in html from a <template> element
// this will enable, controlling the markup, in markup
// and then JS is only having to do logic replacement
// of the token placeholders, rather than storing strings 
// within the JS unnecessarily.


// function parseTokens(name, value, str){
//     return str.replaceAll("{{"+name+"}}", value);
// }
  
//   const mark = 'test {{title}} {{year}} by {{author}}';

//   parsedMark = parseTokens("year", "2025", mark);
//   parsedMark = parseTokens("title", "cool work", parsedMark);
//   parsedMark = parseTokens("author", "jane mayer", parsedMark);
//   console.log(parsedMark);


// function to render "mark your work",
// if valid tool from state.parts and/or state.current
// if attribution details input(s) filled out
function renderMarkYourWork(state) {
    if (state.props.tool != 'unknown' ) {
        // load attribution details template, 
        // populate from attribution text values
        document.querySelector('#mark-your-work').classList.remove('disable');

        //state.props.attribution.title
        // let title = state.props.attribution.title;
        // let workCreationYear = state.props.attribution.workCreationYear;

        // let phrase = '(c) ' + workCreationYear + ' ' + title + ' is licensed under ';
        
        // document.querySelector('#mark-your-work .mark-holder').textContent = phrase + state.props.tool;
        renderMarkingFormats(state);

    }
    
    else if (state.props.tool == 'unknown') {
        document.querySelector('#mark-your-work').classList.add('disable');
    }

}

// function to set default UX states on Steps
// set default visibly disabled pathways

function setDefaults(applyDefaults) {

    applyDefaults.elements.forEach((element) => {
        document.querySelector(element).classList.toggle('disable');
    });

    if (state.parts[0] == 'do-you-know-which-license-you-need/yes/' ) {
        applyDefaults.elements.forEach((element) => {
            document.querySelector(element).classList.add('disable');
        });
    }

    document.querySelector('#tool-recommendation').classList.add('disable');
    document.querySelector('#mark-your-work').classList.add('disable');
}

// stepper logic here for what parts of form are 
// displayed/hidden, as state.parts and state.current 
// are updated
function renderSteps(applyDefaults, state) {

    // check if visitor needs help, start help pathways
    if (state.current == 'do-you-know-which-license-you-need/no/' ) {

        applyDefaults.elements.forEach((element) => {
            document.querySelector(element).classList.remove('disable');
        });
        document.querySelector('#which-license-do-you-need').classList.toggle('disable');
        document.querySelector('#waive-your-copyright').classList.add('disable');
        
        console.log("pass one");
    
    }

    // if visitor doesn't need help
    if (state.current == 'do-you-know-which-license-you-need/yes/' ) {

        applyDefaults.elements.forEach((element) => {
            document.querySelector(element).classList.add('disable');
        });
        document.querySelector('#which-license-do-you-need').classList.toggle('disable');
        document.querySelector('#waive-your-copyright').classList.add('disable');

    }

    // check if cc0
    if (state.parts[2] == 'require-attribution/no/' || state.parts[1] == 'which-license-do-you-need/cc-0/' ) {

        applyDefaults.elements.forEach((element) => {
            document.querySelector(element).classList.add('disable');
        });

        //if (state.parts[0] == 'do-you-know-which-license-you-need/no/') {
            //document.querySelector('#require-attribution').classList.remove('disable');
        //}
        document.querySelector('#waive-your-copyright').classList.remove('disable');
    
    } else {
        document.querySelector('#waive-your-copyright').classList.add('disable');
    }
    if (state.parts[2] == 'require-attribution/no/') {
        document.querySelector('#require-attribution').classList.remove('disable');
        //document.querySelector('#confirmation').classList.remove('disable');
    }

    // walk away from cc-0, reset attribution choice point
    if (state.parts[2] == 'require-attribution/yes/') {
        applyDefaults.elements.forEach((element) => {
            document.querySelector(element).classList.remove('disable');
        });
        document.querySelector('#require-attribution').classList.remove('disable');
        document.querySelector('#waive-your-copyright').classList.add('disable');

        //document.querySelector('#confirmation').classList.remove('disable');
    }

    // tie SA to ND choice
    if (state.parts[4] == 'allow-derivatives/no/') {
        document.querySelector('#share-alike').classList.add('disable');
    }
    
}

// function to render "mark your work", from attribution fields
// if valid tool from state.parts and/or state.current

// function to handle error state

// function to watch for fieldset changes 
function watchFieldsets(fieldsets, state) {
    fieldsets.forEach((element, index) => {

        // [T]: set defaults here first in state.parts dynamically

        element.addEventListener("change", (event) => {

            console.log("something changed!");
            updateStateParts(element, index, event, state);

            setStateCurrent(element, index, state);
            console.log("state.current (after change)");
            console.log(state.current);

            setStateProps(index, state);
            console.log("state.props (after change)");
            console.log(state.props);

            // [T]: also reset values beyond current changed fieldset to nothing each time
            //element.checked = false;
            //console.log('reset values beyond current fieldset to nothing');
            clearStepsAfterCursor(fieldsets, state);

            renderSteps(applyDefaults, state);

            renderToolRec(state);

            renderMarkYourWork(state);

            console.log(state.props.toolShort);

        });

    });
}

function watchAttributionDetails(fieldsets, state) {

    let textFields = fieldsets[8].querySelectorAll('input');

    textFields.forEach((element, index) => {

        element.addEventListener("keyup", (event) => {
            console.log('typing is happening');

            renderMarkingFormats(state);
        });

    });
}

// full flow logic 
setStateParts(state);
console.log("state.parts (at default)");
console.log(state.parts);

setStatePossibilities(state);
console.log("state.possibilities");
console.log(state.possibilities);

setDefaults(applyDefaults);
console.log("initial defaults applied");

setStateProps(0, state);
console.log("initial defaults applied");

watchFieldsets(fieldsets, state);
watchAttributionDetails(fieldsets, state);
