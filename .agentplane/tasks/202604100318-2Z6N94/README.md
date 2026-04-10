---
id: "202604100318-2Z6N94"
title: "Harden task lifecycle status handoff and reduce PR artifact duplication"
result_summary: "integrate: squash task/202604100318-2Z6N94/harden-task-lifecycle-status"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T03:18:30.497Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T08:42:21.429Z"
  updated_by: "CODER"
  note: "Verified branch_pr lifecycle handoff, auto-seeded Verify Steps generation, and PR artifact regressions against the updated contract."
commit:
  hash: "b82ccd2e4612bc85bf64140a9e955f50f0ebf66b"
  message: "🧹 2Z6N94 task: format lifecycle handoff files"
comments:
  -
    author: "CODER"
    body: "Start: harden branch_pr lifecycle status handoff by fixing default remote-check resolution, making hosted-close-pr recover without base-side pr metadata, and reducing duplicate GitHub PR body churn."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100318-2Z6N94/pr."
events:
  -
    type: "status"
    at: "2026-04-10T03:18:44.768Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden branch_pr lifecycle status handoff by fixing default remote-check resolution, making hosted-close-pr recover without base-side pr metadata, and reducing duplicate GitHub PR body churn."
  -
    type: "verify"
    at: "2026-04-10T03:29:50.776Z"
    author: "CODER"
    state: "ok"
    note: "Verified targeted regressions: wait-remote-checks default PR resolution, hosted-close-pr missing/stale pr metadata fallback, and slimmer GitHub PR body with preserved review.md detail."
  -
    type: "verify"
    at: "2026-04-10T08:26:35.484Z"
    author: "CODER"
    state: "ok"
    note: "Verified branch_pr lifecycle handoff, Verify Steps enforcement, and PR artifact regressions against the updated contract."
  -
    type: "verify"
    at: "2026-04-10T08:42:21.429Z"
    author: "CODER"
    state: "ok"
    note: "Verified branch_pr lifecycle handoff, auto-seeded Verify Steps generation, and PR artifact regressions against the updated contract."
  -
    type: "status"
    at: "2026-04-10T09:14:39.108Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100318-2Z6N94/pr."
doc_version: 3
doc_updated_at: "2026-04-10T09:14:39.114Z"
doc_updated_by: "INTEGRATOR"
description: "Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths."
sections:
  Summary: |-
    Harden task lifecycle status handoff and reduce PR artifact duplication
    
    Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.
  Scope: |-
    - In scope: Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.
    - Out of scope: unrelated refactors not required for "Harden task lifecycle status handoff and reduce PR artifact duplication".
  Plan: |-
    1. Reproduce and inspect the branch_pr status handoff path to isolate broken defaults in remote-check waiting and hosted-close recovery.
    2. Fix workflow:wait-remote-checks so it resolves the current PR deterministically when no explicit selector is passed.
    3. Relax hosted-close-pr metadata loading so remote task-close recovery works even when base-side pr/meta.json is missing but task/merge evidence is otherwise available.
    4. Reduce avoidable duplication in GitHub PR body generation while keeping local review.md as the detailed lifecycle artifact.
    5. Tighten lifecycle contract enforcement so scaffolded ## Verify Steps cannot survive into verifier-facing commands and recorded verification.
    6. Remove the placeholder source for newly scaffolded tasks so agent-created task docs always start with concrete Verify Steps, not TODO scaffolds.
    7. Add focused regression coverage for each repaired path and rerun the smallest sufficient workflow/CLI checks.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Expected: exit code 0 and no failing tests.
    2. Run bun test packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Expected: exit code 0 and no failing tests.
    3. Run bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing. Expected: all targeted Verify Steps lifecycle tests pass.
    4. Run git diff --check. Expected: no output.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T03:29:50.776Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified targeted regressions: wait-remote-checks default PR resolution, hosted-close-pr missing/stale pr metadata fallback, and slimmer GitHub PR body with preserved review.md detail.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T03:18:44.774Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    ### 2026-04-10T08:26:35.484Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified branch_pr lifecycle handoff, Verify Steps enforcement, and PR artifact regressions against the updated contract.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T08:24:57.430Z, excerpt_hash=sha256:fba46f9b9e70bed8d1849628fd8387e97431fd689d5ef5b314a23e496f72812f
    
    Details:
    
    Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts
    Result: pass
    Evidence: 62 pass, 0 fail.
    Scope: default PR resolution in wait-remote-checks, hosted-close-pr recovery paths, and branch_pr PR artifact generation/check flows.
    
    Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing'
    Result: pass
    Evidence: 4 files passed; 7 targeted tests passed, 0 failed.
    Scope: Verify Steps contract enforcement across shared validation, verify-show, verify-record, plan approval, and start gating.
    
    Command: git diff --check
    Result: pass
    Evidence: no output.
    Scope: whitespace and conflict-marker hygiene for the current diff.
    
    ### 2026-04-10T08:42:21.429Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified branch_pr lifecycle handoff, auto-seeded Verify Steps generation, and PR artifact regressions against the updated contract.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T08:41:45.213Z, excerpt_hash=sha256:c076171b79893b032bb13b0184f9c6ae095c19e588c2be8389da6acf6822b13d
    
    Details:
    
    Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts
    Result: pass
    Evidence: 62 pass, 0 fail.
    Scope: default PR resolution in wait-remote-checks, hosted-close-pr recovery paths, and branch_pr PR artifact generation/check flows.
    
    Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts
    Result: pass
    Evidence: 61 pass, 0 fail.
    Scope: task creation/scaffold/derive defaults plus lifecycle acceptance for freshly seeded Verify Steps.
    
    Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing'
    Result: pass
    Evidence: 4 files passed; 7 targeted tests passed, 0 failed.
    Scope: Verify Steps contract enforcement across shared validation, verify-show, verify-record, plan approval, and start gating.
    
    Command: git diff --check
    Result: pass
    Evidence: no output.
    Scope: whitespace and conflict-marker hygiene for the current diff.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden task lifecycle status handoff and reduce PR artifact duplication

Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.

