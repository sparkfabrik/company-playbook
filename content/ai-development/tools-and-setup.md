/*
Description: GitHub Copilot CLI, OpenCode, shell aliases, sparkdock provisioning, and subscription policy
Sort: 20
*/

## Table of Contents

- [TL;DR](#tldr)
- [Overview](#overview)
  - [When to use what](#when-to-use-what)
- [GitHub Copilot CLI](#github-copilot-cli)
- [OpenCode (experimental)](#opencode-experimental)
- [OpenSpec](#openspec)
- [Other CLI tools](#other-cli-tools)
- [Installation and updates](#installation-and-updates)
- [Authentication](#authentication)
- [GitHub Copilot subscription policy](#github-copilot-subscription-policy)

## TL;DR

**Get up and running:**

```bash
sjust sparkdock-upgrade    # install all tools
```

**Start coding with AI:**

| What you want to do | Command |
|---------------------|---------|
| Quick one-shot question or task | `co "your prompt"` |
| Sustained interactive session | `ico` |
| OpenCode session (experimental) | `c` |

**Authenticate (one-time):**

| Tool | Command |
|------|---------|
| GitHub Copilot CLI | `copilot login` (or `/login` inside a session) |
| OpenCode (experimental) | `/connect` in OpenCode, select "GitHub Copilot" |
| VS Code / JetBrains | Sign in via the Copilot extension sidebar |
| glab (GitLab CLI) | `sjust gitlab-configure-glab` |
| gh (GitHub CLI) | `gh auth login` |

All GitHub-based tools authenticate against **github.com** using your SparkFabrik organization account.

The rest of this page covers how each tool works, when to use which, and the subscription policy.

## Overview

All AI development tools are installed and configured by [sparkdock](https://github.com/sparkfabrik/sparkdock), our workstation provisioning system. You should not need to install anything manually. Run `sjust sparkdock-upgrade` to provision or update everything (`sjust` is sparkdock's [just](https://github.com/casey/just)-based task runner).

To install or update a specific tool, use tags:

```bash
sjust sparkdock-install-tags copilot-cli  # just Copilot CLI
sjust sparkdock-install-tags opencode     # just OpenCode
sjust sparkdock-install-tags skills       # just shared skills
sjust sparkdock-install-tags npm_packages # just npm packages (OpenSpec, etc.)
```

### When to use what

AI coding tools operate in two modes: **reactive** (suggest code, wait for you to apply it) and **agentic** (plan, act, observe, adjust in a loop). Both are useful. The agentic mode (where the AI reads your codebase, forms a plan, executes it, runs tests, and course-corrects) is where the biggest productivity shift is happening, and it lives primarily in the terminal.

| Environment | How it works | Start with |
|-------------|-------------|------------|
| **Copilot CLI** (terminal) | Agentic: explores your codebase, plans, executes, tests, adjusts. One-shot (`co`) for quick prompts, interactive (`ico`) for sustained work sessions. | `co "your prompt"` or `ico` for interactive |
| **OpenCode** (terminal, experimental) | Agentic: same plan-act-observe loop, with structured workflows (OpenSpec) and full tool use. | `c` to start a session |
| **IDE** (VS Code / JetBrains + Copilot extension) | Mixed: inline completions and chat (reactive), plus agent mode (agentic, scoped to the IDE). | Install the GitHub Copilot extension and sign in |

CLI agents have full terminal access, so they can run tests, check git status, install dependencies, call APIs. IDE agent mode is agentic too but sandboxed within the editor. Use the IDE for inline edits and code review; reach for a CLI agent when the task involves implementation, debugging, or anything that benefits from an autonomous work loop.

## GitHub Copilot CLI

[GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli) is our primary AI coding assistant in the terminal. Sparkdock installs it and configures shell aliases for quick access to different models.

### One-shot mode (`co`)

Send a prompt and get a single response, good for quick questions, code generation, and explanations.

```bash
co "explain what this function does" < src/auth/session.ts
co "write unit tests for the rate limiter" < src/middleware/rate-limit.ts
```

You can pipe files into `co` via stdin or let it read your codebase from the current directory. The default model is configured by sparkdock; you can override it per-invocation with `--model`:

```bash
co --model claude-sonnet-4.5 "review this for security issues" < src/auth/token.ts
```

### Interactive mode (`ico`)

Starts a persistent chat session, good for iterative work, debugging, and multi-step tasks where you want to build on previous context.

```bash
ico                    # start an interactive session
ico --model gemini-3-pro  # start with a specific model
```

Inside an interactive session you can use slash commands (`/help` to list them), switch models during the conversation, and reference previous responses.

### IDE integration

GitHub Copilot also runs as an extension in VS Code and JetBrains IDEs, providing inline completions and a chat panel. Install it from your IDE's extension marketplace and sign in with your GitHub account.

Skills and slash commands work in both the terminal CLI and the IDE extension. A skill is a set of instructions that teaches the AI how to perform a specific task (e.g., how to use glab, how to follow project conventions); a slash command triggers a specific workflow. Project-level skills go in `.github/skills/` and prompts in `.github/prompts/`.

## OpenCode (experimental)

[OpenCode](https://opencode.ai) is an open-source, model-agnostic terminal coding agent. Like Copilot CLI, it runs the full agentic loop: reading your codebase, planning changes, executing them, running tests, and adjusting when things fail. It is currently **experimental** at SparkFabrik; we are evaluating it alongside Copilot CLI.

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
- **Permission controls**: sparkdock configures rules that require confirmation before destructive operations (force-push, file deletion outside project, etc.)

**Configuration:** sparkdock installs the config at `~/.config/opencode/opencode.json`. You generally don't need to edit it.

## OpenSpec

[OpenSpec](https://openspec.dev) is a framework for capturing requirements, design decisions, and implementation tasks as structured artifacts before and during AI-assisted development. It's installed as an npm package by sparkdock. Verify with:

```bash
openspec --version
```

OpenSpec is covered in detail on its own page: **[Spec-Driven Development](/ai-development/spec-driven-development)**.

## Other CLI tools

Sparkdock also installs CLI tools that aren't AI-specific but that the coding agents use via [skills](/ai-development/skills-and-agents):

| Tool | What it is | Setup |
|------|-----------|-------|
| **[glab](https://gitlab.com/gitlab-org/cli)** | GitLab CLI: issues, merge requests, CI/CD pipelines | `sjust gitlab-configure-glab` (one-time auth) |
| **[gh](https://cli.github.com)** | GitHub CLI: issues, pull requests, actions, releases | `gh auth login` (one-time auth) |

Both tools work standalone in your terminal and are also used by Copilot and OpenCode through skills (e.g., the [glab skill](https://github.com/sparkfabrik/sf-awesome-copilot/tree/main/skills/system/glab) lets the AI fetch issue details, read MR discussions, and check pipelines on your behalf).

## Installation and updates

Everything is managed by sparkdock. Here are the commands you'll use most:

| Command | What it does |
|---------|-------------|
| `sjust sparkdock-upgrade` | Full provisioning: installs/updates all tools |
| `sjust sparkdock-install-tags <tag>` | Install/update specific tools by tag |
| `sjust sf-agents-refresh` | Sync shared skills and agent profiles from upstream |
| `sjust sf-agents-status` | Show installed skills, agent profiles, and their status |

If a tool is missing or outdated, `sjust sparkdock-upgrade` is always the safe default.

### What sparkdock installs

| Package | Source | Tag |
|---------|--------|-----|
| GitHub Copilot CLI | Homebrew Cask (`copilot-cli`) | `copilot-cli` |
| OpenCode | Homebrew (`anomalyco/tap/opencode`) | `opencode` |
| glab | Homebrew | `glab` |
| OpenSpec | npm (`@fission-ai/openspec`) | `npm_packages` |

Sparkdock also configures shell aliases, zsh completions, and OpenCode permissions.

## Authentication

All GitHub-based tools authenticate against **github.com** using your SparkFabrik organization account via OAuth. This is safe and expected. No API keys to manage manually, no third-party services. Your credentials are stored locally (in your OS keychain for Copilot CLI, in OpenCode's auth store for OpenCode).

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

### OpenCode (experimental)

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

## GitHub Copilot subscription policy

### Eligibility

All employees with access to GitHub can use GitHub Copilot. You should receive a subscription during onboarding.

### Usage policy

1. Employees are encouraged to use AI suggestions but **must use their own judgment** when applying them. Always review suggested code and understand it before implementing it. The name is Co*pilot*, not Auto*pilot*.

2. Employees must comply with all company policies when using GitHub Copilot. Non-compliance is the employee's responsibility.

3. The service is regulated by the [GitHub Copilot for Business Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-copilot-for-business-privacy-statement). Code snippets are transmitted in real-time for suggestions but are not retained. It is the employer's responsibility to verify the privacy statement is acceptable for their specific use case; if in doubt, ask your team lead or manager.

4. This policy is reviewed periodically and updated as needed.

### Requesting a subscription

If you weren't granted a subscription during onboarding:

1. On the [GitHub Copilot settings page](https://github.com/settings/copilot), locate **Get Copilot from an organization**
2. Use **Ask admin for access** on the **SparkFabrik** organization
3. Confirm with an HR representative via the `#support-hr` channel

The subscription is through our GitHub Organization. Any existing personal Copilot subscription on the same account will be automatically cancelled and refunded by GitHub.

### Refunding a previously purchased subscription

If you already purchased a personal GitHub Copilot subscription, GitHub will refund the unused portion when the Organization subscription is attached. You can request a refund for the partial paid subscription using the company's employee refund platform, only if it was previously approved as a company expense.
