---
id: "202605051958-R7ZV0H"
title: "Add minimal blueprint ACR bridge"
result_summary: "Merged via PR #942. ACR generation now records compact blueprint summary fields on main."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "blueprints"
  - "code"
  - "rc1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T19:58:50.482Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T20:44:46.911Z"
  updated_by: "CODER"
  note: "ACR blueprint bridge verified: acr generate emits extensions[agentplane.blueprint] with blueprint id, route, required evidence, recipe extension summaries, and stop reasons without prompt or transcript storage. Checks: acr generate smoke; typecheck; lint:core; ci:local:fast."
commit:
  hash: "c8c9cbe086a86a9c396eeef9e26ff35027260159"
  message: "🔀 5WRJZK integrate: Bridge recipe hints into blueprint resolver"
comments:
  -
    author: "CODER"
    body: "Start: Adding minimal ACR blueprint summary fields with no prompt, transcript, or runner-bundle storage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #942 merged into main with ACR blueprint summary extension verified locally and by hosted checks."
events:
  -
    type: "status"
    at: "2026-05-05T20:26:06.209Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding minimal ACR blueprint summary fields with no prompt, transcript, or runner-bundle storage."
  -
    type: "verify"
    at: "2026-05-05T20:44:46.911Z"
    author: "CODER"
    state: "ok"
    note: "ACR blueprint bridge verified: acr generate emits extensions[agentplane.blueprint] with blueprint id, route, required evidence, recipe extension summaries, and stop reasons without prompt or transcript storage. Checks: acr generate smoke; typecheck; lint:core; ci:local:fast."
  -
    type: "status"
    at: "2026-05-05T20:52:19.237Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #942 merged into main with ACR blueprint summary extension verified locally and by hosted checks."
doc_version: 3
doc_updated_at: "2026-05-05T20:52:19.239Z"
doc_updated_by: "INTEGRATOR"
description: "Record optional resolved blueprint summary fields in ACR generation and validation without storing full prompts, transcripts, or runner bundles."
sections:
  Summary: |-
    Add minimal blueprint ACR bridge
    
    Record optional resolved blueprint summary fields in ACR generation and validation without storing full prompts, transcripts, or runner bundles.
  Scope: |-
    - In scope: Record optional resolved blueprint summary fields in ACR generation and validation without storing full prompts, transcripts, or runner bundles.
    - Out of scope: unrelated refactors not required for "Add minimal blueprint ACR bridge".
  Plan: "Add minimal blueprint ACR bridge. Scope: extend ACR generation/schema/validation with optional blueprint summary fields: id, version, route, expected evidence, recipe extension summary, stop reasons. Must not store prompts, transcripts, or runner bundles. Depends on 202605051958-Y1FYT3."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T20:44:46.911Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR blueprint bridge verified: acr generate emits extensions[agentplane.blueprint] with blueprint id, route, required evidence, recipe extension summaries, and stop reasons without prompt or transcript storage. Checks: acr generate smoke; typecheck; lint:core; ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:26:06.209Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add minimal blueprint ACR bridge

Record optional resolved blueprint summary fields in ACR generation and validation without storing full prompts, transcripts, or runner bundles.

## Scope

- In scope: Record optional resolved blueprint summary fields in ACR generation and validation without storing full prompts, transcripts, or runner bundles.
- Out of scope: unrelated refactors not required for "Add minimal blueprint ACR bridge".

## Plan

Add minimal blueprint ACR bridge. Scope: extend ACR generation/schema/validation with optional blueprint summary fields: id, version, route, expected evidence, recipe extension summary, stop reasons. Must not store prompts, transcripts, or runner bundles. Depends on 202605051958-Y1FYT3.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T20:44:46.911Z — VERIFY — ok

By: CODER

Note: ACR blueprint bridge verified: acr generate emits extensions[agentplane.blueprint] with blueprint id, route, required evidence, recipe extension summaries, and stop reasons without prompt or transcript storage. Checks: acr generate smoke; typecheck; lint:core; ci:local:fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:26:06.209Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
