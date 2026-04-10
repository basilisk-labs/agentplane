---
id: "202604100054-REVRR6"
title: "Prevent finish from mutating task docs before DONE validation"
result_summary: "integrate: squash task/202604100054-REVRR6/finish-done-validation-order"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:55:39.085Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T00:58:54.535Z"
  updated_by: "CODER"
  note: "vitest: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts; eslint: bun x eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts"
commit:
  hash: "5f3697c03e58eba9481197bb93cf5d02ec79b85a"
  message: "🧩 REVRR6 integrate: workflow: Prevent finish from mutating task docs before DONE validation"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100054-REVRR6/pr."
events:
  -
    type: "verify"
    at: "2026-04-10T00:58:54.535Z"
    author: "CODER"
    state: "ok"
    note: "vitest: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts; eslint: bun x eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts"
  -
    type: "status"
    at: "2026-04-10T01:19:31.060Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100054-REVRR6/pr."
doc_version: 3
doc_updated_at: "2026-04-10T01:19:31.062Z"
doc_updated_by: "INTEGRATOR"
description: "Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry."
sections:
  Summary: |-
    Prevent finish from mutating task docs before DONE validation
    
    Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
  Scope: |-
    - In scope: Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
    - Out of scope: unrelated refactors not required for "Prevent finish from mutating task docs before DONE validation".
  Plan: |-
    1. Reproduce finish-on-DONE with structured findings and lock the expected no-mutation behavior.
    2. Move DONE/--force validation ahead of any README/task-doc mutation in finish flow.
    3. Add regression tests for failure without mutation and forced idempotent retry.
    4. Verify with targeted unit tests and hook-safe task lifecycle.
  Verify Steps: |-
    1. Run the finish regression test that exercises `DONE` tasks with structured findings but without `--force`. Expected: the command fails and the task README is byte-for-byte unchanged.
    2. Run the forced retry/idempotence finish test. Expected: `--force` still permits the retry path without duplicating DONE metadata or structured findings.
    3. Inspect the finish flow ordering in code. Expected: DONE/force validation executes before any task-doc mutation helper is called.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T00:58:54.535Z — VERIFY — ok
    
    By: CODER
    
    Note: vitest: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts; eslint: bun x eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:54:48.139Z, excerpt_hash=sha256:b116b3a0b6a81570f0d7fd3868327429dcfef39b1c68f9e768c1b9d110ac1c4a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prevent finish from mutating task docs before DONE validation

Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.

## Scope

- In scope: Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
- Out of scope: unrelated refactors not required for "Prevent finish from mutating task docs before DONE validation".

## Plan

1. Reproduce finish-on-DONE with structured findings and lock the expected no-mutation behavior.
2. Move DONE/--force validation ahead of any README/task-doc mutation in finish flow.
3. Add regression tests for failure without mutation and forced idempotent retry.
4. Verify with targeted unit tests and hook-safe task lifecycle.

## Verify Steps

1. Run the finish regression test that exercises `DONE` tasks with structured findings but without `--force`. Expected: the command fails and the task README is byte-for-byte unchanged.
2. Run the forced retry/idempotence finish test. Expected: `--force` still permits the retry path without duplicating DONE metadata or structured findings.
3. Inspect the finish flow ordering in code. Expected: DONE/force validation executes before any task-doc mutation helper is called.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T00:58:54.535Z — VERIFY — ok

By: CODER

Note: vitest: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts; eslint: bun x eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:54:48.139Z, excerpt_hash=sha256:b116b3a0b6a81570f0d7fd3868327429dcfef39b1c68f9e768c1b9d110ac1c4a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
