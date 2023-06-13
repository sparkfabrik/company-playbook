## Projects environments general availability

Our CI pipelines build a lot of different environments for each project every day.  
Aside from branch-related pipelines built for automated testing purposes, we also have more stable environments like `staging`, `demos` or `develop`.

Those environments live on a Kubernetes cluster (see [Access Kubernetes SparkFabrik cluster](../guides/local-development-environment-configuration.md#log-into-gcloud)) which under load may scale well over 20 active nodes. To reduce costs **and** to enforce our policies on a healthy work/life balance, we leverage the dynamic nature of the cloud and scale the cluster down to 2 or 3 nodes after 8:00 PM. At 8:00 AM the environment respawns transparently.  
The same happens during the weekends, so you're not supposed to visit a staging environment on Sunday. We hope you got something better to do!

So, **if you try to connect to an environment during the _down phase_** and you get something like a _503 Bad gateway_ error, don't fire the alarm! As long as nobody on the operations team communicated scheduled or unscheduled maintenance activities, your environments will be up and running normally the next day.

## Special needs

Of course, your project may need a different treatment.

### I need my project to stay up permanently at night or during the weekend

No problem. Reach out to the operations team or write to <support@sparkfabrik.com> and we'll set it up according to the necessity.

### I have a demo/event/whatever during the weekend for a single time and I need a specific project environment to be up and running

Again, get in touch with the operations team or write to <support@sparkfabrik.com> but please **plan the event in advance** so that the team won't have to rush and the risk of errors is reduced.

### I occasionally need to work in the environment outside normal working hours

You can reprovision a shutdown environment by yourself. Just run the last deploy job in the project for the necessary environment. You don't need to re-run the whole build pipeline, just the deploy job. This will make the environment up and running up to the next working day.

## Urgent support

If none of the above work and something really bad is about to happen, reach out on Slack, phone or mail for:

* Paolo Mainardi
* Alessio Piazza
* Marco Giacomassi
