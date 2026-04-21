---
id: "202604210859-2R83M2"
title: "Split Redmine backend runtime responsibilities"
result_summary: "Split Redmine backend runtime responsibilities without changing backend interface."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:40:13.795Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:47:09.503Z"
  updated_by: "CODER"
  note: "Verified: split Redmine backend runtime into context, state, operations, and methods modules; typecheck, targeted lint/format, and backend-critical tests pass."
commit:
  hash: "7bd4ba73cff118a6c270af6310d8896aba794d33"
  message: "✅ 2R83M2 code: done"
comments:
  -
    author: "CODER"
    body: "Start: split Redmine backend runtime responsibilities into mapping, request/client, and cache/state modules while preserving behavior."
  -
    author: "CODER"
    body: "Verified: split Redmine backend runtime into context, state, operations, and methods modules; typecheck, targeted lint/format, backend-critical tests, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-21T10:40:14.223Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split Redmine backend runtime responsibilities into mapping, request/client, and cache/state modules while preserving behavior."
  -
    type: "verify"
    at: "2026-04-21T10:47:09.503Z"
    author: "CODER"
    state: "ok"
    note: "Verified: split Redmine backend runtime into context, state, operations, and methods modules; typecheck, targeted lint/format, and backend-critical tests pass."
  -
    type: "status"
    at: "2026-04-21T10:48:46.688Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split Redmine backend runtime into context, state, operations, and methods modules; typecheck, targeted lint/format, backend-critical tests, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-21T10:48:46.688Z"
doc_updated_by: "CODER"
description: "Decompose Redmine backend runtime into mapping, client-call, and cache-management modules without changing backend behavior."
sections:
  Summary: "Reduce the Redmine backend runtime hotspot by separating data mapping, request/client operations, and cache/state handling."
  Scope: "In scope: Redmine backend runtime files and direct backend tests. Out of scope: Redmine API feature changes and backend registry redesign."
  Plan: |-
    1. Identify cohesive sections in backend-runtime.ts.
    2. Extract mapping helpers, client calls, and cache management into owned modules.
    3. Preserve public exports and backend registry integration.
    4. Run Redmine backend tests.
  Verify Steps: |-
    - backend-runtime.ts is smaller with clear delegated modules.
    - Redmine backend tests pass.
    - No task backend interface changes.
  Verification: |-
    - `Command`: `agentplane task verify-show 202604210859-2R83M2`
      `Result`: pass
      `Evidence`: declared acceptance: runtime smaller/delegated, Redmine backend tests pass, backend interface unchanged.
      `Scope`: task verification contract.
    - `Command`: `bun run typecheck`
      `Result`: pass
      `Evidence`: `tsc -b` completed with exit code 0.
      `Scope`: TypeScript project references across the workspace, including Redmine runtime exports.
    - `Command`: `bunx eslint packages/agentplane/src/backends/task-backend/redmine/backend-runtime.ts packages/agentplane/src/backends/task-backend/redmine/runtime-context.ts packages/agentplane/src/backends/task-backend/redmine/runtime-state.ts packages/agentplane/src/backends/task-backend/redmine/runtime-operations.ts packages/agentplane/src/backends/task-backend/redmine/runtime-methods.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts`
      `Result`: pass
      `Evidence`: ESLint completed with exit code 0.
      `Scope`: changed Redmine runtime/mapping source files.
    - `Command`: `bunx prettier --check packages/agentplane/src/backends/task-backend/redmine/backend-runtime.ts packages/agentplane/src/backends/task-backend/redmine/runtime-context.ts packages/agentplane/src/backends/task-backend/redmine/runtime-state.ts packages/agentplane/src/backends/task-backend/redmine/runtime-operations.ts packages/agentplane/src/backends/task-backend/redmine/runtime-methods.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts`
      `Result`: pass
      `Evidence`: `All matched files use Prettier code style!`
      `Scope`: changed Redmine runtime/mapping source files.
    - `Command`: `bun run test:project -- backend-critical`
      `Result`: pass
      `Evidence`: 19 files passed, 176 tests passed.
      `Scope`: direct backend-critical suite, including Redmine cache/docs/mapping/remote/write tests.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:47:09.503Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: split Redmine backend runtime into context, state, operations, and methods modules; typecheck, targeted lint/format, and backend-critical tests pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:47:04.637Z, excerpt_hash=sha256:d1fe29c69f65bb6e9c573059b93f53d5b6ac87d5aac42e6840d998486dc40edc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert extracted modules and restore previous runtime file."
  Findings: |-
    - Split `backend-runtime.ts` from 537 lines to a 30-line facade while preserving the existing `./redmine/backend-runtime.js` export surface used by `RedmineBackend`.
    - Added focused runtime modules: `runtime-context.ts` for context assembly, `runtime-state.ts` for cache/doc/revision state helpers, `runtime-operations.ts` for Redmine request/mapping/comment/diff operations, and `runtime-methods.ts` for prototype method binding.
    - Adjusted Redmine mapping so incoming legacy `doc_version=2` is normalized to the current default `DOC_VERSION=3` before local cache writes; this keeps Redmine pull compatible with the current task README schema without touching schema files.
    - No backend interface change: `RedmineBackend` still imports from `./redmine/backend-runtime.js`, and `TaskBackend` capabilities/method signatures remain unchanged.
    - Residual risk: this is a structural split around dynamic prototype assignment (`Object.assign`), so regressions would most likely appear in helper binding or context wiring; backend-critical coverage passed for cache/docs/mapping/remote/write paths.
