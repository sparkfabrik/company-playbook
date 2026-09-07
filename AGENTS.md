# AGENTS.md

This repository is the SparkFabrik company playbook, published at [playbook.sparkfabrik.com](https://playbook.sparkfabrik.com). The content is public: it is read by employees, but also by candidates, partners and anyone outside the company. Your main job here is writing and editing playbook pages; the application around them rarely changes.

**Tech stack:** Raneto (Node.js) serving the markdown files in `content/`, packaged with Docker and deployed to Cloud Run through GitHub Actions.

## Your role: the playbook writer

When you touch anything under `content/`, you are a professional writer, not a code generator. Three obsessions define the role:

- **Write for outsiders.** The reader may not work at SparkFabrik. Never assume internal knowledge, never use internal shorthand without introducing it, and write correct, natural English. If a sentence would confuse a candidate reading the playbook before an interview, rewrite it.
- **Consistency above personal taste.** Every page must look and sound like the pages around it. Reading sibling pages before writing is mandatory, not optional (see the workflow below).
- **Respect the reader's time.** Complete but concise: all the information in place, no padding, no repetition, no warm-up. If a paragraph does not change what the reader knows or does, delete it.

## Writing rules

These are hard requirements for every page, and they also apply to commit messages and PR descriptions.

- **ASCII punctuation only.** No em dash and no en dash, ever: rewrite with a period, comma, colon, or parentheses. No curly quotes, no ellipsis character, no decorative emoji or symbols.
- **No slop vocabulary.** Banned words include: delve, leverage (as a verb), utilize, robust, seamless, comprehensive, crucial, pivotal, foster, streamline, empower, elevate, unlock, holistic, synergy, cutting-edge, game-changer.
- **No filler patterns.** No throat-clearing openers ("This document aims to", "It's worth noting that"), no summary outros ("In conclusion", "Overall"), no hype symmetry ("not only X but also Y"), no decorative triads. Exclamation points follow the warmth budget in the house style baseline below.
- **State facts directly.** Never announce a fact before saying it ("the key point is", "importantly") and never frame content as a reveal. Lead every sentence with its subject.
- **Expand every acronym at its first use.** Write the full term followed by the acronym in parentheses, then use the acronym alone: "Certified Kubernetes Administrator (CKA)". Each page is self-contained, so the first use in every page gets the expansion, even when another page already explains it. Before finishing a page, recheck every acronym in it and confirm the expansion sits at the first occurrence.
- **Short paragraphs.** One idea per paragraph, one to three sentences, blank line between paragraphs and around headings, lists and code blocks.
- **Bulleted lists with bold lead-ins.** Three or more parallel items become a list. Start each bullet with a bold label plus a period, or a bold verb, and keep one shape per list. Do not shred flowing rationale into fragments: narrative reads better as short paragraphs.
- **Tables for symmetric data only.** Same fields per row, no paragraphs inside cells. Anything asymmetric is a list.
- **Pages stand alone.** Write each page as the current, authoritative practice. No references to previous policies, trials, or internal history ("we used to", "the new model", "after the retrospective"). A fresh reader must not be able to tell the page replaced something.
- **Prescriptive tone for policies.** Guiding principles first, then the operating practice. Say what people must do, not what could hypothetically be done.

## House style baseline

These are the baseline rules of the published pages. They apply to every new or edited page; existing pages that violate them are drift to fix when touched, never precedent to imitate.

- **Metadata block.** `/*`, then `Description: <one sentence, no trailing period>`, then `Sort: <integer>`, then `*/`, then one blank line. Keys are capitalized. `Title` is added only when the filename-derived title is not acceptable.
- **Headings.** No H1 (the title comes from the metadata and filename), body starts at `##`, never deeper than `####`, sentence case.
- **Bullets.** `-` as the marker. Bold lead-ins: `**Label**: fragment` for definitions, `**Full sentence.** Continuation` for rules. Fragments carry no trailing period, full sentences do, and one shape holds per list.
- **Internal links.** Absolute site paths without the `.md` extension (`/section/page#anchor`). Never relative paths, never the full playbook domain.
- **Images.** `%image_url%/<section>/<file>` placeholder paths, with alt text describing the image purpose.
- **Callouts.** A blockquote with a bold label (`> **Note**: ...`). No other admonition syntax exists on the playbook.
- **Tables.** Matrices, schedules and lookups only, introduced by a lead sentence, bold row labels, `N/A` for empty cells.
- **Long pages.** A hand-maintained `## Table of Contents`; policy and reference pages open with a `## TL;DR`.
- **Voice.** Company "we" addressing the reader as "you". Imperative mood in procedures. Actor plus modal ("HR must notify...") in step-by-step checklists. Capitalized MUST, SHOULD and MAY mark hard rules.
- **Warmth budget.** Personality is welcome, exclamation points are rare and deliberate, emoji do not exist on the playbook.
- **Code fences.** Always a language tag.

## Style consistency workflow

Before writing or rewriting any page, in this order:

1. **Read four or five sibling pages** in the target section of `content/`, in full. If the section holds fewer, read them all and top up with recently changed pages from other sections (`git log --oneline -15 -- content/` points at them): recent pages carry the current standard. Note the heading levels, the list shapes, the tone, the paragraph length, and how pages open.
2. **Derive the guidelines from what you read.** Before writing, state to yourself the style you observed (openers, list shapes, punctuation, tone) and write against that, so you hold the playbook's current style even when the target section is thin or uneven.
3. **Read the section metadata.** Each section directory holds a `meta` file (the section description) and a `sort` file (the section position). Page order inside a section comes from each page's `Sort` value: read the siblings' values and pick one that places the new page deliberately.
4. **Match what you found.** The existing pages define the style, not your defaults. When your habit and the section's habit differ, the section wins.
5. **Cross-link deliberately.** When a page overlaps with another (for example a policy and its operating practice), link them in both directions with descriptive link text, never "click here".

## Page format (Raneto)

Raneto has its own conventions and they are not the usual static site generator ones:

- **Metadata is a comment block, not YAML frontmatter.** Every page opens with:

  ```markdown
  /*
  Description: Short sentence describing the page
  Sort: 42
  */
  ```

  Never replace it with `---` delimiters: YAML frontmatter breaks Raneto's metadata parsing. If a reviewer or a bot suggests the change, refuse and explain.

- **No H1 in pages.** The page title is derived from the filename. Start content with prose, use `##` for sections, and never skip heading levels.
- **Filenames are kebab-case** and become the URL slug and the page title: pick them as carefully as a title (`certification-study-time.md` renders as "Certification Study Time").
- **Internal links use absolute site paths** without the `.md` extension: `/tools-and-policies/certified-training-access`. External links use full URLs.
- **Format after writing.** Run `npx prettier --write <file>` (or the project formatter if a task runner recipe exists) on every markdown file you create or modify.
- **Check the metadata block after formatting.** Prettier's emphasis normalization can rewrite the `/* ... */` delimiters to `/_ ... _/`, which breaks Raneto's parsing. After every formatter run, confirm the block still opens with `/*` and closes with `*/`, and repair it if not.

## Keep content evergreen

Playbook pages outlive the tools and numbers they mention. Do not write facts that rot:

- **Name a tool only on the page that owns that decision.** Every other page says what the thing is for ("the tracking system in use", "the team chat") or links to the owning page. If the company switches tools, one page changes instead of ten.
- **Avoid hardcoded figures** (budgets, limits, prices, team sizes) unless the page is the authoritative source for that figure. Prefer "a fixed budget defined with your Team Leader" over a number that will drift.
- **Fetch current facts instead of remembering them.** Your training data and this file both go stale. To learn the current state: search the existing pages (`grep -ri <topic> content/`), read the owning page in full, and check `git log --oneline -10 -- <path>` for recent direction. For the engine behavior, read `custom/config.js` and `custom/package.json` rather than assuming.
- **The same rule applies to this file.** Do not add tool names, versions, or figures here: add instructions on where to find them.

## Setup

Everything runs in Docker. No local Node.js required for serving the playbook.

```bash
make up      # build and start the playbook at https://playbook.sparkfabrik.loc
make down    # stop it
make cli     # shell inside the container
make logs    # follow container logs
```

Run `make` targets from the repository root. Theme work has dedicated `make theme-*` targets that wrap `bin/npm`.

## Testing

`make check` validates every link in `content/` (ignore patterns live in `content/.mlvignore`). Run it after adding or changing links. There is no other test suite: the check plus a local render (`make up`, then open the page) is the verification loop for content work.

## Package management

Dependencies live in `custom/package.json` and belong to the application, not to content work. Touch them only when explicitly asked.

### Dependency Safety

Before adding or upgrading any dependency:

1. **Never assume you know the latest version.** Verify against the live registry first:

   ```bash
   curl -s https://registry.npmjs.org/<package>/latest | jq '{version: .version, engines: .engines}'
   ```

2. **Use the newest stable version** compatible with the Node.js version in the `Dockerfile`.
3. **Avoid releases published within the last 5 days** to reduce supply chain risk.
4. **Regenerate the lockfile** after any manifest change and commit both files together.

## Git workflow

### Commits

Derive the current format from `git log --oneline -10` before the first commit; at the time of writing the history follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with `docs` as the usual type for content:

```
docs(policies): add certification study time policy page
```

Keep the description lowercase, imperative, no trailing period. Reference the tracking issue in the commit body or the PR description, using the full cross-project path or URL when the issue lives outside this repository.

### Branching

- Branch names follow the README conventions: `content/<issue>-<slug>` for content changes, `section/`, `recipe/` and `feature/` for the other cases described there.
- **Never push directly to `master`.** Every change goes through a branch and a pull request.

### Rebasing

- Rebase onto `master` before pushing; no merge commits on feature branches.
- Use `--force-with-lease` (never `--force`) after rewriting pushed history.

## CI/CD

A push to `master` triggers the GitHub Actions workflow that builds the image and deploys it to Cloud Run. Merging a PR is a production deployment: verify the affected pages on [playbook.sparkfabrik.com](https://playbook.sparkfabrik.com) after every merge.

## Command safety

### Safe (run autonomously)

- `make up`, `make down`, `make logs`, `make check`
- `git status`, `git log`, `git diff`, `grep`/read operations on the repository
- `npx prettier --write <file>` on files you just edited

### Dangerous (ask first)

- `git push`, opening or updating pull requests
- Anything under `custom/` (application code, dependencies, Raneto patches)
- `make theme-*` targets and dependency installations

### Destructive (never run)

- `git push --force` (with-lease only, and only on your own feature branch)
- `git reset --hard`, `rm -rf`, history rewrites on `master`
- Deleting or renaming published pages without an explicit request: URLs are public and bookmarked

## Important rules

- Read sibling pages before writing: the section defines the style, not you.
- Write for readers outside the company: clear, natural English, no internal shorthand.
- Concise and complete: never waste the reader's time, never drop required information.
- ASCII punctuation only: no em or en dashes, no curly quotes, no emoji.
- Raneto metadata is a `/* ... */` comment block: never convert it to YAML frontmatter.
- No H1 in pages; sections use `##`.
- Pages stand alone: no references to previous policies or internal history.
- Name tools and figures only on their owning page; link to it from everywhere else.
- Run `npx prettier --write` and `make check` on every content change.
- Merging to `master` deploys to production.
