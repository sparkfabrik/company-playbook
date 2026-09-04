/*
Description: What AI-assisted development means at SparkFabrik and how our tools fit together
Sort: 10
*/

## Table of Contents

- [Our AI development stack](#our-ai-development-stack)
  - [Claude Code](#claude-code)
  - [Supporting tools](#supporting-tools)
- [How the pieces fit together](#how-the-pieces-fit-together)
- [Beyond development](#beyond-development)
- [Principles](#principles)
- [Getting started](#getting-started)

## Our AI development stack

This section of the playbook documents where we are right now. It will change as the technology changes.

For why we are investing in AI-assisted development, read [Where We Are](/ai-development/where-we-are). The rest of this section covers the practical details:

- **[Tools and Setup](/ai-development/tools-and-setup)** for what is installed and how to use it.
- **[Claude Code usage and policy](/ai-development/claude-code-usage)** for usage limits, personal use, and which harnesses are authorized.
- **[Skills and Agents](/ai-development/skills-and-agents)** for the shared resources that customize AI behavior.
- **[Spec-Driven Development](/ai-development/spec-driven-development)** for the methodology behind structured AI-assisted work, with the [OpenSpec reference](/ai-development/openspec-reference) alongside it.
- **[Security](/ai-development/security)** for prompt hygiene, data handling, and incident response.

Our AI development tooling is installed and configured automatically by [sparkdock](https://github.com/sparkfabrik/sparkdock), our workstation provisioning system.

### Claude Code

[Claude Code](https://code.claude.com/docs) is our AI coding assistant. It is an agentic tool: it reads your codebase, forms a plan, executes it, runs tests, and course-corrects, rather than only suggesting code for you to apply.

It runs in two places, with the same capabilities in both:

- **The terminal.** Type `claude` in any project directory to start a session.
- **Visual Studio Code (VS Code).** The Claude Code extension adds inline diffs, plan review, and @-mentions. VS Code is the editor we support.

Project-level skills go in `.claude/skills/` and agent profiles in `.claude/agents/`. See [Tools and Setup](/ai-development/tools-and-setup#ide-integration) for the setup details.

Claude Code runs on a finite usage budget shared across the organization, so knowing how the limits work is part of using the tool well. Read [Claude Code usage and policy](/ai-development/claude-code-usage) before your first heavy session.

GitHub Copilot and OpenCode sit outside the standard setup and are available only for specific, agreed cases. The [support boundary](/ai-development/claude-code-usage#support-boundary) defines when.

### Supporting tools

| Tool                                                                               | What it is                                                                       |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **[OpenSpec](https://openspec.dev)**                                               | Spec-Driven Development framework: captures requirements and design as artifacts |
| **Shared skills and agent profiles**                                               | Reusable agent resources synced by sparkdock from a shared catalog               |
| **[glab](https://gitlab.com/gitlab-org/cli)** and **[gh](https://cli.github.com)** | GitLab and GitHub CLIs that the agent drives through skills                      |

Sparkdock installs glab and gh so Claude Code can fetch issues, read discussions, and check pipelines on your behalf. See [Tools and Setup](/ai-development/tools-and-setup#other-cli-tools) for details.

## How the pieces fit together

Claude Code is general-purpose out of the box. We extend it in two ways.

**Skills and agent profiles** customize how the agent behaves, adding domain knowledge, safety protocols, and role-specific configurations. SparkFabrik maintains a shared catalog, synced to your machine automatically by sparkdock. You can also create your own, and each project can define its own alongside the code. See [Skills and Agents](/ai-development/skills-and-agents) for how they work and where they live.

**Spec-Driven Development** adds structure to how we use AI on non-trivial work. Instead of jumping straight to code, we capture intent and requirements as artifacts that the agent can reference and reviewers can verify against. See [Spec-Driven Development](/ai-development/spec-driven-development) for the methodology.

## Beyond development

The pages in this section focus on **development workflows**: coding agents, terminal tools, and spec-driven methodologies. If you are a developer or cloud engineer, this is your starting point.

For **non-development roles** such as project managers, analysts, marketing, and administrative roles, [Claude.ai](https://claude.ai) is the AI tool we have adopted for work. It suits writing, research, analysis, brainstorming, and structured thinking. Claude is provided through a company subscription. If you do not have access yet, ask your manager or reach out on `#support-hr`. Dedicated guidance for these roles is coming.

For **UI and UX designers**, we are evaluating specialized tools, specifically [Google Stitch](https://stitch.withgoogle.com) and [Figma AI](https://www.figma.com/ai/) with [Make](https://www.figma.com/make/), but we have not converged on an approach yet. If you are a designer using AI in your workflow, we would like to hear what is working for you: your input will shape what we recommend here.

## Principles

Six commitments that guide how we work with AI:

**Human judgment drives the process.** AI generates, humans decide. You review every suggestion, you understand the code before it ships, and you own the result. The specs, the design decisions, the quality bar: those are yours. Do not drift into being a passenger in your own project. When the agent is doing the work, you should be doing the thinking.

**Specs before code.** When changes go beyond simple fixes (new features, architectural changes, multi-step tasks), we capture intent and requirements before generating code. This gives the agent better context, gives reviewers something to verify against, and gives future developers a record of why things are the way they are. See [Spec-Driven Development](/ai-development/spec-driven-development).

**Minimal and battle-tested.** We curate a small set of tools and learn them deeply rather than chasing every new thing. Every tool must earn its place, and keep earning it. What we use will evolve, but by converging on a shared approach, everyone speaks the same language.

**Use the approved tools for work.** The tools documented in these pages are what we use on company projects. This is how we maintain a shared language, keep knowledge transferable, and avoid fragmentation. If you think another tool deserves a spot, bring a structured proposal: what it does better, how it integrates, and what it would replace. We are open to change, we just need it to be actionable rather than anecdotal.

**Share what works.** When you discover a useful skill, prompt pattern, or workflow, contribute it back to the shared catalog so the whole team benefits. A shared toolset means shared knowledge: what one person learns becomes available to everyone. See [Skills and Agents](/ai-development/skills-and-agents) for how to contribute.

**Stay in control.** Understand what the agents have access to. Review their changes before committing. Do not grant more permissions than a task requires. When coding agents [built an entire social network](https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys) without human oversight, a missing configuration exposed 1.5 million API keys. Speed without review is how that happens. Autonomous agents are powerful, but autonomy without oversight is a liability.

## Getting started

If you are new to AI-assisted development at SparkFabrik, follow the steps below. They use `sjust`, sparkdock's [just](https://github.com/casey/just)-based task runner. If you do not have it yet, run `sparkdock-upgrade` first.

1. **Run `sjust sparkdock-upgrade`** to install or update all tools: Claude Code, OpenSpec, the shared skills, and the CLI utilities.
2. **Read [Tools and Setup](/ai-development/tools-and-setup)** to understand what is available and how to authenticate.
3. **Read [Claude Code usage and policy](/ai-development/claude-code-usage)** so you know how the usage limits work before you hit them.
4. **Run `sjust sf-harness-status`** to verify that your skills and agent profiles are synced.
5. **Try it on a real task.** Type `claude` in a project directory, or open the Claude Code extension in VS Code.
6. **When you are ready for structured work**, read [Spec-Driven Development](/ai-development/spec-driven-development) and try the `/opsx:onboard` slash command for a guided walkthrough.

Existing policies like the [Merge Requests Policy](/tools-and-policies/gitlab-mr-policy) and the [Universal Definition of Done](/tools-and-policies/universal-dod) apply to AI-generated code just as they do to hand-written code. AI tools help you meet those standards, they do not exempt you from them.
