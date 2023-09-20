During the onboarding of a new employee, a buddy or team leader is called to assess the new entry's proficiency level with a set of technical skills that apply to all technical projects.

The required level of proficiency vary depending on the seniority and job position, but a minimum degree of literacy is required, as explained [here](/working-at-sparkfabrik/core-skills).

To ease the process, the [list of core skills](/working-at-sparkfabrik/core-skills#technical-core-skills), the [related training resources](/resources/training-resources#core-skills-training-resources) and the following assessment suggestions, are all separated into _modules_ (like _Networking_, _Security_, _Docker and Docker Compose_). Such modules are grouped in three main areas: _Basics_, _Tools_ and _DevOps_.

The procedure is easy:

* Use the guidelines and checklists below to assess the necessary skill level.
* If the degree of confidence is low (most of the checklist elements are unknown or uncertain), the whole module is worth studying from scratch. If most of the topics are known and just a few ancillary are missing (ex. the assessee never used `sed` and `awk` but for the rest she's confident with a Unix shell), than the module may be skipped.
* Take a list of the modules that have to be studied.
* Head to the [Plan the training on Core Skills](#plan-the-training-on-core-skills) section below to schedule the training.

## Assess Core Skills proficiency

Follow this section, module by module.

### Basics

#### Command line / Shell

Software Developers should have a basic understanding of:

* Files and folder management:
  * **Navigation**: `ls`, `cd`, glob patterns
  * **Search**: `find`, `which`
  * **File management**: `cat`, `less`/`more`, `head`/`tail`, `touch`
  * **Permissions**: `chmod` and `chown`, permissions sets, file attributes
* **Shell configuration**: `.profile`/`.zprofile`, `.bashrc`/`.zshrc`, environment variables, path and command scope, etc
* **Redirection**: `stdout`, `stderr`, reading, writing, overwriting, appending to streams
* **Make/Makefile**: targets, dependencies, recipes, rules

Senior Software Developers and Cloud Native Engineers should be confident with the above, plus having a decent understanding of:

* **Scripting**: Variables, arguments, cycles, conditions, functions, echoing
* **Text processing**: `grep`, `sed`, `awk`

#### Security

Software Developers should have a basic understanding of:

* Asymmetric cryptography, SSH, authentication, signatures
* Best-practices for secrets-management in software repo (environment variables and `.env` files, `.gitignore`, `.dockerignore`)
* Security monitoring tools: CVE, GitHub advisory database, Dependabot / Renovate

Senior Software Developers and Cloud Native Engineers should have a clear understanding about:

* GPG, difference between authentication and authorization, OAuth framework, hashing
* Best-practices for the development of secure software

#### Networking

Software Developers should have a basic understanding of:

* Interfaces and ports, what's `localhost`, how domain names resolution works, HTTP basics, how HTTPS works.

Senior Software Developers and Cloud Native Engineers should have a clear understanding about:

* TCP/UDP-IP protocol, the concept of application-level protocols, DNS configuration basics (authoritative zone, record types, TTL and propagation), local domains resolution.

### Tools

#### YAML

Everyone should have a basic understanding of:

* Basic knowledge of the use-cases and syntax
* Knowledge of features like comments or references

#### Git

Everyone should have a basic understanding of:

* **Basic usage**: status, staging, commit, tag, reset, history / log, branch, remotes, merge, rebase, cherry picking, push, pull
* **Concepts**: what's a repository, the working tree, the `.gitignore` file, how to diff and move along the commit history
* **Workflow**: different branching models (git-flow, GitHub or Gitlab flow), pull/merge request, peer review, squashing commits, rebase and merge, merge commits, linear history
* **Conventions**: understand the relation between workflow-related conventions (commit granularity, versioning, commit messages format, branching model, etc) and the working context (social contracts, environments, cadences, etc)

#### GitHub Copilot

That's a "bonus track". Developers are the most impacted by the usage of Copilot, so just ask if they know what it is and if they every tried it.

### DevOps

#### Docker and docker-compose

Software Developers should have a basic understanding of:

* **Concepts**: Docker daemon and client, general anatomy of a Dockerfile, images, tags, digest, containers, volumes, registries, and what is DockerHub
* **Basic commands**: pull, push, run, stop, ls, rm, ps, prune
* **Docker-Compose**: 
  * Understanding declarative approach
  * Anatomy of the `docker-compose.yml` file (services, build, volumes, ports, etc)
  * Basic commands (up, down, logs) and detachment

Senior Software Developers and Cloud Native Engineers should be confident with the above, plus having a more specific understanding of:

* **Dockerfiles**: levels, caching, basic commands (FROM, COPY, ADD, RUN, ENTRYPOINT, CMD, ENV, ARG), multi stage builds
* **Docker-Compose**: 
  * How networking and hostname resolution works between docker-composed containers

#### Kubernetes

Everyone should have a basic understanding of:

* **Concepts**: multi-services architectures, orchestration, telemetry and monitoring, 12-Factors applications
* **Building blocks**: clusters, nodes, deployments, pods, services, storage, networking

#### CI/CD

Everyone should have a basic understanding of:

* **Concepts**: what does integration and deploy mean, what does continuously integrating means and why it's important, the relation between integration and tests
* **Building blocks**: Git, remotes, the different types of tests (unit, integration, functional, end-to-end), builds, deploys
* **Common environments**: `development` (integration), `stage`, and `production`
* **Delivery automation**: GitLab Pipelines and GitHub Actions

## Plan the training on Core Skills

### Laying out contents

Depending on the findings of the assessment phase (described above), **a maximum of 40 working hours** will be allocated **within the first two two months** for the new employee to learn the key-concepts.


To layout and schedule the plan, the [Core Skills training resources](/resources/training-resources#core-skills-training-resources) section also lists the apporximate time each module takes to be completed.

The whole set of training resources available for the Core Skills, sums up to almost 90 hours of potential study and practice, with topics like the shell, Git and Kubernetes taking the lion's share. Hands-on are often the more time consuming, but they may be the most effective too. Pick the stuff that sounds more reasonable, or limit the hands on to the parts that are most relevant to the project <sup><a href="#fn1">1</a></sup>.

If the emerging plan adds up to more than 40 hours, consider the following priority lists, depending on the job position:

* **Web developers**: Command line / Shell, Git, Docker and Docker Compose, Security (excepted the hands-on), YAML, CI/CD (excepted the hands-on), Kubernetes (except the hands-on).
* **Mobile developers**: Command line / Shell, Git, YAML, CI/CD (excepted the hands-on),  Security (excepted the hands-on), Docker and Docker Compose, Kubernetes (except the hands-on).
* **Cloud Engineers**: Command line / Shell, Git, CI/CD, Security, Docker and Docker Compose, YAML, Kubernetes.

### Schedule the effort

There are several variables that can influence the schedule for study hours, like expertise, background, or learning speed of the new entry, project deadlines, needs, organization, customer-related constraints, etc.  
Therefore, each team-leader is free to decide how to plan the training with the new employee, as long as it's done within the first two months.

For example, imagining that the training path takes up all 40 hours, they can decide to spend 10 consecutive afternoons for the first ten working days. Or they may want to seize some slack the project may grant for the first week to go all-in and spend it all learning the basics.  
Or maybe they may decide to spend a couple days on the most relevant knowledge gaps, and postpone for a couple weeks the refresh of already familiar concepts.

It's strongly suggested to:

* Plan the sessions on Float under the `Tech Budget / Formazione interna` project. The time spent will **must** be logged there anyway.
* Assign a task on PeopleForce for each module, with the links to the training material, possibly numbered, so that the employee can check them out as complete. This will trigger a notification to whomever assigned the task allowing the team leader or buddy to see the progress.

### When to assess, plan, communicate and verify

This table summarize the key moments to make sure the Core Skills has been properly acquired.

| When                             | What                                                    | Who              |
|----------------------------------|---------------------------------------------------------|------------------|
| **From 2nd day of onboarding**   |                                                         |                  |
|                                  | Assess required core skills and training needs          | TL and new entry |
|                                  | Create a proposal to allocate training hours            | TL               |
|                                  | Planning review and approval                            | Ops and/or CTO   |
| **During first month**           |                                                         |                  |
|                                  | Implement the training plan                             | New entry        |
| **During second month**          |                                                         |                  |
|                                  | During planned 1-on-1, gets feedback about the progress | HR               |
|                                  | Continuous evaluation and process updates               | HR, TL, newentry |
| **End of second month**          |                                                         |                  |
|                                  | Review and evaluate training results                    | HR, TL, newentry |

---

<small><a name="fn1">1</a>: Of course, the resources are always there in case someone has spare time or want to skill-up in their personal time.</small>