---
id: "202605091443-B5JJYR"
title: "Deduplicate async JSON file reader"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T14:43:35.950Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T14:55:49.335Z"
  updated_by: "CODER"
  note: "Async JSON reader deduplication verified."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Deduplicate async JSON file reading while preserving strict release errors and tolerant task-index cache reads."
events:
  -
    type: "status"
    at: "2026-05-09T14:43:59.116Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Deduplicate async JSON file reading while preserving strict release errors and tolerant task-index cache reads."
  -
    type: "verify"
    at: "2026-05-09T14:55:49.335Z"
    author: "CODER"
    state: "ok"
    note: "Async JSON reader deduplication verified."
doc_version: 3
doc_updated_at: "2026-05-09T14:55:49.359Z"
doc_updated_by: "CODER"
description: "Add a shared async JSON file reader for agentplane CLI code and replace the duplicated release preflight and task-index readJsonFile helpers while preserving their different error handling behavior."
sections:
  Summary: |-
    Deduplicate async JSON file reader
    
    Add a shared async JSON file reader for agentplane CLI code and replace the duplicated release preflight and task-index readJsonFile helpers while preserving their different error handling behavior.
  Scope: |-
    - In scope: Add a shared async JSON file reader for agentplane CLI code and replace the duplicated release preflight and task-index readJsonFile helpers while preserving their different error handling behavior.
    - Out of scope: unrelated refactors not required for "Deduplicate async JSON file reader".
  Plan: |-
    1. Add a shared async JSON reader in agentplane shared utilities with default-value support for tolerant cache reads.
    2. Replace release preflight and task-index local readJsonFile helpers with the shared helper, preserving strict release parsing and nullable task-index cache behavior.
    3. Run focused tests for release preflight/task index surfaces plus typecheck/lint.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T14:55:49.335Z — VERIFY — ok
    
    By: CODER
    
    Note: Async JSON reader deduplication verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T14:43:59.134Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Added packages/agentplane/src/shared/json-io.ts with strict default behavior and optional defaultValue for tolerant cache reads. Replaced release preflight and task-index local async readJsonFile helpers while leaving runtime-source sync bootstrap reader unchanged. Checks passed after bootstrapping the isolated worktree: bun run typecheck; focused Vitest json-io/task-index/release-preflight suite (3 files, 15 tests); targeted eslint on touched files. Full bun run lint:core was attempted but stopped after more than five minutes without output; targeted eslint completed successfully.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/codex-v05-clean-base/.agentplane/tasks/202605091443-B5JJYR/blueprint/resolved-snapshot.json
    - old_digest: ed85430248dd01928a925708cb33263f8e5dd415d911fcab644bb4703a0f6067
    - current_digest: ed85430248dd01928a925708cb33263f8e5dd415d911fcab644bb4703a0f6067
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091443-B5JJYR
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
