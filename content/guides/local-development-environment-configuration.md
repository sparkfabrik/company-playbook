## Operating systems

This guide is available for [MacOSX](#macosx) and [Ubuntu](#ubuntu-linux).  
Click the links to jump to the section of interest.

## Prerequisites

* Access to a Bourne-compatible shell (what's proposed here has been tested with bash)
* VirtualBox (for OS X).
  If you don't have VB, yet, Docker Toolbox will install it for you. If you already have VB, you may want to choose the custom install of Docker Toolbox and deselect VB installation.

## Overview

Our local development environment is build on docker, to achieve:

* High decoupling from host OS
* Different services versions and configuration for each application/project
* The ability to commit the infrastructure together with the application in the same repository
* _One click_ local setup of projects for everyone in the team

One image is worth a thousand words, so here follows a simplified depiction of our local environment model:

![Local environment schema](%image_url%/recipes/local-development-environment--depiction-linux.png)

Basically, what we've got here is a set of containers, partaining to different projects. They are inerconnected via docker links so that each project has its own service: for example both Drupal projects in the image have dedicated MySQL and Apache/PHP containers, perfectly isolated. They can be stopped and started at will on a "by project" basis.

To reach each entry point, which in case of web applications is the HTTP server that exposes the app for that project, we need a resolver able to dinamically map containers to URLs when a container is started or stopped (mind a container IP is inherently dinamyc so a static map won't do).

This role is carried out by a containerized service called `dnsdock`, which does exactly this.  
The last ingredient consists in a local resolver able to inform the system to proxy the calls for a given TLD (`.loc` in our case) to dnsdock. This is a peculiar idiosincracy of Debian/Ubuntu whuch resolvers are managed by `network-manager` service.

Different host OSes rely on different resolvers.

In particular MacOSX scheme is a bit different. Since MacOSX's kernel can't run native Linux containers, at the base of docker, we'll need to run Linux in it. So achieve this we'll run an Ubuntu Server instance in a VirtualBox VM, provisioned automagically with `docker-machine` a useful command of the docker suite to provision and control a remote docker host as it was local (remember the `docker` command is a CLI client).

![Local environment on MacOSX](%image_url%/recipes/local-development-environment--depiction-macosx.png)

On MacOSX the local host resolver is the one native to MacOSX itself, while the rest of the stack runs in a VM, where the Linux distro acts only as a containers-provider.

***

## MacOSX

> _The guide for MacOSX is maintained by Paolo Mainardi_

### Automatic installation with the sparkdock privisioner (recommended way)

```
bash <(curl -fsSL https://raw.githubusercontent.com/sparkfabrik/sparkdock/master/bin/bootstrap)
```

This will provision a VirtualBox VM ready to use and will do most of the configuration required to access containers from outside the VM. Also dnsdock container will be created and activated.

### Manual Installation

Use *docker toolbox*: https://www.docker.com/toolbox
It will install VirtualBox + Docker + Docker Tools + Docker Machine
If you already have VirtualBox, select a custom ("Ad hoc") installation and deselect VB.

After installing Docker Toolbox, use the terminal to create *a new Docker machine* using this command:

```
docker-machine create dev -d virtualbox --virtualbox-disk-size 50000 --virtualbox-cpu-count 1 --virtualbox-memory 4096
```

Adjust the settings according to your system; the command above specify:
1. 50GB disk size
1. 4GB ram
1. 1 CPU

At the end of the installation use the `docker-machine ls` command, and you should see something like this:

```
% docker-machine ls
NAME   ACTIVE   DRIVER       STATE     URL                         SWARM
dev    *        virtualbox   Running   tcp://192.168.99.100:2376
```

Now you should add to the init script of your shell sessions something that automatically loads environment variable needed in order to connect to the dev machine.
Add this lines to your *.bashrc* or *.zshrc*:

```
eval "$(docker-machine env dev)"
export DOCKER_MACHINE_IP=$(docker-machine ip dev)
```

Install *dnsdock* with this command, that will create a container that will always start once the dev machine starts:

```
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.42.1:53:53/udp aacebedo/dnsdock:v1.15.0-amd64
```

### Check networking setup

After either manual or automatic installation, it's recommended to manually configure and test network setup:

*Set up routing*

```
sudo route -n add -net 172.17.0.0 $(docker-machine ip dev)
```

*Clear your DNS caches*:

```
sudo killall -HUP mDNSResponder
```

Or if you are using the sparkfabrik starterkit, just run:

**Drupal 7**:
```
config/scripts/clean-dns.cache.sh
```

**Drupal 8**:
```
docker/scripts/clean-dns.cache.sh
```

*Test* that everything is working as expected, by issuing these commands:

```
% docker run -d -e DNSDOCK_ALIAS=test1.mysql.docker.loc -e MYSQL_ROOT_PASSWORD=root --name mysql-test sparkfabrik/docker-mysql
% ping test1.mysql.docker.loc

PING test1.mysql.docker.loc (172.17.42.37): 56 data bytes
64 bytes from 172.17.42.37: icmp_seq=0 ttl=63 time=0.275 ms

% docker rm -vf mysql-test
```

These commands:
* create a temporary container that will instantiate a MySQL server
* ping the newly created service, using the predefined hostname, managed through dnsdock
* remove the temporary container (and service) and clean up the space occupied by the container

***

## Ubuntu Linux

> _The guide for Ubuntu Linux is maintained by Paolo Pustorino_

### Forenote

It my be late to state this but **avoid to encrypt your home directory**! It will gives at least two major disservice:

# Build operations on Drupal sites will have a **relevant** drop in performance
# Crypted FS in Ubuntu won't support filenames longer than 143 chars. We rely on **at least** a community contributed patch which name sums up to 144 chars. 

### Overview

Being containers a property of Linux kernel, `docker` is a native tool on Linux distros.
This guide will work with little tweaking on most distributions (as long as the kernel supports containers) and will reference original documentation to avoid it runs outdated.

To have a functional environment on a Linux machine we will:

* Install docker-engine and the docker command
* Install docker-compose, the official container orchestrator command-line tool
* Use docker itself to install `dnsdock`, a local resolver which works automagically with `docker-compose` to resolve local URLs to dynamically assigned container IPs
* Make the native Ubuntu local resolver and network-configuration stack work nicely with dnsdock (both bind local port 53 to expose a NS)

### Installing Docker engine and command

In order to install Docker, follow the *official documentation* at Docker's website. Instructions are available for all famous distros.

"Here the documentation":https://docs.docker.com/installation/ubuntulinux for Ubuntu users.

*IMPORTANT*: Make sure you also "follow the instructions":https://docs.docker.com/installation/ubuntulinux/#optional-configurations-for-docker-on-ubuntu at the chapter "Create a Docker group".

*HINT*: On Ubuntu the official `docker-engine` package you just installed creates the `docker` group for you. You must ensure your user belongs to that group. You can do it with:

```
sudo usermod -aG docker <username>
```

### Installing docker-compose orchestrator

Docker compose is a binary command which is not packaged for each individual OS/distro. Installing it is as easy as downloading the last binary in a shared executable path.
Issue those command *as root* on Ubuntu, no matter the version of OS you are running.

> Important: run as root, like with `sudo su`

```
export COMPOSE_VERSION_NUMBER=1.7.0 && \
curl -L https://github.com/docker/compose/releases/download/$COMPOSE_VERSION_NUMBER/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && \
chmod +x /usr/local/bin/docker-compose
```

### Installing dnsdock

dnsdock is a service which is automatically instructed by the docker engine every time a container is started with the option `-e DNSDOCK_ALIAS=<your.url.here>`.
Being it a Linux service we can leverage docker to install and start it without messing around with packages or such (nice uh?).

*HINT:* Make sure your user has been added to the docker group.

Run the container that will host dnsdock service

```
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.0.1:53:53/udp aacebedo/dnsdock:v1.15.0-amd64
```

Issuing this command, docker will:

* Download the dnsdock image from the Docker Hub (a central repository for contributed containers images)
* Run a new container based in that image
* Assign a local IP to that container (by default the network used by Docker on Ubuntu is `172.1.0.0/24`) on the first available on the system
* Expose the port 53/udp IN the container to the port 53/udp on the public container interface (being 172.1.0.1 as for the point above)
* Make the service restart when the host OS restarts, so it behaves like any other upstart service
* Name the container `dnsdock` for easier inspection

If you run into trouble due to port 53 being bound on the network, don't warry and read along.

### Installing / Configuring dnsmasq

This part of the guide has been tested to work on Ubuntu from LTS version 14.04, up to 16.04+ LTS. So far the recommanded version is 16.04.1 LTS.

Ubuntu 14.04 to 15.10 natively relies on `dnsmasq` a great and simple dns-proxy which allows for very elastic configuration of the networking stack. Most of all, `dnsmasq` plays very well with `resolvconf`, a very dull daemon which controls local resolution maps to make sure dynamically created networks never run into conflicts with each other.

Ubuntu 16.04 ships with a default dnsmasq configuration in the `/etc` folder, but the service itself is not installed by default. If you are on this OS version or if for some other reason you don't have dnsmasq installed, go forth and install it right away (don't worry, it's completely preconfigured to work transparently on a stock Ubuntu).

```
sudo apt-get install dnsmasq
```

While Ubuntu subsystem works really well, it doesn't play along with dnsdock, since dnsmasq binds on port 53/udp on 0.0.0.0.

*This can even prevent docker from exposing 53/udp on the container interface.*
To avoid this we need to create a proper configuration for dnsmasq so that it ignores docker interfaces and leave its port 53 alone.

In addition we need to instruct dnsmasq to proxy all queries to `.loc` TLD (which we use to resolve local domains in our projects) to dnsdock, which keeps the zone records for the dynamically created containers.  
That way, we can avoid messing around with the complex Ubuntu's networking stack and make dnsmasq know who to ask for .loc domains.

Since we don't want our configuration to be replaced in case we upgrade the system or dnsmasq service, we'll create a partial configuration in `/etc/dnsmasq.d/dnsdock-resolver` (it's a new file so nano or vim it as root).

Put what follows in that file:

```
server=/loc/172.17.0.1
bind-interfaces
except-interface=docker0
domain-needed
cache-size=0
```

The first line tells dnsmasq to proxy all queries for `.loc` domains to dnsdock, while the second tells it *not* to bind to `docker0' interface, which is the one that holds all containers IPs.

Restart dnsmasq

```
sudo service dnsmasq restart
```

And you're done.

*HINT*: if you followed provious steps and had dnsmasq already running, you may have to kill and restart your dnsdock to make it bind to the now available port 53 on `docker0` interface:

```
docker kill dnsdock && \
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.0.1:53:53/udp aacebedo/dnsdock:v1.15.0-amd64
```

*HINT*: if you have a local stack installed for other reasons and need to resolv a subset of `.loc` domains to localhost you can change the above configuration this way

```
address=/loc/127.0.0.1
server=/sparkfabrik.loc/172.17.0.1
except-interface=docker0
domain-needed
cache-size=0
```

So that all `.loc` subdomains are resolved to localhost *but* `sparkfabrik.loc` subdomains which is proxied to dnsdock.

### Test and enjoy

To test everything is working as expected, we'll try to run a service in a container, exposing it through a local URL.

> Do NOT execute as root, use your user to run containers

```
docker run -d -e DNSDOCK_ALIAS=testing.docker.with.mysql.sparkfabrik.loc -e MYSQL_ROOT_PASSWORD=root --name mysql-test sparkfabrik/docker-mysql && \
ping testing.docker.with.mysql.sparkfabrik.loc
```

You should see you can ping the running container smoothly (something in the lines of)

```
PING testing.docker.with.mysql.sparkfabrik.loc (172.17.0.37): 56 data bytes
64 bytes from 172.17.42.37: icmp_seq=0 ttl=63 time=0.275 ms
```

If all works, clean the test container and remove its image with

```
docker rm -vf mysql-test
```

## Arch Linux (dns configuration)

Instructions are basically the same of Ubuntu Linux:

* Install dnsmasq
* Create the `/etc/dnsmasq.d/dnsdock-resolver` file
* Start dnsmasq `systemctl start dnsmasq.service`
* Check dnsmasq status: `journalctl -u dnsmasq`

Then, if you have the `'port 53 problem'`, proceed as above:

* Add `nameserver 172.17.0.1` to `/ect/resolv.conf`
* Uncomment `port=5353` into `/etc/dnsmasq.conf` file
* Restart dnsmasq `systemctl restart dnsmasq.service`
* Restart dnsdock container
* Enjoy :)
	
