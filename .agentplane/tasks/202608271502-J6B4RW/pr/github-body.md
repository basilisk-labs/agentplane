Task: `202608271502-J6B4RW`
Title: Align intake and query execution fixtures
Canonical task record: `.agentplane/tasks/202608271502-J6B4RW/README.md`

## Summary

Align intake and query execution fixtures

Repair ten reproduced failures across five intake and query test files on integrated main. Use the existing committed fixture only for execution-dependent scenarios. Preserve missing Verify Steps rejection, unsupported-check and invalid-intake negatives, executor-claim and observed-receipt refusal, branch verification versus closure, token telemetry equality, active-task sorting and dependency readiness, user questions, and read-only concurrent queries. If a query fixture lacks a canonical plan, assert the actual semantic-planning route instead of an obsolete pre-worktree route without weakening query invariants. Do not invent approval or verification evidence. Do not change production code, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Five-file scope is disjoint from current repair tasks and requires only merged GHHA0Q. Require focused tests and full CI.

## Scope

- In scope: Repair ten reproduced failures across five intake and query test files on integrated main. Use the existing committed fixture only for execution-dependent scenarios. Preserve missing Verify Steps rejection, unsupported-check and invalid-intake negatives, executor-claim and observed-receipt refusal, branch verification versus closure, token telemetry equality, active-task sorting and dependency readiness, user questions, and read-only concurrent queries. If a query fixture lacks a canonical plan, assert the actual semantic-planning route instead of an obsolete pre-worktree route without weakening query invariants. Do not invent approval or verification evidence. Do not change production code, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Five-file scope is disjoint from current repair tasks and requires only merged GHHA0Q. Require focused tests and full CI.
- Out of scope: unrelated refactors not required for "Align intake and query execution fixtures".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T15:08:25.681Z
- Branch: task/202608271502-J6B4RW/align-intake-and-query-execution-fixtures
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.lifecycle.plan.test.ts    | 148 +++++++++++++++++++--
 .../src/cli/run-cli.core.task-guided.test.ts       |   7 +-
 .../run-cli.core.task-status-token-usage.test.ts   |   4 +-
 .../src/cli/run-cli.core.tasks.active.test.ts      |   9 +-
 .../src/cli/run-cli.core.tasks.user-create.test.ts |   3 +-
 5 files changed, 148 insertions(+), 23 deletions(-)
```

</details>
