/*
Description: A sample workflow for a GitLab board
Sort: 110
*/

## Table of Content

- [Board columns](#board-columns)
- [Labels](#labels)

Each project has its own peculiarities, but you can start from the following suggestions to set up a board on which to adopt a kanban methodology, which is the way we prefer to work at Sparkfabrik.

To have well-written issues complete with the necessary labels, we recommend using [templates](/tools-and-policies/gitlab-issue-templates).

## Board columns

When you create a new project in GitLab, you will end up with a board with just two default columns: "Open" and "Closed".

You'll need to create some additional columns, to keep track of the state of each issue.

Here is an example on how to name and use them.

1. **Open:** This column is typically used to list all incoming issues or tasks that have not yet been reviewed or prioritized. Once an issue has been reviewed and deemed important, it can be moved to the "Backlog" column.

2. **Backlog:** This column is where all prioritized issues or tasks are placed. Only estimable issues should be moved to this column. The team should regularly review this column to ensure that the most important tasks are being worked on first. When an issue is **ready to be worked on** and it's **estimated**, it can be moved to the "To do" column.

3. **To do:** This column is where all tasks that are ready to be worked on are placed. When a team member is ready to start working on a task, they can move it to the "Doing" column and, if the issue is not already assigned to anyone, self-assign the issue.

4. **Doing:** This column is where all tasks that are currently being worked on are placed. When a team member completes a task, they can move it to the "Validation" column. To declare an issue complete, please refer to our [Universal Definition of Done (UDoD)](/tools-and-policies/universal-dod).

5. **Validation:** This column is where all completed tasks are placed for review - usually after merging and deploying to the stage environment. Once a task has been reviewed and deemed satisfactory, it can be moved to the "Done" column. If it needs further work, it can be moved back to the "Doing" column.

6. **Closed:** This column is where all completed tasks are placed. Once a task has been completed and reviewed - and usually merged and and deployed to the production environment - it can be moved to this column.

In summary, the general rule for moving issues from one column to the next is to move them to the next column when they are ready.

## Labels

You can use whatever label you think is useful for the project.  
Here are some example.

**Bug:** this label is used to mark issues that seem to be or are in fact bugs. It's typically used when a piece of functionality isn't working as expected, and needs to be fixed. If it applies, please reference the original feature issue in a bug issue.

**Change Request:** this label is used to mark maintenance activities. It's typically used when a change needs to be made to an existing feature or functionality, and isn't related to adding new features or functionality.

**Feature:** this label is used for issues related to a new functionality or enhancement that needs to be added.

**Feedback:** this label is used for issues that the team needs more information on before they can proceed. It's typically used when a task is waiting on input or clarification from a stakeholder or client.

**Rejected:** this label is used to indicate that a task has been rejected. It's typically used when a task has been evaluated by both parties and determined not to be necessary or feasible.

**Estimate approved:** this label is used for issues that have been estimated and approved for implementation. It's typically used when a task has been scoped and costed, and both parties have agreed on the estimated effort required.

**Support:** this label is used to indicate that an issue is related to a support request or inquiry from the client.
