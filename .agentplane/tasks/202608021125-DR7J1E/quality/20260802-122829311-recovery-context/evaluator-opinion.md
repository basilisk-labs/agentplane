# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The defect ledger uses PENDING labels instead of executable task IDs, and multiple confirmed release-blocking defects share the same placeholder owner.

## Evidence
- .agentplane/tasks/202608021125-DR7J1E/README.md
- .agentplane/cache/v0.7.1-qualification/03dbdc7b8c0cefbd4df5fcdefa2f2ca84ad2b112/defects.md
- .agentplane/cache/v0.7.1-qualification/03dbdc7b8c0cefbd4df5fcdefa2f2ca84ad2b112/report.json
- .agentplane/tasks/202608021125-DR7J1E/quality/20260802-122829311-recovery-context/evaluator-diff.patch

## Missing Tests
- Validate that every blocking defect owner_task is an existing executable AgentPlane task ID rather than a PENDING placeholder, and that distinct confirmed release-blocking defects have distinct owner tasks when the task contract requires separate tasks.

## Hidden Assumptions
- A PENDING-* label is treated as equivalent to an executable task ID.
- The supervisor and efficiency defects may remain untracked until a later release step.
- Multiple independently confirmed blockers may share one future owner despite the explicit separate-task requirement.

## Residual Risks
- Create separate executable tasks for the confirmed release-blocking defects, emit their real task IDs in the report and ledger, and replace the test that currently accepts PENDING owner labels with task-ID and task-existence validation.
