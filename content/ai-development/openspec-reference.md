/*
Description: OpenSpec framework reference: concepts, commands, and project file structure
Sort: 45
*/

## TL;DR

| What you need | Where to look |
|---------------|---------------|
| Workflow commands | `/opsx:explore`, `/opsx:ff`, `/opsx:apply`, `/opsx:archive` |
| Step-by-step alternative | `/opsx:new` + `/opsx:continue` |
| Check progress | `openspec status --change <name>` |
| Validate before archive | `openspec validate <name>` |
| Specs source of truth | `openspec/specs/` |
| Active changes | `openspec/changes/` |

## Table of Contents

- [TL;DR](#tldr)
- [Overview](#overview)
- [The core flow](#the-core-flow)
- [Key concepts](#key-concepts)
- [Commands](#commands)
- [Project files reference](#project-files-reference)

## Overview

[OpenSpec](https://github.com/Fission-AI/OpenSpec) is an open-source, tool-agnostic framework for Spec-Driven Development. It supports [multiple AI coding assistants](https://github.com/Fission-AI/OpenSpec#supported-tools): we use it with GitHub Copilot and OpenCode, but it also works with Cursor, Windsurf, Claude Code, and others.

For the methodology behind OpenSpec — why we use specs, how they fit into our workflow, and a complete walkthrough of a feature implementation — see **[Spec-Driven Development](/ai-development/spec-driven-development)**.

## The core flow

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

## Key concepts

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

## Commands

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

## Project files reference

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
