# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Hosted merge reconciliation completes tasks without projecting available supervisor token usage.

## Evidence
- .agentplane/tasks/202608021231-BPMM04/quality/20260803-113239286-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608021231-BPMM04/README.md

## Missing Tests
- A hosted-merge reconciliation test where the task has no preexisting token_usage but its supervisor journal contains observed executor and evaluator usage; the completed task must persist that exact aggregate rather than an unavailable state.
- Equivalent journal-present coverage for local merged and locally shipped reconciliation paths.

## Hidden Assumptions
- Hosted reconciliation is assumed to encounter only tasks whose token usage was already projected by a prior finish path, but the builders themselves transition unfinished tasks to DONE.
- Marking usage unavailable during reconciliation is assumed acceptable even when authoritative supervisor evidence may still exist.

## Residual Risks
- Route all hosted and local reconciliation completion paths through the same supervisor-journal projection used by finish/no-op closure, while preserving an existing stable projection for idempotent replay; add journal-present reconciliation tests for exact aggregation and repeated sync.
