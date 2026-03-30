---
id: "202603300819-J106PF"
title: "Reproduce and classify branch_pr base PR-artifact edge-case"
result_summary: "Merged via PR #37."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T08:20:46.954Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T11:50:50.171Z"
  updated_by: "CODER"
  note: "OK: agentplane help pr open --compact; rg --files .agentplane/tasks/202603300819-J106PF before and after work start; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr open 202603300819-J106PF --author CODER; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr update 202603300819-J106PF; reproduced pr check branch ambiguity with multiple local task branches and recorded the classification in Findings."
commit:
  hash: "603baf6c73d7504a91808454b01179d2af71b7d1"
  message: "🔍 workflow: classify pr artifact edge-case (#37)"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the branch_pr base-checkout PR artifact edge-case on a clean task path, trace the creation/update flow across task/work/pr commands, and classify whether the observed missing artifact state is a product bug, a workflow gap, or expected unsupported behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #37 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-03-30T09:08:57.969Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the branch_pr base-checkout PR artifact edge-case on a clean task path, trace the creation/update flow across task/work/pr commands, and classify whether the observed missing artifact state is a product bug, a workflow gap, or expected unsupported behavior."
  -
    type: "verify"
    at: "2026-03-30T11:50:50.171Z"
    author: "CODER"
    state: "ok"
    note: "OK: agentplane help pr open --compact; rg --files .agentplane/tasks/202603300819-J106PF before and after work start; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr open 202603300819-J106PF --author CODER; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr update 202603300819-J106PF; reproduced pr check branch ambiguity with multiple local task branches and recorded the classification in Findings."
  -
    type: "status"
    at: "2026-03-30T15:28:30.954Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #37 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-03-30T15:28:30.960Z"
doc_updated_by: "INTEGRATOR"
description: "Reproduce the scenario where a task created before work start appears to leave missing PR artifacts on the base checkout, then classify whether the issue is a product bug, an unsupported workflow path, or operator error before any functional fix lands."
sections:
  Summary: |-
    Reproduce and classify branch_pr base PR-artifact edge-case
    
    Reproduce the scenario where a task created before work start appears to leave missing PR artifacts on the base checkout, then classify whether the issue is a product bug, an unsupported workflow path, or operator error before any functional fix lands.
  Scope: |-
    - In scope: Reproduce the scenario where a task created before work start appears to leave missing PR artifacts on the base checkout, then classify whether the issue is a product bug, an unsupported workflow path, or operator error before any functional fix lands.
    - Out of scope: unrelated refactors not required for "Reproduce and classify branch_pr base PR-artifact edge-case".
  Plan: |-
    1. Reproduce the exact sequence where a task is created before work start and then appears to leave missing PR artifacts on the base checkout.
    2. Classify the outcome as a product bug, unsupported workflow path, or operator error using repository code, artifacts, and command contracts.
    3. Record the classification and, only if warranted, propose or queue a narrow follow-up fix.
  Verify Steps: |-
    1. Reproduce the scenario from a clean repository state. Expected: the exact artifact state and command outputs are captured.
    2. Inspect the resulting base checkout and task branch artifacts. Expected: the root cause is classified as bug, unsupported path, or operator error.
    3. Record the classification in the task README. Expected: a narrow next step is explicit and no speculative fix is shipped without evidence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T11:50:50.171Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: agentplane help pr open --compact; rg --files .agentplane/tasks/202603300819-J106PF before and after work start; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr open 202603300819-J106PF --author CODER; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr update 202603300819-J106PF; reproduced pr check branch ambiguity with multiple local task branches and recorded the classification in Findings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T09:08:57.972Z, excerpt_hash=sha256:069baff2edfa6220e461a539013bc76d6d63446d08ebbb756b3661418bdd14ef
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Confirmed contract: `agentplane help pr open --compact` defines `pr open` as the command that creates PR artifacts, and `packages/agentplane/src/commands/branch/work-start.ts` does not create `.agentplane/tasks/<task-id>/pr/*`.
    - Confirmed expected behavior: after `task start-ready` + `work start --worktree`, both base checkout and the fresh task worktree contained only `README.md` for `202603300819-J106PF`; the absence of `pr/` at that point is not a product bug.
    - Confirmed defect: `packages/agentplane/src/commands/pr/check.ts` resolves matching task branches before attempting to read local PR artifacts. When more than one local branch matches the same task id, `pr check` fails with `Multiple task branches match ...` even inside the active task worktree where local `pr/meta.json` and `pr/review.md` already exist.
    - Confirmed trigger: repeated local `work start` runs with different slugs can leave multiple `task/<task-id>/...` branches (`branch-pr-artifact-edge-case` and `pr-artifact-edge-case` in this reproduction), which is enough to trip the current `pr check` branch-resolution order.
    - Classification: the original "missing PR artifacts on base checkout after task creation/work start" report is an expectation mismatch; the actionable bug is `pr check` not preferring local artifacts before branch disambiguation fallback.
