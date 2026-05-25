# EVALUATOR opinion: pass

Projection fallback fix is scoped and verified.

## Findings
- listTaskSummariesMemo now falls back to canonical summaries when a filtered native projection returns only DONE dependency rows for an active-status request, preventing task list/task active from silently hiding active tasks under stale projection state.

## Evidence
- .agentplane/tasks/202605251936-1HC32Z/README.md
- packages/agentplane/src/commands/shared/task-backend.test.ts
- packages/agentplane/src/commands/shared/task-backend.ts

## Missing Tests
- none recorded

## Hidden Assumptions
- none recorded

## Residual Risks
- none recorded
