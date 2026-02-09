---
id: "202602091511-31QHD7"
title: "AGENTS.md: make packaged policy workspace-generic"
result_summary: "AGENTS policy text updated for universal workspaces"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "policy"
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
  hash: "2da2ad3c7243b760017dff451f5754dfa8da179a"
  message: "✅ 31QHD7 policy: make AGENTS.md workspace-generic"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Update packaged AGENTS.md to be workspace-generic and operationally accurate; then run lint/tests and commit."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Updated the packaged policy text to be workspace-generic, consistent about terminology (workspace/outside-workspace), robust on uninitialized/non-git directories via conditional preflight guidance, and explicit about approvals in interactive vs non-interactive runs. Ran bun run lint and bun run test:full."
events:
  -
    type: "status"
    at: "2026-02-09T15:12:59.795Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Update packaged AGENTS.md to be workspace-generic and operationally accurate; then run lint/tests and commit."
  -
    type: "status"
    at: "2026-02-09T15:17:09.709Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Updated the packaged policy text to be workspace-generic, consistent about terminology (workspace/outside-workspace), robust on uninitialized/non-git directories via conditional preflight guidance, and explicit about approvals in interactive vs non-interactive runs. Ran bun run lint and bun run test:full."
doc_version: 2
doc_updated_at: "2026-02-09T15:17:09.709Z"
doc_updated_by: "ORCHESTRATOR"
description: "Update packages/agentplane/assets/AGENTS.md to describe a universal agentplane-managed development workspace: consistent terminology (workspace/outside-workspace), conditional preflight for uninitialized/non-git dirs, clarify approvals in interactive vs non-interactive runs, and avoid repo-specific/dev-contour/VSCode-extension assumptions."
id_source: "generated"
---
## Summary

Revise the packaged AGENTS policy (packages/agentplane/assets/AGENTS.md) so it describes a universal agentplane-managed development workspace, not the agentplane monorepo. Make terminology consistent (workspace/outside-workspace), make preflight conditional for non-git/uninitialized directories, and clarify how approvals work in interactive vs non-interactive runs.

## Scope

In scope: packages/agentplane/assets/AGENTS.md. Out of scope: CLI behavior changes, release/tag/publish, config schema changes.

## Plan

1. Edit packages/agentplane/assets/AGENTS.md: reframe to agentplane-managed workspace; unify terms (workspace/outside-workspace); make preflight conditional; document approvals (interactive vs non-interactive flags); treat commit/push guidance as default with override protocol.\n2. Run bun run lint and bun run test:full.\n3. Commit with allowlist + allow-policy.

## Risks


## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task or restore packages/agentplane/assets/AGENTS.md from git history.
