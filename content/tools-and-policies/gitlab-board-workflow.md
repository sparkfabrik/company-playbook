/*
Description: Example workflow for a GitLab board
Sort: 110
*/

## Table of Content

- [Board columns](#board-columns)
- [Labels](#labels)

Each project has its peculiarities, but you can start from the following suggestions, inspired by Kanban methodology, on how to setup your board for visualization, readability and clarity.

Before we start, consider starting from our [templates](/tools-and-policies/gitlab-issue-templates) when you write your issues. A well organized board with poor requirements in them is pretty useless, after all.

## Board columns

When you create a new project in GitLab, you will end up with a board with just two default columns: "Open" and "Closed".

What you want is to create additional columns, to keep track of the state of each issue. This is one of the most common way to visualize the workflow on a board.  
The main goal, when you setup your columns, is to represent the **minimum set of steps** your issue goes through of you project. One of the key principles of Kanban is "start with what you have", so don't try to imagine an extremely granular list of states and substates. This only generate confusion, and you still can add them when it's clear that they make things clearer.

Here is an example of a barebone workflow setup:

1. **Open:** This column is provided by Gitlab out-of-the box and works as a **Product Backlog**. It lists all incoming issues or tasks in order of priority. The team should regularly review this column to make sure what's on top are reviewed, refined and estimated.  
It's a good idea to tell issues which requirements are complete enough to be taken in charge from issues that still require analysis.

1. **To do:** When a team plans a new iteration, they move the cards from the `Open` column in `To do`. This represents the team commitment.  
Each team member can then pull tasks from `To do`, moving them to the `Doing` column, either choosing the ones that are assigned to them or choosing from the unassigned ones.

1. **Doing:** This column represent the work-in-progress. We don't want this colum to grow too large, since too much WIP is detrimental for the delivery flow. When an issue is done (see our [Universal Definition of Done (UDoD)](/tools-and-policies/universal-dod)), the assignee can move it to the "Validation" column.

1. **Closed:** This column is where all completed tasks are placed. Once a task has been completed and reviewed - and usually merged and deployed to the production environment - it can be moved to this column.

Such a board is based on a "pull" approach, heavily inspired by Kanban.

Each project has its needs though, and this basic schema can be extended to reflect ownerships or states that have specific policies. Here are a couple examples that pop up frequently in our projects:

1. **Backlog:** Typical in maintenance projects where external Clients directly file requests to the issue tracker, this column represent the actual backlog and works as a separation layer between the flow of unreviewed requests in `Open` status, that may not require work by the team (for example a support request that may be addressed by pointing out the documentation) and the actual work to do.  
If you add such a culumn, make sure to have a clear policy about who is watching the `Open` issues to rule them in or out the Backlog!

1. **Validation:** When the customer, stakeholders or a QA team want to validate your work before tagging it `Done`, having such a colum comes in handy. It makes clear that the ownership of the issue passes from the team members to the reviewers. Beware this colum may bring two problems. First, it is pretty common queues form in there, especially if the customer is doing the validation. Second, it may introduce bouncing of non-validated issues while the team work on the `Doing` stuff, forcing to context-switch, increasing WIP and creating conflicting priorities.  
If you add such a column, make sure your requirements are very well written (add extensive use-cases and acceptance-creteria) so you can cover them with automated tests and make sure what the customer will actually validate! This will lower the bounce rate and increase the quality of your work.

1. **Staged:** Some project are bound to batch-deploys (that is, you don't deploy validated stuff right away but things go to production in large batches instead). This may depend on constraints like marketing, continuity of delivery or other customer preferences. In these case you want to make sure what's in production and what's not. Moving validated stuff to a `Staged` column may be a good idea, so everyone can visualize how large the next deploy is growing. The more stuff you deploy at once, the more risk you pile (finding root-cause for a bug on a large scope is harder than on a small scope!).  
Beware that if you add such a column you are "informing" the whole team that it's acceptable to queue stuff ready for production, so use it only if you are forced by circumstances!

## Labels

You can use whatever label you think is useful for the project.  
Here are some examples.

**Bug:** This label is used to mark issues that seem to be or are in fact bugs. It's typically used when a piece of functionality isn't working as expected and needs to be fixed. If it applies, please reference the original feature issue in a bug issue.

**Change Request:** This label is used to mark maintenance activities. It's typically used when a change needs to be made to an existing feature or functionality and isn't related to adding new features or functionality.

**Feature:** This label is used for issues related to new functionality or enhancement that needs to be added.

**Feedback:** This label is used for issues that the team needs more information on before they can proceed. It's typically used when a task is waiting on input or clarification from a stakeholder or client.

**Rejected:** This label is used to indicate that a task has been rejected. It's typically used when a task has been evaluated by both parties and determined not to be necessary or feasible.

**Estimate approved:** This label is used for issues that have been estimated and approved for implementation. It's typically used when a task has been scoped and cost-estimated, and both parties have agreed on the estimated effort required.

**Support:** This label is used to indicate that an issue is related to a support request or inquiry from the client.
