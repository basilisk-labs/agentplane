---
id: "202604100213-1AAPW1"
title: "Seed approvable Verify Steps for verify-required task scaffolds"
result_summary: "integrate: squash task/202604100213-1AAPW1/verify-steps-scaffold-approval"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T02:14:50.217Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T02:36:25.980Z"
  updated_by: "CODER"
  note: "OK: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t 'task new seeds Verify Steps in README for verify-required primary tags|task new without verify commands still seeds approvable Verify Steps for verify-required primary tags'; bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts -t 'task derive seeds verify steps for implementation tasks and task list shows wait deps until spike is DONE|task derive without verify commands still seeds approvable Verify Steps'; bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery'; bun x eslint packages/agentplane/src/commands/task/doc-template.ts packages/agentplane/src/commands/task/new.ts packages/agentplane/src/commands/task/derive.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts."
commit:
  hash: "3d5e3fb99be7a4611e707859aee887cf1e7ad71e"
  message: "🧩 1AAPW1 integrate: workflow: Seed approvable Verify Steps for verify-required task scaffolds"
comments:
  -
    author: "CODER"
    body: "Start: make verify-required task scaffolds immediately approvable by replacing placeholder Verify Steps with concrete acceptance steps, then cover new/derive paths with focused tests."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100213-1AAPW1/pr."
events:
  -
    type: "status"
    at: "2026-04-10T02:31:00.987Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make verify-required task scaffolds immediately approvable by replacing placeholder Verify Steps with concrete acceptance steps, then cover new/derive paths with focused tests."
  -
    type: "verify"
    at: "2026-04-10T02:36:25.980Z"
    author: "CODER"
    state: "ok"
    note: "OK: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t 'task new seeds Verify Steps in README for verify-required primary tags|task new without verify commands still seeds approvable Verify Steps for verify-required primary tags'; bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts -t 'task derive seeds verify steps for implementation tasks and task list shows wait deps until spike is DONE|task derive without verify commands still seeds approvable Verify Steps'; bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery'; bun x eslint packages/agentplane/src/commands/task/doc-template.ts packages/agentplane/src/commands/task/new.ts packages/agentplane/src/commands/task/derive.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts."
  -
    type: "status"
    at: "2026-04-10T02:54:30.451Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100213-1AAPW1/pr."
doc_version: 3
doc_updated_at: "2026-04-10T02:54:30.453Z"
doc_updated_by: "INTEGRATOR"
description: "Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery."
sections:
  Summary: |-
    Seed approvable Verify Steps for verify-required task scaffolds
    
    Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
  Scope: |-
    - In scope: Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
    - Out of scope: unrelated refactors not required for "Seed approvable Verify Steps for verify-required task scaffolds".
  Plan: "1. Inspect verify-required task scaffolding and the plan-approval gate to isolate why the seeded Verify Steps block is born in an unapprovable placeholder state. 2. Replace the placeholder-only seed with concrete acceptance steps derived from the primary tag and any explicit verify commands so fresh scaffolds are immediately reviewable. 3. Add focused regression coverage for task new/derive plus plan approve on verify-required tasks, then rerun the touched test/lint slice."
  Verify Steps: |-
    1. Create or derive a verify-required task and approve its plan without manually rewriting README sections. Expected: plan approval succeeds with the scaffolded Verify Steps as-is.
    2. Run the focused task new/derive plus plan-approve regression slice for verify-required tasks. Expected: the scaffolded Verify Steps stay actionable and tests pass.
    3. Inspect the seeded Verify Steps text. Expected: it contains concrete acceptance steps and no placeholder marker.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T02:36:25.980Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t 'task new seeds Verify Steps in README for verify-required primary tags|task new without verify commands still seeds approvable Verify Steps for verify-required primary tags'; bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts -t 'task derive seeds verify steps for implementation tasks and task list shows wait deps until spike is DONE|task derive without verify commands still seeds approvable Verify Steps'; bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery'; bun x eslint packages/agentplane/src/commands/task/doc-template.ts packages/agentplane/src/commands/task/new.ts packages/agentplane/src/commands/task/derive.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T02:31:00.993Z, excerpt_hash=sha256:b5e6b57e6ea922198537b04a3e857d4c3d0f88204f2b935fca1b59e8035a4062
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Verify-required task scaffolds could seed a placeholder Verify Steps block when no explicit verify command was supplied, so plan approval failed on a fresh task before any human refinement.
      Impact: Fresh code-task scaffolds were not immediately approvable, forcing manual README surgery and slowing the normal task lifecycle for both task new and task derive.
      Resolution: Removed the placeholder path for verify-required scaffolds without explicit verify commands, updated warning text to reflect concrete seeded acceptance steps, and added regression coverage for task new, task derive, and plan approve.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Seed approvable Verify Steps for verify-required task scaffolds

Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.

## Scope

- In scope: Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
- Out of scope: unrelated refactors not required for "Seed approvable Verify Steps for verify-required task scaffolds".

## Plan

1. Inspect verify-required task scaffolding and the plan-approval gate to isolate why the seeded Verify Steps block is born in an unapprovable placeholder state. 2. Replace the placeholder-only seed with concrete acceptance steps derived from the primary tag and any explicit verify commands so fresh scaffolds are immediately reviewable. 3. Add focused regression coverage for task new/derive plus plan approve on verify-required tasks, then rerun the touched test/lint slice.

## Verify Steps

1. Create or derive a verify-required task and approve its plan without manually rewriting README sections. Expected: plan approval succeeds with the scaffolded Verify Steps as-is.
2. Run the focused task new/derive plus plan-approve regression slice for verify-required tasks. Expected: the scaffolded Verify Steps stay actionable and tests pass.
3. Inspect the seeded Verify Steps text. Expected: it contains concrete acceptance steps and no placeholder marker.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T02:36:25.980Z — VERIFY — ok

By: CODER

Note: OK: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t 'task new seeds Verify Steps in README for verify-required primary tags|task new without verify commands still seeds approvable Verify Steps for verify-required primary tags'; bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts -t 'task derive seeds verify steps for implementation tasks and task list shows wait deps until spike is DONE|task derive without verify commands still seeds approvable Verify Steps'; bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery'; bun x eslint packages/agentplane/src/commands/task/doc-template.ts packages/agentplane/src/commands/task/new.ts packages/agentplane/src/commands/task/derive.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T02:31:00.993Z, excerpt_hash=sha256:b5e6b57e6ea922198537b04a3e857d4c3d0f88204f2b935fca1b59e8035a4062

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Verify-required task scaffolds could seed a placeholder Verify Steps block when no explicit verify command was supplied, so plan approval failed on a fresh task before any human refinement.
  Impact: Fresh code-task scaffolds were not immediately approvable, forcing manual README surgery and slowing the normal task lifecycle for both task new and task derive.
  Resolution: Removed the placeholder path for verify-required scaffolds without explicit verify commands, updated warning text to reflect concrete seeded acceptance steps, and added regression coverage for task new, task derive, and plan approve.
  Promotion: incident-candidate
  Fixability: external
