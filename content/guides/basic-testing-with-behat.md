## Prerequisites

* PHP 5+
* Composer command

*Note*: our local-development environment already satisfies all prerequisites.

## Install

Install behat and its dependencies

```
composer require drupal/drupal-extension
```

## Configure

### behat.yml

Create a `behat.yml` file in your project root folder,
please ensure to set `base_url`, `files_path` and `drupal_root` to match your project parameters

```
default:
  suites:
    default:
      contexts:
        - FeatureContext
        - Drupal\DrupalExtension\Context\DrupalContext
        - Drupal\DrupalExtension\Context\MinkContext
        - Drupal\DrupalExtension\Context\MessageContext
        - Drupal\DrupalExtension\Context\DrushContext
  extensions:
    Behat\MinkExtension:
      goutte: ~
      base_url: http://www.coesia.hart.sparkfabrik.loc/
      selenium2:
        wd_host: "http://phantomjs:8910/wd/hub"
      files_path: '/var/www/html/features'
    Drupal\DrupalExtension:
      blackbox: ~
      api_driver: 'drupal'
      drush_driver: 'drush'
      drupal:
        drupal_root: '/var/www/html/web'
      drush:
        root: '/var/www/html/web'
```

You can also add region mapping by adding (for example) the following to beaht.yml file:

```
      region_map:
        search bar: '.search-bar'
        corporate_left: '.site-header .corporate .large-6:first-child'
        corporate_right: '.site-header .corporate .large-6:last-child'
        corporate_left_mobile: '.site-header .mobile_inner-wr .mobile-corporate'
        corporate_right_mobile: '.site-header .mobile_inner-wr .mobile-corporate'
        header_menu_mobile: '.site-header .mobile_inner-wr'
        header_menu: '.site-header .main-menu-wr > columns'
        header: '.site-header'
        page_header: '.page-header-region'
        highlighted: '.highlighted'
        content_before: '.content-before_wr'
        sidebar_left: '.sidebar-left'
        footer: '.site-footer .columns:not(.large-6)'
```

### Phantomjs

Add a phantomjs container to your docker-compose.yml

```
phantomjs:
  image: cmfatih/phantomjs:latest
  entrypoint: phantomjs
  command: --webdriver=8910
```

## Create your first test feature

Create a folder named `feature` in the project root folder

```
mkdir ./feature
```

Add a feature with basic testing: create a `.feature` in the feature folder like this:

```
[nano|vi|whatever] feature/example/basic_test.feature
```

with the following content:

```
Feature: Example Test Project Pages

  As an anonymous user
  I want to test page responses and look for errors

  Scenario: Test Project Pages
    Given I am an anonymous user
    And I am on the homepage
    Then I should get a 200 HTTP response
    And  I should see the text "Select your country"

    Given I am an anonymous user
    When I visit "italy/it"
    Then I should get a 200 HTTP response
    And  I should see the text "Page under construction"

  Scenario: Test if fields  have been removed
    Given I log in as admin
    When I visit "italy/it/admin/reports/fields"
    Then I should get a 200 HTTP response
    And  I should not see the text "field_singlepg_learn_video_coll"
    And  I should not see the text "field_communiication_campaigns"
    And  I should not see the text "field_communication_brand_header"

```

## Run tests

When using our docker-based local dev environment, behat must be run in the container.
We provided a shortcut script that can be invoked by the host OS.

Run your tests by issuing

```
bin/e bin/behat
```

If you want to see which are the predefined steps available in the drupal extension, run

```
bin/e bin/behat -dl
```

## Additional information


http://www.slideshare.net/sparkfabrik/behaviour-driven-development-con-behat-drupal

https://behat-drupal-extension.readthedocs.io/en/3.1/

## Todo

* Example of phantomjs tests.
* Link to local dev environment guide and docker quick reference
