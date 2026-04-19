---
id: "202604191640-7DPEPE"
title: "Reduce shared directory to justified cross-cutting helpers"
result_summary: "root shared directory is reduced to 12 files; domain-specific helpers moved into commands/runtime/task-doc; dead agent-emoji removed; imports and focused regressions stay green"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:01:36.710Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T21:06:44.662Z"
  updated_by: "CODER"
  note: "Verified: shared root shrank to 12 files; agentplane typecheck/build passed after relocation; focused suites for moved modules and key consumers passed, including comment-format, git-log, runtime-source, repo-cli-version, runtime.command, workflow.task-doc, and guard commit diagnostics."
commit:
  hash: "521968ac6e7031934a45373a1f76a812c4b55415"
  message: "♻️ 7DPEPE task: relocate shared helpers by domain"
comments:
  -
    author: "CODER"
    body: "Start: classify shared-root files by real consumers, move non-cross-cutting helpers into domain-local modules, and leave only justified repo-wide utilities in packages/agentplane/src/shared."
  -
    author: "CODER"
    body: "Verified: shared root shrank to 12 files; agentplane typecheck/build passed after relocation; focused suites for moved modules and key consumers passed, including comment-format, git-log, runtime-source, repo-cli-version, runtime.command, workflow.task-doc, and guard commit diagnostics."
events:
  -
    type: "status"
    at: "2026-04-19T21:01:37.226Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify shared-root files by real consumers, move non-cross-cutting helpers into domain-local modules, and leave only justified repo-wide utilities in packages/agentplane/src/shared."
  -
    type: "verify"
    at: "2026-04-19T21:06:44.662Z"
    author: "CODER"
    state: "ok"
    note: "Verified: shared root shrank to 12 files; agentplane typecheck/build passed after relocation; focused suites for moved modules and key consumers passed, including comment-format, git-log, runtime-source, repo-cli-version, runtime.command, workflow.task-doc, and guard commit diagnostics."
  -
    type: "status"
    at: "2026-04-19T21:06:58.761Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared root shrank to 12 files; agentplane typecheck/build passed after relocation; focused suites for moved modules and key consumers passed, including comment-format, git-log, runtime-source, repo-cli-version, runtime.command, workflow.task-doc, and guard commit diagnostics."
doc_version: 3
doc_updated_at: "2026-04-19T21:06:58.762Z"
doc_updated_by: "CODER"
description: "Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain."
sections:
  Summary: |-
    Reduce shared directory to justified cross-cutting helpers
    
    Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.
  Scope: |-
    - In scope: Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.
    - Out of scope: unrelated refactors not required for "Reduce shared directory to justified cross-cutting helpers".
  Plan: "1. Inventory packages/agentplane/src/shared by actual import graph and classify each file as true cross-cutting, CLI-only, runtime-only, command-only, or meta-only. 2. Relocate non-cross-cutting helpers next to their dominant consumers instead of preserving a broad shared bucket. 3. Update imports/tests, then verify the shared root shrinks materially while touched suites stay green. 4. Finish the task with traceable evidence and use the result to close epic B-prime."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T21:06:44.662Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: shared root shrank to 12 files; agentplane typecheck/build passed after relocation; focused suites for moved modules and key consumers passed, including comment-format, git-log, runtime-source, repo-cli-version, runtime.command, workflow.task-doc, and guard commit diagnostics.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:01:37.232Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reduce shared directory to justified cross-cutting helpers

Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.

## Scope

- In scope: Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.
- Out of scope: unrelated refactors not required for "Reduce shared directory to justified cross-cutting helpers".

## Plan

1. Inventory packages/agentplane/src/shared by actual import graph and classify each file as true cross-cutting, CLI-only, runtime-only, command-only, or meta-only. 2. Relocate non-cross-cutting helpers next to their dominant consumers instead of preserving a broad shared bucket. 3. Update imports/tests, then verify the shared root shrinks materially while touched suites stay green. 4. Finish the task with traceable evidence and use the result to close epic B-prime.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T21:06:44.662Z — VERIFY — ok

By: CODER

Note: Verified: shared root shrank to 12 files; agentplane typecheck/build passed after relocation; focused suites for moved modules and key consumers passed, including comment-format, git-log, runtime-source, repo-cli-version, runtime.command, workflow.task-doc, and guard commit diagnostics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:01:37.232Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
