# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- hasExactSchedulableWorkItemScopeDelta returns true for a missing root on an optional READY WorkItem even when every required WorkItem is COMPLETED.
- extendTaskCentricWorkItemScope returns the aggregate unchanged when every required WorkItem is completed, so the accepted request would change only rationale and mark the extension applied without extending the target WorkItem.
- The narrow repair is to make the guard mirror the shared all-required-completed rule and add a regression test for that exact state.

## Evidence
- .agentplane/tasks/202609121655-14X73Y/quality/objects/sha256/d0ff8a97b08f736b32fba490a592611aa232e2f17b277e1441ce63f491e1c830.patch

## Missing Tests
- Reject a global-contract no-op when all required WorkItems are completed and an optional exact target is READY but missing the requested root.

## Hidden Assumptions
- A READY optional target does not imply that the shared extension function will mutate it after all required WorkItems are completed.

## Residual Risks
- Rework is required because the new guard can accept a true no-op when every required WorkItem is already completed and the exact target is an optional schedulable WorkItem.
