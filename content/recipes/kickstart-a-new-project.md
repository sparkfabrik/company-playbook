This section is a sort of walkthrough on what have to be done - tools and data wise - to claim a project is "ready to start".

This process is in charge to the **team leader**, with the aid of accountant and sales.

## Toggl

**In charge to**: `Accountant`

Information about contracts are no held by Redmine, but by Toggl instead.
This means team-members have to know which contract they have to track time onto.

To achieve this, we use the _Project/Task_ feature of Toggl, following this schema:

```
Customer
  |
  -- Project
       |
       -- Task (Contract) 1
       -- Task (Contract) 2
       -- ...
```

For example, our the customer *ACME* wants us to build and maintain both their corporate site and their sales-supporting REST API.
We agree for _four_ orders:

1. 2016081101 - New corporate site development
1. 2016081101 - Corporate site maintenance
1. 2016081103 - Sales REST API development
1. 2016081104 - Sales REST API maintenance

(please, mind the different offers ids)

the structure of project-tasks in Toggl may become

```
ACME
  |
  -- Corporate Site
  |    |
  |    -- 22016 development [016081101]
  |    -- Maintenance [2016081102]
  |
  -- Sales REST API
       |
       -- v1.0 Development [2016081103]
       -- Maintenance [2016081104]
```

The keys are:

* The task partains to the right project for the right client
* The task name contains a reference to the offer id
* The task name contains an intuitive description for the developers


## Redmine

### Create main "Customer" project (if need be)

**In charge to**: someone who is Administrator on Redmine

Redmine allows projects to contain subprojects.
To keep things well organized we use to create an _parent_ project for each customer so that:

* Top-right select menu is easier to navigate for those of us who see a lot of projects
* All information partaining to a customer, which impacts on all projects for that customer (say access credentials, contacts, workflow modifications, customer-related policies, etc) can be stored in the main project's wiki.

We generally don't want subprojects to have Wikis: project documentation is hold in the project's repository using our [Raneto-based docker image](https://github.com/sparkfabrik/docker-node-raneto) - _hint: if you start the project out of a base repository of ours, all is already in place_.

If the customer is a new one, you'll have to create a main project for it. Here's how:

    @todo insert screenshot of a project form properly filled

* Name you project as the customer (say: _ACME Ltd_ or _Great Company Inc._)
* Populate the _Description_ textarea with this template

  ```
  *Main project*
  This holds all customer's related subproject and the general customer's Wiki
  ```

* The _Identifier_ fiels is important: choose a **short** machine-name for this project. Ideally it can be as short as the client initials, since it will prepend all subprojects identifiers. (i.e. _ACME Ltd._ &rarr; `acme`, _Great Customer Inc._ &rarr; `gc` or `grcu`)
* The _Public_ checkbox must be left off, as well as the _Subproject of_ and _Inherit member_
* In the _Modules_ subsection, disable all modules but _Wiki_ and _Wiki extensions_, unless your main project refers to an agency/provider (so different subprojects refer to different final customers and will have their own wiki)

### Create project

**In charge to**: someone who is Administrator on Redmine

Create new project on Redmine, with the following settings:

* Name you project **in a meaningful way**
  `New site` is bad, `Corporate site redesign 2016` is good. Also avoid putting the customer's name in it again (say `ACME - Corporate site redesign 2016`), since the project is namespaced in its identifier (see below)
* Populate the _Description_ textarea as you see fit. Mind to not disclose information if the customer must have access to the project.
* Populate _Identifier_ field with a short and matching machine name, namespaced by the main project's identifier (in the previous example it was `acme` or `grcu`, so `acme-corpsite-redesign-2016` or `grcu-sales-rest-api` are good examples)
* The _Public_ checkbox must be left off
* Select the right customer's project in  _Subproject of_ select and check _Inherit member_ as you see fit

#### Enable standard plugins

In the _Modules_ subsection:
* Make sure _Wiki_ and  _Wiki extensions_ are **disabled**, unless your main project refers to an agency/provider (so different subprojects refer to different final customers)
* Make sure _Issue tracking_, _Time tracking_ and _Agile_ plugins are **enabled**
* Activate other plugins as you see fit (leave disabled in doubt, less fuss, less troubles)


#### Add members to the project

Once the project has been created, visit the project's _Settings_ page (last tab in the project's menu), _Members_ subtab.

Add all project members, with those roles:

* _Manager_ to Team Leader (he will make other senior dev managers if the need arise)
* _Developers_ to other team members


### Create first project version

    @todo move this introduction to a non-recipe file in the playbook!

We don't develop products so we actually don't need "versions" in the classic acception, like [semantic versioning](http://semver.org/).

We then use versions to keep the pace of project development milestones. We have two policies depending on the management strategy.

* Scrum and scrum-like projects use versions to mark _Sprints_
* Kanban projects use versions to group issues that belong to the same requiremet group (may be a deploy date or a broad-lines requirements bucket)

No matter what, define a first version for your project:

* Visit the project's _Settings_ page (last tab in the project's menu), _Versions_ subtab
* Click on _New version_ link at the bottom of the list (which so far should be empty)
* Insert `SPRINT-1` for scrum-like projects or an identifier for the first milestone/group (i.e. `2016-07-31 Deploy`) for kanbans
* (Optional) Set the end date, so we know when the sprint is supposed to finish or when the expected delivery is
* Save and done


## Slack

**In charge to**: team leader

Open a Slack channel for the project in the form `<client id>-<project id>` (i.e. `#acme-site`, `#grcu-api`) and invite all team members.

In case of small projects, maintenance or if it sounds good enough, a simple channel with the customer's name is ok (i.e. `#acme) but please avoid having too noise in the same place!

In case external developers, customers, partners or other people have to access Slack, open a whole new slack with the name `SparkFabrik - <project name>` or `SparkFabrik - <customer name>` and invite all involved people.



### Project info slack responses

* Go to https://sparkfabrik.slack.com/customize/slackbot to add project responses

* Add responses for example

When someone says | Slackbot responds
--- | ---
help coesia | available commands: envs, docs
help coesia envs | Jenkins: http://ci.coesia.hart.sparkfabrik.com/ (night/3v0lv3_n0w) - Dev: http://dev.coesia.hart.sparkfabrik.com (stage/stage)


### Add Jenkins integration

* Go to app config on slack (example https://sparkfabrik.slack.com/apps/A0F7VRFKN-jenkins-ci)

* Click on "Add configuration"

* Copy the integration token and use it in jenkins where required


### Add Gitlab integration

* Go to app config on slack (ie https://sparkfabrik.slack.com/apps/A0F7XDUAZ-incoming-webhooks)

* Click on "Add configuration"

* Create a configuration and copy the "Webhook URL" field content

* Go to gitlab setting for your project (example https://gitlab.sparkfabrik.com/h-art/coesia/services) and click on "Slack"

* Click on active and paste the url into "Webhook" and save


## Team group on GMail

**In charge to**: management representative

A group to broadcast mails to the team must be created on GMail.

Ask someone with the owner permissions on Sparfabrik's _Google Apps for Work_ account to create a group with the following properties

* The group name must follow the template: `Sparkfabrik - <Project> Team` (mind the case!)
* Add all Team Leaders and management representatives who are involved as **onwers** of the group
* Add all developers as **members** of the groups

**IMPORTANT NOTE**: by convention this group contains Sparkfabrik team members only. **Do not** add external users to the group to avoid leaking of classified information.
