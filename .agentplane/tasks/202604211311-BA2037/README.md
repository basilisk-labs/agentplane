---
id: "202604211311-BA2037"
title: "Split command loaders by domain"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:11:23.349Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
