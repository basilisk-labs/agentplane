---
id: "202602091523-1TY4G2"
title: "upgrade: tighten manifest allowlist + deny config/backends"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:23:27.710Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit; restore broader manifest/allowlist.
