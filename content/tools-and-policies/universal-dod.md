/*
title: Universal Definition of Done (UDoD)
*/

We love to build **high-quality products**, always following the market **best practices regarding tools, security, coding, and team collaboration**.

To better **match our standards** in all the technologies we work with, we have in place several practices to **help everyone to be successful**:

1.  Starter-kits (our custom package system) to quickly bootstrap new projects
2.  Automation from the local development environment to the CI/CD pipelines (Gitlab and GitHub)
3.  Code review
4.  Upskilling and training program
5.  Internal tech talks and company hackathon
6.  On-demand QA team to help testing features

All this helps us to **shape a better product**, reducing the cognitive load needed to **build, test, and deliver** digital products compatible with our high company standards.

### What's a Definition of Done?

According to the [_Scrum Alliance_ definition]((https://resources.scrumalliance.org/Article/definition-dod)):

> _"Definition of done is a simple list of activities (writing code, coding comments, unit testing, integration testing, release notes, design documents, etc.) that add verifiable/demonstrable value to the product. Focusing on value-added steps allows the team to focus on what must be completed in order to build software while eliminating wasteful activities that only complicate software growth efforts."_

In simple words a _Definition of Done_ is **a checklist of non-functional requirements** to ensure to be on the right path and understand **if a task is actually done** or if it needs more work.

Definitions of done **are living documents**, significantly depending on the context in which they are applied, such as technologies, team composition, contracts, policies, etc.  
Still, there are some universal principles we apply to all and every projects, and they define what we call the _**Universal Definition of Done**_ (_UDoD_)

### Universal Definition of Done

#### Task-Level checks

When working on a SparkFabrik project, a task is considered done when:

- **The related PR/MR is linked to an actual issue** on the tracker of choice, using our standard notation `refs <url>: <description>.` or a different one for the specific project, if so agreed, like [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)
- **CI is working as expected**, any new job that is deemed necessary for the feature is in place, **without significant impacts on the total time** it takes to run the related pipeline.
- **All the tasks** and dependent services needed to build the feature in the local development environment **are automated and integrated** (no manual tasks to be performed to build from scratch).
- In case some tasks are not automatable, **clear instructions are provided at the end of the local build process as console outputs**.
- **The feature is covered with tests**, either unit, functional, or e2e, and the tests are green, significant, and fast.
- **Fixtures** to help QA or perform smoke-tests **are automatically created during the local or review builds** and documented for testers (see below).
- **Significant QA has been performed** in the local or review environment.
- **All "To Do" items** listed in the issue **have been checked**.
- **Code is reviewed** by at least one senior team member.
- **All Acceptance Criteria**, when present on the issue, **are met**.
- **Feature-related information** for current or future team members **have been documented** in a README or project wiki, including:
  - Information to access and test external/integrated services such as accounts, keys, small guides, etc.
  - Accounts, small guides, information for dev/staging/test environments of related services we may depend upon.
  - QA Fixtures (fake accounts for specific roles, complete/partial/wrong content items, mocked information, etc).
  - Architectural overviews, schemas, flow-diagrams and decisions log.
  - Domain glossary.
  - Technical and business key contacts and roles.
- **AI tooling prompts and instructions** are created and maintained as reusable project assets when using AI tools like GitHub Copilot, including:
  - GitHub Copilot Custom Instructions tailored to the project's codebase and conventions.
  - Reusable chat prompts for common tasks (debugging, refactoring, documentation).
  - Defined AI agents or personas that team members can use for specific roles (e.g., "senior QA engineer", "security reviewer").
  - An AGENTS.md file or similar documentation that formalizes and shares these prompts and personas with the team.

#### Project-Level checks

A SparkFabrik project can be deemed done when:

- The project can be entirely built locally by running `make` or equivalent on a correctly and freshly provisioned computer.
- All the operations to deploy the project to non-local environments are automated and don't depend on manual task or personal knowledge.
- All information to access the environments are properly documented (see above).
- No mocked or half-baked features are deployed to the staging or production environments.

### Conclusion

This is a general list of non-functional rules that apply to every scenario; with _non-functional_ we mean they are not bound to specific use cases but to the project itself, agreed upon by the team members, and constantly reviewed to keep it **valuable and doable**.

Technologies and best practices are fast-changing; development environments are complex with many moving parts; and microservices/decoupling methodologies raise the bar of complexity to high levels.
This may disorient new and seasoned developers, who naturally focus on functional aspects of the work at hand, even most when they are called to innovate and step out of their comfort zone.

**Our UDoD comes in help**, not as a set of restricitons but as a railway track.
