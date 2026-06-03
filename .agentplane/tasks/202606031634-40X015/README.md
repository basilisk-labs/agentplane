---
id: "202606031634-40X015"
title: "Fix task-local artifact commit eligibility after finish"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "issue-4399"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T16:35:20.660Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Investigating GitHub issue #4399 in the commit/lifecycle task artifact path, with scope limited to same-task generated artifacts and focused regression coverage."
events:
  -
    type: "status"
    at: "2026-06-03T16:35:25.024Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Investigating GitHub issue #4399 in the commit/lifecycle task artifact path, with scope limited to same-task generated artifacts and focused regression coverage."
doc_version: 3
doc_updated_at: "2026-06-03T16:35:25.024Z"
doc_updated_by: "CODER"
description: "Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task."
sections:
  Summary: |-
    Fix task-local artifact commit eligibility after finish

    Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
  Scope: |-
    - In scope: Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
    - Out of scope: unrelated refactors not required for "Fix task-local artifact commit eligibility after finish".
  Plan: |-
    1. Locate the commit allowlist / task-artifact filtering path that rejects same-task .agentplane/tasks/<task-id> artifacts without --allow-tasks.
    2. Change same-task artifact handling so task-local blueprint/quality artifacts are commit-eligible for that task without registering another task and without the extra artifact allow flag.
    3. Add focused regression coverage for issue #4399 covering same-task generated artifacts under .agentplane/tasks/<task-id>.
    4. Run the task Verify Steps, record verification, update PR artifacts, and hand off to integration.
  Verify Steps: |-
    1. Run focused regression coverage for task-local generated artifacts. Expected: same-task files under .agentplane/tasks/<task-id>/blueprint and .agentplane/tasks/<task-id>/quality are accepted by the task commit path without requiring a separate follow-up task or --allow-tasks.
    2. Run the relevant CLI test suite for the touched commit/lifecycle module. Expected: all tests pass.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing checks pass.
    4. Run agentplane doctor. Expected: required framework checks pass or any unrelated environment-only warning is recorded.
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

Fix task-local artifact commit eligibility after finish

Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.

## Scope

- In scope: Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
- Out of scope: unrelated refactors not required for "Fix task-local artifact commit eligibility after finish".

## Plan

1. Locate the commit allowlist / task-artifact filtering path that rejects same-task .agentplane/tasks/<task-id> artifacts without --allow-tasks.
2. Change same-task artifact handling so task-local blueprint/quality artifacts are commit-eligible for that task without registering another task and without the extra artifact allow flag.
3. Add focused regression coverage for issue #4399 covering same-task generated artifacts under .agentplane/tasks/<task-id>.
4. Run the task Verify Steps, record verification, update PR artifacts, and hand off to integration.

## Verify Steps

1. Run focused regression coverage for task-local generated artifacts. Expected: same-task files under .agentplane/tasks/<task-id>/blueprint and .agentplane/tasks/<task-id>/quality are accepted by the task commit path without requiring a separate follow-up task or --allow-tasks.
2. Run the relevant CLI test suite for the touched commit/lifecycle module. Expected: all tests pass.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing checks pass.
4. Run agentplane doctor. Expected: required framework checks pass or any unrelated environment-only warning is recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
