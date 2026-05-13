---
id: "202605130823-WSWNSC"
title: "Persist GitHub PR identity for open branch_pr artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "bug"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T08:23:59.090Z"
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
    body: "Start: Implement the approved PR identity persistence fix in the task worktree, keep merged lifecycle semantics scoped to MERGED only, add focused regression tests for pr open/update OPEN identity hydration, and run the declared verification checks before handoff."
events:
  -
    type: "status"
    at: "2026-05-13T08:24:28.848Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved PR identity persistence fix in the task worktree, keep merged lifecycle semantics scoped to MERGED only, add focused regression tests for pr open/update OPEN identity hydration, and run the declared verification checks before handoff."
doc_version: 3
doc_updated_at: "2026-05-13T08:24:28.848Z"
doc_updated_by: "CODER"
description: "Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests."
sections:
  Summary: |-
    Persist GitHub PR identity for open branch_pr artifacts
    
    Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
  Scope: |-
    - In scope: Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
    - Out of scope: unrelated refactors not required for "Persist GitHub PR identity for open branch_pr artifacts".
  Plan: |-
    1. Update PR sync GitHub metadata persistence so observed OPEN/CLOSED/MERGED PR identity is recorded in task pr/meta.json.
    2. Preserve merged artifact lifecycle semantics only for MERGED PRs.
    3. Add focused tests proving pr open and pr update persist OPEN GitHub identity.
    4. Run targeted tests plus routing/doctor checks and record verification evidence.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Persist GitHub PR identity for open branch_pr artifacts

Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.

## Scope

- In scope: Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
- Out of scope: unrelated refactors not required for "Persist GitHub PR identity for open branch_pr artifacts".

## Plan

1. Update PR sync GitHub metadata persistence so observed OPEN/CLOSED/MERGED PR identity is recorded in task pr/meta.json.
2. Preserve merged artifact lifecycle semantics only for MERGED PRs.
3. Add focused tests proving pr open and pr update persist OPEN GitHub identity.
4. Run targeted tests plus routing/doctor checks and record verification evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
