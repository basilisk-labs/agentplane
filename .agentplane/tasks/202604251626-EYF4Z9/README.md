---
id: "202604251626-EYF4Z9"
title: "Refactor remaining direct output surfaces"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
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
  state: "approved"
  updated_at: "2026-04-25T16:56:43.823Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Replace the remaining production console calls with explicit stream writes, lower the no-console baseline to zero, and leave broader stdout command surfaces as separate emitter-contract work."
events:
  -
    type: "status"
    at: "2026-04-25T16:56:51.070Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replace the remaining production console calls with explicit stream writes, lower the no-console baseline to zero, and leave broader stdout command surfaces as separate emitter-contract work."
doc_version: 3
doc_updated_at: "2026-04-25T17:07:54.078Z"
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
    1. Replace the remaining production console.* calls in doctor.run.ts, task/rebuild-index.command.ts, and cli/critical/cli-runner.ts with process stdout/stderr writes or existing output helpers.
    2. Lower scripts/check-no-console.mjs baseline to zero so the cleanup is enforced.
    3. Keep broader process.stdout.write command surfaces out of this atom and record them as follow-up, because they need command-specific emitter contracts.
    4. Run logging:check, focused no-console/doctor tests, typecheck, lint, arch, and artifact/task gates.
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
  Findings: |-
    - Observation: Production console.* usage in packages is now zero, and check-no-console uses TypeScript AST traversal so string fixtures in testkit do not count as runtime console calls.
      Impact: The logging gate can enforce max=0 without false positives from generated shell/fixture source strings.
      Resolution: Replaced doctor, rebuild-index, and critical CLI fallback console calls with explicit stream writes; updated doctor tests to capture process.stderr.write.
    
    - Observation: Many process.stdout.write/process.stderr.write command surfaces remain in task, guard, recipe, hook, workflow, and upgrade commands.
      Impact: Those are not console.* leaks, but they still represent mixed output mechanisms and should be moved to command-specific emitter/render contracts in smaller follow-up atoms.
      Resolution: Kept this atom to the strict console baseline and documented broader stream-output cleanup as follow-up instead of doing a risky mechanical rewrite.
    
    - Observation: Whole-repo format:check is still blocked by unrelated untracked REFACTORING_PLAN_v3.md in the root.
      Impact: This atom used targeted Prettier checks for every touched file and did not alter the unrelated markdown artifact.
      Resolution: Leave REFACTORING_PLAN_v3.md untouched unless the user explicitly asks to delete or format it.
id_source: "generated"
---
## Summary

Refactor remaining direct output surfaces

Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact.

## Scope

- In scope: Replace selected direct stdout/stderr or console-based command output clusters with render helpers or existing CLI output primitives, keeping JSON/structured output contracts intact.
- Out of scope: unrelated refactors not required for "Refactor remaining direct output surfaces".

## Plan

1. Replace the remaining production console.* calls in doctor.run.ts, task/rebuild-index.command.ts, and cli/critical/cli-runner.ts with process stdout/stderr writes or existing output helpers.
2. Lower scripts/check-no-console.mjs baseline to zero so the cleanup is enforced.
3. Keep broader process.stdout.write command surfaces out of this atom and record them as follow-up, because they need command-specific emitter contracts.
4. Run logging:check, focused no-console/doctor tests, typecheck, lint, arch, and artifact/task gates.

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

- Observation: Production console.* usage in packages is now zero, and check-no-console uses TypeScript AST traversal so string fixtures in testkit do not count as runtime console calls.
  Impact: The logging gate can enforce max=0 without false positives from generated shell/fixture source strings.
  Resolution: Replaced doctor, rebuild-index, and critical CLI fallback console calls with explicit stream writes; updated doctor tests to capture process.stderr.write.

- Observation: Many process.stdout.write/process.stderr.write command surfaces remain in task, guard, recipe, hook, workflow, and upgrade commands.
  Impact: Those are not console.* leaks, but they still represent mixed output mechanisms and should be moved to command-specific emitter/render contracts in smaller follow-up atoms.
  Resolution: Kept this atom to the strict console baseline and documented broader stream-output cleanup as follow-up instead of doing a risky mechanical rewrite.

- Observation: Whole-repo format:check is still blocked by unrelated untracked REFACTORING_PLAN_v3.md in the root.
  Impact: This atom used targeted Prettier checks for every touched file and did not alter the unrelated markdown artifact.
  Resolution: Leave REFACTORING_PLAN_v3.md untouched unless the user explicitly asks to delete or format it.
