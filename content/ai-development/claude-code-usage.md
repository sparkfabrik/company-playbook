/*
Description: Claude Code usage limits, personal-use policy, org-managed settings, and multi-account guidance
Sort: 22
*/

## Table of Contents

- [TL;DR](#tldr)
- [Usage limits](#usage-limits)
  - [How the limits work](#how-the-limits-work)
  - [What changed from Copilot](#what-changed-from-copilot)
- [Personal use under limits](#personal-use-under-limits)
  - [Quick answers](#quick-answers)
  - [The policy](#the-policy)
- [Org-managed settings](#org-managed-settings)
  - [What the organization can lock](#what-the-organization-can-lock)
  - [Support boundary](#support-boundary)
- [Profiles and multiple accounts](#profiles-and-multiple-accounts)
  - [Separate OS user account (strongest isolation)](#separate-os-user-account-strongest-isolation)
  - [CLAUDE_CONFIG_DIR profiles (lighter, same OS account)](#claude_config_dir-profiles-lighter-same-os-account)
- [References](#references)

## TL;DR

- **Personal projects? Not on the work account, for now.** For personal work, use a separate profile signed in with your *own* personal Anthropic account — the `claude-personal` alias or a separate OS user — so it draws on your limits, not the company pool. [Details](#personal-use-under-limits)
- **Usage is finite and shared.** Claude Code, Claude.ai chat, and Cowork all draw from the **same** pool (a rolling session window plus a weekly limit). There's no Copilot fallback anymore, so budget deliberately.
- **Hit your limit?** Wait for the window to reset, or ask the platform team (`#support-hr`) about your extra allowance. No self-service upgrades; don't enable pay-as-you-go API credits on the work account.
- **Settings are managed.** Signing in with your SparkFabrik account applies **org-managed policy automatically** — it takes precedence over your own settings and can't be overridden.

This page covers policy and limits. For installation, authentication, and the Agent SDK credit, see **[Tools and setup](/ai-development/tools-and-setup)**.

## Usage limits

Unlike GitHub Copilot — which was, in practice, effectively unlimited for us — Claude Code runs on a finite usage budget provided through the SparkFabrik organization's Anthropic plan. Understanding the limits is now part of using the tool well.

### How the limits work

Usage is **shared across all interactive surfaces**: your Claude Code sessions (terminal and IDE), Claude.ai chat, and Cowork all count against the same limits. Heavy chat use eats into the budget available for coding, and vice versa.

There are two windows:

- A **rolling session limit** (a usage window that opens with your first message and lasts a few hours).
- A **weekly limit** that resets on a fixed cadence.

As you approach a cap, Claude Code warns you about remaining capacity. When you hit it, the default option is to **wait for the window to reset**.

We provide each user with an **extra usage allowance** on top of the base limits. **We do not support self-service plan upgrades for now.** If you exhaust your allowance, **contact the platform team** (`#support-hr`) — we adjust it case by case for specific, justified needs rather than blanket upgrades. Do not opt into pay-as-you-go API credits on the work account; route the request through us instead.

> The exact thresholds vary by plan and change over time, so we intentionally do not list numbers here. See [Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan) for current figures.

> **Headless usage is separate.** `claude -p` and Agent SDK usage draw from a distinct monthly credit and do **not** count toward these interactive limits. See [Agent SDK and headless usage](/ai-development/tools-and-setup#agent-sdk-and-headless-usage).

### What changed from Copilot

With Copilot, the cost was a flat seat and capacity was a non-issue. With Claude Code, capacity is a shared, finite resource. The practical implications:

- **Budget deliberately.** Reach for plan mode and scoped prompts on large tasks; avoid burning the weekly window on exploratory chat you could do elsewhere.
- **Work takes priority.** The budget exists to get work done. Personal use comes second (see below).
- **This is a learning period.** We don't yet know how comfortably the limits accommodate a full week of work. We'll watch real consumption and revisit the guidance with transparency.

## Personal use under limits

### Quick answers

**Can I use Claude Code for personal projects?**
Not on the work account, for now. The work usage pool is finite and shared, and there's no Copilot fallback anymore — so don't spend it on side projects. If you want Claude Code for personal work, run it on a **separate profile signed in with your own personal Anthropic account**, so it draws on *your* personal plan and limits, not the company pool. See [Profiles and multiple accounts](#profiles-and-multiple-accounts).

**What if I already have a personal Claude Code configured on this machine?**
After sparkdock provisioning, the default `claude` command is the **work** profile: it forces login to the SparkFabrik organization, applies the managed policy, and uses `~/.claude`. If you had been signing `~/.claude` into a *personal* account, that slot is now work — re-authenticate it with your work account. Keep your personal setup on the `claude-personal` profile instead (config dir `~/.claude_personal`, your own login). To carry over your existing personal history/config, copy it across **before** re-authenticating:

```zsh
cp -r ~/.claude ~/.claude_personal   # only if ~/.claude held your personal setup
# then: `claude` = work, `claude-personal` = personal (run /login with your personal account)
```

Don't run personal projects under the work login — that bills the company pool and runs under org policy.

### The policy

Because the work budget is finite and shared, **using Claude Code on the work account for personal or side projects is, for now, discouraged** — unless your weekly headroom clearly covers your actual work needs first.

This is the inverse of the Copilot situation, where capacity was effectively free and personal use was simply allowed within boundaries. Here, every personal-project session competes directly with your (and potentially your team's) work capacity.

Guidance for now:

1. **Work first.** Don't let personal use erode the budget you need to deliver.
2. **Provisional, not permanent.** This stance is conservative on purpose. Once we understand how much headroom the limits leave, we'll relax or adjust it — together, with transparency.
3. **No fallback tool.** GitHub Copilot is being phased out and we no longer issue licenses, so there is no second, unmetered AI coding tool to fall back on. Claude Code's limits are effectively your whole AI coding budget — which is exactly why personal use comes second.
4. **When in doubt, ask.** If you have a personal-project use case in mind, raise it with your manager.

## Org-managed settings

Claude Code now has **organization-managed settings**. We deliver them as **server-managed settings**: the policy lives in Anthropic's admin console and is pushed to your client automatically when you log in with your SparkFabrik account. You do **not** deploy or edit a managed-settings file yourself — the policy is fetched from Anthropic's servers on login and cached locally (path below).

> Anthropic also supports a file-based mechanism (`/etc/claude-code/managed-settings.json` on Linux, `/Library/Application Support/ClaudeCode/managed-settings.json` on macOS) and MDM/registry delivery. **We do not use these** — our policy is server-managed. The file paths are mentioned here only so you recognize them if you read the official docs.

These settings take **absolute precedence** over your user (`~/.claude/settings.json`) and project (`.claude/settings.json`) settings, and **cannot be overridden** from a session. This is by design: it lets us enforce consistent, compliant defaults for everyone.

**To check what's active**, run `/status` inside a Claude Code session — the output includes a line beginning with `Enterprise managed settings (remote)` when the org policy is applied. Settings propagate on next startup, or within about an hour during an active session.

**Where it lives locally:** the fetched policy is cached at `~/.claude/remote-settings.json` — that is the file Claude Code actually reads. It is the local copy of the admin-console policy, not something you edit (changes are overwritten on the next refresh). You will *not* find a `/etc/claude-code/managed-settings.json`; that file-based path is an Anthropic fallback we don't use.

### What the organization can lock

Managed settings can constrain, among other things:

- **Permissions** — which tools require confirmation, and whether only managed permission rules apply.
- **MCP servers** — which servers are allowed or denied.
- **Models** — which models are available, and forcing login to the SparkFabrik organization.
- **Plugins, skills, hooks, and agents** — restricting customization to approved sources.

For the full reference, see the official [Claude Code settings documentation](https://code.claude.com/docs/en/settings).

### Support boundary

We support **only the harness as configured by sparkdock**. Custom plugins, skills, agents, MCP servers, or settings beyond what sparkdock provisions are **not supported unless pre-approved** — discussed and shared with the team first. If you have something you'd like to add to the standard setup, propose it so we can evaluate and roll it out for everyone rather than maintaining one-off local configs.

## Profiles and multiple accounts

If you also use Claude Code for personal work, keep it **separate** from your work account — separate login, separate usage pool, no org policy on personal work. There are two supported ways to do this, strongest first.

### Separate OS user account (strongest isolation)

Log out and use a **separate operating-system user account** for personal work, with its own harness and configuration. This is the cleanest separation: nothing — credentials, config, history, MCP servers, managed policy — crosses between work and personal. Recommended when you want strict separation.

### `CLAUDE_CONFIG_DIR` profiles (lighter, same OS account)

Claude Code's built-in `CLAUDE_CONFIG_DIR` environment variable points the CLI at a different config directory, which isolates settings, credentials, MCP servers, and history per directory. sparkdock provides a ready-made `claude-personal` alias for this — your default `claude` stays on the work/org account, and `claude-personal` runs against `~/.claude_personal`:

```zsh
# default — work/org account, org-managed policy applies
claude

# personal — separate config dir (~/.claude_personal), log in with your personal account
claude-personal
```

**Org policy is keyed to the logged-in account, not the directory.** When you log in to the personal profile with a personal (non-SparkFabrik) account, no org-managed policy applies and usage draws on that account's own limits — not the work pool. Conversely, the work profile always gets the org policy.

> The third-party [claude-code-profiles](https://github.com/quinnjr/claude-code-profiles) tool is just a wrapper around `CLAUDE_CONFIG_DIR`; the sparkdock `claude-personal` alias covers the same need, so you don't need it.

## References

- [Claude Code settings](https://code.claude.com/docs/en/settings) — managed settings, precedence, lockable options
- [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings) — how org policy is delivered from the admin console on login (our mechanism)
- [Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan) — usage limits and what counts
- [claude-code-profiles](https://github.com/quinnjr/claude-code-profiles) — third-party, untested, unsupported
- [Tools and setup](/ai-development/tools-and-setup) — installation, authentication, Agent SDK credit
