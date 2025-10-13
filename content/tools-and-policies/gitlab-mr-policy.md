# Merge Requests Policy

When a team member works on a task, they may create a merge request and set it to _Draft_. The merge request should be linked to the corresponding card on the project board by including the card's reference (refs) in the title.

When the work on the issue is complete, the author MUST run the PR Agent (using `/improve`) and review its suggestions. The PR Agent is a mandatory, automated step and MUST be executed before requesting a human review.

The bot will propose code improvements; the author must address each suggestion either by applying it or by leaving a comment explaining why it is not applicable. The author must keep the merge request updated and use the `/improve` and `/review` commands to indicate the current status to reviewers. Addressing PR Agent suggestions and ensuring the MR is up-to-date with `/improve` and `/review` are prerequisites for requesting a human review.

After these prerequisites are met, the author may assign the merge request to another developer for human review. The reviewer checks the code for correctness, completeness, and adherence to coding standards, leaving comments if necessary. The author must address reviewer comments before the review is approved.

Once the reviewer is satisfied, they approve the merge request. The author then updates the merge request description, using the `/describe` PR Agent command as a starting point.

Note on `/describe` (optional but useful): `/describe` can be invoked multiple times to refresh the MR description. It preserves any manual description previously written by humans, so it's safe to run again later in the review lifecycle (for example to summarise fixes introduced during review).

To re-run the automated steps, comment with `/improve` or `/review` in the MR discussion as separate comments; this will retrigger the corresponding action for reviewers or the PR Agent.
