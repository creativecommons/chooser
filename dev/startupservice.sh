#!/bin/bash
set -o errexit
set -o nounset

cd /app

if [[ ! -d node_modules ]]
then
    echo 'Clean installing packages from package-lock.json'
    npm ci
    echo
fi

npm run serve
