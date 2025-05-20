#!/bin/sh
set -e

docker run --rm \
  -v "$PWD":/app \
  -w /app \
  node:20 \
  npx prettier . --write
