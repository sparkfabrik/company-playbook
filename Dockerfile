FROM node:18-alpine as dev
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

RUN apk add --no-cache tini

# Variables
ENV INSTALL_DIR=/opt/raneto
ENV PORT=80

# Set current working directory
WORKDIR $INSTALL_DIR

# Copy content and configuration
COPY ./custom/server.js ./
COPY ./custom/package* ./
COPY ./custom/config.js ./config.js
COPY ./custom/themes ./themes
COPY ./content ./content
COPY ./assets ./assets
COPY ./custom/patches ./patches

# Expose port 80
EXPOSE $PORT

# Configure the entrypoint script
COPY build/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["npm", "run", "start"]
ENTRYPOINT ["tini", "--", "/entrypoint.sh"]

FROM dev as prod

WORKDIR /opt/raneto
# Production build, must be all moved in a shared script.
RUN cd themes/spark-playbook && \
    npm install && \
    npm run build && \
    cd /opt/raneto && \
    npm install && \
    npm run postinstall

# This should be moved before install, but for some reasons it breaks the build.
# We just use it now for the entrypoint.
ENV NODE_ENV=production
