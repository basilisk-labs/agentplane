---
id: "202605031625-886KZ6"
title: "ACR v0.1 core schema contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202605031624-H1PV7F"
tags:
  - "code"
  - "schema"
verify:
  - "bun run schemas:check"
  - "bun test packages/core/src/tasks packages/core/src/schemas"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:12.695Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:34:21.039Z"
  updated_by: "CODER"
  note: "Command: final verification after formatting merged schema artifacts. Result: pass. Evidence: bun run schemas:check passed after Prettier formatting of packages/core and packages/spec config schemas; working tree clean before verification. Scope: current task branch head before push."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the ACR v0.1 core schema contract, generated schema renderer, synchronized schema artifacts, and focused schema tests without touching CLI command behavior yet."
events:
  -
    type: "status"
    at: "2026-05-03T16:32:47.484Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the ACR v0.1 core schema contract, generated schema renderer, synchronized schema artifacts, and focused schema tests without touching CLI command behavior yet."
  -
    type: "verify"
    at: "2026-05-03T16:41:42.045Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts in packages/spec and packages/core. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed, including ACR valid record and invalid top-level/path/digest cases. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: declared core task/schema test bucket through the repo Vitest runner. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts. Note: raw 'bun test packages/core/src/tasks packages/core/src/schemas' was attempted first and failed in existing task-store tests because Bun's vi shim lacks setSystemTime; the repo Vitest route for the same core bucket passed."
  -
    type: "verify"
    at: "2026-05-03T16:43:25.739Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: core task/schema bucket. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts."
  -
    type: "verify"
    at: "2026-05-03T17:22:31.258Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: ACR and config schemas. Command: bun run --filter=@agentplaneorg/core typecheck && build checked separately. Result: pass. Evidence: core typecheck/build exited 0. Scope: ACR schema exports. Command: bun run --filter=agentplane typecheck && build checked separately. Result: pass. Evidence: agentplane typecheck/build exited 0. Scope: ACR CLI and finish integration. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 75 tests passed. Scope: core task/schema bucket. Command: ACR CLI smokes generate/validate/check/explain/schema. Result: pass. Evidence: acr.json generated, validate/check ok=true, explain merge ready yes."
  -
    type: "verify"
    at: "2026-05-03T17:24:32.237Z"
    author: "CODER"
    state: "ok"
    note: "Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: refreshed task-local acr.json after implementation commit; digest sha256:836e5f483582c393caed74090dc9a9ee0fcc43aed8b08799e30819d1ff7cdbb7. Scope: final ACR evidence for the committed batch."
  -
    type: "verify"
    at: "2026-05-03T17:25:33.749Z"
    author: "CODER"
    state: "ok"
    note: "Command: final branch verification after ACR evidence commit. Result: pass. Evidence: ACR batch implementation commit 0e0995c9 and final ACR evidence commit 9d5ac328 are present on task branch; prior schema/typecheck/build/core tests/docs freshness/ACR CLI smokes passed. Scope: final primary task verification before PR publication."
  -
    type: "verify"
    at: "2026-05-03T17:31:46.271Z"
    author: "CODER"
    state: "ok"
    note: "Command: post-merge verification after syncing origin/main. Result: pass. Evidence: bun run schemas:check, bun run docs:cli:check, bun run --filter=agentplane typecheck, bun run --filter=@agentplaneorg/core typecheck, and framework:dev:bootstrap all passed after resolving config schema merge conflicts. Scope: ACR batch rebased/merged onto current main."
  -
    type: "verify"
    at: "2026-05-03T17:34:21.039Z"
    author: "CODER"
    state: "ok"
    note: "Command: final verification after formatting merged schema artifacts. Result: pass. Evidence: bun run schemas:check passed after Prettier formatting of packages/core and packages/spec config schemas; working tree clean before verification. Scope: current task branch head before push."
