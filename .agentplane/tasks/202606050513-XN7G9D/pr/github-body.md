Task: `202606050513-XN7G9D`
Title: Hide runner guidance outside parallel-codex context
Canonical task record: `.agentplane/tasks/202606050513-XN7G9D/README.md`

## Summary

Hide runner guidance outside parallel-codex context

Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle.

## Scope

- In scope: Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle.
- Out of scope: unrelated refactors not required for "Hide runner guidance outside parallel-codex context".

## Verification

- State: ok
- Note:

```text
Verified prompt and route context hide default runner-only guidance for ordinary tasks; explicit
runner routes remain covered by tests.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T05:23:40.008Z
- Branch: task/202606050513-XN7G9D/hide-runner-guidance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/EVALUATOR.json                  | 16 +++----
 .../src/commands/evaluator/evaluator.spec.ts       |  2 +-
 .../src/commands/hermes/hermes-runtime.ts          | 36 ++++++++++----
 .../src/commands/hermes/hermes.command.test.ts     | 42 +++++++----------
 .../src/commands/shared/route-guidance.test.ts     | 55 +++++++++++++++++++++-
 .../src/commands/shared/route-guidance.ts          | 11 +++++
 .../agentplane/src/commands/task/brief-render.ts   | 19 +++++---
 .../src/commands/task/next-action.command.ts       | 23 +++++----
 .../agentplane/src/commands/task/status.command.ts | 23 +++++----
 .../src/commands/task/verify-record-execute.ts     | 14 ++++--
 10 files changed, 168 insertions(+), 73 deletions(-)
```

</details>
