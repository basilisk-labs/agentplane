# Semantic quality review: rework

Provenance: evaluator_supplied

Reject: provider reconciliation accepts symbolic Git refs as immutable provider identities, so a malformed provider head or merge value can produce a cleanup-authorizing proof.

## Findings
- At HEAD 811a7a85860c4b1665ba5aa9d5f301d59666dd38, provider headSha=main and mergeCommit=main are accepted by validateMergedProviderReceipt and resolveProviderReconciliation on the real ZMV topology; both yield provider_rebase_equivalent instead of refusal.
- The proof contract requires immutable task, provider-head, and merge identities. Non-empty strings are passed to git cat-file, gitIsAncestor, git cherry, and rev-list, which resolve refs rather than only commit object IDs.

## Evidence
- .agentplane/tasks/202607260005-EMP7RC/README.md
- packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts
- bun -e provider identity probe: symbolic_head and symbolic_merge each receiptAccepted=true proofAccepted=true on ZMV d61ab0f -> 2a6d152 -> e27c938

## Missing Tests
- Provider headSha=main and mergeCommit=main must fail closed before any Git revision lookup and leave branch/worktree untouched.
- Malformed or non-full provider object IDs must return cleanup_blocked with no mutation command.

## Hidden Assumptions
- GitHub API fields typed as string are always canonical immutable commit IDs; the current code does not enforce that boundary.

## Residual Risks
- Do not publish, integrate, or run ZMV cleanup using this task branch until provider identity fields are validated as canonical commit object IDs.
