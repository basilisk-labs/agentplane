# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Regression coverage does not prove the new verification-target binding across the required branch_pr and batch-task paths.

## Evidence
- .agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607311404-P746PE/README.md
- .agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-observed-checks.json

## Missing Tests
- A branch_pr fixture with an implementation commit followed by task-only lifecycle commits, asserting the verification record implementation_sha and evaluator evaluated_sha both equal the implementation commit.
- An included-task batch fixture proving normalizeBranchPrBatchIncludedTaskIds causes lifecycle artifacts for every included task to be skipped consistently.
- A negative fixture proving a semantic code change after an earlier quality review advances implementation_sha instead of reusing the prior evaluated SHA.

## Hidden Assumptions
- The direct-runtime-evidence fixture is assumed to represent branch_pr provenance behavior even though it does not exercise branch_pr metadata or included-task batches.
- Passing existing broad critical tests is assumed to validate exact SHA selection, although the frozen evidence identifies no exact-SHA assertion outside the added direct fixture.

## Residual Risks
- Add focused branch_pr, included-task batch, and semantic-change regression cases around verification record creation, then rerun the focused evaluator/verification suites and the critical suite with structured evidence.
