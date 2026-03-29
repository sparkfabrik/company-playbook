/*
Description: Security practices for AI-assisted development: prompt hygiene, content exclusion, data handling, and incident response
Sort: 25
*/

## TL;DR

- **Never put credentials, PII, or client secrets in prompts** — treat prompts like emails
- **Copilot content exclusion does NOT work for CLI agents** — human review is the primary safeguard
- **Both tools are configured with safe defaults at the org level**: GitHub Copilot has content exclusion for `.env` and sensitive paths (IDE only); OpenCode blocks `.env` files and [sparkdock](https://github.com/sparkfabrik/sparkdock/blob/master/config/macos/opencode.json) adds 150+ permission rules for destructive commands
- **Your data is not used for training** on commercial plans (Copilot, Claude for Work)
- **If a secret is committed**: revoke first, clean history second, notify the team

## Table of Contents

- [TL;DR](#tldr)
- [Prompt hygiene](#prompt-hygiene)
- [Content exclusion](#content-exclusion)
- [Agent permissions](#agent-permissions)
- [Data handling by provider](#data-handling-by-provider)
- [If something goes wrong](#if-something-goes-wrong)
- [References](#references)

## Prompt hygiene

Everything you type into an AI tool — prompt, pasted code, file content — is transmitted to a model provider. Treat prompts the way you treat emails: assume they can be read by someone outside the company.

**Never include in a prompt:**

- Credentials, API keys, tokens, or passwords
- Personally identifiable information (names, emails, phone numbers, addresses)
- Client-confidential business logic, proprietary algorithms, or trade secrets
- Database connection strings or infrastructure secrets

**Instead:**

- Reference files by path (`review the auth logic in src/auth/session.ts`) rather than pasting their contents, when the tool has access to your filesystem
- Use placeholder values when describing patterns (`the API key is stored in FOO_API_KEY`)
- If you need to share a code snippet, strip secrets first

This applies to all tools: GitHub Copilot (IDE and CLI), OpenCode, and Claude.ai.

## Content exclusion

GitHub Copilot supports [content exclusion](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) at the repository and organization level. You can configure paths that Copilot should ignore — for example, `secrets.json`, `*.env`, or entire directories containing sensitive data. This is configured in the repository settings on GitHub or in the organization's Copilot settings.

However, there is a critical limitation: **content exclusion does not apply to GitHub Copilot CLI, the Copilot coding agent, or Agent mode in IDE chat**. It only works for inline completions and regular chat in the IDE. Since our primary coding workflows use CLI agents (Copilot CLI and OpenCode), content exclusion alone is not sufficient to protect sensitive files.

For agentic tools, the safeguards are:

- **Human review is the primary gate.** Always review agent-generated changes before committing. This is not optional; it's the most effective protection we have.
- **OpenCode denies `.env` files by default.** OpenCode's [permission system](https://opencode.ai/docs/permissions) blocks reading `.env` and `.env.*` files out of the box. Access to directories outside the project also requires explicit approval.
- **sparkdock configures safe defaults.** Destructive operations (force-push, file deletion outside the project, etc.) require confirmation. See [Agent permissions](#agent-permissions) below.
- **`.gitignore` is your last line of defense.** Ensure secrets, key files, and environment configs are gitignored. If a file isn't tracked, an agent can still read it, but it won't end up in a commit unless you explicitly add it.

Content exclusion is already configured at the SparkFabrik organization level for GitHub Copilot, covering `.env` files and other sensitive paths in IDE completions and chat. For additional repository-specific rules, go to the repository's **Settings > Copilot > Content exclusion** on GitHub.

## Agent permissions

OpenCode provides a granular [permission system](https://opencode.ai/docs/permissions) that controls what the agent can do without asking. Each action (read, edit, bash, etc.) can be set to `allow`, `ask`, or `deny`, with pattern matching for fine-grained control.

Key defaults that [sparkdock configures](https://github.com/sparkfabrik/sparkdock/blob/master/config/macos/opencode.json):

- `.env` and `.env.*` files: **denied** from reading
- External directories (outside the project): require **approval**
- Doom loop detection: if the agent repeats the same tool call three times with identical input, it pauses and asks
- Destructive shell commands: comprehensive rules covering `rm -rf`, `sudo`, `git push --force`, `docker system prune`, `terraform destroy`, `kubectl delete`, cloud provider destructive operations (AWS, GCP, Azure), and more — each classified as either `ask` (requires confirmation) or `deny` (blocked entirely)

You can customize permissions per project (in `opencode.json`) or per agent profile (in the agent's Markdown file). For example, a read-only review agent can deny all edits:

```yaml
# In an agent profile
permission:
  edit: deny
  bash: ask
  webfetch: deny
```

For full documentation on permission patterns, wildcards, and agent-level overrides, see the [OpenCode Permissions docs](https://opencode.ai/docs/permissions).

GitHub Copilot CLI does not have an equivalent permission system. Its primary safeguard is the interactive confirmation prompt before executing commands, and the content exclusion settings described above (with the noted limitations).

## Data handling by provider

Understanding where your data goes and how it's treated is important, especially when working with client projects.

| | **GitHub Copilot** | **Claude.ai (commercial)** | **OpenCode** |
|-|-------------------|---------------------------|-------------|
| **What's sent** | Code snippets and prompts, transmitted in real-time | Conversation text and any pasted content | Proxies through the configured provider (GitHub Copilot in our setup) |
| **Retained?** | Not retained by default | Retained for up to 90 days for safety monitoring, then deleted | No separate retention; follows the provider's policy |
| **Used for training?** | No | No, unless you join the [Development Partner Program](https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program) | No (provider-dependent) |
| **Key reference** | [GitHub Copilot Trust Center](https://copilot.github.trust.page), [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) | [Anthropic Privacy Center (Commercial)](https://privacy.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training), [Trust Center](https://trust.anthropic.com/) | [OpenCode docs](https://opencode.ai/docs/) |

**Important notes:**

- The data handling guarantees above apply to **commercial/organization plans**. If you use Claude with a personal Free or Pro account, your conversations may be used for model training unless you disable the "Model Improvement" setting. Always use the company-provided subscription for work.
- GitHub Copilot follows [Microsoft's Responsible AI Standard](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Responsible-AI-Standard-General-Requirements.pdf). Anthropic uses [Constitutional AI](https://www.anthropic.com/news/claudes-constitution) principles that include privacy safeguards.
- It is the employer's responsibility to verify that provider terms are acceptable for specific client engagements. If a client has strict data residency or processing requirements, consult your team lead or the legal team before using AI tools on that project.

## If something goes wrong

### A credential was committed to the repository

1. **Revoke or rotate the credential immediately.** Do this before anything else. The credential should be considered compromised from the moment it was pushed.
2. **Remove it from git history.** Use [git filter-repo](https://github.com/newren/git-filter-repo) or [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to rewrite history and eliminate the secret from all commits. A force-push will be required after rewriting.
3. **Notify the team.** Inform your team lead so they can assess whether the credential was exposed to external parties (e.g., if the repository is public or mirrored).
4. **Check for exposure.** If the repository is hosted on GitHub, [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning) may have already flagged it. Check the repository's Security tab.

### Client data was included in a prompt

If you accidentally pasted client PII or confidential data into a prompt:

- On the **commercial Claude plan**, your data is not used for training and is deleted after the retention period (up to 90 days). However, it was still transmitted to and processed by Anthropic's servers.
- On **GitHub Copilot**, code snippets are not retained by default.
- In either case: **inform your team lead**, especially if the data falls under GDPR, contractual NDAs, or other regulatory obligations. The team lead will determine whether the client or legal team needs to be notified.

### General principle

Assume that anything sent to an AI provider has been seen by a third party. Act accordingly: rotate credentials, notify stakeholders, and document what happened. Speed matters more than perfection in incident response.

## References

- [GitHub Copilot Trust Center](https://copilot.github.trust.page)
- [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)
- [GitHub Terms for Additional Products and Features](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
- [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Responsible use of GitHub Copilot features](https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features)
- [Anthropic Privacy Center — Commercial data handling](https://privacy.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training)
- [Anthropic Trust Center](https://trust.anthropic.com/)
- [OpenCode Permissions](https://opencode.ai/docs/permissions)
- [sparkdock OpenCode configuration](https://github.com/sparkfabrik/sparkdock/blob/master/config/macos/opencode.json)
- [git filter-repo](https://github.com/newren/git-filter-repo) — for removing secrets from git history
- [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) — simpler alternative for removing secrets from git history
