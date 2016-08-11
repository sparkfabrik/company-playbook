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
  |    -- 2016081101 - 2016 development
  |    -- 2016081102 - Maintenance
  |    
  -- Sales REST API
       |
       -- 2016081103 - v1.0 Development
       -- 2016081104 - Maintenance
```

The keys are:

* The task partains to the right project for the right client
* The task name contains a reference to the offer id
* The task name contains an intuitive description for the developers


## Redmine

### Create main "Customer" project

### Create project

### Enable standard plugins

### Add members to the project

### 
