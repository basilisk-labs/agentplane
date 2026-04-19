---
id: "202604191516-JBXHCY"
title: "Advance epic A′ Zod migration in direct mode"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T15:16:25.953Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T15:29:44.452Z"
  updated_by: "CODER"
  note: "Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema remain equivalent across 7 scenarios and residual AJV deps are now none. Scope: config parity audit and dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime, config, tasks, and git surfaces."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue epic A′ in direct mode, preserve the workflow switch inside the active scope, and carry forward the config parity audit from the abandoned branch_pr worktree into the current checkout."
  -
    author: "CODER"
    body: "Blocked: direct-mode cleanup must land first so branch_pr residue and orphan task artifacts do not contaminate the next epic commits."
  -
    author: "CODER"
    body: "Start: resume epic A′ after cleanup; continue the validated Zod migration work from the current direct-mode checkout."
events:
  -
    type: "status"
    at: "2026-04-19T15:16:32.432Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue epic A′ in direct mode, preserve the workflow switch inside the active scope, and carry forward the config parity audit from the abandoned branch_pr worktree into the current checkout."
  -
    type: "verify"
    at: "2026-04-19T15:18:58.772Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema match across 7 scenarios, residual AJV deps dropped to none. Scope: config parity baseline and package dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime and schema-adjacent surfaces."
  -
    type: "status"
    at: "2026-04-19T15:26:44.418Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: direct-mode cleanup must land first so branch_pr residue and orphan task artifacts do not contaminate the next epic commits."
  -
    type: "status"
    at: "2026-04-19T15:29:05.890Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: resume epic A′ after cleanup; continue the validated Zod migration work from the current direct-mode checkout."
  -
    type: "verify"
    at: "2026-04-19T15:29:44.452Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema remain equivalent across 7 scenarios and residual AJV deps are now none. Scope: config parity audit and dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime, config, tasks, and git surfaces."
doc_version: 3
doc_updated_at: "2026-04-19T15:29:44.460Z"
doc_updated_by: "CODER"
description: "Continue the Zod migration epic in local direct workflow, record the actual config parity state, and implement the next safe cleanup steps from the current checkout without branch_pr worktrees."
sections:
  Summary: |-
    Advance epic A′ Zod migration in direct mode
    
    Continue the Zod migration epic in local direct workflow, record the actual config parity state, and implement the next safe cleanup steps from the current checkout without branch_pr worktrees.
  Scope: |-
    - In scope: Continue the Zod migration epic in local direct workflow, record the actual config parity state, and implement the next safe cleanup steps from the current checkout without branch_pr worktrees.
    - Out of scope: unrelated refactors not required for "Advance epic A′ Zod migration in direct mode".
  Plan: |-
    1. Continue epic A′ from the current checkout under direct workflow.
    2. Record the actual config validator topology and add a parity audit script plus ADR so future drift is detectable.
    3. Apply the next safe Zod-migration cleanup steps in this checkout only after parity is verified.
    4. Verify with targeted config tests and any touched schema checks.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T15:18:58.772Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema match across 7 scenarios, residual AJV deps dropped to none. Scope: config parity baseline and package dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime and schema-adjacent surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:17:34.578Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-19T15:29:44.452Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema remain equivalent across 7 scenarios and residual AJV deps are now none. Scope: config parity audit and dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime, config, tasks, and git surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:29:05.907Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: packages/core/src/config/config.ts уже является runtime-адаптером над AgentplaneConfigSchema из config-zod.ts, а не отдельным AJV-валидатором.
      Impact: План A′.1/A′.2 нужно исполнять как проверку от регрессии и cleanup residue, а не как переключение между двумя живыми валидаторами.
      Resolution: Добавлен parity script и ADR, а следующий шаг эпика должен фокусироваться на stale AJV dependencies и последующей консолидации schema surfaces.
id_source: "generated"
---
## Summary

Advance epic A′ Zod migration in direct mode

Continue the Zod migration epic in local direct workflow, record the actual config parity state, and implement the next safe cleanup steps from the current checkout without branch_pr worktrees.

## Scope

- In scope: Continue the Zod migration epic in local direct workflow, record the actual config parity state, and implement the next safe cleanup steps from the current checkout without branch_pr worktrees.
- Out of scope: unrelated refactors not required for "Advance epic A′ Zod migration in direct mode".

## Plan

1. Continue epic A′ from the current checkout under direct workflow.
2. Record the actual config validator topology and add a parity audit script plus ADR so future drift is detectable.
3. Apply the next safe Zod-migration cleanup steps in this checkout only after parity is verified.
4. Verify with targeted config tests and any touched schema checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T15:18:58.772Z — VERIFY — ok

By: CODER

Note: Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema match across 7 scenarios, residual AJV deps dropped to none. Scope: config parity baseline and package dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime and schema-adjacent surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:17:34.578Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-19T15:29:44.452Z — VERIFY — ok

By: CODER

Note: Command: bun scripts/diff-config-schemas.mjs; Result: pass; Evidence: runtime config path and raw Zod schema remain equivalent across 7 scenarios and residual AJV deps are now none. Scope: config parity audit and dependency cleanup. Command: bun run test:core; Result: pass; Evidence: 15 files and 138 tests passed after removing stale AJV dependencies. Scope: packages/core/src runtime, config, tasks, and git surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:29:05.907Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: packages/core/src/config/config.ts уже является runtime-адаптером над AgentplaneConfigSchema из config-zod.ts, а не отдельным AJV-валидатором.
  Impact: План A′.1/A′.2 нужно исполнять как проверку от регрессии и cleanup residue, а не как переключение между двумя живыми валидаторами.
  Resolution: Добавлен parity script и ADR, а следующий шаг эпика должен фокусироваться на stale AJV dependencies и последующей консолидации schema surfaces.
