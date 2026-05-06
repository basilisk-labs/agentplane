---
id: "202605060915-GM5BTR"
title: "Surface blueprint stop rules to runners"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-N3MJJ1"
tags:
  - "blueprints"
  - "code"
  - "runner"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:08:45.864Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:57:47.962Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "CODER"
    body: "Start: Surfacing blueprint stop rules to runner bootstrap and inspection surfaces; dependency N3MJJ1 is verified and committed in this stacked branch."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T10:08:46.069Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Surfacing blueprint stop rules to runner bootstrap and inspection surfaces; dependency N3MJJ1 is verified and committed in this stacked branch."
  -
    type: "verify"
    at: "2026-05-06T10:09:42.875Z"
    author: "CODER"
    state: "ok"
    note: "Verified: blueprint stop rules are now visible in runner bootstrap and inspection outputs."
  -
    type: "verify"
    at: "2026-05-06T14:57:47.962Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.693Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.693Z"
doc_updated_by: "INTEGRATOR"
description: "Expose blueprint stop rules and approval-required conditions in runner bundles so agents can stop before unsafe mutation or external action."
sections:
  Summary: |-
    Surface blueprint stop rules to runners

    Expose blueprint stop rules and approval-required conditions in runner bundles so agents can stop before unsafe mutation or external action.
  Scope: |-
    - In scope: Expose blueprint stop rules and approval-required conditions in runner bundles so agents can stop before unsafe mutation or external action.
    - Out of scope: unrelated refactors not required for "Surface blueprint stop rules to runners".
  Plan: "Surface resolved blueprint stop rules directly to runner consumers. Render stop rules in bootstrap markdown and expose them in dry-run/show output while preserving the canonical bundle blueprint.stopReasons field."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:09:42.875Z — VERIFY — ok

    By: CODER

    Note: Verified: blueprint stop rules are now visible in runner bootstrap and inspection outputs.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:08:46.069Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N3MJJ1-blueprint-runner-context/.agentplane/tasks/202605060915-GM5BTR/blueprint/resolved-snapshot.json
    - old_digest: e1d4141055a66d6d1607649070fdd447434cc476a1b125edbf31cdd72d0abac7
    - current_digest: e1d4141055a66d6d1607649070fdd447434cc476a1b125edbf31cdd72d0abac7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-GM5BTR

    ### 2026-05-06T14:57:47.962Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:09:42.879Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 8 tests passed. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched stop-rule files; Result: pass. Command: bunx eslint touched stop-rule files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Runner agents see hard/soft blueprint stop conditions without needing to infer them from raw bundle JSON.
      Resolution: Rendered stop rules in bootstrap markdown and exposed stop_rules in dry-run/show surfaces.
id_source: "generated"
---
## Summary

Surface blueprint stop rules to runners

Expose blueprint stop rules and approval-required conditions in runner bundles so agents can stop before unsafe mutation or external action.

## Scope

- In scope: Expose blueprint stop rules and approval-required conditions in runner bundles so agents can stop before unsafe mutation or external action.
- Out of scope: unrelated refactors not required for "Surface blueprint stop rules to runners".

## Plan

Surface resolved blueprint stop rules directly to runner consumers. Render stop rules in bootstrap markdown and expose them in dry-run/show output while preserving the canonical bundle blueprint.stopReasons field.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T10:09:42.875Z — VERIFY — ok

By: CODER

Note: Verified: blueprint stop rules are now visible in runner bootstrap and inspection outputs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:08:46.069Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N3MJJ1-blueprint-runner-context/.agentplane/tasks/202605060915-GM5BTR/blueprint/resolved-snapshot.json
- old_digest: e1d4141055a66d6d1607649070fdd447434cc476a1b125edbf31cdd72d0abac7
- current_digest: e1d4141055a66d6d1607649070fdd447434cc476a1b125edbf31cdd72d0abac7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605060915-GM5BTR

### 2026-05-06T14:57:47.962Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:09:42.879Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 8 tests passed. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched stop-rule files; Result: pass. Command: bunx eslint touched stop-rule files; Result: pass. Command: git diff --check; Result: pass.
  Impact: Runner agents see hard/soft blueprint stop conditions without needing to infer them from raw bundle JSON.
  Resolution: Rendered stop rules in bootstrap markdown and exposed stop_rules in dry-run/show surfaces.
