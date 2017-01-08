## Use docker-compose to control containers set up for a specific project

Docker compose reference: https://docs.docker.com/compose/overview/

docker-compose allows to control and "orchestrate" multiple containers that need to work together as the infrastructure for a web appplication.
Usually, the definitions for the containers are stored in a docker-compose.yml file located in the root of the project.

### Useful commands

1. See active containers: `docker-compose ps`
1. See logs of a container:  `docker-compose logs [container-name-as-specified-in-the-docker-compose-file]`
1. Stop containers `docker-compose stop`
1. Delete *all* containers defined in the YAML file from disk (be careful this is destructive): `docker-compose rm -vf`
1. Get a shell from a running container: `docker exec -it [container_name] bash` where _container_name_ is the name of the container as written in the first column of `docker-compose ps` output

As the "docker-compose.yml" file is not versioned, it can be customized according to our need.

## Execute a build

The application builds in this Docker-based dev environment run completely inside the containers, since the full stack is built into them.
In order to automate and simplify the construction of the environment and the execution of builds, we use GNU Make as a task launcher, while the application itself is built inside the containers. Typically, a build is started with a simple command executed in the project's root, where the Makefile resides, like

```
make ENV=loc
```

If you, control/performance freak, want to keep an eye on build timing, just use time: `time make ENV=loc`,
You can get some information about this system typing `make help`

## How to connect to services provided by containers

The availability of services (e.g. a webserver, a database server) hosted in the containers is provided through a special DNS service called dnsdock.
In the docker-compose definitions, an environment variable is set (DNSDOCK_ALIAS ) for each container, and it declares which hostnames should be reachable through that DNS service.
Don't forget that services might be defined also using non-standard connection ports, so that should be taken into account when trying to connect to services through a browser or some other clients.

### Connection to services in a VM-based environment

Case: you are using a Mac, you have your development containers running in the "dev" Docker Machine (VM) and reachable from your machine, but you also wanto them to be reachable from a Microsoft browser running in another VM

* edit docker-compose.yml
* add these lines for the drupal service:
```
ports:
  - "80:80"
```
* execute `docker-compose up -d`
* edit the host file in the virtualized Windows system and add entries for the application domain(s): you should use the "internal" IP used by docker/dnsdock, not the one identifying the VM host
  * command to detect host IP from the host machine: `dig @127.0.0.1 a +short [host_name]`
* make sure that your local webserver (the one running natively in Mac OS X) is stopped

## Debugging with xdebug

By default, xdebug is disabled inside the Drupal container. In order to enable/disable it, a couple of scripts are provided in the application codebase:
* `bin/enable-xdebug`
* `bin/disable-xdebug`

If you use Vim + Vdebug for editing/debugging, you must also set a Vdebug option to map the container's filesystem to your local filesystem:
```
let g:vdebug_options = {
    \ "path_maps": {"/var/www/html": "/Users/marcello/Development/sparkfabrik/project"}}
```

If you use SublimeText check here: https://github.com/martomo/SublimeTextXdebug *path_mapping* configuration.

## Profiling with Blackfire.io

In order to use Blackfire.io for profiling applications residing in containers, these environment variables must be set:

```
export BLACKFIRE_SERVER_TOKEN=YOUR_SERVER_TOKEN
export BLACKFIRE_SERVER_ID=YOUR_SERVER_ID
```

If the container was already running, restart them like this:

```
docker-compose stop
docker-compose up -d
```

## Backup of data container

### Backup

Full backup of data container: ```make backup-data ENV=loc```

You can also pass the VOLUMES arguments in order to restrict the scope, for example:

```
make backup-data ENV=loc VOLUMES=/var/lib/mysql
```

Please note that the volumes are them specified on  "docker-common-services.yml":

```
data:
  image: busybox
  volumes:
    - /var/lib/mysql
    - /opt/solr/example/multicore/multi/data
    - /var/www/html/sites/default/files
```

### Import

To import a data container backup tarball, use the following command:

```
make import-data ENV=loc FILE=backup-filename.tar,bz2
```

The file must be placed within the project root to make it recognized correctly.


## Executing commands inside the containers

You might want to execute commands from a shell inside the containers, in order to do so, an interactive shell must be opened on the desired container, then you can have access to commands like drush, or other CLI utilities.
We've set up a wrapper that allows a concise syntax for executing commands in container: `bin/e` (in the root of the "dockerized" project)
The bin/e command refers to the codebase root as a base path.

To make life even more easy, some aliases for `bin/e` commands have been created. The aliases can be generated with `config/scripts/gen-aliases.sh` (a .dist/template file ) which can then be "sourced":
- Aliases generation: config/scripts/gen-aliases.sh
- Import new aliases without having to log-in again `source .aliases`

## New php syntax checking tools

The tools to control coding standards AND also make some automatic fix about that,
The most important thing when installing the requisites for the local environment is to download the git hooks used for validating the software. you can do it with a simple step:

```
./init-git-hooks.sh
```

In order to run automatic syntax checking and fixing, some aliases have been defined:
* `cs` checks coding standards compliance
* `fix-cs` fixes some coding standard issues

## Managing possible excessive volume growth of the docker infrastructure

### OSX

```
docker-machine ssh dev
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /mnt/sda1/var/lib/docker:/var/lib/docker --rm paolomainardi/docker-cleanup-volumes --ver
bose —dry-run
```

### Linux

```
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker --rm paolomainardi/docker-cleanup-volumes --ver
bose —dry-run
```

### Other commands useful when you're low on disk space

```
docker volume rm $(docker volume ls -f dangling=true | awk '{print $2}')
docker rm -vf $(docker ps -a | grep Exited | grep -v data | awk '{print $1}')
docker rmi $(docker images -f "dangling=true" -q)
```
