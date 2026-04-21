---
id: "202604211311-BA2037"
title: "Split command loaders by domain"
result_summary: "Split command loaders by domain."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604211311-76QNYV"
tags:
  - "architecture"
  - "cli"
  - "code"
verify:
  - "bun run arch:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:24.397Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:39:13.967Z"
  updated_by: "CODER"
  note: "Command: bun run arch:check; Result: pass; Evidence: catalog cycles removed from dep-cruiser baseline. Command: bun run typecheck; Result: pass. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run."
commit:
  hash: "0f8f8e6465ecdaaee3061f5b97f47fcedb3684c3"
  message: "♻️ cli: break command catalog cycles"
comments:
  -
    author: "CODER"
    body: "Start: splitting command loaders by domain after kernel extraction so each catalog domain imports only its corresponding loader surface."
  -
    author: "CODER"
    body: "Verified: command loaders split by domain with typecheck, arch check, and group/catalog tests passing."
events:
  -
    type: "status"
    at: "2026-04-21T13:21:53.315Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting command loaders by domain after kernel extraction so each catalog domain imports only its corresponding loader surface."
  -
    type: "verify"
    at: "2026-04-21T13:39:13.967Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run arch:check; Result: pass; Evidence: catalog cycles removed from dep-cruiser baseline. Command: bun run typecheck; Result: pass. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run."
  -
    type: "status"
    at: "2026-04-21T13:40:37.930Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: command loaders split by domain with typecheck, arch check, and group/catalog tests passing."
doc_version: 3
doc_updated_at: "2026-04-21T13:40:37.931Z"
doc_updated_by: "CODER"
description: "Decompose cli/run-cli/command-loaders.ts into domain-specific loader modules so loaders depend on the catalog kernel but not on the aggregate catalog."
sections:
  Summary: |-
    Split command loaders by domain
    
    Decompose cli/run-cli/command-loaders.ts into domain-specific loader modules so loaders depend on the catalog kernel but not on the aggregate catalog.
  Scope: |-
    - In scope: Decompose cli/run-cli/command-loaders.ts into domain-specific loader modules so loaders depend on the catalog kernel but not on the aggregate catalog.
    - Out of scope: unrelated refactors not required for "Split command loaders by domain".
  Plan: "Scope: reduce the 18-cycle hotspot in command-loaders.ts. Steps: 1. Split loaders by domain: core, task, project/init, lifecycle/workflow, release/ops as supported by existing structure. 2. Keep lazy imports and command names stable. 3. Keep the aggregate loader surface as a fan-in only if needed. 4. Update tests and snapshots only for intentional path/name changes. Acceptance: command-loaders.ts is no longer the primary cycle source; command help and group command tests pass; no eager-loading regression is introduced."
  Verify Steps: |-
    1. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bunx vitest run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:39:13.967Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run arch:check; Result: pass; Evidence: catalog cycles removed from dep-cruiser baseline. Command: bun run typecheck; Result: pass. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:53.343Z, excerpt_hash=sha256:15b9087fc21bd586a24e385db76547aa45de4ce597b1ab5dfb3188c315c7a653
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split command loaders by domain

Decompose cli/run-cli/command-loaders.ts into domain-specific loader modules so loaders depend on the catalog kernel but not on the aggregate catalog.

## Scope

- In scope: Decompose cli/run-cli/command-loaders.ts into domain-specific loader modules so loaders depend on the catalog kernel but not on the aggregate catalog.
- Out of scope: unrelated refactors not required for "Split command loaders by domain".

## Plan

Scope: reduce the 18-cycle hotspot in command-loaders.ts. Steps: 1. Split loaders by domain: core, task, project/init, lifecycle/workflow, release/ops as supported by existing structure. 2. Keep lazy imports and command names stable. 3. Keep the aggregate loader surface as a fan-in only if needed. 4. Update tests and snapshots only for intentional path/name changes. Acceptance: command-loaders.ts is no longer the primary cycle source; command help and group command tests pass; no eager-loading regression is introduced.

## Verify Steps

1. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bunx vitest run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:39:13.967Z — VERIFY — ok

By: CODER

Note: Command: bun run arch:check; Result: pass; Evidence: catalog cycles removed from dep-cruiser baseline. Command: bun run typecheck; Result: pass. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:53.343Z, excerpt_hash=sha256:15b9087fc21bd586a24e385db76547aa45de4ce597b1ab5dfb3188c315c7a653

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
