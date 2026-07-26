# Semantic quality review: rework

Provenance: evaluator_supplied

Reject at 5da3b9b: blob receipts are blocked, but annotated tag object IDs still satisfy the commit guard and can authorize provider cleanup.

## Findings
- gitCommitObjectExists uses git cat-file -e <oid>^{commit}, which dereferences annotated tags rather than proving that the supplied canonical OID itself is a commit object.
- Real repository tag object 383ffa926ec48012d532cc7b918ddfc3b912dab4 (refs/tags/v0.1.1) has type tag, yet the receipt validator accepts it as both providerHeadSha and mergeCommit. The task-close found-provider fast path therefore receives a valid receipt and returns provider_merge without reconciliation.
- On the real ZMV d61ab0f->2a6d152->e27c938 topology, substituting that tag OID only for taskCommitSha returns provider_rebase_equivalent; the expected-reconciliation receipt also accepts it. Thus the shared guard fails the immutable commit-object contract in both reconciliation and receipt paths.
- Canonical refs and expressions, absent hashes, blobs, and trees reject correctly; normal ZMV receipt and provider_rebase_equivalent remain positive. The remaining unsafe object type is an annotated tag that resolves to a commit.

## Evidence
- .agentplane/tasks/202607260005-EMP7RC/README.md
- packages/agentplane/src/commands/shared/git-ops.ts
- packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts
- packages/agentplane/src/commands/branch/cleanup-merged-proof.ts
- git probe: object 383ffa926ec48012d532cc7b918ddfc3b912dab4 type=tag; cat-file -e oid^{commit}=0; dereferenced commit 58eee6d8e2fc8a3410d79165946bd14b9f36cae6 is ancestor of main
- bun -e ZMV matrix: tag provider head and merge receipts accepted; tag taskCommitSha yielded provider_rebase_equivalent; blob/tree/ref/ref-expression rejected; normal ZMV positive remained
- bunx vitest provider-receipt, cleanup-targeted, route-decision, close-tail: 37 passed
- git diff --check main...HEAD: pass

## Missing Tests
- Create an annotated tag object in the fixture and prove provider head and merge tag OIDs block task-close cleanup, emit cleanup_blocked with next_command none, and preserve branch/worktree.
- For each reconciliation identity (task, local head, provider head, merge, closure), prove annotated tag IDs reject before ancestry/cherry operations; retain commit positive coverage.

## Hidden Assumptions
- git cat-file -e <oid>^{commit} proves that oid is a commit object. Git instead peels annotated tags to their tagged commit.

## Residual Risks
- Do not publish, integrate, or run cleanup from EMP7RC until commit identity validation checks the raw object type rather than a peeled commit-ish revision.
