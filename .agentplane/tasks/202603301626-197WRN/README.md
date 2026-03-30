---
id: "202603301626-197WRN"
title: "Close stale legacy agent-schema PRs #3 and #4 after architecture drift"
result_summary: "Closed stale legacy PRs #3 and #4 as obsolete."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
  - "github"
  - "cleanup"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T16:29:03.789Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T16:27:54.778Z"
  updated_by: "CODER"
  note: "OK: GitHub open PR search now returns only #5 and #7; gh close actions moved #3 and #4 to closed/unmerged after confirming their target agent-schema and agent-lint paths no longer exist on current main."
commit:
  hash: "bc9d36631efa9fe0eac2e3d70631155213b3e133"
  message: "✅ WKK8C5 close: Merged via PR #36. (202603300819-WKK8C5) (#43)"
comments:
  -
    author: "CODER"
    body: "Start: prove that open GitHub PRs #3 and #4 are now architecturally stale against current main, then close only those obsolete PRs while leaving still-live PRs #5 and #7 untouched."
  -
    author: "CODER"
    body: "Verified: closed stale legacy PRs #3 and #4 after confirming that their target agent-schema and agent-lint paths no longer exist on main; PR #4 was additionally stale because it remained stacked on #3, while PR #5 and PR #7 were intentionally left open as still-live proposals."
  -
    author: "CODER"
    body: "Verified: closed stale legacy PRs #3 and #4 after confirming that their target agent-schema and agent-lint paths no longer exist on main; PR #4 was additionally stale because it remained stacked on #3, while PR #5 and PR #7 were intentionally left open as still-live proposals."
events:
  -
    type: "status"
    at: "2026-03-30T16:26:56.597Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prove that open GitHub PRs #3 and #4 are now architecturally stale against current main, then close only those obsolete PRs while leaving still-live PRs #5 and #7 untouched."
  -
    type: "verify"
    at: "2026-03-30T16:27:54.778Z"
    author: "CODER"
    state: "ok"
    note: "OK: GitHub open PR search now returns only #5 and #7; gh close actions moved #3 and #4 to closed/unmerged after confirming their target agent-schema and agent-lint paths no longer exist on current main."
  -
    type: "status"
    at: "2026-03-30T16:28:14.101Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: closed stale legacy PRs #3 and #4 after confirming that their target agent-schema and agent-lint paths no longer exist on main; PR #4 was additionally stale because it remained stacked on #3, while PR #5 and PR #7 were intentionally left open as still-live proposals."
  -
    type: "status"
    at: "2026-03-30T16:29:51.284Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: closed stale legacy PRs #3 and #4 after confirming that their target agent-schema and agent-lint paths no longer exist on main; PR #4 was additionally stale because it remained stacked on #3, while PR #5 and PR #7 were intentionally left open as still-live proposals."
doc_version: 3
doc_updated_at: "2026-03-30T16:29:51.285Z"
doc_updated_by: "CODER"
description: "Prove that open PRs #3 and #4 are no longer merge-relevant because they target file paths and agent/CLI schema surfaces that no longer exist on main, then close only those PRs on GitHub while leaving still-live PRs #5 and #7 untouched."
sections:
  Summary: |-
    Close stale legacy agent-schema PRs #3 and #4 after architecture drift
    
    Prove that open PRs #3 and #4 are no longer merge-relevant because they target file paths and agent/CLI schema surfaces that no longer exist on main, then close only those PRs on GitHub while leaving still-live PRs #5 and #7 untouched.
  Scope: |-
    - In scope: Prove that open PRs #3 and #4 are no longer merge-relevant because they target file paths and agent/CLI schema surfaces that no longer exist on main, then close only those PRs on GitHub while leaving still-live PRs #5 and #7 untouched.
    - Out of scope: unrelated refactors not required for "Close stale legacy agent-schema PRs #3 and #4 after architecture drift".
  Plan: |-
    1. Implement the change for "Close stale legacy agent-schema PRs #3 and #4 after architecture drift".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Inspect the live open PR set and the changed-file paths for PR #3 and PR #4. Expected: both PRs target paths or schema surfaces that no longer exist on main, and PR #4 still depends on #3.
    2. Close PR #3 and PR #4 on GitHub with explicit superseded reasons. Expected: both PRs move to closed/unmerged with cleanup notes.
    3. Query open PRs again. Expected: PR #3 and PR #4 are no longer open, while PR #5 and PR #7 remain open.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T16:27:54.778Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: GitHub open PR search now returns only #5 and #7; gh close actions moved #3 and #4 to closed/unmerged after confirming their target agent-schema and agent-lint paths no longer exist on current main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T16:26:56.598Z, excerpt_hash=sha256:bb2aa54f8258670613303216d3f4420a33bb8da14261e77c767db2ac0cc16758
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Close stale legacy agent-schema PRs #3 and #4 after architecture drift

Prove that open PRs #3 and #4 are no longer merge-relevant because they target file paths and agent/CLI schema surfaces that no longer exist on main, then close only those PRs on GitHub while leaving still-live PRs #5 and #7 untouched.

## Scope

- In scope: Prove that open PRs #3 and #4 are no longer merge-relevant because they target file paths and agent/CLI schema surfaces that no longer exist on main, then close only those PRs on GitHub while leaving still-live PRs #5 and #7 untouched.
- Out of scope: unrelated refactors not required for "Close stale legacy agent-schema PRs #3 and #4 after architecture drift".

## Plan

1. Implement the change for "Close stale legacy agent-schema PRs #3 and #4 after architecture drift".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Inspect the live open PR set and the changed-file paths for PR #3 and PR #4. Expected: both PRs target paths or schema surfaces that no longer exist on main, and PR #4 still depends on #3.
2. Close PR #3 and PR #4 on GitHub with explicit superseded reasons. Expected: both PRs move to closed/unmerged with cleanup notes.
3. Query open PRs again. Expected: PR #3 and PR #4 are no longer open, while PR #5 and PR #7 remain open.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T16:27:54.778Z — VERIFY — ok

By: CODER

Note: OK: GitHub open PR search now returns only #5 and #7; gh close actions moved #3 and #4 to closed/unmerged after confirming their target agent-schema and agent-lint paths no longer exist on current main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T16:26:56.598Z, excerpt_hash=sha256:bb2aa54f8258670613303216d3f4420a33bb8da14261e77c767db2ac0cc16758

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
