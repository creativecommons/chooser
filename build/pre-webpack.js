/*eslint no-undef: 0*/

const concat = require("concat");
const path = require("path");

concatjs()

function concatjs() {
    concat([
        path.resolve(__dirname, "../src/index.js"),
        path.resolve(__dirname, "../src/scripts/scripts.js"),
        path.resolve(__dirname, "../src/scripts/choose-a-license.js"),
        path.resolve(__dirname, "../src/scripts/HTML-generator.js"),
        path.resolve(__dirname, "../src/scripts/page-controls.js"),
    ], path.resolve(__dirname, "./bin/concatenated-js.js"))    
}