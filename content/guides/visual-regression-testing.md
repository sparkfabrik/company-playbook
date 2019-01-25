## Introduction

[Some info about VRT]

We introduced [BackstopJS](https://github.com/garris/BackstopJS) as favourite tool of Visual Regression Testing.

## Using BackstopJS

BackstopJS documentation is rather exhaustive, but we think it's usefull to give you some clues that can save you time and effort.

### Basic scenario
For now, we don't use any package manager to install BackstopJS, we just have some versioned folder and files in our starting project.

```bash
.
├── backstop_data
│   ├── bitmaps_reference
│   ├── scipts
        └── ...
└── backstop.json
```

For now, we're not interested in what is inside the `scripts` folder. What we do need to start testing is the file `backstop.json`. Here we setup the scenarios and BackstopJS will do the magic.

Before writing any scenario, we need to define an `id` and the `viewports`. We can write down as many viewports as we want, but just keep in mind that every viewport means a screenshot, so you can find yourself submerged by a very large amount of screenshots to check. So try to find a good balance and set only the viewports you **really** need to test.

Now you're going to write your first scenario.

Here you must define two required properties: `label` and `url`. All the others properties are not required, but we would add some for better testing results.
* `delay` is usefull to make all the page load before we take a screenshot
* `selectors` lets you define an array of selectors to capture, so for example you could screenshot only the visible viewport (default to `document`)
* `hideSelectors` set _visibility: hidden_ to an array of selectors, that's particularly usefull when we have high-frequency content changes (for example real-time data); **note**: we can alternatively use `removeSelectors` if we want that nodes to be removed from the page flow (this property set a _display: none_ on the selectors)

#### Example of basic configuration

```
{
    "id": "test-website",
    "viewports": [
        {
            "label": "phone",
            "width": 320,
            "height": 480
        },
       {
            "label": "tablet",
            "width": 768,
            "height": 1024
        },
        {
            "label": "desktop",
            "width": 1280,
            "height": 1024
        }
    ],
    "onReadyScript": "puppet/onReady.js",
    "removeSelectors": [],
    "scenarios": [
        {
            "label": "Homepage",
            "url": "http://nginx/",
            "delay": 1000,
            "hideSelectors": [
                "#api-values"
            ]
        }
    ],
    "paths": {
        "bitmaps_reference": "backstop_data/bitmaps_reference",
        "bitmaps_test": "backstop_data/bitmaps_test",
        "engine_scripts": "backstop_data/engine_scripts",
        "html_report": "backstop_data/html_report",
        "ci_report": "backstop_data/ci_report"
    },
    "report": [
        "browser"
    ],
    "engine": "puppeteer",
    "engineOptions": {
        "args": [
            "--no-sandbox"
        ]
    },
    "asyncCaptureLimit": 5,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false
}
```


### Commands

BackstopJS has few commands, well documented. In relation to our current configuration with Docker Compose, you'll need to run BackstopJS commands this way:

```bash
docker-compose run --rm backstopjs [command]
```

### Start testing
First you need to generate the reference images with `backstopjs reference`. In these screenshots you'll see only the defined selectors (the whole document if none is defined), with relative hidden or removed elements (based on what you defined in the scenario).

Now you're ready to test!

Make your changes to CSS, then run `backstopjs test` and check the report.

If you made a modification to your code and you know some references need to be updated, you can run tests and then `backstopjs approve` to promote test results to references. This way you don't need to regenerate all the references and you'll commit only the new ones (you'll also avoid permission problems due to the root user generating the references).

**Note**: if you need to run a single scenario, just add the flag `--filter='[label]'` after che `test` command; you can use this as a trick when you want to promote only some of the new test-generated images to references.

### Advanced settins and user interactions

You can add more properties to scenarios to refine your capture or to simulate user interactions.

It's possible to add specific viewports to override the default ones, to specify selectors to click or hover, to add delay and so on.

**Note:** you can find lots of details in the official documentation, but if you stumbled upon an issue that's not covered there, we'll be happy to update this doc for future reference.

It's important to point out that a single scenario can generate multiple screenshots. This is most important when we need to test user interactions more complex than a single click.
> A scenario represents a single state for your app. Given that state, a screenshot will be generated for each DOM selector you specify.

_Source: [Is there a way to make multiple screenshots per scenario?  #406](https://github.com/garris/BackstopJS/issues/406)_

**Note:** for now, this seems to be an issue, as stated on [two times clickselector or clickselectors doesn't seem to work #807](https://github.com/garris/BackstopJS/issues/807)

#### Example of advanced scenario

```
        {
            "label": "Offcanvas",
            "url": "http://nginx/",
            "delay": 1000,
            "clickSelectors": [
                "[data-open='left-off-canvas-menu']",
                ".my-menu-item"
            ],
            "postInteractionWait": 1000,
            "selectors": [
                "viewport"
            ],
            "viewports": [
                {
                    "label": "phone",
                    "width": 320,
                    "height": 480
                },
               {
                    "label": "tablet",
                    "width": 768,
                    "height": 1024
                }
            ]
        }
```