id_source: "generated"
---
## Summary

Reduce the Redmine backend runtime hotspot by separating data mapping, request/client operations, and cache/state handling.

## Scope

In scope: Redmine backend runtime files and direct backend tests. Out of scope: Redmine API feature changes and backend registry redesign.

## Plan

1. Identify cohesive sections in backend-runtime.ts.
2. Extract mapping helpers, client calls, and cache management into owned modules.
3. Preserve public exports and backend registry integration.
4. Run Redmine backend tests.

## Verify Steps

- backend-runtime.ts is smaller with clear delegated modules.
- Redmine backend tests pass.
- No task backend interface changes.

## Verification

- `Command`: `agentplane task verify-show 202604210859-2R83M2`
  `Result`: pass
  `Evidence`: declared acceptance: runtime smaller/delegated, Redmine backend tests pass, backend interface unchanged.
  `Scope`: task verification contract.
- `Command`: `bun run typecheck`
  `Result`: pass
  `Evidence`: `tsc -b` completed with exit code 0.
  `Scope`: TypeScript project references across the workspace, including Redmine runtime exports.
- `Command`: `bunx eslint packages/agentplane/src/backends/task-backend/redmine/backend-runtime.ts packages/agentplane/src/backends/task-backend/redmine/runtime-context.ts packages/agentplane/src/backends/task-backend/redmine/runtime-state.ts packages/agentplane/src/backends/task-backend/redmine/runtime-operations.ts packages/agentplane/src/backends/task-backend/redmine/runtime-methods.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts`
  `Result`: pass
  `Evidence`: ESLint completed with exit code 0.
  `Scope`: changed Redmine runtime/mapping source files.
- `Command`: `bunx prettier --check packages/agentplane/src/backends/task-backend/redmine/backend-runtime.ts packages/agentplane/src/backends/task-backend/redmine/runtime-context.ts packages/agentplane/src/backends/task-backend/redmine/runtime-state.ts packages/agentplane/src/backends/task-backend/redmine/runtime-operations.ts packages/agentplane/src/backends/task-backend/redmine/runtime-methods.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts`
  `Result`: pass
  `Evidence`: `All matched files use Prettier code style!`
  `Scope`: changed Redmine runtime/mapping source files.
- `Command`: `bun run test:project -- backend-critical`
  `Result`: pass
  `Evidence`: 19 files passed, 176 tests passed.
  `Scope`: direct backend-critical suite, including Redmine cache/docs/mapping/remote/write tests.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:47:09.503Z — VERIFY — ok

By: CODER

Note: Verified: split Redmine backend runtime into context, state, operations, and methods modules; typecheck, targeted lint/format, and backend-critical tests pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:47:04.637Z, excerpt_hash=sha256:d1fe29c69f65bb6e9c573059b93f53d5b6ac87d5aac42e6840d998486dc40edc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert extracted modules and restore previous runtime file.

## Findings

- Split `backend-runtime.ts` from 537 lines to a 30-line facade while preserving the existing `./redmine/backend-runtime.js` export surface used by `RedmineBackend`.
- Added focused runtime modules: `runtime-context.ts` for context assembly, `runtime-state.ts` for cache/doc/revision state helpers, `runtime-operations.ts` for Redmine request/mapping/comment/diff operations, and `runtime-methods.ts` for prototype method binding.
- Adjusted Redmine mapping so incoming legacy `doc_version=2` is normalized to the current default `DOC_VERSION=3` before local cache writes; this keeps Redmine pull compatible with the current task README schema without touching schema files.
- No backend interface change: `RedmineBackend` still imports from `./redmine/backend-runtime.js`, and `TaskBackend` capabilities/method signatures remain unchanged.
- Residual risk: this is a structural split around dynamic prototype assignment (`Object.assign`), so regressions would most likely appear in helper binding or context wiring; backend-critical coverage passed for cache/docs/mapping/remote/write paths.
