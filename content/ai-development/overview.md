/*
Description: What AI-assisted development means at SparkFabrik and how our tools fit together
Sort: 10
*/

## Table of Contents

- [Our AI development stack](#our-ai-development-stack)
  - [IDE](#ide)
  - [CLI tools](#cli-tools)
- [How the pieces fit together](#how-the-pieces-fit-together)
- [Principles](#principles)
- [Getting started](#getting-started)

## Our AI development stack

This section of the playbook documents where we are right now. It will change as the technology changes.

For why we're investing in AI-assisted development, read [Where We Are](/ai-development/where-we-are). The rest of this page covers the practical details: [Tools and Setup](/ai-development/tools-and-setup) (what's installed and how to use it), [Skills and Agents](/ai-development/skills-and-agents) (shared resources that customize AI behavior), and [Spec-Driven Development](/ai-development/spec-driven-development) (the methodology for structured AI-assisted work).

SparkFabrik provides AI-assisted development tools across two environments, installed and configured automatically by [sparkdock](https://github.com/sparkfabrik/sparkdock) (our workstation provisioning system).

### IDE

[GitHub Copilot](https://docs.github.com/en/copilot) runs as an extension in **VS Code** and **JetBrains** IDEs. SparkFabrik provides a Copilot subscription through our GitHub organization. Install the extension from your IDE's marketplace and sign in with your GitHub account (see [subscription policy](/ai-development/tools-and-setup#github-copilot-subscription-policy) for details). It provides:

- **Inline completions:** code suggestions as you type
- **Chat panel:** ask questions, generate code, explain errors
- **Agent mode:** multi-step autonomous tasks within the IDE

Project-level skills go in `.github/skills/` and prompts in `.github/prompts/`. See [Tools and Setup](/ai-development/tools-and-setup#ide-integration) for details.

### CLI tools

| Tool | What it is |
|------|-----------|
| **[GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)** | AI pair programmer in the terminal (alias: `co` for one-shot, `ico` for interactive) |
| **[OpenCode](https://opencode.ai)** (experimental) | Terminal-based AI coding agent (alias: `c`) |
| **[OpenSpec](https://openspec.dev)** | Spec-Driven Development framework: captures requirements and design as artifacts |
| **Shared skills & agent profiles** | Reusable agent resources synced from [sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot) |

Sparkdock also installs **[glab](https://gitlab.com/gitlab-org/cli)** and **[gh](https://cli.github.com)**, CLI tools for GitLab and GitHub that the AI assistants use via skills to fetch issues, read discussions, and check pipelines. See [Tools and Setup](/ai-development/tools-and-setup#other-cli-tools) for details.

GitHub Copilot CLI is our primary terminal assistant. OpenCode is currently **experimental**; we are evaluating it as a terminal-centric alternative. Use whichever fits your workflow, or both.

## How the pieces fit together

The tools above are general-purpose out of the box. We extend them in two ways:

**Skills and agent profiles** customize how the coding agents behave, adding domain knowledge, safety protocols, and role-specific configurations. SparkFabrik maintains a shared catalog in [sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot), synced to your machine automatically by sparkdock. You can also create your own, and each project can define its own alongside the code. See [Skills and Agents](/ai-development/skills-and-agents) for how they work and where they live.

**Spec-Driven Development** adds structure to how we use AI on non-trivial work. Instead of jumping straight to code, we capture intent and requirements as artifacts that the AI can reference and reviewers can verify against. See [Spec-Driven Development](/ai-development/spec-driven-development) for the methodology.

## Principles

Six commitments that guide how we work with AI:

**Human judgment drives the process.** AI generates, humans decide. You review every suggestion, you understand the code before it ships, and you own the result. The specs, the design decisions, the quality bar: those are yours. Don't drift into being a passenger in your own project. When the agent is doing the work, you should be doing the thinking.

**Specs before code.** When changes go beyond simple fixes (new features, architectural changes, multi-step tasks), we capture intent and requirements before generating code. This gives the AI better context, gives reviewers something to verify against, and gives future developers a record of why things are the way they are. See [Spec-Driven Development](/ai-development/spec-driven-development).

**Minimal and battle-tested.** We curate a small set of tools and learn them deeply rather than chasing every new thing. Every tool must earn its place, and keep earning it. What we use will evolve, but by converging on a shared approach, everyone speaks the same language.

**Use the approved tools for work.** The tools documented in these pages are what we use on company projects. This is how we maintain a shared language, keep knowledge transferable, and avoid fragmentation. If you think another tool deserves a spot, bring a structured proposal: what it does better, how it integrates, and what it would replace. We're open to change; we just need it to be actionable, not anecdotal.

**Share what works.** When you discover a useful skill, prompt pattern, or workflow, contribute it back to [sf-awesome-copilot](https://github.com/sparkfabrik/sf-awesome-copilot) so the whole team benefits. A shared toolset means shared knowledge: what one person learns becomes available to everyone.

**Stay in control.** Understand what the agents have access to. Review their changes before committing. Don't grant more permissions than a task requires. When coding agents [built an entire social network](https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys) without human oversight, a missing configuration exposed 1.5 million API keys. Speed without review is how that happens. Autonomous agents are powerful, but autonomy without oversight is a liability.

## Getting started

If you're new to AI-assisted development at SparkFabrik, follow the steps below. They use `sjust`, sparkdock's [just](https://github.com/casey/just)-based task runner; if you don't have it yet, run `sparkdock-upgrade` first.

1. **Run `sjust sparkdock-upgrade`** to install or update all tools (Copilot CLI, OpenCode, OpenSpec, shared skills, and CLI utilities)
2. **Read [Tools and Setup](/ai-development/tools-and-setup)** to understand what's available and how to use the shell aliases
3. **Run `sjust sf-agents-status`** to verify that your skills and agent profiles are synced
4. **Try it on a real task:** open VS Code with Copilot, or type `co` in your terminal for a quick one-shot prompt (or `c` to start OpenCode)
5. **When you're ready for structured work**, read [Spec-Driven Development](/ai-development/spec-driven-development) and try the `/opsx:onboard` slash command in your AI chat session for a guided walkthrough

Existing policies like the [Merge Requests Policy](/tools-and-policies/gitlab-mr-policy) and the [Universal Definition of Done](/tools-and-policies/universal-dod) apply to AI-generated code just as they do to hand-written code. AI tools help you meet those standards; they don't exempt you from them.
