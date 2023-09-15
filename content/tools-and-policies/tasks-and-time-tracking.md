/*
Description: How we track time and manage tasks
Sort: 70
*/

## Basic principles

Working as a team, and loving order and focus, we want to keep track of all our tasks.  
There are a bunch of reasons for this:

1. Since our time on projects is charged to the customers, we want (!) them to know what we spent our time on
1. Having tracked tasks allow for project leaders, peers and customers to negotiate their priorities
1. We don't want ambiguity when we communicate: tracking tasks we can refer to them with piercing precision using IDs
1. When a task is properly tracked and described, everybody in the team can work it out (trading off efficiency for efficacy maybe, but still)

To the same extent, we want to track the time we spend on tasks so that:

1. We can report it to the client
1. We know if we are exceeding our budget or more basically how much we have spent
1. We can have metrics related to tasks lifecycles, etc.

We **don't want** to measure the velocity or speed of individuals. Everyone has their own pace.  
Velocity rates are kept into consideration for the whole team, to continuously improve its effectiveness, remove obstacles, make them work less to produce more, etc.

We appreciate people setting personal goals on proficiency or productivity but to us it's not a matter of sheer speed, so time is only one of the variables.

### Tracking tasks

We track our tasks on [Gitlab](https://gitlab.sparkfabrik.com).

Tasks can be tracked directly by us, mostly when working on projects with a backlog of items to be developed; or can be tracked by the customer on boards representing maintenance or support activities.

Credentials are needed to log into our tracker and work on projects.

### Tracking time

We track time on [Float](https://float.com). Each member of SparkFabrik will be provided with a Float business account and will be able to track time on company projects and tasks.

There are rules to keep things consistent between the tools so that we can make something out of all these data.

## Tracking policies

Talking about our everyday work, we recognize three different types of activities:

* **Approved tasks**: this is what the customers usually call us for. These activities are described in a signed agreement of sorts, have a budget and a deadline and deploy a deliverable (even intangible, like a training course or T&M consultancy).
* **Warranty**: this is what the customer wants to be done but does not expect to pay for. Fixing a bug or amending an issue that is due to us, for example.
* **Support**: this is the time spent to deliver the _approved_ tasks_ or to help a customer get what they need, not only in terms of deliverables. These activities are often (not always) in charge to project or customer leads.

We track time differently for those activities.

As a general rule, all time entries must contain links to specific issue codes when available; in addition remember the description line always is a gift to your future self, since you may be required to explain to the administration or the customer why you spent that time and on what.

| Issue ID and title | Good time entry description | Bad time entry description | Very bad time entry description |
| ------------------ | --------------------------- | -------------------------- | ------------------------------- |
| `#123 Problems with contact form` (bug) | #123 - Verified steps to replicate the bug | #123 Problems with contact forms | Analysis |
| `#345 The user can register to site` (feature) | #345 - Login form styling | #345 - Development | Development |
| `<Tracking a phone call>`| Call with John Doe about new feature; tracked issue #789 | Call with John Doe | Phone call |

### Approved tasks

> **Forenote**: Despite we try to group tiny activities to form a _3+ working days whole_, it happens that we must deliver very small tasks to our customers, such as one-shot security upgrades or very small changes to a living product.  
> Such small, isolated activities, must be tracked under the [Support](#support) rolling task (see below).

Each task approved by a customer/for a project is tracked on Float as a `Task` (heh!), with the format `[Task ID] Task Name`, where `Task ID` is an internal reference code, in the format `YYYYMM[DDII]` (where `DDII` is an optional part composed by two-digits day (`DD`) and a discriminant incremental), and `Task Name` is a mnemonic description such as `Website development`, `New media gallery`, `Q3 Maintenance` etc.

Approved tasks have a time budget on Float and the tracked time is counted against that time budget. Should a customer extend the budget, the task will be updated/extended or a new task will be created, depending on what makes more sense in the context.

Project/Customer leads should take care of keeping things consistent in terms of issue tracking, using [Gitlab's Milestones](https://docs.gitlab.com/ee/user/project/milestones/). Create a milestone with the same name as the related task (`[Agreement Code] Task Name`) and add all issues related to this task there.

### Warranty

Each customer project has a _Warranty_ task in it. This is a "rolling" task, in that it has no time budget assigned. Administration will get a monthly chunk of the time entries for reporting. It is important to understand that, should we discover that a warranty issue is not actually covered by the warranty (it happens sometimes), we will move it where it belongs (Support or other tasks): to this extent, **it is mandatory that each time entry refers to an issue on the tracker**.

### Support

Most of the time, those who stand in the front line are most likely to track time under this task. As the _Warranty_ task, this is also a rolling activity and we can see it as a catchall for the many different tasks a project/customer lead must undergo from day to day.

It is very unlikely that you can refer an issue for such types of activities: having a phone call, reviewing the project status, replying to emails, etc. have too much overhead in tracking. To make some distinction during reporting and lifecycle analysis, there are four tags to apply to time entries that fall under the _Support_ umbrella:

* **Customer care**: when you help a customer do stuff or make sense out of something.
* **Estimation**: when you devote time to estimate new features, projects or improvements.
* **Project Management**: all activities pertaining to helping the team and the customer get _approved tasks__ done (agile events, validation, grooming, etc)-
* **Issue checking**: when an issue is raised you may have to spend time making sure it is properly detailed or to verify it is actually relevant (think about bug tracking for example). Here is where you'll track such time.

Not all these entries will result in a cost for the customer, so don't worry about this: **just track everything you do**! You will be engaged in analysis by the administration during the reporting phases.

In addition, all time entries for those very small activities agreed with the customer by mail or without a purchase order, which we perform from time to time, such as security updates, small and sporadic changes, etc, must be tracked as `Support`. When you track a `Support` entry of that kind **it is important that you refer to an issue and provide a sound description** since no written contract or purchase order will help us track the request during reporting.

#### Support tags examples

Find below some examples of how to use those tags.

| Source | Event | Tag | Notes |
| ------ | ----- | --- | ----- |
| Client | `I can't remember how to insert a news on the site, can you help me?` | `Customer Care` | The customer can be expected to be trained on this, or to keep notes, so you are actually supporting it. |
| Client | `I need you to reschedule releases since the marketing asked` | `Project Management` | The customer can't do this without our involvement. This activity helps providing the correct service. |
| Team | `Let's take some time to groom the backlog and refine estimation` | `Project Management` | All partecipants have to track individual entries; despite this involves estimations, the activity is necessary to keep things on track and is not triggered by the client that needs cost-related information for his decisional process. That's why it is tagged as `Project Management`. |
| Client | `The site is not working as expected, we have filed a bug` | `Issue checking` and if it is indeed a bug, move time entry to `Warranty` | We will check the issue, the provided information and verify it is a bug (our fault). If this is the case the whole time spent will be classified as warranty effort. |
| Client | `I may need a new feature/an improvement; is this technically feasible?` | `Issue checking` | This may involve the whole team, in which case all will have to track under this task and tag. |
| Client | `Can you please provide an estimation for this new feature so we decide if we want to pay for it?` | `Estimation` | |
| Sales | `I need help from your team to estimate a new project` | `Estimation` | All partecipants have to track individual entries; If the new project falls under an existing main project, use the `Support` rolling task of the main project; in case of new clients with no main project, track the entries on `SparkFabrik Internal -> Sales` tagged as `Estimation`, and name the customer in the description. |
| You | `I really need to keep track of those request e-mails and set their priorities` | `Project Management` | There are customers that for contextual reasons won't use our tracker and will keep going the same old root. Our task is to keep things tidy and organized and this is management and ownership. |