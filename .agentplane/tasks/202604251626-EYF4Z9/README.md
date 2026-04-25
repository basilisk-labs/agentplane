---
id: "202604251626-EYF4Z9"
title: "Refactor remaining direct output surfaces"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604251626-BX2JXQ"
tags:
  - "code"
  - "refactor"
verify:
  - "bun run logging:check && bun run test:project -- agentplane packages/agentplane/src/cli/check-no-console-script.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
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
doc_updated_at: "2026-04-25T16:26:48.985Z"
doc_updated_by: "CODER"
description: "Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact."
sections:
  Summary: |-
    Refactor remaining direct output surfaces
    
    Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact.
  Scope: |-
    - In scope: Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact.
    - Out of scope: unrelated refactors not required for "Refactor remaining direct output surfaces".
  Plan: |-
    1. Implement the change for "Refactor remaining direct output surfaces".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run logging:check && bun run test:project -- agentplane packages/agentplane/src/cli/check-no-console-script.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

Refactor remaining direct output surfaces

Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact.

## Scope

- In scope: Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact.
- Out of scope: unrelated refactors not required for "Refactor remaining direct output surfaces".

## Plan

1. Implement the change for "Refactor remaining direct output surfaces".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run logging:check && bun run test:project -- agentplane packages/agentplane/src/cli/check-no-console-script.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
