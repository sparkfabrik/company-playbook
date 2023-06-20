/*
Description: A set of policies we use while doing fronted on Drupal 8
Sort: 100
*/

## Table of Content

- [Table of Content](#table-of-content)
- [Purpose of this document](#purpose-of-this-document)
- [Tools](#tools)
  - [Frontend framework](#frontend-framework)
  - [CSS](#css)
- [CSS: architecture and guidelines](#css-architecture-and-guidelines)
  - [CSS architecture](#css-architecture)
    - [Principles](#principles)
    - [Best practices](#best-practices-for-css)
      - [Avoid reliance on HTML structure](#avoid-reliance-on-html-structure)
      - [Define component elements (sub-objects) using their own classes](#define-component-elements-sub-objects-using-their-own-classes)
      - [Extend components using modifier classes.](#extend-components-using-modifier-classes)
      - [Separate Concerns](#separate-concerns)
      - [Name Components Using Design Semantics](#name-components-using-design-semantics)
      - [Formatting Class Names](#formatting-class-names)
      - [Specificity, ids and !important](#specificity-ids-and-important)
      - [Case study and pitfalls](#case-study-and-pitfalls)
    - [File structure](#file-structure)
  - [CSS formatting guidelines](#css-formatting-guidelines)
- [Javascript](#javascript)
  - [Best practices](#best-practices-for-js)
  - [JavaScript and JQuery formatting guidelines](#javascript-and-jquery-formatting-guidelines)

## Purpose of this document

The target of this document is to share best practices and guidelines about HTML template development to build a visual frontend with Drupal 8.

## Tools

This is the full list of tools we use for theming’ s development:

### Frontend framework

* Bootstrap: [https://getbootstrap.com/](https://getbootstrap.com/)

### CSS

* SMACSS: [https://smacss.com/](https://smacss.com/)
* BEM: [http://getbem.com/introduction/](http://getbem.com/introduction/)
* SASS: [http://sass-lang.com/](http://sass-lang.com/)  - [https://css-tricks.com/sass-style-guide/](https://css-tricks.com/sass-style-guide/)

## CSS: architecture and guidelines

In this section, we present a summary of CSS architecture and the best practices we usually use to organize and build themes for Drupal 8.

To learn more about Drupal CSS coding standard look at the official community documentation: https://www.drupal.org/docs/develop/standards/css

### CSS architecture

#### Principles

The goals of good CSS should be:

* Predictable: CSS should be consistent and understandable. Changes should do what you would expect;
* Reusable: CSS rules should be abstract and decoupled, In the future new components should be built quickly from existing parts.
* Maintainable: As new components and features are needed, it should be easy to add, modify and extend CSS without breaking (or refactoring) existing styles.
* Scalable: CSS should be easy to manage for a single developer or large, distributed teams.

#### Best practices for CSS

##### Avoid reliance on HTML structure

* CSS should define the appearance of an element anywhere and everywhere it appears.
* Use classes to assign appearance to markup. **Never use id selectors in CSS**.
* Keep selectors short.
* If you are using SASS, do not use more than three levels of nesting. (see [https://css-tricks.com/sass-style-guide/](https://css-tricks.com/sass-style-guide/) for more information)
* Be careful when using multi-part selectors:
 * Avoid elements with no native semantics (div, span) in multi-part selectors.
 * Avoid the descendent selector (e.g. .my-list li) where possible, especially for components that may wrap other components. The descendant selector has a habit of unintentionally affecting nested elements. Prefer the child selector: `.my-list > li`.
 * Avoid more than 2 combinators in a selector. The following rule is maxed out: `.my-list > li > a`.

##### Define component elements (sub-objects) using their own classes
To avoid relying on markup structure and overly-generic class names, define a component’s elements explicitly, prefixing them with the component’s name followed by two underscores:

```
.component {}

/* Component elements */
.component__header {}
.component__body {}
```

Note that there is no need to reflect DOM structure in the class name: replace `.menu li a` with the class `.menu__link`.

##### Extend components using modifier classes.

Create component variants explicitly, adding a suffix with the variant name preceded by two dashes. To keep the stylesheet DRY, this modifier class should only contain the styles needed to extend the original. This means that both base and modifier classes must appear together in the markup:

*CSS*

```
/* Button component */
.button {
  /* styles */
}

/* Button modifier class */
.button--primary {
  /* modifications and additions */
}
```

*HTML*

```
<!-- Button variant is created by applying both component and modifier classes -->
<button class="button button--primary">Save</button>
```

##### Separate Concerns

Components should not be responsible for their positioning or layout within the site. Never apply widths or heights except to elements that natively have these properties (e.g. images have these properties, so it's okay to use CSS to modify their width and height). Within components, separate structural rules from stylistic rules.

Separate style from behavior by using dedicated classes for JavaScript manipulation rather than relying on classes already in use for CSS. This way, we can modify classes for style purposes without fear of breaking JS, and vice versa. To make the distinction clear, classes used for JavaScript manipulation should be prefixed with `js-`. These JavaScript hooks must never be used for styling purposes. See the section *Formatting Class Names* for more information on naming conventions.

Avoid applying inline styles using JavaScript. If the behavior is describing a state change, apply a class name describing the state (e.g. 'is-active'), and allow CSS to provide the appearance. Only use inline styles applied via JavaScript when the value of the style attributes must be computed at runtime.

Drupal 8 uses the SMACSS system (see documentation here: [https://smacss.com/book/](https://smacss.com/book/)) to conceptually categorize CSS rules. Some SMACSS nomenclature has been changed to avoid confusion with existing Drupal terminology.

* **Base**: Base rules consist of styling for HTML elements only, such as those used in a CSS reset or Normalize.css (see: [http://necolas.github.io/normalize.css/](http://necolas.github.io/normalize.css/) ). Base rules should never include class selectors. To avoid ‘undoing’ styles in components, base styles should reflect the simplest possible appearance of each element.
* **Layout**: Arrangement of elements on the page, including grid systems.
* **Component (In SMACSS: “module”)**: Reusable, discrete UI elements; components should form the bulk of Drupal’s CSS.
* **State**: Styles that deal with transient changes to a component’s appearance. Often, these are client-side changes that occur as the user interacts with the page, such as hovering links or opening a modal dialog. In some cases, states are static for the life of the page and are set from the server, such as the active element in the main navigation. The main ways to style state are:
 * Custom classes, often but not always applied via JavaScript. These should be prefixed with `.is-`, e.g. `.is-transitioning`, `.is-open`;
 * Pseudo-classes, such as `:hover` and `:checked`;
 * HTML attributes with state semantics, such as `details[open]`;
 * Media queries: styles that alter appearance based on the immediate browser environment.
* **Theme**: Purely visual styling, such as border, box-shadow, colors and backgrounds, font properties, etc. Ideally, these should be separated enough from a component’s structure to be “swappable”, and omitting these entirely should not break the component’s functionality or basic usability.

##### Name Components Using Design Semantics

**Class names should communicate useful information to developers** and should reflect design semantics over content semantics. In general, **they should reflect the intent and purpose of the design element they represent**.

Note that this does not preclude presentational class names. Grid system classes such as `.grid-3`, utility classes such as `.leader` and `.trailer` (for adding whitespace based on a baseline grid) and `.text-center` are all examples of presentational classes that represent visual semantics. They are meaningful to developers, and are highly reusable.

*Example*:

```
.notification {
  /* general styles for all notifications */
}
.notification--info {
  /* blue color adjustments */
}
```

##### Formatting Class Names

Class names should use full words rather than abbreviations. Styles for a button component should use e.g. `class=“button” ` rather than `class=“btn”`
Class names for components should always use a dash between words. Use `class=“button-group”` rather than `class="buttongroup" `.

Drupal uses a naming convention to make clear what a particular class is for and what other parts of the system it affects:

*Examples*

```
/* Component Rules */
.component-name
.component-name--variant
.component-name__sub-object
.component-name__sub-object--variant  /* this configuration should be uncommon */

/* Layout Rules */
.layout-layout-method  /* e.g. '.layout-container' */
.grid-*


/**
 * State Classes
 *
 * These are always applied via JavaScript, and describe a non-default state.
 */
.is-state  /* e.g. '.is-active' */

/**
 * Functional JavaScript Hooks
 *
 * When querying or manipulating the DOM from JavaScript, prefer dedicated
 * classes not used for styling (or the id attribute).
 * If using classes, prefix them with 'js-' to mark them for JS use.
 * These 'js-' classes should not appear in stylesheets.
 */
.js-behaviour-hook  /* e.g. .js-slider, .js-dropdown */
```

##### Specificity, ids and !important

* Avoid using the id selector in CSS. Although it should be avoided in CSS, there are many excellent uses for the 'id' attribute:
* A performant JavaScript hook;
* An anchor within the document for links *http://yoururl.com#anchor*;
* An anchor for associating labels with form elements or for associating DOM elements using ARIA attributes.

The !important flag should be used sparingly and appropriately and, generally, should be restricted to themes. Since it overrides all external stylesheet rules, it is useful for states that must supersede all others, no matter the component variant. Never use !important to resolve specificity problems for general CSS rules.

##### Case study and pitfalls

* An interesting example for Drupal CSS architecture: [https://www.drupal.org/docs/develop/standards/css/css-architecture-for-drupal-8#case-study](https://www.drupal.org/docs/develop/standards/css/css-architecture-for-drupal-8#case-study)

* Here there are some of common pitfalls about building Drupal CSS: [https://www.drupal.org/docs/develop/standards/css/css-architecture-for-drupal-8#pitfalls](https://www.drupal.org/docs/develop/standards/css/css-architecture-for-drupal-8#pitfalls)

#### File structure

Drupal 8 follows a **SMACSS-style categorization** of its CSS rules:

* **Base** — CSS reset/normalize plus HTML element styling.
* **Layout** — macro arrangement of a web page, including any grid systems.
* **Component** — discrete, reusable UI elements.
* **State** — styles that deal with client-side changes to components.
* **Theme** — purely visual styling (“look-and-feel”) for a component.

For more information about Drupal 8’s use of SMACSS and file organization, see the Separate concern section or official documentation:

* [https://www.drupal.org/docs/develop/standards/css/css-file-organization-for-drupal-8](https://www.drupal.org/docs/develop/standards/css/css-file-organization-for-drupal-8)

### CSS formatting guidelines

To learn more about guidelines of CSS formatting in Drupal see official documentation by the community:

* [https://www.drupal.org/docs/develop/standards/css/css-formatting-guidelines](https://www.drupal.org/docs/develop/standards/css/css-formatting-guidelines)

## Javascript

In this section, we present a summary of Javascript's best practices we usually use for Drupal 8.

To learn more look at official community documentation:

* [https://www.drupal.org/docs/develop/standards/javascript](https://www.drupal.org/docs/develop/standards/javascript)

### Best practices for JS

* **JavaScript code SHOULD NOT be embedded in the HTML** where possible, as it adds significantly to page weight with no opportunity for mitigation by caching and compression.
* **Code SHOULD use literal expressions instead of the new operator**:
 * Use `[]` instead of `new Array()`
 * Use `{}` instead of `new Object()`
* It is RECOMMENDED to use literal expressions instead of the wrapper forms `new Number`, `new String`, `new Boolean` in situations where the literal expression is the same. However, you MAY use object instances in which it matters:

```
var literalNum = 0;
var objectNum = new Number(0);
if (literalNum) { } // false because 0 is a false value, will not be executed.
if (objectNum) { }  // true because objectNum exists as an object, will be executed.
if (objectNum.valueOf()) { } // false because the value of objectNum is 0.
```

The with statement MUST NOT be used, since it is not possible to use with with enabled strict mode. Instead, you SHOULD use the explicit longer version:

```
foo.bar.foobar.abc = true;
foo.bar.foobar.xyz = true;
```

Alternatively, you MAY use references:

```
var o = foo.bar.foobar;
o.abc = true;
o.xyz = true;
```

* To prevent unreachable code, a return, break, continue, or throw statement SHOULD be followed by a `}` or case or default.
* **`eval()` SHOULD NOT be used**. The browser has to create an entirely new scripting environment (just like creating a new web page), import all variables from the current scope, execute the script, collect the result, and export the variables back into the original environment. Additionally, the code cannot be cached for optimization purposes. It is both the most powerful and most misused method in JavaScript.
* **You SHOULD NOT use the Function constructor**, and you SHOULD NOT pass strings to `setTimeout()` or `setInterval()`.
* When adding new HTML elements to the DOM, you SHOULD NOT use `document.createElement()`. For cross-browser compatibility reasons and also in an effort to reduce file size, you SHOULD use the jQuery equivalent `this.popup = $('<div id="autocomplete"></div>’)[0]` Avoid this:

```
this.popup = document.createElement('div');
this.popup.id = 'autocomplete';
```

### JavaScript and JQuery formatting guidelines

To learn more about guidelines of Javascript and JQuery formatting in Drupal see official documentation by the community:

* [https://www.drupal.org/docs/develop/standards/javascript/javascript-coding-standards](https://www.drupal.org/docs/develop/standards/javascript/javascript-coding-standards)
* [https://www.drupal.org/docs/develop/standards/javascript/jquery-coding-standards](https://www.drupal.org/docs/develop/standards/javascript/jquery-coding-standards)
