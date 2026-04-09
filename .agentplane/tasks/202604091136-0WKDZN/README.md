---
id: "202604091136-0WKDZN"
title: "Make incident promotion expectations explicit in verify workflow"
result_summary: "integrate: squash task/202604091136-0WKDZN/incident-promotion-ux"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "incidents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T11:36:40.721Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "ae802bfd02372f14143608cf6092d2ca2bd0798b"
  message: "🧩 0WKDZN docs: refresh CLI reference and pr help contract"
comments:
  -
    author: "CODER"
    body: "Start: make verify and help output distinguish plain notes, structured incident candidates, and explicit incident collection so incidents.md expectations stop being implicit."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091136-0WKDZN/pr."
events:
  -
    type: "status"
    at: "2026-04-09T11:37:00.540Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make verify and help output distinguish plain notes, structured incident candidates, and explicit incident collection so incidents.md expectations stop being implicit."
  -
    type: "status"
    at: "2026-04-09T12:06:17.030Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091136-0WKDZN/pr."
doc_version: 3
doc_updated_at: "2026-04-09T12:06:17.034Z"
doc_updated_by: "INTEGRATOR"
description: "Reduce confusion around incidents.md by making plain verify notes, structured findings, and explicit collection paths visibly distinct in user-facing verify/help output."
sections:
  Summary: |-
    Make incident promotion expectations explicit in verify workflow
    
    Reduce confusion around incidents.md by making plain verify notes, structured findings, and explicit collection paths visibly distinct in user-facing verify/help output.
  Scope: |-
    - In scope: Reduce confusion around incidents.md by making plain verify notes, structured findings, and explicit collection paths visibly distinct in user-facing verify/help output.
    - Out of scope: unrelated refactors not required for "Make incident promotion expectations explicit in verify workflow".
  Plan: "1. Make plain verify notes, structured incident candidates, and explicit incident collection outcomes visibly distinct in verify/help output. 2. Add regression tests proving the new guidance for plain verify and structured findings. 3. Re-run targeted verify/help tests."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make incident promotion expectations explicit in verify workflow

Reduce confusion around incidents.md by making plain verify notes, structured findings, and explicit collection paths visibly distinct in user-facing verify/help output.

## Scope

- In scope: Reduce confusion around incidents.md by making plain verify notes, structured findings, and explicit collection paths visibly distinct in user-facing verify/help output.
- Out of scope: unrelated refactors not required for "Make incident promotion expectations explicit in verify workflow".

## Plan

1. Make plain verify notes, structured incident candidates, and explicit incident collection outcomes visibly distinct in verify/help output. 2. Add regression tests proving the new guidance for plain verify and structured findings. 3. Re-run targeted verify/help tests.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
