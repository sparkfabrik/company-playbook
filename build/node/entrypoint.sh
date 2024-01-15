#!/bin/ash

set -eo pipefail
BASE=${PWD}

if [ "${1}" = 'npm' ] && [ "$NODE_ENV" != 'production' ]; then
  echo "Installing and building theme..."
  cd /opt/raneto/themes/spark-playbook
  npm install
  npm run build
  echo "Finished installing and building theme."

  echo "Installing raneto's npm libraries..."
  cd /opt/raneto
  npm install
  npm run postinstall
  echo "Finished installing raneto's npm libraries."

  echo "...done\n"
fi

cd ${BASE}
echo "Running command: ${@}"
exec "$@"
