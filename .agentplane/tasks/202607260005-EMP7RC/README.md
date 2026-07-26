---
id: "202607260005-EMP7RC"
title: "Reconcile provider-rebased protected PR heads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "correctness"
  - "provider"
  - "rebase"
  - "reconciliation"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "A stale local task head is never published, force-pushed, or used for cleanup when provider head differs."
  - "Merged cleanup still requires task identity and branch/worktree guards."
  - "Remote rebase lineage is proven before any route treats provider head as reconciled."
  - "Unknown, changed, unrelated, or unavailable provider truth fails closed with an explicit diagnostic route."
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T00:07:08.073Z"
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
    body: "Start: implement only the approved provider-rebase reconciliation contract; no worktree, code, or PR is created by this planning checkpoint."
events:
  -
    type: "status"
    at: "2026-07-26T00:07:17.694Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement only the approved provider-rebase reconciliation contract; no worktree, code, or PR is created by this planning checkpoint."
doc_version: 3
doc_updated_at: "2026-07-26T00:07:17.694Z"
doc_updated_by: "CODER"
description: "Correct branch_pr reconciliation after a protected provider rebases a verified PR: reconcile remote provider truth with a stale local task head without publishing or deleting from uncertain lineage. Current incident: ZMV 202607252051-ZMVZRZ local d61ab0f55d1c122e5acbaf2a296e2ff508e87b55 versus provider-rebased 2a6d152b87666912d189304c4a6084eccaaff262, merged as main e27c938698668ce242243d166f8c7c1b64cce88f."
sections:
  Summary: "Correct a branch_pr recovery gap after a protected provider rebases a verified task PR. The CLI must reconcile proven provider truth with a stale local task head without republishing the stale commit or weakening branch/worktree cleanup safety."
  Scope: "In scope: provider snapshot and lineage proof, route and integration reconciliation, hosted-close and cleanup handoff guards, task-local evidence, and focused regressions. Current concrete regression: ZMV 202607252051-ZMVZRZ had local head d61ab0f55d1c122e5acbaf2a296e2ff508e87b55 while GitHub provider head was 2a6d152b87666912d189304c4a6084eccaaff262; the protected PR merged as main e27c938698668ce242243d166f8c7c1b64cce88f. Out of scope: semantic conflict resolution, automatic rebase, raw Git rewrite, automatic force-push, direct provider merge, or loosening any cleanup refusal."
  Plan: |-
    1. Map the branch_pr route and artifact boundaries for provider snapshots, pre-merge closure, integration handoff, hosted close, and cleanup merged; record the ZMV regression exactly: local d61ab0f55d1c122e5acbaf2a296e2ff508e87b55 versus provider-rebased 2a6d152b87666912d189304c4a6084eccaaff262, merged as main e27c938698668ce242243d166f8c7c1b64cce88f.
    2. Introduce a typed reconciliation proof that binds task identity, PR identity, local task head, provider head, base or merge identity, and pre-merge closure evidence; treat the provider as authoritative only when that proof is complete and current.
    3. For a proven provider rebase or provider merge, emit a reconciliation or hosted-close route that never offers pr open, pr update, force-push, raw rebase, or cleanup from the stale local head.
    4. For absent, changed, unrelated, unverifiable, or stale provider truth, fail closed with a diagnostic route; preserve all branch, worktree, and remote state for explicit rework.
    5. Keep cleanup merged guarded by proven task identity and by dirty, current-worktree, outside-root, expected-head, and provider-head checks; do not weaken any existing refusal.
    6. Add focused regression coverage for the ZMV topology, stale-local-head non-publication, unrelated or changed provider head, unavailable provider truth, provider-merge close reconciliation, and retained cleanup refusals.
    7. Run the acceptance suite, static checks, lifecycle and routing checks, record quality evidence, then use the normal branch_pr PR and integration route.
  Verify Steps: |-
    1. Model the ZMV topology and prove that a current provider-rebased head with matching task, PR, and closure lineage returns a reconciliation or hosted-close route, never a stale pr open, pr update, force-push, raw rebase, or stale-head cleanup route.
    2. Prove an unrelated PR, changed provider head, missing closure evidence, unavailable provider lookup, or stale snapshot fails closed and leaves branch, worktree, remote ref, and cleanup untouched.
    3. Prove the stale local head cannot overwrite the provider head through any CLI-suggested publication path.
    4. Prove cleanup after a proven provider merge still enforces task identity plus dirty, current-worktree, outside-root, expected-head, and provider-head guards.
    5. Run focused reconciliation and cleanup regressions; bun run typecheck; bun run lint:core; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; agentplane doctor; and git diff --check.
    6. Record independent TESTER and EVALUATOR evidence, wait for stable hosted checks, and use only the normal branch_pr integration route.
  Verification: "Required evidence: focused test names and results; before and after route packets; immutable task, PR, local-head, provider-head, base or merge, and closure identities; static and lifecycle check output; independent TESTER verdict; EVALUATOR review of provenance and refusal behavior; stable hosted PR checks. Any provider snapshot change invalidates prior evidence and requires recomputation."
  Rollback Plan: "Revert only the bounded reconciliation change in a new normal branch_pr task or follow-up, preserving task artifacts and the pre-existing fail-closed route. Never restore or align a remote branch with a raw force-push. If provider truth changes, proof is incomplete, or cleanup reports dirty or identity mismatch, stop, preserve all state, and return the diagnostic route for human or agent rework."
  Findings: "Current incident rule: ZMV 202607252051-ZMVZRZ reached a verified provider-rebased head 2a6d152b87666912d189304c4a6084eccaaff262 while its local task worktree remained at d61ab0f55d1c122e5acbaf2a296e2ff508e87b55. The provider merged that PR as main e27c938698668ce242243d166f8c7c1b64cce88f. A stale local-versus-provider mismatch is not permission to republish, force-push, delete, or clean; only current immutable lineage proof may advance reconciliation."
