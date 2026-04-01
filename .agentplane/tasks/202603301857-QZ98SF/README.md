---
id: "202603301857-QZ98SF"
title: "Audit non-local backends against the same summary/full-read split"
result_summary: "integrate: squash task/202603301857-QZ98SF/backend-projection-contract"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301856-6G2YVG"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T11:18:59.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T11:51:48.073Z"
  updated_by: "CODER"
  note: "Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: no lint errors. Scope: backend capability contract, adapter boundary, and touched contract tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx vitest run packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: 7 files passed, 93 tests passed. Scope: backend contracts, redmine/local behavior, command fallback guard, adapter surface, and export/finish contract callers. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: package-level type/runtime build for the touched backend and adapter surface."
commit:
  hash: "e83cbbbcbfce0d897f68faf3a60b4bd6802bef1f"
  message: "🧩 QZ98SF integrate: squash task/202603301857-QZ98SF/backend-projection-contract"
comments:
  -
    author: "CODER"
    body: "Start: make projection-read contracts explicit across backend capabilities, command context fallback policy, and adapter-facing types so non-local backends advertise native vs fallback reads without ambiguity."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-QZ98SF/pr."
events:
  -
    type: "status"
    at: "2026-03-31T11:19:39.886Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make projection-read contracts explicit across backend capabilities, command context fallback policy, and adapter-facing types so non-local backends advertise native vs fallback reads without ambiguity."
  -
    type: "verify"
    at: "2026-03-31T11:51:48.073Z"
    author: "CODER"
    state: "ok"
    note: "Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: no lint errors. Scope: backend capability contract, adapter boundary, and touched contract tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx vitest run packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: 7 files passed, 93 tests passed. Scope: backend contracts, redmine/local behavior, command fallback guard, adapter surface, and export/finish contract callers. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: package-level type/runtime build for the touched backend and adapter surface."
  -
    type: "status"
    at: "2026-03-31T11:53:44.651Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-QZ98SF/pr."
doc_version: 3
doc_updated_at: "2026-03-31T11:53:44.657Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface."
sections:
  Summary: |-
    Audit non-local backends against the same summary/full-read split
    
    Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
  Scope: |-
    - In scope: Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
    - Out of scope: unrelated refactors not required for "Audit non-local backends against the same summary/full-read split".
  Plan: |-
    1. Audit the current implementation and tests around backend contracts and external backend adapters to isolate the exact behavior gap for R2.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering backend contracts and external backend adapters. Expected: the behavior described by R2.4 is observable and stable.
    2. Inspect the final diff for 202603301857-QZ98SF. Expected: scope stays limited to backend contracts and external backend adapters plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T11:51:48.073Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: no lint errors. Scope: backend capability contract, adapter boundary, and touched contract tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx vitest run packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: 7 files passed, 93 tests passed. Scope: backend contracts, redmine/local behavior, command fallback guard, adapter surface, and export/finish contract callers. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: package-level type/runtime build for the touched backend and adapter surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T11:19:39.888Z, excerpt_hash=sha256:bd3729ef38d46e4f23566e22bcb5a9bee0b66556507b40d2b1e7df82fdebdb70
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Audit non-local backends against the same summary/full-read split

Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.

## Scope

- In scope: Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
- Out of scope: unrelated refactors not required for "Audit non-local backends against the same summary/full-read split".

## Plan

1. Audit the current implementation and tests around backend contracts and external backend adapters to isolate the exact behavior gap for R2.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering backend contracts and external backend adapters. Expected: the behavior described by R2.4 is observable and stable.
2. Inspect the final diff for 202603301857-QZ98SF. Expected: scope stays limited to backend contracts and external backend adapters plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T11:51:48.073Z — VERIFY — ok

By: CODER

Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: no lint errors. Scope: backend capability contract, adapter boundary, and touched contract tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bunx vitest run packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts; Result: pass; Evidence: 7 files passed, 93 tests passed. Scope: backend contracts, redmine/local behavior, command fallback guard, adapter surface, and export/finish contract callers. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-QZ98SF-backend-projection-contract/.tmp bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0. Scope: package-level type/runtime build for the touched backend and adapter surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T11:19:39.888Z, excerpt_hash=sha256:bd3729ef38d46e4f23566e22bcb5a9bee0b66556507b40d2b1e7df82fdebdb70

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
