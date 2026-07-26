---
id: "202607260005-EMP7RC"
title: "Reconcile provider-rebased protected PR heads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 17
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
  state: "ok"
  updated_at: "2026-07-26T01:50:17.608Z"
  updated_by: "TESTER"
  note: "Independent TESTER PASS at 3ad3880: 35 focused and 23 cli-core tests pass; 20/20 proof-identity matrix rejects symbolic, short, malformed, and local blob values; ZMV dry-run remains proof=provider_rebase and remote route is sync_hosted_close; all declared local gates pass; DQM6AW remains unstaged."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T01:59:56.980Z"
  updated_by: "EVALUATOR"
  note: "Reject at 3ad3880: task-branch identities are now fail-closed, but a canonical non-commit provider head still authorizes task-close cleanup."
  evaluated_sha: "3ad3880cbf9ba8496100cdd82bbb24f0086641f0"
  blueprint_digest: "6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137"
  evidence_refs:
    - ".agentplane/tasks/202607260005-EMP7RC/README.md"
    - ".agentplane/tasks/202607260005-EMP7RC/quality/20260726-015956980-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607260005-EMP7RC/quality/20260726-015956980-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607260005-EMP7RC/quality/20260726-015956980-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged-proof.ts"
    - "bun -e ZMV identity matrix: task/local/closure/provider/merge blob and cross-field variants rejected; providerHeadBlobReceipt accepted blob 2f443825e19e8c531d1802d593e6dc59ac7e40af"
    - "bunx vitest cleanup-merged.targeted.test.ts: 17 passed"
    - "bunx vitest route-decision-next-action.test.ts close-tail-state.test.ts: 18 passed"
    - "git diff --check main...HEAD: pass"
  findings:
    - "validateMergedProviderReceipt accepts the real local blob 2f443825e19e8c531d1802d593e6dc59ac7e40af as providerHeadSha when mergeCommit is valid; gitCommitObjectExists confirms that OID is not a commit."
    - "targetedCleanupProof returns proof=provider_merge for a found task-close provider receipt without resolveProviderReconciliation, so this accepted blob bypasses the new provider-head object gate and can authorize cleanup."
    - "Cross-field substitutions and non-commit blobs for all five identities correctly fail in resolveProviderReconciliation on the real ZMV d61ab0f->2a6d152->e27c938 topology; the remaining gap is the task-close receipt-only lane."
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
  -
    type: "verify"
    at: "2026-07-26T00:48:39.908Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Provider rebase proof is directional and accepts provider-only patches."
  -
    type: "verify"
    at: "2026-07-26T00:59:01.831Z"
    author: "TESTER"
    state: "ok"
    note: "Independent re-verification passed: provider-only extra-patch refusal; exact-head and ZMV provider-rebase positives; identity, base, closure, unavailable, and race refusals; cleanup safeguards and route priority. Focused suites 26 plus 23 passed; typecheck, lint, guards, lifecycle, routing, doctor, diff check passed; live ZMV dry run reported proof=provider_rebase without cleanup."
  -
    type: "verify"
    at: "2026-07-26T01:22:27.984Z"
    author: "TESTER"
    state: "ok"
    note: "Independent re-verification passed: full canonical OID gate rejects main, short SHA, refs, and malformed provider identities before Git revision use; each negative reports cleanup_blocked with no command and preserves branch/worktree. Symmetric provider-patch and race coverage remains green; focused suites 27 plus 23 passed; static checks passed; live ZMV dry run reported proof=provider_rebase without cleanup."
  -
    type: "verify"
    at: "2026-07-26T01:50:17.608Z"
    author: "TESTER"
    state: "ok"
    note: "Independent TESTER PASS at 3ad3880: 35 focused and 23 cli-core tests pass; 20/20 proof-identity matrix rejects symbolic, short, malformed, and local blob values; ZMV dry-run remains proof=provider_rebase and remote route is sync_hosted_close; all declared local gates pass; DQM6AW remains unstaged."
