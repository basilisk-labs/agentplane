---
id: "202602091644-5RH64E"
title: "Ports/adapters: FS/Git/TaskBackend ports"
result_summary: "Ports/adapters foundation"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "architecture"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:49:57.390Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. Added minimal ports (FS/Git/TaskBackend/Clock) and adapters without changing existing command behavior."
commit:
  hash: "d2f0956e75c44113580777d8b336efd8e3cae0ee"
  message: "✅ 5RH64E architecture: add ports and adapters"
comments:
  -
    author: "CODER"
    body: "Start: introduce minimal ports and adapters (FS/Git/TaskBackend/Clock) as the foundation for usecase-only command implementations."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Introduced ports interfaces and adapter implementations (Node FS, GitContext, task backend wrapper, system clock) to enable incremental migration to usecase-only command implementations."
events:
  -
    type: "status"
    at: "2026-02-09T16:46:57.492Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce minimal ports and adapters (FS/Git/TaskBackend/Clock) as the foundation for usecase-only command implementations."
  -
    type: "verify"
    at: "2026-02-09T16:49:57.390Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. Added minimal ports (FS/Git/TaskBackend/Clock) and adapters without changing existing command behavior."
  -
    type: "status"
    at: "2026-02-09T16:49:57.539Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Introduced ports interfaces and adapter implementations (Node FS, GitContext, task backend wrapper, system clock) to enable incremental migration to usecase-only command implementations."
doc_version: 2
doc_updated_at: "2026-02-09T16:49:57.539Z"
doc_updated_by: "CODER"
description: "Introduce minimal ports (FileSystemPort, GitPort, TaskBackendPort, ClockPort) and adapters. Enforce no fs/path/git imports outside adapters."
id_source: "generated"
---
## Summary

Introduce minimal ports (FS/Git/TaskBackend/Clock) and adapters, then refactor a small slice of the codebase so usecases depend only on ports.

## Scope

packages/agentplane/src/ports/**, packages/agentplane/src/adapters/**, minimal wiring types used by usecases.

## Plan

1) Add ports interfaces: FileSystemPort, GitPort, TaskBackendPort, ClockPort.\n2) Add local adapters for Node fs and existing GitContext/task backend.\n3) Add a tiny adapter composition helper (buildAdapters) for tests and commands.\n4) Add minimal unit tests for adapters where practical.\n5) Run bun run lint and bun run test:full.

## Risks

Risk: type/ownership confusion between existing CommandContext and new ports; mitigate by using ports only in new usecases and leaving existing commands untouched.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:49:57.390Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. Added minimal ports (FS/Git/TaskBackend/Clock) and adapters without changing existing command behavior.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:46:57.492Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) adding ports/adapters; no existing command behavior should change in this task.

## Verify Steps

- bun run lint\n- bun run test:full
