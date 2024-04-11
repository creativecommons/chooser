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
echo

echo "Starting build"
docker compose exec web npm run build-component
echo "Finished build"
echo

echo "Starting publish"
docker compose exec web npm publish --access public
echo
