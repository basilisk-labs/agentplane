# Semantic quality review: rework

Provenance: evaluator_supplied

Integration freshness can fail open when the shared resolver returns no current-task target.

## Findings
- prepareIntegrate forwards a null expected SHA into assertEvaluatorQualityReviewPassed, whose conditional comparison then skips freshness validation even though the route oracle marks the same state stale.

## Evidence
- .agentplane/tasks/202607240736-FCBKJQ/README.md
- packages/agentplane/src/commands/shared/quality-review-target.ts
- packages/agentplane/src/commands/pr/integrate/internal/prepare.ts
- packages/agentplane/src/commands/task/quality-review-gate.ts

## Missing Tests
- Cover null resolver results for invalid ancestry and unrelated-task artifact tails in resolver, route, and integration preparation.

## Hidden Assumptions
- A null target was assumed to be harmless even though it has different semantics in evaluator recording and integration authorization.

## Residual Risks
- Commit-by-commit history traversal is unbounded for long workflow-only tails.
