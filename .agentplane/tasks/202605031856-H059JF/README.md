---
id: "202605031856-H059JF"
title: "ACR standard schema and digest alignment"
result_summary: "Merged via PR #849."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "schema"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T18:57:44.165Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T19:21:16.058Z"
  updated_by: "CODER"
  note: "Verified schema/digest alignment: schemas synced and checked; core typecheck passed; focused core ACR schema tests passed; generated ACR local validation passed."
commit:
  hash: "ddcaf000741259312262042049fba87115537778"
  message: "✨ H059JF task: harden ACR validation contract"
comments:
  -
    author: "CODER"
    body: "Start: align the ACR schema and digest contract with the hardened standard repo in this batch worktree before semantic validation and docs tasks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #849 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T18:58:27.129Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align the ACR schema and digest contract with the hardened standard repo in this batch worktree before semantic validation and docs tasks."
  -
    type: "verify"
    at: "2026-05-03T19:21:16.058Z"
    author: "CODER"
    state: "ok"
    note: "Verified schema/digest alignment: schemas synced and checked; core typecheck passed; focused core ACR schema tests passed; generated ACR local validation passed."
  -
    type: "status"
    at: "2026-05-03T19:26:01.796Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #849 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T19:26:01.801Z"
doc_updated_by: "INTEGRATOR"
description: "Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation."
sections:
  Summary: |-
    ACR standard schema and digest alignment
    
    Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation.
  Scope: |-
    - In scope: Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation.
    - Out of scope: unrelated refactors not required for "ACR standard schema and digest alignment".
  Plan: "Plan: (1) Add canonicalize dependency and move ACR record digest computation to core using RFC8785/JCS with record_digest=null and signatures=[]. (2) Update the core ACR schema to allow nullable draft digest, enforce Git OID pattern, share risk_category enum, and reject POSIX/Windows path escapes. (3) Regenerate bundled schema artifacts. (4) Update focused core tests for nullable digest, Git OID pattern, strict repo paths, and digest helper behavior. Verify with schemas:sync/check, focused core schema tests, and core typecheck."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T19:21:16.058Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified schema/digest alignment: schemas synced and checked; core typecheck passed; focused core ACR schema tests passed; generated ACR local validation passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T18:58:27.129Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Ran bun run schemas:check, bun run --filter=@agentplaneorg/core typecheck, focused core task-artifact-schema tests, spec examples check, and local ACR validation.
      Impact: Core ACR schema now matches the hardened v0.1 contract: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest helper.
      Resolution: No schema/digest follow-up remains in this task scope.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

ACR standard schema and digest alignment

Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation.

## Scope

- In scope: Align AgentPlane core ACR schema and digest implementation with the hardened ACR v0.1 standard: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest computation.
- Out of scope: unrelated refactors not required for "ACR standard schema and digest alignment".

## Plan

Plan: (1) Add canonicalize dependency and move ACR record digest computation to core using RFC8785/JCS with record_digest=null and signatures=[]. (2) Update the core ACR schema to allow nullable draft digest, enforce Git OID pattern, share risk_category enum, and reject POSIX/Windows path escapes. (3) Regenerate bundled schema artifacts. (4) Update focused core tests for nullable digest, Git OID pattern, strict repo paths, and digest helper behavior. Verify with schemas:sync/check, focused core schema tests, and core typecheck.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T19:21:16.058Z — VERIFY — ok

By: CODER

Note: Verified schema/digest alignment: schemas synced and checked; core typecheck passed; focused core ACR schema tests passed; generated ACR local validation passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T18:58:27.129Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Ran bun run schemas:check, bun run --filter=@agentplaneorg/core typecheck, focused core task-artifact-schema tests, spec examples check, and local ACR validation.
  Impact: Core ACR schema now matches the hardened v0.1 contract: nullable draft digest, Git OID constraints, shared risk categories, strict repo paths, and RFC8785/JCS digest helper.
  Resolution: No schema/digest follow-up remains in this task scope.
  Promotion: incident-candidate
  Fixability: external
