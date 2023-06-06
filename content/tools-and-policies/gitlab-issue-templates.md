/*
Description: A set of issue templates for GitLab projects
Sort: 120
*/

## Table of Content

- [Introduction on issue templates](#introduction)
- [Feature](#feature)
- [Bug](#bug)
- [Techical task](#technical-task)
- [Support](#support)

## Introduction
When you create a new project on GitLab, even before creating the first issue, we strongly advise you to add these templates, in order to immediately have issues structured in the correct way.  
Templates must be added to the `.gitlab/issue_templates` folder of the project root, one file for each template.

For example:
```
.
├── .gitlab
│   └── issue_templates
│       ├── feature.md
│       └── bug.md
```

Some default labels are set as an example.  
Edit or remove them according to your project settings.

Feel free to download [this package](/downloads/issue_templates.tar.gz), unpack it in your repository and adapt the templates to your needs.

## Feature

This model contains the most suitable information for detailing a new process.  
The user-story that opens the template can be useful if it is necessary to uniquely identify types of users, expected benefits and desired functions.

The section on validation scenarios might be overkill, but it could still be useful as a reference.  
For particular highly complex issues, you want to write them using the proposed Gherkin syntax.

The most important and non-optional component is the "Acceptance Criteria".

```
## User stories
**For**
**How**
**I want**

## Description of needs


## Drafts or UI templates


## Acceptance criteria (done when...)

_**Tip**: Write a **checkboxed** list of sentences in the present tense describing the desired state of the system._

**GOOD (clear how to verify, it reports design and interaction decisions
agreed):**

* [ ] The page shows a button only to logged in users
* [ ] The button has the style XXX and label "Logout"
* [ ] When pressed, opens a confirmation modal with "OK" and "Cancel" buttons
* [ ] ...

**BAD (cannot be activated during verification, too arbitrary):**

* [ ] Logout button
* [ ] Modal for confirmation

## Validation scenarios

_**Hint**: Use Gherkin syntax to lay them out. It is complete and explicit, human-readable but easy to convert into self-executable tests._

_**Tip**: A scenario title should describe in a complete sentence what happens in that scenario, to improve readability and indability._

**OK**: `Administrator logs into back-office`
**BAD**: `Backoffice login`

### Scenario title

**Given**
**When**
**Then**

## Tasks

_This section is populated by the developer and reports the expected practical activities to meet the requirements. Useful for estimating and for day-by-day monitoring. Better if it reports checkboxes to track completion._

* [ ] Task 1
* [ ] Task 2
* ...

## Notes

*
*
*

/label ~CR

```

## Bug

This template contains information that can be entered into an item backlog related to a bug found in production or a problem reported by a user.

```
## Description of the problem

_Provide a concise description of the bug_

## Steps to reproduce it

_List the steps to reproduce the problem:_

1. Visit '...'
2. Click on '...'
3. Scroll to '...'
4. ...

### Expected behavior

_A clear and concise description of what you expect to happen._

### Behavior detected

_A clear and concise description of what happens instead._

## Screenshots

_If relevant, copy and paste screenshots or photos of the problem here._

/label ~Bug

```

## Technical task

This template describes a technical task, POC, or spike needed by the product but which brings no direct value to the end user.

```
## Description and goal

_**Tip**: Explain your motivations and goals so that whoever takes it in charge can think of possible alternative solutions, if necessary._

## Tasks and activities

* [ ] Task 1
* [ ] Task 2
* ...

## Acceptance criteria

* [ ] The system has...
* [ ] We have a tool for...
* [ ] Data is successfully migrated...

/label ~Task

```

## Support

When the board is accessible to the customer, it may be useful to provide a template for support requests.
It is a generic template that can be used when none else is applicable.

```
## Description and goal

_**Tip**: Enter the description of the request, indicating the degree of priority compared to other activities in progress or planned._

/label ~Support

```
