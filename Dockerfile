FROM sparkfabrik/docker-locke-server:latest
MAINTAINER Paolo Pustorino <paolo.pustorino@sparkfabrik.com>

# Remove content folder
RUN rm -rf content/

# Copy content and configuration
COPY ./custom/config.js /srv/locke/config.js
COPY ./custom/custom-styles.css /srv/locke/themes/spark/public/styles/custom.css
COPY ./content /srv/locke/content
COPY ./assets /srv/locke/assets
