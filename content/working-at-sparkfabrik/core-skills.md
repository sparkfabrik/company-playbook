/*
Description: Basic technical skills by department
Sort: 30
*/

**Core skills** are those shared across all teams, whether Platform or Development teams, and they form the foundation we expect all professionals at SparkFabrik to have.

The purpose of this document is to list the training resources to consolidate the key competencies we recognize in every professional.

The training resources will be useful during the [onboarding period](/procedures/employee-onboarding.md) to self-train and update knowledge, with the support of a buddy who will be available throughout the process.

The ideal approach is to have an interactive, guided and pre-designed path, based on a "Getting Started" approach, that provides insights for further exploration without going too deep.

That's what this page is: it lists all core skills, split into modules, each of which provides one or more links to educational materials and hands-on tutorials <sup><a href="#fn1">1</a></sup>.

> **NOTE**: See [Assessing Core Skills]() section to learn how to access core skills, then head back to this page to create a personalized training plan based on the results.

## Command line / Shell

**Estimated Time**: 24h  

### Basics

The command line is one of the tools we use extensively to standardize the developer experience and automatically share secrets and settings across all projects.

| Resources | |
|---|---|
| **Documentation** | [Makefile Tutorial](https://makefiletutorial.com/) |
| **Hands-on** | [The Shell (LinuxJourney)](https://linuxjourney.com/lesson/the-shell) |
| | [Output redirection (LinuxJourney)](https://linuxjourney.com/lesson/stdout-standard-out-redirect) |
| | [Bash Crawl (SlackerMedia)](https://gitlab.com/slackermedia/bashcrawl#try-it-online-with-mybinder) |

### Security

Any credentials (API keys, passwords, etc.) should not be committed to the project and should not be present on the local disk, especially if it is not encrypted. Credentials should only be saved within secure tools provided by our platforms, such as GitLab/GitHub.

| Resources | |
|---|---|
| **Documentation** | [Concise Guide for Developing More Secure Software (OpenSSF)](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Developing-More-Secure-Software.md#readme) |
| | [Concise Guide for Evaluating Open Source Software (OpenSSF)](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Evaluating-Open-Source-Software.md#readme) |
| | [The Secure Software Factory (CNCF Tag Security Whitepaper)](https://github.com/cncf/tag-security/blob/main/supply-chain-security/secure-software-factory/Secure_Software_Factory_Whitepaper.pdf) |
| **Hands-on** | [Developing Secure Software (LFD121)](https://training.linuxfoundation.org/training/developing-secure-software-lfd121/) <sup><a href="#fn2">2</a></sup> |

### Git

Git is the fundamental tool we use to work on any development project, both internal and external.

| Resources | |
|---|---|
| **Documentation** | [Git Workflow](https://playbook.sparkfabrik.com/procedures/git-workflow) |
| | [Gitlab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html) |
| **Hands-on** | [Learn Git Branching](https://learngitbranching.js.org/) |


## DevOps

**Estimated Time**: 18h  

### Docker e Docker Compose

Our local stack always includes one or more containers with the services that compose the application, typically reflecting the production architecture.

| Resources | |
|---|---|
| **Documentation** | [Docker - Zero to Hero (TechWorld with Nana - YouTube)](https://youtu.be/3c-iBn73dDE) |
| | [Docker-Compose Tutorial (TechWorld with Nana - YouTube)](https://youtu.be/MVIcrmeV_6c) |
| **Hands-on** | [Docker 101 Tutorial](https://www.docker.com/101-tutorial/) |

### Kubernetes

Our preferred infrastructure to manage multi-service applications.

| Resources | |
|---|---|
| **Documentation** | [The Illustrated Childrens Guide to Kubernetes (Italian)](https://www.cncf.io/wp-content/uploads/2021/11/The-Illustrated-Childrens-Guide-to-Kubernetes-Italian-Spark.pdf) |
| **Hands-on** | [Kubernetes (KillerCoda)](https://killercoda.com/kubernetes) <sup><a href="#fn3">3</a></sup> |

### YAML

The format is used to describe almost all cloud-native services, such as Docker Compose and Kubernetes.

| Resources | |
|---|---|
| **Documentation** | [YAML Syntax (Ansible Documentation)](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html) |
| **Hands-on** | [YAML Tutorial - Everything you need get started (CloudBees)](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started) |


## Continuous Integration (CI/CD)

**Estimated Time**: 8h  

### GitLab & GitHub

These are our reference tools to manage repositories, projects (agile boards), and continuous integration with automated pipelines.

| Resources | |
|---|---|
| **Documentation** | [Introduction to CI (GitLab Documentation)](https://docs.gitlab.com/ee/ci/introduction/) |
| | [Create and run your first GitLab CI/CD pipeline (GitLab Tutorial)](https://docs.gitlab.com/ee/ci/quick_start/) |
| | [GitLab CI/CD in one hour (TechWorld with Nana - YouTube)](https://youtu.be/qP8kir2GUgo) |
| | [Understanding GitHub Actions (GitHub Docs)](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) |
| **Hands-on** | [Become a GitHub Actions Hero](https://github-actions-hero.vercel.app/) |

## Bonus track - GitHub Copilot

**Estimated Time**:  1h to activate and test it out.

A context-aware, AI-based tool that helps writing code faster. When used correctly, it allows to optimize repetitive tasks and quickly create prototypes and blueprints.

See [GitHub Copilot](https://playbook.sparkfabrik.com/tools-and-policies/github-copilot) page in the _Tools and Policies_ section.

---

## How to plan the training on core skills

During the very first days in SparkFabrik, the confidence degree with the basic concepts of the necessary core skills will be [assessed by a buddy](). Depending on the findings, **a maximum of 40 working hours** will be allocated **within the first two two months** for the new employee to learn the key-concepts.

There are several variables that can influence the schedule for study hours, like expertise, background, or learning speed of the new entry, project deadlines, needs, and organization, customer-related constraints, etc.  
Therefore, each team-leader is free to decide how to plan the training with the new employee, as long as it's done within the first two months.

For example, imagining that the training path takes up all 40 hours, they can decide to spend 10 consecutive afternoons for the first 10 working days. Or they may want to seize some slack the project may grant for the first week to go all-in and spend it all learning the basics.  
Again, they may decide di spend a couple days on the most relevant knowledge gaps, and postpone after a couple weeks the refresh of concepts that are already there.

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

To help prioritizing and planning the necessary training, we hereby provide the list of modules, ordered by priority, for each company area.

### Web Development

| Module               | Topic                    |
|----------------------|--------------------------|
| Command-line / Shell | Basics                   |
| Command-line / Shell | Git                      |
| DevOps               | Docker & Docker compose  |
| Command-line / Shell | Security                 |
| DevOps               | YAML                     |
| CI/CD                | GitLab & GitHub (basics) |
| DevOps               | Kubernetes (basics)      |

### Mobile Development

| Module               | Topic                    |
|----------------------|--------------------------|
| Command-line / Shell | Basics                   |
| Command-line / Shell | Git                      |
| DevOps               | YAML                     |
| CI/CD                | GitLab & GitHub (basics) |
| Command-line / Shell | Security                 |
| DevOps               | Docker & Docker compose  |
| DevOps               | Kubernetes (basics)      |

### Platform

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

<small><a name="fn1">1</a>: In addition, <a href="/resources/training-resources">this page</a> explains how to access educational video courses that may be of interest to strengthen hard skills on specific technologies and tools.</small><br>
<small><a name="fn2">2</a>: The "Developing Secure Software" course (LFD121) is considered a long-term goal to be completed within the first 12 months after the probationary period.</small><br>
<small><a name="fn3">3</a>: Limit hands-on exercices to “Pod Intro”, “Deployment Basics” and “A Playground” sections.</small>