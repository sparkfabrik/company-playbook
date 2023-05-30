FROM node:18-alpine
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

# Variables
ENV INSTALL_DIR=/opt/raneto
ENV PORT=80

# Remove content folder
RUN rm -rf content/

# Copy content and configuration
COPY ./custom/server.js $INSTALL_DIR/
COPY ./custom/package.json $INSTALL_DIR/
COPY ./custom/config.js $INSTALL_DIR/config.js
COPY ./custom/themes $INSTALL_DIR/themes
COPY ./content $INSTALL_DIR/content
COPY ./assets $INSTALL_DIR/assets

# Install raneto and deps
WORKDIR $INSTALL_DIR
RUN npm install

WORKDIR $INSTALL_DIR/themes/spark-playbook

RUN \
  npm update && \
  npm install && \
  npm run build

WORKDIR $INSTALL_DIR

# Expose port 80
EXPOSE 80

# Let's go
CMD ["npm", "start"]