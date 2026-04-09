---
id: "202604091932-EPMJDB"
title: "Compact incidents registry to stay within policy budget"
result_summary: "Integrated locally on main."
status: "DONE"
priority: "high"
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
  updated_at: "2026-04-09T19:33:05.456Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T19:45:07.505Z"
  updated_by: "CODER"
  note: "Verified compact inline incident-registry serialization, compact registry rewrite, policy routing, eslint, and incident-related vitest slices in the dedicated task worktree before cherry-picking commit 405ef090 onto main."
commit:
  hash: "5c0ba83111344ce564485230041b083660985c41"
  message: "🩹 EPMJDB task: compact incident registry serialization"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: compact incident-registry serialization, routing checks, eslint, and incident-related vitest slices passed before the change was cherry-picked onto main."
events:
  -
    type: "verify"
    at: "2026-04-09T19:45:07.505Z"
    author: "CODER"
    state: "ok"
    note: "Verified compact inline incident-registry serialization, compact registry rewrite, policy routing, eslint, and incident-related vitest slices in the dedicated task worktree before cherry-picking commit 405ef090 onto main."
  -
    type: "status"
    at: "2026-04-09T19:45:07.878Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: compact incident-registry serialization, routing checks, eslint, and incident-related vitest slices passed before the change was cherry-picked onto main."
doc_version: 3
doc_updated_at: "2026-04-09T19:45:07.878Z"
doc_updated_by: "INTEGRATOR"
description: "Reduce .agentplane/policy/incidents.md verbosity so incident promotion and branch_pr integrate can append new reusable incidents without tripping the 100-line policy budget."
sections:
  Summary: |-
    Compact incidents registry to stay within policy budget
    
    Reduce .agentplane/policy/incidents.md verbosity so incident promotion and branch_pr integrate can append new reusable incidents without tripping the 100-line policy budget.
  Scope: |-
    - In scope: Reduce .agentplane/policy/incidents.md verbosity so incident promotion and branch_pr integrate can append new reusable incidents without tripping the 100-line policy budget.
    - Out of scope: unrelated refactors not required for "Compact incidents registry to stay within policy budget".
  Plan: "1. Compact .agentplane/policy/incidents.md so the registry stays materially under the 100-line module budget while preserving machine-parsable fields and reusable guidance. 2. Verify routing and policy checks still pass after the compaction. 3. Re-run the blocked branch_pr integrate/incident-promotion path to confirm new incidents can append without budget failure."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T19:45:07.505Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified compact inline incident-registry serialization, compact registry rewrite, policy routing, eslint, and incident-related vitest slices in the dedicated task worktree before cherry-picking commit 405ef090 onto main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T19:33:05.227Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Compact incidents registry to stay within policy budget

Reduce .agentplane/policy/incidents.md verbosity so incident promotion and branch_pr integrate can append new reusable incidents without tripping the 100-line policy budget.

## Scope

- In scope: Reduce .agentplane/policy/incidents.md verbosity so incident promotion and branch_pr integrate can append new reusable incidents without tripping the 100-line policy budget.
- Out of scope: unrelated refactors not required for "Compact incidents registry to stay within policy budget".

## Plan

1. Compact .agentplane/policy/incidents.md so the registry stays materially under the 100-line module budget while preserving machine-parsable fields and reusable guidance. 2. Verify routing and policy checks still pass after the compaction. 3. Re-run the blocked branch_pr integrate/incident-promotion path to confirm new incidents can append without budget failure.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T19:45:07.505Z — VERIFY — ok

By: CODER

Note: Verified compact inline incident-registry serialization, compact registry rewrite, policy routing, eslint, and incident-related vitest slices in the dedicated task worktree before cherry-picking commit 405ef090 onto main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T19:33:05.227Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
