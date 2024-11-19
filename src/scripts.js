
let rawStatePathRoutes = [
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/waive-your-copyright+waive+read/attribution-details&license=cc-0',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by/attribution-details&license=cc-by',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-sa/attribution-details&license=cc-by-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nd/attribution-details&license=cc-by-nd',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc/attribution-details&license=cc-by-nc',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-sa/attribution-details&license=cc-by-nc-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-nd/attribution-details&license=cc-by-nc-nd',
    
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commerical-use/yes/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/attribution-details&license=cc-by',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commerical-use/yes/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/attribution-details&license=cc-by-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commerical-use/yes/allow-derivatives/no/confirmation+ownership+read+revocation/attribution-details&license=cc-by-nd',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commerical-use/no/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/attribution-details&license=cc-by-nc',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commerical-use/no/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/attribution-details&license=cc-by-nc-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commerical-use/no/allow-derivatives/no/confirmation+ownership+read+revocation/attribution-details&license=cc-by-nc-nd',
    'do-you-know-which-license-you-need/no/require-attribution/no/waive-your-copyright+waive+read/attribution-details&license=cc-0'
];

/////////////////////////////////////////////////////////////

let state = {};
state.parts = [];
// temp defaults
state.parts[0] = 'do-you-know-which-license-you-need/yes/';
state.parts[1] = 'which-license-do-you-need/cc-by';
console.log(state.parts);

// create state possibilities from possible licenses with adjoining statePaths
state.possibilities = [];
rawStatePathRoutes.forEach((path, index) => {

    statePath = path.split("&");
    statepath = statePath;
    license = statePath[statePath.length - 1].split("=");
    license = license[1];
    
    if (state.possibilities[license] == undefined) {
        state.possibilities[license] = [];
    }

    state.possibilities[license].push(statePath[0]);
    
 });
 console.log(state.possibilities);

const fieldsets = document.querySelectorAll('fieldset'); 
// [T]: filter this down to ones not currently set to disable?

// set default visibly disabled pathways
let applyDefaults = {};
applyDefaults.elements = [
    '#require-attribution',
    '#allow-commercial-use',
    '#allow-derivatives',
    '#share-alike',
    '#waive-your-copyright',
    '#confirmation'
];
applyDefaults.elements.forEach((element) => {
    document.querySelector(element).classList.toggle('disable');
});

fieldsets.forEach((element, index) => {

    // [T]: set defaults here first in state.parts dynamically

    element.addEventListener("change", (event) => {
        //console.log(index);
        //console.log(element.id);
        //console.log(event.target.value);
       
        //console.log(element.id + '/' + event.target.value + '/' );

        state.parts[index] = element.id + '/' + event.target.value + '/';

        // [T]: discern if checkboxes, change value
        
        state.parts.forEach((element, i) => {
            if (i > index) {
                state.parts.splice(i);  
            }
        });

        state.current = state.parts.join('');

        state.props = {};
        state.props.license = 'unknown';

        //console.log(state.parts);
        console.log(state.current);
        console.log(state.props.license);

        // if (state.current == 'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/') {
        //     let chosenLicense = 'cc-0';
        //     console.log(chosenLicense);
        // }
        
    });

});
