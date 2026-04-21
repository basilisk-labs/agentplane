---
id: "202604211313-X8R4TK"
title: "Move config IO behind a flat public index"
result_summary: "Moved loadConfig/saveConfig and atomic write behavior into config/io.ts, moved validation/deprecated-key sanitization helpers into config/validation.ts, and preserved the existing config.ts package-facing export surface."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604211312-AGQKVA"
tags:
  - "code"
  - "config"
  - "refactor"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/commands/config*.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:03.185Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T17:32:45.248Z"
  updated_by: "CODER"
  note: "Verified config IO split. Checks: bun run typecheck passed; bunx vitest run packages/core/src/config/config.test.ts 'packages/agentplane/src/commands/config*.test.ts' --pool=forks --maxWorkers 4 passed (18 tests; no agentplane config*.test.ts files matched); bun run knip:check passed; bun run lint:core passed; bun run format:check passed; git diff --check passed."
commit:
  hash: "21defc06afd6b98a5ffffe71079fea5c7eecc959"
  message: "♻️ X8R4TK config: split IO boundary"
comments:
  -
    author: "CODER"
    body: "Start: split config validation and IO into responsibility-based modules while preserving the existing public config compatibility surface."
  -
    author: "CODER"
    body: "Verified: config IO split. Checks: bun run typecheck; bunx vitest run packages/core/src/config/config.test.ts 'packages/agentplane/src/commands/config*.test.ts' --pool=forks --maxWorkers 4; bun run knip:check; bun run lint:core; bun run format:check; git diff --check."
events:
  -
    type: "status"
    at: "2026-04-21T17:30:28.026Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split config validation and IO into responsibility-based modules while preserving the existing public config compatibility surface."
  -
    type: "verify"
    at: "2026-04-21T17:32:45.248Z"
    author: "CODER"
    state: "ok"
    note: "Verified config IO split. Checks: bun run typecheck passed; bunx vitest run packages/core/src/config/config.test.ts 'packages/agentplane/src/commands/config*.test.ts' --pool=forks --maxWorkers 4 passed (18 tests; no agentplane config*.test.ts files matched); bun run knip:check passed; bun run lint:core passed; bun run format:check passed; git diff --check passed."
  -
    type: "status"
    at: "2026-04-21T17:33:11.866Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: config IO split. Checks: bun run typecheck; bunx vitest run packages/core/src/config/config.test.ts 'packages/agentplane/src/commands/config*.test.ts' --pool=forks --maxWorkers 4; bun run knip:check; bun run lint:core; bun run format:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T17:33:11.866Z"
doc_updated_by: "CODER"
description: "Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports."
sections:
  Summary: |-
    Move config IO behind a flat public index
    
    Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.
  Scope: |-
    - In scope: Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.
    - Out of scope: unrelated refactors not required for "Move config IO behind a flat public index".
  Plan: "Scope: make config module boundaries match responsibilities. Steps: 1. Move load/save logic out of the schema module path. 2. Update imports across core and agentplane. 3. Keep package-level exports backward-compatible unless a breaking removal is separately approved. 4. Verify command-level config behavior. Acceptance: config modules are responsibility-based and tests pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/commands/config*.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T17:32:45.248Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified config IO split. Checks: bun run typecheck passed; bunx vitest run packages/core/src/config/config.test.ts 'packages/agentplane/src/commands/config*.test.ts' --pool=forks --maxWorkers 4 passed (18 tests; no agentplane config*.test.ts files matched); bun run knip:check passed; bun run lint:core passed; bun run format:check passed; git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:30:28.035Z, excerpt_hash=sha256:4d23e49c0afa887b3cae8c75210701202c38a539113404dcd079746b82ca6e33
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move config IO behind a flat public index

Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.

## Scope

- In scope: Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.
- Out of scope: unrelated refactors not required for "Move config IO behind a flat public index".

## Plan

Scope: make config module boundaries match responsibilities. Steps: 1. Move load/save logic out of the schema module path. 2. Update imports across core and agentplane. 3. Keep package-level exports backward-compatible unless a breaking removal is separately approved. 4. Verify command-level config behavior. Acceptance: config modules are responsibility-based and tests pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/commands/config*.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T17:32:45.248Z — VERIFY — ok

By: CODER

Note: Verified config IO split. Checks: bun run typecheck passed; bunx vitest run packages/core/src/config/config.test.ts 'packages/agentplane/src/commands/config*.test.ts' --pool=forks --maxWorkers 4 passed (18 tests; no agentplane config*.test.ts files matched); bun run knip:check passed; bun run lint:core passed; bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:30:28.035Z, excerpt_hash=sha256:4d23e49c0afa887b3cae8c75210701202c38a539113404dcd079746b82ca6e33

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
