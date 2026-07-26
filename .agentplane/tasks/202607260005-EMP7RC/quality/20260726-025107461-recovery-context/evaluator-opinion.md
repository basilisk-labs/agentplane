# Semantic quality review: rework

Provenance: evaluator_supplied

Reject at fe825864: raw tag/blob rejection is correct under ordinary Git, but refs/replace can still rewrite receipt and reconciliation proof semantics.

## Findings
- gitEnv preserves refs/replace behavior. gitCommitObjectExists runs git cat-file -t without GIT_NO_REPLACE_OBJECTS=1, so a replace ref can make a raw tag object appear as type commit; the raw-type guard is not invariant to local Git replacement refs.
- Minimal fixture: raw base=5ef2145ad3b0ba2056e458b9acb75da26f71782d, raw merge=2c0ec8d2c81b6988d506585326fba749249e7371, raw unmerged task=e67bbaa609179480d1a5a131088933d8c02e87ed, replacement f4aa6f0f2559fbf2ab4f0deda851d665686d8616 with refs/replace/2c0... -> f4aa... and parent task. Default merge-base declares task ancestor of merge; no-replace declares it false.
- At fe825864, the fixture's direct validateMergedProviderReceipt returned a receipt and resolveProviderReconciliation returned exact_head, despite raw task not being contained by raw merge. With GIT_NO_REPLACE_OBJECTS=1, the same call failed provider merged head containment.
- Normal proof remains correct: real v0.1.1 tag, blobs, trees, refs, expressions, and missing IDs reject; ZMV receipt, reconciliation, and revalidation remain positive. The residual issue is implicit local replacement state, not the canonical/raw-type logic itself.

## Evidence
- .agentplane/tasks/202607260005-EMP7RC/README.md
- packages/core/src/git/git-client.ts
- packages/agentplane/src/commands/shared/git-ops.ts
- packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.ts
- replace-ref probe: refs/replace/2c0ec8d2c81b6988d506585326fba749249e7371 -> f4aa6f0f2559fbf2ab4f0deda851d665686d8616, parent=e67bbaa609179480d1a5a131088933d8c02e87ed; default ancestor=true, GIT_NO_REPLACE_OBJECTS=1=false; validate receipt + resolve exact_head versus fail closed
- bun -e real ZMV: v0.1.1 tag/blob/tree/raw refs/path/expression rejected across receipt and reconciliation; normal provider_rebase and receipt revalidation accepted
- bunx vitest provider-receipt, cleanup-targeted, route-decision, close-tail: 39 passed
- git diff --check main...HEAD: pass

## Missing Tests
- Integration fixture with refs/replace changing a raw unmerged task/merge topology must return cleanup_blocked with next_command none and preserve branch/worktree.
- Raw annotated tag under a replacement ref to a commit must still fail exact object-type validation.

## Hidden Assumptions
- Canonical object IDs and cat-file -t are immutable proof inputs even when the repository has local refs/replace; default Git commands apply replacement objects.

## Residual Risks
- Do not publish, integrate, or run cleanup from EMP7RC until every identity, ancestry, patch, and base-evidence proof command executes with replacement refs disabled.
