#!/bin/bash

set -o errexit
set -o errtrace
set -o nounset

trap '_es=${?};
    _lo=${LINENO};
    _co=${BASH_COMMAND};
    echo "${0}: line ${_lo}: \"${_co}\" exited with a status of ${_es}";
    exit ${_es}' ERR

echo "Deleting contents of dist folder"
rm -rf dist/*

echo "Starting build"
npm run build-component
echo "Finished build"

echo "Starting publish"
npm publish --access public