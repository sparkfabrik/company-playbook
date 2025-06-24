/*
Description: How to take the most out of GitLab boards
Sort: 120
*/

## Table of Content

- [Table of Content](#table-of-content)
- [Board columns](#board-columns)
- [Labels](#labels)
  - [Issue type](#issue-type)
  - [Workflow markers](#workflow-markers)
  - [Subteams accountabilities](#subteams-accountabilities)
- [Assignees](#assignees)
- [Pro Tips](#pro-tips)

Each project has its peculiarities, but you can start from the following suggestions, inspired by Kanban methodology, on how to set up your board for visualization, readability and clarity.

Before we start, consider starting from our [templates](/tools-and-policies/gitlab-issue-templates) when you write your issues. A well-organized board with poor requirements is pretty useless, after all.

## Board columns

When you create a new project in GitLab, you will end up with a board with just two default columns: "Open" and "Closed".

What you want is to create additional columns, to keep track of the state of each issue. This is one of the most common ways to visualize the workflow on a board.  
The main goal, when you set up your columns, is to represent the **minimum set of steps** your issue goes through in your project. One of the key principles of Kanban is "start with what you have", so don't try to imagine an extremely granular list of states and substates. This only generates confusion, and you still can add them when it's clear that they make things clearer.

Here is an example of a barebone workflow setup:

1. **Open:** This column is provided by Gitlab out-of-the-box and works as a **Product Backlog**. It lists all incoming issues or tasks in order of priority. The team should regularly review this column to make sure what's on top is reviewed, refined and estimated.  
It's a good idea to tell issues which requirements are complete enough to be taken in charge from issues that still require analysis.

1. **To do:** When a team plans a new iteration, they move the cards from the `Open` column in `To Do`. This represents the team's commitment.  
Each team member can then pull tasks from `To Do`, moving them to the `Doing` column, either choosing the ones that are assigned to them or choosing from the unassigned ones.

1. **Doing:** This column represents the work-in-progress. We don't want this column to grow too large, since too much WIP is detrimental to the delivery flow. When an issue is done (see our [Universal Definition of Done (UDoD)](/tools-and-policies/universal-dod)), the assignee can move it to the next column.

1. **Closed:** This column is where all completed tasks are placed. Once a task has been completed and reviewed - and usually merged and deployed to the production environment - it can be moved to this column.

Such a board is based on a "pull" approach, heavily inspired by Kanban.

Each project has its needs though, and this basic schema can be extended to reflect ownerships or states that have specific policies. Here are a couple of examples that pop up frequently in our projects:

1. **Backlog:** Typical in maintenance projects where external Clients directly file requests to the issue tracker, this column represents the actual backlog and works as a separation layer between the flow of unreviewed requests in `Open` status, that may not require work by the team (for example a support request that may be addressed by pointing out the documentation) and the actual work to do.  
If you add such a column, make sure to have a clear policy about who is watching the `Open` issues to rule them in or out of the Backlog!

1. **Validation:** When the customer, stakeholders or a QA team want to validate your work before closing the related issue, having such a column comes in handy. It makes clear that the ownership of the issue passes from the team members to the reviewers. Beware this column may bring two problems. First, it is pretty common for queues to form in there, especially if the customer is doing the validation. Second, it may introduce bouncing of non-validated issues while the team works on the `Doing` stuff, forcing to context-switch, increasing WIP and creating conflicting priorities.  
If you add such a column, make sure your requirements are very well written (add extensive use cases and acceptance criteria) so you can cover them with automated tests and make sure what the customer will validate! This will lower the bounce rate and increase the quality of your work.

1. **Staged**:** Some projects are bound to batch-deploys (that is, you don't deploy validated stuff right away but things go to production in large batches instead). This may depend on constraints like marketing, continuity of delivery or other customer preferences. In these cases, you want to make sure what's in production and what's not. Moving validated stuff to a `Staged` column may be a good idea, so everyone can visualize how large the next deployment is growing. The more stuff you deploy at once, the more risk you pile up (finding the root cause for a bug on a large scope is harder than on a small scope!).  
Beware that if you add such a column you are "informing" the whole team that it's acceptable to queue stuff ready for production, so use it only if you are forced by circumstances!

## Labels

Labels are a great way to visualize information that may help you to understand the situation at a glance. They may reduce the need for a column (remember, columns are where queues can form, plus they may be abused for delegations), highlighting things that need work, stale tasks, tasks of a specific type, and so on.

Here we provide the most common cases we use labels for. Labels may be configured at the project or group level. This is useful if you have different projects (say a backend API and a frontend client app) that should respect the same policies.

### Issue type

1. **Bug:** This label is used to mark issues that seem to be or are in fact bugs. It's typically used when a piece of functionality isn't working as expected and needs to be fixed. If it applies, please reference the original feature issue in a bug issue and make sure the description contains a list of steps to reproduce the bug, the expected behavior and the observed behavior (refer to our [templates](/tools-and-policies/gitlab-issue-templates) for a good starting point).

1. **CR** or **Change Request:** This label is used to mark maintenance activities. It's typically used when a change needs to be made to an existing feature or functionality, instead of adding a new one. If the customer has access to the board and files bugs report directly to the project backlog, some bugs may requalify as CRs when analyzed.

1. **Feature:** This label is used for issues related to new functionality or enhancement that needs to be added.

1. **Support:** This label is used to indicate that an issue is related to a support request or inquiry from the client.

1. **Tech task**: This label may be used to indicate that the issue is a task that, albeit required, has no impact on the functionality from a user perspective (POC or Spikes, setup or configuration, under-the-hood maintenance or upgrades are good examples).

### Workflow markers

1. **Ready** or **To be analyzed**: Those labels are mutually exclusive (you may want to pick just one) and are good to tell issues that are ready to be worked on, from the ones that contain little details and are not yet workable. Those labels usually belong to the backlog since the team should never commit to an issue that can't be delivered. It is bound to remain in a queue for a long time.

1. **Needs Feedback:** This label is used for issues that the team needs more information about before they can proceed. It's typically used when a task is waiting on input or clarification in the comments. If you did your homework and properly used the label mentioned in the previous point, you may not need this. It's usually very useful on maintenance boards where the customers have direct access since it's easy for them to recognize what needs to be specified at a glance.

1. **Rejected:** This label is used to indicate that a task has been rejected. It's typically used when a task has been evaluated by both parties and determined not to be necessary or feasible.

1. **Estimate approved:** This label is used for issues that have been estimated and approved for implementation. It's typically used in maintenance (but also on projects) when a task has been scoped and cost-estimated, and both parties have agreed on the estimated effort required. This may be part of a "Definition of Ready", together with thorough, complete requirements.

### Subteams accountabilities

No examples here but from time to time it may be useful to tell issues that require specific skills or pertain to specific areas of the implementation, like **Frontend**, **Backend**, **API**, **Angular**, etc.

Consider using those only when required because well... less is more. A cluttered board becomes unreadable and useless.

## Assignees

Unassigned cards in `Doing` are terrible from a project government perspective. Cards in the backlog are usually always unassigned, with the honorable exception of those who are in the process of being detailed by an analyst.

Usually, you want people to self-assign cards with a _pull_ approach. When you have clear assignees already in the planning phase, you can "pre-assign" them right away in the iteration backlog (`To Do` column). Beware that assigning and reassigning cards are not a good idea, not even during review or validation! Leave the cards assigned to those who worked on them, **assigning merge requests to the reviewers** instead.

The main reason for this is that leaving assignees visible during validation will help understand how much work may come back on a specific person during the validation phases if something bounces. If the validation column is full of cards assigned to John, maybe in the next iteration the best option is for John to reserve some time, just in case.  
But there is one subtler dynamic at work: when you reassign one of your tasks to someone else who is maybe just validating it, it's like you are formally losing the responsibility to bring the task to production. That's not what we want.

Of course, this is more of a suggestion than an actual rule. Just remember to always observe dysfunctions in your workflow and try to set up the board so that you can **visualize** what is important to smooth the delivery flow. Fight opacity and make the process inspectionable.

## Pro Tips

Just two closing tips to get the most out of your project board.

* When you review the work done (during daily standups, planning or review), read the project board from right to left. The most important thing is to close the work that's in progress, not to pile more half-baked work in a queue. Do you have a card in validation for days? Maybe you can ping the client and make yourself available for a joint review. Do you need to pair with a busy colleague to close an issue that's "on hold"? Declare it and work with the team to find a solution. Remember, moving things to "Done" (at the right pace and with high quality) is the single most important thing to focus on during delivery.
* Always make your policies explicit. Gitlab offers little help on this in the board view, but at least keeping a short wiki page up to date with the meaning of each column, who is in charge and how you move stuff from the one to the next (triggers, gates, checks, responsible, etc) is a good starting point. It's also something you can update during your retrospective if you decide to evolve your workflow rules.