id_source: "generated"
---
## Summary

Reproduce and classify branch_pr base PR-artifact edge-case

Reproduce the scenario where a task created before work start appears to leave missing PR artifacts on the base checkout, then classify whether the issue is a product bug, an unsupported workflow path, or operator error before any functional fix lands.

## Scope

- In scope: Reproduce the scenario where a task created before work start appears to leave missing PR artifacts on the base checkout, then classify whether the issue is a product bug, an unsupported workflow path, or operator error before any functional fix lands.
- Out of scope: unrelated refactors not required for "Reproduce and classify branch_pr base PR-artifact edge-case".

## Plan

1. Reproduce the exact sequence where a task is created before work start and then appears to leave missing PR artifacts on the base checkout.
2. Classify the outcome as a product bug, unsupported workflow path, or operator error using repository code, artifacts, and command contracts.
3. Record the classification and, only if warranted, propose or queue a narrow follow-up fix.

## Verify Steps

1. Reproduce the scenario from a clean repository state. Expected: the exact artifact state and command outputs are captured.
2. Inspect the resulting base checkout and task branch artifacts. Expected: the root cause is classified as bug, unsupported path, or operator error.
3. Record the classification in the task README. Expected: a narrow next step is explicit and no speculative fix is shipped without evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T11:50:50.171Z — VERIFY — ok

By: CODER

Note: OK: agentplane help pr open --compact; rg --files .agentplane/tasks/202603300819-J106PF before and after work start; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr open 202603300819-J106PF --author CODER; AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane pr update 202603300819-J106PF; reproduced pr check branch ambiguity with multiple local task branches and recorded the classification in Findings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T09:08:57.972Z, excerpt_hash=sha256:069baff2edfa6220e461a539013bc76d6d63446d08ebbb756b3661418bdd14ef

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Confirmed contract: `agentplane help pr open --compact` defines `pr open` as the command that creates PR artifacts, and `packages/agentplane/src/commands/branch/work-start.ts` does not create `.agentplane/tasks/<task-id>/pr/*`.
- Confirmed expected behavior: after `task start-ready` + `work start --worktree`, both base checkout and the fresh task worktree contained only `README.md` for `202603300819-J106PF`; the absence of `pr/` at that point is not a product bug.
- Confirmed defect: `packages/agentplane/src/commands/pr/check.ts` resolves matching task branches before attempting to read local PR artifacts. When more than one local branch matches the same task id, `pr check` fails with `Multiple task branches match ...` even inside the active task worktree where local `pr/meta.json` and `pr/review.md` already exist.
- Confirmed trigger: repeated local `work start` runs with different slugs can leave multiple `task/<task-id>/...` branches (`branch-pr-artifact-edge-case` and `pr-artifact-edge-case` in this reproduction), which is enough to trip the current `pr check` branch-resolution order.
- Classification: the original "missing PR artifacts on base checkout after task creation/work start" report is an expectation mismatch; the actionable bug is `pr check` not preferring local artifacts before branch disambiguation fallback.
