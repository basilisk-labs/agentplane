# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The evaluated change implements stateless parallel Git observation under the cache task, although the approved recovery record explicitly routes that optimization to a separate task. No fingerprinted preparation cache, TTL, bounded storage, or cache receipt implementation is present.
- Verification is stale for the evaluated SHA: the frozen checks describe SHA 6e1e191 and assert zero production-source changes and no retained prototype, while the work order evaluates SHA 370da2c with production changes across Git snapshot and workflow fingerprint preparation paths.
- The new implementation reconstructs status from concurrent tracked-status and untracked-file commands without proving behavior when repository state changes between those observations. The added equivalence test covers only a stable repository, so duplicate, omitted, or differently classified paths under concurrent Git mutation remain untested.

## Evidence
- .agentplane/tasks/202607221854-87892M/README.md
- .agentplane/tasks/202607221854-87892M/quality/20260801-172849838-recovery-context/evaluator-diff.patch
- .agentplane/policy/dod.core.md
- .agentplane/tasks/202607221854-87892M/quality/20260801-172849838-recovery-context/evaluator-observed-checks.json
- .agentplane/policy/dod.code.md

## Missing Tests
- Run the declared checks and focused Git snapshot tests against evaluated SHA 370da2c0b0489d3939d66ed93bb8cc6916fd1e0d.
- Benchmark the retained parallel-observation implementation against its baseline with raw cold/warm results and the predeclared threshold.
- Add mutation-during-observation tests covering tracked-to-untracked, untracked-to-staged, rename, deletion, and index/worktree changes between concurrent Git commands; assert deterministic conservative output or controlled unavailability.
- If this task is re-approved to implement caching, add the declared independent invalidation, corruption, version-mismatch, bounded-storage, receipt, TTL, and concurrency tests.

## Hidden Assumptions
- A stateless parallel-observation optimization may replace the approved fingerprinted-cache deliverable without re-approval.
- Verification recorded for SHA 6e1e191 remains applicable after production code changes at SHA 370da2c.
- Separate concurrent Git commands collectively represent one coherent repository state.
- Stable-repository equivalence to porcelain status is sufficient evidence for concurrent mutation behavior.

## Residual Risks
- Return the stateless Git-observation optimization to a separately approved task as already specified in the task Findings, or explicitly re-approve this task's changed scope. Then verify and benchmark the actual evaluated SHA, including repository mutation during concurrent observation. If the original cache contract remains active, implement and verify its cache-specific invariants instead of substituting the parallelization change.
