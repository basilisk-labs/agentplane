---
id: "202604191544-YX3BW9"
title: "Adopt canonical testkit helper modules across test consumers"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T15:44:10.178Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T15:47:10.361Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts; Result: pass; Evidence: 4 files and 46 tests passed after redirecting recipes helper consumers to canonical testkit modules. Scope: recipes helper adoption. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 11 files and 69 tests passed after redirecting task helper consumers. Scope: task helper adoption. Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 5 files and 30 tests passed after redirecting release helper consumers. Scope: release helper adoption."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate the remaining recipes, task, and release test consumers onto canonical testkit helper modules."
events:
  -
    type: "status"
    at: "2026-04-19T15:44:11.229Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the remaining recipes, task, and release test consumers onto canonical testkit helper modules."
  -
    type: "verify"
    at: "2026-04-19T15:47:10.361Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts; Result: pass; Evidence: 4 files and 46 tests passed after redirecting recipes helper consumers to canonical testkit modules. Scope: recipes helper adoption. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 11 files and 69 tests passed after redirecting task helper consumers. Scope: task helper adoption. Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 5 files and 30 tests passed after redirecting release helper consumers. Scope: release helper adoption."
doc_version: 3
doc_updated_at: "2026-04-19T15:47:10.378Z"
doc_updated_by: "CODER"
description: "Switch remaining task, release, and recipes test consumers from agentplane-local helper files to the canonical modules under packages/testkit/src, while keeping old helper files in place until the migration is complete."
sections:
  Summary: |-
    Adopt canonical testkit helper modules across test consumers
    
    Switch remaining task, release, and recipes test consumers from agentplane-local helper files to the canonical modules under packages/testkit/src, while keeping old helper files in place until the migration is complete.
  Scope: |-
    - In scope: Switch remaining task, release, and recipes test consumers from agentplane-local helper files to the canonical modules under packages/testkit/src, while keeping old helper files in place until the migration is complete.
    - Out of scope: unrelated refactors not required for "Adopt canonical testkit helper modules across test consumers".
  Plan: |-
    1. Switch remaining test consumers of recipes/task/release helper modules onto the canonical modules under packages/testkit/src.
    2. Keep the old agentplane-local helper files unchanged for now so build and import compatibility stay stable during migration.
    3. Verify the migrated batches with focused vitest runs and keep runner-helper migration as a separate follow-up slice.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T15:47:10.361Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts; Result: pass; Evidence: 4 files and 46 tests passed after redirecting recipes helper consumers to canonical testkit modules. Scope: recipes helper adoption. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 11 files and 69 tests passed after redirecting task helper consumers. Scope: task helper adoption. Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 5 files and 30 tests passed after redirecting release helper consumers. Scope: release helper adoption.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:44:11.258Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Adopt canonical testkit helper modules across test consumers

Switch remaining task, release, and recipes test consumers from agentplane-local helper files to the canonical modules under packages/testkit/src, while keeping old helper files in place until the migration is complete.

## Scope

- In scope: Switch remaining task, release, and recipes test consumers from agentplane-local helper files to the canonical modules under packages/testkit/src, while keeping old helper files in place until the migration is complete.
- Out of scope: unrelated refactors not required for "Adopt canonical testkit helper modules across test consumers".

## Plan

1. Switch remaining test consumers of recipes/task/release helper modules onto the canonical modules under packages/testkit/src.
2. Keep the old agentplane-local helper files unchanged for now so build and import compatibility stay stable during migration.
3. Verify the migrated batches with focused vitest runs and keep runner-helper migration as a separate follow-up slice.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T15:47:10.361Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts; Result: pass; Evidence: 4 files and 46 tests passed after redirecting recipes helper consumers to canonical testkit modules. Scope: recipes helper adoption. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 11 files and 69 tests passed after redirecting task helper consumers. Scope: task helper adoption. Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 5 files and 30 tests passed after redirecting release helper consumers. Scope: release helper adoption.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:44:11.258Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
