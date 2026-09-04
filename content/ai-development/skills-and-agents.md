/*
Description: Shared agent skills, agent profiles, and project-level resources synced by sparkdock
Sort: 30
*/

## Table of Contents

- [TL;DR](#tldr)
- [What are skills and agent profiles](#what-are-skills-and-agent-profiles)
- [Where they live](#where-they-live)
- [System skills](#system-skills)
- [Agent profiles](#agent-profiles)
- [Managing system resources](#managing-system-resources)
- [Project-level skills](#project-level-skills)
- [The shared catalog](#the-shared-catalog)
- [Contributing](#contributing)

## TL;DR

**First time setup:**

```bash
sjust sparkdock-upgrade        # install everything
sjust sf-harness-sync          # sync skills and agent profiles
sjust sf-harness-status        # verify it all landed correctly
```

Skills extend [Claude Code](/ai-development/tools-and-setup#claude-code) with reusable instructions, and sparkdock keeps them up to date from a shared catalog. The rest of this page explains what they are, where they live, and how to contribute your own.

## What are skills and agent profiles

Claude Code is a **coding agent**: it reads your code, executes multi-step tasks, and makes changes. Two kinds of resource customize how it behaves.

**Skills** are instruction files that teach an agent how to perform a specific task: domain knowledge, tool usage patterns, safety protocols, step-by-step workflows. They follow the open [Agent Skills](https://agentskills.io) standard, so the same skill works across tools that implement it. Each skill is a folder with a `SKILL.md` file that the agent discovers and loads on demand.

**Agent profiles** are agent configurations that shape behavior for a specific role. They can set a model preference, a system prompt, tool access rules, and a curated set of skills. A profile might make the agent think like a senior software architect, focusing on design trade-offs rather than implementation details.

**What these files look like:** a skill is a folder with a `SKILL.md` file:

```markdown
# glab

How to use the glab CLI to work with GitLab issues, merge requests,
CI/CD pipelines, and repositories.

## Safety protocol

- NEVER force-push to protected branches
- ALWAYS confirm before closing or deleting issues/MRs
```

An agent profile for Claude Code is a `.md` file with YAML frontmatter:

```markdown
---
name: the-architect
description: Senior software architect focused on design trade-offs
tools:
  - Read
  - Grep
  - Glob
---

You are a senior software architect. Focus on system design,
maintainability, and trade-offs rather than implementation details.
```

**Format references:**

| Resource               | Format docs                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| Skills (`SKILL.md`)    | [Agent Skills specification](https://agentskills.io/specification)       |
| Agent profiles (`.md`) | [Claude Code subagents docs](https://code.claude.com/docs/en/sub-agents) |

Skills are interoperable across tools thanks to the Agent Skills standard. Agent profiles are not: each tool has its own format and there is no shared specification yet. The [AGENTS.md](https://agents.md) convention addresses a related but different need, describing a project's conventions so that any coding agent can work with the codebase, rather than defining reusable agent roles.

## Where they live

| Scope                     | Resource       | Location            | Synced by                           |
| ------------------------- | -------------- | ------------------- | ----------------------------------- |
| **System** (all projects) | Skills         | `~/.agents/skills/` | sparkdock (`sjust sf-harness-sync`) |
| **User** (all projects)   | Agent profiles | `~/.claude/agents/` | You, manually                       |
| **Project** (one repo)    | Skills         | `.claude/skills/`   | Committed in the repository         |
| **Project** (one repo)    | Agent profiles | `.claude/agents/`   | Committed in the repository         |

Claude Code does not read `~/.agents/skills/` directly. Sparkdock bridges this by creating per-skill symlinks in `~/.claude/skills/` that point at the shared location, so system skills are discoverable in every session. You do not need to do anything: `sjust sf-harness-sync` takes care of it.

## System skills

System skills are installed globally and available in every project, in every session. Sparkdock syncs them from the shared catalog.

The catalog groups skills into categories. The **system** category is always installed and covers the tooling everyone shares, including the `glab` and `gh` CLI skills, the SparkFabrik commit convention and writing style, document co-authoring, and container build conventions.

Other categories are **opt-in** and cover work that only some people do, such as Angular, Drupal, Terraform, and security engagements. Enable or disable a category globally:

```bash
sjust sf-harness-category enable <category>
sjust sf-harness-category disable <category>
```

Run `sjust sf-harness-status` to see which categories are enabled and which skills you have. For the current catalog, read the repository listed under [The shared catalog](#the-shared-catalog).

## Agent profiles

Sparkdock does not sync agent profiles into Claude Code. The catalog holds domain-specific profiles that you copy into a project (or into `~/.claude/agents/` for personal use) when they are relevant.

Claude Code discovers profiles from `.claude/agents/` in the project and `~/.claude/agents/` for your user. Once a profile is in place, delegate to it from a session and Claude runs it as a subagent in its own context window.

## Managing system resources

### Check status

```bash
sjust sf-harness-status
```

The report covers the enabled skill categories, every installed skill with whether it is up to date, and the OpenSpec integration. Skills are labelled by origin:

- **managed**: synced from the shared catalog, updated automatically
- **user**: installed locally by you, not managed by sparkdock
- **incomplete**: partially synced, missing required files

### Sync from upstream

```bash
sjust sf-harness-sync
```

This clones (or pulls) the latest catalog and syncs system resources to their local paths, then refreshes the symlinks that make them discoverable. It uses SHA256 checksums to detect changes:

- If the upstream resource changed and your local copy is unmodified, it is **updated automatically**.
- If you modified the local copy, it is **skipped** and your changes are preserved.
- To overwrite local modifications, run `sjust sf-harness-sync force`.

## Project-level skills

Project-level skills live in your repository and are only active when working on that project. Skills are often paired with **slash commands**: OpenSpec, for example, generates both skills and the matching `/opsx:*` commands.

| Resource       | Directory           |
| -------------- | ------------------- |
| Skills         | `.claude/skills/`   |
| Slash commands | `.claude/commands/` |
| Agent profiles | `.claude/agents/`   |

You do not usually create these from scratch. They come from:

1. **OpenSpec:** `openspec init --tools claude` generates the project skills and the `/opsx:*` commands.
2. **The shared catalog:** domain-specific skills that you copy into your project.

## The shared catalog

**Repository:** [github.com/sparkfabrik/sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot)

This is our shared catalog of skills and agent profiles, organized as:

```text
sf-awesome-copilot/
├── skills/
│   ├── system/            # always installed, synced to ~/.agents/skills/
│   └── <category>/        # opt-in, enabled with sf-harness-category
├── agents/
│   └── <domain>/          # agent profiles, copied into projects as needed
├── AGENTS.md              # file format specs for SKILL.md and agent profiles
└── README.md              # the current catalog listing
```

Skills under `skills/system/` are installed on every workstation. Everything else is either an opt-in category or a resource you copy into a project where it is relevant. Check the repository README for the current listing.

## Contributing

To add a new skill or agent profile to the catalog:

1. Follow the file format documented in [AGENTS.md](https://github.com/sparkfabrik/sf-awesome-copilot/blob/main/AGENTS.md).
2. Place it in the right directory: `skills/system/` for something everyone needs, `skills/<category>/` for domain work, `agents/<domain>/` for an agent profile.
3. Open a pull request on the repository.

Resources under `skills/system/` are distributed to every developer on their next `sjust sf-harness-sync`. Opt-in categories reach only the people who enabled them.

When a skill or workflow proves useful, contributing it back is how the whole team gets it. That is the "share what works" principle from the [AI development overview](/ai-development/overview#principles).
