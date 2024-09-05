
let rawStatePathRoutes = [
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/waive-your-copyright+i-hereby-waive+i-have-read/attribution-details&license=cc-0',
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
    'do-you-know-which-license-you-need/no/require-attribution/no/waive-your-copyright+i-hereby-waive+i-have-read/attribution-details&license=cc-0'
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
