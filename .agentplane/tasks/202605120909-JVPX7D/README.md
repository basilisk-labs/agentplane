---
id: "202605120909-JVPX7D"
title: "Align installed branch_pr quickstart guidance"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100837-B14YQC"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T09:09:40.280Z"
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
    body: "Start: align installed branch_pr quickstart and role guidance in the existing B14YQC batch branch, keeping source/help changes under a code task."
events:
  -
    type: "status"
    at: "2026-05-12T09:10:27.843Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align installed branch_pr quickstart and role guidance in the existing B14YQC batch branch, keeping source/help changes under a code task."
doc_version: 3
doc_updated_at: "2026-05-12T09:10:27.843Z"
doc_updated_by: "CODER"
description: "Update installed quickstart and role guidance so branch_pr clearly separates task-worktree implementation commits from lifecycle/status checkpoints and finish uses an explicit task-branch commit hash."
sections:
  Summary: |-
    Align installed branch_pr quickstart guidance
    
    Update installed quickstart and role guidance so branch_pr clearly separates task-worktree implementation commits from lifecycle/status checkpoints and finish uses an explicit task-branch commit hash.
  Scope: |-
    - In scope: Update installed quickstart and role guidance so branch_pr clearly separates task-worktree implementation commits from lifecycle/status checkpoints and finish uses an explicit task-branch commit hash.
    - Out of scope: unrelated refactors not required for "Align installed branch_pr quickstart guidance".
  Plan: "Batch with 202605100837-B14YQC in its existing branch. 1. Keep B14YQC docs-page changes separate. 2. Commit installed quickstart/role guidance source and help snapshot under this code task. 3. Re-run focused help/quickstart tests, docs checks, lint/format, policy routing, and doctor before PR."
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
