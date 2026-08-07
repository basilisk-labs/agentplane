Task: `202608061646-30TKV4`
Title: Add user-first task intake and execution preview
Canonical task record: `.agentplane/tasks/202608061646-30TKV4/README.md`

## Summary

Add user-first task intake and execution preview

Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.

## Scope

- In scope: Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
- Out of scope: unrelated refactors not required for "Add user-first task intake and execution preview".

## Verification

- State: ok
- Note:

```text
All seven declared checks pass on a743a9c42ca4; onboarding content and conservative ambiguous-intent
coverage are now explicit.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T19:51:44.575Z
- Branch: task/202608061646-30TKV4/add-user-first-task-intake-and-execution-preview
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/start/quickstart.mdx                          |  35 +-
 docs/user/cli-reference.generated.mdx              |  87 ++---
 packages/agentplane/src/cli/command-invocations.ts |   1 +
 .../src/cli/run-cli.core.route-decision.test.ts    |   8 +
 .../src/cli/run-cli.core.task-run.test.ts          | 112 +++---
 .../src/cli/run-cli.core.tasks.create.test.ts      |   5 -
 .../src/cli/run-cli.core.tasks.user-create.test.ts | 304 +++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  39 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   9 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../agentplane/src/commands/task/create.command.ts | 409 +++++++++++++++++++++
 packages/agentplane/src/commands/task/new.ts       | 333 +++++++++--------
 .../src/commands/task/run-execution-preview.ts     |  83 +++++
 .../agentplane/src/commands/task/run-render.ts     |  39 +-
 .../agentplane/src/commands/task/run.command.ts    |   6 +-
 .../agentplane/src/commands/task/status.command.ts |  13 +-
 .../agentplane/src/commands/task/task.command.ts   |  10 +-
 .../baselines/v0.7-compatibility-candidate.json    | 193 +++++++++-
 scripts/checks/check-agent-onboarding-scenario.mjs |  11 +
 .../check-compatibility-contract-baseline.mjs      | 135 ++++++-
 20 files changed, 1531 insertions(+), 305 deletions(-)
```

</details>