doc_version: 3
doc_updated_at: "2026-05-03T17:34:21.060Z"
doc_updated_by: "CODER"
description: "Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state."
sections:
  Summary: |-
    ACR v0.1 core schema contract
    
    Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.
  Scope: |-
    - In scope: Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.
    - Out of scope: unrelated refactors not required for "ACR v0.1 core schema contract".
  Plan: "Plan: (1) Add ACR v0.1 domain schema in core using existing Zod/JSON Schema patterns. (2) Export validation/render helpers through packages/core/src/schemas. (3) Sync generated schema artifacts into packages/spec and packages/core. (4) Add schema tests for required fields, unknown top-level fields, repository-relative paths, digest format, and privacy-safe defaults. Verify with schema sync/check and targeted core tests."
  Verify Steps: |-
    1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun test packages/core/src/tasks packages/core/src/schemas`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T16:41:42.045Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts in packages/spec and packages/core. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed, including ACR valid record and invalid top-level/path/digest cases. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: declared core task/schema test bucket through the repo Vitest runner. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts. Note: raw 'bun test packages/core/src/tasks packages/core/src/schemas' was attempted first and failed in existing task-store tests because Bun's vi shim lacks setSystemTime; the repo Vitest route for the same core bucket passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:32:47.484Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    ### 2026-05-03T16:43:25.739Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: core task/schema bucket. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:41:42.259Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    ### 2026-05-03T17:22:31.258Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: ACR and config schemas. Command: bun run --filter=@agentplaneorg/core typecheck && build checked separately. Result: pass. Evidence: core typecheck/build exited 0. Scope: ACR schema exports. Command: bun run --filter=agentplane typecheck && build checked separately. Result: pass. Evidence: agentplane typecheck/build exited 0. Scope: ACR CLI and finish integration. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 75 tests passed. Scope: core task/schema bucket. Command: ACR CLI smokes generate/validate/check/explain/schema. Result: pass. Evidence: acr.json generated, validate/check ok=true, explain merge ready yes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:43:25.757Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    ### 2026-05-03T17:24:32.237Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: refreshed task-local acr.json after implementation commit; digest sha256:836e5f483582c393caed74090dc9a9ee0fcc43aed8b08799e30819d1ff7cdbb7. Scope: final ACR evidence for the committed batch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:22:31.297Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    ### 2026-05-03T17:25:33.749Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: final branch verification after ACR evidence commit. Result: pass. Evidence: ACR batch implementation commit 0e0995c9 and final ACR evidence commit 9d5ac328 are present on task branch; prior schema/typecheck/build/core tests/docs freshness/ACR CLI smokes passed. Scope: final primary task verification before PR publication.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:24:32.278Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    ### 2026-05-03T17:31:46.271Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: post-merge verification after syncing origin/main. Result: pass. Evidence: bun run schemas:check, bun run docs:cli:check, bun run --filter=agentplane typecheck, bun run --filter=@agentplaneorg/core typecheck, and framework:dev:bootstrap all passed after resolving config schema merge conflicts. Scope: ACR batch rebased/merged onto current main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:25:33.770Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    ### 2026-05-03T17:34:21.039Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: final verification after formatting merged schema artifacts. Result: pass. Evidence: bun run schemas:check passed after Prettier formatting of packages/core and packages/spec config schemas; working tree clean before verification. Scope: current task branch head before push.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:31:46.289Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR v0.1 core schema contract

Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.

## Scope

- In scope: Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.
- Out of scope: unrelated refactors not required for "ACR v0.1 core schema contract".

## Plan

Plan: (1) Add ACR v0.1 domain schema in core using existing Zod/JSON Schema patterns. (2) Export validation/render helpers through packages/core/src/schemas. (3) Sync generated schema artifacts into packages/spec and packages/core. (4) Add schema tests for required fields, unknown top-level fields, repository-relative paths, digest format, and privacy-safe defaults. Verify with schema sync/check and targeted core tests.

## Verify Steps

1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun test packages/core/src/tasks packages/core/src/schemas`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T16:41:42.045Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts in packages/spec and packages/core. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed, including ACR valid record and invalid top-level/path/digest cases. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: declared core task/schema test bucket through the repo Vitest runner. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts. Note: raw 'bun test packages/core/src/tasks packages/core/src/schemas' was attempted first and failed in existing task-store tests because Bun's vi shim lacks setSystemTime; the repo Vitest route for the same core bucket passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:32:47.484Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

### 2026-05-03T16:43:25.739Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: core task/schema bucket. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:41:42.259Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

### 2026-05-03T17:22:31.258Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: ACR and config schemas. Command: bun run --filter=@agentplaneorg/core typecheck && build checked separately. Result: pass. Evidence: core typecheck/build exited 0. Scope: ACR schema exports. Command: bun run --filter=agentplane typecheck && build checked separately. Result: pass. Evidence: agentplane typecheck/build exited 0. Scope: ACR CLI and finish integration. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 75 tests passed. Scope: core task/schema bucket. Command: ACR CLI smokes generate/validate/check/explain/schema. Result: pass. Evidence: acr.json generated, validate/check ok=true, explain merge ready yes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:43:25.757Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

### 2026-05-03T17:24:32.237Z — VERIFY — ok

By: CODER

Note: Command: node packages/agentplane/dist/cli.js acr generate 202605031625-886KZ6 --work-commit HEAD --write --refresh --json. Result: pass. Evidence: refreshed task-local acr.json after implementation commit; digest sha256:836e5f483582c393caed74090dc9a9ee0fcc43aed8b08799e30819d1ff7cdbb7. Scope: final ACR evidence for the committed batch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:22:31.297Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

### 2026-05-03T17:25:33.749Z — VERIFY — ok

By: CODER

Note: Command: final branch verification after ACR evidence commit. Result: pass. Evidence: ACR batch implementation commit 0e0995c9 and final ACR evidence commit 9d5ac328 are present on task branch; prior schema/typecheck/build/core tests/docs freshness/ACR CLI smokes passed. Scope: final primary task verification before PR publication.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:24:32.278Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

### 2026-05-03T17:31:46.271Z — VERIFY — ok

By: CODER

Note: Command: post-merge verification after syncing origin/main. Result: pass. Evidence: bun run schemas:check, bun run docs:cli:check, bun run --filter=agentplane typecheck, bun run --filter=@agentplaneorg/core typecheck, and framework:dev:bootstrap all passed after resolving config schema merge conflicts. Scope: ACR batch rebased/merged onto current main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:25:33.770Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

### 2026-05-03T17:34:21.039Z — VERIFY — ok

By: CODER

Note: Command: final verification after formatting merged schema artifacts. Result: pass. Evidence: bun run schemas:check passed after Prettier formatting of packages/core and packages/spec config schemas; working tree clean before verification. Scope: current task branch head before push.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:31:46.289Z, excerpt_hash=sha256:a5ac24bc830ebeee219d3ee957b3fec45f3b6164604fed986291e63b486783a2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
