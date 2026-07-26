---
id: "202607260532-9M7RNH"
title: "Recover stale protected-PR conflict-base context"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "conflict-rework"
  - "corrective"
  - "milestone-alpha2"
  - "provider"
  - "refactor"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "agentplane doctor"
  - "bun run lint:core"
  - "bun run typecheck"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T05:34:00.985Z"
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
    at: "2026-07-26T05:34:28.944Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-26T05:34:28.944Z"
doc_updated_by: "CODER"
description: "Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations."
sections:
  Summary: |-
    Recover stale protected-PR conflict-base context

    Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
  Scope: |-
    - In scope: Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
    - Out of scope: unrelated refactors not required for "Recover stale protected-PR conflict-base context".
  Plan: |-
    1. Capture live provider conflict identity, the provider conflict-base snapshot, current main head, branch/head/worktree evidence, and the exact ancestry relation.
    2. Define a bounded read-only reconciliation packet that distinguishes provider conflict-base from current base and includes a freshness token plus a local conflict probe.
    3. Route only eligible ancestor-drift cases to CODER semantic rework; retain fail-closed stops for unknown, non-ancestor, divergent, unavailable, dirty, or identity-mismatched state.
    4. Preserve the invariant that CLI preparation performs no rebase, merge, push, queue, cleanup, or task-state mutation.
    5. Add regression coverage for the THDN legacy topology: missing provider_base_sha, released handoff, DQM advancing main, and GitHub retaining an older conflict-base snapshot.
    6. Run focused route/packet tests, typecheck, lint, guards, lifecycle invariants, routing check, doctor, and diff check; record independent evaluation and stable hosted CI before normal queue integration.
  Verify Steps: |-
    1. Model a provider-reported OPEN protected-PR conflict whose provider base snapshot is an ancestor of current main. Expected: route returns a bounded read-only reconciliation packet containing provider conflict-base, current base, ancestry relation, local merge-base and candidate paths, and a freshness token.
    2. Model the THDN legacy topology: old handoff without provider_base_sha, queue entry released to rework, DQM merged so main advanced, and GitHub still reporting the older conflict-base. Expected: the route becomes eligible only after all live identities and the local probe are coherent; preparation does not mutate branch, worktree, queue, PR, provider, or task state.
    3. Prove fail-closed behavior for provider unavailable or mergeability unknown, missing/mismatched PR head or branch, current base not descending from provider conflict-base, unavailable merge-base/diff probe, dirty or missing worktree, and changed freshness inputs.
    4. Prove clean and current-base conflict routes preserve existing DQM behavior without weakening their identity guards.
    5. Run focused conflict-rework and route tests, bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, agentplane doctor, and git diff --check.
    6. Record independent TESTER and EVALUATOR evidence; wait for stable hosted CI before normal branch_pr integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0434d56b52cf40b9f2d8c1f4d35319d23261ffbb"
    version: 1
id_source: "generated"
---
## Summary

Recover stale protected-PR conflict-base context

Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.

## Scope

- In scope: Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
- Out of scope: unrelated refactors not required for "Recover stale protected-PR conflict-base context".

## Plan

1. Capture live provider conflict identity, the provider conflict-base snapshot, current main head, branch/head/worktree evidence, and the exact ancestry relation.
2. Define a bounded read-only reconciliation packet that distinguishes provider conflict-base from current base and includes a freshness token plus a local conflict probe.
3. Route only eligible ancestor-drift cases to CODER semantic rework; retain fail-closed stops for unknown, non-ancestor, divergent, unavailable, dirty, or identity-mismatched state.
4. Preserve the invariant that CLI preparation performs no rebase, merge, push, queue, cleanup, or task-state mutation.
5. Add regression coverage for the THDN legacy topology: missing provider_base_sha, released handoff, DQM advancing main, and GitHub retaining an older conflict-base snapshot.
6. Run focused route/packet tests, typecheck, lint, guards, lifecycle invariants, routing check, doctor, and diff check; record independent evaluation and stable hosted CI before normal queue integration.

## Verify Steps

1. Model a provider-reported OPEN protected-PR conflict whose provider base snapshot is an ancestor of current main. Expected: route returns a bounded read-only reconciliation packet containing provider conflict-base, current base, ancestry relation, local merge-base and candidate paths, and a freshness token.
2. Model the THDN legacy topology: old handoff without provider_base_sha, queue entry released to rework, DQM merged so main advanced, and GitHub still reporting the older conflict-base. Expected: the route becomes eligible only after all live identities and the local probe are coherent; preparation does not mutate branch, worktree, queue, PR, provider, or task state.
3. Prove fail-closed behavior for provider unavailable or mergeability unknown, missing/mismatched PR head or branch, current base not descending from provider conflict-base, unavailable merge-base/diff probe, dirty or missing worktree, and changed freshness inputs.
4. Prove clean and current-base conflict routes preserve existing DQM behavior without weakening their identity guards.
5. Run focused conflict-rework and route tests, bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, agentplane doctor, and git diff --check.
6. Record independent TESTER and EVALUATOR evidence; wait for stable hosted CI before normal branch_pr integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
