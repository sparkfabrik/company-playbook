/*
Description: Prompt hygiene, agent permissions, data handling, and incident response for AI-assisted development
Sort: 25
*/

## TL;DR

- **Never put credentials, personal data, or client secrets in prompts.** Treat prompts like emails.
- **Human review is the primary safeguard.** No configuration replaces reading what the agent changed before you commit it.
- **The organization's managed policy sets the guardrails.** It read-blocks secret files and defines which operations need confirmation, and you cannot override it from a session.
- **Your data is not used for training** on the commercial plans we use for work.
- **If a secret is committed**: revoke first, clean history second, notify the team.

## Table of Contents

- [TL;DR](#tldr)
- [Prompt hygiene](#prompt-hygiene)
- [Agent permissions](#agent-permissions)
- [Protecting sensitive files](#protecting-sensitive-files)
- [Data handling by provider](#data-handling-by-provider)
- [If something goes wrong](#if-something-goes-wrong)
- [References](#references)

## Prompt hygiene

Everything you type into an AI tool (prompt, pasted code, file content) is transmitted to a model provider. Treat prompts the way you treat emails: assume they can be read by someone outside the company.

**Never include in a prompt:**

- Credentials, API keys, tokens, or passwords
- Personally identifiable information such as names, emails, phone numbers, and addresses
- Client-confidential business logic, proprietary algorithms, or trade secrets
- Database connection strings or infrastructure secrets

**Instead:**

- Reference files by path (`review the auth logic in src/auth/session.ts`) rather than pasting their contents, when the tool has access to your filesystem
- Use placeholder values when describing patterns (`the API key is stored in FOO_API_KEY`)
- Strip secrets from any snippet before sharing it

This applies to every AI tool you use for work, including Claude Code, Claude.ai, and anything running under an exception.

## Agent permissions

Claude Code asks for confirmation before it acts. Each tool call (reading, editing, running a shell command) can be allowed, prompted, or denied, and the rules come from three layers: the organization's managed policy, your user settings in `~/.claude/settings.json`, and per-project settings in `.claude/settings.json`.

**The managed policy wins.** Signing in with your SparkFabrik account applies organization policy automatically. It takes absolute precedence over your user and project settings, and cannot be overridden from a session. Among other things it read-blocks secret files such as `.env`, `secrets/`, credential files, and private keys, so the agent cannot read them even if you ask it to.

For what the organization can lock and how to check what is active in your session, see [Org-managed settings](/ai-development/claude-code-usage#org-managed-settings).

**Customize per project, not around the policy.** You can tighten permissions for a specific repository in `.claude/settings.json`, and restrict a subagent's tool access in its agent profile. A read-only review agent, for example, declares only the tools it needs:

```markdown
---
name: reviewer
description: Reviews code without changing it
tools:
  - Read
  - Grep
  - Glob
---
```

Loosening the managed rules is not possible, and working around them is a policy violation rather than a configuration problem. If a rule blocks legitimate work, raise it with the platform team so the policy can change for everyone.

> **Note**: only the harness as provisioned by sparkdock is supported. Custom plugins, skills, agents, and MCP servers beyond that need pre-approval. See [Support boundary](/ai-development/claude-code-usage#support-boundary).

## Protecting sensitive files

Permission rules reduce the risk, they do not remove it. These are the safeguards that actually hold:

- **Human review is the primary gate.** Always review agent-generated changes before committing. This is not optional, and it is the most effective protection we have.
- **`.gitignore` is your last line of defense.** Keep secrets, key files, and environment configs gitignored. An agent may still read an untracked file, but it will not end up in a commit unless you explicitly add it.
- **Keep secrets out of the working tree.** Prefer a secret manager over a local file. What is not on disk cannot be read, pasted, or committed.
- **Scope the session.** Start the agent in the project directory rather than your home directory, so unrelated repositories and credentials are out of reach.

For anyone working under a [GitHub Copilot seat exception](/ai-development/claude-code-usage#support-boundary), one limitation is worth knowing: Copilot's [content exclusion](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) applies only to inline completions and IDE chat. It does **not** apply to the Copilot CLI, the Copilot coding agent, or agent mode in IDE chat. Content exclusion is configured at the organization level for `.env` files and other sensitive paths, but do not treat it as protection for agentic work.

## Data handling by provider

Understanding where your data goes and how it is treated matters most when working with client projects.

|                        | **Claude Code and Claude.ai (commercial)**                                                                                                                                 | **GitHub Copilot** (exception only)                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What is sent**       | Prompts, conversation text, and the file contents the agent reads or is given                                                                                              | Code snippets and prompts, transmitted in real time                                                                                                                                    |
| **Retained?**          | Retained for a limited period for safety monitoring, then deleted                                                                                                          | Not retained by default                                                                                                                                                                |
| **Used for training?** | No, unless you join the [Development Partner Program](https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program)                            | No                                                                                                                                                                                     |
| **Key reference**      | [Anthropic Privacy Center](https://privacy.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training), [Trust Center](https://trust.anthropic.com/) | [GitHub Copilot Trust Center](https://copilot.github.trust.page), [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) |

**Important notes:**

- The guarantees above apply to **commercial and organization plans**. On a personal Free or Pro Claude account, conversations may be used for model training unless you disable the model improvement setting. Always use the company-provided account for work, and keep personal work on a separate profile as described in [Profiles and multiple accounts](/ai-development/claude-code-usage#profiles-and-multiple-accounts).
- Anthropic applies [Constitutional AI](https://www.anthropic.com/news/claudes-constitution) principles that include privacy safeguards. GitHub Copilot follows [Microsoft's Responsible AI Standard](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Responsible-AI-Standard-General-Requirements.pdf).
- Running an agent against a personal API key puts the work outside the organization's plan, policy, and support. The [support boundary](/ai-development/claude-code-usage#support-boundary) explains why this is not allowed for work.
- It is the employer's responsibility to verify that provider terms are acceptable for a specific client engagement. If a client has strict data residency or processing requirements, consult your team lead or the legal team before using AI tools on that project.

## If something goes wrong

### A credential was committed to the repository

1. **Revoke or rotate the credential immediately.** Do this before anything else. Consider the credential compromised from the moment it was pushed.
2. **Remove it from git history.** Use [git filter-repo](https://github.com/newren/git-filter-repo) or [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to rewrite history and eliminate the secret from all commits. A force-push is required after rewriting.
3. **Notify the team.** Inform your team lead so they can assess whether the credential was exposed to external parties, for example if the repository is public or mirrored.
4. **Check for exposure.** On GitHub, [secret scanning](https://docs.github.com/en/code-security/secret-scanning) may have already flagged it. Check the repository's Security tab.

### Client data was included in a prompt

If you accidentally pasted client personal data or confidential information into a prompt:

- On the **commercial Claude plan**, your data is not used for training and is deleted after the retention period. It was still transmitted to and processed by Anthropic's servers.
- On **GitHub Copilot**, code snippets are not retained by default.
- In either case, **inform your team lead**, especially if the data falls under the General Data Protection Regulation (GDPR), contractual non-disclosure agreements, or other regulatory obligations. The team lead determines whether the client or the legal team needs to be notified.

### General principle

Assume that anything sent to an AI provider has been seen by a third party. Act accordingly: rotate credentials, notify stakeholders, and document what happened. Speed matters more than perfection in incident response.

## References

- [Claude Code settings](https://code.claude.com/docs/en/settings) (permission rules, precedence, lockable options)
- [Anthropic Privacy Center, commercial data handling](https://privacy.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training)
- [Anthropic Trust Center](https://trust.anthropic.com/)
- [GitHub Copilot Trust Center](https://copilot.github.trust.page)
- [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)
- [GitHub Terms for Additional Products and Features](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
- [git filter-repo](https://github.com/newren/git-filter-repo), for removing secrets from git history
- [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/), a simpler alternative for the same job
