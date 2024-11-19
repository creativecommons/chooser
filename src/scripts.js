
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


let rawStatePath = rawStatePathRoutes[13];
let statePath = rawStatePath.split("/");

let last = statePath[statePath.length - 1].split("&")
let license = last[1].split("=");


/////////////////////////////////////////////////////////////

let state = {};
state.parts = [];
// temp defaults
state.parts[0] = 'do-you-know-which-license-you-need/yes/';
state.parts[1] = 'which-license-do-you-need/cc-by';
console.log(state.parts);

const fieldsets = document.querySelectorAll('fieldset'); 
// [T]: filter this down to ones not currently set to disable?

// set default disabled pathways

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

//document.querySelector('#require-attribution').classList.toggle('disable');
//document.querySelector('#allow-commercial-use').classList.toggle('disable');
//document.querySelector('#allow-derivatives').classList.toggle('disable');
//document.querySelector('#share-alike').classList.toggle('disable');
//document.querySelector('#waive-your-copyright').classList.toggle('disable');
//document.querySelector('#confirmation').classList.toggle('disable');

fieldsets.forEach((element, index) => {

    // [T]: set defaults here first in state.parts dynamically

    element.addEventListener("change", (event) => {
        //console.log(index);
        //console.log(element.id);
        //console.log(event.target.value);
       
        //console.log(element.id + '/' + event.target.value + '/' );

        state.parts[index] = element.id + '/' + event.target.value + '/';
        
        state.parts.forEach((element, i) => {
            if (i > index) {
                state.parts.splice(i);  
            }
        });

        state.current = state.parts.join('');

        //console.log(state.parts);
        console.log(state.current);

        
        // if (state.current == 'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/') {
        //     let chosenLicense = 'cc-0';
        //     console.log(chosenLicense);
        // }
        

    });

});
