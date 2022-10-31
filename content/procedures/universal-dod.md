/_
title: Universal Definition of Done (UDoD)
_/

We love to build **high-quality products**, always following the market **best practices** regarding **tools**, **security**, **coding**, and **team collaboration**.

To better **achieve our standards** in all the **technologies** we work with, we have in place **several practices** to help **everyone** to be **successful**:

1.  Starter-kits (our custom package system) to quickly bootstrap new projects.
2.  Automation from the local development environment to the CI/CD pipelines (Gitlab and Github).
3.  Code review
4.  Upskilling and training program
5.  Internal tech talks and company hackathon
6.  On-demand QA team to help to test a feature

Any of the following items allows you to shape a **better product**, reducing the **cognitive load** needed to **build, test, and deliver** **digital products** compatible with the **company standard**.

### Definition

We should start by asking what is a _"Definition of Done"_ ?

According to the _Scrum Alliance_ definition:

> _"Definition of done is a_ **_simple list of activities_** _(writing code, coding comments, unit testing, integration testing, release notes, design documents, etc.)_ **_that add verifiable/demonstrable value_** _to the_ **_product_**_._ **_Focusing_** _on_ **_value-added steps_** _allows the team to focus on what_ **_must be completed_** _in order to build software while_ **_eliminating wasteful activities_** _that only complicate software growth efforts."_

_Source:_ [_https://resources.scrumalliance.org/Article/definition-dod_](https://resources.scrumalliance.org/Article/definition-dod)

Well, the concept behind this is quite simple: having **a checklist of valuable tasks** to ensure to be on the **right path** and understand if a **feature is effectively done**.

Definitions of done **are not static** and **depend significantly on the context** where they are applied, such as technologies, team composition, contracts, policies, etc.

But still, there are some **universal principles** that can apply to all projects, and they define what we call the **_U-DoD_** "**Universal Definition of Done"**

### Checklist

- **The PR/MR is linked to an actual issue on the used issue tracker using our standard notation _"refs <url>: <description>."_ or the agreed one for the project.**
- **CI is working as expected, any needed new job is in place, and the timing to run it is not significantly impacting the global timing of the pipeline.**
- **All tasks and dependent services needed to build the feature on the local development environment are automated and integrated.**
- **The feature is covered with tests, such as unit, functional, or e2e, and the tests are green, significant, and fast.**
- **QA has been done on a local or a review environment.**
- **All “To Do” annotations on the issue must have been resolved.**
- **Code is reviewed from at least one senior member of the team.**
- **Acceptance criteria, when present on the issue, are all met.**

### Conclusion

This is a general list of **rules that can apply to all kinds of scenarios**; it **doesn't cover specific use cases** that must be part of the **project itself**, **agreed** upon by the **team members**, and **constantly reviewed** to keep it **valuable and doable**.

**Technologies** and **best practices** are **fast-changing**, **development environments** are **complex** with many **moving parts**, and **microservices**/**decoupling** methodologies **raise the bar of complexity very high.**

This means feeling **disoriented** for new (and seasoned) developers when **approaching new projects**; this is where the **UDoD comes into help.**
