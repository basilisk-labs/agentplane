---
id: "202603140600-R0JPWV"
title: "Round-trip Redmine lifecycle metadata through structured state"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
depends_on:
  - "202603140600-APGANH"
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T06:25:22.002Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T06:26:38.787Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 1 test file passed; 35 tests passed, including canonical_state lifecycle metadata reconstruction on pull and preservation through remote setTaskDoc updates.
    Scope: Redmine plan_approval, verification, and events round-trip through structured state.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
    Result: pass
    Evidence: eslint exited cleanly with no findings.
    Scope: Structured-state lifecycle metadata read/write seams and touched regressions.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited 0 after the lifecycle metadata changes.
    Scope: Compile-time integrity for the updated Redmine backend.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement Redmine lifecycle metadata round-trip so canonical_state keeps plan approval, verification, and events intact through pull and doc updates."
events:
  -
    type: "status"
    at: "2026-03-14T06:25:28.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement Redmine lifecycle metadata round-trip so canonical_state keeps plan approval, verification, and events intact through pull and doc updates."
  -
    type: "verify"
    at: "2026-03-14T06:26:38.787Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 1 test file passed; 35 tests passed, including canonical_state lifecycle metadata reconstruction on pull and preservation through remote setTaskDoc updates.
      Scope: Redmine plan_approval, verification, and events round-trip through structured state.
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
      Result: pass
      Evidence: eslint exited cleanly with no findings.
      Scope: Structured-state lifecycle metadata read/write seams and touched regressions.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited 0 after the lifecycle metadata changes.
      Scope: Compile-time integrity for the updated Redmine backend.
doc_version: 3
doc_updated_at: "2026-03-14T06:26:38.798Z"
doc_updated_by: "CODER"
description: "Persist plan_approval, verification, and events through Redmine structured state so pull/push no longer drops canonical lifecycle metadata."
sections:
  Summary: |-
    Round-trip Redmine lifecycle metadata through structured state
    
    Persist plan_approval, verification, and events through Redmine structured state so pull/push no longer drops canonical lifecycle metadata.
  Scope: |-
    - In scope: Persist plan_approval, verification, and events through Redmine structured state so pull/push no longer drops canonical lifecycle metadata.
    - Out of scope: unrelated refactors not required for "Round-trip Redmine lifecycle metadata through structured state".
  Plan: |-
    1. Teach Redmine issueToTask to hydrate plan_approval, verification, and events from canonical_state so pull/projection rebuilds keep canonical lifecycle metadata.
    2. Preserve that lifecycle metadata when setTaskDoc or writeTask updates sections/revision, instead of dropping it during structured state rewrites.
    3. Add focused regressions proving lifecycle metadata survives payload build, pull reconstruction, and remote doc updates.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: Redmine regressions prove that plan_approval, verification, and events survive payload build, remote pull, and doc updates.
    2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: lint passes on the structured-state lifecycle metadata path.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages still build after the Redmine lifecycle metadata changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T06:26:38.787Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 1 test file passed; 35 tests passed, including canonical_state lifecycle metadata reconstruction on pull and preservation through remote setTaskDoc updates.
    Scope: Redmine plan_approval, verification, and events round-trip through structured state.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
    Result: pass
    Evidence: eslint exited cleanly with no findings.
    Scope: Structured-state lifecycle metadata read/write seams and touched regressions.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited 0 after the lifecycle metadata changes.
    Scope: Compile-time integrity for the updated Redmine backend.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:25:28.411Z, excerpt_hash=sha256:9273da0f9c63b3c28aca4b44fb33f5fb3c24037cb1e236c6231b6db3e4dde6e7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Round-trip Redmine lifecycle metadata through structured state

Persist plan_approval, verification, and events through Redmine structured state so pull/push no longer drops canonical lifecycle metadata.

## Scope

- In scope: Persist plan_approval, verification, and events through Redmine structured state so pull/push no longer drops canonical lifecycle metadata.
- Out of scope: unrelated refactors not required for "Round-trip Redmine lifecycle metadata through structured state".

## Plan

1. Teach Redmine issueToTask to hydrate plan_approval, verification, and events from canonical_state so pull/projection rebuilds keep canonical lifecycle metadata.
2. Preserve that lifecycle metadata when setTaskDoc or writeTask updates sections/revision, instead of dropping it during structured state rewrites.
3. Add focused regressions proving lifecycle metadata survives payload build, pull reconstruction, and remote doc updates.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: Redmine regressions prove that plan_approval, verification, and events survive payload build, remote pull, and doc updates.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: lint passes on the structured-state lifecycle metadata path.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages still build after the Redmine lifecycle metadata changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T06:26:38.787Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 1 test file passed; 35 tests passed, including canonical_state lifecycle metadata reconstruction on pull and preservation through remote setTaskDoc updates.
Scope: Redmine plan_approval, verification, and events round-trip through structured state.

Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/mapping.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.redmine.test.ts
Result: pass
Evidence: eslint exited cleanly with no findings.
Scope: Structured-state lifecycle metadata read/write seams and touched regressions.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited 0 after the lifecycle metadata changes.
Scope: Compile-time integrity for the updated Redmine backend.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:25:28.411Z, excerpt_hash=sha256:9273da0f9c63b3c28aca4b44fb33f5fb3c24037cb1e236c6231b6db3e4dde6e7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
