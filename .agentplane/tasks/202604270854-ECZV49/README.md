---
id: "202604270854-ECZV49"
title: "Normalize remaining direct stdio output surfaces"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
verify:
  - "bun run lint:core"
  - "bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:42.730Z"
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
doc_updated_at: "2026-04-27T08:56:41.232Z"
doc_updated_by: "PLANNER"
description: "Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces."
sections:
  Summary: |-
    Normalize remaining direct stdio output surfaces
    
    Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces.
  Scope: |-
    - In scope: Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces.
    - Out of scope: unrelated refactors not required for "Normalize remaining direct stdio output surfaces".
  Plan: "1. Use hotspot-report direct_stdio_writes output to pick the smallest lifecycle-adjacent stdout/stderr cleanup slice. 2. Replace direct writes with createCliEmitter or structured output helpers. 3. Preserve exact user-visible semantics where tests depend on output. 4. Add or adjust focused output tests. 5. Verify lint and touched command tests."
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

Normalize remaining direct stdio output surfaces

Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces.

## Scope

- In scope: Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces.
- Out of scope: unrelated refactors not required for "Normalize remaining direct stdio output surfaces".

## Plan

1. Use hotspot-report direct_stdio_writes output to pick the smallest lifecycle-adjacent stdout/stderr cleanup slice. 2. Replace direct writes with createCliEmitter or structured output helpers. 3. Preserve exact user-visible semantics where tests depend on output. 4. Add or adjust focused output tests. 5. Verify lint and touched command tests.

## Verify Steps

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
