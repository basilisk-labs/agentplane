---
id: "202604191639-FJNEH8"
title: "Replace handoff and PR metadata schemas with Zod sources"
result_summary: "Handoff and PR metadata schema surfaces are already on the canonical Zod path."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T18:51:19.009Z"
  updated_by: "CODER"
  note: "Verified: task handoff and PR metadata already come from Zod-backed schema sources in packages/core/src/tasks/task-artifact-schema.ts, generated JSON schema renderers exist, and current consumers import the validated surfaces through @agentplaneorg/core."
commit:
  hash: "051776feaee4ecc1c1440befcb5f9878177c3812"
  message: "✅ F9NFHY close: Core schema consumers now use a unified barrel instead of scattered private module paths. (202604191639-F9NFHY) [code,refactor,schemas]"
comments:
  -
    author: "CODER"
    body: "Start: auditing the handoff and PR metadata schema surfaces so the task can close on current Zod-backed reality instead of introducing redundant migration churn."
  -
    author: "CODER"
    body: "Verified: handoff and PR metadata schemas are already Zod-backed in core and current consumers already use the generated schema surfaces, so no further migration diff was required."
events:
  -
    type: "status"
    at: "2026-04-19T18:51:08.276Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing the handoff and PR metadata schema surfaces so the task can close on current Zod-backed reality instead of introducing redundant migration churn."
  -
    type: "verify"
    at: "2026-04-19T18:51:19.009Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task handoff and PR metadata already come from Zod-backed schema sources in packages/core/src/tasks/task-artifact-schema.ts, generated JSON schema renderers exist, and current consumers import the validated surfaces through @agentplaneorg/core."
  -
    type: "status"
    at: "2026-04-19T18:51:19.048Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: handoff and PR metadata schemas are already Zod-backed in core and current consumers already use the generated schema surfaces, so no further migration diff was required."
doc_version: 3
doc_updated_at: "2026-04-19T18:51:19.054Z"
doc_updated_by: "CODER"
description: "Epic A′. Migrate remaining handoff and PR metadata schema surfaces to Zod-backed sources and generated JSON schema artifacts."
sections:
  Summary: |-
    Replace handoff and PR metadata schemas with Zod sources
    
    Epic A′. Migrate remaining handoff and PR metadata schema surfaces to Zod-backed sources and generated JSON schema artifacts.
  Scope: |-
    - In scope: Epic A′. Migrate remaining handoff and PR metadata schema surfaces to Zod-backed sources and generated JSON schema artifacts.
    - Out of scope: unrelated refactors not required for "Replace handoff and PR metadata schemas with Zod sources".
  Plan: "1. Audit the current task handoff and PR metadata schema surfaces to confirm whether they already run through Zod-backed sources and generated JSON artifacts. 2. If the migration is already satisfied by current code, record that fact with verification evidence instead of adding redundant schema churn. 3. Close the task against the commit(s) that already established the Zod-backed surfaces and move the epic to the next real gap."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T18:51:19.009Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: task handoff and PR metadata already come from Zod-backed schema sources in packages/core/src/tasks/task-artifact-schema.ts, generated JSON schema renderers exist, and current consumers import the validated surfaces through @agentplaneorg/core.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:51:08.288Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Replace handoff and PR metadata schemas with Zod sources

Epic A′. Migrate remaining handoff and PR metadata schema surfaces to Zod-backed sources and generated JSON schema artifacts.

## Scope

- In scope: Epic A′. Migrate remaining handoff and PR metadata schema surfaces to Zod-backed sources and generated JSON schema artifacts.
- Out of scope: unrelated refactors not required for "Replace handoff and PR metadata schemas with Zod sources".

## Plan

1. Audit the current task handoff and PR metadata schema surfaces to confirm whether they already run through Zod-backed sources and generated JSON artifacts. 2. If the migration is already satisfied by current code, record that fact with verification evidence instead of adding redundant schema churn. 3. Close the task against the commit(s) that already established the Zod-backed surfaces and move the epic to the next real gap.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T18:51:19.009Z — VERIFY — ok

By: CODER

Note: Verified: task handoff and PR metadata already come from Zod-backed schema sources in packages/core/src/tasks/task-artifact-schema.ts, generated JSON schema renderers exist, and current consumers import the validated surfaces through @agentplaneorg/core.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:51:08.288Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
