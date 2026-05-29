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
- [Org-managed settings](#org-managed-settings)
  - [What the organization can lock](#what-the-organization-can-lock)
  - [Support boundary](#support-boundary)
- [Profiles and multiple accounts](#profiles-and-multiple-accounts)
- [References](#references)

## TL;DR

- Claude Code usage is **finite and shared**. Your Claude Code sessions, Claude.ai chat, and Cowork all draw from the **same** usage pool, with a rolling session window and a weekly limit.
- For now, **personal projects are discouraged** on the work account unless your weekly headroom clearly covers your work needs first. This is provisional — we're learning the limits together and will adapt the policy.
- Logging in with your SparkFabrik account applies **org-managed settings automatically**. They take precedence over your own settings and cannot be overridden.
- There is **no official profile switcher**. If you also run a personal Claude Code, log out and use a **separate OS user account** for personal work.

This page covers policy and limits. For installation, authentication, and the Agent SDK credit, see **[Tools and setup](/ai-development/tools-and-setup)**.

## Usage limits

Unlike GitHub Copilot — which was, in practice, effectively unlimited for us — Claude Code runs on a finite usage budget provided through the SparkFabrik organization's Anthropic plan. Understanding the limits is now part of using the tool well.

### How the limits work

Usage is **shared across all interactive surfaces**: your Claude Code sessions (terminal and IDE), Claude.ai chat, and Cowork all count against the same limits. Heavy chat use eats into the budget available for coding, and vice versa.

There are two windows:

- A **rolling session limit** (a usage window that opens with your first message and lasts a few hours).
- A **weekly limit** that resets on a fixed cadence.

As you approach a cap, Claude Code warns you about remaining capacity. When you hit it, you can wait for the window to reset, opt into API credits to continue (billed at standard rates — this always requires your explicit consent), or upgrade the plan.

> The exact thresholds vary by plan and change over time, so we intentionally do not list numbers here. See [Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan) for current figures.

> **Headless usage is separate.** `claude -p` and Agent SDK usage draw from a distinct monthly credit and do **not** count toward these interactive limits. See [Agent SDK and headless usage](/ai-development/tools-and-setup#agent-sdk-and-headless-usage).

### What changed from Copilot

With Copilot, the cost was a flat seat and capacity was a non-issue. With Claude Code, capacity is a shared, finite resource. The practical implications:

- **Budget deliberately.** Reach for plan mode and scoped prompts on large tasks; avoid burning the weekly window on exploratory chat you could do elsewhere.
- **Work takes priority.** The budget exists to get work done. Personal use comes second (see below).
- **This is a learning period.** We don't yet know how comfortably the limits accommodate a full week of work. We'll watch real consumption and revisit the guidance with transparency.

## Personal use under limits

Because the work budget is finite and shared, **using Claude Code on the work account for personal or side projects is, for now, discouraged** — unless your weekly headroom clearly covers your actual work needs first.

This is the inverse of the Copilot situation, where capacity was effectively free and personal use was simply allowed within boundaries. Here, every personal-project session competes directly with your (and potentially your team's) work capacity.

Guidance for now:

1. **Work first.** Don't let personal use erode the budget you need to deliver.
2. **Provisional, not permanent.** This stance is conservative on purpose. Once we understand how much headroom the limits leave, we'll relax or adjust it — together, with transparency.
3. **Copilot is unaffected.** GitHub Copilot's inline autocomplete remains available, and its separate, more permissive personal-use policy still applies. See the [Copilot personal-use policy](/ai-development/tools-and-setup#personal-use).
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

There is **no official support for switching Claude Code profiles or accounts** today, and Anthropic provides no built-in mechanism for it.

**The rule for now:** if you already use a personal Claude Code on the same OS user account, **log out and use a separate operating-system user account** for personal work, with your own harness and configuration there. This keeps the managed org policy and the shared work usage pool cleanly separated from anything personal.

There is an open-source project — [claude-code-profiles](https://github.com/quinnjr/claude-code-profiles) — that manages multiple profiles by isolating each into its own config directory via the `CLAUDE_CONFIG_DIR` environment variable. It may become a viable option, but it is **untested and unsupported** by us at this time. Do not rely on it for separating work and personal use; use a separate OS account instead.

## References

- [Claude Code settings](https://code.claude.com/docs/en/settings) — managed settings, precedence, lockable options
- [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings) — how org policy is delivered from the admin console on login (our mechanism)
- [Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan) — usage limits and what counts
- [claude-code-profiles](https://github.com/quinnjr/claude-code-profiles) — third-party, untested, unsupported
- [Tools and setup](/ai-development/tools-and-setup) — installation, authentication, Agent SDK credit
