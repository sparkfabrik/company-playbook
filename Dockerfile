FROM node:18-alpine
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

# Variables
ENV INSTALL_DIR=/opt/raneto
ENV PORT=80

# Set current working directory
WORKDIR $INSTALL_DIR

# Copy content and configuration
COPY ./custom/server.js ./
COPY ./custom/package.json ./
COPY ./custom/package-lock.json ./
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
ENTRYPOINT ["/entrypoint.sh"]
