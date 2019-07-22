
## Prerequisite

When you start working, commit your local changes and merge the integration branch (git commit -m '..' . && git pull)


## In pills

[] are optional.

* export your drupal configuration into sync directory (drush config-export sync)
* commit your drupal configuration
* pull or merge integration branch to get other devs changes
* resolve merge conflicts
* import the resulting configuration into your drupal installation (drush config-import sync)
* check that after the import everything in working as expected (better running tests)
* exort agiain your configuration (drush config-export sync) [this was suggested by Nuvole]
* [squash if submitting a MR]
* push your changes
* [create a MR on gitlab]
* be happy :)


## Slides by Nuvole

https://drive.google.com/open?id=0B3bEkSMDrX8YRzBrWkxkZ3FxQkk5UEJNMnktZS11UDZjc0hN

### Excerpt from this presentation:

![Slides by nuvole](%image_url%/procedures/drupal-8-development-workflow.png)
