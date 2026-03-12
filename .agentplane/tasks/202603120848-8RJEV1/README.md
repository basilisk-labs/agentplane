---
id: "202603120848-8RJEV1"
title: "Cover non-README active task artifacts in commit regressions"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:51:22.621Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add regression coverage for non-README files under the active task subtree so allow-tasks semantics are proven beyond task README commits."
events:
  -
    type: "status"
    at: "2026-03-12T08:54:57.552Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add regression coverage for non-README files under the active task subtree so allow-tasks semantics are proven beyond task README commits."
doc_version: 3
doc_updated_at: "2026-03-12T08:54:57.552Z"
doc_updated_by: "CODER"
description: "Add regression coverage proving that --allow-tasks admits non-README files under the active task subtree without admitting unrelated task artifacts."
id_source: "generated"
---
## Summary

Cover non-README active task artifacts in commit regressions

Add regression coverage proving that --allow-tasks admits non-README files under the active task subtree without admitting unrelated task artifacts.

## Scope

- In scope: Add regression coverage proving that --allow-tasks admits non-README files under the active task subtree without admitting unrelated task artifacts.
- Out of scope: unrelated refactors not required for "Cover non-README active task artifacts in commit regressions".

## Plan

1. Add an end-to-end commit regression for a non-README file under the active task subtree. 2. Keep the allowlist semantics narrow so unrelated task directories remain blocked. 3. Verify with the existing guard/commit test contour only.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: active-task artifact commit paths pass, unrelated task artifacts stay blocked.
2. Inspect the new regression fixture. Expected: it stages a non-README file under `.agentplane/tasks/<task-id>/` and commits successfully with `--allow-tasks` but without an explicit duplicate task prefix.
3. Confirm no unrelated allowlist semantics changed. Expected: existing active-task README coverage still passes unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
