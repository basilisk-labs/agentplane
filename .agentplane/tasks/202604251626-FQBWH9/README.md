---
id: "202604251626-FQBWH9"
title: "Refactor command task-backend context"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604251626-PQAXKH"
tags:
  - "code"
  - "refactor"
verify:
  - "bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts"
  - "bun run typecheck && bun run lint:core && bun run arch:check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-25T16:26:20.415Z"
doc_updated_by: "CODER"
description: "Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior."
sections:
  Summary: |-
    Refactor command task-backend context
    
    Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.
  Scope: |-
    - In scope: Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.
    - Out of scope: unrelated refactors not required for "Refactor command task-backend context".
  Plan: |-
    1. Implement the change for "Refactor command task-backend context".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck && bun run lint:core && bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor command task-backend context

Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.

## Scope

- In scope: Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.
- Out of scope: unrelated refactors not required for "Refactor command task-backend context".

## Plan

1. Implement the change for "Refactor command task-backend context".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck && bun run lint:core && bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
