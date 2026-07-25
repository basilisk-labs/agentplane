---
id: "202607252215-SNV847"
title: "Repair stale runner reclaim regression fixture"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
tags:
  - "regression"
  - "runner"
  - "workflow"
  - "v0.7"
  - "milestone-alpha2"
  - "correctness"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun test packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:22:49.044Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T22:16:38.221Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-25T22:29:38.583Z"
doc_updated_by: "CODER"
description: "Replace the invalid synthetic running-runner fixture with a real stale active-run claim scenario, preserving fail-closed behavior for unclaimed synthetic running state and covering cancellation, claim cleanup, handoff, and retry routing."
sections:
  Summary: |-
    Repair stale runner reclaim regression fixture

    Replace the invalid synthetic running-runner fixture with a real stale active-run claim scenario, preserving fail-closed behavior for unclaimed synthetic running state and covering cancellation, claim cleanup, handoff, and retry routing.
  Scope: |-
    - In scope: repair only the stale-runner reclaim test fixture and assertions in the handoff/lifecycle test surface; preserve the hardened stale-active-claim and confirmed-absent-child requirements; record this repair as a v0.7 alpha.2 release-gate dependency so qualification cannot pass with this regression red.
    - Out of scope: weakening the orphan-cancellation guard, changing production cancellation policy, or unrelated runner refactors.
  Plan: |-
    1. Record the v0.7, milestone-alpha2, correctness, regression, runner, and workflow tags; keep 202607221846-9XC1H0 as the sole technical prerequisite and add this task to the 0.7.0-alpha.2 fan-in.
    2. Inspect the handoff fixture and stale-claim cancellation guard without relaxing the requirement for a stale active claim and confirmed absent owner or child.
    3. Replace the invalid synthetic running setup with an execute-mode prepared-to-running scenario carrying a real stale active-run claim.
    4. Assert reclaim terminalizes as cancelled, removes the claim, records a handoff, and routes retry.
    5. Add a negative case proving an unclaimed synthetic running state remains fail-closed without terminalization or handoff.
    6. Run the focused handoff and stale-claim recovery tests plus type, lint, policy, lifecycle, and diff checks; record release-gate evidence and residual risk.
  Verify Steps: |-
    1. Positive reclaim fixture: a real stale claimed runner is cancelled, its active-run claim is removed, a handoff is written, and retry routing is emitted.
    2. Negative fixture: synthetic running state without a claim remains non-terminal and creates no handoff.
    3. Existing stale-claim recovery coverage still passes.
    4. Release-gate wiring: SNV847 carries v0.7 and milestone-alpha2 tags, has 202607221846-9XC1H0 as its only technical dependency, and is listed in 202607221908-9M2FBQ fan-in.
    5. Run bun test packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, and git diff --check. Expected: all pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit. This restores the former fixture only; it must not relax the production orphan-cancellation guard. Re-run the focused handoff test and lifecycle invariants after rollback."
  Findings: |-
    Root cause: the prior handoff test rewrote a dry-run artifact to running without active-run-claim.json. The hardened orphan-recovery guard correctly rejects that synthetic state; production cancellation policy was not changed.

    - Command: `bun test packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`
      Result: pass.
      Evidence: 4 tests passed, including a claimed execute-mode reclaim and an unclaimed fail-closed reclaim.
      Scope: handoff/reclaim fixture and assertions.
    - Command: `bun test packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts`
      Result: pass.
      Evidence: 15 tests passed, including stale-running claim recovery after confirmed child absence.
      Scope: existing stale-claim cancellation behavior.
    - Command: `bun run typecheck`, `bun run lint:core`, `bun run lifecycle:invariants`, `node .agentplane/policy/check-routing.mjs`, `git diff --check`
      Result: pass.
      Evidence: typecheck and lint exited 0; lifecycle reported 8 invariants; policy routing OK; diff check clean.
      Scope: repository type, lint, lifecycle, policy, and patch whitespace checks.
    - Release-gate wiring: SNV847 has v0.7 and milestone-alpha2 tags, only 202607221846-9XC1H0 as technical dependency, and is a dependency of alpha.2 fan-in 202607221908-9M2FBQ.
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Repair stale runner reclaim regression fixture

Replace the invalid synthetic running-runner fixture with a real stale active-run claim scenario, preserving fail-closed behavior for unclaimed synthetic running state and covering cancellation, claim cleanup, handoff, and retry routing.

## Scope

- In scope: repair only the stale-runner reclaim test fixture and assertions in the handoff/lifecycle test surface; preserve the hardened stale-active-claim and confirmed-absent-child requirements; record this repair as a v0.7 alpha.2 release-gate dependency so qualification cannot pass with this regression red.
- Out of scope: weakening the orphan-cancellation guard, changing production cancellation policy, or unrelated runner refactors.

## Plan

1. Record the v0.7, milestone-alpha2, correctness, regression, runner, and workflow tags; keep 202607221846-9XC1H0 as the sole technical prerequisite and add this task to the 0.7.0-alpha.2 fan-in.
2. Inspect the handoff fixture and stale-claim cancellation guard without relaxing the requirement for a stale active claim and confirmed absent owner or child.
3. Replace the invalid synthetic running setup with an execute-mode prepared-to-running scenario carrying a real stale active-run claim.
4. Assert reclaim terminalizes as cancelled, removes the claim, records a handoff, and routes retry.
5. Add a negative case proving an unclaimed synthetic running state remains fail-closed without terminalization or handoff.
6. Run the focused handoff and stale-claim recovery tests plus type, lint, policy, lifecycle, and diff checks; record release-gate evidence and residual risk.

## Verify Steps

1. Positive reclaim fixture: a real stale claimed runner is cancelled, its active-run claim is removed, a handoff is written, and retry routing is emitted.
2. Negative fixture: synthetic running state without a claim remains non-terminal and creates no handoff.
3. Existing stale-claim recovery coverage still passes.
4. Release-gate wiring: SNV847 carries v0.7 and milestone-alpha2 tags, has 202607221846-9XC1H0 as its only technical dependency, and is listed in 202607221908-9M2FBQ fan-in.
5. Run bun test packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, and git diff --check. Expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit. This restores the former fixture only; it must not relax the production orphan-cancellation guard. Re-run the focused handoff test and lifecycle invariants after rollback.

## Findings

Root cause: the prior handoff test rewrote a dry-run artifact to running without active-run-claim.json. The hardened orphan-recovery guard correctly rejects that synthetic state; production cancellation policy was not changed.

- Command: `bun test packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`
  Result: pass.
  Evidence: 4 tests passed, including a claimed execute-mode reclaim and an unclaimed fail-closed reclaim.
  Scope: handoff/reclaim fixture and assertions.
- Command: `bun test packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts`
  Result: pass.
  Evidence: 15 tests passed, including stale-running claim recovery after confirmed child absence.
  Scope: existing stale-claim cancellation behavior.
- Command: `bun run typecheck`, `bun run lint:core`, `bun run lifecycle:invariants`, `node .agentplane/policy/check-routing.mjs`, `git diff --check`
  Result: pass.
  Evidence: typecheck and lint exited 0; lifecycle reported 8 invariants; policy routing OK; diff check clean.
  Scope: repository type, lint, lifecycle, policy, and patch whitespace checks.
- Release-gate wiring: SNV847 has v0.7 and milestone-alpha2 tags, only 202607221846-9XC1H0 as technical dependency, and is a dependency of alpha.2 fan-in 202607221908-9M2FBQ.
