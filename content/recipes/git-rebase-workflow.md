

## Prerequisites

* develop is the integration branch
* redmine is the issue tracker
* we are using the project agile board on our issue tracker
* we are using gitlab as git server
* REPO is our project repository on git server (eg. gitlab@gitlab.sparkfabrik.com:sparkfabrik/company-playbook.git)

## Steps

Steps to follow to accomplish code serenity.

* clone repository (git clone REPO)
* pick you feature/user story to work from redmine project board
* create a new branch with the following name feature/[#issue id]_feature_title (git checkout -b feature/[#issue id]_feature_title)
* work on your story committing/pushing (git commit -m 'commit message'  )
* fetch develop branch, keep integration branch fetched (git fetch origin)
* when you are done rebase on develop (git rebase -i origin/develop [ -i is optional])
* [pick your commit and save]
* push to git server (git push)
* open a MR from your branch to develop on gitlab
* be happy

## More info

https://www.atlassian.com/git/tutorials/rewriting-history
