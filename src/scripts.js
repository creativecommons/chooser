
// all possible State Path Routes
let rawStatePathRoutes = [
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/waive-your-copyright+waive+read/(attribution-details)&license=cc-0',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by/(attribution-details)&license=cc-by',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-sa/(attribution-details)&license=cc-by-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nd/(attribution-details)&license=cc-by-nd',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc/(attribution-details)&license=cc-by-nc',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-sa/(attribution-details)&license=cc-by-nc-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-nd/(attribution-details)&license=cc-by-nc-nd',
    
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nd',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nc',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nc-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nc-nd',
    'do-you-know-which-license-you-need/no/require-attribution/no/waive-your-copyright+waive+read/(attribution-details)&license=cc-0'
];

// empty state obj
let state = {};

// function to parse and build state.possibilities
// from rawStatePathRoutes
function setStatePossibilities(state) {

    // create state possibilities from possible licenses with adjoining statePaths
    state.possibilities = [];
    rawStatePathRoutes.forEach((path, index) => {

        statePath = path.split("&");
        statepath = statePath;
        license = statePath[statePath.length - 1].split("=");
        license = license[1];

        regEx = /\(([^)]+)\)/g;
        optionals = statePath[0].match(regEx);

        optionals.forEach ((optional) => {

            noOptionalsPath = statePath[0].replace(optional,'');

        });

        fullPath = statePath[0].replace(/[{()}]/g, '') + '/';
    
        if (state.possibilities[license] == undefined) {
            state.possibilities[license] = [];
        }
        state.possibilities[license].push(fullPath);
        state.possibilities[license].push(noOptionalsPath);
        
    });
}

// function to establish state.parts
function setStateParts(state) {
    state.parts = [];

    // temp defaults
    state.parts[0] = 'do-you-know-which-license-you-need/yes/';
    state.parts[1] = 'which-license-do-you-need/cc-by/';
    state.parts[8] = 'attribution-details/';
}

// function to update and track state.parts 

// function to combine current tracked 
// state.parts into state.current

// function to compare state.possibilities to state.current, 
// determine if valid license, or error

// function to set state.props
// including setting state.props.license (if valid)

// stepper logic here for what parts of form are 
// displayed/hidden, as state.parts and state.current 
// are updated

// function to render "license recommendation",
// if valid license from state.parts and/or state.current

// function to render "mark your work", from attribution fields
// if valid license from state.parts and/or state.current

// function to handle error state


// full flow logic 
setStateParts(state);
console.log('state.parts (at default)');
console.log(state.parts);

setStatePossibilities(state);
console.log('state.possibilities');
console.log(state.possibilities);

