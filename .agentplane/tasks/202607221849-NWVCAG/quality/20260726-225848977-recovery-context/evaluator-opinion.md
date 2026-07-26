# Semantic quality review: rework

Provenance: evaluator_supplied

Authority-only task commits incorrectly invalidate quality-review freshness and prevent the protected workflow from converging.

## Findings
- After a passing review, task authority grant changes only README revision and agentplane.side_effect_authority audit/grant records. resolveQualityReviewTargetSha classifies that README-only commit as independently reviewable metadata, so the route requires another review; the new review then needs another authority grant, creating a loop.

## Evidence
- .agentplane/tasks/202607221849-NWVCAG/README.md
- agentplane task next-action 202607221849-NWVCAG --remote --explain (quality review stale after committed route.remote.refresh authority)
- packages/agentplane/src/commands/shared/quality-review-target.ts

## Missing Tests
- Add resolver coverage proving authority-only README advances preserve a prior reviewed target and a non-authority README change remains a fresh target.

## Hidden Assumptions
- Formal authority audit records are lifecycle-managed evidence, not semantic task metadata requiring a new evaluator judgement.

## Residual Risks
- Until fixed, no publication or integration is attempted; the route correctly fails closed but cannot make progress.
