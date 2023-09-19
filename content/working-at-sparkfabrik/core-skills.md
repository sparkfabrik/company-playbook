/*
Description: Basic technical skills by department
Sort: 30
*/

**Core skills** are shared across all teams, whether Platform or Development ones, and they form the foundation we expect all professionals at SparkFabrik to have.

During the [onboarding period](/procedures/employee-onboarding.md) the level ofto self-train and update knowledge, with the support of a buddy who will be available throughout the process.

The ideal approach is to have an interactive, guided and pre-designed path, based on a "Getting Started" approach, that provides insights for further exploration without going too deep.

That's what this page is: it lists all core skills, split into modules, each of which provides one or more links to educational materials and hands-on tutorials <sup><a href="#fn1">1</a></sup>.

> **NOTE**: See [Assessing Core Skills](/procedures/assessing-core-skills) section to learn how to access core skills, then head back to this page to create a personalized training plan based on the results.

<style>
    #table-styler-code-skills table th:first-of-type { width: 25%;}
    #table-styler-code-skills table th:nth-of-type(2) { width: 75%; }
</style>
<div id="table-styler-code-skills">

| Basics | |
|---|---|
| Command line / Shell | The command line is one of the tools we use extensively to standardize the developer experience and automatically share secrets and settings across all projects. |
| Security | Security starts from our tools and habits. Credentials management, encryption, secure authentication, and other foundamental topics must be clear to everyone, so they can click in place with our practices. |
| Networking| We develop online software and services. Having a clear understanding of the foundational protocols we use every day enables informed decisions and quicker problem-solving. |

| Tools | |
|---|---|
| YAML | _Yet Another Markup Language_, this declarative, structured JSON alternative is easy to read and write for humans and easy to parse and abstract for a machine. These qualities made it almost ubiquitous. It's syntax is very simple but powerful. |
| Git | Git is the industry standard CVS and it's at the base of every project we develop. Git is highly intertwined with our automation, so it's vital to understand how it works, and how the various aspects of the workflow impact our delivery. |
| GitHub Copilot | A context-aware, AI-based tool that helps writing code faster. When used correctly, it allows to optimize repetitive tasks and quickly create prototypes and blueprints. |

| DevOps | |
|---|---|
| Docker and Docker Compose | Our local stack always includes one or more containers with the services that compose the application, typically reflecting the production architecture. We use Docker alongside the snack-sized orchestrator Docker Compose to automate the management of different local development environments for our projects. |
| Kubernetes | The most famous FOSS container orchestrator, Kubernetes is our preferred infrastructure to manage multi-service applications. You may not be among those who use it daily but grasping the basic concepts is important because - if nothing else - our internal infrastructure is based on it. |
| CI/CD | We work in a regime of Continuous Integration and our delivery is always automated (Continuous whenever possible, depending on the project. We mainly use Gitlab and GitHub automation tools, like Pipelines and Actions, both to be understood in their basics. |
</div>

> TODO: From here!


---

## How to plan the training on core skills

During the very first days in SparkFabrik, the confidence degree with the basic concepts of the necessary core skills will be [assessed by a buddy](). Depending on the findings, **a maximum of 40 working hours** will be allocated **within the first two two months** for the new employee to learn the key-concepts.

There are several variables that can influence the schedule for study hours, like expertise, background, or learning speed of the new entry, project deadlines, needs, and organization, customer-related constraints, etc.  
Therefore, each team-leader is free to decide how to plan the training with the new employee, as long as it's done within the first two months.

For example, imagining that the training path takes up all 40 hours, they can decide to spend 10 consecutive afternoons for the first 10 working days. Or they may want to seize some slack the project may grant for the first week to go all-in and spend it all learning the basics.  
Again, they may decide to spend a couple days on the most relevant knowledge gaps, and postpone after a couple weeks the refresh of concepts that are already there.

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

<small><a name="fn1">1</a>: In addition, <a href="/resources/training-resources#other-training-resources">this page</a> explains how to access educational video courses that may be of interest to strengthen hard skills on specific technologies and tools.</small><br>
