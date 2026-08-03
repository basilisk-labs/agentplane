# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Completed-task token usage is exposed by task brief but not by task status, so one required human-readable completion surface remains incomplete.

## Evidence
- .agentplane/tasks/202608021231-BPMM04/README.md
- .agentplane/tasks/202608021231-BPMM04/quality/20260803-115436481-recovery-context/evaluator-diff.patch

## Missing Tests
- A completed-task CLI regression asserting that `task status <task-id>` human output renders token state, input, visible output, reasoning, total, and provenance/completeness consistently with task brief and machine JSON.

## Hidden Assumptions
- The implementation assumes that human-readable task brief output alone satisfies the separately named task status/brief output requirement.

## Residual Risks
- Add the completed-task token projection to human-readable task status output and cover it with a deterministic status-command regression that compares its aggregate and completeness state with brief and JSON projections.
