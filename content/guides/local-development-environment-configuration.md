## Operating systems

This guide is available for [MacOS](#macosx) and [Ubuntu](#ubuntu-linux).

To provision your system just head here: https://github.com/sparkfabrik/sparkdock and follow the instructions.

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

The last ingredient consists in a local resolver able to inform the system to proxy the calls for a given TLD (`.loc` in our case) to `dnsdock` or by using an http proxy currently implemented with `dinghy-http-proxy`.

## Why do we have dnsdock and dinghy-http-proxy ?

Let me start by linking the projects:

* https://github.com/aacebedo/dnsdock
* https://github.com/sparkfabrik/dinghy-http-proxy

Both projects are used by our internal docker-compose projects and they basically are in place
to provide a direct connection from your localhost to containers just by using a `.loc` tld domain.
*It is important to remember* that all `.loc` domains are taken in charge from the dns resolvers, not just `sparkfabrik.loc`.

The big difference here is that `dnsdock` can be easily used on Linux because your host can access docker containers network (eg: you can access a container by using its ip) but the same is not achievable on MacOS or Windows WSL because the networks are implemented in a very different way and between you and the containers exists a Linux VM.

Dinghy http proxy instead try to resolve the problem from a different perspective, proxying the http requests to the containers and giving back the response, by exposing the ports 80/443 on your host + an UDP port to resolve DNS queries.

You can see how they work watching the following swimlanes.

### DNSDOCK

DNSDock to know which containers it shuold manage it inspects a label or env variable exposed
by containers, specifically:

```
environment:
  - DNSDOCK_ALIAS:

labels:
  com.dnsdock.alias:
```

The ENV variable is going to be deprecated soon, so *just use* the labels.

#### Swimlane

![DNSDOCK Swimlane](%image_url%/guides/swimlane-dnsdock.png)

```
title: Dnsdock

User -> System DNS: Access to "website.sparkfabrik.loc"

DNS -> Dnsdock: Dns query

Dnsdock -->> System DNS: _Found it: 172.12.4.13_

DNS -> User: website.sparkfabrik.loc 172.12.4.13_

User -> Container 172.12.4.13: GET /
```

### Dinghy http proxy

Dinghy http proxy to know which containers it shuold manage it inspects an env variable exposed
by containers, specifically:

```
environment:
  - VIRTUAL_HOST:
```

#### Swimlane

![DNSDOCK Swimlane](%image_url%/guides/swimlane-dinghy-http-proxy.png)

```
title: Dinghy http proxy

User -> System DNS: Access to "website.sparkfabrik.loc"

System DNS -> Dinghy http proxy: Dns query for ".loc" domains

Dinghy http proxy -->> System DNS: _Found it: 127.0.0.1

note:

Dinghy http proxy exposes two services:

1. DNS on port 19322:19322
2. HTTP on ports 80:80 - 443:443

It always returns 127.0.0.1 for all domains.

User -> Dinghy http proxy: Connect to "127.0.0.1" host "website.sparkfabrik.loc"

Dinghy http proxy -> Container: GET /

Container -> Dinghy http proxy: Response

Dinghy http proxy -> User: Response
```

***

## Run dnsdock or dinghy http proxy

If you need to re-run `dnsdock` or `dinghy-http-proxy` for some reasons (maybe you have delete the pods),
you can rely on sparkdock scripts:

1. Linux
  1. `run-dnsdock`: https://github.com/sparkfabrik/sparkdock/blob/master/config/ubuntu/bin/run-dnsdock
  2. `run-dinghy-proxy`: https://github.com/sparkfabrik/sparkdock/blob/master/config/ubuntu/bin/run-dinghy-proxy
2. MacOS:
  1. `run-dinghy-proxy`: https://github.com/sparkfabrik/sparkdock/blob/master/config/macosx/bin/run-dinghy-proxy

You should have it in your system, but in case of missing:

**Ubuntu**

```bash
curl -slo /usr/local/bin/run-dnsdock https://raw.githubusercontent.com/sparkfabrik/sparkdock/master/config/ubuntu/bin/run-dnsdock
curl -slo /usr/local/bin/run-dinghy-proxy https://raw.githubusercontent.com/sparkfabrik/sparkdock/master/config/ubuntu/bin/run-dinghy-proxy
chmod +x /usr/local/bin/run-dnsdock
chmod +x /usr/local/bin/run-dinghy-proxy
```

**MacOS**

```bash
curl -slo /usr/local/bin/run-dinghy-proxy https://raw.githubusercontent.com/sparkfabrik/sparkdock/master/config/macosx/bin/run-dinghy-proxy
chmod +x /usr/local/bin/run-dinghy-proxy
```

### Log into GCloud

To build our projects you'll need access to GCP image registry to start with, so you need to login with your SparkFabrik account.

Run the following commands in the order:

```bash
gcloud auth login
gcloud auth application-default login
gcloud auth configure-docker
```

Running the first couple commands, your browser will open, asking for authorization to access your account. If you have more than one Google/GMail account configured you'll have to explicitely choose the `sparkfabrik.com` one.

Once you run all three commands above, you're done.

### Test and enjoy

To test everything is working as expected, we'll try to run a service in a container, exposing it through a local URL.

#### DNSDock

```bash
❯ docker run -d -e DNSDOCK_ALIAS=test.sparkfabrik.loc nginx:alpine

❯ curl test.sparkfabrik.loc | grep -i nginx

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   615  100   615    0     0  36518      0 --:--:-- --:--:-- --:--:-- 55909
<title>Welcome to nginx!</title>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
<a href="http://nginx.org/">nginx.org</a>.<br/>
<a href="http://nginx.com/">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>

```

#### Dinghy http proxy

```bash
❯ docker run -d -e DNSDOCK_ALIAS=test.sparkfabrik.loc nginx:alpine

❯ curl test.sparkfabrik.loc | grep -i nginx

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   615  100   615    0     0  36518      0 --:--:-- --:--:-- --:--:-- 55909
<title>Welcome to nginx!</title>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
<a href="http://nginx.org/">nginx.org</a>.<br/>
<a href="http://nginx.com/">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>
```
