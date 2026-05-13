---
id: "202605130823-5SM92P"
title: "Improve Agentplane PR merge messages with structured human-readable summaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
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
  updated_at: "2026-05-13T08:23:37.449Z"
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
    body: "Start: Implement deterministic human-readable close and merge commit messages in the dedicated task worktree, preserving audit refs while moving operational metadata out of the subject."
events:
  -
    type: "status"
    at: "2026-05-13T08:23:55.154Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement deterministic human-readable close and merge commit messages in the dedicated task worktree, preserving audit refs while moving operational metadata out of the subject."
doc_version: 3
doc_updated_at: "2026-05-13T08:23:55.154Z"
doc_updated_by: "CODER"
description: "Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers."
sections:
  Summary: |-
    Improve Agentplane PR merge messages with structured human-readable summaries
    
    Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
  Scope: |-
    - In scope: Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
    - Out of scope: unrelated refactors not required for "Improve Agentplane PR merge messages with structured human-readable summaries".
  Plan: "Implement deterministic human-readable Agentplane close/merge commit messages. Steps: 1) add a structured merge message input/model and renderer with normalization helpers; 2) wire close-commit rendering to use structured sections and refs instead of operational metadata in the subject; 3) preserve DCO/co-author trailers and available task/run/PR refs; 4) add renderer snapshot/unit coverage for full, minimal, noisy-title, long-verification, many-key-files, and metadata-only cases; 5) update one integration path assertion so old emoji/task close subject is no longer accepted; 6) verify with task verify-show, targeted tests, typecheck, and routing check."
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

Improve Agentplane PR merge messages with structured human-readable summaries

Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.

## Scope

- In scope: Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
- Out of scope: unrelated refactors not required for "Improve Agentplane PR merge messages with structured human-readable summaries".

## Plan

Implement deterministic human-readable Agentplane close/merge commit messages. Steps: 1) add a structured merge message input/model and renderer with normalization helpers; 2) wire close-commit rendering to use structured sections and refs instead of operational metadata in the subject; 3) preserve DCO/co-author trailers and available task/run/PR refs; 4) add renderer snapshot/unit coverage for full, minimal, noisy-title, long-verification, many-key-files, and metadata-only cases; 5) update one integration path assertion so old emoji/task close subject is no longer accepted; 6) verify with task verify-show, targeted tests, typecheck, and routing check.

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
