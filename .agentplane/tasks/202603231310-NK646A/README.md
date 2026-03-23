---
id: "202603231310-NK646A"
title: "R5: Assemble canonical task runner context"
result_summary: "Added canonical task runner context assembler for backend-backed tasks."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-KAGMDW"
tags:
  - "code"
  - "runner"
  - "tasks"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:44.132Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T14:04:31.062Z"
  updated_by: "CODER"
  note: "Canonical task runner context verified on local backend fixture."
commit:
  hash: "72f899ea966589ec6c597e7549d0548e7b9c8958"
  message: "✅ NK646A code: done"
comments:
  -
    author: "CODER"
    body: "Start: assemble canonical runner task context from backend task data, README/frontmatter, comments/events, dependency state, and repository metadata without duplicating task parsing logic."
  -
    author: "CODER"
    body: "Verified: assembled canonical runner task context from backend task data, README/frontmatter, comments/events, dependency state, and repository metadata with typed missing-task failures."
events:
  -
    type: "status"
    at: "2026-03-23T13:59:33.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: assemble canonical runner task context from backend task data, README/frontmatter, comments/events, dependency state, and repository metadata without duplicating task parsing logic."
  -
    type: "verify"
    at: "2026-03-23T14:04:31.062Z"
    author: "CODER"
    state: "ok"
    note: "Canonical task runner context verified on local backend fixture."
  -
    type: "status"
    at: "2026-03-23T14:04:35.993Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: assembled canonical runner task context from backend task data, README/frontmatter, comments/events, dependency state, and repository metadata with typed missing-task failures."
doc_version: 3
doc_updated_at: "2026-03-23T14:04:40.255Z"
doc_updated_by: "CODER"
description: "Build one canonical task context bundle from backend state, README sections, dependency state, and repo context."
sections:
  Summary: |-
    R5: Assemble canonical task runner context
    
    Build one canonical task context bundle from backend state, README sections, dependency state, and repo context.
  Scope: |-
    - In scope: Build one canonical task context bundle from backend state, README sections, dependency state, and repo context.
    - Out of scope: unrelated refactors not required for "R5: Assemble canonical task runner context".
  Plan: |-
    1. Read task state from the configured backend and normalize it into a runner bundle payload.
    2. Include README sections, comments, events, verification contract, dependency state, and repo context.
    3. Add tests for local backend behavior and error mapping.
  Verify Steps: |-
    1. Build a runner context for a local task fixture. Expected: sections, comments, events, and dependency state are present.
    2. Trigger a missing-task or bad-read path. Expected: the assembler returns a typed failure instead of a silent fallback.
    3. Run the task-context test suite. Expected: no regression in existing task loading behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T14:04:31.062Z — VERIFY — ok
    
    By: CODER
    
    Note: Canonical task runner context verified on local backend fixture.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:59:33.262Z, excerpt_hash=sha256:f3af43586e4c50720f172fb51c06d21b75c9350ee73b1041ca8b5a8dc6a89da1
    
    Details:
    
    - Command: bunx vitest run packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts
      Result: pass
      Evidence: 2 files, 5 tests passed; runner task context assembly and existing task-backend loading both green.
      Scope: canonical task-context assembly, dependency-state mapping, missing-task typed failure, backend loading regression.
    - Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/task-context.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: no lint findings.
      Scope: new runner task-context module, test, and export surface.
    - Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/context/task-context.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: all matched files use Prettier code style.
      Scope: modified runner task-context files formatting.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R5: Assemble canonical task runner context

Build one canonical task context bundle from backend state, README sections, dependency state, and repo context.

## Scope

- In scope: Build one canonical task context bundle from backend state, README sections, dependency state, and repo context.
- Out of scope: unrelated refactors not required for "R5: Assemble canonical task runner context".

## Plan

1. Read task state from the configured backend and normalize it into a runner bundle payload.
2. Include README sections, comments, events, verification contract, dependency state, and repo context.
3. Add tests for local backend behavior and error mapping.

## Verify Steps

1. Build a runner context for a local task fixture. Expected: sections, comments, events, and dependency state are present.
2. Trigger a missing-task or bad-read path. Expected: the assembler returns a typed failure instead of a silent fallback.
3. Run the task-context test suite. Expected: no regression in existing task loading behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T14:04:31.062Z — VERIFY — ok

By: CODER

Note: Canonical task runner context verified on local backend fixture.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:59:33.262Z, excerpt_hash=sha256:f3af43586e4c50720f172fb51c06d21b75c9350ee73b1041ca8b5a8dc6a89da1

Details:

- Command: bunx vitest run packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts
  Result: pass
  Evidence: 2 files, 5 tests passed; runner task context assembly and existing task-backend loading both green.
  Scope: canonical task-context assembly, dependency-state mapping, missing-task typed failure, backend loading regression.
- Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/task-context.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: no lint findings.
  Scope: new runner task-context module, test, and export surface.
- Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/context/task-context.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: all matched files use Prettier code style.
  Scope: modified runner task-context files formatting.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
