---
id: "202605252058-3Q9G73"
title: "Expand commit subject naming coverage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T21:00:39.722Z"
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
    body: "Start: Implement the approved commit subject naming coverage expansion in the task worktree, preserving strict task-bound traceability while allowing documented hosted semantic, merge transport, and dependency bot subject classes with focused tests."
events:
  -
    type: "status"
    at: "2026-05-25T21:01:26.100Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved commit subject naming coverage expansion in the task worktree, preserving strict task-bound traceability while allowing documented hosted semantic, merge transport, and dependency bot subject classes with focused tests."
doc_version: 3
doc_updated_at: "2026-05-25T21:01:26.100Z"
doc_updated_by: "CODER"
description: "Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability."
sections:
  Summary: |-
    Expand commit subject naming coverage

    Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
  Scope: |-
    - In scope: Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
    - Out of scope: unrelated refactors not required for "Expand commit subject naming coverage".
  Plan: "Plan: 1. Update commit subject policy to classify strict task subjects, conventional semantic subjects, Git/GitHub merge transport subjects, and known dependency-bot bump subjects. 2. Preserve strict task-bound traceability for manual task commits unless AGENTPLANE_ALLOW_HUMAN_TASK_SUBJECT is explicitly set. 3. Add unit tests covering recent real subjects from May 26 branch_pr history and rejection cases. 4. Update user-facing diagnostics/docs if the accepted forms change. 5. Verify with targeted commit-policy tests, hook-related tests if touched, routing policy check, and task verify-show evidence."
  Verify Steps: |-
    1. Run `bun test packages/core/src/commit/commit-policy.test.ts`. Expected: commit subject policy accepts strict task, hosted semantic, Git transport, and dependency bot subjects while rejecting non-strict task-context conventional subjects.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy gateway and module budgets remain valid.
    3. Review `git diff -- packages/core/src/commit/commit-policy.ts packages/core/src/commit/commit-policy.test.ts .agentplane/tasks/202605252058-3Q9G73/README.md`. Expected: diff is limited to commit subject policy, focused tests, and task verification documentation.
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

Expand commit subject naming coverage

Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.

## Scope

- In scope: Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
- Out of scope: unrelated refactors not required for "Expand commit subject naming coverage".

## Plan

Plan: 1. Update commit subject policy to classify strict task subjects, conventional semantic subjects, Git/GitHub merge transport subjects, and known dependency-bot bump subjects. 2. Preserve strict task-bound traceability for manual task commits unless AGENTPLANE_ALLOW_HUMAN_TASK_SUBJECT is explicitly set. 3. Add unit tests covering recent real subjects from May 26 branch_pr history and rejection cases. 4. Update user-facing diagnostics/docs if the accepted forms change. 5. Verify with targeted commit-policy tests, hook-related tests if touched, routing policy check, and task verify-show evidence.

## Verify Steps

1. Run `bun test packages/core/src/commit/commit-policy.test.ts`. Expected: commit subject policy accepts strict task, hosted semantic, Git transport, and dependency bot subjects while rejecting non-strict task-context conventional subjects.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy gateway and module budgets remain valid.
3. Review `git diff -- packages/core/src/commit/commit-policy.ts packages/core/src/commit/commit-policy.test.ts .agentplane/tasks/202605252058-3Q9G73/README.md`. Expected: diff is limited to commit subject policy, focused tests, and task verification documentation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
