FROM node:18-alpine as dev
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

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
CMD ["npm run start"]
ENTRYPOINT ["/entrypoint.sh"]

FROM dev as prod
WORKDIR /opt/raneto
RUN cd custom && npm install
