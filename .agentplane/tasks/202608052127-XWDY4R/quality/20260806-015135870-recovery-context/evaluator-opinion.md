# Semantic quality review: rework

Provenance: human_supplied

Late planning-result reconciliation is not exact while the task is awaiting plan approval.

## Findings
- isExternalPlanningResultApplied returns true for every plan_approval route before comparing the persisted plan with the returned PLANNER summary; a stale result can therefore complete against a different plan.

## Evidence
- packages/agentplane/src/commands/task/external-agent-planning-authority.ts
- packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts

## Missing Tests
- Reject an effect-in-doubt PLANNER result when a different plan is currently awaiting approval, without consuming the exchange or completing the journal operation.

## Hidden Assumptions
- The plan_approval route was treated as proof that the exact returned plan had already been applied.

## Residual Risks
- none recorded
