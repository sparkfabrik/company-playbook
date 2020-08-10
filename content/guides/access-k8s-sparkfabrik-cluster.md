## Introduction

Since late 2016 Sparkfabrik's internal services (Gitlab, CI/CD pipelines, SparkBoard, etc) are running into a Kubernetes cluster hosted on GKE/GCP.

This means that all intermediate environments other than local and production (so integrations, branch builds, epic builds, etc) run in pods into a Google Cloud Engine elastic cluster. The following guide will help you configure your local environment so that you will be able to access services inside pods, open shells into them, read relevant logs and - ultimately - devops all the things! :)

## Step 1: Authentication to Google Cloud

As said, the K8s cluster is running over Google Cloud infrastructure. To access it we first need to authenticate on GCP.  
Rejoy! Your `sparkfabrik.com` account is enough to perform authentication, but you'll need to open a terminal and [install `gcloud` CLI tool](https://cloud.google.com/sdk/install). Follow the link to get `gcloud` running on your OS.

Once done, you can authenticate running

```text
$ gcloud auth application-default login
```

Provide your `sparkfabrik.com` credentials.

Now configure the gcloud docker integration running:

```text
$ gcloud auth configure-docker
```

## Step 2: Accessing the K8s cluster

Access to the cluster and pods therein will happen using K8s CLI tool `kubectl`.

On MacOSX `gcloud` command has all that we need to make it work:

```text
$ gcloud components install kubectl
```

While Ubuntu users can enjoy `apt`:

```text
$ sudo apt install kubectl
```

Once `kubectl` is installed `gcloud` command will allow us to access the GKE cluster.  
`gcloud` CLI manages so many GCP services and areas that there are commands specific to each one. To tame the complexity, all commands are grouped and subgrouped.

Right now, the `container` group is what we need: it contains groups of commands by which we can manage GKE aspects, like clusters, node-pools, Container Registry images, and so on.

We are going to use a command in the `clusters` subgroup of the `container` group to gain access to the cluster. That command is `get-credentials` which fetches credentials for already running clusters.

Now, the `get-credentials` command takes a single parameter which is the **cluster name**. In our case it is `spark-op-services`. In additions there is a mandatory flag that specifies the region and the datacenter zone inside the region (namely, where is the cluster phisically running?): `--zone`.

Last but not least, there is a global flag (not specific to the `get-credentials` command), which is `--project`. Projects in GCP are similare to realms. Not to be confused with *K8s namespaces*, (quoting GCP docs)

> [...] projects form the basis for creating, enabling, and using all GCP services including managing APIs, enabling billing, adding and removing collaborators, and managing permissions for GCP resources.

So let's specify the correct `spark-int-cloud-services`, that is the project that holds all the production services in Sparkfabrik.

**Beware**: environment for customers' projects CI are not customers' assets, they are Sparkfabrik assets, payed and managed by us. That's why accessing these environments involves our production project!

After this long explanation, the following command should be clear:

```text
$ gcloud container clusters get-credentials spark-op-services --zone europe-west1-b --project spark-int-cloud-services
```
A laconic message should inform you that *kubeconfig generated an entry for spark-op-services*. No frills but you can pat yourself a shoulder. You're done.

## Step 3: Fetching info from clusters

OK, we gained access to the cluster. Mind that's the access is read only, but you have execution permissions (namely you can run `kubectl exec`) so you can enter running pods.

Let's test if our access is working after all. Run

```text
$ kubectl cluster-info
```

and you should get a response in the lines of

```text
Kubernetes master is running at https://<IP address>
GLBCDefaultBackend is running at https://<IP address>/api/v1/namespaces/kube-system/services/default-http-backend:http/proxy
Heapster is running at https://<IP address>/api/v1/namespaces/kube-system/services/heapster/proxy
KubeDNS is running at https://<IP address>/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://<IP address>/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy
```

If not check you followed all previous steps correctly.  
Mind though that depeding on permissions on your account the output of this command may differ and you can see only a subset of the information and/or a specific error message. Keep this in mind before banging your head to the wall.

## Step 4: Namespaces

We mentioned projects, which is GCP realms to address accountability, ACLs and other "administrative" aspects related to the GCP services.

Projects as never to be confused with **namespaces**. The concept of namespace here is intended as typical of Kubernetes: K8s namespaces allow to segment the same "physical" cluster in reserved spaces, like they are separate clusters.

This makes us sure critical ops won't concur for resources or won't hinder each other in case of malfunctioning, **at a cluster level**.

We use this feature to make sure each Gitlab project (again, not to be confused with GCP projects: we mean each customer or internal product) that needs build environments in Gitlab, lives in its own namespace.

Let's take a look at all namespaces available in the cluster:

```text
$ kubectl get ns
```

Here are a dummy response (since this is a public playbook):

