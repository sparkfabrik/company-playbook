/*
Description: Spec-Driven Development with OpenSpec for AI coding assistants
Sort: 40
*/

## Table of Contents

- [What is Spec-Driven Development](#what-is-spec-driven-development)
- [Get started](#get-started)
  - [Your first feature](#your-first-feature)
  - [When things don't go as planned](#when-things-dont-go-as-planned)
- [OpenSpec](#openspec)
  - [The core flow](#the-core-flow)
  - [Key concepts](#key-concepts)
  - [Commands](#commands)
  - [Project files reference](#project-files-reference)
- [Working with Git](#working-with-git)
- [References](#references)

## What is Spec-Driven Development

Spec-Driven Development (SDD) is an emerging approach where you **agree on what to build before any code is written**, capturing intent, requirements, and design decisions in specification artifacts that live in your repository alongside the code. The term [covers a spectrum](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) of practices: writing a throwaway spec for a single task, maintaining specs as living artifacts that evolve with the codebase, or treating specs as the only source file and never touching code directly. Our approach is **spec-first and spec-anchored**: we write specs before implementation and keep them as the source of truth, but developers still work with code directly.

This is not waterfall. There are no rigid phase gates or months of upfront planning. The idea is to spend a small amount of time thinking things through, then start building. When things change (and they will), you update the specs and keep going. The specs evolve with the code.

This is nothing different from what we already do on every project in SparkFabrik. We set clear goals and direction, we work in iterations and we detail the reasonable amount of steps to move towards the next objective. Then, rinse and repeat.

A spec is a **behavior contract**: it describes what the system should do, not how it should do it internally. Compare these two ways of describing the same feature:

- **Vague prompt**: *"Add session timeout so users get logged out after being idle."*
- **Spec requirement**: *"The system SHALL expire sessions after a configured duration of inactivity. GIVEN an authenticated session, WHEN 30 minutes pass without activity, THEN the session token is invalidated AND the user is redirected to the login page."*

The first leaves most decisions to whoever (or whatever) implements it. The second is observable, testable, and unambiguous: it uses [GIVEN/WHEN/THEN](https://martinfowler.com/bliki/GivenWhenThen.html) scenarios to make expected behavior concrete. Good specs contain behaviors, inputs, outputs, error conditions, and concrete scenarios. Implementation details like class names, library choices, or step-by-step execution plans belong in design documents and task lists, not in the spec itself.

Specs are not tests, and they don't replace tests. Tests verify that the implementation is correct; specs define what "correct" means. The GIVEN/WHEN/THEN scenarios in a spec describe expected behavior. Your tests should cover those scenarios, but the spec itself is a human- and machine-readable contract, not executable code.

SDD is built around a few key principles:

- **Fluid, not rigid**: no phase gates; work on what makes sense
- **Iterative, not waterfall**: learn as you build, refine as you go
- **Easy, not complex**: lightweight setup, minimal ceremony
- **Brownfield-first**: works with existing, already-running codebases, not just greenfield projects

### Why it matters now

AI coding assistants have fundamentally changed the economics of writing software. Generating hundreds of lines of code takes seconds, not hours. But this shift creates a new problem: **the bottleneck is no longer typing code; it's figuring out what to build and verifying that it's correct**.

> *"Writing code is cheap now — but delivering good code remains significantly more expensive. Good code works, we know it works, it solves the right problem, it's protected by tests, and it's documented."*
> — Simon Willison, [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/)

Without specs, requirements live only in chat history. Context evaporates between sessions. A new team member (or even you, two weeks later) has no record of what the system is supposed to do or why a decision was made. AI agents become unpredictable when the only input is a vague prompt and a codebase with no documented intent.

Specs solve this by creating **persistent context**. They live in the repository, survive session changes, and are readable by any agent or developer who comes along later. Every AI assistant that touches the project can read the specs, understand the intent, and produce code that aligns with it, so you never have to re-explain the same decision twice.

There is also a collaboration angle. AI makes it trivially easy to generate large pull requests, but the responsibility of reviewing that code still falls on human colleagues. Specs let reviewers **verify intent, not just code**: they can check whether the change does what it's supposed to do by reading the spec delta, without having to reverse-engineer the purpose from hundreds of lines of generated code. This connects directly to our existing [Merge Requests Policy](/tools-and-policies/gitlab-mr-policy) and the [Universal Definition of Done](/tools-and-policies/universal-dod), which already requires architectural overviews, decision logs, and documented AI tooling.

## Get started

All required tools ([OpenSpec CLI](/ai-development/tools-and-setup#openspec), [GitHub Copilot CLI](/ai-development/tools-and-setup#github-copilot-cli), [OpenCode](/ai-development/tools-and-setup#opencode-experimental)) are installed automatically by [sparkdock](https://github.com/sparkfabrik/sparkdock). Run `openspec --version` to verify. If it's missing or outdated, run `sjust sparkdock-upgrade` (`sjust` is sparkdock's task runner; see [Tools and Setup](/ai-development/tools-and-setup)).

### New project

From the project root:

```bash
openspec init --tools opencode,github-copilot
git add -A && git commit -m "chore: initialize openspec"
```

Restart your IDE or start a new chat session. The `/opsx:*` commands work in both **GitHub Copilot** (VS Code, JetBrains) and **OpenCode** (terminal-based AI coding assistant). See [Your first feature](#your-first-feature) below for what to do next.

### Existing project (already has openspec/)

Nothing to install. Open the project, start a session, and use the `/opsx:*` commands. The specs and slash commands are already in the repo.

If slash commands aren't recognized, run `openspec update` to regenerate them, then restart your session.

### Related setup

OpenSpec works alongside the other tools in our AI stack. For details on installation, shell aliases, and shared skills, see:

- **[Tools and Setup](/ai-development/tools-and-setup)**: GitHub Copilot CLI, OpenCode, shell aliases, sparkdock provisioning
- **[Skills and Agents](/ai-development/skills-and-agents)**: shared skills synced by sparkdock, including the glab skill used in the workflow below

### Your first feature

Here is a complete example: you have a GitLab issue assigned to you and you want to implement it with OpenSpec. The workflow is **explore → create → apply → archive**.

**1. Explore the issue**: understand what needs to change before writing any code:

```
You: /opsx:explore I want to work on
     https://gitlab.example.com/acme/backend/-/issues/234
     Fetch the issue and help me explore what needs to change.

AI:  Fetching issue #234... "Add rate limiting to the public API"

     The issue asks for:
     - Rate limiting on all /api/v1/* endpoints
     - 100 requests/minute per API key
     - 429 response with Retry-After header when exceeded

     Looking at the codebase, I see middleware in src/middleware/.
     The closest pattern is auth.middleware.ts.

     A few questions before we proceed:
     - Should rate limits be configurable per endpoint or global?
     - Redis-backed counters or in-memory?
     - Same limit for authenticated and unauthenticated requests?

You: Global for now, Redis since we already use it for sessions.
     Same limit for all requests.

AI:  That simplifies things. Here's what I'd suggest...
     [discusses approach, surfaces trade-offs, draws diagrams]

     Ready to turn this into a tracked change?
     Run /opsx:ff add-api-rate-limiting
```

The AI fetches the GitLab issue via glab, reads the description and comments, investigates the codebase, and helps you think through the approach, all before any code or artifacts are created. (This works thanks to the [glab skill](https://github.com/sparkfabrik/sf-awesome-copilot/tree/main/skills/system/glab); see [Skills and Agents](/ai-development/skills-and-agents) for details.)

**2. Create the change**: generate all artifacts at once:

```
You: /opsx:ff add-api-rate-limiting

AI:  Creating change with all artifacts...
     ✓ proposal.md  : rate limiting for public API, Redis-backed
     ✓ specs/       : 3 requirements (limit, 429 response, config)
     ✓ design.md    : Redis sliding window, middleware approach
     ✓ tasks.md     : 4 implementation tasks

     Review the artifacts, then /opsx:apply when ready.
```

Review and edit the artifacts. They are Markdown files under `openspec/changes/add-api-rate-limiting/`. Commit them to make the proposal reviewable before any code is written.

**3. Apply**: implement the tasks:

```
You: /opsx:apply

AI:  Starting task 1 of 4: Add rate limit configuration...
     ✓ Task 1 complete
     Starting task 2 of 4: Create Redis rate limiter service...
     ✓ Task 2 complete
     ...
     All tasks complete. Run tests, then /opsx:archive.
```

The AI works through tasks one at a time. Between tasks, you can review the changes, run tests, and commit. It's a conversation, not an autonomous batch job. If a task produces something you don't like, undo it and re-run `/opsx:apply` (see [When things don't go as planned](#when-things-dont-go-as-planned)).

**4. Archive**: merge specs into the source of truth:

```
You: /opsx:archive

AI:  Merging delta specs into openspec/specs/:
       api-rate-limiting: + 3 added
     Archived as 2026-03-09-add-api-rate-limiting.
```

Commit everything (implementation code, updated specs, and archived change artifacts) and open your merge request. Reviewers can read the spec delta to verify intent before reviewing the code.

### When things don't go as planned

Nothing is irreversible until you archive. If something goes wrong during implementation:

- **Task produces bad code**: undo the changes (git), edit the task description or design in the artifacts, and re-run `/opsx:apply`. The AI will pick up where you left off.
- **Requirements change mid-flight**: edit the spec and proposal artifacts directly (they're just Markdown files), then continue applying. The artifacts are the source of truth for the AI, so updating them updates the plan.
- **Need to rethink the approach**: run `/opsx:explore` again at any point. You can explore as many times as you want without affecting existing artifacts.
- **Archived too early**: the archived change is still in `openspec/changes/archive/`. You can reference it, but you'll need to create a new change to make further modifications to the specs.

## OpenSpec

[OpenSpec](https://github.com/Fission-AI/OpenSpec) is an open-source, tool-agnostic framework for Spec-Driven Development. It supports [multiple AI coding assistants](https://github.com/Fission-AI/OpenSpec#supported-tools): we use it with GitHub Copilot and OpenCode, but it also works with Cursor, Windsurf, Claude Code, and others.

### The core flow

```
  explore ──────► create ──────► apply ──────► archive
     │               │              │              │
   understand      proposal       implement      merge specs
   the problem     specs          the tasks      into source
                   design                        of truth
                   tasks
```

1. **Explore**: Understand the problem. Investigate the codebase, compare approaches, surface trade-offs. No code or artifacts are created yet.
2. **Create**: Define the change. OpenSpec generates a proposal, delta specs, design, and task list. Use `/opsx:ff` to create everything at once, or `/opsx:new` + `/opsx:continue` for step-by-step control.
3. **Apply**: Work through the implementation tasks, checking them off as you go.
4. **Archive**: When complete, delta specs merge into the main spec library and the change moves to the archive for audit history.

The flow is a recommendation, not a mandate. You can skip straight to `/opsx:ff` if you already understand the problem, or run `/opsx:explore` multiple times before creating anything. The only hard dependency is that you create a change before applying it, and apply before archiving.

### Key concepts

**Specs** (`openspec/specs/`) are the source of truth: they describe how the system currently behaves, organized by domain. You can inspect them with the CLI:

```
$ openspec list --specs
Specs:
  auth-session     requirements 2
```

A spec contains structured requirements with concrete scenarios:

```markdown
# Auth Session Specification

## Purpose
Manage user session lifecycle including creation, validation, and authentication state.

## Requirements

### Requirement: Session Creation
The system SHALL create a session token upon successful authentication.

#### Scenario: Successful login
- GIVEN a user with valid credentials
- WHEN the user submits the login form
- THEN a session token is issued
- AND the user is redirected to the dashboard
```

**Changes** (`openspec/changes/`) are proposed modifications. Each change is a self-contained folder with everything needed to understand and implement it:

```
openspec/changes/add-session-timeout/
├── proposal.md           # Why and what (intent, scope, approach)
├── design.md             # How (technical decisions, architecture)
├── tasks.md              # Implementation checklist
└── specs/                # Delta specs
    └── auth-session/
        └── spec.md       # What's changing in the auth-session spec
```

You can check the status of a change with the CLI:

```
$ openspec status --change add-session-timeout
Change: add-session-timeout
Schema: spec-driven
Progress: 4/4 artifacts complete

[x] proposal
[x] design
[x] specs
[x] tasks

All artifacts complete!
```

**Delta specs** describe what's changing relative to the current specs, using `ADDED`, `MODIFIED`, and `REMOVED` sections. This is what makes OpenSpec work well for brownfield development: you specify the change, not the entire system:

```markdown
# Delta for Auth Session

## ADDED Requirements

### Requirement: Session Expiration
The system SHALL expire sessions after a configured duration of inactivity.

#### Scenario: Idle timeout
- GIVEN an authenticated user session
- WHEN 30 minutes pass without activity
- THEN the session token is invalidated
- AND the user is redirected to the login page
```

**Artifacts** are the documents within a change (proposal, specs, design, tasks). They build on each other but can be updated at any time as understanding deepens.

When a change is archived, its delta specs merge into the main specs. You can validate a change before archiving:

```
$ openspec validate add-session-timeout
Change 'add-session-timeout' is valid
```

And when you archive, the delta is applied to the source of truth:

```
$ openspec archive add-session-timeout --yes
Specs to update:
  auth-session: update
Applying changes to openspec/specs/auth-session/spec.md:
  + 2 added
Totals: + 2, ~ 0, - 0, → 0
Specs updated successfully.
Change 'add-session-timeout' archived as '2026-03-09-add-session-timeout'.
```

The spec now describes the new behavior (4 requirements instead of 2), and the next change builds on the updated source of truth.

**Who maintains the specs?** The team that owns the domain owns its specs. Specs stay current naturally through the archive flow, since every change that touches a domain updates the relevant spec as part of its merge. If you notice a spec has drifted from reality (e.g., after a refactor that didn't use OpenSpec), update it directly or create a small change to realign it.

### Commands

Both GitHub Copilot and OpenCode use the same slash commands. Type them in the chat interface of either tool. Each command maps to a prompt file in your repository (under `.opencode/command/` or `.github/prompts/`) that instructs the AI what to do. You can read or customize them like any other file.

**Workflow commands**, the full cycle from idea to archived specs:

| Command | What it does |
|---------|-------------|
| `/opsx:explore` | Think through ideas, investigate the codebase, compare approaches; no code written |
| `/opsx:ff <name>` | Create a change with all artifacts at once (proposal, specs, design, tasks) |
| `/opsx:apply` | Implement tasks from the current change |
| `/opsx:archive` | Archive a completed change, merging delta specs into the source of truth |

**Step-by-step alternative**: use `/opsx:new` + `/opsx:continue` instead of `/opsx:ff` when you want to review and refine each artifact before moving to the next:

| Command | What it does |
|---------|-------------|
| `/opsx:new <name>` | Scaffold a change directory and show the first artifact template |
| `/opsx:continue` | Create the next artifact (one at a time) |

**Additional commands:**

| Command | What it does |
|---------|-------------|
| `/opsx:verify` | Check that implementation matches the specs before archiving |
| `/opsx:sync` | Sync delta specs to main specs without archiving |
| `/opsx:bulk-archive` | Archive multiple completed changes at once |
| `/opsx:onboard` | Guided walkthrough of the full OpenSpec workflow; start here if you're new |

**CLI commands**: the `openspec` CLI complements the slash commands with direct operations you run in your terminal:

| Command | What it does |
|---------|-------------|
| `openspec list` | List active changes |
| `openspec list --specs` | List specs in the source of truth |
| `openspec status --change <name>` | Show artifact progress for a change |
| `openspec validate <name>` | Check that a change is valid before archiving |
| `openspec show <name>` | Display change details and artifacts |
| `openspec archive <name>` | Archive a change, merging delta specs into the source of truth |
| `openspec schemas` | List available workflow schemas. A schema defines which artifacts a change contains (e.g. `spec-driven` includes proposal, specs, design, tasks) |

These are especially useful in CI pipelines (e.g. `openspec validate` as a pre-merge check) and for quick inspections without opening an AI chat session.

Between creating and applying, review and refine the artifacts. They're just Markdown files. Edit them directly if needed. You can also run `openspec status --change <name>` at any point to check progress.

### Project files reference

`openspec init --tools opencode,github-copilot` creates the following files. **Commit all of them**; there is nothing to `.gitignore`.

```
your-project/
│
├── openspec/                          # Spec-driven development root
│   ├── specs/                         # Source of truth (empty at init, grows as you archive)
│   └── changes/                       # Active changes live here
│
├── .opencode/                         # OpenCode integration
│   ├── command/                       # Slash commands
│   │   ├── opsx-apply.md
│   │   ├── opsx-archive.md
│   │   ├── opsx-explore.md
│   │   ├── opsx-new.md
│   │   ├── opsx-ff.md
│   │   ├── opsx-continue.md
│   │   ├── opsx-verify.md
│   │   ├── opsx-sync.md
│   │   ├── opsx-bulk-archive.md
│   │   └── opsx-onboard.md
│   └── skills/                        # Skills (one folder each)
│       ├── openspec-apply-change/
│       ├── openspec-archive-change/
│       ├── openspec-explore/
│       ├── openspec-new-change/
│       ├── openspec-ff-change/
│       ├── openspec-continue-change/
│       ├── openspec-verify-change/
│       ├── openspec-sync-specs/
│       ├── openspec-bulk-archive-change/
│       └── openspec-onboard/
│
└── .github/                           # GitHub Copilot integration
    ├── prompts/                       # Slash commands (same names, .prompt.md extension)
    │   ├── opsx-apply.prompt.md
    │   ├── opsx-archive.prompt.md
    │   └── ...                        # (same set as .opencode/command/)
    └── skills/                        # Skills (same structure as .opencode/skills/)
        ├── openspec-apply-change/
        ├── openspec-archive-change/
        └── ...
```

If you use a different AI tool (Cursor, Windsurf, Claude Code), run `openspec init --tools <tool-name>` instead; see the [supported tools list](https://github.com/Fission-AI/OpenSpec#supported-tools). You can initialize multiple tools at once.

## Working with Git

OpenSpec artifacts are files in your repository, so they follow your normal Git workflow. Here's how we recommend integrating them:

### Branching

Create a feature branch per change, just as you would for any feature or fix. The branch contains both the OpenSpec artifacts and the implementation code:

```
git checkout -b feature/add-session-timeout
# /opsx:explore        understand the problem
# /opsx:ff add-session-timeout   create the change
# /opsx:apply          implement
# /opsx:archive        merge specs
```

### What to commit and when

- **After `/opsx:ff`** (or `/opsx:new`): Commit the change artifacts (`openspec/changes/<name>/`). This makes the proposal reviewable before any code is written.
- **During `/opsx:apply`**: Commit as you normally would, after each meaningful unit of work or at the end of the implementation.
- **After `/opsx:archive`**: Commit the updated specs (`openspec/specs/`) and the archived change folder. This is typically your final commit before opening a merge request.

Everything under `openspec/` should be committed. There is nothing to `.gitignore`.

### Merge requests

When you open a merge request, reviewers can look at the spec delta **before** reading the code. This is especially valuable for AI-generated code: the spec explains what the change is supposed to do, so the reviewer can verify intent instead of reverse-engineering it from the diff.

Link the change artifacts in your MR description. If you archive before merging, the paths will be under `openspec/changes/archive/`:
```
## OpenSpec change
See `openspec/changes/archive/2026-03-09-add-session-timeout/proposal.md` for intent and scope.
```

### Concurrent changes

If two developers create changes that touch the same spec domain, the second one to archive will need to resolve a merge conflict in the spec file, just like any other file. The delta format (ADDED/MODIFIED/REMOVED sections) makes these conflicts easier to understand and resolve than conflicts in implementation code.

## References

- **Our blog**: [Spec-Driven Development: a practical guide](https://www.sparkfabrik.com/en/blog/spec-driven-development-guide/)
- **OpenSpec**: [GitHub repository](https://github.com/Fission-AI/OpenSpec) and [website](https://openspec.dev)
- **OpenSpec docs**: [Getting Started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md), [Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md), [Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md), [Commands](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md)
- **Agentic Engineering Patterns**: Simon Willison's guide on [working effectively with AI coding agents](https://simonwillison.net/guides/agentic-engineering-patterns/)
