FROM node:20-slim as cli

WORKDIR /usr/src/app

# Install some useful cli tools.
RUN apt-get update && apt-get install -y \
    gettext-base git libsqlite3-dev python3 cmake g++ git vim curl locales sudo ffmpeg

# Add node user to sudoers.
# Refs: https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user#_creating-a-nonroot-user
RUN echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Configure locale.
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install oh-my-bash and configure locale.
ARG USERNAME=node
RUN su -c bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)" $USERNAME && \
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

RUN mkdir -p /home/node/.npm && \
    mkdir -p /home/node/.local

# Set custom aliases.
RUN echo "alias dc=docker-compose" >>  /etc/bash.bashrc && \
    echo "alias nodets='npx tsx'" >>  /etc/bash.bashrc && \
    echo "OSH_THEME=\"powerline\"" >> /home/node/.bashrc

# Set a custom HISTFILE env to keep history where we want.
ENV HISTFILE=/home/node/.dotfiles/.bash_history
