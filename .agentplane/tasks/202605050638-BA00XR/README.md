---
id: "202605050638-BA00XR"
title: "Define branch_pr artifact roles and drift rules"
result_summary: "Documented branch_pr artifact roles and drift rules"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T06:39:51.256Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T06:51:48.908Z"
  updated_by: "CODER"
  note: "Command: ap task verify-show 202605050638-BA00XR -> pass, reviewed generated Verify Steps. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: ap doctor -> pass with warnings only about existing hook/runtime shim state, no errors. Scope: docs/user/branching-and-pr-artifacts.mdx artifact role and drift-rule documentation."
commit:
  hash: "dae8d467af7e067bf25df2a43af2154cd25824f1"
  message: "🔀 BA00XR integrate: Define branch_pr artifact roles and drift rules"
comments:
  -
    author: "CODER"
    body: "Start: defining explicit branch_pr artifact roles and drift rules so canonical records, evidence snapshots, projections, and optional sidecars are not treated interchangeably."
  -
    author: "INTEGRATOR"
    body: "Verified: merged artifact-role contract into main after policy routing, pr check, and doctor completed with no errors."
events:
  -
    type: "status"
    at: "2026-05-05T06:48:39.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: defining explicit branch_pr artifact roles and drift rules so canonical records, evidence snapshots, projections, and optional sidecars are not treated interchangeably."
  -
    type: "verify"
    at: "2026-05-05T06:51:48.908Z"
    author: "CODER"
    state: "ok"
    note: "Command: ap task verify-show 202605050638-BA00XR -> pass, reviewed generated Verify Steps. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: ap doctor -> pass with warnings only about existing hook/runtime shim state, no errors. Scope: docs/user/branching-and-pr-artifacts.mdx artifact role and drift-rule documentation."
  -
    type: "status"
    at: "2026-05-05T06:54:13.706Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged artifact-role contract into main after policy routing, pr check, and doctor completed with no errors."
doc_version: 3
doc_updated_at: "2026-05-05T06:54:13.707Z"
doc_updated_by: "INTEGRATOR"
description: "Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics."
sections:
  Summary: |-
    Define branch_pr artifact roles and drift rules
    
    Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics.
  Scope: |-
    - In scope: Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics.
    - Out of scope: unrelated refactors not required for "Define branch_pr artifact roles and drift rules".
  Plan: |-
    1. Define artifact role categories: canonical record, evidence snapshot, rendered projection, and optional sidecar.
    2. Map branch_pr files into those categories and document freshness/regeneration rules.
    3. Add code-level helpers or validation names that reflect the role categories where current naming is ambiguous.
    4. Ensure docs and command output tell agents which files may be regenerated and which files are authoritative.
    5. Verify docs/code routing and focused artifact validation tests.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T06:51:48.908Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: ap task verify-show 202605050638-BA00XR -> pass, reviewed generated Verify Steps. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: ap doctor -> pass with warnings only about existing hook/runtime shim state, no errors. Scope: docs/user/branching-and-pr-artifacts.mdx artifact role and drift-rule documentation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:48:39.145Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Define branch_pr artifact roles and drift rules

Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics.

## Scope

- In scope: Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics.
- Out of scope: unrelated refactors not required for "Define branch_pr artifact roles and drift rules".

## Plan

1. Define artifact role categories: canonical record, evidence snapshot, rendered projection, and optional sidecar.
2. Map branch_pr files into those categories and document freshness/regeneration rules.
3. Add code-level helpers or validation names that reflect the role categories where current naming is ambiguous.
4. Ensure docs and command output tell agents which files may be regenerated and which files are authoritative.
5. Verify docs/code routing and focused artifact validation tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T06:51:48.908Z — VERIFY — ok

By: CODER

Note: Command: ap task verify-show 202605050638-BA00XR -> pass, reviewed generated Verify Steps. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: ap doctor -> pass with warnings only about existing hook/runtime shim state, no errors. Scope: docs/user/branching-and-pr-artifacts.mdx artifact role and drift-rule documentation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:48:39.145Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
