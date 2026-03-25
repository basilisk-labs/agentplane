---
id: "202603241919-QVGXZ5"
title: "Workflow tooling/docs: require waiting for remote checks before merge"
result_summary: "integrate: squash task/202603241919-QVGXZ5/remote-check-wait"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603241918-K4BDTF"
  - "202603241918-0799YC"
tags:
  - "code"
  - "workflow"
  - "github"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T06:17:47.696Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T06:22:48.536Z"
  updated_by: "CODER"
  note: "Added a small gh-based remote-check wait helper, exposed it via package.json, updated branch_pr docs to use one canonical wait step, and verified help/vitest/prettier/eslint in touched scope."
commit:
  hash: "0bb81d4405f04601a09c7f32d97a914364921788"
  message: "📝 QVGXZ5 tasks: persist branch_pr PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: add a small gh-based remote-check wait helper and wire it into the branch_pr workflow guidance."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603241919-QVGXZ5/pr."
events:
  -
    type: "status"
    at: "2026-03-25T06:18:08.297Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a small gh-based remote-check wait helper and wire it into the branch_pr workflow guidance."
  -
    type: "verify"
    at: "2026-03-25T06:22:48.536Z"
    author: "CODER"
    state: "ok"
    note: "Added a small gh-based remote-check wait helper, exposed it via package.json, updated branch_pr docs to use one canonical wait step, and verified help/vitest/prettier/eslint in touched scope."
  -
    type: "status"
    at: "2026-03-25T06:23:45.052Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603241919-QVGXZ5/pr."
doc_version: 3
doc_updated_at: "2026-03-25T06:23:45.052Z"
doc_updated_by: "INTEGRATOR"
description: "Add a documented or scripted remote-check wait step based on gh so PR integration is not considered complete until the required GitHub checks for the target SHA are green."
sections:
  Summary: |-
    Workflow tooling/docs: require waiting for remote checks before merge
    
    Add a documented or scripted remote-check wait step based on gh so PR integration is not considered complete until the required GitHub checks for the target SHA are green.
  Scope: |-
    - In scope: Add a documented or scripted remote-check wait step based on gh so PR integration is not considered complete until the required GitHub checks for the target SHA are green.
    - Out of scope: unrelated refactors not required for "Workflow tooling/docs: require waiting for remote checks before merge".
  Plan: |-
    1. Implement the change for "Workflow tooling/docs: require waiting for remote checks before merge".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run the remote-check helper with --help. Expected: usage explains that it waits for required GitHub PR checks and delegates to gh.
    2. Run the focused validation for the helper and touched workflow docs. Expected: tests/docs checks pass in touched scope without unexpected regressions.
    3. Review the final workflow path. Expected: branch_pr guidance now has one concrete command for waiting on remote checks before integrate or finish.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T06:22:48.536Z — VERIFY — ok
    
    By: CODER
    
    Note: Added a small gh-based remote-check wait helper, exposed it via package.json, updated branch_pr docs to use one canonical wait step, and verified help/vitest/prettier/eslint in touched scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T06:18:08.298Z, excerpt_hash=sha256:f0e3cdc967ca17b84b8f3a28790505730dbb0227c5b21770b12a788c274ea0f2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Workflow tooling/docs: require waiting for remote checks before merge

Add a documented or scripted remote-check wait step based on gh so PR integration is not considered complete until the required GitHub checks for the target SHA are green.

## Scope

- In scope: Add a documented or scripted remote-check wait step based on gh so PR integration is not considered complete until the required GitHub checks for the target SHA are green.
- Out of scope: unrelated refactors not required for "Workflow tooling/docs: require waiting for remote checks before merge".

## Plan

1. Implement the change for "Workflow tooling/docs: require waiting for remote checks before merge".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run the remote-check helper with --help. Expected: usage explains that it waits for required GitHub PR checks and delegates to gh.
2. Run the focused validation for the helper and touched workflow docs. Expected: tests/docs checks pass in touched scope without unexpected regressions.
3. Review the final workflow path. Expected: branch_pr guidance now has one concrete command for waiting on remote checks before integrate or finish.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T06:22:48.536Z — VERIFY — ok

By: CODER

Note: Added a small gh-based remote-check wait helper, exposed it via package.json, updated branch_pr docs to use one canonical wait step, and verified help/vitest/prettier/eslint in touched scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T06:18:08.298Z, excerpt_hash=sha256:f0e3cdc967ca17b84b8f3a28790505730dbb0227c5b21770b12a788c274ea0f2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
