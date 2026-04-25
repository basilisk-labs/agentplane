---
id: "202604251626-BX2JXQ"
title: "Refactor task plan and finish spec surfaces"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604251626-FQBWH9"
tags:
  - "code"
  - "refactor"
verify:
  - "bun run docs:cli:check && bun run typecheck && bun run lint:core"
  - "bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
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
doc_updated_at: "2026-04-25T16:26:36.613Z"
doc_updated_by: "CODER"
description: "Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help."
sections:
  Summary: |-
    Refactor task plan and finish spec surfaces
    
    Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
  Scope: |-
    - In scope: Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
    - Out of scope: unrelated refactors not required for "Refactor task plan and finish spec surfaces".
  Plan: |-
    1. Implement the change for "Refactor task plan and finish spec surfaces".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check && bun run typecheck && bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
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

Refactor task plan and finish spec surfaces

Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.

## Scope

- In scope: Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
- Out of scope: unrelated refactors not required for "Refactor task plan and finish spec surfaces".

## Plan

1. Implement the change for "Refactor task plan and finish spec surfaces".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check && bun run typecheck && bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
