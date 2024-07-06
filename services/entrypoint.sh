#!/bin/sh
set -e

npm install ## Note this line, rest is copy+paste from original entrypoint

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"
