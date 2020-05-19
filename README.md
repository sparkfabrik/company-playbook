## SparkFabrik playbook

This repository contains our [company playbook](https://playbook.sparkfabrik.com) (and possibly all the knowledge around our company-wide practices and policies), packed with a Raneto container to consult them.

## Contributions

So far the project is meant to be internal, all company members can clone the project and set up a local environment with the command `docker-compose up -d`. 
After that, a local instance of the playbook will be available at `http://playbook.sparkfabrik.loc`.

To contribute provide pull-requests towards `master` branch. The naming convention for the branches is:

* `section/section-slug-title` for new sections (hardly they will be open by a company member, mostly it will be a matter of pre-made structure, but suggestions are welcome)
* `content/description-of-the-content` for content contributions of various nature, like typo corrections, adding a new procedure or policy, etc
* `recipe/recipe-slug-title` for new recipes

A broad list of still-to-be-stubbed contents can be found on this Trello board (restricted access to the management board, so far): https://trello.com/b/uJMBxjZZ/sparkfabrik-playbook-and-documentation.  
A new board will likely be spawned to act as a "parking lot" for changes to this playbook and to track the contents proposals and issues.

## Theme

You can edit the `spark-playbook` theme in the `custom/themes/` to match the styles and settings of your new project, you won't need to change the machine name of the theme.

`make theme-install-dep` will install all the dependencies in the theme folder for you.

`make theme-build` will build the CSS & JS compiled in the theme folder for you.

`make theme-watch` will trigger the watcher to allow you to work on the SCSS files in the theme. At the end of watch lint task will be triggered.

`make theme-lint` / `make theme-lint-fix` will trigger the lint to allow you to check if SCSS are correctly written and auto fix them.

The PHP docker image will take care of the CSS & JS compiling for CI, Stage and Production, so you don't need to commit the compiled files.

## Signaling issues or improvement

To keep things simple, we'll use gitlab issues to keep track of all improvements or ideas we'll have. If you notice something that can be made better and want to either signal it to the authors or work it out by yourself, please, open an issue on gitlab so that the commits can reference it.

## What's inside

Basically this is the "SparkFabrik handbook". It is meant to be made public and contains all the information and recipes (hey) an employee has to know either before apply or during her everyday work.  
You will get the major benefit if you are either:

* A newcomer, recent hire or in you onboarding phase, to learn a lot of information on how we do what we do, how we communicate and which principles drive our decisions
* A person in search for a procedure or information on how to perform a non-frequent task, such as manually lanching a build or reviewing an issue template
* In search for the correct policy to communicate something to someone or to share something in the right place

## What's NOT inside (and should never be)

SparkFabrik playbook is a public document. Since the recipes and articles show how we actually do things internally and provide transparent information to the world, the content should be **triple-checked not to contain credentials, secrets, customer-related information (screenshots of real issues for example), etc**.  

It may surely contain links to internal resources as long as they are not publicly available.

## Why

SparkFabrik grew a lot in its first year and it's now time to have a claer reference to either do stuff and take decisions.  
This is a living document, not a carved-in-stone divine law. It will evolve as we evolve and try to represent our way of being.

## Ownership

To date, the owner of this document is Paolo Pustorino (paolo.pustorino@sparkfabrik.com) but any management representative or company shareholder with an active role in the company is entitled to manage the official version on his behalf.
