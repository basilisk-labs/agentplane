---
id: "202603300819-5NMDDW"
title: "Align workflow artifact output with branch_pr config"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T08:20:46.928Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T08:44:43.355Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/commands/doctor.fast.test.ts --hookTimeout 60000 --testTimeout 60000; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane doctor"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: trace the workflow artifact generation and validation path, align the published WORKFLOW.md with branch_pr config, and lock the fix with targeted doctor/workflow tests."
events:
  -
    type: "status"
    at: "2026-03-30T08:21:43.386Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trace the workflow artifact generation and validation path, align the published WORKFLOW.md with branch_pr config, and lock the fix with targeted doctor/workflow tests."
  -
    type: "verify"
    at: "2026-03-30T08:44:43.355Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/commands/doctor.fast.test.ts --hookTimeout 60000 --testTimeout 60000; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane doctor"
doc_version: 3
doc_updated_at: "2026-03-30T08:44:43.383Z"
doc_updated_by: "CODER"
description: "Fix the current repo-wide workflow artifact mismatch so agentplane doctor no longer reports WORKFLOW.md=direct while .agentplane/config.json is branch_pr, and update the generation/validation path plus targeted tests accordingly."
sections:
  Summary: |-
    Align workflow artifact output with branch_pr config
    
    Fix the current repo-wide workflow artifact mismatch so agentplane doctor no longer reports WORKFLOW.md=direct while .agentplane/config.json is branch_pr, and update the generation/validation path plus targeted tests accordingly.
  Scope: |-
    - In scope: Fix the current repo-wide workflow artifact mismatch so agentplane doctor no longer reports WORKFLOW.md=direct while .agentplane/config.json is branch_pr, and update the generation/validation path plus targeted tests accordingly.
    - Out of scope: unrelated refactors not required for "Align workflow artifact output with branch_pr config".
  Plan: |-
    1. Trace the workflow artifact generation, publication, and validation path that produces .agentplane/WORKFLOW.md and doctor mismatch findings.
    2. Update the canonical artifact/template or generation logic so branch_pr repositories publish and validate a branch_pr workflow artifact rather than a stale direct-mode artifact.
    3. Add or update targeted tests, then verify that doctor no longer reports the WORKFLOW.md/config mode mismatch.
  Verify Steps: |-
    1. Inspect `.agentplane/WORKFLOW.md` after the fix. Expected: the effective workflow artifact matches `workflow_mode=branch_pr` instead of `direct`.
    2. Run targeted workflow/doctor tests for artifact generation and validation. Expected: all updated tests pass.
    3. Run `agentplane doctor`. Expected: the `WF_POLICY_MISMATCH ... WORKFLOW.md=direct, config=branch_pr` error is gone.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T08:44:43.355Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/commands/doctor.fast.test.ts --hookTimeout 60000 --testTimeout 60000; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane doctor
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:21:43.388Z, excerpt_hash=sha256:021f9fcc2b788078352afddbc28514f3a1ea3106ad99efa2b319dbb603c69314
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align workflow artifact output with branch_pr config

Fix the current repo-wide workflow artifact mismatch so agentplane doctor no longer reports WORKFLOW.md=direct while .agentplane/config.json is branch_pr, and update the generation/validation path plus targeted tests accordingly.

## Scope

- In scope: Fix the current repo-wide workflow artifact mismatch so agentplane doctor no longer reports WORKFLOW.md=direct while .agentplane/config.json is branch_pr, and update the generation/validation path plus targeted tests accordingly.
- Out of scope: unrelated refactors not required for "Align workflow artifact output with branch_pr config".

## Plan

1. Trace the workflow artifact generation, publication, and validation path that produces .agentplane/WORKFLOW.md and doctor mismatch findings.
2. Update the canonical artifact/template or generation logic so branch_pr repositories publish and validate a branch_pr workflow artifact rather than a stale direct-mode artifact.
3. Add or update targeted tests, then verify that doctor no longer reports the WORKFLOW.md/config mode mismatch.

## Verify Steps

1. Inspect `.agentplane/WORKFLOW.md` after the fix. Expected: the effective workflow artifact matches `workflow_mode=branch_pr` instead of `direct`.
2. Run targeted workflow/doctor tests for artifact generation and validation. Expected: all updated tests pass.
3. Run `agentplane doctor`. Expected: the `WF_POLICY_MISMATCH ... WORKFLOW.md=direct, config=branch_pr` error is gone.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T08:44:43.355Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/commands/doctor.fast.test.ts --hookTimeout 60000 --testTimeout 60000; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane doctor

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:21:43.388Z, excerpt_hash=sha256:021f9fcc2b788078352afddbc28514f3a1ea3106ad99efa2b319dbb603c69314

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
