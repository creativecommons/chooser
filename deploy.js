const fs = require('fs-extra');
const path = require('path')

const CNAME = "chooser-beta.creativecommons.org"
const FILENAME = "CNAME"
const OUTPUT_DIR = "./docs"

fs.emptyDirSync(OUTPUT_DIR)
fs.writeFileSync(path.join(OUTPUT_DIR, FILENAME), CNAME)
fs.copySync('dist', OUTPUT_DIR)

console.log(`Folder ${OUTPUT_DIR} is ready for deploying at ${CNAME}`)
