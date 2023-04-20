FROM linuxserver/raneto:0.17.3
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

RUN apk add --no-cache npm python3 make g++

# Copy content and configuration
COPY ./content /app/raneto/content
COPY ./custom/themes /app/raneto/themes
COPY ./config /app/raneto/config

WORKDIR /app/raneto/themes/spark-playbook

RUN \
  npm install && \
  npm run build

# Copy assets
COPY ./assets /app/raneto/assets

WORKDIR /app/raneto