extensions:
  workflow_route_baseline:
    start_head_sha: "e27c938698668ce242243d166f8c7c1b64cce88f"
    version: 1
id_source: "generated"
---
## Summary

Correct a branch_pr recovery gap after a protected provider rebases a verified task PR. The CLI must reconcile proven provider truth with a stale local task head without republishing the stale commit or weakening branch/worktree cleanup safety.

## Scope

In scope: provider snapshot and lineage proof, route and integration reconciliation, hosted-close and cleanup handoff guards, task-local evidence, and focused regressions. Current concrete regression: ZMV 202607252051-ZMVZRZ had local head d61ab0f55d1c122e5acbaf2a296e2ff508e87b55 while GitHub provider head was 2a6d152b87666912d189304c4a6084eccaaff262; the protected PR merged as main e27c938698668ce242243d166f8c7c1b64cce88f. Out of scope: semantic conflict resolution, automatic rebase, raw Git rewrite, automatic force-push, direct provider merge, or loosening any cleanup refusal.

## Plan

1. Map the branch_pr route and artifact boundaries for provider snapshots, pre-merge closure, integration handoff, hosted close, and cleanup merged; record the ZMV regression exactly: local d61ab0f55d1c122e5acbaf2a296e2ff508e87b55 versus provider-rebased 2a6d152b87666912d189304c4a6084eccaaff262, merged as main e27c938698668ce242243d166f8c7c1b64cce88f.
2. Introduce a typed reconciliation proof that binds task identity, PR identity, local task head, provider head, base or merge identity, and pre-merge closure evidence; treat the provider as authoritative only when that proof is complete and current.
3. For a proven provider rebase or provider merge, emit a reconciliation or hosted-close route that never offers pr open, pr update, force-push, raw rebase, or cleanup from the stale local head.
4. For absent, changed, unrelated, unverifiable, or stale provider truth, fail closed with a diagnostic route; preserve all branch, worktree, and remote state for explicit rework.
5. Keep cleanup merged guarded by proven task identity and by dirty, current-worktree, outside-root, expected-head, and provider-head checks; do not weaken any existing refusal.
6. Add focused regression coverage for the ZMV topology, stale-local-head non-publication, unrelated or changed provider head, unavailable provider truth, provider-merge close reconciliation, and retained cleanup refusals.
7. Run the acceptance suite, static checks, lifecycle and routing checks, record quality evidence, then use the normal branch_pr PR and integration route.

## Verify Steps

1. Model the ZMV topology and prove that a current provider-rebased head with matching task, PR, and closure lineage returns a reconciliation or hosted-close route, never a stale pr open, pr update, force-push, raw rebase, or stale-head cleanup route.
2. Prove an unrelated PR, changed provider head, missing closure evidence, unavailable provider lookup, or stale snapshot fails closed and leaves branch, worktree, remote ref, and cleanup untouched.
3. Prove the stale local head cannot overwrite the provider head through any CLI-suggested publication path.
4. Prove cleanup after a proven provider merge still enforces task identity plus dirty, current-worktree, outside-root, expected-head, and provider-head guards.
5. Run focused reconciliation and cleanup regressions; bun run typecheck; bun run lint:core; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; agentplane doctor; and git diff --check.
6. Record independent TESTER and EVALUATOR evidence, wait for stable hosted checks, and use only the normal branch_pr integration route.

## Verification

Required evidence: focused test names and results; before and after route packets; immutable task, PR, local-head, provider-head, base or merge, and closure identities; static and lifecycle check output; independent TESTER verdict; EVALUATOR review of provenance and refusal behavior; stable hosted PR checks. Any provider snapshot change invalidates prior evidence and requires recomputation.

## Rollback Plan

Revert only the bounded reconciliation change in a new normal branch_pr task or follow-up, preserving task artifacts and the pre-existing fail-closed route. Never restore or align a remote branch with a raw force-push. If provider truth changes, proof is incomplete, or cleanup reports dirty or identity mismatch, stop, preserve all state, and return the diagnostic route for human or agent rework.

## Findings

Current incident rule: ZMV 202607252051-ZMVZRZ reached a verified provider-rebased head 2a6d152b87666912d189304c4a6084eccaaff262 while its local task worktree remained at d61ab0f55d1c122e5acbaf2a296e2ff508e87b55. The provider merged that PR as main e27c938698668ce242243d166f8c7c1b64cce88f. A stale local-versus-provider mismatch is not permission to republish, force-push, delete, or clean; only current immutable lineage proof may advance reconciliation.
