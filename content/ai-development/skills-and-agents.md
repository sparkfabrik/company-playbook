/*
Description: Shared agent skills, agent profiles, and project-level resources managed via sf-awesome-copilot
Sort: 30
*/

## Table of Contents

- [TL;DR](#tldr)
- [What are skills and agent profiles](#what-are-skills-and-agent-profiles)
- [System skills](#system-skills)
- [System agent profiles](#system-agent-profiles)
- [Managing system resources](#managing-system-resources)
- [Project-level skills](#project-level-skills)
- [The sf-awesome-copilot repository](#the-sf-awesome-copilot-repository)
- [Contributing](#contributing)

## TL;DR

**First time setup:**

```bash
sjust sparkdock-upgrade        # install everything
sjust sf-agents-refresh        # sync skills and agent profiles
sjust sf-agents-status         # verify it all landed correctly
```

Skills and agent profiles are now available in GitHub Copilot and OpenCode. If you use VS Code, add one setting to make system agent profiles visible in the Chat view:

```json
"chat.agentFilesLocations": { "~/.copilot/agents": true }
```

That's it. The rest of this page explains what skills and agent profiles are, how they're organized, and how to contribute your own.

## What are skills and agent profiles

GitHub Copilot and OpenCode are **coding agents**: AI assistants that read your code, execute multi-step tasks, and make changes. Both tools let you customize their behavior through two kinds of resources: skills and agent profiles.

**Skills** are instruction files that teach a coding agent how to perform specific tasks: domain knowledge, tool usage patterns, safety protocols, step-by-step workflows. They follow the open [Agent Skills](https://agentskills.io) standard, supported by GitHub Copilot, OpenCode, and other tools. Each skill is a folder with a `SKILL.md` file that the agent discovers and loads on demand. See the [Agent Skills specification](https://agentskills.io/specification) for the format details.

**Agent profiles** are custom agent configurations that shape how a coding agent behaves in a specific role. They can set a model preference, a system prompt, tool access rules, and a curated set of skills. For example, "the-architect" is a profile that makes the agent think like a senior software architect, focusing on design trade-offs and maintainable solutions. Both tools support this concept natively, though they use different file formats:

- **GitHub Copilot** calls them [custom agents](https://code.visualstudio.com/docs/copilot/agents/overview), defined as `*.agent.md` files inside `.github/agents/`
- **OpenCode** calls them [agents](https://opencode.ai/docs/agents/), configured via Markdown or JSON

Agent profiles are tool-specific: the same profile name has separate definitions for each tool. [Sparkdock](https://github.com/sparkfabrik/sparkdock) and [sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot) handle the format differences; you just need to know where to put them.

**What these files look like:** a skill is a folder with a `SKILL.md` file:

```markdown
# glab

How to use the glab CLI to work with GitLab issues, merge requests,
CI/CD pipelines, and repositories.

## Safety protocol

- NEVER force-push to protected branches
- ALWAYS confirm before closing or deleting issues/MRs
...
```

An agent profile for Copilot is an `.agent.md` file with YAML frontmatter:

```markdown
---
name: the-architect
description: Senior software architect focused on design trade-offs
model: claude-sonnet-4-5
tools:
  - read_file
  - search_files
---

You are a senior software architect. Focus on system design,
maintainability, and trade-offs rather than implementation details.
...
```

**Format references:**

| Resource | Format docs |
|----------|------------|
| Skills (`SKILL.md`) | [Agent Skills specification](https://agentskills.io/specification) |
| Copilot agent profiles (`.agent.md`) | [VS Code custom agents docs](https://code.visualstudio.com/docs/copilot/customization/custom-agents) |
| OpenCode agent profiles (`.md` / JSON) | [OpenCode agents docs](https://opencode.ai/docs/agents/) |

Note that **skills are interoperable** across tools thanks to the Agent Skills standard, but **agent profiles are not**: each tool has its own format, and there is no shared specification yet. This is why [sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot) maintains separate per-tool definitions for each profile. The emerging [AGENTS.md](https://agents.md) convention addresses a related but different need: describing a project's conventions so that *any* coding agent can work with the codebase, rather than defining reusable agent personas.

| Scope | Resource | Location | Synced by |
|-------|----------|----------|-----------|
| **System** (all projects) | Skills | `~/.agents/skills/` | sparkdock (`sjust sf-agents-refresh`) |
| **System** (all projects) | Agent profiles (Copilot) | `~/.copilot/agents/` | sparkdock (`sjust sf-agents-refresh`) |
| **System** (all projects) | Agent profiles (OpenCode) | `~/.config/opencode/agents/` | sparkdock (`sjust sf-agents-refresh`) |
| **Project** (one repo) | Skills | `.github/skills/` or `.opencode/skills/` | Committed in the repository |
| **Project** (one repo) | Agent profiles | `.github/agents/` or `.claude/agents/` | Committed in the repository |

> **Why `.claude/agents/`?** VS Code reads both `.github/agents/` and `.claude/agents/` for custom agents. OpenCode uses a Markdown agent format compatible with Claude's convention, so `.claude/agents/` works as a shared path that both VS Code and OpenCode discover automatically, with no extra configuration needed. Use `.github/agents/` if you only need Copilot, or `.claude/agents/` if you want both tools to find the same files.

> **VS Code configuration required:** VS Code does not read `~/.copilot/agents/` by default. It discovers custom agents from `.github/agents/` (workspace), `.claude/agents/` (workspace), and the VS Code user profile folder. To make sparkdock-managed agent profiles visible in VS Code, add this to your VS Code user `settings.json`:
>
> ```json
> "chat.agentFilesLocations": {
>   "~/.copilot/agents": true
> }
> ```
>
> This tells VS Code to also search `~/.copilot/agents/` for `.agent.md` files. Without this setting, system agent profiles will only work in Copilot CLI and OpenCode, not in VS Code chat. See the [VS Code custom agents documentation](https://code.visualstudio.com/docs/copilot/customization/custom-agents) for details.

> **Copilot CLI skill discovery:** Copilot CLI discovers skills from `~/.copilot/skills/`, not from the shared `~/.agents/skills/` path. Sparkdock bridges this automatically by creating per-skill symlinks in `~/.copilot/skills/` pointing to `~/.agents/skills/`. You don't need to do anything; `sjust sf-agents-refresh` takes care of it. Run `sjust sf-agents-status` to verify that managed skills show `ok` in the AVAILABLE column.

## System skills

System skills are installed globally and available in every project, in every AI assistant session. [Sparkdock](https://github.com/sparkfabrik/sparkdock) syncs them from the upstream [sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot) repository.

Currently available system skills:

| Skill | What it does |
|-------|-------------|
| **glab** | Teaches the AI how to use the GitLab CLI: work with issues, merge requests, CI/CD pipelines. Includes a safety protocol for destructive operations. |

Check the [sf-awesome-copilot repository](https://github.com/sparkfabrik/sf-awesome-copilot) for the current catalog.

## System agent profiles

Agent profiles are synced alongside skills from sf-awesome-copilot. Each profile has separate definitions for GitHub Copilot and OpenCode.

To use a system agent profile:

- **GitHub Copilot in VS Code:** select the agent from the **agents dropdown** in the Chat view. (Type `/agents` to configure which agents appear.)
- **GitHub Copilot CLI:** enter `/agent` in interactive mode and select from the list, or use `copilot --agent <profile-name>` in one-shot mode. The agent can also be triggered by inference from your prompt if the description matches.
- **OpenCode:** press `Tab` to cycle through available agents in the TUI, or start a session with a specific profile: `opencode --agent <profile-name>` (or `c --agent <profile-name>`). Run `opencode agent list` to see all discovered agents.

Check the [sf-awesome-copilot repository](https://github.com/sparkfabrik/sf-awesome-copilot) for the current catalog of available agent profiles.

## Managing system resources

### Check status

```bash
sjust sf-agents-status
```

Example output:

```
╔══════════════════════════╗
║  Agent Resources Status  ║
╚══════════════════════════╝

Skills
╭────────────────┬────────────┬─────────────┬───────────╮
│ NAME           │ TYPE       │ STATUS      │ AVAILABLE │
├────────────────┼────────────┼─────────────┼───────────┤
│ glab           │ managed    │ up to date  │ ok        │
│ skill-creator  │ user       │             │           │
╰────────────────┴────────────┴─────────────┴───────────╯

Agent Profiles
╭───────────────┬──────────┬─────────┬────────────╮
│ NAME          │ TOOL     │ TYPE    │ STATUS     │
├───────────────┼──────────┼─────────┼────────────┤
│ the-architect │ copilot  │ managed │ up to date │
│ the-architect │ opencode │ managed │ up to date │
╰───────────────┴──────────┴─────────┴────────────╯

Manifest: ~/.cache/sparkdock/sf-skills-manifest.json
```

- **managed**: synced from sf-awesome-copilot, updated automatically
- **user**: installed locally by you, not managed by sparkdock
- **incomplete**: partially synced, missing required files
- **ok** (AVAILABLE column): skill is discoverable by Copilot CLI via symlink
- **partial** (AVAILABLE column): symlink missing or blocked; run `sjust sf-agents-refresh force` to fix

### Sync from upstream

```bash
sjust sf-agents-refresh
```

This clones (or pulls) the latest sf-awesome-copilot and syncs system resources to their local paths: skills to `~/.agents/skills/`, agent profiles to tool-specific directories (see the scope table above), and Copilot CLI symlinks to `~/.copilot/skills/`. It uses SHA256 checksums to detect changes:

- If the upstream resource changed and your local copy is unmodified → **updated automatically**
- If you modified the local copy → **skipped** (your changes are preserved)
- To overwrite local modifications: `sjust sf-agents-refresh force`

> **Note:** These commands were recently renamed from `sf-skills-refresh` / `sf-skills-status`. The old names still work.

## Project-level skills

Project-level skills live in your repository and are only active when working on that project. They go in different directories depending on the tool. Skills are often paired with **slash commands** (prompts); for example, OpenSpec generates both skills and `/opsx:*` commands side by side:

| Tool | Skills directory | Slash commands directory |
|------|-----------------|------------------------|
| GitHub Copilot | `.github/skills/` | `.github/prompts/` |
| OpenCode | `.opencode/skills/` | `.opencode/command/` |

You don't usually create these from scratch. They come from:

1. **OpenSpec:** `openspec init --tools opencode,github-copilot` generates project skills for the `/opsx:*` commands
2. **sf-awesome-copilot:** domain-specific skills that you copy into your project

## The sf-awesome-copilot repository

**Repository:** [github.com/sparkfabrik/sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot)

This is our shared catalog of skills and agent profiles. It's organized as:

```
sf-awesome-copilot/
├── skills/
│   ├── system/            ← auto-synced by sparkdock to ~/.agents/skills/
│   └── <domain>/          ← project-level, copy into your repo as needed
├── agents/
│   ├── system/            ← auto-synced by sparkdock (per-tool subdirectories)
│   │   └── <name>/
│   │       ├── copilot/     → installed to ~/.copilot/agents/<name>.agent.md
│   │       └── opencode/    → installed to ~/.config/opencode/agents/<name>.md
│   └── <domain>/          ← project-level agent definitions (manually copied)
├── AGENTS.md              ← file format specs for .agent.md and SKILL.md
└── README.md
```

**System skills** (under `skills/system/`) and **system agent profiles** (under `agents/system/`) are the only ones auto-synced by sparkdock. Everything else (domain-specific skills and project-level agent definitions) is meant to be copied into individual project repositories where relevant. Check the repository's README for the current catalog of available resources.

## Contributing

To add a new skill, agent profile, or project-level agent to sf-awesome-copilot:

1. Follow the file format documented in [AGENTS.md](https://github.com/sparkfabrik/sf-awesome-copilot/blob/main/AGENTS.md)
2. Place it in the appropriate directory:
   - `skills/system/`: system skills (auto-synced globally)
   - `skills/<domain>/`: project-level skills (manually copied)
   - `agents/system/`: system agent profiles (auto-synced globally), with subdirectories for each tool (`copilot/`, `opencode/`)
   - `agents/<domain>/`: project-level agent definitions (manually copied)
3. Open a pull request on the repository

System skills and agent profiles (under `skills/system/` and `agents/system/`) will be automatically distributed to all developers on their next `sjust sf-agents-refresh`.
