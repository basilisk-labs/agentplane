---
id: "202603250509-KYAC8B"
title: "Allow deterministic close commits on base branch during branch_pr finish"
result_summary: "integrate: squash task/202603250509-KYAC8B/close-commit"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "git"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T05:10:15.069Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T05:42:12.685Z"
  updated_by: "CODER"
  note: "Targeted finish/guard regressions, build, and style checks passed; branch_pr close-commit path now allows canonical base-branch close commits."
commit:
  hash: "59837201d6239524351b91a46196e699c1182990"
  message: "📝 KYAC8B tasks: persist branch_pr PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the branch_pr base-branch close guard and allow canonical deterministic finish commits without workaround branches."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603250509-KYAC8B/pr."
events:
  -
    type: "status"
    at: "2026-03-25T05:35:47.861Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the branch_pr base-branch close guard and allow canonical deterministic finish commits without workaround branches."
  -
    type: "verify"
    at: "2026-03-25T05:42:12.685Z"
    author: "CODER"
    state: "ok"
    note: "Targeted finish/guard regressions, build, and style checks passed; branch_pr close-commit path now allows canonical base-branch close commits."
  -
    type: "status"
    at: "2026-03-25T06:04:28.508Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603250509-KYAC8B/pr."
doc_version: 3
doc_updated_at: "2026-03-25T06:04:28.509Z"
doc_updated_by: "INTEGRATOR"
description: "Repair the branch_pr close path so finish/close-commit can create the deterministic task close commit on the pinned base branch without forcing a temporary workaround branch."
sections:
  Summary: |-
    Allow deterministic close commits on base branch during branch_pr finish
    
    Repair the branch_pr close path so finish/close-commit can create the deterministic task close commit on the pinned base branch without forcing a temporary workaround branch.
  Scope: |-
    - In scope: Repair the branch_pr close path so finish/close-commit can create the deterministic task close commit on the pinned base branch without forcing a temporary workaround branch.
    - Out of scope: unrelated refactors not required for "Allow deterministic close commits on base branch during branch_pr finish".
  Plan: |-
    1. Reproduce branch_pr finish/close-commit on the pinned base branch and confirm why deterministic close commits are still rejected there.
    2. Adjust the base-branch close policy so canonical branch_pr closure can create the deterministic close commit on the pinned base branch without temporary workaround branches.
    3. Add regression coverage for branch_pr finish with --close-commit on the base branch and verify the close commit is created canonically.
  Verify Steps: |-
    1. Reproduce branch_pr finish with --close-commit on the pinned base branch. Expected: deterministic close commit is created without a temporary workaround branch.
    2. Run targeted finish/close regression coverage. Expected: the branch_pr close path now allows canonical base-branch closure.
    3. Confirm the resulting close commit and task metadata stay in sync. Expected: finish completes on the base branch with a proper deterministic close commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T05:42:12.685Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted finish/guard regressions, build, and style checks passed; branch_pr close-commit path now allows canonical base-branch close commits.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:35:47.862Z, excerpt_hash=sha256:f81b27772c7584c8587521faf919ba2e646f7566ea9b5b03624a6c535ee5aaee
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow deterministic close commits on base branch during branch_pr finish

Repair the branch_pr close path so finish/close-commit can create the deterministic task close commit on the pinned base branch without forcing a temporary workaround branch.

## Scope

- In scope: Repair the branch_pr close path so finish/close-commit can create the deterministic task close commit on the pinned base branch without forcing a temporary workaround branch.
- Out of scope: unrelated refactors not required for "Allow deterministic close commits on base branch during branch_pr finish".

## Plan

1. Reproduce branch_pr finish/close-commit on the pinned base branch and confirm why deterministic close commits are still rejected there.
2. Adjust the base-branch close policy so canonical branch_pr closure can create the deterministic close commit on the pinned base branch without temporary workaround branches.
3. Add regression coverage for branch_pr finish with --close-commit on the base branch and verify the close commit is created canonically.

## Verify Steps

1. Reproduce branch_pr finish with --close-commit on the pinned base branch. Expected: deterministic close commit is created without a temporary workaround branch.
2. Run targeted finish/close regression coverage. Expected: the branch_pr close path now allows canonical base-branch closure.
3. Confirm the resulting close commit and task metadata stay in sync. Expected: finish completes on the base branch with a proper deterministic close commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T05:42:12.685Z — VERIFY — ok

By: CODER

Note: Targeted finish/guard regressions, build, and style checks passed; branch_pr close-commit path now allows canonical base-branch close commits.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:35:47.862Z, excerpt_hash=sha256:f81b27772c7584c8587521faf919ba2e646f7566ea9b5b03624a6c535ee5aaee

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
