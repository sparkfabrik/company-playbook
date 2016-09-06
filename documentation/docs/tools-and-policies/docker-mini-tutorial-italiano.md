Questo tutorial contiene degli esempi per acquisire dimestichezza con i concetti basilari di docker.

## Prerequisiti
E' necessario avere docker installato e funzionante. Se non hai installato docker vedi questo documento...

Una volta installato docker assicurarsi che la variabile di ambiente sia configurata
quindi in .zshrc o .bashrc o .bash_profile nella vostra home directory dovrebbero esserci queste due righe.
```
eval "$(docker-machine env dev)"
export DOCKER_MACHINE_IP=$(docker-machine ip dev)
```

Eseguite questo comando per capire se la variabile è settata:
```
> echo $DOCKER_MACHINE_IP
```

La docker-machine o docker-host (o docker server) è il server sul quale istanziamo i container,
in questo caso è la vm (virtualbox) in locale appena provisionata.

docker-machine è anche un cli che permette di interagire con il docker-host
ovvero avviarlo, etc.

Lancia il comando per vedere le opzioni
```
> docker-machine -h
```

La docker machine appena istallata è chiamata dev, quindi
```
> docker-machine ls
```

Vedrete la vostra docker-machine attiva.

La variabile di ambiente DOCKER_MACHINE_IP così settata permette a docker (il comando client) di capire con quale docker-host interagire

docker è un cli per controllare/eseguire/interagire con i container in esecuzione sul vostro beneamato docker-host

Infatti
```
> docker ps
```
mostra la lista dei container in esecuzione

Non avete container?

Ecco come crearne uno, inanzi tutto scarichiamo una immagine:
```
> docker pull php:7.0.4
```
oppure
```
> docker pull busybox
```

ora avrete una immagine sulla vostra docker machine con le feature richieste

```
> docker images
```

vi da la lista delle immagini presenti sulla vostra docker machine

Le immagini vengono scaricate (per default) dal docker hub, per vedere le immagini disponibili visita il docker hub https://hub.docker.com/

## Esempio base
Ora per esercizio istanziamo (eseguiamo) una immagine, quella di busybox (una micro distribuzione linux).
Con il seguente comando eseguiremo il programma ash (una shell) all’interno di un container

```
> docker run -it --rm busybox ash
```

nel caso non avessimo l’immagine in locale, essa verrà scaricata dal docker hub.
Lanciato il comando precedente, state eseguendo quindi una shell all’interno del container busybox, notare che l’opzione --rm dice di distruggere il container una volta terminata la shell (digitando exit) per ulteriori info sul’uso di docker run vedete qui https://docs.docker.com/engine/reference/run/


## Esempio avanzato (dockerfile)
Facciamo un esempio un po’ più verosimile.

Poniamo che si voglia eseguire uno script php su un server apache, creiamo una cartella demo e spostiamoci al suo interno

```
> mkdir demo
> cd demo
> echo ‘<?php print “<h1>ciao da docker</h1>”; > index.php
```

O meglio editate un file index.php con all’interno
```
<?php print '<h1>ciao da docker</h1>';
```

Ora vogliamo eseguire questo script tramite apache in un container apposito
```
> docker run -d -v $PWD:/var/www/html -p 80 --name myphpapache php:7.0.4-apache
```

che nel dettaglio:
docker run per l’esecuzione del container;
-d detached mode (in background)
-v crea un volume
$PWD:/var/www/html utilizziamo la directory corrente ($PWD) mappandola come /var/www/html nel container
-p 80 espone la porta 80 del container su un porta automaticamente assegnata da Docker.
--name è il nome che diamo al container
php:7.0.4-apache container con apache e php 7

Per vedere i processi di docker
```
> docker ps
```

ora il container di docker è in esecuzione mappato in questo modo

```
0.0.0.0:[MUMERO_PORTA]->80/tcp
```

NUMERO_PORTA viene generato automaticamente nel mio caso è 32768

quindi
```
> open http://$DOCKER_MACHINE_IP:[MUMERO_PORTA]
```
o meglio
```
> open http://$DOCKER_MACHINE_IP:32768
```

eccolo!

Hint: Possiamo anche esplicitare la porta da assegnare sull’host, quindi:
docker run -d -v $PWD:/var/www/html -p 80:80 --name myphpapache php:7.0.4-apache

Come potete vedere in questo caso assegniamo “80:80”, dunque il container risponderà su: http://$DOCKER_MACHINE_IP[:80]

Poniamo ora di voler avviare assieme al server apache anche un server mysql in grado di comunicare con gli script eseguiti nel server apache.

Distruggiamo il precedente container di apache (myphpapache è il nome del container visualizzabile attraverso docker ps)

```
> docker rm -vf myphpapache
```

Per i dettagli su rm https://docs.docker.com/engine/reference/commandline/rm/

Pulliamo l’immagine di un container con mysql 5.6
```
> docker pull mysql:5.6
```

Avviamo il container con mysql (montiamo la directory corrente su /home/data)
```
> docker run --name mydatabase -d -v $PWD:/home/data -e MYSQL_ROOT_PASSWORD=root mysql:5.6
```
Lo vediamo in esecuzione con
```
> docker ps
```

Aggiungiamo un database sul nostro server mysql contenente una tabella con dei dati di esempio, salviamo le seguenti righe nel file test-data.sh
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

Eseguiamo il file con bash all’inteno del container
```
> docker exec -t -i mydatabase /bin/bash -c /home/data/test-data.sh
> chmod a+rx ./test-data.sh
```

Ora abbiamo un mysql con un database e vogliamo istanziare un container con php ed apache in grado di connettersi al container con mysql (attraverso l’opzione --link)

```
> docker run --name myphpapache -d -v $PWD:/var/www/html -p 80 --link mydatabase:mysql php:7.0.4-apache
```

Ora modifichiamo il nostro script php in modo da poter utilizzare il database aggiungendo le seguenti righe

​
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


Nota che per indirizzare il database è sufficiente utilizzare il nome del container specificato dall’opzione link.

Torniamo sul browser e colleghiamoci al nostro container con apache, 32768 è la mia porta
```
> open http://$DOCKER_MACHINE_IP:32768
```

Accidenti! Abbiamo un errore!!!!!!

```
“could not find driver”
```

l’ estensione php per mysql non è presente sul container, questo perchè l’immagine di php espone solo i servizi essenziali e non ha le estensioni PDO compilate.

Abbiamo bisogno di una immagine che possieda tale estensione,
creiamo quindi una nostra immagine che estenda quella di php ed apache ma con in più delle configurazioni a noi utili.


Facciamo questo creando un nuovo dockerfile con il seguente contenuto
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
