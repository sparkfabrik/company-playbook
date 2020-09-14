# Product requirements template

> This is a standard template that can be used to document new features, it's not strictly bound to any
tools, you can freely adapt at your convenience.
It is heavily inspired to this one from Atlassian: https://www.atlassian.com/software/confluence/templates/product-requirements

`TEMPLATE`

| Details             ||
|---------------------|-|
| **Target release**  | 1.0
| **Epic**            | Link to epic (github/gitlab)
| **Document status** | Draft/Final
| **Document owner**  | Author(s) name

## Objective

Provide context on this feature and explain how it fits into the product.

## Assumptions

List here any assumptions you can made about your users, technical constraints or business goals.

*(e.g.: This set of features work only on iOS => 13)*

## User stories

Here briefly explain using the user story format:

> “As a [persona], I [want to], [so that].”

Example:

```
As a credit card holder,
I want to view my statement (or account) balance,
so that I can pay the balance due.
```

## Acceptance criteria

Acceptance Criteria defines how a particular feature could be used from an end user’s perspective. It focuses on business value, establishes the boundary of the feature’s scope and guides development.

### Example

> User story

```
As a credit card holder,
I want to view my statement (or account) balance,
so that I can pay the balance due.
```

> Acceptance criterias

1. Display statement balance upon authentication. *Say for example $1560*
2. Display total balance. For example $3560. Here the balance due from the current period is $2560 and past balance due is $2000.
3. Show **Minimum payment due.** For example $140
4. Show **Payment due date.** For example May 16th of the current month
5. Show error message if service not responding or timeout. For example ‘Sorry, something went wrong with the service. Please try again.’

> If you want to know more about this subject https://agileforgrowth.com/blog/acceptance-criteria-checklist)

## User interactions and design

Add here any mockup, diagrams, visual designs that can help to understand better the feature.

Example:

![Smashing magazine sketching for a better mobile experience](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b8c13f54-7500-4a51-aad3-5e9cd89ff656/6variants-mini.jpg)

## Open questions

| Question | Answer |
|---------------------|-|
| How might we make users aware of this features ?  | We'll announce the feature with a blog post and a summit presentation.


## Out of scope

List of features discussed which are out of scope or might be revisited in a later release.