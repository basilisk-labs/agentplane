Task: `202606081631-MHC3NY`
Title: Clarify non-recipe runner route guidance
Canonical task record: `.agentplane/tasks/202606081631-MHC3NY/README.md`

## Summary

Clarify non-recipe runner route guidance

Fix AgentPlane route/operator guidance so normal Codex agents do not treat runner_context or stale runner attempts as an active runner route unless task run, wait_runner, runner_alive, or an active runner recipe such as parallel-codex explicitly delegates execution.

## Scope

Fix AgentPlane route/operator guidance for ordinary Codex-agent execution when no runner recipe is active. Scope includes route guidance code, focused tests, and task lifecycle artifacts only. Out of scope: implementing a new runner, changing parallel-codex behavior, or altering branch_pr lifecycle semantics.

## Verification

- State: ok
- Note:

```text
Post-commit route guidance verification passed on HEAD 42779867b; PR check reports fresh local
artifacts and live task surfaces show current_agent executor semantics.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T16:32:55.363Z
- Branch: task/202606081631-MHC3NY/clarify-non-recipe-runner-route-guidance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/route-guidance.test.ts     | 14 ++++++
 .../src/commands/shared/route-guidance.ts          | 55 +++++++++++++++++++++-
 .../agentplane/src/commands/task/brief-render.ts   | 13 +++++
 .../src/commands/task/next-action.command.ts       | 21 +++++++++
 .../agentplane/src/commands/task/status.command.ts | 11 +++++
 5 files changed, 113 insertions(+), 1 deletion(-)
```

</details>