```text
NAME                          STATUS    AGE
bunnies                       Active    293d
bunnies-demo                  Active    49d
default                       Active    1y
gizmo-website-d6              Active    99d
gizmo-website-d8              Active    4d
gitlab                        Active    345d
gitlab-test-envs-342          Active    23d
ingress-nginx                 Active    5d
kube-lego                     Active    345d
kube-public                   Active    1y
kube-system                   Active    1y
...
spark                         Active    345d
sparkfabrik-website-292       Active    245d
...
acme-website-304              Active    126d
acme-website-master-stage     Active    36d
acme-website-subsid-stage     Active    37d
acme-website-master-dev       Active    121d
```

Some of the preceding namespaces are real. As you can see names are pretty self-explaining (at least the ones related to projects). But if you are in doubt you can check Gitlab to see which namespace is in use by a specific Gitlab projects.  
Follow `Settings -> Integrations -> Kubernetes -> Namespace` in the project page to make sure (proper permissions may be necessary, ask your team leader if you can't access that section).

## Step 5: Pods

OK, so far we have this hierarchy:

```text
GCP Project foo
 └── Cluster bar
    ├── Namespace foo-bar-alpha
    ├── Namespace foo-bar-bravo
    └── Namespace foo-bar-charlie
```

Now, each namespace can contain pods. For simplicity think of pods like *docker containers with superpowers*.

Let's list all pods in a specific namespace, say `spark`.

```text
$ kubectl -n spark get pod
```
here is the result

```text
NAME                                        READY     STATUS    RESTARTS   AGE
artifacts-ssh-server-7d9b9db67b-wg4hh       1/1       Running   0          5d
cron-3028794900-znhs8                       1/1       Running   0          5d
dashboard-develop-499waf-849b7c95f9-4qxmr   1/1       Running   0          5d
playbook-locke-2261095262-8x8p2             1/1       Running   0          5d
```

This command components are:

* `kubectl` : the client - duh
* `-n spark` : use `spark` namespace
- `get pod` : list all pods

If we want to view the logs of a specific pod (like issuing `docker logs -f` on a normal container), try

```text
$ kubectl -n spark logs -f <pod-name>
```

for example

```text
$ kubectl -n spark logs -f playbook-locke-2261095262-8x8p2

npm info it worked if it ends with ok
npm info using npm@4.2.0
npm info using node@v7.10.0
npm info lifecycle locke-server@1.1.0~prestart: locke-server@1.1.0
npm info lifecycle locke-server@1.1.0~start: locke-server@1.1.0

> locke-server@1.1.0 start /srv/locke
> node server.js

Express HTTP server listening on port 80
GET /robots.txt 404 58.932 ms - 2387
GET /FAQ/who-to-talk-to-for 200 68.338 ms - 11073
GET /guides/an-introduction-to-docker 200 24.580 ms
```

Again, let's see what the command does:

* `kubectl` : ok, ok...
* `-n spark` : use `spark` namespace
- `logs -f` : spit logs and follow the output (like `tail -f` where `f` stands for *forever*)
- `playbook-locke-2261095262-8x8p2` : the pod name

So, to sum things up. Since each pod can be seen as a container and each container usually runs a single service (as per best practice), with this swiss-army knife command template:

```text
kubectl -n <namespace name> logs [-f] <pod name>
```

you can see the logs of a specific service, for a specific project.  
As a (almost) real life example *see apache logs for the ACME Drupal 8 website, develop environment* can translate to

```text
kubectl -n acme-dev logs [-f] drupal
```

## Step 6: Accessing pods command line

Now that we have logs we can debug 99% of the problems like a boss. Right?

Not really... accessing the shell may be a real boon, even to make live tests and assess the problem (or a solution) quickly.

To gain access to the shell we'll make use of the mentioned `exec` command of `kubectl` client. Let's try:

```text
$ kubectl -n spark exec -it playbook-locke-2261095262-8x8p2 -- /bin/bash
```

Ta-daaan. You should be logged to the terminal as root, as simple as that.

Dissecting the command we found:

* `kubectl` : enough of this, right?
* `-n spark` : again, use `spark` namespace
* `exec` : this works much like in Docker
* `-it` : the same Docker flags, meaning `interactive` and `tty`
* `--` : enforces what follows as positional parameter (shell stuff actually, not partaining to kubectl)
* `/bin/bash` : the shell to be executed (see below)

**Gotcha**: Please remind that not all containers have bash. Some (many actually) of them are based on Alpine Linux or other distros so the available shell may vary.  
Alpine for example sports `ash` so you may have to issue

```text
$ kubectl -n acme exec -it acme-ash-test -- /bin/ash
```

## Conclusions

This is a small recipe to get you started with our production K8s environments. From here up it's a matter of experience, docs reading and a bit of work by you to increase your devops skills.

Roll your sleeves and enjoy!
