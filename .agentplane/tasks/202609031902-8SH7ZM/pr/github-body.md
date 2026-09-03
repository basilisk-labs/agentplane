Task: `202609031902-8SH7ZM`
Title: Repair plan-amendment Verify Steps projection routing
Canonical task record: `.agentplane/tasks/202609031902-8SH7ZM/README.md`

## Summary

Repair plan-amendment Verify Steps projection routing

Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.

## Scope

- In scope: Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
- Out of scope: unrelated refactors not required for "Repair plan-amendment Verify Steps projection routing".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-03T19:33:17.505Z
- Branch: task/202609031902-8SH7ZM/repair-plan-amendment-verify-steps-projection-ro
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-adapter.test.ts           | 72 ++++++++++++++++++++++
 .../task-backend/task-centric-backend-adapter.ts   | 66 +++++++++++++++++++-
 ...n-cli.core.task-advance.evidence-rework.test.ts | 50 +++++++++++++--
 .../src/commands/shared/route-decision-blockers.ts |  8 +++
 .../commands/shared/route-decision-verification.ts | 32 +++++++++-
 5 files changed, 219 insertions(+), 9 deletions(-)
```

</details>
