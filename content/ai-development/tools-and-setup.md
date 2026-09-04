/*
Description: Claude Code, GitHub Copilot, shell aliases, sparkdock provisioning, and subscription policy
Sort: 20
*/

## Table of Contents

- [TL;DR](#tldr)
- [Overview](#overview)
  - [When to use what](#when-to-use-what)
- [Claude Code](#claude-code)
  - [IDE integration](#ide-integration)
- [GitHub Copilot (secondary)](#github-copilot-secondary)
- [OpenCode (backup)](#opencode-backup)
- [OpenSpec](#openspec)
- [Other CLI tools](#other-cli-tools)
- [Installation and updates](#installation-and-updates)
- [Authentication](#authentication)
- [Claude Code subscription](#claude-code-subscription)
- [GitHub Copilot subscription policy](#github-copilot-subscription-policy)
  - [Personal use](#personal-use)

## TL;DR

**Get up and running:**

```bash
sjust sparkdock-upgrade    # install all tools
```

**Start coding with AI:**

| What you want to do                   | Command                   |
| ------------------------------------- | ------------------------- |
| Start a Claude Code session (primary) | `claude`                  |
| Quick one-shot task with Claude Code  | `claude -p "your prompt"` |
| Copilot one-shot (backup)             | `co "your prompt"`        |
| Copilot interactive session (backup)  | `ico`                     |

**Authenticate (one-time):**

| Tool                                       | Command                                        |
| ------------------------------------------ | ---------------------------------------------- |
| Claude Code                                | `claude auth login`                            |
| GitHub Copilot CLI (backup)                | `copilot login` (or `/login` inside a session) |
| VS Code / JetBrains (Copilot autocomplete) | Sign in via the Copilot extension sidebar      |
| glab (GitLab CLI)                          | `sjust gitlab-configure-glab`                  |
| gh (GitHub CLI)                            | `gh auth login`                                |

All GitHub-based tools authenticate against **github.com** using your SparkFabrik organization account.

The rest of this page covers how each tool works, when to use which, and the subscription policy.

## Overview

All AI development tools are installed and configured by [sparkdock](https://github.com/sparkfabrik/sparkdock), our workstation provisioning system. You should not need to install anything manually. Run `sjust sparkdock-upgrade` to provision or update everything (`sjust` is sparkdock's [just](https://github.com/casey/just)-based task runner).

To install or update a specific tool, use tags:

```bash
sjust sparkdock-install-tags claude-code  # just Claude Code
sjust sparkdock-install-tags copilot-cli  # just Copilot CLI
sjust sparkdock-install-tags opencode     # just OpenCode
sjust sparkdock-install-tags skills       # just shared skills
sjust sparkdock-install-tags npm_packages # just npm packages (OpenSpec, etc.)
```

### When to use what

AI coding tools operate in two modes: **reactive** (suggest code, wait for you to apply it) and **agentic** (plan, act, observe, adjust in a loop). Both are useful. The agentic mode (where the AI reads your codebase, forms a plan, executes it, runs tests, and course-corrects) is where the biggest productivity shift is happening.

| Environment                                     | How it works                                                                                                                                 | Start with                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Claude Code** (terminal, primary)             | Agentic: explores your codebase, plans, executes, tests, adjusts. Full tool use, skills, subagents, and MCP integrations.                    | `claude` to start a session                      |
| **Claude Code** (VS Code / JetBrains extension) | Agentic: same capabilities as the terminal, with native IDE integration — inline diffs, plan review, @-mentions, multiple conversation tabs. | Install the Claude Code extension                |
| **Copilot CLI** (terminal, backup)              | Agentic: same plan-act-observe loop. Available for teams that prefer it or need Copilot-specific features.                                   | `co "your prompt"` or `ico` for interactive      |
| **Copilot** (VS Code / JetBrains, autocomplete) | Reactive: inline code completions as you type. Complements Claude Code — use both together.                                                  | Install the GitHub Copilot extension and sign in |

Use Claude Code (terminal or IDE extension) as your primary agent for implementation, debugging, and any task that benefits from an autonomous work loop. Copilot's inline autocomplete complements it with real-time code suggestions as you type.

## Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) is our primary AI coding assistant in the terminal. It is Anthropic's agentic coding tool that runs the full autonomous loop: reading your codebase, planning changes, executing them, running tests, and adjusting when things fail.

**Start a session:**

```bash
claude                         # start in the current directory
claude -p "your prompt"        # one-shot mode (non-interactive, see warning below)
```

> **Cost warning:** `claude -p` draws from a separate Agent SDK monthly credit, not your interactive usage limits. Once the credit is exhausted, usage is billed at API rates. See [Agent SDK and headless usage](#agent-sdk-and-headless-usage) below for details.

Claude Code uses the current directory as project context. Type `/` for slash commands (including `/opsx:*` for OpenSpec workflows).

**What sets it apart:**

- **Plan mode**: press `Shift+Tab` twice to enter plan mode. Claude explores and plans without making changes. Use this for anything touching multiple files.
- **Full tool use**: reads, edits, creates files; runs shell commands; manages git
- **Skills and agent profiles**: loads skills from `~/.agents/skills/` (system) and `.claude/skills/` (project); agent profiles from `.claude/agents/` (project) and `~/.claude/agents/` (user)
- **Subagents**: delegate tasks to specialized agents that run in their own context window
- **MCP integrations**: connect to external tools (GitLab, databases, design tools) via Model Context Protocol
- **CLAUDE.md**: project-level instructions that compound over time — every mistake becomes a rule
- **Permission controls**: sparkdock configures rules that require confirmation before destructive operations

**Configuration:** Claude Code reads project instructions from `CLAUDE.md` at the repository root and from `.claude/` directory. Global configuration lives in `~/.claude/`. See the [official documentation](https://docs.anthropic.com/en/docs/claude-code/overview) for details.

### IDE integration

Claude Code also runs natively inside your IDE, providing the same agentic capabilities with a graphical interface. This is **separate from** Copilot's inline autocomplete — they complement each other:

- **Claude Code extension** = agentic coding (plan, execute, review diffs, multi-step tasks)
- **Copilot extension** = reactive inline completions (code suggestions as you type)

You can use both simultaneously.

#### VS Code

Install the [Claude Code extension for VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) (requires VS Code 1.98.0+).

Key features:

- **Inline diffs**: Claude shows side-by-side comparisons of proposed changes; accept, reject, or edit before applying
- **Plan review**: in Plan mode, Claude opens the plan as a full markdown document where you can add inline comments before execution
- **@-mentions**: reference files, folders, or line ranges (`@src/auth.ts#5-10`) for precise context
- **Multiple conversations**: open sessions in separate tabs or windows for parallel work
- **Session history**: resume past conversations, including remote sessions from claude.ai
- **Keyboard shortcuts**: `Cmd+Esc` / `Ctrl+Esc` to toggle focus, `Option+K` / `Alt+K` to insert @-mention references

Open Claude via the Spark icon in the editor toolbar, the Activity Bar, or the Command Palette (`Cmd+Shift+P` → "Claude Code").

For the full reference, see the [Claude Code VS Code docs](https://code.claude.com/docs/en/vs-code).

#### JetBrains (beta)

Install the [Claude Code plugin for JetBrains](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) (IntelliJ IDEA, WebStorm, PyCharm, GoLand, and other IntelliJ-based IDEs).

The plugin is currently in **beta**. It provides the same agentic workflow within the JetBrains IDE family.

## GitHub Copilot (secondary)

GitHub Copilot remains available as a secondary tool. Its primary value is **IDE inline autocomplete** — the real-time code suggestions that appear as you type in VS Code or JetBrains. The Copilot CLI is available as a backup terminal agent for teams that prefer it.

### IDE autocomplete

GitHub Copilot runs as an extension in VS Code and JetBrains IDEs, providing inline completions and a chat panel. Install it from your IDE's extension marketplace and sign in with your GitHub account. This continues to work alongside Claude Code — use Claude Code for agentic tasks in the terminal, and Copilot's inline suggestions as you type in your editor.

### Copilot CLI (backup)

[GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli) is available for teams that still need it. Sparkdock installs it and configures shell aliases.

```bash
co "your prompt"        # one-shot mode
ico                     # interactive mode
ico --model gemini-3-pro  # start with a specific model
```

Skills and slash commands work in both the terminal CLI and the IDE extension.

## OpenCode (backup)

[OpenCode](https://opencode.ai) is an open-source, model-agnostic terminal coding agent. It is available as a backup option for teams that need model-agnostic flexibility or are still transitioning to Claude Code.

**Start a session:**

```bash
c                          # start in the current directory
c --agent the-architect    # start with a specific agent profile
```

OpenCode uses the current directory as project context. Press `Tab` to switch agent profiles, type `/` for slash commands (including `/opsx:*` for OpenSpec workflows).

**What sets it apart:**

- **Model-agnostic**: works with Claude, GPT, Gemini, and others; no vendor lock-in
- **Full tool use**: reads, edits, creates files; runs shell commands; manages git
- **Skills and agent profiles**: loads from `~/.agents/skills/` (system), `.opencode/skills/` (project), and `~/.config/opencode/agents/` (agent profiles)
- **Permission controls**: sparkdock configures rules that require confirmation before destructive operations

**Configuration:** sparkdock installs the config at `~/.config/opencode/opencode.json`. You generally don't need to edit it.

## OpenSpec

[OpenSpec](https://openspec.dev) is a framework for capturing requirements, design decisions, and implementation tasks as structured artifacts before and during AI-assisted development. It's installed as an npm package by sparkdock. Verify with:

```bash
openspec --version
```

OpenSpec is covered in detail on its own page: **[Spec-Driven Development](/ai-development/spec-driven-development)**.

## Other CLI tools

Sparkdock also installs CLI tools that aren't AI-specific but that the coding agents use via [skills](/ai-development/skills-and-agents):

| Tool                                          | What it is                                           | Setup                                         |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| **[glab](https://gitlab.com/gitlab-org/cli)** | GitLab CLI: issues, merge requests, CI/CD pipelines  | `sjust gitlab-configure-glab` (one-time auth) |
| **[gh](https://cli.github.com)**              | GitHub CLI: issues, pull requests, actions, releases | `gh auth login` (one-time auth)               |

Both tools work standalone in your terminal and are also used by Claude Code and other agents through skills (e.g., the [glab skill](https://github.com/sparkfabrik/sf-awesome-copilot/tree/main/skills/system/glab) lets the AI fetch issue details, read MR discussions, and check pipelines on your behalf).

## Installation and updates

Everything is managed by sparkdock. Here are the commands you'll use most:

| Command                              | What it does                                            |
| ------------------------------------ | ------------------------------------------------------- |
| `sjust sparkdock-upgrade`            | Full provisioning: installs/updates all tools           |
| `sjust sparkdock-install-tags <tag>` | Install/update specific tools by tag                    |
| `sjust sf-harness-sync`              | Sync shared skills and agent profiles from upstream     |
| `sjust sf-harness-status`            | Show installed skills, agent profiles, and their status |

If a tool is missing or outdated, `sjust sparkdock-upgrade` is always the safe default.

### What sparkdock installs

| Package            | Source                              | Tag            |
| ------------------ | ----------------------------------- | -------------- |
| Claude Code        | npm (`@anthropic-ai/claude-code`)   | `claude-code`  |
| GitHub Copilot CLI | Homebrew Cask (`copilot-cli`)       | `copilot-cli`  |
| OpenCode           | Homebrew (`anomalyco/tap/opencode`) | `opencode`     |
| glab               | Homebrew                            | `glab`         |
| OpenSpec           | npm (`@fission-ai/openspec`)        | `npm_packages` |

Sparkdock also configures shell aliases, zsh completions, and permission rules for all agents.

## Authentication

### Claude Code

Run `claude auth login` from your terminal:

```bash
claude auth login
```

This opens your browser for authentication. Claude Code uses your Anthropic account linked to the SparkFabrik organization. The token is stored locally.

For the full reference, see the official docs: [Claude Code authentication](https://docs.anthropic.com/en/docs/claude-code/overview).

### GitHub Copilot CLI

Copilot CLI has its own authentication, separate from the `gh` CLI. Run `copilot login` from your terminal (or `/login` inside an active session):

```bash
copilot login
```

This opens your browser at `github.com/login/device` where you enter the one-time code displayed in the terminal. Select **GitHub.com**, authorize, and you're set. The token is stored in your OS keychain under the service name `copilot-cli`.

> If you've already authenticated with `gh auth login`, Copilot CLI can use that token as a **fallback**. But we recommend running `copilot login` explicitly so Copilot CLI has its own stored credential.

For the full reference, see the official docs: [Authenticating GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli).

### GitHub Copilot in VS Code / JetBrains

Sign in through the Copilot extension sidebar. It opens the same GitHub OAuth flow in your browser. Once authorized, the extension stays authenticated.

### OpenCode (backup)

Open an OpenCode session (`c`), then run the `/connect` command:

```
/connect
```

Select **GitHub Copilot** from the provider list. OpenCode gives you a device code and a link to `github.com/login/device`. Enter the code, authorize, done.

For the full reference, see the OpenCode docs: [GitHub Copilot provider](https://opencode.ai/docs/providers/#github-copilot).

### glab (GitLab CLI)

glab authenticates against **GitLab**, not GitHub. Run:

```bash
sjust gitlab-configure-glab
```

This is a one-time setup handled by sparkdock.

### gh (GitHub CLI)

```bash
gh auth login
```

Select **GitHub.com**, authenticate via browser. This is also the fallback credential for Copilot CLI if `copilot login` hasn't been run.

## Claude Code subscription

Claude Code is provided through the SparkFabrik organization's Anthropic plan. Interactive usage (Claude Code sessions, Claude Cowork, Claude chat) consumes your plan's usage limits.

> For interactive usage limits, the personal-use policy, org-managed settings, and multi-account guidance, see **[Claude Code usage & policy](/ai-development/claude-code-usage)**.

### Agent SDK and headless usage

Starting **June 15, 2026**, `claude -p` (headless/one-shot) and Agent SDK usage no longer count toward interactive usage limits. These get a **separate monthly credit** that refreshes with the billing cycle:

| Plan                                  | Monthly credit |
| ------------------------------------- | -------------- |
| Pro                                   | $20            |
| Max 5x                                | $100           |
| Max 20x                               | $200           |
| Team (Standard seats)                 | $20            |
| Team (Premium seats)                  | $100           |
| Enterprise (usage-based)              | $20            |
| Enterprise (seat-based Premium seats) | $200           |

This means your interactive Claude Code sessions and your CI/automation (`claude -p`) pipelines have independent budgets. Once the Agent SDK credit is exhausted, additional usage is billed at standard API rates (if usage credits are enabled), otherwise requests stop until the next billing cycle.

**References:**

- [Use the Claude Agent SDK with your Claude plan](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan) (official Anthropic support article)
- [What Anthropic's New Claude Billing Means for Zed Users](https://zed.dev/blog/anthropic-subscription-changes) (Zed blog, practical impact analysis)
- [Anthropic Claude pricing changes](https://www.axios.com/2026/05/14/anthropic-claude-price-openai-tokens) (Axios coverage)

## GitHub Copilot subscription policy

The GitHub Copilot subscription is maintained primarily for **IDE inline autocomplete** and as a backup terminal agent. Claude Code is our primary agentic coding tool.

### Eligibility

All employees with access to GitHub can use GitHub Copilot. You should receive a subscription during onboarding.

### Usage policy

1. Employees are encouraged to use AI suggestions but **must use their own judgment** when applying them. Always review suggested code and understand it before implementing it. The name is *Co*pilot, not *Auto*pilot.

2. Employees must comply with all company policies when using GitHub Copilot. Non-compliance is the employee's responsibility.

3. The service is regulated by the [GitHub Terms for Additional Products and Features](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot) and the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Code snippets are transmitted in real-time for suggestions but are not retained by default. For details on data handling, see the [GitHub Copilot Trust Center](https://copilot.github.trust.page/). It is the employer's responsibility to verify that these terms are acceptable for their specific use case; if in doubt, ask your team lead or manager.

4. This policy is reviewed periodically and updated as needed.

### Personal use

GitHub attaches the Copilot subscription to your personal GitHub account. When the organization seat is assigned, any existing personal subscription is automatically cancelled. We recognize this means the tools you use for work are the same tools available on your personal projects.

Here is what is and isn't covered:

- **Open source and community contributions: encouraged.** Contributing to open source projects, building community tools, and participating in hackathons all build skills that benefit you and the company.
- **Personal non-commercial projects: allowed.** Learning new technologies, hobby projects, and personal tools are fine, within the guidelines below.
- **Personal commercial projects: not covered.** Freelance work, side businesses, SaaS products, and paid consulting deliverables should not use the company-provided subscription.
- **Projects that compete with the company: not allowed.** Personal projects must not compete with SparkFabrik's products, services, or business areas.

A few guidelines:

1. **Work takes priority.** Premium requests are metered and have a cost. If your usage is unusually high, we may ask about it.
2. **Keep company and personal work separate.** Personal projects must not include, reuse, or be derived from company code, proprietary logic, or confidential information.
3. **Your personal projects are yours.** The company makes no intellectual property claim on code you write for personal or open source projects, provided it is developed outside working hours and is not related to the company's business.
4. **This is trust-based.** We'd rather give clear boundaries than build surveillance. If costs become unsustainable, we'll revisit the policy with transparency.

If you're unsure whether a specific use case qualifies, ask your manager.

### Requesting a subscription

If you weren't granted a subscription during onboarding:

1. On the [GitHub Copilot settings page](https://github.com/settings/copilot), locate **Get Copilot from an organization**
2. Use **Ask admin for access** on the **SparkFabrik** organization
3. Confirm with an HR representative via the `#support-hr` channel

The subscription is through our GitHub Organization. Any existing personal Copilot subscription on the same account will be automatically cancelled and refunded by GitHub.

### Refunding a previously purchased subscription

If you already purchased a personal GitHub Copilot subscription, GitHub will refund the unused portion when the Organization subscription is attached. You can request a refund for the partial paid subscription using the company's employee refund platform, only if it was previously approved as a company expense.
