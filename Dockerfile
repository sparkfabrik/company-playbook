FROM sparkfabrik/docker-locke-server:latest
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

# Remove content folder
RUN rm -rf content/

# Copy content and configuration
COPY ./custom/config.js /srv/locke/config.js
COPY ./custom/themes /srv/locke/themes
COPY ./content /srv/locke/content
COPY ./assets /srv/locke/assets

# This file copy is a simple and effective way
# to enchance RANETO waiting for the pull request
# in the project to be accepted.
COPY ./custom/raneto/contents.js /srv/locke/node_modules/raneto/app/core/contents.js

WORKDIR /srv/locke/themes/spark-playbook

RUN \
  npm update && \
  npm install && \
  npm run build

WORKDIR /srv/locke/
