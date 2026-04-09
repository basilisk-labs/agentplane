---
id: "202604091725-BKV5RY"
title: "Make verify explain incident promotion outcome deterministically"
result_summary: "Merged via PR #213."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "incidents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T18:08:54.464Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T18:23:10.288Z"
  updated_by: "CODER"
  note: "Verified deterministic incident outcome reporting in branch_pr verify and incidents collect --check with targeted incident-flow regressions plus eslint."
commit:
  hash: "dfcc52eefa55537b250adcadde367aa24fc6abd5"
  message: "incidents: Make verify explain incident promotion outcome deterministically (BKV5RY) (#213)"
comments:
  -
    author: "CODER"
    body: "Start: make verify report the exact incident-promotion outcome in branch_pr so operators can see whether incidents.md changed now, stayed task-local, or still needs explicit collection or finish."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #213 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T18:16:58.007Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make verify report the exact incident-promotion outcome in branch_pr so operators can see whether incidents.md changed now, stayed task-local, or still needs explicit collection or finish."
  -
    type: "verify"
    at: "2026-04-09T18:23:10.288Z"
    author: "CODER"
    state: "ok"
    note: "Verified deterministic incident outcome reporting in branch_pr verify and incidents collect --check with targeted incident-flow regressions plus eslint."
  -
    type: "status"
    at: "2026-04-09T18:38:18.761Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #213 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T18:38:18.767Z"
doc_updated_by: "INTEGRATOR"
description: "After verify in branch_pr mode, print a deterministic incident-promotion outcome or next action so operators know whether incidents.md changed, stayed task-local, or needs explicit collection/finish."
sections:
  Summary: |-
    Make verify explain incident promotion outcome deterministically
    
    After verify in branch_pr mode, print a deterministic incident-promotion outcome or next action so operators know whether incidents.md changed, stayed task-local, or needs explicit collection/finish.
  Scope: |-
    - In scope: After verify in branch_pr mode, print a deterministic incident-promotion outcome or next action so operators know whether incidents.md changed, stayed task-local, or needs explicit collection/finish.
    - Out of scope: unrelated refactors not required for "Make verify explain incident promotion outcome deterministically".
  Plan: "1. Reproduce the current verify/incidents UX so the operator can see when Findings stay task-local and when incidents.md will or will not change. 2. Make verify report incident promotion outcome deterministically in branch_pr, including explicit reasons when incidents stay local. 3. Add regression coverage for default verify, --collect-incidents, and branch_pr messaging, then verify with targeted tests."
  Verify Steps: |-
    1. Run targeted verify/incidents regressions that cover default branch_pr verify, verify --collect-incidents, and incidents collect --check. Expected: outputs distinguish updated incidents.md from validated-only or task-local outcomes.
    2. Run the targeted branch_pr PR-flow incident locality regression. Expected: verify reports the deferred promotion path explicitly instead of a generic note.
    3. Lint the touched incidents/verify/finalize sources and tests. Expected: eslint exits 0 for all modified files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T18:23:10.288Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified deterministic incident outcome reporting in branch_pr verify and incidents collect --check with targeted incident-flow regressions plus eslint.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:16:58.013Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make verify explain incident promotion outcome deterministically

After verify in branch_pr mode, print a deterministic incident-promotion outcome or next action so operators know whether incidents.md changed, stayed task-local, or needs explicit collection/finish.

## Scope

- In scope: After verify in branch_pr mode, print a deterministic incident-promotion outcome or next action so operators know whether incidents.md changed, stayed task-local, or needs explicit collection/finish.
- Out of scope: unrelated refactors not required for "Make verify explain incident promotion outcome deterministically".

## Plan

1. Reproduce the current verify/incidents UX so the operator can see when Findings stay task-local and when incidents.md will or will not change. 2. Make verify report incident promotion outcome deterministically in branch_pr, including explicit reasons when incidents stay local. 3. Add regression coverage for default verify, --collect-incidents, and branch_pr messaging, then verify with targeted tests.

## Verify Steps

1. Run targeted verify/incidents regressions that cover default branch_pr verify, verify --collect-incidents, and incidents collect --check. Expected: outputs distinguish updated incidents.md from validated-only or task-local outcomes.
2. Run the targeted branch_pr PR-flow incident locality regression. Expected: verify reports the deferred promotion path explicitly instead of a generic note.
3. Lint the touched incidents/verify/finalize sources and tests. Expected: eslint exits 0 for all modified files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T18:23:10.288Z — VERIFY — ok

By: CODER

Note: Verified deterministic incident outcome reporting in branch_pr verify and incidents collect --check with targeted incident-flow regressions plus eslint.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:16:58.013Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
