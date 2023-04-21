FROM linuxserver/raneto:0.17.3
LABEL author="Paolo Pustorino <paolo.pustorino@sparkfabrik.com>"

RUN apk add --no-cache --virtual .gyp npm make g++ py3-pip

# Remove content folder
RUN rm -rf /app/raneto/content

# Copy content and configuration
COPY ./content /app/raneto/content
COPY ./custom/themes /app/raneto/custom/themes
COPY ./config /app/raneto/config

WORKDIR /app/raneto/custom/themes/spark-playbook

RUN \
  npm install && \
  npm run build

RUN apk del .gyp

WORKDIR /app/raneto
