---
id: "202603140600-1KHV10"
title: "Add guarded Redmine writes against remote task revision"
result_summary: "Added optimistic expectedRevision guards for Redmine write paths, aligned capability flags with canonical_state support, and covered remote/offline guard behavior in redmine/load regressions."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
depends_on:
  - "202603140600-7VH49J"
  - "202603140600-R0JPWV"
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T06:28:26.887Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T06:34:01.350Z"
  updated_by: "CODER"
  note: "Verified guarded Redmine writes with vitest on redmine/load suites, eslint on backend/test files, and both package builds. canonical_state now gates revision-guard capability and stale expectedRevision writes fail before remote requests."
commit:
  hash: "be5d08590f0055dd00f2a4289cf302884410b98e"
  message: "🛡️ 1KHV10 task: guard Redmine writes by expected revision"
comments:
  -
    author: "CODER"
    body: "Start: implement optimistic Redmine expectedRevision guards and capability reporting around canonical_state-backed remote revisions."
  -
    author: "CODER"
    body: "Verified: Redmine guarded writes now reject stale expectedRevision only when canonical_state-backed revisions are configured, and capability reporting reflects that contract."
events:
  -
    type: "status"
    at: "2026-03-14T06:28:31.523Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement optimistic Redmine expectedRevision guards and capability reporting around canonical_state-backed remote revisions."
  -
    type: "verify"
    at: "2026-03-14T06:34:01.350Z"
    author: "CODER"
    state: "ok"
    note: "Verified guarded Redmine writes with vitest on redmine/load suites, eslint on backend/test files, and both package builds. canonical_state now gates revision-guard capability and stale expectedRevision writes fail before remote requests."
  -
    type: "status"
    at: "2026-03-14T06:34:34.161Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Redmine guarded writes now reject stale expectedRevision only when canonical_state-backed revisions are configured, and capability reporting reflects that contract."
doc_version: 3
doc_updated_at: "2026-03-14T06:34:34.165Z"
doc_updated_by: "CODER"
description: "Use the remote structured state revision to reject stale Redmine writes and add regression coverage for sync and write conflict behavior."
sections:
  Summary: |-
    Add guarded Redmine writes against remote task revision
    
    Use the remote structured state revision to reject stale Redmine writes and add regression coverage for sync and write conflict behavior.
  Scope: |-
    - In scope: Use the remote structured state revision to reject stale Redmine writes and add regression coverage for sync and write conflict behavior.
    - Out of scope: unrelated refactors not required for "Add guarded Redmine writes against remote task revision".
  Plan: |-
    1. Make Redmine capability flags reflect whether canonical_state-backed revision storage is configured, rather than advertising guarded writes unconditionally.
    2. Enforce expectedRevision checks in writeTask, setTaskDoc, and touchTaskDocMetadata (including offline-cache fallback) by comparing against the current remote or cached revision before writing.
    3. Add focused regressions for stale revision rejects and capability reporting so Redmine no longer accepts obviously stale writes silently.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: Redmine regressions prove stale expectedRevision writes are rejected and capability reporting matches canonical_state configuration.
    2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: lint passes on the guarded-write implementation and touched tests.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages still build after the guarded-write changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T06:34:01.350Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified guarded Redmine writes with vitest on redmine/load suites, eslint on backend/test files, and both package builds. canonical_state now gates revision-guard capability and stale expectedRevision writes fail before remote requests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:28:31.527Z, excerpt_hash=sha256:e8b85d6ca7993400ef2cf92a7297b782939a3c7d3fa873b0dfd31a312e377537
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add guarded Redmine writes against remote task revision

Use the remote structured state revision to reject stale Redmine writes and add regression coverage for sync and write conflict behavior.

## Scope

- In scope: Use the remote structured state revision to reject stale Redmine writes and add regression coverage for sync and write conflict behavior.
- Out of scope: unrelated refactors not required for "Add guarded Redmine writes against remote task revision".

## Plan

1. Make Redmine capability flags reflect whether canonical_state-backed revision storage is configured, rather than advertising guarded writes unconditionally.
2. Enforce expectedRevision checks in writeTask, setTaskDoc, and touchTaskDocMetadata (including offline-cache fallback) by comparing against the current remote or cached revision before writing.
3. Add focused regressions for stale revision rejects and capability reporting so Redmine no longer accepts obviously stale writes silently.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: Redmine regressions prove stale expectedRevision writes are rejected and capability reporting matches canonical_state configuration.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: lint passes on the guarded-write implementation and touched tests.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages still build after the guarded-write changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T06:34:01.350Z — VERIFY — ok

By: CODER

Note: Verified guarded Redmine writes with vitest on redmine/load suites, eslint on backend/test files, and both package builds. canonical_state now gates revision-guard capability and stale expectedRevision writes fail before remote requests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:28:31.527Z, excerpt_hash=sha256:e8b85d6ca7993400ef2cf92a7297b782939a3c7d3fa873b0dfd31a312e377537

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
