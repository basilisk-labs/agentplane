Task: `202606041604-E3EJG8`
Title: Clarify confusing agent route diagnostics
Canonical task record: `.agentplane/tasks/202606041604-E3EJG8/README.md`

## Summary

Clarify confusing agent route diagnostics

Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.

## Scope

- In scope: Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
- Out of scope: unrelated refactors not required for "Clarify confusing agent route diagnostics".

## Verification

- State: ok
- Note:

```text
Decision-context surfaces verified with focused tests, TypeScript, formatting, policy routing, and
CLI smoke on route/brief/status/pr-check outputs.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T16:17:02.161Z
- Branch: task/202606041604-E3EJG8/clarify-confusing-agent-route-diagnostics
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../impl/commands.commit-non-close.unit.test.ts    |  45 ++++
 .../src/commands/guard/impl/commit-diagnostics.ts  |  36 +++-
 packages/agentplane/src/commands/pr/check.ts       |  32 +++
 .../src/commands/shared/route-guidance.test.ts     |  84 ++++++++
 .../src/commands/shared/route-guidance.ts          | 232 +++++++++++++++++++++
 .../agentplane/src/commands/task/brief-model.ts    |   7 +
 .../agentplane/src/commands/task/brief-render.ts   |  32 +++
 .../src/commands/task/next-action.command.ts       |  40 ++++
 .../agentplane/src/commands/task/status.command.ts |  39 +++-
 .../src/commands/task/verify-record-execute.ts     |  55 ++++-
 .../src/runner/usecases/task-run-blueprint.test.ts |   7 +
 .../src/runner/usecases/task-run-bootstrap.ts      |  42 ++++
 12 files changed, 647 insertions(+), 4 deletions(-)
```

</details>
