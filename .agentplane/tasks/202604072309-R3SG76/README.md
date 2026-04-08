---
id: "202604072309-R3SG76"
title: "Explain internal Findings vs incidents registry promotion"
result_summary: "integrate: squash task/202604072309-R3SG76/incidents-findings-boundary"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T00:44:19.616Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T01:08:26.576Z"
  updated_by: "CODER"
  note: "Re-verified after syncing canonical policy assets; incidents/finish/integrate diagnostics, bootstrap docs, routing, and agent-template sync remain aligned on the current head."
commit:
  hash: "3476e3e487cfb366f67e6766bc4851adbbed786b"
  message: "📝 R3SG76 task: sync verified PR metadata"
comments:
  -
    author: "CODER"
    body: "Start: clarify Findings versus incidents registry promotion without changing incident collection semantics."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604072309-R3SG76/pr."
events:
  -
    type: "status"
    at: "2026-04-08T00:44:20.058Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: clarify Findings versus incidents registry promotion without changing incident collection semantics."
  -
    type: "verify"
    at: "2026-04-08T00:57:13.792Z"
    author: "CODER"
    state: "ok"
    note: "Verified targeted incidents and command-guide coverage; messaging now distinguishes plain task-local Findings from structured external incident promotion without changing promotion semantics."
  -
    type: "verify"
    at: "2026-04-08T01:08:26.576Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after syncing canonical policy assets; incidents/finish/integrate diagnostics, bootstrap docs, routing, and agent-template sync remain aligned on the current head."
  -
    type: "status"
    at: "2026-04-08T01:26:14.699Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604072309-R3SG76/pr."
doc_version: 3
doc_updated_at: "2026-04-08T01:26:14.703Z"
doc_updated_by: "INTEGRATOR"
description: "When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs."
sections:
  Summary: |-
    Explain internal Findings vs incidents registry promotion
    
    When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.
  Scope: |-
    - In scope: When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.
    - Out of scope: unrelated refactors not required for "Explain internal Findings vs incidents registry promotion".
  Plan: |-
    1. Implement the change for "Explain internal Findings vs incidents registry promotion".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: "1. Run the targeted incidents and findings vitest coverage for resolve, finish, and run-cli incidents/findings flows; expected: all pass. 2. Review the changed CLI and guide messages; expected: they explicitly distinguish task-local Findings from reusable incidents registry promotion. 3. Confirm no behavior change in incidents promotion semantics; expected: incidents.md is updated only by structured reusable incident candidates, not by plain Findings text."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T00:57:13.792Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified targeted incidents and command-guide coverage; messaging now distinguishes plain task-local Findings from structured external incident promotion without changing promotion semantics.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:44:20.068Z, excerpt_hash=sha256:97786aa004558cc1c6ef29cdb1ee926f4b4735b67de3ed304137441ae54c4931
    
    ### 2026-04-08T01:08:26.576Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after syncing canonical policy assets; incidents/finish/integrate diagnostics, bootstrap docs, routing, and agent-template sync remain aligned on the current head.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:57:13.796Z, excerpt_hash=sha256:97786aa004558cc1c6ef29cdb1ee926f4b4735b67de3ed304137441ae54c4931
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Explain internal Findings vs incidents registry promotion

When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.

## Scope

- In scope: When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.
- Out of scope: unrelated refactors not required for "Explain internal Findings vs incidents registry promotion".

## Plan

1. Implement the change for "Explain internal Findings vs incidents registry promotion".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run the targeted incidents and findings vitest coverage for resolve, finish, and run-cli incidents/findings flows; expected: all pass. 2. Review the changed CLI and guide messages; expected: they explicitly distinguish task-local Findings from reusable incidents registry promotion. 3. Confirm no behavior change in incidents promotion semantics; expected: incidents.md is updated only by structured reusable incident candidates, not by plain Findings text.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T00:57:13.792Z — VERIFY — ok

By: CODER

Note: Verified targeted incidents and command-guide coverage; messaging now distinguishes plain task-local Findings from structured external incident promotion without changing promotion semantics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:44:20.068Z, excerpt_hash=sha256:97786aa004558cc1c6ef29cdb1ee926f4b4735b67de3ed304137441ae54c4931

### 2026-04-08T01:08:26.576Z — VERIFY — ok

By: CODER

Note: Re-verified after syncing canonical policy assets; incidents/finish/integrate diagnostics, bootstrap docs, routing, and agent-template sync remain aligned on the current head.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:57:13.796Z, excerpt_hash=sha256:97786aa004558cc1c6ef29cdb1ee926f4b4735b67de3ed304137441ae54c4931

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
