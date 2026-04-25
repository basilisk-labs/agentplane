---
id: "202604251626-BX2JXQ"
title: "Refactor task plan and finish spec surfaces"
result_summary: "split task plan helpers"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-04-25T16:49:48.265Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T16:55:11.698Z"
  updated_by: "CODER"
  note: "Focused plan/help/finish tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md; targeted Prettier passed for touched files."
commit:
  hash: "7ee423a4d31aefe5988395b01f2f3e63f1a1b97d"
  message: "♻️ BX2JXQ task: split task plan helpers"
comments:
  -
    author: "CODER"
    body: "Start: Refactor the task plan or finish command surface using one low-risk extraction, preserving command flags, generated help, and existing task behavior."
  -
    author: "CODER"
    body: "Verified: task plan helper extraction preserved command behavior, focused tests and command docs checks passed, and remaining finish.spec hotspot is recorded as separate follow-up."
events:
  -
    type: "status"
    at: "2026-04-25T16:49:57.568Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor the task plan or finish command surface using one low-risk extraction, preserving command flags, generated help, and existing task behavior."
  -
    type: "verify"
    at: "2026-04-25T16:55:11.698Z"
    author: "CODER"
    state: "ok"
    note: "Focused plan/help/finish tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md; targeted Prettier passed for touched files."
  -
    type: "status"
    at: "2026-04-25T16:55:40.523Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task plan helper extraction preserved command behavior, focused tests and command docs checks passed, and remaining finish.spec hotspot is recorded as separate follow-up."
doc_version: 3
doc_updated_at: "2026-04-25T16:55:40.525Z"
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
    1. Inspect commands/task/plan.ts and commands/finish.spec.ts for the smallest low-risk extraction boundary.
    2. Prefer one coherent extraction if both files together would widen scope; record any deferred half in Findings.
    3. Preserve command flags, generated help, and task plan behavior.
    4. Run focused plan/finish/help tests plus docs:cli check when command spec changes, then typecheck/lint/hotspot gates.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check && bun run typecheck && bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T16:55:11.698Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused plan/help/finish tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md; targeted Prettier passed for touched files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:54:11.084Z, excerpt_hash=sha256:2831cf5bdd44bf5ed61f2651cfcca3d175731841971cf93c5ea2502ca3295dec
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Extracted task plan backend and document validation helpers into plan-shared.ts; plan.ts is now below the runtime hotspot warning threshold while preserving command entrypoints.
      Impact: Reduced the task plan command surface without changing generated help, flags, or plan approval behavior.
      Resolution: Deferred finish.spec.ts extraction to a separate atom because its size is mostly declarative option and raw validation surface.
    
    - Observation: Full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md in the repository root.
      Impact: This task can verify touched files with targeted Prettier, but cannot honestly claim the whole-repo format gate in the current dirty checkout.
      Resolution: Left the untracked file untouched and used targeted Prettier checks for all files modified by this atom.
id_source: "generated"
---
## Summary

Refactor task plan and finish spec surfaces

Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.

## Scope

- In scope: Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
- Out of scope: unrelated refactors not required for "Refactor task plan and finish spec surfaces".

## Plan

1. Inspect commands/task/plan.ts and commands/finish.spec.ts for the smallest low-risk extraction boundary.
2. Prefer one coherent extraction if both files together would widen scope; record any deferred half in Findings.
3. Preserve command flags, generated help, and task plan behavior.
4. Run focused plan/finish/help tests plus docs:cli check when command spec changes, then typecheck/lint/hotspot gates.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check && bun run typecheck && bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T16:55:11.698Z — VERIFY — ok

By: CODER

Note: Focused plan/help/finish tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md; targeted Prettier passed for touched files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:54:11.084Z, excerpt_hash=sha256:2831cf5bdd44bf5ed61f2651cfcca3d175731841971cf93c5ea2502ca3295dec

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Extracted task plan backend and document validation helpers into plan-shared.ts; plan.ts is now below the runtime hotspot warning threshold while preserving command entrypoints.
  Impact: Reduced the task plan command surface without changing generated help, flags, or plan approval behavior.
  Resolution: Deferred finish.spec.ts extraction to a separate atom because its size is mostly declarative option and raw validation surface.

- Observation: Full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md in the repository root.
  Impact: This task can verify touched files with targeted Prettier, but cannot honestly claim the whole-repo format gate in the current dirty checkout.
  Resolution: Left the untracked file untouched and used targeted Prettier checks for all files modified by this atom.