doc_version: 3
doc_updated_at: "2026-07-26T01:50:18.330Z"
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
  Verification: |-
    Required evidence: focused test names and results; before and after route packets; immutable task, PR, local-head, provider-head, base or merge, and closure identities; static and lifecycle check output; independent TESTER verdict; EVALUATOR review of provenance and refusal behavior; stable hosted PR checks. Any provider snapshot change invalidates prior evidence and requires recomputation.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T00:48:39.908Z — VERIFY — needs_rework

    By: TESTER

    Note: Provider rebase proof is directional and accepts provider-only patches.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:07:17.694Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
    - old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607260005-EMP7RC --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-26T00:59:01.831Z — VERIFY — ok

    By: TESTER

    Note: Independent re-verification passed: provider-only extra-patch refusal; exact-head and ZMV provider-rebase positives; identity, base, closure, unavailable, and race refusals; cleanup safeguards and route priority. Focused suites 26 plus 23 passed; typecheck, lint, guards, lifecycle, routing, doctor, diff check passed; live ZMV dry run reported proof=provider_rebase without cleanup.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:48:40.630Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
    - old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T01:22:27.984Z — VERIFY — ok

    By: TESTER

    Note: Independent re-verification passed: full canonical OID gate rejects main, short SHA, refs, and malformed provider identities before Git revision use; each negative reports cleanup_blocked with no command and preserves branch/worktree. Symmetric provider-patch and race coverage remains green; focused suites 27 plus 23 passed; static checks passed; live ZMV dry run reported proof=provider_rebase without cleanup.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:59:02.533Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
    - old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607260005-EMP7RC --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-26T01:50:17.608Z — VERIFY — ok

    By: TESTER

    Note: Independent TESTER PASS at 3ad3880: 35 focused and 23 cli-core tests pass; 20/20 proof-identity matrix rejects symbolic, short, malformed, and local blob values; ZMV dry-run remains proof=provider_rebase and remote route is sync_hosted_close; all declared local gates pass; DQM6AW remains unstaged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T01:22:28.745Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
    - old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607260005-EMP7RC --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the bounded reconciliation change in a new normal branch_pr task or follow-up, preserving task artifacts and the pre-existing fail-closed route. Never restore or align a remote branch with a raw force-push. If provider truth changes, proof is incomplete, or cleanup reports dirty or identity mismatch, stop, preserve all state, and return the diagnostic route for human or agent rework."
  Findings: |-
    Current incident rule: ZMV 202607252051-ZMVZRZ reached a verified provider-rebased head 2a6d152b87666912d189304c4a6084eccaaff262 while its local task worktree remained at d61ab0f55d1c122e5acbaf2a296e2ff508e87b55. The provider merged that PR as main e27c938698668ce242243d166f8c7c1b64cce88f. A stale local-versus-provider mismatch is not permission to republish, force-push, delete, or clean; only current immutable lineage proof may advance reconciliation.

    - Observation: resolveProviderReconciliation calls git cherry with providerHead as upstream and stale local head as head; it confirms only that local patches occur in provider history.
      Impact: A merged PR whose provider head contains the local task patch plus an unrelated extra patch is classified provider_rebase_equivalent, so changed provider truth does not fail closed before cleanup routing.
      Resolution: Require symmetric patch-set equivalence or an equally strict provider-only patch rejection; add a regression fixture with one extra provider-only commit and preserve the branch/worktree on refusal.
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T00:48:39.908Z — VERIFY — needs_rework

By: TESTER

Note: Provider rebase proof is directional and accepts provider-only patches.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:07:17.694Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
- old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607260005-EMP7RC --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-26T00:59:01.831Z — VERIFY — ok

By: TESTER

Note: Independent re-verification passed: provider-only extra-patch refusal; exact-head and ZMV provider-rebase positives; identity, base, closure, unavailable, and race refusals; cleanup safeguards and route priority. Focused suites 26 plus 23 passed; typecheck, lint, guards, lifecycle, routing, doctor, diff check passed; live ZMV dry run reported proof=provider_rebase without cleanup.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:48:40.630Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
- old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T01:22:27.984Z — VERIFY — ok

By: TESTER

Note: Independent re-verification passed: full canonical OID gate rejects main, short SHA, refs, and malformed provider identities before Git revision use; each negative reports cleanup_blocked with no command and preserves branch/worktree. Symmetric provider-patch and race coverage remains green; focused suites 27 plus 23 passed; static checks passed; live ZMV dry run reported proof=provider_rebase without cleanup.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:59:02.533Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
- old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607260005-EMP7RC --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-26T01:50:17.608Z — VERIFY — ok

By: TESTER

Note: Independent TESTER PASS at 3ad3880: 35 focused and 23 cli-core tests pass; 20/20 proof-identity matrix rejects symbolic, short, malformed, and local blob values; ZMV dry-run remains proof=provider_rebase and remote route is sync_hosted_close; all declared local gates pass; DQM6AW remains unstaged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T01:22:28.745Z, excerpt_hash=sha256:33d33231218817701b0c2d10cb38000624bc73c9de998eeabad5f9c2a37ab551

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260005-EMP7RC-reconcile-provider-rebased-protected-pr-heads/.agentplane/tasks/202607260005-EMP7RC/blueprint/resolved-snapshot.json
- old_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- current_digest: 6b380a98fe0abdbd235781627fa5549fa33d03fa784c92e76db15f288659a137
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260005-EMP7RC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607260005-EMP7RC --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the bounded reconciliation change in a new normal branch_pr task or follow-up, preserving task artifacts and the pre-existing fail-closed route. Never restore or align a remote branch with a raw force-push. If provider truth changes, proof is incomplete, or cleanup reports dirty or identity mismatch, stop, preserve all state, and return the diagnostic route for human or agent rework.

## Findings

Current incident rule: ZMV 202607252051-ZMVZRZ reached a verified provider-rebased head 2a6d152b87666912d189304c4a6084eccaaff262 while its local task worktree remained at d61ab0f55d1c122e5acbaf2a296e2ff508e87b55. The provider merged that PR as main e27c938698668ce242243d166f8c7c1b64cce88f. A stale local-versus-provider mismatch is not permission to republish, force-push, delete, or clean; only current immutable lineage proof may advance reconciliation.

- Observation: resolveProviderReconciliation calls git cherry with providerHead as upstream and stale local head as head; it confirms only that local patches occur in provider history.
  Impact: A merged PR whose provider head contains the local task patch plus an unrelated extra patch is classified provider_rebase_equivalent, so changed provider truth does not fail closed before cleanup routing.
  Resolution: Require symmetric patch-set equivalence or an equally strict provider-only patch rejection; add a regression fixture with one extra provider-only commit and preserve the branch/worktree on refusal.
