This tutorial contains examples to become familiar with _docker_'s basics.

## Requirements

Well, you must have docker up and running on your PC.  
Follow the guide at [Configure local environment](/recipes/configure-local-environment) if you are still out of luck.

> **NOTE**: Mind that if you are on MacOSX, you must make sure that the `DOCKER_MACHINE_IP` environment variable is configured on your host system

Check for the following two lines:

```
eval "$(docker-machine env dev)"
export DOCKER_MACHINE_IP=$(docker-machine ip dev)
```

to be found in `.zshrc`, `.bashrc` or `.bash_profile` (depending on what shell you are using).  
To check if for the variable to be set, issue the following command in a terminal:

```
echo $DOCKER_MACHINE_IP
```

The _docker-machine_ (aka _docker-host_ or _docker server_) is the server on which we'll start our containers. MacOSX's kernel is unable to provide the container technology docker relies on (which is built-in on Linux kernel), so in the guide linked above, we provisioned a virtual machine with VirtualBox, running a Linux distro.

If you have 

## The _docker-machine_ command

`docker-machine` is also a command-line tool able to interact with the docker-host (the vm), so that we can control it by remote. Sorry for the confusion: you can easily tell the meaning of the term "docker-machine" (command or vm) by the context.

Run this command to see the options of `docker-machine` tool:

```
docker-machine -h
```

The docker-host we just provisioned is called `dev`, so issuing

```
docker-machine ls
```

you should find you `dev` docker-machine up and running.

