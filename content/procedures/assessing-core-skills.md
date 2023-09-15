During the onboarding of a new employee, a buddy or team leader is called to assess the new entry's proficiency level with a set of technical skills that apply to all technical projects.

The required level of proficiency vary depending on the seniority and job position, but a minimum degree of literacy is required, as explained [here](/working-at-sparkfabrik/core-skills).

To ease the process, we hereby provide guidelines for each [core skill](/working-at-sparkfabrik/core-skills) set.

## Command line / Shell

### Basics

Software Developers should have a basic understanding of:

* Files and folder management:
  * **Navigation**: `ls`, `cd`, glob patterns
  * **Search**: `find`, `which`
  * **File management**: `cat`, `less`/`more`, `head`/`tail`, `touch`
  * **Permissions**: `chmod` and `chown`, permissions sets, file attributes
* **Shell configuration**: `.profile`/`.zprofile`, ``.bashrc`/`.zshrc`, environment variables, path and command scope, etc
* **Redirection**: `stdout`, `stderr`, reading, writing, overwriting, appending to streams
* **Make/Makefile**: targets, dependencies, recipes, rules

Senior Software Developers and Cloud Native Engineers should be confident with the above, plus having a decent understanding of:

* **Scripting**: Variables, arguments, cycles, conditions, functions, echoing
* **Text processing**: `grep`, `sed`, `awk`

### Networking

Software Developers should have a basic understanding of:

* Interfaces and ports, what's `localhost`, how domain names resolution works, HTTP basics, how HTTPS works.

Senior Software Developers and Cloud Native Engineers should have a clear understanding about:

* TCP/UDP-IP protocol, the concept of application-level protocols, DNS configuration basics (authoritative zone, record types, TTL and propagation), local domains resolution.


### Security

Software Developers should have a basic understanding of:

* Asymmetric cryptography, SSH, authentication, signatures
* Best-practices for secrets-management in software repo (environment variables and `.env` files, `.gitignore`, `.dockerignore`)
* Security monitoring tools: CVE, GitHub advisory database, Dependabot / Renovate

Senior Software Developers and Cloud Native Engineers should have a clear understanding about:

* GPG, difference between authentication and authorization, OAuth framework, hashing
* Best-practices for the development of secure software

### Git

Everyone should have a basic understanding of:

* **Basic usage**: status, staging, commit, tag, reset, history / log, branch, remotes, merge, rebase, cherry picking, push, pull
* **Concepts**: what's a repository, the working tree, the `.gitignore` file, how to diff and move along the commit history
* **Workflow**: different branching models (git-flow, GitHub or Gitlab flow), pull/merge request, peer review, squashing commits, rebase and merge, merge commits, linear history
* **Conventions**: understand the relation between workflow-related conventions (commit granularity, versioning, commit messages format, branching model, etc) and the working context (social contracts, environments, cadences, etc)


## DevOps

### Docker and docker-compose

* **Concepts**: Docker daemon and client, images, tags, digest, containers, volumes, registries and DockerHub

* **Basic commands**: pull, push, run, stop, ls, rm, ps, prune
* **Dockerfiles**: levels, caching, basic commands (FROM, COPY, ADD, RUN, ENTRYPOINT, CMD, ENV, ARG), multi stage builds
* **Docker-Compose**: 
  * Understanding declarative approach
  * Anatomy of the `docker-compose.yml` file (services, build, volumes, ports, etc)
  * How networking and hostname resolution works between docker-composed containers
  * Basic commands (up, down, logs) and detachment

### Kubernetes

* **Concepts**: multi-services architectures, orchestration, telemetry and monitoring, 12-Factors applications
* **Building blocks**: clusters, nodes, deployments, pods, services, storage, networking

### YAML

* Basic knowledge of the use-cases and syntax
* Knowledge of features like comments or references

## Continuous Integration / Continuous Delivery

* **Concepts**: what does integration and deploy mean, what does continuously integrating means and why it's important, the relation between integration and tests
* **Building blocks**: Git, remotes, the different types of tests (unit, integration, functional, end-to-end), builds, deploys
* **Common environments**: `development` (integration), `stage`, and `production`
* **Delivery automation**: GitLab Pipelines and GitHub Actions
