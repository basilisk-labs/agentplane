---
id: "202604072308-9QCT3T"
title: "Add file-backed note input for verify commands"
result_summary: "integrate: squash task/202604072308-9QCT3T/verify-note-file"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T00:23:40.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T00:28:55.537Z"
  updated_by: "CODER"
  note: "Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed on commit f3b0427a."
commit:
  hash: "d42137c39bc82305b2aa349c095af21e28509d44"
  message: "📝 9QCT3T task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: add note-file support for verify commands while preserving existing details/file semantics."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604072308-9QCT3T/pr."
events:
  -
    type: "status"
    at: "2026-04-08T00:23:41.244Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add note-file support for verify commands while preserving existing details/file semantics."
  -
    type: "verify"
    at: "2026-04-08T00:26:25.357Z"
    author: "CODER"
    state: "ok"
    note: "Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed."
  -
    type: "verify"
    at: "2026-04-08T00:28:55.537Z"
    author: "CODER"
    state: "ok"
    note: "Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed on commit f3b0427a."
  -
    type: "status"
    at: "2026-04-08T01:12:26.752Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604072308-9QCT3T/pr."
doc_version: 3
doc_updated_at: "2026-04-08T01:12:26.758Z"
doc_updated_by: "INTEGRATOR"
description: "task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts."
sections:
  Summary: |-
    Add file-backed note input for verify commands
    
    task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts.
  Scope: |-
    - In scope: task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts.
    - Out of scope: unrelated refactors not required for "Add file-backed note input for verify commands".
  Plan: "1. Extend verify command parsing to accept a file-backed note input without breaking existing --note/--details/--file behavior. 2. Normalize file-backed note content into a safe single-line note for task docs, add validation for conflicting flags, and preserve existing file-backed details semantics. 3. Add unit and CLI coverage for top-level verify and task verify ok/rework paths, then verify and publish through branch_pr."
  Verify Steps: "1. Run the targeted vitest verify suite for verify-record, workflow.verify-hooks, and run-cli lifecycle verify; expected: all pass. 2. Run eslint on touched verify command and test files; expected: no lint errors. 3. Review the resulting Verification README entries; expected: --note-file is accepted, --file stays details-only, and file-backed notes are normalized to a single-line Note entry."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T00:26:25.357Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:23:41.253Z, excerpt_hash=sha256:7320416e5efe614d53f432141c30942ddbeeb6e97825aeabd693ab23fa8dce4a
    
    ### 2026-04-08T00:28:55.537Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed on commit f3b0427a.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:26:25.361Z, excerpt_hash=sha256:7320416e5efe614d53f432141c30942ddbeeb6e97825aeabd693ab23fa8dce4a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add file-backed note input for verify commands

task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts.

## Scope

- In scope: task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts.
- Out of scope: unrelated refactors not required for "Add file-backed note input for verify commands".

## Plan

1. Extend verify command parsing to accept a file-backed note input without breaking existing --note/--details/--file behavior. 2. Normalize file-backed note content into a safe single-line note for task docs, add validation for conflicting flags, and preserve existing file-backed details semantics. 3. Add unit and CLI coverage for top-level verify and task verify ok/rework paths, then verify and publish through branch_pr.

## Verify Steps

1. Run the targeted vitest verify suite for verify-record, workflow.verify-hooks, and run-cli lifecycle verify; expected: all pass. 2. Run eslint on touched verify command and test files; expected: no lint errors. 3. Review the resulting Verification README entries; expected: --note-file is accepted, --file stays details-only, and file-backed notes are normalized to a single-line Note entry.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T00:26:25.357Z — VERIFY — ok

By: CODER

Note: Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:23:41.253Z, excerpt_hash=sha256:7320416e5efe614d53f432141c30942ddbeeb6e97825aeabd693ab23fa8dce4a

### 2026-04-08T00:28:55.537Z — VERIFY — ok

By: CODER

Note: Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed on commit f3b0427a.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T00:26:25.361Z, excerpt_hash=sha256:7320416e5efe614d53f432141c30942ddbeeb6e97825aeabd693ab23fa8dce4a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