In the best Unix tradition, the `ls` command lists all available and running docker-hosts.  
The DOCKER_MACHINE_IP environment variable provides thus an host that the `docker` command (not `docker-machine command!) will use as default target for all commands we'll give.


## The _docker_ command

`docker` is a command-line client for the _docker-engine_, the service which manage the containers on a docker-enabled maching.  
You'll use it to control, interact with and inspect all containers running of your beloved docker-host.

Starting with the basics, let's learn which containers we have started:

```
docker ps
```

as the Unix _ps_ command shows all running processes, this command lists all running containers on the target machine. Mind the "running" keyword: a container is often identified by the process in it. Stop the process and the container will result stopped.

But wait: you have no running containers? Here is how to create and run one.

First of all let's download a container image:

```
docker pull php:7.0.4
```

or maybe you don't like PHP?

```
docker pull busybox
```

What is happening here is that you are asking Docker to download an image (much like one of those you can use in a virtual machine or an ISO file) on your machine.  
From where are those images coming? If not otherwise instructed, Docker will search for those images on the DockerHub (https://hub.docker.com), a huge online public repository similar to what GitHub is for code.

> **Spoiler**: you can have private images on DockerHub attending a payment plan. 

Now you docker-host (remember it is your OS if you are running Linux natively) has the container image in its portfolio. Let's check listing for all locally available images:

```
docker images
```

You can visit the DockerHub to find all available public images. There are a ton of them to choose from and to kickstart your own image (read along).

## Containers - a basic example

As an exercise we'll now create and run an image. We'll use the official `busybox` one. Busybox is a tiny Linux distribution.  
Issuing the following command we'll run a process inside a container:

```
docker run -it --rm busybox ash
```

Let's dissect this command to understand what's going on:

1. `docker`: we are invoking the Docker client (pretty dull, ok)
1. `run`: this is a command to the docker-engine. We are asking to run a process to be found in an image. This translates into "running a container", since docker will instantiate a container in which to run a process and use a given image for that container. This also means that if you stop that process in the container the container itself will "stop": it will still exists but nothing will be running in it.
1. `-it`: these parameters can be a bit tricky, but basically means: assign a TTY to the container and make me able to interact with the container by my console (more here: https://docs.docker.com/engine/tutorials/dockerizing/#/run-an-interactive-container). So far let's state that if you want to run a process that will run in background you won't need this.
1. `--rm`: this parameters make docker remove the container filesystem from the host when the container is stopped (good for an example so the garbage won't take space from the host - more at https://docs.docker.com/engine/reference/run/#clean-up-rm)
1. `busybox` is the image from which the container is created (we downloaded it earlier but if not docker will download it for you)
1. `ash` is the process to start inside the container. It should obviously be available in the image or docker won't be able to start it. In this case _ash_ is a simple shell

Running the command you will end up executing a shell inside your busybox-based container.  
If you stop the shell process (issuing `exit` or ctrl-D), the filesystem for that container will be destroyed, so don't write your next fiction blockbuster in it! :D

Look here https://docs.docker.com/engine/reference/run/ for a complete overview of the `run` command.

## Containers - a more advanced example

OK, executing a shell in a volatile container is not something that makes us drool. Let's try something more juicy.

Say that we want to test our next killer PHP script (which surely greet the world from inside a container), and we don't want to bother installing apache and PHP on our host.  
Create a `demo` folder and your script in it:

```
mkdir demo
cd demo
echo ‘<?php print “Hello from a docker container, world!”;' > index.php      ## we kept this short, you can use your editor for a more complex test
```

Now we want a php-powered apache instance to be available to test our code. Instead of installing the whole stack, let's try this (from inside the demo folder of course):

```
docker run -d -v $PWD:/var/www/html -p 80 --name myphpapache php:7.0.4-apache
```

Another walkthrough:

1. `docker run`: execute a process in the container
1. `-d`: stays for "detached mode", which is a fancy way to say "in background". You can read this as the opposite of `-it` that we saw before
1. `-v`: creaite a volume in the container, which mounts,,,
1. `$PWD:/var/www/html`: ...this directory! `$PWD` is the current directory we are while issuing the command: we'll mount it in the container in the volume at the position `/var/www/html`. Let's make it even simpler: what's inside the directory you are while issuing the command will be available "live" in the container at `/var/www/html`, so if you change your script in your host it will be changed in the container also!
1. `-p 80`: expose the TCP/UDP port 80 in the container on the "public" network interface automatically assigned by docker to the new container. Again, let's state it clear: the new container will have an assigned IP, say 172.17.0.15. If you connect to an external port on this IP, any service in the container bound to the port 80 will reply. Which port? Read on.
1. `--name myphpapache`: we are naming our container so we can refer to it with a mnemonic label instead that an awful string like `abfe13e3f12da122cc212`
1. `php:7.0.4-apache`: the image we want the container to be based upon: in this case an installation of Apache with PHP7 support

> Notice that in the previous example we specified a command to run in the image (ash in that case). This has not been the case in this example? Why?  
  To make it easy, when you build an image you can specify an "entry point" that is a command to run as default when a new container is created and run by that image. `php:7.0.4-apache` official image has been built so that executing the container automatically runs apache and all necessary modules.   
  This is a common pattern in the Docker industry, since Docker is often used to package and distribute application with all necessary dependencies to fulfill a specific purpose: in this case provide a php web stack with no fuss!

So we should now see our apache process running in a docker container:

```
> docker ps
```

In the list of running containers we'll see something like this in the row of `myphpapache`

```
0.0.0.0:<PORT NUMBER>->80/tcp
```

`<PORT NUMBER>` is automatically generated when you use the `-p` option. Let's say it's 32768.

so

```
open http://$DOCKER_MACHINE_IP:<PORT NUMBER>
```

or say

```
open http://$DOCKER_MACHINE_IP:32768
```

**Hurray!!! :)**

OK, this sucks! We don't want to chase the port every time we start the container, so let's specify which public port to expose the internal port onto:

```
docker run -d -v $PWD:/var/www/html -p 80:80 --name myphpapache php:7.0.4-apache
```

Can you spot the difference? In this case we are using `80:80` as value for the `-p` parameter, so that we'll be able to reach apache in our container querying `http://$DOCKER_MACHINE_IP:80`.  
Mind that the first number is the public port and the second is the internal port, so `-p 90:80` will expose the interal apache port on external port 90.

## Containers - Network of containers

What's a PHP script worth without a database to query?  
We now want to start a MySQL database alongside Apache, so that our PHP script can connect to the database and rock a lot.

Let's destroy the former Apache container (named myphpapache, as we can tell issuing `docker ps`):

```
docker rm -vf myphpapache
```

Again, here is the command dissection:

* `rm`: remove a container (*spoiler*: to remove an image instead the command is `mri`, but don't do it now)
* `-vf`: 
* `myphpapache`: is the name we gave to the container (*spoiler*: you can refer to the container by its container-id also. Find it with `docker ps`, beginning of the line)

> For further details on `rm` command visit: https://docs.docker.com/engine/reference/commandline/rm/

OK, we made clean! Now pull a proper MySQL container image from the docker hub:

```
docker pull mysql:5.6
```

start the container mounting a local folder as a volume as we already did before, so that database data are outside the container (they will persist if the container is destroyed):

```
docker run --name mydatabase -d -v $PWD:/home/data -e MYSQL_ROOT_PASSWORD=root mysql:5.6
```

> Note that we mounted the local directory to `/home/data`: to learn where the internal process expects config files, data, etc you must refer to the documentation of the image itself! There is no a magic catchall solution or standard!

Check MySQL is running with

```
docker ps
```

OK, the server is there!

No we want some data, so we'll add a database into our fresh server, creating a table with dummy data in it.  
To do so, let's save the following in a file named `test_data.sh` (which is a shell script).

```
#!/bin/sh
mysql -uroot -proot << END
create database IF NOT EXISTS dockertest;
use dockertest;
CREATE TABLE IF NOT EXISTS test_table (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO test_table (title) VALUES ('titolone 1');
END
```

This, when executed into the container, will use the MySQL command line client to fire a query that does the job.

Execute this bash script invoking bash inside the container:

```
docker exec -it mydatabase /bin/bash -c /home/data/test-data.sh
chmod a+rx ./test-data.sh
```

Look what we have done here:

* `docker exec`: exectues a command in a container
* `-it mydatabase`: do it interactively in the running container named `mydatabase`
* `/bin/bash -c /home/data/test-data.sh`: this is the command to execute, which basically is "run an instance of the bash shell, which reads the commands found in the file `/home/data/test-data.sh`"

> *Note*: This is interesting: since we mounted `$PWD` - which is the directory we are into - as a volume in `/home/data` inside the container, our script is "already there". Nice uh?

Now we have a MySQL database. The server is running in a container and the data are kept separated, in the local folder on the host system. Great!  
Next step: we need an apache+php container able to connect to MySQL. We'll do this starting a new container like we already did, with the `--link` option.
 
```
docker run --name myphpapache -d -v $PWD:/var/www/html -p 80:80 --link mydatabase:mysql php:7.0.4-apache
```

Can you spot the `--link mydatabase:mysql` part? Here is where we are instructing docker to configure the inner network stack of the two containers to create a functional routing, so they can exchange information over TCP/IP.

But what the `:mysql` part means? It's an hostname that will automatically be available in the Apache container to resolve the MySQL container. Pure awesomeness!

Now we can edit our previous script to make it more interesting (let's fake interest for this stuff at least!):

```
try {
  $dbh = new PDO("mysql:host=mysql;dbname=dockertest", 'root', 'root');
  $sql = 'SELECT * FROM test_table';
  print '<pre>';
  foreach ($dbh->query($sql) as $row) {
    print_r($row);
  }
  print '</pre>';
}
catch(PDOException $e) {
    echo $e->getMessage();
}
```

> *Note*: can you see that we just mentioned the MySQL container hostname specified in the `--link` option? Yay!

Reach back to our browser and visit our container URL

```
> open http://$DOCKER_MACHINE_IP
```

Nah! We got an error! :/

```
could not find driver
```

php-mysql extension is not in the container! This is true since the php image in the Docker Hub only contains essential modules and has no PDO extensions in it.  
We need an image with such and extension!i Instead of hunting for it in the Docker Hub, why not building one by ourselves? We'll extend the default one with more useful options.

## Images - How to build one

To build a custom image, we have to describe to docker what we want inside it. To achieve this it suffice we create a file with a list of directives. It will act as a recipe that docker can follow to bake a delicious cookie.

This file is called `Dockerfile` 
```
FROM php:7.0.4-apache
RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo pdo_mysql
```
Ora distruggiamo il vecchio container
```
> docker rm -vf myphpapache
```
buildiamo la nuova immagine utilizzando il dockerfile appena creato
```
> docker build -t spark/php .
```
Dove
-t permette di assegnare il nome all’immagine
spark/php è il nome dell’immagine da noi creata

Per maggiori info sul comando build: https://docs.docker.com/engine/reference/commandline/build/


vediamo la lista delle immagini locali tra le quali la nostra nuova immagine spark/php
```
> docker images
```

Per maggiori info sul comando images:
https://docs.docker.com/engine/reference/commandline/images/

eseguiamo il container apache partendo dall’immagine appena creata
```
> docker run --name myphpapache -d -v $PWD:/var/www/html -p 80 --link mydatabase:mysql spark/php
```
vediamo su che porta sta:
```
> docker ps
```
Torniamo sul browser, la mia porta è la 32770
```
> open http://$DOCKER_MACHINE_IP:32770
```
e voilà!!!!

Potete fare pulizia eliminando i container
```
>  docker rm -vf myphpapache
>  docker rm -vf mydatabase
```

## Docker compose
Per configurare una infrastruttura anche minimale come quella appena vista possiamo utilizzare uno strumento in grado di accentrare la configurazione e la gestione di insiemi di container, docker-compose, appunto.

Nella cartella demo create un file docker-compose.yml con il seguente contenuto:
```
data:
  image: busybox
  volumes:
    - ./:/home/data
    - ./:/var/www/html
apache:
  build: .
  dockerfile: Dockerfile
  environment:
    - DNSDOCK_ALIAS=myphpapache.docker.sparkfabrik.loc
  volumes_from:
    - data
  links:
    - mysql
mysql:
  image: mysql:5.6
  environment:
    - MYSQL_ROOT_PASSWORD=root
    - DNSDOCK_ALIAS=mydatabase.docker.sparkfabrik.loc
  volumes_from:
    - data
```
Lanciando
```
> docker-compose up
```
oppure
```
> docker-compose up -d
```
Per avviare l’esecuzione in background.

La nostra infrastruttura viene istanziata nel modo in cui abbiamo fatto nei passi precedenti.
Si noti che con DNSDOCK_ALIAS è possibile istruire il container dnsdock a mappare il container su un nome di dominio arbitrario, evitando il dover leggere e modificare ogni volta la porta.
```
> open http://myphpapache.docker.sparkfabrik.loc/
```
Per maggiori info su docker compose
https://docs.docker.com/compose/

L’unica cosa mancante è l’esecuzione di /home/data/test-data.sh
dopo l’avvio del database server. Questo può essere inserito in un apposito Dockerfile
per il container del database.

Interrompiamo l’esecuzione dei container con CTRL-C oppure lanciando un
```
> docker-compose down
```
In caso abbiamo lanciato il comando con l’opzione -d

Rinominiamo per convenienza il Dockerfile di apache in Dockerfile.apache e creiamo un nuovo file Dockerfile.mysql. Il contenuto di questo file sarà:
```
FROM mysql:5.6
COPY test-data.sql /docker-entrypoint-initdb.d/test-data.sql
```

il file test-data.sql conterrà:
```
create database IF NOT EXISTS dockertest;
use dockertest;
CREATE TABLE IF NOT EXISTS test_table (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO test_table (title) VALUES ('titolone 1');
INSERT INTO test_table (title) VALUES ('titolone 2');
```

Modifichiamo il docker-compose.yml in accordo a queste modifiche:
```
data:
  image: busybox
  volumes:
    - ./:/home/data
    - ./:/var/www/html
apache:
  build: .
  dockerfile: Dockerfile.apache
  environment:
    - DNSDOCK_ALIAS=myphpapache.docker.sparkfabrik.loc
  volumes_from:
    - data
  links:
    - mysql
mysql:
  build: .
  dockerfile: Dockerfile.mysql
  environment:
    - MYSQL_ROOT_PASSWORD=root
    - MYSQL_DATABASE=dockertest
    - DNSDOCK_ALIAS=mydatabase.docker.sparkfabrik.loc
  volumes_from:
    - data
```
E lanciamo nuovamente
```
> docker-compose up
```
oppure
```
> docker-compose up -d
```
Per avviare l’esecuzione in background.

Andiamo di browser!
```
> open http://myphpapache.docker.sparkfabrik.loc/
```
Se per qualche motivo su osx non riuscite a risolvere questi nomi andate giù pesante con
```
> sudo dscacheutil -flushcache
> sudo killall -HUP mDNSResponder
```
