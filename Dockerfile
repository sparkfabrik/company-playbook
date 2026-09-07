FROM node:24-alpine AS dev
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

# Expose port 80
EXPOSE $PORT

# Configure the entrypoint script
COPY build/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["npm", "run", "start"]
ENTRYPOINT ["tini", "--", "/entrypoint.sh"]

# Theme build stage: compiles the theme bundle with the theme devDependencies.
# Only public/dist is carried into the runtime image.
FROM dev AS theme-build

WORKDIR $INSTALL_DIR/themes/spark-playbook
RUN npm ci && npm run build

# App dependency stage: installs production dependencies only. Scripts are
# skipped during install (husky's prepare script has no git repository here
# and its binary is a devDependency).
FROM dev AS app-deps

WORKDIR $INSTALL_DIR
ENV NODE_ENV=production
RUN npm ci --omit=dev --ignore-scripts

# Runtime stage: no devDependencies, no theme build toolchain. This is the
# stage Cloud Run deploys.
FROM node:24-alpine AS prod
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

RUN apk add --no-cache tini

ENV INSTALL_DIR=/opt/raneto
ENV PORT=80
ENV NODE_ENV=production

WORKDIR $INSTALL_DIR

COPY ./custom/server.js ./
COPY ./custom/package* ./
COPY ./custom/config.js ./config.js
COPY ./custom/themes ./themes
COPY ./content ./content
COPY ./assets ./assets
COPY --from=app-deps $INSTALL_DIR/node_modules ./node_modules
COPY --from=theme-build $INSTALL_DIR/themes/spark-playbook/public/dist ./themes/spark-playbook/public/dist

EXPOSE $PORT

COPY build/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["npm", "run", "start"]
ENTRYPOINT ["tini", "--", "/entrypoint.sh"]
