---
id: "202603301857-DMYRDF"
title: "Collapse low-value wrappers with tests still green"
result_summary: "integrate: squash task/202603301857-DMYRDF/collapse-runtime-dead-wrappers"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301857-SZATBJ"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:11:30.529Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:15:15.109Z"
  updated_by: "CODER"
  note: "Focused verification passed for wrapper collapse and import cleanup."
commit:
  hash: "3c68f3eccf9eca1fdace338f6a92f266a8f9ea0f"
  message: "🧩 DMYRDF integrate: squash task/202603301857-DMYRDF/collapse-runtime-dead-wrappers"
comments:
  -
    author: "CODER"
    body: "Start: remove runtime-dead alias wrappers from the audited shortlist and retarget remaining test-only imports without changing live command dispatch."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-DMYRDF/pr."
events:
  -
    type: "status"
    at: "2026-03-31T12:12:22.912Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove runtime-dead alias wrappers from the audited shortlist and retarget remaining test-only imports without changing live command dispatch."
  -
    type: "verify"
    at: "2026-03-31T12:15:15.109Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed for wrapper collapse and import cleanup."
  -
    type: "status"
    at: "2026-03-31T12:17:14.903Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-DMYRDF/pr."
doc_version: 3
doc_updated_at: "2026-03-31T12:17:14.909Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason."
sections:
  Summary: |-
    Collapse low-value wrappers with tests still green
    
    Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
  Scope: |-
    - In scope: Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
    - Out of scope: unrelated refactors not required for "Collapse low-value wrappers with tests still green".
  Plan: |-
    1. Audit the current implementation and tests around wrapper modules selected by the audit to isolate the exact behavior gap for R5.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering wrapper modules selected by the audit. Expected: the behavior described by R5.4 is observable and stable.
    2. Inspect the final diff for 202603301857-DMYRDF. Expected: scope stays limited to wrapper modules selected by the audit plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:15:15.109Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed for wrapper collapse and import cleanup.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:12:22.914Z, excerpt_hash=sha256:23f5a48990576bd57fc8177deac197554da16baf6ff04410aac4c9519ed90ffb
    
    Details:
    
    Command: bunx eslint packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/recipes.test-helpers.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts
    Result: pass
    Evidence: exited 0 with no diagnostics.
    Scope: touched tests and helper imports.
    
    Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts
    Result: pass
    Evidence: 7 files passed, 89 tests passed.
    Scope: doctor, verify hooks, and recipes flows that depended on removed wrappers.
    
    Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane build exited 0.
    Scope: full package build and import graph after deleting pass-through modules.
    
    Command: git diff --stat
    Result: pass
    Evidence: scope stayed limited to 10 deleted wrapper modules, 4 import retargets, and task documentation.
    Scope: final diff review for DMYRDF.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Collapse low-value wrappers with tests still green

Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.

## Scope

- In scope: Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
- Out of scope: unrelated refactors not required for "Collapse low-value wrappers with tests still green".

## Plan

1. Audit the current implementation and tests around wrapper modules selected by the audit to isolate the exact behavior gap for R5.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering wrapper modules selected by the audit. Expected: the behavior described by R5.4 is observable and stable.
2. Inspect the final diff for 202603301857-DMYRDF. Expected: scope stays limited to wrapper modules selected by the audit plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:15:15.109Z — VERIFY — ok

By: CODER

Note: Focused verification passed for wrapper collapse and import cleanup.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:12:22.914Z, excerpt_hash=sha256:23f5a48990576bd57fc8177deac197554da16baf6ff04410aac4c9519ed90ffb

Details:

Command: bunx eslint packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/recipes.test-helpers.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts
Result: pass
Evidence: exited 0 with no diagnostics.
Scope: touched tests and helper imports.

Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/commands/recipes.cache.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts
Result: pass
Evidence: 7 files passed, 89 tests passed.
Scope: doctor, verify hooks, and recipes flows that depended on removed wrappers.

Command: bun run --filter=agentplane build
Result: pass
Evidence: agentplane build exited 0.
Scope: full package build and import graph after deleting pass-through modules.

Command: git diff --stat
Result: pass
Evidence: scope stayed limited to 10 deleted wrapper modules, 4 import retargets, and task documentation.
Scope: final diff review for DMYRDF.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