## Scope

- In scope: Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.
- Out of scope: unrelated refactors not required for "Harden task lifecycle status handoff and reduce PR artifact duplication".

## Plan

1. Reproduce and inspect the branch_pr status handoff path to isolate broken defaults in remote-check waiting and hosted-close recovery.
2. Fix workflow:wait-remote-checks so it resolves the current PR deterministically when no explicit selector is passed.
3. Relax hosted-close-pr metadata loading so remote task-close recovery works even when base-side pr/meta.json is missing but task/merge evidence is otherwise available.
4. Reduce avoidable duplication in GitHub PR body generation while keeping local review.md as the detailed lifecycle artifact.
5. Tighten lifecycle contract enforcement so scaffolded ## Verify Steps cannot survive into verifier-facing commands and recorded verification.
6. Remove the placeholder source for newly scaffolded tasks so agent-created task docs always start with concrete Verify Steps, not TODO scaffolds.
7. Add focused regression coverage for each repaired path and rerun the smallest sufficient workflow/CLI checks.

## Verify Steps

1. Run bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Expected: exit code 0 and no failing tests.
2. Run bun test packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Expected: exit code 0 and no failing tests.
3. Run bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing. Expected: all targeted Verify Steps lifecycle tests pass.
4. Run git diff --check. Expected: no output.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T03:29:50.776Z — VERIFY — ok

By: CODER

Note: Verified targeted regressions: wait-remote-checks default PR resolution, hosted-close-pr missing/stale pr metadata fallback, and slimmer GitHub PR body with preserved review.md detail.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T03:18:44.774Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

### 2026-04-10T08:26:35.484Z — VERIFY — ok

By: CODER

Note: Verified branch_pr lifecycle handoff, Verify Steps enforcement, and PR artifact regressions against the updated contract.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T08:24:57.430Z, excerpt_hash=sha256:fba46f9b9e70bed8d1849628fd8387e97431fd689d5ef5b314a23e496f72812f

Details:

Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts
Result: pass
Evidence: 62 pass, 0 fail.
Scope: default PR resolution in wait-remote-checks, hosted-close-pr recovery paths, and branch_pr PR artifact generation/check flows.

Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing'
Result: pass
Evidence: 4 files passed; 7 targeted tests passed, 0 failed.
Scope: Verify Steps contract enforcement across shared validation, verify-show, verify-record, plan approval, and start gating.

Command: git diff --check
Result: pass
Evidence: no output.
Scope: whitespace and conflict-marker hygiene for the current diff.

### 2026-04-10T08:42:21.429Z — VERIFY — ok

By: CODER

Note: Verified branch_pr lifecycle handoff, auto-seeded Verify Steps generation, and PR artifact regressions against the updated contract.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T08:41:45.213Z, excerpt_hash=sha256:c076171b79893b032bb13b0184f9c6ae095c19e588c2be8389da6acf6822b13d

Details:

Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts
Result: pass
Evidence: 62 pass, 0 fail.
Scope: default PR resolution in wait-remote-checks, hosted-close-pr recovery paths, and branch_pr PR artifact generation/check flows.

Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts
Result: pass
Evidence: 61 pass, 0 fail.
Scope: task creation/scaffold/derive defaults plus lifecycle acceptance for freshly seeded Verify Steps.

Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing'
Result: pass
Evidence: 4 files passed; 7 targeted tests passed, 0 failed.
Scope: Verify Steps contract enforcement across shared validation, verify-show, verify-record, plan approval, and start gating.

Command: git diff --check
Result: pass
Evidence: no output.
Scope: whitespace and conflict-marker hygiene for the current diff.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
