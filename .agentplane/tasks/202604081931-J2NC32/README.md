---
id: "202604081931-J2NC32"
title: "Add explicit verify incident collection path"
result_summary: "integrate: squash task/202604081931-J2NC32/verify-collect-incidents"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T19:59:13.057Z"
  updated_by: "REVIEWER"
  note: "Focused verify/incidents tests passed; eslint passed on touched verify command files; cli-reference was regenerated and freshness check now passes."
commit:
  hash: "d6b2f6e05f9d163d545089f7770ec2b3984213b7"
  message: "🧩 J2NC32 integrate: incidents/ux: Add explicit verify incident collection path"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081931-J2NC32/pr."
events:
  -
    type: "verify"
    at: "2026-04-08T19:59:13.057Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused verify/incidents tests passed; eslint passed on touched verify command files; cli-reference was regenerated and freshness check now passes."
  -
    type: "status"
    at: "2026-04-08T20:16:29.200Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081931-J2NC32/pr."
doc_version: 3
doc_updated_at: "2026-04-08T20:16:29.208Z"
doc_updated_by: "INTEGRATOR"
description: "Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired."
sections:
  Summary: |-
    Add explicit verify incident collection path
    
    Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
  Scope: |-
    - In scope: Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
    - Out of scope: unrelated refactors not required for "Add explicit verify incident collection path".
  Plan: "1. Add an explicit verify flag that runs incidents collection after the verification record is written. 2. Keep the default verify behavior unchanged when the new flag is absent. 3. Add focused coverage for verify plus collect in one command, then validate docs/spec output in touched scope."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T19:59:13.057Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Focused verify/incidents tests passed; eslint passed on touched verify command files; cli-reference was regenerated and freshness check now passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:39:22.221Z, excerpt_hash=sha256:2df24f32d0cf162aa1beaf7d10904fdc97fbc9096f6cd02404ef895b76b8b34b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add explicit verify incident collection path

Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.

## Scope

- In scope: Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
- Out of scope: unrelated refactors not required for "Add explicit verify incident collection path".

## Plan

1. Add an explicit verify flag that runs incidents collection after the verification record is written. 2. Keep the default verify behavior unchanged when the new flag is absent. 3. Add focused coverage for verify plus collect in one command, then validate docs/spec output in touched scope.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T19:59:13.057Z — VERIFY — ok

By: REVIEWER

Note: Focused verify/incidents tests passed; eslint passed on touched verify command files; cli-reference was regenerated and freshness check now passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:39:22.221Z, excerpt_hash=sha256:2df24f32d0cf162aa1beaf7d10904fdc97fbc9096f6cd02404ef895b76b8b34b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
