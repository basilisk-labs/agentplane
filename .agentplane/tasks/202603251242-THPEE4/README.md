---
id: "202603251242-THPEE4"
title: "Repair onboarding bootstrap direct lifecycle section"
result_summary: "integrate: squash task/202603251242-THPEE4/repair-onboarding-bootstrap-direct-path"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T12:55:34.724Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T12:56:38.616Z"
  updated_by: "CODER"
  note: "Checks passed: docs:onboarding:check; prettier check on onboarding docs and bootstrap generator surfaces."
commit:
  hash: "7afd1516c145a3443d28fc90919132d62e2d4030"
  message: "✨ THPEE4 docs: refresh local PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: repairing the generated onboarding bootstrap heading so docs:onboarding:check finds the expected direct lifecycle section again, regenerating the docs artifact from source, and rerunning the exact blocked check before another push attempt."
  -
    author: "CODER"
    body: "Start: repairing the generated onboarding bootstrap heading so docs:onboarding:check finds the expected direct lifecycle section again, regenerating the docs artifact from source, and rerunning the exact blocked check before another push attempt."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603251242-THPEE4/pr."
events:
  -
    type: "status"
    at: "2026-03-25T12:44:28.744Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repairing the generated onboarding bootstrap heading so docs:onboarding:check finds the expected direct lifecycle section again, regenerating the docs artifact from source, and rerunning the exact blocked check before another push attempt."
  -
    type: "status"
    at: "2026-03-25T12:44:56.350Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: repairing the generated onboarding bootstrap heading so docs:onboarding:check finds the expected direct lifecycle section again, regenerating the docs artifact from source, and rerunning the exact blocked check before another push attempt."
  -
    type: "verify"
    at: "2026-03-25T12:56:38.616Z"
    author: "CODER"
    state: "ok"
    note: "Checks passed: docs:onboarding:check; prettier check on onboarding docs and bootstrap generator surfaces."
  -
    type: "status"
    at: "2026-03-25T12:59:07.752Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603251242-THPEE4/pr."
doc_version: 3
doc_updated_at: "2026-03-25T12:59:07.753Z"
doc_updated_by: "INTEGRATOR"
description: "Restore the direct-lifecycle onboarding text required by docs:onboarding:check so the generated agent bootstrap surface again includes the expected direct happy path guidance and pre-push can complete."
sections:
  Summary: |-
    Repair onboarding bootstrap direct lifecycle section
    
    Restore the direct-lifecycle onboarding text required by docs:onboarding:check so the generated agent bootstrap surface again includes the expected direct happy path guidance and pre-push can complete.
  Scope: |-
    - In scope: Restore the direct-lifecycle onboarding text required by docs:onboarding:check so the generated agent bootstrap surface again includes the expected direct happy path guidance and pre-push can complete.
    - Out of scope: unrelated refactors not required for "Repair onboarding bootstrap direct lifecycle section".
  Plan: |-
    1. Rebuild the onboarding bootstrap generator output from the updated direct-path heading in bootstrap-guide.
    2. Align docs/user/task-lifecycle.mdx and docs/user/workflow.mdx with the required direct-lifecycle onboarding markers.
    3. Run docs:onboarding:check and formatting checks, then close via branch_pr flow.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T12:56:38.616Z — VERIFY — ok
    
    By: CODER
    
    Note: Checks passed: docs:onboarding:check; prettier check on onboarding docs and bootstrap generator surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T12:55:32.981Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repair onboarding bootstrap direct lifecycle section

Restore the direct-lifecycle onboarding text required by docs:onboarding:check so the generated agent bootstrap surface again includes the expected direct happy path guidance and pre-push can complete.

## Scope

- In scope: Restore the direct-lifecycle onboarding text required by docs:onboarding:check so the generated agent bootstrap surface again includes the expected direct happy path guidance and pre-push can complete.
- Out of scope: unrelated refactors not required for "Repair onboarding bootstrap direct lifecycle section".

## Plan

1. Rebuild the onboarding bootstrap generator output from the updated direct-path heading in bootstrap-guide.
2. Align docs/user/task-lifecycle.mdx and docs/user/workflow.mdx with the required direct-lifecycle onboarding markers.
3. Run docs:onboarding:check and formatting checks, then close via branch_pr flow.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T12:56:38.616Z — VERIFY — ok

By: CODER

Note: Checks passed: docs:onboarding:check; prettier check on onboarding docs and bootstrap generator surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T12:55:32.981Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
