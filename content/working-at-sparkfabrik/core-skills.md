/*
Description: Basic technical skills by department
Sort: 30
*/

**Core skills** are those shared across all teams, whether Platform or Development teams, and they form the foundation we expect all professionals at SparkFabrik to have.

The purpose of this document is to list the training resources to consolidate the key competencies we recognize in every professional. 

The training resources will be useful during the onboarding period at the company to self-train and update knowledge, with the support of a "buddy" who will be available throughout the process. 

The ideal approach is to have an interactive, guided path already designed with a "Getting Started" perspective that provides insights for further exploration without going “too deep”.

This page lists all core skills, split into modules, each of which concludes with a simple self-assessment to be completed individually or with the support of the buddy, who could help to understand if the key-concepts are well understood. 

For each identified core skill, we provide one or more links to educational materials and hands-on tutorials.

## General Resources

In our Playbook, you can find a list of educational materials in the form of online courses available on the most popular training platforms. The [dedicated page](https://playbook.sparkfabrik.com/resources/training-resources) also contains information on how to access this material.


## Core modules

---

### Command-line / Shell

#### Basics

The command-line is one of the tools we use extensively to standardize the developer experience and automatically share secrets and settings across all projects.

##### Documentation

* Makefile: [https://makefiletutorial.com/](https://makefiletutorial.com/)

##### Hands-on

* [https://linuxjourney.com/lesson/the-shell](https://linuxjourney.com/lesson/the-shell)
* [https://linuxjourney.com/lesson/stdout-standard-out-redirect](https://linuxjourney.com/lesson/stdout-standard-out-redirect)
* [https://gitlab.com/slackermedia/bashcrawl#try-it-online-with-my binder](https://gitlab.com/slackermedia/bashcrawl#try-it-online-with-mybinder)


#### Security

Any credentials (API keys, passwords, etc.) should not be committed to the project and should not be present on the local disk, especially if it is not encrypted. Credentials should only be saved within secure tools provided by our platforms, such as GitLab/GitHub.

##### Documentation

* OpenSSF: [Concise Guide for Developing More Secure Software](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Developing-More-Secure-Software.md#readme)
* OpenSSF: [Concise Guide for Evaluating Open Source Software](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Evaluating-Open-Source-Software.md#readme)
* CNCF Tag Security: [The Secure Software Factory](https://github.com/cncf/tag-security/blob/main/supply-chain-security/secure-software-factory/Secure_Software_Factory_Whitepaper.pdf) (whitepaper)

##### Hands-on

* [Developing Secure Software (LFD121)](https://training.linuxfoundation.org/training/developing-secure-software-lfd121/) (14-18h)

_Note:_ The "Developing Secure Software" course (LFD121) is considered a long-term goal to be completed within the first 12 months after the probationary period.

#### Git

Git is the fundamental tool we use to work on any development project, both internal and external.

##### Documentation

* Git workflow: [https://playbook.sparkfabrik.com/procedures/git-workflow](https://playbook.sparkfabrik.com/procedures/git-workflow)
* [https://docs.gitlab.com/ee/topics/gitlab_flow.html](https://docs.gitlab.com/ee/topics/gitlab_flow.html)

##### Hands-on

* [https://learngitbranching.js.org/](https://learngitbranching.js.org/)


#### Timing and Assessment

_Estimated Time:_ 24h

Assessment: SparkFabrik will provide a private repository to clone, containing an application with some errors in build and startup scripts, and security practices. The candidate should correct these errors to make the application run.

---

### DevOps


#### Docker e Docker Compose

Our local stack always includes one or more containers with the services that compose the application, typically reflecting the production architecture.

##### Documentation

* [https://youtu.be/3c-iBn73dDE](https://youtu.be/3c-iBn73dDE)
* [https://youtu.be/MVIcrmeV_6c](https://youtu.be/MVIcrmeV_6c) 

##### Hands-on

* [https://www.docker.com/101-tutorial/](https://www.docker.com/101-tutorial/)

#### Kubernetes

Our preferred infrastructure to manage multi-service applications.

##### Documentation

* [https://www.cncf.io/wp-content/uploads/2021/11/The-Illustrated-Childrens-Guide-to-Kubernetes-Italian-Spark.pdf](https://www.cncf.io/wp-content/uploads/2021/11/The-Illustrated-Childrens-Guide-to-Kubernetes-Italian-Spark.pdf)

##### Hands-on

* [https://killercoda.com/kubernetes](https://killercoda.com/kubernetes) - “Pod Intro”, “Deployment Basics” and “A Playground”


#### YAML

The format is used to describe almost all cloud-native services, such as Docker Compose and Kubernetes.

##### Documentation

* [https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)

##### Hands-on

* [https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started)


#### Timing and Assessment

_Estimated Time:_  18h

_Assessment:_ SparkFabrik will provide a private repository to create a mini-project with Docker and Kubernetes (kind), hypothetically a web app with an nginx server.


### Continuous Integration (CI/CD)


#### GitLab & GitHub

These are our reference tools to manage repositories, projects (agile boards), and continuous integration with automated pipelines.

##### Documentation

* [https://docs.gitlab.com/ee/ci/introduction/](https://docs.gitlab.com/ee/ci/introduction/)
* [https://docs.gitlab.com/ee/ci/quick_start/](https://docs.gitlab.com/ee/ci/quick_start/)
* [https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)
* [https://youtu.be/qP8kir2GUgo](https://youtu.be/qP8kir2GUgo)

##### Hands-on

* [https://github-actions-hero.vercel.app/](https://github-actions-hero.vercel.app/)

#### Timing and Assessment

_Estimated Time:_ 8h

Assessment: SparkFabrik will provide a private repository with CI and job templates, and tasks such as adding a new job, retrieving logs, or fixing non-functioning jobs.

### Bonus: GitHub Copilot

A tool that utilizes AI to auto-complete code more intelligently. When used correctly, it allows us to optimize repetitive tasks and quickly create prototypes and blueprints.

Documentation

[https://playbook.sparkfabrik.com/tools-and-policies/github-copilot](https://playbook.sparkfabrik.com/tools-and-policies/github-copilot)

_Estimated Time: _1h


### Summary

| Module                             | Suggested Time (hours)     |
|------------------------------------|----------------------------|
| Command-line / Shell               | 50% on total hours         |
| DevOps                             | 35% on total hours         |
| Continuous Integration (CI/CD)     | 15% on total hours         |
| Total hours                        | 40                         |


#### Team Tracks 


##### Developers

| Module               | Topic                    |
|----------------------|--------------------------|
| Command-line / Shell | Basics                   |
| Command-line / Shell | Git                      |
| DevOps               | Docker & Docker compose  |
| Command-line / Shell | Security                 |
| DevOps               | YAML                     |
| CI/CD                | GitLab & GitHub (basics) |
| DevOps               | Kubernetes (basics)      |



##### Mobile

| Module               | Topic                    |
|----------------------|--------------------------|
| Command-line / Shell | Basics                   |
| Command-line / Shell | Git                      |
| DevOps               | YAML                     |
| CI/CD                | GitLab & GitHub (basics) |
| Command-line / Shell | Security                 |
| DevOps               | Docker & Docker compose  |
| DevOps               | Kubernetes (basics)      |


##### Platform

| Module               | Topic                   |
|----------------------|-------------------------|
| Command-line / Shell | Basics                  |
| Command-line / Shell | Git                     |
| CI/CD                | GitLab & GitHub         |
| Command-line / Shell | Security                |
| DevOps               | Docker & Docker compose |
| DevOps               | YAML                    |
| DevOps               | Kubernetes              |


---

##### How to allocate study hours

| When                                          | What                                                                   | Who              |
|-----------------------------------------------|------------------------------------------------------------------------|------------------|
|                                               | Assess required core skills and training needs (checklist)             | TL and new entry |
| From the 2nd day of onboarding                | Create a proposal to allocate study hours (*)                          | TL               |
|                                               | Revisione e approvazione del piano                                     | Ops and/or CTO   |
| During first month                            | Implement the study plan                                               | New entry        |
| Second month                                  | Individual meetings (1:1) to collect feedback on the training progress | HR               |
|                                               | Continuous evaluation and process updates                              | HR, TL, newentry |


(*) There are several variables that can influence the allocation of study hours:


* Expertise and background of the new entry 
* Project (deadlines, needs, organization, contact with the client) 
* Learning speed 
* … what else? TODO

**Total hours Available: **40 hours

**Examples of study hour allocation:** 

_Example 1_

_40 hours to allocate _

_10 half-days consecutively for the first 10 working days_

_Example 2_

_40 hours to allocate _


## _2 half-days per week for 5 weeks_
