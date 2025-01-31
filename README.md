# SparkFabrik playbook

This repository contains our [company playbook](https://playbook.sparkfabrik.com) (and possibly all the knowledge around our company-wide practices and policies), packed with a Raneto container to consult them.

## Signaling issues or improvement

To keep things simple, we are using the issues in this project to keep track of all improvements or ideas we'll have. If you notice something that can be made better and want to either signal it to the authors or work it out by yourself, please, open an issue on this project so that the commits can reference it.

## Contribute

The project was meant to be internal and all company members can clone the project and set up a local environment issuing `make`.  
After doing so, a local instance of the playbook will be available at `http://playbook.sparkfabrik.loc`.

To contribute you will need to open a pull-request towards the `master` branch of the project by referencing an open issue.
If you are willing to contribute content that is not covered by any open issue, you are invited to open one yourself, clarifying the nature of your contribution.

Please refer to the following sections the naming convention to the adopted on branches and pull requests.

### Pull request and commits naming convention:

Both commits and pull request titles should incorporate the issue number as so:

`refs #%%%: Title of the issue / commit message`

eg.

* `refs #232: Copilot subscription request update`
* `refs #232: README now mentions the procedures to open a PR`

### Branch naming convention:

Branch naming is based on the nature of the contribution, and should always mention the issue number, following these examples:

* `section/%%%-section-slug-title` for new sections (hardly they will be open by a company member, mostly it will be a matter of pre-made structure, but suggestions are welcome)
* `content/%%%-description-of-the-content` for content contributions of various nature, like typo corrections, adding a new procedure or policy, etc
* `recipe/%%%-recipe-slug-title` for new recipes
* `feature/%%%-feature-addition` for new features added to the playbook as a tool such as theme improvements, new plugins, etc

eg.

`git checkout -b content/232-copilot-procedure-and-readme-improvements`

## Guides

### Hide pages from home and menu

Using the metadata of the page, you have the option to hide it from the home menu or/and from the sidebar menu.

You can do so using the following options:
- `ShowOnMenu: false` will hide the page from the site menu
- `ShowOnHome: false` will hide the page from the home menu

### Public assets placement

**Raneto** will search for public files to be included in the pages starting from the active theme `public` folder, and then proceeding to the folder configured as `public_dir` in the `config.js` file, currently the `/assets` folder of the project.

For this reason, this is how you should place anything you need to link inside the pages:
- **content related assets**  should be placed in `/assets`. Images, documents, attachments referenced in the markdown files should go here.
- **frontend related assets** should be placed in `public` inside the `spark-playbook` theme folder. Fonts, compiled css and js, any external libraries, favicon, etc should be placed here, as long as the images that are referenced in the css files.

### Theme development

You can edit the `spark-playbook` theme in the `custom/themes/` folder.

Run `make theme-install-dep` to install all the dependencies needed to work on the theme.

* `make theme-watch` will trigger the watcher to allow you to work on the SCSS and JS files in the theme. At the end of watch lint task will be triggered.
* `make theme-build` will build the CSS & JS compiled in the theme folder for you.
* `make theme-lint` / `make theme-lint-fix` will trigger the lint to allow you to check if SCSS are correctly written and auto fix them.

> Please note that the docker image build will take care of the CSS & JS compiling for CI, Stage and Production, so you don't need to commit the compiled files. Check the `DockerFile` of the project for more details on this.

## What's inside

Basically this is the "SparkFabrik handbook". It is meant to be made public and contains all the information and recipes (hey) an employee has to know either before apply or during their everyday work.  
You will get the major benefit if you are either:

* A newcomer, recent hire or in you onboarding phase, to learn a lot of information on how we do what we do, how we communicate and which principles drive our decisions
* A person in search for a procedure or information on how to perform a non-frequent task, such as manually launching a build or reviewing an issue template
* In search for the correct policy to communicate something to someone or to share something in the right place

## What's NOT inside (and should never be)

SparkFabrik playbook is a public document. Since the recipes and articles show how we actually do things internally and provide transparent information to the world, the content should be **triple-checked not to contain credentials, secrets, customer-related information (screenshots of real issues for example), etc**.  

It may surely contain links to internal resources as long as they are not publicly available.

## Why

SparkFabrik grew a lot in its first year and it's now time to have a clear reference to either do stuff and take decisions.  

This is a living document, not a carved-in-stone divine law. It will evolve as we evolve and try to represent our way of being.

## Ownership

To date, the owner of this document is Paolo Pustorino (paolo.pustorino@sparkfabrik.com) but any management representative or company shareholder with an active role in the company is entitled to manage the official version on his behalf.
