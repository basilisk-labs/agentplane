---
id: "202605211039-QZXN8Q"
title: "Fix open context GitHub issues"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T10:40:34.103Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved GitHub context issue batch in branch_pr worktree, covering wiki lint/link contracts, manifest lock source inventory, stale projection health/search behavior, and maximum-assimilation derived artifact consistency."
events:
  -
    type: "status"
    at: "2026-05-21T10:40:55.447Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved GitHub context issue batch in branch_pr worktree, covering wiki lint/link contracts, manifest lock source inventory, stale projection health/search behavior, and maximum-assimilation derived artifact consistency."
doc_version: 3
doc_updated_at: "2026-05-21T10:50:37.645Z"
doc_updated_by: "CODER"
description: "Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up."
sections:
  Summary: |-
    Fix open context GitHub issues

    Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up.
  Scope: "Included GitHub issues: #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Related investigation only: #3879. Allowed implementation surfaces: packages/agentplane context commands/runtime, focused context tests, generated CLI docs if command semantics change, and task/PR artifacts for this task."
  Plan: |-
    1. Implement the change for "Fix open context GitHub issues".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    - Run focused context tests covering wiki lint/link resolution, manifest lock source inventory, stale projection health/search behavior, and derived graph/fact consistency.
    - Run TypeScript typecheck or the repo's focused equivalent for touched packages.
    - Run node .agentplane/policy/check-routing.mjs.
    - Run ap doctor from the task worktree or record a concrete environment blocker.
    - Verify GitHub issues addressed in PR body; do not close issues until merged PR evidence is available.
  Verification: |-
    Executed in task worktree.

    - PASS: bun test packages/agentplane/src/commands/context/wiki.obsidian.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts (29 pass, 0 fail).
    - PASS: bun run typecheck.
    - PASS: ./node_modules/.bin/eslint on the changed context files.
    - PASS: node .agentplane/policy/check-routing.mjs.
    - PASS: git diff --check.
    - PASS: ap doctor (doctor OK; errors=0 warnings=0).

    GitHub issue coverage: #3989/#3990/#3992/#3993/#3994 covered by wiki lint/link/frontmatter/.obsidian rules; #3996/#3998 covered by complete manifest source inventory; #3997 covered by stale projection failure and stale search suppression; #3991 covered by maximum-assimilation graph_refs vs derived projection gate. #3879 remains a v0.7 runner/runtime backlog item per existing GitHub issue comment and is not fixed by this context contract batch.
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix open context GitHub issues

Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up.

## Scope

Included GitHub issues: #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Related investigation only: #3879. Allowed implementation surfaces: packages/agentplane context commands/runtime, focused context tests, generated CLI docs if command semantics change, and task/PR artifacts for this task.

## Plan

1. Implement the change for "Fix open context GitHub issues".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

- Run focused context tests covering wiki lint/link resolution, manifest lock source inventory, stale projection health/search behavior, and derived graph/fact consistency.
- Run TypeScript typecheck or the repo's focused equivalent for touched packages.
- Run node .agentplane/policy/check-routing.mjs.
- Run ap doctor from the task worktree or record a concrete environment blocker.
- Verify GitHub issues addressed in PR body; do not close issues until merged PR evidence is available.

## Verification

Executed in task worktree.

- PASS: bun test packages/agentplane/src/commands/context/wiki.obsidian.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts (29 pass, 0 fail).
- PASS: bun run typecheck.
- PASS: ./node_modules/.bin/eslint on the changed context files.
- PASS: node .agentplane/policy/check-routing.mjs.
- PASS: git diff --check.
- PASS: ap doctor (doctor OK; errors=0 warnings=0).

GitHub issue coverage: #3989/#3990/#3992/#3993/#3994 covered by wiki lint/link/frontmatter/.obsidian rules; #3996/#3998 covered by complete manifest source inventory; #3997 covered by stale projection failure and stale search suppression; #3991 covered by maximum-assimilation graph_refs vs derived projection gate. #3879 remains a v0.7 runner/runtime backlog item per existing GitHub issue comment and is not fixed by this context contract batch.

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
