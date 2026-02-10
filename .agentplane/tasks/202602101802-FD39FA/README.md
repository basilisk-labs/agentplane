---
id: "202602101802-FD39FA"
title: "Docs user: getting started (overview, prerequisites, setup)"
result_summary: "Getting-started docs reflect current init/upgrade behavior and workspace invariants."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602101802-5P3DPN"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "1d2a8c75156f3c4b15b5eec835148be45ba1110f"
  message: "✅ 5P3DPN close: Docs navigation reflects current reading order and exposes generated CLI reference. (202602101802-5P3DPN) [docs]"
comments:
  -
    author: "DOCS"
    body: "Start: Refresh getting-started docs (overview/prereqs/setup/breaking changes) to match current init/upgrade behavior and approvals."
  -
    author: "DOCS"
    body: "Verified: Refreshed getting-started docs to match current init/upgrade behavior, AGENTS.md invariants, and network-gated upgrade flow."
events:
  -
    type: "status"
    at: "2026-02-10T18:07:38.846Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Refresh getting-started docs (overview/prereqs/setup/breaking changes) to match current init/upgrade behavior and approvals."
  -
    type: "status"
    at: "2026-02-10T18:16:31.957Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Refreshed getting-started docs to match current init/upgrade behavior, AGENTS.md invariants, and network-gated upgrade flow."
doc_version: 2
doc_updated_at: "2026-02-10T18:19:25.404Z"
doc_updated_by: "DOCS"
description: "Refresh getting-started pages to match current init/upgrade behavior, approvals, and repo-scoped workflow."
id_source: "generated"
---
## Summary

Refresh getting-started docs to match current init/upgrade behavior, approvals, and workspace layout.

## Scope

In-scope: docs/user/overview.mdx, docs/user/prerequisites.mdx, docs/user/setup.mdx, docs/user/breaking-changes.mdx. Out-of-scope: deeper workflow/commands pages (handled by later docs tasks).

## Plan

1. Audit getting-started pages for drift vs current CLI behavior and policies.\n2. Update init/setup description to mention AGENTS.md + .agentplane layout + init flags (including --gitignore-agents).\n3. Update upgrade section to reflect default agent-mode planning and --auto apply mode; mention upgrade artifacts location and network gating.\n4. Update overview/prerequisites/breaking changes notes where they reference outdated assumptions.

## Risks

Risk: onboarding docs describe flags or behaviors that no longer exist, leading to failed first runs. Mitigation: cross-check against `agentplane help init --compact` and `agentplane help upgrade --compact`.

## Verify Steps

- Confirm updated docs match init - Initialize agentplane project files under .agentplane/.

Usage:
  agentplane init [options]

Options:
  --ide <codex|cursor|windsurf>  IDE rules integration target (default: codex). (choices=codex|cursor|windsurf)
  --workflow <direct|branch_pr>  Workflow mode (default: direct). (choices=direct|branch_pr)
  --backend <local|redmine>  Task backend (default: local). (choices=local|redmine)
  --hooks <true|false>  Install git hooks (non-interactive requires an explicit value).
  --require-plan-approval <true|false>  Require explicit plan approval before starting work.
  --require-network-approval <true|false>  Require explicit approval before any network operation.
  --require-verify-approval <true|false>  Require explicit approval before recording verification.
  --recipes <none|id1,id2,...>  Optional bundled recipes selection (comma-separated), or 'none'.
  --force  Overwrite init conflicts by deleting existing paths. (default=false)
  --backup  Backup init conflicts before overwriting. (default=false)
  --yes  Non-interactive mode (do not prompt; use defaults for missing flags). (default=false)
  --gitignore-agents  Add agent files (AGENTS.md and .agentplane/agents/) to .gitignore and skip the initial install commit. (default=false) and upgrade - Upgrade the local agentplane framework bundle in the repo.

Usage:
  agentplane upgrade [options]

Options:
  --agent  Generate an agent-assisted upgrade plan (no files are modified). This is the default mode. (default=false)
  --auto  Apply the upgrade automatically (writes managed files). (default=false)
  --remote  Fetch the framework bundle from GitHub releases (requires network approvals). (default=false)
  --allow-tarball  Allow falling back to a GitHub repo tarball when release assets are missing (no checksum verification). (default=false)
  --tag <tag>  GitHub release tag (defaults to latest).
  --source <repo-url>  Override GitHub repo source URL (defaults to config.framework.source).
  --bundle <path|url>  Use a local path or URL for the upgrade bundle archive.
  --checksum <path|url>  Use a local path or URL for the bundle checksum file (required with --bundle).
  --asset <name>  Override the GitHub release asset name for the bundle.
  --checksum-asset <name>  Override the GitHub release asset name for the checksum file.
  --dry-run  Report changes without modifying files. (default=false)
  --no-backup  Disable backups (default is to create backups). (default=false)
  --yes  Auto-approve network access prompts (subject to config approvals). (default=false).\n- Confirm all referenced paths exist (AGENTS.md, .agentplane/, .agentplane/.upgrade/).\n- Run docs/user/overview.mdx:30:- A global policy document (`AGENTS.md`) that defines roles, approvals, and workflow guardrails.
docs/user/setup.mdx:27:- `AGENTS.md` at the repo root (the canonical workflow/policy document for agents).
docs/user/setup.mdx:47:This adds agent files (`AGENTS.md` and `.agentplane/agents/`) to `.gitignore` and skips the initial install commit.
docs/user/cli-reference.generated.mdx:622:- `--allow-policy`: Allow policy edits (e.g. AGENTS.md). (default=false)
docs/user/cli-reference.generated.mdx:698:- `--allow-policy`: Allow policy edits (e.g. AGENTS.md). (default=false)
docs/user/cli-reference.generated.mdx:831:Generate IDE entrypoints from AGENTS.md.
docs/user/breaking-changes.mdx:27:- `AGENTS.md` is the canonical policy file for agent behavior in a repo; treat it as source-controlled infrastructure. to ensure consistency in wording.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task to restore the previous getting-started wording.

## Context

Getting-started pages must reflect the current behavior of agentplane init/upgrade and current workspace invariants (AGENTS.md in repo root, .agentplane layout, upgrade artifacts and network gating).
