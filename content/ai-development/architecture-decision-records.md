/*
Description: Architecture Decision Records: recording the choices that shape a system
Sort: 50
*/

## TL;DR

An Architecture Decision Record (ADR) is a short markdown file that captures one architecturally significant decision: the context that forced it, what was decided, and its consequences. ADRs live in the project repository under `doc/adr`, numbered chronologically, and each carries a YAML frontmatter block so tooling and coding agents can index them. You write one when you make a choice that shapes the system; you read them before contradicting one.

ADRs complement [Spec-Driven Development](/ai-development/spec-driven-development): specs drive the work on a feature, ADRs record the standing choices of the whole system. A spec is archived when the feature ships; an ADR stays relevant for the life of the project.

## Why we record decisions

A codebase shows what was built, never why. Six months after a choice, the context is gone: the constraint that ruled out the obvious alternative, the incident that motivated the workaround, the trade-off that was accepted on purpose.

Recording decisions pays off three ways:

- **Nobody re-litigates settled questions.** When a record says "we moved away from X because Y", the team (and its AI agents) stops proposing X every quarter. The choice was conscious, and the record proves it.
- **Changes happen with the context in hand.** A decision made under constraints that no longer hold can be reversed deliberately, with a new record superseding the old one. The old record stays: knowing what *was* decided, and why, is part of the system's history.
- **Coding agents stop guessing.** An agent that can read "layouts are built with component A, not framework B" does not generate framework B code. Without the record, it guesses from the code and sometimes guesses against a deliberate choice. We have seen an agent "fix" a cache bug by disabling the module that implemented the caching, because nothing told it the module was a decision.

## When to write one (and when not to)

An ADR records an **architecturally significant** decision: one that affects structure, non-functional characteristics, dependencies, interfaces, or construction techniques.

Good ADR material: which frontend framework, which CSS strategy, how configuration is deployed, which module owns a cross-cutting concern, why a platform service was adopted or abandoned.

Not ADR material: a button color, a refactoring that changes no contract, anything a linter already enforces, feature-level requirements (that is a spec).

If the team would want to know about the choice a year from now before changing it, write the record. If it only matters until the merge request is merged, it belongs in the MR description.

## The format

We follow [Michael Nygard's format](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions): Title, Status, Context, Decision, Consequences. One or two pages, full sentences, written as a conversation with a future developer.

Records live in `doc/adr/`, named `NNNN-short-noun-phrase.md` and numbered chronologically. Numbers are never reused: a reversed decision is marked **superseded** by the record that replaces it, and both stay in the repository.

On top of the Nygard body, every record carries a **YAML frontmatter block**:

```markdown
---
title: 12. Use paragraphs for editorial layouts
description: >-
  A short, self-contained summary of the decision, at most 1024 characters:
  what was decided and the one reason that matters most.
status: accepted
date: 2026-08-20
---

# 12. Use paragraphs for editorial layouts

Date: 2026-08-20

## Status

Accepted

## Context

...
```

The frontmatter mirrors the body (`title` is the H1, `status` and `date` match the Status and Date sections) and adds the `description`: one to three plain sentences, understandable without opening the file, capped at 1024 characters, the same spirit as an AI skill description. The description is what makes the record discoverable at scale.

## How agents discover ADRs

The frontmatter exists because machines read it:

- **The generated `AGENTS.md` lists every record.** On Firestarter projects, the SparkFabrik Composer plugin scans `doc/adr` on every package run and appends an "Architecture Decision Records" table of contents (linked title plus description) to the generated `AGENTS.md`. An agent entering the codebase sees the decisions in its very first context load, without scanning directories.
- **Packages ship base decision sets.** Infrastructure packages contribute the standing decisions of their stack (one subfolder per package under `doc/adr`), so a new project starts with its foundational choices already recorded instead of an empty folder.
- **The `adr-creator` skill writes the standard.** The shared [sf-agents-harness](https://github.com/sparkfabrik/sf-agents-harness) skill walks you through creating a record conversationally, writes the frontmatter, backfills it on legacy records, and keeps the index current.

## ADRs and Spec-Driven Development

The two artifacts answer different questions and have different lifetimes:

- **A spec** captures the requirements and design of one change. It guides the implementation, and once the change ships it is archived. Specs live with the feature (often inside the module they describe).
- **An ADR** captures a system-level choice. It constrains all future changes, including the specs written for them, until a new record supersedes it.

A useful rule of thumb from practice: if you are choosing *between technologies or structures*, it is an ADR; if you are describing *what a feature must do*, it is a spec. A large piece of work often produces both: one ADR for the structural choice, one spec per feature built on top of it.

## Getting started on a project

1. Create `doc/adr/` (Firestarter projects get it scaffolded, along with `doc/how-to/` and `doc/reference/`).
2. Make the first record the meta-decision "Record architecture decisions" (the `adr-creator` skill or `adr init` creates it).
3. Write a record whenever a significant choice is made, ideally in the same merge request as the change it explains.
4. Before working against an existing decision, read its record; to change it, write a superseding one rather than editing history.
