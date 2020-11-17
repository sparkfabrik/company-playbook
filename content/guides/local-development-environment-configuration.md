## Operating systems

This guide is available for [MacOSX](#macosx) and [Ubuntu](#ubuntu-linux).  
Click the links to jump to the section of interest.

## Prerequisites

* Access to a Bourne-compatible shell (all the following procedures have been tested with bash)
* VirtualBox (for OS X).  
  If you don't have VB, yet, Docker Toolbox will install it for you. If you already have VB, you may want to choose the custom install of Docker Toolbox and deselect VB installation.

## Overview

Our local development environment is build on docker, to achieve:

* High decoupling from host OS
* Different services versions and configuration for each application/project
* The ability to commit the infrastructure together with the application in the same repository
* _One click_ local setup of projects for everyone in the team

One image is worth a thousand words, so here follows a simplified depiction of our local environment model:

![Local environment schema](%image_url%/procedures/local-development-environment--depiction-linux.png)

Basically, what we've got here is a set of containers, partaining to different projects. They are inerconnected via docker links so that each project has its own service: for example both Drupal projects in the image have dedicated MySQL and Apache/PHP containers, perfectly isolated. They can be stopped and started at will on a "by project" basis.

To keep containers sets isolated we rely on `docker-compose`, a simple orchestrator that's easy to configure and run locally.

To reach each entry point, that in case of web applications is the HTTP server that exposes the app for that project, we need a resolver able to dinamically map containers to URLs when a container is started or stopped (mind a container IP is inherently dynamic so a static map won't do).  
This role is carried out by a containerized service called `dnsdock`, that does exactly this.

The last ingredient consists in a local resolver able to inform the system to proxy the calls for a given TLD (`.loc` in our case) to dnsdock. This is a peculiar idiosincracy of Debian/Ubuntu which resolvers are managed dynamically by `network-manager` service (and it's better to leave it that way to avoid many headhaches).

Different host OSes rely on different resolvers.

In particular MacOSX scheme is a bit different. Since MacOSX's kernel can't run native Linux containers, we'll need to run Linux in a virtual machine. For consistency, our choice is for Ubuntu Server in VirtualBox, provisioned automagically by `docker-machine`, a useful command of the docker suite to provision and control a remote docker host as it was local (remember the `docker` command is a CLI client).

![Local environment on MacOSX](%image_url%/procedures/local-development-environment--depiction-macosx.png)

On MacOSX the local host resolver is the one native to MacOSX itself, while the rest of the stack runs in a VM, where the Linux distro acts only as a containers-provider.

***

## MacOSX

> _The guide for MacOSX is maintained by Paolo Mainardi_

### Automatic installation with the sparkdock privisioner (recommended way)

```
bash <(curl -fsSL https://raw.githubusercontent.com/sparkfabrik/sparkdock/master/bin/install.macosx)
```

This will provision a VirtualBox VM ready to use and will do most of the configuration required to access containers from outside the VM. Also dnsdock container will be created and activated.

### Manual Installation

Use *docker toolbox*: https://www.docker.com/toolbox.  
It will install VirtualBox + Docker + Docker Tools + Docker Machine
If you already have VirtualBox, select a custom _ad hoc_ installation and deselect VB.

After installing Docker Toolbox, use the terminal to create **a new Docker machine** using this command:

```bash
docker-machine create dinghy -d virtualbox --virtualbox-disk-size 50000 --virtualbox-cpu-count 1 --virtualbox-memory 4096
```

Adjust the settings according to your system; the command above specify:

1. 50GB disk size
2. 4GB ram
3. 1 CPU

At the end of the installation use the `docker-machine ls` command, and you should see something like this:

```bash
% docker-machine ls
NAME   ACTIVE   DRIVER       STATE     URL                         SWARM
dinghy    *        virtualbox   Running   tcp://192.168.99.100:2376
```

Now you should add to the init script of your shell sessions something that automatically loads environment variable needed in order to connect to the dinghy machine.
Add this lines to your *.bashrc* or *.zshrc*:

```bash
eval "$(docker-machine env dinghy)"
export DOCKER_MACHINE_IP=$(docker-machine ip dinghy)
```

Install *dnsdock* with this command, that will create a container that will always start once the dinghy machine starts:

```bash
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.42.1:53:53/udp aacebedo/dnsdock:v1.15.0-amd64
```

### Check networking setup

After either manual or automatic installation, it's recommended to manually configure and test network setup.

Set up routing:

```bash
sudo route -n add -net 172.17.0.0 $(docker-machine ip dinghy)
```

Clear your DNS caches:

```bash
sudo killall -HUP mDNSResponder
```

Or if you are using the sparkfabrik starterkit, just run:

**Drupal 7**:

```bash
config/scripts/clean-dns.cache.sh
```

**Drupal 8**:

```bash
docker/scripts/clean-dns.cache.sh
```

*Test* that everything is working as expected, by issuing these commands:

```bash
% docker run -d -e DNSDOCK_ALIAS=test1.redis.docker.loc --name redis-test redis:alpine
% ping test1.redis.docker.loc

PING test1.redis.docker.loc (172.17.42.37): 56 data bytes
64 bytes from 172.17.42.37: icmp_seq=0 ttl=63 time=0.275 ms

% docker rm -vf redis-test
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

1. Build operations on Drupal sites will have a **relevant** drop in performance
1. Crypted FS in Ubuntu won't support filenames longer than 143 chars. We rely on **at least** a community contributed patch which name sums up to 144 chars. 

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

[Here the documentation](https://docs.docker.com/installation/ubuntulinux) for Ubuntu users.

> **IMPORTANT**: Make sure you also [follow the instructions](https://docs.docker.com/installation/ubuntulinux/#optional-configurations-for-docker-on-ubuntu) at the chapter "Create a Docker group".

> **HINT**: On Ubuntu the official `docker-engine` package you just installed creates the `docker` group for you. You must ensure your user belongs to that group. You can do it with:

```bash
sudo usermod -aG docker <username>
```

### Installing docker-compose orchestrator

Docker compose is a binary command which is not packaged for each individual OS/distro. Installing it is as easy as downloading the last binary in a shared executable path.
Issue those command *as root* on Ubuntu, no matter the version of OS you are running.

> **IMPORTANT**: since you need a superuser complete environment, run the following commands as root, like with `sudo su`

```bash
export COMPOSE_VERSION_NUMBER=1.23.1 && \
curl -L https://github.com/docker/compose/releases/download/$COMPOSE_VERSION_NUMBER/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && \
chmod +x /usr/local/bin/docker-compose
```

### Installing dnsdock

dnsdock is a service which is automatically instructed by the docker engine every time a container is started with the option `-e DNSDOCK_ALIAS=<your.url.here>`.
Being it a Linux service we can leverage docker to install and start it without messing around with packages or such (nice uh?).

> **HINT**: Make sure your user has been added to the docker group.

Run the container that will host dnsdock service

```bash
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

### Configuring systemd-resolved (Current - Ubuntu 18.04 LTS +)

> **NOTE**: Ubuntu 18.04 LTS is the current recommended version.  for which the following is not necessary. Should you need to configure a legacy version of Ubuntu (14.04 to 16.04 LTS), [jump to the correct paragraph](#installing--configuring-dnsmasq-legacy---ubuntu-1404-to-1604-lts).

With the migration to `systemd`, Ubuntu 18.04 adopted the `systemd-resolved` service. This is a sort of catchall, multiprotocol name-resolving system that also provides a stub for DNS resolutions for local traffic.

The piece basically sits where `dnsmasq` used to in former OS versions. Sadly `resolved` configuration is nowhere as clean and powerful as `dnsmasq`, leading to two minor problems.

1. We have to change a system configuration file to make it work. This becomes a problem if you want to upgrade to the next LTS since the procedure will complain about the changed file (not a big problem but still).
2. The service happens to head in a sort of race condition when new containers are spawn from time to time, so resolve new containerized service can stop working (we have [a simple workaround](#workaround-for-resolveddnsdock-lock-up) for this).

The good news is that the procedure is simpler than `dnsmasq` configuration. Just create this new file `/etc/systemd/resolved.conf.d/dnsdock.conf` as superuser with the following content:

```text
[Resolve]
DNS=172.17.0.1
Domains=~loc
```

#### Workaround for resolved/dnsdock lock-up

As mentioned above, `resolved` and `dnsdock` may end up in a deadlock. The effect is that your OS won't be able to resolve new containers started with `docker-compose`. Restarting the services will suffice to make things work again:

```bash
docker restart dnsdock && sudo service systemd-resolved restart
```

Too bad this requires to provide superuser password.  
You can alias this command to something mnemonic (say `bazooka`) so that fixing things will be easy. You won't regret having this alias.

### Installing / Configuring dnsmasq (Legacy - Ubuntu 14.04 to 16.04 LTS)

> **NOTE**: This part of the guide works on Ubuntu from LTS version 14.04, up to 16.04+ LTS. The current recommended version is 18.04 LTS, for which the following is not necessary. To properly configure 18.04 LTS, [jump to the correct paragraph](#configuring-systemd-resolved-current---ubuntu-1804-lts-).

Ubuntu 14.04 to 15.10 natively relies on `dnsmasq` a great and simple dns-proxy which allows for very elastic configuration of the networking stack. Most of all, `dnsmasq` plays very well with `resolvconf`, a very dull daemon which controls local resolution maps to make sure dynamically created networks never run into conflicts with each other.

Ubuntu 16.04 ships with a default dnsmasq configuration in the `/etc` folder, but the service itself is not installed by default. If you are on this OS version or if for some other reason you don't have dnsmasq installed, go forth and install it right away (don't worry, it's completely preconfigured to work transparently on a stock Ubuntu).

```bash
sudo apt-get install dnsmasq
```

While Ubuntu subsystem works really well, it doesn't play along with dnsdock, since dnsmasq binds on port 53/udp on 0.0.0.0.

*This can even prevent docker from exposing 53/udp on the container interface.*
To avoid this we need to create a proper configuration for dnsmasq so that it ignores docker interfaces and leave its port 53 alone.

In addition we need to instruct dnsmasq to proxy all queries to `.loc` TLD (which we use to resolve local domains in our projects) to dnsdock, which keeps the zone records for the dynamically created containers.  
That way, we can avoid messing around with the complex Ubuntu's networking stack and make dnsmasq know who to ask for .loc domains.

Since we don't want our configuration to be replaced in case we upgrade the system or dnsmasq service, we'll create a partial configuration in `/etc/dnsmasq.d/dnsdock-resolver` (it's a new file so nano or vim it as root).

Put what follows in that file:

```text
server=/loc/172.17.0.1
bind-interfaces
except-interface=docker0
domain-needed
cache-size=0
```

The first line tells dnsmasq to proxy all queries for `.loc` domains to dnsdock, while the second tells it *not* to bind to `docker0' interface, which is the one that holds all containers IPs.

Restart dnsmasq

```bash
sudo service dnsmasq restart
```

And you're done.

*HINT*: if you followed provious steps and had dnsmasq already running, you may have to kill and restart your dnsdock to make it bind to the now available port 53 on `docker0` interface:

```bash
docker kill dnsdock && \
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.0.1:53:53/udp aacebedo/dnsdock:v1.15.0-amd64
```

> **HINT**: if you have a local stack installed for other reasons and need to resolv a subset of `.loc` domains to localhost you can change the above configuration this way

```text
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

```bash
docker run -d -e DNSDOCK_ALIAS=testing.docker.with.mysql.sparkfabrik.loc -e MYSQL_ROOT_PASSWORD=root --name mysql-test sparkfabrik/docker-mysql && \
ping testing.docker.with.mysql.sparkfabrik.loc
```

You should see you can ping the running container smoothly (something in the lines of)

```bash
PING testing.docker.with.mysql.sparkfabrik.loc (172.17.0.37): 56 data bytes
64 bytes from 172.17.42.37: icmp_seq=0 ttl=63 time=0.275 ms
```

If all works, clean the test container and remove its image with

```bash
docker rm -vf mysql-test
```
