
Installo behat e dipendenze

> composer require drupal/drupal-extension


creo un file behat.yml
con ad esempio il seguente contentut, avendo cura di sostituire base_url, files_path e drupal_root con quelli del nostro progetto:

```
default:
  suites:
    default:
      contexts:
#        - FeatureContext
        - Drupal\DrupalExtension\Context\DrupalContext
        - Drupal\DrupalExtension\Context\MinkContext
        - Drupal\DrupalExtension\Context\MessageContext
        - Drupal\DrupalExtension\Context\DrushContext
  extensions:
    Behat\MinkExtension:
      goutte: ~
      base_url: http://www.caleffi.sparkfabrik.loc/
#      selenium2:
#        wd_host: "http://phantomjs:8910/wd/hub"
#      files_path: '/var/www/html/web/features/files/'
    Drupal\DrupalExtension:
      blackbox: ~
      api_driver: 'drupal'
      drupal:
        drupal_root: '/var/www/html'
```

Per vedere quali sono gli steps presenti
>bin/e bin/behat -dl

Maggiori info qui https://behat-drupal-extension.readthedocs.io/en/3.1/

Creo una cartella
> features
nella root del progetto

Aggiungo una prima feature nella cartella appena creata, ad esempio test_anonymous.feature

Esempio di feature:

```
Feature: Test Caleffi Pages for errors

  As an anonymous user
  I want to test page responses and look for errors

  Scenario: Test Caleffi Pages
    Given I am an anonymous user
    And I am on the homepage
    Then I should get a 200 HTTP response
    And  I should see the text "Select your country"

    Given I am an anonymous user
    When I visit "italy/it"
    Then I should get a 200 HTTP response
    And  I should see the text "Page under construction"

    Given I am an anonymous user
    When I visit "italy/it/catalogo"
    Then I should get a 200 HTTP response
    And  I should see the text "Catalogo Prodotti"

    Given I am an anonymous user
    When I visit "italy/it/schematics"
    Then I should get a 200 HTTP response
    And  I should see the text "Come funziona?"

    Given I am an anonymous user
    When I visit "italy/it/sistemi-calore"
    Then I should get a 200 HTTP response
    And  I should see the text "Main menu Sistemi Calore"
```

Lancio i test
> bin/e bin/behat

