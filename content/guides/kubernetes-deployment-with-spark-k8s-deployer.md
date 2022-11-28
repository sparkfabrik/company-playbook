/*
Title: Kubernetes deployment with spark-k8s-deployer
*/

In order to simplify the deployment of applications into Kubernetes clusters (which we use extensively!), we use a [custom-built container image](https://github.com/sparkfabrik/spark-k8s-deployer) that provides:
* Gitlab CI templates and fragments
* common tools
* utility scripts

The deployment scripts also provide a handy setup for helm, which is already connected to the SparkFabrik helm charts registry.

## Tools

* Cloud vendor CLIs
  * Google Cloud SDK
  * AWS CLI
* Deployment and containers management tools
  * docker / docker-compose / buildx
  * kubectl
  * helm
  * flux

## How to use it

(Note: describing the syntax of Gitlab CI pipelines description is out of scope, here)

When you create Gitlab CI pipelines for one of our projects, you can take advantage of the templates available from spark-k8s-deployer. Some of them can be seen as general-purpose templates: you just need to include them, and create your deployment jobs invoking the scripts, maybe passing several environment variables. This is the most common use of the image, but you can also look at more elaborate templates, that are available and self-documented (see comments) in the spark-k8s-deployer repository.

### Examples

Let's start with the most general-purpose template…

```yaml
# Use the general-purpose template
include:
  - remote: "https://raw.githubusercontent.com/sparkfabrik/spark-k8s-deployer/master/templates/.gitlab-ci-template.yml"

stages:
  - deploy

develop-deploy:
  stage: deploy
  variables:
    KUBE_NAMESPACE: test-spark-k8s-deployer
    SPARK_PRJ_VENDOR: test-spark-k8s-deployer
    CI_DOMAIN: ci.sparkfabrik.cloud
    CI_ENVIRONMENT_BASE_URL: ${CI_COMMIT_REF_SLUG}.site.${SPARK_PRJ_VENDOR}.${CI_DOMAIN}
  environment:
    name: ${CI_COMMIT_REF_SLUG}/test-spark-k8s-deployer
    url: https://${CI_ENVIRONMENT_BASE_URL}
  script:
    # Init
    - command /scripts/helm3-init
    # Install application using an helm chart from our repository
    - helm upgrade --install nginx sparkfabrik/nginx
      --version 5.0.0
      --set image=some.container.registry.io/some-nginx-image
      --namespace ${KUBE_NAMESPACE}
      --wait
  only:
    - develop
```

This example should work out-of-the-box if you use an NGINX image suitable for use with our Helm chart.
