
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




const fieldsets = document.querySelectorAll('fieldset');

fieldsets.forEach((element, index) => {

    element.addEventListener("change", (event) => {
        console.log(index);
        //console.log(element.id);
        //console.log(event.target.value);
       
        console.log(element.id + '/' + event.target.value + '/' );

    });

});
