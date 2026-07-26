# Semantic quality review: rework

Provenance: evaluator_supplied

Reject at 3ad3880: task-branch identities are now fail-closed, but a canonical non-commit provider head still authorizes task-close cleanup.

## Findings
- validateMergedProviderReceipt accepts the real local blob 2f443825e19e8c531d1802d593e6dc59ac7e40af as providerHeadSha when mergeCommit is valid; gitCommitObjectExists confirms that OID is not a commit.
- targetedCleanupProof returns proof=provider_merge for a found task-close provider receipt without resolveProviderReconciliation, so this accepted blob bypasses the new provider-head object gate and can authorize cleanup.
- Cross-field substitutions and non-commit blobs for all five identities correctly fail in resolveProviderReconciliation on the real ZMV d61ab0f->2a6d152->e27c938 topology; the remaining gap is the task-close receipt-only lane.

## Evidence
- .agentplane/tasks/202607260005-EMP7RC/README.md
- packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts
- packages/agentplane/src/commands/branch/cleanup-merged-proof.ts
- bun -e ZMV identity matrix: task/local/closure/provider/merge blob and cross-field variants rejected; providerHeadBlobReceipt accepted blob 2f443825e19e8c531d1802d593e6dc59ac7e40af
- bunx vitest cleanup-merged.targeted.test.ts: 17 passed
- bunx vitest route-decision-next-action.test.ts close-tail-state.test.ts: 18 passed
- git diff --check main...HEAD: pass

## Missing Tests
- A found-provider task-close fixture whose head.sha is an existing local blob must return cleanup_blocked with next_command none and preserve the branch/worktree.

## Hidden Assumptions
- A canonical provider head OID is necessarily a commit, even on the task-close path that does not call reconciliation.

## Residual Risks
- Do not publish, integrate, or run cleanup from EMP7RC until provider head object type is checked before any provider receipt can authorize task-close cleanup.
