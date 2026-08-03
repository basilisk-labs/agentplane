# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A crash after the supervisor journal is completed but before the exchange is marked consumed leaves the accepted result permanently unrecoverable.

## Evidence
- .agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-diff.patch

## Missing Tests
- Inject a crash after completeSupervisorExecutionEpisode/advanceSupervisorExecutionEpisodeState is persisted but before exchange.status is written as consumed, then retry the same result and assert terminal convergence without reapplying its effect.

## Hidden Assumptions
- The implementation assumes no interruption can occur between persisting supervisor completion and persisting the consumed exchange state.

## Residual Risks
- Make accepted-result recovery recognize and finalize the journal-completed/exchange-accepted state, preserving digest binding and proving that retry neither reapplies the semantic effect nor remains blocked.
