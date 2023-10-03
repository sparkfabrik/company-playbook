FROM node:18-alpine
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

# Variables
ENV INSTALL_DIR=/opt/raneto
ENV PORT=80

# Copy content and configuration
COPY ./custom/server.js $INSTALL_DIR/
COPY ./custom/package.json $INSTALL_DIR/
COPY ./custom/package-lock.json $INSTALL_DIR/
COPY ./custom/config.js $INSTALL_DIR/config.js
COPY ./custom/themes $INSTALL_DIR/themes
COPY ./content $INSTALL_DIR/content
COPY ./assets $INSTALL_DIR/assets
COPY ./custom/patches $INSTALL_DIR/patches

# Install raneto and deps
WORKDIR $INSTALL_DIR
RUN npm ci && npm run postinstall

WORKDIR $INSTALL_DIR/themes/spark-playbook

RUN \
  npm ci && \
  npm run build

WORKDIR $INSTALL_DIR

# Expose port 80
EXPOSE $PORT

# Let's go
CMD ["npm", "start"]