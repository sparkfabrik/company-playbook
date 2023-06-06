
## Prerequisite

When you start working, commit your local changes and merge the integration branch `git commit -m '..' . && git pull`

## In pills

* Export your drupal configuration into the sync directory: `drush config-export sync`
* Commit your drupal configuration
* Pull or merge integration branch to get other devs' changes
* Resolve merge conflicts
* Import the resulting configuration into your drupal installation: `drush config-import sync`
* Check that after the import everything is working as expected (better running tests)
* Export again your configuration: `drush config-export sync` (credits to Nuvole for this suggestion)
* **OPTIONAL** Squash if submitting a Merge Request
* Push your changes
* **OPTIONAL** create a Merge Request on GitLab
* live happily forever after :)


## Slides by Nuvole

Find a backup copy of Nuvole's slides on our [Google Drive](https://drive.google.com/open?id=0B3bEkSMDrX8YRzBrWkxkZ3FxQkk5UEJNMnktZS11UDZjc0hN).

### Excerpt from this presentation:

![Slides by nuvole](%image_url%/procedures/drupal-8-development-workflow.png)
