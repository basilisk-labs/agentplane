---
id: "202605031626-M8GRHS"
title: "ACR generation engine"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031625-BM686J"
tags:
  - "cli"
  - "code"
verify:
  - "agentplane acr generate --help"
  - "bun test packages/agentplane/src/commands/acr packages/core/src/tasks"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:14.345Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:21:00.745Z"
  updated_by: "CODER"
  note: "Command: agentplane acr generate --help. Result: pass. Evidence: help lists work-commit/base-commit/out/write/stdout/refresh/json options. Scope: generation command surface. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: wrote .agentplane/tasks/202605031625-886KZ6/acr.json with record_digest sha256:4ec21969b1415ec5abe6bdd4bf1efc217264e2aba0bf35bb23c3a62c7fcca8d6 and no warnings. Scope: generation engine. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: task/schema evidence consumed by generation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
events:
  -
    type: "status"
    at: "2026-05-03T17:11:58.601Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement this ACR v0.1 scope inside the approved batch worktree and verify it with the shared ACR CLI, schema, docs, and lifecycle checks."
  -
    type: "verify"
    at: "2026-05-03T17:21:00.745Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane acr generate --help. Result: pass. Evidence: help lists work-commit/base-commit/out/write/stdout/refresh/json options. Scope: generation command surface. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: wrote .agentplane/tasks/202605031625-886KZ6/acr.json with record_digest sha256:4ec21969b1415ec5abe6bdd4bf1efc217264e2aba0bf35bb23c3a62c7fcca8d6 and no warnings. Scope: generation engine. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: task/schema evidence consumed by generation."
doc_version: 3
doc_updated_at: "2026-05-03T17:21:00.770Z"
doc_updated_by: "CODER"
description: "Implement agentplane acr generate <task-id> using task records, Git range data, policy/config facts, verification summaries, evidence references, and safe defaults. Default write path is .agentplane/tasks/<task-id>/acr.json."
sections:
  Summary: |-
    ACR generation engine
    
    Implement agentplane acr generate <task-id> using task records, Git range data, policy/config facts, verification summaries, evidence references, and safe defaults. Default write path is .agentplane/tasks/<task-id>/acr.json.
  Scope: |-
    - In scope: Implement agentplane acr generate <task-id> using task records, Git range data, policy/config facts, verification summaries, evidence references, and safe defaults. Default write path is .agentplane/tasks/<task-id>/acr.json.
    - Out of scope: unrelated refactors not required for "ACR generation engine".
  Plan: "Plan: (1) Implement ACR generation as a usecase over task state, Git state, config/policy facts, and verification summaries. (2) Default writes target .agentplane/tasks/<task-id>/acr.json; stdout/out remain supported for export. (3) Preserve work_commit as the implementation commit, never as a self-referential evidence commit. (4) Reject overwrite unless refresh is explicit. Verify with generation tests and a local command smoke."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/acr packages/core/src/tasks`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane acr generate --help`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:21:00.745Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane acr generate --help. Result: pass. Evidence: help lists work-commit/base-commit/out/write/stdout/refresh/json options. Scope: generation command surface. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: wrote .agentplane/tasks/202605031625-886KZ6/acr.json with record_digest sha256:4ec21969b1415ec5abe6bdd4bf1efc217264e2aba0bf35bb23c3a62c7fcca8d6 and no warnings. Scope: generation engine. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: task/schema evidence consumed by generation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:11:58.601Z, excerpt_hash=sha256:2ceb94b3cfea62b4c5b0ebb0a0b522a20baa4c64299eea9a12cbb83e79af3e90
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR generation engine

Implement agentplane acr generate <task-id> using task records, Git range data, policy/config facts, verification summaries, evidence references, and safe defaults. Default write path is .agentplane/tasks/<task-id>/acr.json.

## Scope

- In scope: Implement agentplane acr generate <task-id> using task records, Git range data, policy/config facts, verification summaries, evidence references, and safe defaults. Default write path is .agentplane/tasks/<task-id>/acr.json.
- Out of scope: unrelated refactors not required for "ACR generation engine".

## Plan

Plan: (1) Implement ACR generation as a usecase over task state, Git state, config/policy facts, and verification summaries. (2) Default writes target .agentplane/tasks/<task-id>/acr.json; stdout/out remain supported for export. (3) Preserve work_commit as the implementation commit, never as a self-referential evidence commit. (4) Reject overwrite unless refresh is explicit. Verify with generation tests and a local command smoke.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/acr packages/core/src/tasks`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane acr generate --help`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:21:00.745Z — VERIFY — ok

By: CODER

Note: Command: agentplane acr generate --help. Result: pass. Evidence: help lists work-commit/base-commit/out/write/stdout/refresh/json options. Scope: generation command surface. Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: wrote .agentplane/tasks/202605031625-886KZ6/acr.json with record_digest sha256:4ec21969b1415ec5abe6bdd4bf1efc217264e2aba0bf35bb23c3a62c7fcca8d6 and no warnings. Scope: generation engine. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: task/schema evidence consumed by generation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:11:58.601Z, excerpt_hash=sha256:2ceb94b3cfea62b4c5b0ebb0a0b522a20baa4c64299eea9a12cbb83e79af3e90

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
