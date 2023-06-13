## Introduction

In 2016 we started a technical blog. We decided to keep it separated from the main site or institutional blog to avoid any possible conflict with marketing/PR/communication logic that could hinder the possibility, for every team member, to use his spare (or working) time to jot down a post on anything technical they found interesting.

Since static sites are all the rage now (and since it makes perfect sense they are :D) we based the blog on [Hugo](https://gohugo.io/), a great SSG written in go. Portable, fast and very well documented, it supports [Markdown](https://it.wikipedia.org/wiki/Markdown) for pages and posts, has themes and other amazing sweet things.

We also went with [GitHub Pages](https://pages.github.com/) and host the code of the blog on a public GitHub project. The idea is to allow other contributors to fork the code and provide fixes, addenda or whole new guest articles.

There are no comments on the blog. We prefer to promote posts on social networks and engage in discussions there.

## Folder structure

Even if you are encouraged to read Hugo's documentation to learn how it works, here is an overview of what you have in the project repo:

```bash
.
├── output
│   ├── 2016
│   ├── archive
│   ├── css
│   └── ... 
├── scripts
│   └── ... 
└── src
    ├── archetypes
    ├── content         <--- Content goes here
    │   ├── page
    │   └── post
    ├── data
    ├── layouts
    │   └── archive
    ├── public
    ├── static          <--- Assets (images, files) go here
    │   ├── img
    │   └── posts
    │       ├── 20170119-post-1
    │       ├── 20170321-post-2
    │       └── ...
    └── themes
        └── spark
```

The two locations involved in posts/articles contributions are marked out.

* `src/content` is where posts and pages markdown belongs. It is very uncommon to contribute new pages in our context, so this is out of the scope of this guide. The `src/content/post` folder is where you want to put your new masterpiece, generating a new file (will elaborate later on this).  
* `src/static` is the place to put any image, file, and binary that comes with your post. Having them here will allow you to reference and link them in your markdown; Hugo will then copy them in the right position when you regenerate the static site. Mind that `src/static/img` is used for the general layout assets: you have to store post assets in a subfolder of `src/static/posts`, named like your post title to keep consistency (more information follows). 

## Preliminary steps

If you are working out your first contribution, you will have to add an _Author biography_ entry to the `src/config.toml` file. The file content consists of a [TOML](https://github.com/toml-lang/toml) header and a Markdown body. For some reason, all GO developers seem to be in love with TOML. You could use YAML instead, Hugo understands both. We kept the config file in standard format amyway.

Back on track: you have to add an entry to the `[Params.Authors]` collection in the file, like this one:

```toml
    [Params.Authors.LeanJohn]
      name = "John Doe"
      role = "Lean Neveloper"
      picture = "http://www.sparkfabrik.com/images/team/leanjohn.png"
      bio = "Night rider, death dealer, storm bringer. Loves to quote Judas Priest songs. Blindly apply a make it 'till you fake it attitude."
      github = "http://www.github.com/leanjohn"
      twitter = "http://www.twitter.com/leanjohn"
```

Please, substitute the ake data above with your (hopefully) serious ones.

Now you also have to add your data to the `src/content/page/team.md` file. Despite its extension, this file mostly contains pure HTML and is static. That's why you have to manually add an entry to it (improvements on this are welcome).

You will have to add a code block before the closing `</div>` tag. Places where your data go are marked out with `{{ fake text }}` in the code below. Please get rid of all of them (curly braces included) and put actual data in place.

If you are contributing an article to our blog this is not supposed to be difficult! ;)

```html
<div class="row row-top-margin">
  <div class="col-md-12">
    <h4>{{ John Doe }}</h4>
    <img src="http://www.sparkfabrik.com/images/team/{{ leanjohn }}.jpg" alt="{{ John Doe }}" class="img-rounded pull-left avatar">
    <i>{{ Lean Neveloper }}</i>
    <p class="small">{{ Night rider, death dealer, storm bringer. Loves to quote Judas Priest songs. Blindly follows the make it 'till you fake it philosophy }}</p>
    <ul class="list-inline">
      <li> <i class="fa fa-github"></i> <a href="http://www.github.com/{{ leanjohn }}">Github</a> </li>
      <li> <i class="fa fa-twitter"></i> <a href="http://www.twitter.com/{{ leanjohn }}">Twitter</a> </li>
    </ul>
  </div>
</div>
```

Check your changes locally loading http://tech.sparkfabrik.loc/page/team/.

## Writing an article

You are now ready to conquer the web with your knowledge and verve.

### Create post file

Add a markdown file in `src/content/post`. The file name **must** match this format

> `YYYYMMDD_title_slug.md`

where, needless to say, `YYYYMMDD` is the reverse date format the post is written. Mind that you can take a while to finish your post or, maybe, we can agree on delayed publishing, for example, if a teammate just published a new post and publishing another one would lower the visibility of both... well, anyway be prepared to fix the filename before it can be merged in production.

### Add the post header to the file

Here is a sample conventional code you must adhere to:

```markdown
  1 +++
  2 date = "2017-03-04T14:47:30Z"
  3 draft = false
  4 title = "A wonderful new post - Jurney to the fame and back"
  5 description = "An experiment on becoming famous saying almost nothing. With PHP. And cookies."
  6 tags        = [ "php", "fake", "cookies", "fame" ]
  7 topics      = [ "PHP", "Fake stuff", "Biscuits" ]
  8 author = "LeanJohn"
  9 +++
```

Again this is TOML but you can use YAML also, just use minus signs instead of plus to mark the header's start and finish sections.

Some of the lines above are very important:

* `date` must be set to the publication date, so your new article appears atop the older ones. This should ideally match the file name (as described above), so it will be the last thing you'll edit before the contribution will be accepted and merged into the release branch.
* `draft` controls if the article is visible in production. Since we don't go to production until the post is approved and merged you'll probably keep this set to `false` even while working it out. Still, it can be useful to control a flow of pre-written publications, already merged in production.
* `title` and `description` have to be set so page title, post title and other metadata are set for search engines and for the user who stumbles upon a link to your piece.
* `author` must match the key of your `[Params.Authors]` entry in `config.toml` (see above). In our example, we used `[Params.Authors.LeanJohn]` as a key, so we kept the example consistent.
* `tags` and `topics` are other metadata that currently have no effect from a user perspective. Use them at your own discretion; if in doubt spy what your mates have done in other posts and keep things consistent.

### Add your post text

Under that block, please add your markdown as you normally would with any other markdown-based product, **but beware** that since an `h1` is used to print the page title by Hugo, your document sections hierarchy must start from `h2`, so your first-level titles should be like:

```markdown
## My title

Text text text ...

## Let's move on

More more text ...

### Subchapter

Moving to a new level

### Another subchapter

Is nice to stay at level 3...

## Closing thoughts

This text closes my thoughts
```

One more thing to take into account is how to link assets (images etc). You have to place your post assets in `src/static/posts/your-article-title`. To reference them in your markdown you can then build a relative URI like `/posts/your-article-title/awesome-image.png`.

To use an image for example you will want to insert

```markdown
![This is an awesome alt text](/posts/your-article-title/awesome-image.png)
```

## Peer-review workflow

We are using the typical GitHub contribution flow, based on pull requests, so:

* Fork the repo on your private account
* Work your post out on either `dev` branch or a feature branch, as you see fit
* Before sending a PR, fetch upstream and rebase your work upon a fresh `dev`
* Send a PR when your post is done and address any possible feedback

Deploy occurs automatically on PR merge, so sit back and enjoy fame.

**NOTE**: a quick checklist is available [as a procedure](../procedures/tech-blog-contributions-checklist.md) page.

## External contributions

In case you are reading this and want to contribute fixes or addenda to a present article, all the above apply, but keep in mind you should credit yourself for your contribution. A good format is this:

```markdown
**EDIT**

Here is a valuable contribution to this post, so that I can fix a misleading and outdated information.

*Contributed by [@yourNick](link what you want) on DD/MM/YYYY.*

**END EDIT**
```

Please, keep the European date format in the last line.

If you want to contribute a guest article, please contact us so we can work out a solution to add your bio, without having it on the team page.
