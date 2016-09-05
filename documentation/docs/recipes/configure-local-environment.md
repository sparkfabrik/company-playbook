
## Prerequisites

* Access to a Bourne-compatible shell (what's proposed here has been tested with bash)
* GNU make
* VirtualBox (for OS X). If you don't have VB, yet, Docker Toolbox will install it for you. If you already have VB, you may want to choose the custom install of Docker Toolbox and deselect VB installation.

## Docker installation

### OSX

#### Automatic installation with the sparkdock privisioner (recommended way)

<pre>
bash <(curl -fsSL https://raw.githubusercontent.com/sparkfabrik/sparkdock/master/bin/bootstrap)
</pre>

This will provision a VirtualBox VM ready to use and will do most of the configuration required to access containers from outside the VM. Also dnsdock container will be created and activated.

#### Manual Installation

Use *docker toolbox*: https://www.docker.com/toolbox
It will install VirtualBox + Docker + Docker Tools + Docker Machine
If you already have VirtualBox, select a custom ("Ad hoc") installation and deselect VB.

After installing Docker Toolbox, use the terminal to create *a new Docker machine* using this command:

<pre>
docker-machine create dev -d virtualbox --virtualbox-disk-size 50000 --virtualbox-cpu-count 1 --virtualbox-memory 4096
</pre>

Adjust the settings according to your system; the command above specify:
1. 50GB disk size
1. 4GB ram
1. 1 CPU

At the end of the installation use the @docker-machine ls@ command, and you should see something like this:

<pre>
% docker-machine ls
NAME   ACTIVE   DRIVER       STATE     URL                         SWARM
dev    *        virtualbox   Running   tcp://192.168.99.100:2376
</pre>

Now you should add to the init script of your shell sessions something that automatically loads environment variable needed in order to connect to the dev machine.
Add this lines to your *.bashrc* or *.zshrc*:

<pre>
eval "$(docker-machine env dev)"
export DOCKER_MACHINE_IP=$(docker-machine ip dev)
</pre>

Install *dnsdock* with this command, that will create a container that will always start once the dev machine starts:

<pre>
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.42.1:53:53/udp tonistiigi/dnsdock:v1.10.0
</pre>

#### Check networking setup

After either manual or automatic installation, it's recommended to manually configure and test network setup:

*Set up routing*

<pre>
sudo route -n add -net 172.17.0.0 $(docker-machine ip dev)
</pre>

*Clear your DNS caches*:

<pre>
sudo killall -HUP mDNSResponder
</pre>

Or if you are using the sparkfabrik starterkit, just run:

D7:
```
config/scripts/clean-dns.cache.sh
```

D8:
```
docker/scripts/clean-dns.cache.sh
```

*Test* that everything is working as expected, by issuing these commands:

<pre>
% docker run -d -e DNSDOCK_ALIAS=test1.mysql.docker.loc -e MYSQL_ROOT_PASSWORD=root --name mysql-test sparkfabrik/docker-mysql
% ping test1.mysql.docker.loc

PING test1.mysql.docker.loc (172.17.42.37): 56 data bytes
64 bytes from 172.17.42.37: icmp_seq=0 ttl=63 time=0.275 ms

% docker rm -vf mysql-test
</pre>

These commands:
* create a temporary container that will instantiate a MySQL server
* ping the newly created service, using the predefined hostname, managed through dnsdock
* remove the temporary container (and service) and clean up the space occupied by the container

### Linux

#### Overview

Being containers a property of Linux kernel, `docker` is a native tool on Linux distros.
This guide will work with little tweaking on most distributions (as long as the kernel supports containers) and will reference original documentation to avoid it runs outdated.

To have a functional environment on a Linux machine we will:

* Install docker-engine and the docker command
* Install docker-compose, the official container orchestrator command-line tool
* Use docker itself to install `dnsdock`, a local resolver which works automagically with `docker-compose` to resolve local URLs to dynamically assigned container IPs
* Make the native Ubuntu local resolver and network-configuration stack work nicely with dnsdock (both bind local port 53 to expose a NS)

#### Installing Docker engine and command

In order to install Docker, follow the *official documentation* at Docker's website. Instructions are available for all famous distros.

"Here the documentation":https://docs.docker.com/installation/ubuntulinux for Ubuntu users.

*IMPORTANT*: Make sure you also "follow the instructions":https://docs.docker.com/installation/ubuntulinux/#optional-configurations-for-docker-on-ubuntu at the chapter "Create a Docker group".

*HINT*: On Ubuntu the official `docker-engine` package you just installed creates the `docker` group for you. You must ensure your user belongs to that group. You can do it with:

```
sudo usermod -aG docker <username>
```

#### Installing docker-compose orchestrator

Docker compose is a binary command which is not packaged for each individual OS/distro. Installing it is as easy as downloading the last binary in a shared executable path.
Issue those command *as root* on Ubuntu, no matter the version of OS you are running.

<pre>

> Important: run as root, like with `sudo su`

export COMPOSE_VERSION_NUMBER=1.7.0 && \
curl -L https://github.com/docker/compose/releases/download/$COMPOSE_VERSION_NUMBER/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && \
chmod +x /usr/local/bin/docker-compose
</pre>

#### Installing dnsdock

dnsdock is a service which is automatically instructed by the docker engine every time a container is started with the option `-e DNSDOCK_ALIAS=<your.url.here>`.
Being it a Linux service we can leverage docker to install and start it without messing around with packages or such (nice uh?).

*HINT:* Make sure your user has been added to the docker group.

Run the container that will host dnsdock service

<pre>
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.0.1:53:53/udp tonistiigi/dnsdock:v1.10.0
</pre>

Issuing this command, docker will:

* Download the dnsdock image from the Docker Hub (a central repository for contributed containers images)
* Run a new container based in that image
* Assign a local IP to that container (by default the network used by Docker on Ubuntu is `172.1.0.0/24`) on the first available on the system
* Expose the port 53/udp IN the container to the port 53/udp on the public container interface (being 172.1.0.1 as for the point above)
* Make the service restart when the host OS restarts, so it behaves like any other upstart service
* Name the container `dnsdock` for easier inspection

If you run into trouble due to port 53 being bound on the network, don't warry and read along.

#### Installing / Configuring dnsmasq (Ubuntu 14.04 - 15.10)

Ubuntu 14.04 to 15.10 natively relies on `dnsmasq` a great and simple dns-proxy which allows for very elastic configuration of the networking stack. Most of all, `dnsmasq` plays very well with `resolvconf`, a very dull daemon which controls local resolution maps to make sure dynamically created networks never run into conflicts with each other.

If for some reason you don't have dnsmasq installed, install it right away (don't warry, it's completely preconfigured to work transparently on a stock Ubuntu).

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
docker run --restart=always -d -v /var/run/docker.sock:/var/run/docker.sock --name dnsdock -p 172.17.0.1:53:53/udp tonistiigi/dnsdock:v1.10.0
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


#### Installing a local resolver (Ubuntu 16.04 +)

*This configuration still have to be tested and documented, please use 14.04 LTS or 15.10, so far.*


#### Test and enjoy

To test everything is working as expected, we'll try to run a service in a container, exposing it through a local URL.

```
> Do NOT execut as root, use your user to run containers

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

-------

## Use docker-compose to control containers set up for a specific project

Docker compose reference: https://docs.docker.com/compose/overview/

docker-compose allows to control and "orchestrate" multiple containers that need to work together as the infrastructure for a web appplication.
Usually, the definitions for the containers are stored in a docker-compose.yml file located in the root of the project.

### Useful commands

1. See active containers: _docker-compose ps_
1. See logs of a container:  _docker-compose logs [container-name-as-specified-in-the-docker-compose-file]_
1. Stop containers _docker-compose stop_
1. Delete *all* containers defined in the YAML file from disk (be careful this is destructive): _docker-compose rm -vf_
1. Get a shell from a running container: _docker exec -it [container_name] bash_ where _container_name_ is the name of the container as written in the first column of _docker-compose ps_ output

As the "docker-compose.yml" file is not versioned, it can be customized according to our need.

## Execute a build

The application builds in this Docker-based dev environment run completely inside the containers, since the full stack is built into them.
In order to automate and simplify the construction of the environment and the execution of builds, we use GNU Make as a task launcher, while the application itself is built inside the containers. Typically, a build is started with a simple command executed in the project's root, where the Makefile resides, like

<pre>
make ENV=loc
</pre>

If you, control/performance freak, want to keep an eye on build timing, just use time: @time make ENV=loc@,
You can get some information about this system typing @make help@

## How to connect to services provided by containers

The availability of services (e.g. a webserver, a database server) hosted in the containers is provided through a special DNS service called dnsdock.
In the docker-compose definitions, an environment variable is set (DNSDOCK_ALIAS ) for each container, and it declares which hostnames should be reachable through that DNS service.
Don't forget that services might be defined also using non-standard connection ports, so that should be taken into account when trying to connect to services through a browser or some other clients.

### Connection to services in a VM-based environment

Case: you are using a Mac, you have your development containers running in the "dev" Docker Machine (VM) and reachable from your machine, but you also wanto them to be reachable from a Microsoft browser running in another VM

* edit docker-compose.yml
* add these lines for the drupal service:
<pre>
ports:
  - "80:80"
</pre>
* execute @docker-compose up -d@
* edit the host file in the virtualized Windows system and add entries for the application domain(s)
* make sure that your local webserver (the one running natively in Mac OS X) is stopped

## Debugging with xdebug

By default, xdebug is disabled inside the Drupal container. In order to enable/disable it, a couple of scripts are provided in the application codebase:
* @bin/enable-xdebug@
* @bin/disable-xdebug@

If you use Vim + Vdebug for editing/debugging, you must also set a Vdebug option to map the container's filesystem to your local filesystem:
<pre>
let g:vdebug_options = {
    \ "path_maps": {"/var/www/html": "/Users/marcello/Development/sparkfabrik/project"}}
</pre>

If you use SublimeText check here: https://github.com/martomo/SublimeTextXdebug *path_mapping* configuration.

## Profiling with Blackfire.io

In order to use Blackfire.io for profiling applications residing in containers, these environment variables must be set:

<pre>
export BLACKFIRE_SERVER_TOKEN=YOUR_SERVER_TOKEN
export BLACKFIRE_SERVER_ID=YOUR_SERVER_ID
</pre>

If the container was already running, restart them like this:

<pre>
docker-compose stop
docker-compose up -d
</pre>

## Backup of data container

### Backup

Full backup of data container: <pre>make backup-data ENV=loc</pre>

You can also pass the VOLUMES arguments in order to restrict the scope, for example:

<pre>
make backup-data ENV=loc VOLUMES=/var/lib/mysql
</pre>

Please note that the volumes are them specified on  "docker-common-services.yml":

<pre>
data:
  image: busybox
  volumes:
    - /var/lib/mysql
    - /opt/solr/example/multicore/multi/data
    - /var/www/html/sites/default/files
</pre>

### Import

To import a data container backup tarball, use the following command:

<pre>
make import-data ENV=loc FILE=backup-filename.tar,bz2
</pre>

The file must be placed within the project root to make it recognized correctly.


## Executing commands inside the containers

You might want to execute commands from a shell inside the containers, in order to do so, an interactive shell must be opened on the desired container, then you can have access to commands like drush, or other CLI utilities.
We've set up a wrapper that allows a concise syntax for executing commands in container: @bin/e@ (in the root of the "dockerized" project)
The bin/e command refers to the codebase root as a base path.

To make life even more easy, some aliases for @bin/e@ commands have been created. The aliases can be generated with @config/scripts/gen-aliases.sh@ (a .dist/template file ) which can then be "sourced":
- Aliases generation: config/scripts/gen-aliases.sh
- Import new aliases without having to log-in again @source .aliases@

## New php syntax checking tools

The tools to control coding standards AND also make some automatic fix about that,
The most important thing when installing the requisites for the local environment is to download the git hooks used for validating the software. you can do it with a simple step:

<pre>
./init-git-hooks.sh
</pre>

In order to run automatic syntax checking and fixing, some aliases have been defined:
* @cs@ checks coding standards compliance
* @fix-cs@ fixes some coding standard issues

## Managing possible excessive volume growth of the docker infrastructure

### OSX

<pre>
docker-machine ssh dev
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /mnt/sda1/var/lib/docker:/var/lib/docker --rm paolomainardi/docker-cleanup-volumes --ver
bose —dry-run
</pre>

### Linux

<pre>
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker --rm paolomainardi/docker-cleanup-volumes --ver
bose —dry-run
</pre>

### Other commands useful when you're low on disk space

<pre>
docker volume rm $(docker volume ls -f dangling=true | awk '{print $2}')
docker rm -vf $(docker ps -a | grep Exited | grep -v data | awk '{print $1}')
docker rmi $(docker images -f "dangling=true" -q)
</pre>
