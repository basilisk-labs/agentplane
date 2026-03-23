---
id: "202603231722-SAMNE0"
title: "Sync config schema copies to unblock push"
result_summary: "Synced the canonical config schema with the shipped custom runner contract."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "schemas"
  - "push"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:24:07.141Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T17:25:42.908Z"
  updated_by: "CODER"
  note: |-
    Command: bun run schemas:check
    Result: pass
    Evidence: scripts/sync-schemas.mjs check reported `schemas OK`.
    Scope: canonical config schema parity between packages/spec and packages/core.
    
    Command: bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 3 test files passed, 33 tests passed; custom runner config and CLI task-run flows stayed green.
    Scope: runner config loading, custom adapter contract, and task-run CLI integration.
    
    Command: diff -u packages/spec/schemas/config.schema.json packages/core/schemas/config.schema.json
    Result: pass
    Evidence: no diff output after updating the canonical schema.
    Scope: synchronized schema mirror content for config.schema.json.
commit:
  hash: "1f37be63010615940fc237db83d56c573ce911e4"
  message: "✅ SAMNE0 code: done"
comments:
  -
    author: "CODER"
    body: "Start: inspect the canonical config schema, add the missing runner.custom contract to spec, sync the core mirror, verify the schema gate and then retry the blocked push."
  -
    author: "CODER"
    body: "Verified: added runner.custom to the canonical config schema, confirmed spec/core parity, and kept custom-runner config tests green so the pre-push schema-sync gate no longer blocks the branch."
events:
  -
    type: "status"
    at: "2026-03-23T17:24:12.964Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the canonical config schema, add the missing runner.custom contract to spec, sync the core mirror, verify the schema gate and then retry the blocked push."
  -
    type: "verify"
    at: "2026-03-23T17:25:42.908Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run schemas:check
      Result: pass
      Evidence: scripts/sync-schemas.mjs check reported `schemas OK`.
      Scope: canonical config schema parity between packages/spec and packages/core.
      
      Command: bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: 3 test files passed, 33 tests passed; custom runner config and CLI task-run flows stayed green.
      Scope: runner config loading, custom adapter contract, and task-run CLI integration.
      
      Command: diff -u packages/spec/schemas/config.schema.json packages/core/schemas/config.schema.json
      Result: pass
      Evidence: no diff output after updating the canonical schema.
      Scope: synchronized schema mirror content for config.schema.json.
  -
    type: "status"
    at: "2026-03-23T17:26:17.971Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added runner.custom to the canonical config schema, confirmed spec/core parity, and kept custom-runner config tests green so the pre-push schema-sync gate no longer blocks the branch."
doc_version: 3
doc_updated_at: "2026-03-23T17:26:17.972Z"
doc_updated_by: "CODER"
description: "Bring packages/core/schemas/config.schema.json back in sync with the canonical spec schema so pre-push CI passes and main can be pushed."
sections:
  Summary: |-
    Sync config schema copies to unblock push
    
    Bring packages/core/schemas/config.schema.json back in sync with the canonical spec schema so pre-push CI passes and main can be pushed.
  Scope: |-
    - In scope: Bring packages/core/schemas/config.schema.json back in sync with the canonical spec schema so pre-push CI passes and main can be pushed.
    - Out of scope: unrelated refactors not required for "Sync config schema copies to unblock push".
  Plan: |-
    1. Implement the change for "Sync config schema copies to unblock push".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run schemas:check`. Expected: it reports `schemas OK`.
    2. Run `bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: the custom runner config contract still passes in touched scope.
    3. Run `git diff -- packages/spec/schemas/config.schema.json packages/core/schemas/config.schema.json`. Expected: only the intended schema additions are present and the two files are synchronized after `bun run schemas:sync`.
    4. Retry `git push origin main`. Expected: the previous schema-sync gate no longer blocks push.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T17:25:42.908Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run schemas:check
    Result: pass
    Evidence: scripts/sync-schemas.mjs check reported `schemas OK`.
    Scope: canonical config schema parity between packages/spec and packages/core.
    
    Command: bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 3 test files passed, 33 tests passed; custom runner config and CLI task-run flows stayed green.
    Scope: runner config loading, custom adapter contract, and task-run CLI integration.
    
    Command: diff -u packages/spec/schemas/config.schema.json packages/core/schemas/config.schema.json
    Result: pass
    Evidence: no diff output after updating the canonical schema.
    Scope: synchronized schema mirror content for config.schema.json.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:24:12.966Z, excerpt_hash=sha256:60b8a88c8a9bfb4a1a1232f50ae5b41f4d44a0ed72b289431541da46b7cb4944
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Sync config schema copies to unblock push

Bring packages/core/schemas/config.schema.json back in sync with the canonical spec schema so pre-push CI passes and main can be pushed.

## Scope

- In scope: Bring packages/core/schemas/config.schema.json back in sync with the canonical spec schema so pre-push CI passes and main can be pushed.
- Out of scope: unrelated refactors not required for "Sync config schema copies to unblock push".

## Plan

1. Implement the change for "Sync config schema copies to unblock push".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run schemas:check`. Expected: it reports `schemas OK`.
2. Run `bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: the custom runner config contract still passes in touched scope.
3. Run `git diff -- packages/spec/schemas/config.schema.json packages/core/schemas/config.schema.json`. Expected: only the intended schema additions are present and the two files are synchronized after `bun run schemas:sync`.
4. Retry `git push origin main`. Expected: the previous schema-sync gate no longer blocks push.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T17:25:42.908Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check
Result: pass
Evidence: scripts/sync-schemas.mjs check reported `schemas OK`.
Scope: canonical config schema parity between packages/spec and packages/core.

Command: bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
Result: pass
Evidence: 3 test files passed, 33 tests passed; custom runner config and CLI task-run flows stayed green.
Scope: runner config loading, custom adapter contract, and task-run CLI integration.

Command: diff -u packages/spec/schemas/config.schema.json packages/core/schemas/config.schema.json
Result: pass
Evidence: no diff output after updating the canonical schema.
Scope: synchronized schema mirror content for config.schema.json.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:24:12.966Z, excerpt_hash=sha256:60b8a88c8a9bfb4a1a1232f50ae5b41f4d44a0ed72b289431541da46b7cb4944

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
