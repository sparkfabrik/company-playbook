/*
Description: Claude Code installation, authentication, shell aliases, sparkdock provisioning, and subscriptions
Sort: 20
*/

## Table of Contents

- [TL;DR](#tldr)
- [Overview](#overview)
  - [Reactive and agentic modes](#reactive-and-agentic-modes)
- [Claude Code](#claude-code)
  - [IDE integration](#ide-integration)
- [Exceptions: Copilot and OpenCode](#exceptions-copilot-and-opencode)
- [OpenSpec](#openspec)
- [Other CLI tools](#other-cli-tools)
- [Installation and updates](#installation-and-updates)
- [Authentication](#authentication)
- [Claude Code subscription](#claude-code-subscription)
  - [Agent SDK and headless usage](#agent-sdk-and-headless-usage)
- [GitHub Copilot seats](#github-copilot-seats)
  - [Personal use](#personal-use)

## TL;DR

Claude Code is the AI coding assistant we use, in the terminal and in Visual Studio Code (VS Code). VS Code is the editor we support.

**Get up and running:**

```bash
sjust sparkdock-upgrade    # install all tools
```

**Start coding with AI:**

| What you want to do         | Command                   |
| --------------------------- | ------------------------- |
| Start a Claude Code session | `claude`                  |
| Run a one-shot task         | `claude -p "your prompt"` |

**Authenticate (one-time):**

| Tool              | Command                       |
| ----------------- | ----------------------------- |
| Claude Code       | `claude auth login`           |
| glab (GitLab CLI) | `sjust gitlab-configure-glab` |
| gh (GitHub CLI)   | `gh auth login`               |

The rest of this page covers how each tool works and the subscription terms. For usage limits, the personal-use policy, and which harnesses are authorized, see [Claude Code usage and policy](/ai-development/claude-code-usage).

## Overview

All AI development tools are installed and configured by [sparkdock](https://github.com/sparkfabrik/sparkdock), our workstation provisioning system. You should not need to install anything manually. Run `sjust sparkdock-upgrade` to provision or update everything (`sjust` is sparkdock's [just](https://github.com/casey/just)-based task runner).

To install or update a specific tool, use tags:

```bash
sjust sparkdock-install-tags claude-code  # just Claude Code
sjust sparkdock-install-tags skills       # just shared skills
sjust sparkdock-install-tags npm_packages # just npm packages (OpenSpec, etc.)
```

### Reactive and agentic modes

AI coding tools operate in two modes. **Reactive** tools suggest code and wait for you to apply it. **Agentic** tools plan, act, observe, and adjust in a loop: the AI reads your codebase, forms a plan, executes it, runs tests, and course-corrects.

Claude Code is agentic, and that loop is where the productivity shift happens.

| Environment                         | How it works                                                                                                                        | Start with                        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **Claude Code** (terminal)          | Explores your codebase, plans, executes, tests, adjusts. Full tool use, skills, subagents, and Model Context Protocol integrations. | `claude` to start a session       |
| **Claude Code** (VS Code extension) | The same capabilities as the terminal, with native editor integration: inline diffs, plan review, @-mentions, conversation tabs.    | Install the Claude Code extension |

Use Claude Code as your primary agent for implementation, debugging, and any task that benefits from an autonomous work loop.

## Claude Code

[Claude Code](https://code.claude.com/docs) is Anthropic's agentic coding tool and our primary AI coding assistant. It runs the full autonomous loop: reading your codebase, planning changes, executing them, running tests, and adjusting when things fail.

**Start a session:**

```bash
claude                         # start in the current directory
claude -p "your prompt"        # one-shot mode (non-interactive, see warning below)
```

> **Cost warning**: `claude -p` draws from a separate Agent SDK monthly credit, not your interactive usage limits. Once the credit is exhausted, usage is billed at API rates. See [Agent SDK and headless usage](#agent-sdk-and-headless-usage) below.

Claude Code uses the current directory as project context. Type `/` for slash commands, including the `/opsx:*` commands for OpenSpec workflows.

**What sets it apart:**

- **Plan mode.** Press `Shift+Tab` twice to enter plan mode. Claude explores and plans without making changes. Use this for anything touching multiple files.
- **Full tool use.** Reads, edits, and creates files, runs shell commands, and manages git.
- **Skills and agent profiles.** Loads skills from `~/.agents/skills/` (system) and `.claude/skills/` (project), and agent profiles from `.claude/agents/` (project) and `~/.claude/agents/` (user).
- **Subagents.** Delegates tasks to specialized agents that run in their own context window.
- **Model Context Protocol (MCP) integrations.** Connects to external tools such as GitLab, databases, and design tools.
- **CLAUDE.md.** Project-level instructions that compound over time: every mistake becomes a rule.
- **Permission controls.** The organization's managed policy defines which tools require confirmation and read-blocks secret files such as `.env`, `secrets/`, and private keys.

**Configuration:** Claude Code reads project instructions from `CLAUDE.md` at the repository root and from the `.claude/` directory. Global configuration lives in `~/.claude/`. The organization also pushes managed settings that take precedence over both, described in [Org-managed settings](/ai-development/claude-code-usage#org-managed-settings).

### IDE integration

Claude Code runs natively inside VS Code, providing the same agentic capabilities with a graphical interface. Install the [Claude Code extension for VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) from the marketplace.

Key features:

- **Inline diffs.** Claude shows side-by-side comparisons of proposed changes. Accept, reject, or edit before applying.
- **Plan review.** In plan mode, Claude opens the plan as a full markdown document where you can add inline comments before execution.
- **@-mentions.** Reference files, folders, or line ranges (`@src/auth.ts#5-10`) for precise context.
- **Multiple conversations.** Open sessions in separate tabs or windows for parallel work.
- **Session history.** Resume past conversations, including remote sessions.
- **Keyboard shortcuts.** `Cmd+Esc` or `Ctrl+Esc` toggles focus, `Option+K` or `Alt+K` inserts an @-mention reference.

Open Claude via the icon in the editor toolbar, the Activity Bar, or the Command Palette (`Cmd+Shift+P`, then "Claude Code").

For the full reference, see the [Claude Code VS Code documentation](https://code.claude.com/docs/en/vs-code).

## Exceptions: Copilot and OpenCode

GitHub Copilot and OpenCode are not part of the standard setup. Copilot seats are granted on demand, case by case, for a few specific needs, and OpenCode is authorized only as a Copilot-backed harness for people who hold such a seat.

Both exceptions, and the reasons behind them, are defined in [Support boundary](/ai-development/claude-code-usage#support-boundary). Read that section before assuming either tool is available to you.

Sparkdock still provisions both tools, so they install on every workstation. Installation is not authorization: use them only within the boundary above.

## OpenSpec

[OpenSpec](https://openspec.dev) is a framework for capturing requirements, design decisions, and implementation tasks as structured artifacts before and during AI-assisted development. Sparkdock installs it as an npm package. Verify with:

```bash
openspec --version
```

OpenSpec is covered in detail on its own page: **[Spec-Driven Development](/ai-development/spec-driven-development)**.

## Other CLI tools

Sparkdock also installs CLI tools that are not AI-specific but that Claude Code uses via [skills](/ai-development/skills-and-agents):

| Tool                                          | What it is                                           | Setup                                         |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| **[glab](https://gitlab.com/gitlab-org/cli)** | GitLab CLI: issues, merge requests, CI/CD pipelines  | `sjust gitlab-configure-glab` (one-time auth) |
| **[gh](https://cli.github.com)**              | GitHub CLI: issues, pull requests, actions, releases | `gh auth login` (one-time auth)               |

Both tools work standalone in your terminal and are also used by Claude Code through skills. The glab skill, for example, lets the agent fetch issue details, read merge request discussions, and check pipelines on your behalf.

## Installation and updates

Everything is managed by sparkdock. These are the commands you will use most:

| Command                              | What it does                                             |
| ------------------------------------ | -------------------------------------------------------- |
| `sjust sparkdock-upgrade`            | Full provisioning: installs and updates all tools        |
| `sjust sparkdock-install-tags <tag>` | Installs or updates specific tools by tag                |
| `sjust sf-harness-sync`              | Syncs shared skills and agent profiles from upstream     |
| `sjust sf-harness-status`            | Shows installed skills, agent profiles, and their status |

If a tool is missing or outdated, `sjust sparkdock-upgrade` is always the safe default.

### What sparkdock installs

| Package     | Source                            | Tag            |
| ----------- | --------------------------------- | -------------- |
| Claude Code | npm (`@anthropic-ai/claude-code`) | `claude-code`  |
| glab        | Homebrew                          | `glab`         |
| OpenSpec    | npm (`@fission-ai/openspec`)      | `npm_packages` |

Sparkdock also configures shell aliases, zsh completions, and permission rules.

## Authentication

### Claude Code

Run `claude auth login` from your terminal:

```bash
claude auth login
```

This opens your browser for authentication. Claude Code uses your Anthropic account linked to the SparkFabrik organization, and signing in applies the organization's managed policy automatically. The token is stored locally.

### glab (GitLab CLI)

glab authenticates against GitLab, not GitHub. Run:

```bash
sjust gitlab-configure-glab
```

This is a one-time setup handled by sparkdock.

### gh (GitHub CLI)

```bash
gh auth login
```

Select **GitHub.com** and authenticate via browser.

## Claude Code subscription

Claude Code is provided through the SparkFabrik organization's Anthropic plan. Interactive usage (Claude Code sessions, Claude Cowork, Claude chat) consumes your plan's usage limits.

> For interactive usage limits, the personal-use policy, org-managed settings, and multi-account guidance, see **[Claude Code usage and policy](/ai-development/claude-code-usage)**.

### Agent SDK and headless usage

Headless usage (`claude -p`) and Agent SDK usage do not count toward interactive usage limits. They draw on a **separate monthly credit** that refreshes with the billing cycle, sized by plan.

This means your interactive Claude Code sessions and your continuous integration or automation pipelines have independent budgets. Once the Agent SDK credit is exhausted, additional usage is billed at standard API rates if usage credits are enabled, and otherwise requests stop until the next billing cycle.

For the credit amount that applies to your plan, see the official Anthropic article below rather than a figure copied here.

**References:**

- [Use the Claude Agent SDK with your Claude plan](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan) (official Anthropic support article, including the per-plan credit amounts)
- [Manage costs effectively](https://code.claude.com/docs/en/costs) (model selection, `/usage`, reducing token use)

## GitHub Copilot seats

A GitHub Copilot seat is not part of the standard developer setup. Seats are granted **on demand, case by case**, for a few specific needs. Ask the platform team if you think you have one.

If you hold a seat, the terms below apply.

### Usage policy

1. Use your own judgment when applying AI suggestions. Always review suggested code and understand it before shipping it. The name is _Co_pilot, not _Auto_pilot.

2. Comply with all company policies when using GitHub Copilot. Non-compliance is the employee's responsibility.

3. The service is regulated by the [GitHub Terms for Additional Products and Features](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot) and the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Code snippets are transmitted in real time for suggestions but are not retained by default. For details on data handling, see the [GitHub Copilot Trust Center](https://copilot.github.trust.page/). It is the employer's responsibility to verify that these terms are acceptable for a specific use case. If in doubt, ask your team lead or manager.

### Personal use

GitHub attaches the Copilot subscription to your personal GitHub account. When the organization seat is assigned, any existing personal subscription is automatically cancelled. This means the tool you use for work is the same tool available on your personal projects.

Here is what is and is not covered:

- **Open source and community contributions: encouraged.** Contributing to open source projects, building community tools, and taking part in hackathons all build skills that benefit you and the company.
- **Personal non-commercial projects: allowed.** Learning new technologies, hobby projects, and personal tools are fine, within the guidelines below.
- **Personal commercial projects: not covered.** Freelance work, side businesses, SaaS products, and paid consulting deliverables must not use the company-provided seat.
- **Projects that compete with the company: not allowed.** Personal projects must not compete with SparkFabrik's products, services, or business areas.

A few guidelines:

1. **Work takes priority.** Premium requests are metered and have a cost. If your usage is unusually high, we may ask about it.
2. **Keep company and personal work separate.** Personal projects must not include, reuse, or derive from company code, proprietary logic, or confidential information.
3. **Your personal projects are yours.** The company makes no intellectual property claim on code you write for personal or open source projects, provided it is developed outside working hours and is unrelated to the company's business.
4. **This is trust-based.** We would rather give clear boundaries than build surveillance. If costs become unsustainable, we will revisit the policy with transparency.

If you are unsure whether a specific use case qualifies, ask your manager.

> The equivalent policy for Claude Code, which has different constraints because the usage budget is shared and finite, lives in [Personal use under limits](/ai-development/claude-code-usage#personal-use-under-limits).

### Refunding a previously purchased subscription

If you already purchased a personal GitHub Copilot subscription, GitHub refunds the unused portion when the organization seat is attached. You can request a refund for the partial paid subscription through the company's employee refund platform, only if it was previously approved as a company expense.
