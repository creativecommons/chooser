
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

state.current = state.parts.join('');
console.log(state.current);

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
    //document.querySelector(element).classList.toggle('disable');
});

if (state.parts[0] == 'do-you-know-which-license-you-need/yes/' ) {
    applyDefaults.elements.forEach((element) => {
        document.querySelector(element).classList.add('disable');
    });
}

fieldsets.forEach((element, index) => {

    // [T]: set defaults here first in state.parts dynamically

    element.addEventListener("change", (event) => {
        //console.log(index);
        //console.log(element.id);
        //console.log(event.target.value);
       
        //console.log(element.id + '/' + event.target.value + '/' );

        state.parts[index] = element.id + '/' + event.target.value + '/';

      
        // [T]: refactor three below as element.id instead?

        // [T]: discern if checkboxes, change value
        if (element.id == 'waive-your-copyright') {
            //state.parts[index] = element.id + '+' + event.target.value;
            console.log('waive-your-copyright');
        }
        // [T]: discern if checkboxes, change value
        if (element.id == 'confirmation') {
            //state.parts[index] = element.id + '+' + event.target.value;
            console.log('confirmation');
        }
        // [T]: discern if checkboxes, change value
        if (element.id == 'attribution-details') {
            //state.parts[index] = element.id + '+' + event.target.value;
            console.log('attribution-details');
        }
        
        state.parts.forEach((element, i) => {
            if (i > index) {
                state.parts.splice(i);  
            }
        });
        // [T]: also reset value to nothing each time

        state.current = state.parts.join('');

        state.props = {};
        state.props.license = 'unknown';

        // check and match possibilities
        state.possibilities.forEach ((possibility, index) => { 
            if(possibility.includes(state.current)) {
                //state.props.license = state.possibilities[index];
                console.log('at:'+ state.possibilities[index]);
            }
        });

        console.log(state.parts);
        console.log(state.current);
        console.log(state.props.license);

        // if (state.current == 'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/') {
        //     let chosenLicense = 'cc-0';
        //     console.log(chosenLicense);
        // }


/////////////////////////////////////////////////////////////

        // check if visitor needs help, start help pathways
        if (state.current == 'do-you-know-which-license-you-need/no/' ) {

            applyDefaults.elements.forEach((element) => {
                document.querySelector(element).classList.toggle('disable');
            });
            document.querySelector('#which-license-do-you-need').classList.toggle('disable');
            document.querySelector('#waive-your-copyright').classList.add('disable');
        
        }

        // if visitor doesn't need help
        if (state.current == 'do-you-know-which-license-you-need/yes/' ) {

            applyDefaults.elements.forEach((element) => {
                document.querySelector(element).classList.toggle('disable');
            });
            document.querySelector('#which-license-do-you-need').classList.toggle('disable');
            document.querySelector('#waive-your-copyright').classList.add('disable');

        }

        // check if cc0
        if (state.parts[2] == 'require-attribution/no/' || state.parts[1] == 'which-license-do-you-need/cc-0/' ) {

            applyDefaults.elements.forEach((element) => {
                document.querySelector(element).classList.add('disable');
            });
            document.querySelector('#waive-your-copyright').classList.remove('disable');
        
        }
        
    });

});



/////////////////////////////////////////////////////////////

// starting assumption







