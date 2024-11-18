
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


console.log(statePath[0]);
console.log(statePath[1]);

console.log(statePath[2]);
console.log(statePath[3]);

console.log(statePath[4]);


console.log(statePath[5]);
console.log(statePath[6]);
console.log(statePath[7]);
console.log(statePath[8]);
console.log(statePath[9]);
console.log(statePath[10]);
console.log(statePath[11]);


console.log(last[0]);

console.log(license[1]);




document.querySelector('#require-attribution').classList.toggle('disable');

document.querySelector('#allow-commercial-use').classList.toggle('disable');

document.querySelector('#allow-derivatives').classList.toggle('disable');

document.querySelector('#share-alike').classList.toggle('disable');

document.querySelector('#waive-your-copyright').classList.toggle('disable');

document.querySelector('#confirmation').classList.toggle('disable');



// Get the form
const form = document.forms[0];

// Get the form's radio buttons
const helpChoice = form.elements["choose"];

// Choose the "red" option
console.log(helpChoice.value);

const selectElement = document.querySelector("#do-you-know-which-license-you-need");

selectElement.addEventListener("change", (event) => {
    console.log(helpChoice.value);

    if (helpChoice.value == 'no') {

        document.querySelector('#which-license-do-you-need').classList.toggle('disable');

    } else {

        document.querySelector('#which-license-do-you-need').classList.remove('disable');
    }

        document.querySelector('#require-attribution').classList.toggle('disable');

        document.querySelector('#allow-commercial-use').classList.toggle('disable');

        document.querySelector('#allow-derivatives').classList.toggle('disable');

        document.querySelector('#share-alike').classList.toggle('disable');

        document.querySelector('#confirmation').classList.toggle('disable');
});


const licenseElement = document.querySelector("#which-license-do-you-need");

const licenseChoice = form.elements["license"];

licenseElement.addEventListener("change", (event) => {
    console.log(licenseChoice.value);

    if (licenseChoice.value == 'cc-0') {

        document.querySelector('#waive-your-copyright').classList.toggle('disable');
    } else {

        document.querySelector('#waive-your-copyright').classList.add('disable');
    }

});

const attributionElement = document.querySelector("#require-attribution");

const attributionChoice = form.elements["attribution"];

attributionElement.addEventListener("change", (event) => {
    console.log(attributionChoice.value);

    document.querySelector('#allow-commercial-use').classList.toggle('disable');

    document.querySelector('#allow-derivatives').classList.toggle('disable');

    document.querySelector('#share-alike').classList.toggle('disable');

    document.querySelector('#waive-your-copyright').classList.remove('disable');

    document.querySelector('#confirmation').classList.toggle('disable');

});
