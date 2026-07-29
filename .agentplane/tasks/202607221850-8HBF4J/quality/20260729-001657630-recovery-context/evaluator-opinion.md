# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The focused supervisor suite tests one failed mechanical operation (wiki_lint), one resumed completed phase, and one rework round. It does not prove failure-and-retry behavior for each mechanical gate required by Verify Steps.
- The suite does not exercise repeated evaluator rework through the durable episode budget/cursor to show termination at episode, token, or no-progress limits.
- The branch is unpublished and has a dirty task README plus an untracked prior quality artifact; existing review records include rework and blocked reports, so no fresh, mergeable quality proof covers the current head.

## Evidence
- .agentplane/tasks/202607221850-8HBF4J/quality/20260729-001657630-recovery-context/evaluator-diff.patch

## Missing Tests
- Failure-and-retry coverage for every CLI-owned assimilation operation.
- Repeated semantic rework with shared durable cursor and each budget/no-progress stop condition.

## Hidden Assumptions
- A single wiki_lint failure is representative of all mechanical operations.

## Residual Risks
- Expand the focused supervisor tests to cover every mechanical phase and bounded repeated semantic rework; run the declared workflow, lifecycle, critical, and type checks; then create fresh quality evidence for a clean, published head.
