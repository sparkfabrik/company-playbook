FROM sparkfabrik/docker-locke-server:latest
LABEL maintainer="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

# Remove content folder
RUN rm -rf content/

# Copy content and configuration
COPY ./custom/config.js /srv/locke/config.js
COPY ./custom/custom-styles.css /srv/locke/themes/spark/public/styles/custom.css
COPY ./custom/templates/page.html /srv/locke/themes/spark/templates/page.html
COPY ./custom/templates/layout.html /srv/locke/themes/spark/templates/layout.html
COPY ./content /srv/locke/content
COPY ./assets /srv/locke/assets
