---
id: "202602091523-1TY4G2"
title: "upgrade: tighten manifest allowlist + deny config/backends"
result_summary: "Manifest-based upgrade allow/deny rules enforced"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "upgrade"
  - "safety"
  - "cli"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T15:58:09.298Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass; safety tests cover denied/unknown manifest paths and ensure upgrade never touches tasks/backends/config."
commit:
  hash: "7f773277d5859156771c9616f1346cdc859de3f4"
  message: "✅ 1TY4G2 upgrade: enforce bundle manifest + strict allow/deny"
comments:
  -
    author: "CODER"
    body: "Start: tighten upgrade allow/deny rules to only allow AGENTS.md + .agentplane/agents/**; add safety tests rejecting unknown/denied manifest paths (backends, tasks.json, recipes)."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Upgrade now applies only manifest-listed files and rejects denied/unknown paths (including tasks, backends, config exports)."
events:
  -
    type: "status"
    at: "2026-02-09T15:45:33.025Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten upgrade allow/deny rules to only allow AGENTS.md + .agentplane/agents/**; add safety tests rejecting unknown/denied manifest paths (backends, tasks.json, recipes)."
  -
    type: "verify"
    at: "2026-02-09T15:58:09.298Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass; safety tests cover denied/unknown manifest paths and ensure upgrade never touches tasks/backends/config."
  -
    type: "status"
    at: "2026-02-09T15:58:18.967Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Upgrade now applies only manifest-listed files and rejects denied/unknown paths (including tasks, backends, config exports)."
doc_version: 2
doc_updated_at: "2026-02-09T15:58:18.967Z"
doc_updated_by: "CODER"
description: "Restrict upgrade application to AGENTS.md and .agentplane/agents/** only; deny tasks, config, backends, worktrees, caches even if present in the bundle/manifest. Update framework.manifest.json and add safety tests."
id_source: "generated"
---
## Summary

Make upgrade safe for live workspaces by applying only policy + agent prompt updates (AGENTS.md and .agentplane/agents/**). Explicitly deny config/backends/tasks/worktrees/caches regardless of bundle contents.

## Scope

packages/agentplane/assets/framework.manifest.json, packages/agentplane/src/commands/upgrade.ts, and upgrade safety tests.

## Plan

1. Update manifest to include only AGENTS.md and .agentplane/agents/**.\n2. Update upgrade allow/deny checks to enforce the same (deny by default).\n3. Add tests: does not touch tasks.json/tasks/**; does not touch backends/**; rejects unknown manifest paths.\n4. bun run lint + bun run test:full.

## Risks

Behavior change: upgrade will stop updating config/backend stubs by default. Mitigation: document that upgrade is policy/prompt-only; require explicit future command for config migrations.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T15:58:09.298Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass; safety tests cover denied/unknown manifest paths and ensure upgrade never touches tasks/backends/config.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T15:45:33.025Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit; restore broader manifest/allowlist.
