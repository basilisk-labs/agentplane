---
id: "202603140600-7VH49J"
title: "Round-trip Redmine revision and canonical sections"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on:
  - "202603140600-APGANH"
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T06:16:50.437Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T06:23:11.477Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 1 test file passed; 35 tests passed, including canonical_state pull reconstruction, legacy doc fallback, and remote setTaskDoc revision/sections regression coverage.
    Scope: Redmine revision and canonical sections round-trip through mapping, sync, and doc-write paths.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
    Result: pass
    Evidence: eslint exited cleanly with no findings.
    Scope: Structured-state helpers, Redmine mapping, backend write paths, and touched regressions.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited 0 after the Redmine round-trip changes.
    Scope: Compile-time integrity for the updated Redmine backend implementation.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement Redmine revision and canonical section round-trip through canonical_state on both read and write paths."
events:
  -
    type: "status"
    at: "2026-03-14T06:17:02.309Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement Redmine revision and canonical section round-trip through canonical_state on both read and write paths."
  -
    type: "verify"
    at: "2026-03-14T06:23:11.477Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 1 test file passed; 35 tests passed, including canonical_state pull reconstruction, legacy doc fallback, and remote setTaskDoc revision/sections regression coverage.
      Scope: Redmine revision and canonical sections round-trip through mapping, sync, and doc-write paths.
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
      Result: pass
      Evidence: eslint exited cleanly with no findings.
      Scope: Structured-state helpers, Redmine mapping, backend write paths, and touched regressions.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited 0 after the Redmine round-trip changes.
      Scope: Compile-time integrity for the updated Redmine backend implementation.
doc_version: 3
doc_updated_at: "2026-03-14T06:23:11.488Z"
doc_updated_by: "CODER"
description: "Teach Redmine mapping and sync paths to persist revision and canonical sections through the new structured state field while keeping doc as a generated projection."
sections:
  Summary: |-
    Round-trip Redmine revision and canonical sections
    
    Teach Redmine mapping and sync paths to persist revision and canonical sections through the new structured state field while keeping doc as a generated projection.
  Scope: |-
    - In scope: Teach Redmine mapping and sync paths to persist revision and canonical sections through the new structured state field while keeping doc as a generated projection.
    - Out of scope: unrelated refactors not required for "Round-trip Redmine revision and canonical sections".
  Plan: |-
    1. Implement the change for "Round-trip Redmine revision and canonical sections".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: Redmine mapping/doc-write regressions prove that revision and canonical sections survive payload build, remote pull, and doc updates.
    2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: lint passes on the Redmine structured-state read/write seam.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages still build after the Redmine round-trip changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T06:23:11.477Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 1 test file passed; 35 tests passed, including canonical_state pull reconstruction, legacy doc fallback, and remote setTaskDoc revision/sections regression coverage.
    Scope: Redmine revision and canonical sections round-trip through mapping, sync, and doc-write paths.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
    Result: pass
    Evidence: eslint exited cleanly with no findings.
    Scope: Structured-state helpers, Redmine mapping, backend write paths, and touched regressions.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited 0 after the Redmine round-trip changes.
    Scope: Compile-time integrity for the updated Redmine backend implementation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:17:02.313Z, excerpt_hash=sha256:98367312126799622512c106aece189bc7f150043e27f295773f6a36103d6714
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Round-trip Redmine revision and canonical sections

Teach Redmine mapping and sync paths to persist revision and canonical sections through the new structured state field while keeping doc as a generated projection.

## Scope

- In scope: Teach Redmine mapping and sync paths to persist revision and canonical sections through the new structured state field while keeping doc as a generated projection.
- Out of scope: unrelated refactors not required for "Round-trip Redmine revision and canonical sections".

## Plan

1. Implement the change for "Round-trip Redmine revision and canonical sections".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: Redmine mapping/doc-write regressions prove that revision and canonical sections survive payload build, remote pull, and doc updates.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: lint passes on the Redmine structured-state read/write seam.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages still build after the Redmine round-trip changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T06:23:11.477Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 1 test file passed; 35 tests passed, including canonical_state pull reconstruction, legacy doc fallback, and remote setTaskDoc revision/sections regression coverage.
Scope: Redmine revision and canonical sections round-trip through mapping, sync, and doc-write paths.

Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
Result: pass
Evidence: eslint exited cleanly with no findings.
Scope: Structured-state helpers, Redmine mapping, backend write paths, and touched regressions.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited 0 after the Redmine round-trip changes.
Scope: Compile-time integrity for the updated Redmine backend implementation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:17:02.313Z, excerpt_hash=sha256:98367312126799622512c106aece189bc7f150043e27f295773f6a36103d6714

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
