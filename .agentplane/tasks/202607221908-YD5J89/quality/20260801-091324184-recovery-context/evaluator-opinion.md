# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The scoped task-backend proxy conflates backend and task capabilities: either backend.write or task.write enables every backend member, so a command declaring only one capability can exercise operations governed by the other.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-091324184-recovery-context/evaluator-diff.patch

## Missing Tests
- Create sessions that declare backend.write without task.write and task.write without backend.write, then verify that cross-capability taskBackend operations return typed E_INTERNAL denial and do not mutate state.

## Hidden Assumptions
- All current callers declare backend and task read/write capabilities together, so the proxy's OR-based authorization is assumed not to create a privilege escalation.

## Residual Risks
- Split taskBackend member authorization by the exact backend.read/backend.write/task.read/task.write capability required for each operation, then add asymmetric capability tests and rerun the focused denial, concurrency, schema, guard, critical, and typecheck evidence.
