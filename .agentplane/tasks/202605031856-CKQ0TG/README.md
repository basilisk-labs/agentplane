---
id: "202605031856-CKQ0TG"
title: "ACR semantic validation and CI gate"
result_summary: "ACR semantic validation and config-gated PR check enforcement are merged in main."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031856-H059JF"
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T18:57:49.434Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T19:21:28.324Z"
  updated_by: "CODER"
  note: "Verified semantic ACR validation and PR gate: agentplane typecheck passed; focused ACR semantic tests passed; focused finish regression tests passed; docs CLI and schema checks passed."
commit:
  hash: "ddcaf000741259312262042049fba87115537778"
  message: "✨ H059JF task: harden ACR validation contract"
comments:
  -
    author: "CODER"
    body: "Start: implement ACR semantic validation classes and config-gated PR check enforcement in the same approved batch worktree; dependency is being handled in this approved batch."
  -
    author: "INTEGRATOR"
    body: "Verified: ACR semantic validation and CI gate shipped via PR #849; focused semantic/finish tests and pr check passed."
events:
  -
    type: "status"
    at: "2026-05-03T18:58:40.670Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement ACR semantic validation classes and config-gated PR check enforcement in the same approved batch worktree; dependency is being handled in this approved batch."
  -
    type: "verify"
    at: "2026-05-03T19:21:28.324Z"
    author: "CODER"
    state: "ok"
    note: "Verified semantic ACR validation and PR gate: agentplane typecheck passed; focused ACR semantic tests passed; focused finish regression tests passed; docs CLI and schema checks passed."
  -
    type: "status"
    at: "2026-05-03T19:27:07.888Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: ACR semantic validation and CI gate shipped via PR #849; focused semantic/finish tests and pr check passed."
doc_version: 3
doc_updated_at: "2026-05-03T19:27:07.889Z"
doc_updated_by: "INTEGRATOR"
description: "Implement AgentPlane ACR semantic validation classes for schema, local, and CI modes; enforce merge-ready invariants in acr check; wire acr.require_for_pr_check into pr check without making ACR universally mandatory."
sections:
  Summary: |-
    ACR semantic validation and CI gate
    
    Implement AgentPlane ACR semantic validation classes for schema, local, and CI modes; enforce merge-ready invariants in acr check; wire acr.require_for_pr_check into pr check without making ACR universally mandatory.
  Scope: |-
    - In scope: Implement AgentPlane ACR semantic validation classes for schema, local, and CI modes; enforce merge-ready invariants in acr check; wire acr.require_for_pr_check into pr check without making ACR universally mandatory.
    - Out of scope: unrelated refactors not required for "ACR semantic validation and CI gate".
  Plan: "Plan: (1) Implement ACR validation classes for schema/local/ci using the shared schema and digest helper. (2) Make acr generate emit merge_ready=true only when plan approval, verification, required checks, required evidence, and digest are present. (3) Make acr check enforce merge-ready invariants including approvals, waivers, manual overrides, failed policy, null digest, and evidence. (4) Wire acr.require_for_pr_check into pr check while preserving default non-required behavior. Verify with focused ACR CLI tests, pr check gate tests, agentplane typecheck, and local pr check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T19:21:28.324Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified semantic ACR validation and PR gate: agentplane typecheck passed; focused ACR semantic tests passed; focused finish regression tests passed; docs CLI and schema checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T18:58:40.670Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Ran bun run --filter=agentplane typecheck, focused acr.command tests, finish validation/state/close-tail tests, docs:cli:check, schemas:check, format:check, and scoped eslint for touched files.
      Impact: ACR CI mode now rejects non-merge-ready records, null digest, missing plan approval/evidence, failed policy, unapproved manual override, and passed verification without checks; pr check requires ACR only when config enables it.
      Resolution: Default pr check behavior remains unchanged unless acr.require_for_pr_check=true.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

ACR semantic validation and CI gate

Implement AgentPlane ACR semantic validation classes for schema, local, and CI modes; enforce merge-ready invariants in acr check; wire acr.require_for_pr_check into pr check without making ACR universally mandatory.

## Scope

- In scope: Implement AgentPlane ACR semantic validation classes for schema, local, and CI modes; enforce merge-ready invariants in acr check; wire acr.require_for_pr_check into pr check without making ACR universally mandatory.
- Out of scope: unrelated refactors not required for "ACR semantic validation and CI gate".

## Plan

Plan: (1) Implement ACR validation classes for schema/local/ci using the shared schema and digest helper. (2) Make acr generate emit merge_ready=true only when plan approval, verification, required checks, required evidence, and digest are present. (3) Make acr check enforce merge-ready invariants including approvals, waivers, manual overrides, failed policy, null digest, and evidence. (4) Wire acr.require_for_pr_check into pr check while preserving default non-required behavior. Verify with focused ACR CLI tests, pr check gate tests, agentplane typecheck, and local pr check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T19:21:28.324Z — VERIFY — ok

By: CODER

Note: Verified semantic ACR validation and PR gate: agentplane typecheck passed; focused ACR semantic tests passed; focused finish regression tests passed; docs CLI and schema checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T18:58:40.670Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Ran bun run --filter=agentplane typecheck, focused acr.command tests, finish validation/state/close-tail tests, docs:cli:check, schemas:check, format:check, and scoped eslint for touched files.
  Impact: ACR CI mode now rejects non-merge-ready records, null digest, missing plan approval/evidence, failed policy, unapproved manual override, and passed verification without checks; pr check requires ACR only when config enables it.
  Resolution: Default pr check behavior remains unchanged unless acr.require_for_pr_check=true.
  Promotion: incident-candidate
  Fixability: external
