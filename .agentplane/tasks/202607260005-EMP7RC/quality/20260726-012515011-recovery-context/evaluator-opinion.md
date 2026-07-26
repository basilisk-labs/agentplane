# Semantic quality review: rework

Provenance: evaluator_supplied

Reject: the canonical provider gate is partial; task commit and pre-merge closure basis remain unvalidated Git revisions that can authorize provider-rebase cleanup.

## Findings
- At HEAD dec7de001981766de867867fd274cb4fdfe7b734, resolveProviderReconciliation accepts taskCommitSha and closureBasisCommit equal to the mutable ZMV task branch ref, then returns provider_rebase_equivalent against the real d61ab0f -> 2a6d152 -> e27c938 topology.
- validateMergedProviderReceipt now correctly rejects symbolic provider head and merge values, but targetedCleanupProof passes task.commit.hash and pre_merge_closure.basis_commit into Git ancestry/cherry operations without a canonical full OID check; taskPreMergeClosureRecordedOnBase only requires a non-empty commit hash and does not validate the closure basis.

## Evidence
- .agentplane/tasks/202607260005-EMP7RC/README.md
- packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts
- packages/agentplane/src/commands/branch/cleanup-merged-proof.ts
- packages/agentplane/src/commands/task/close-tail-state.ts
- bun -e metadata identity probe: taskCommitSha=closureBasisCommit=task/202607252051-ZMVZRZ/make-merged-worktree-cleanup-resilient yielded proofAccepted=true on ZMV topology
- bun test cleanup-merged.targeted.test.ts route-decision-next-action.test.ts: 27 pass, 0 fail

## Missing Tests
- A noncanonical task.commit.hash or pre_merge_closure.basis_commit must block targeted cleanup and emit cleanup_blocked with next_command none.

## Hidden Assumptions
- Task and closure metadata values that reach Git revision parsing are immutable because they are recorded on base; the code validates only non-empty text.

## Residual Risks
- Do not publish, integrate, or run live cleanup from EMP7RC until every proof identity that reaches Git is canonical and object-validated.
